import "server-only";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  resources,
  categories,
  universities,
  users,
  purchases,
  orders,
  orderItems,
  savedSearches,
} from "@/db/schema";

export { RESOURCE_TYPES, RESOURCE_LEVELS } from "@/lib/catalog";

/* -------------------------------------------------------------------------- */
/*  Analytics                                                                  */
/* -------------------------------------------------------------------------- */

export interface AdminStats {
  revenueNaira: number;
  paidOrders: number;
  pendingOrders: number;
  sales: number;
  users: number;
  admins: number;
  resources: number;
  catalogDownloads: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  const [rev] = await db
    .select({
      revenue: sql<number>`coalesce(sum(${orders.totalNaira}) filter (where ${orders.status} = 'Paid'), 0)::int`,
      paid: sql<number>`count(*) filter (where ${orders.status} = 'Paid')::int`,
      pending: sql<number>`count(*) filter (where ${orders.status} = 'Pending')::int`,
    })
    .from(orders);
  const [sale] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(purchases);
  const [u] = await db
    .select({
      total: sql<number>`count(*)::int`,
      admins: sql<number>`count(*) filter (where ${users.role} = 'admin')::int`,
    })
    .from(users);
  const [r] = await db
    .select({
      count: sql<number>`count(*)::int`,
      dls: sql<number>`coalesce(sum(${resources.downloads}), 0)::int`,
    })
    .from(resources);

  return {
    revenueNaira: rev?.revenue ?? 0,
    paidOrders: rev?.paid ?? 0,
    pendingOrders: rev?.pending ?? 0,
    sales: sale?.count ?? 0,
    users: u?.total ?? 0,
    admins: u?.admins ?? 0,
    resources: r?.count ?? 0,
    catalogDownloads: r?.dls ?? 0,
  };
}

export interface MonthPoint {
  label: string;
  value: number;
}

/** Revenue from paid orders, bucketed into the last `months` calendar months. */
export async function getRevenueByMonth(months = 6): Promise<MonthPoint[]> {
  const rows = await db
    .select({
      month: sql<string>`to_char(date_trunc('month', ${orders.createdAt}), 'YYYY-MM')`,
      revenue: sql<number>`coalesce(sum(${orders.totalNaira}), 0)::int`,
    })
    .from(orders)
    .where(eq(orders.status, "Paid"))
    .groupBy(sql`date_trunc('month', ${orders.createdAt})`);

  const byMonth = new Map(rows.map((r) => [r.month, r.revenue]));
  const out: MonthPoint[] = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    out.push({
      label: d.toLocaleString("en-US", { month: "short" }),
      value: byMonth.get(key) ?? 0,
    });
  }
  return out;
}

export interface TopResource {
  id: string;
  title: string;
  category: string;
  downloads: number;
  sales: number;
  revenueNaira: number;
}

export async function getTopResources(limit = 6): Promise<TopResource[]> {
  const rows = await db
    .select({
      id: resources.id,
      title: resources.title,
      category: categories.name,
      downloads: resources.downloads,
      sales: sql<number>`count(${purchases.id})::int`,
      revenue: sql<number>`coalesce(sum(${purchases.priceNaira}), 0)::int`,
    })
    .from(resources)
    .innerJoin(categories, eq(resources.categoryId, categories.id))
    .leftJoin(purchases, eq(purchases.resourceId, resources.id))
    .groupBy(resources.id, categories.name)
    .orderBy(desc(resources.downloads))
    .limit(limit);
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    downloads: r.downloads,
    sales: r.sales,
    revenueNaira: r.revenue,
  }));
}

export interface CategorySlice {
  name: string;
  resources: number;
  downloads: number;
}

export async function getCategoryBreakdown(): Promise<CategorySlice[]> {
  const rows = await db
    .select({
      name: categories.name,
      resources: sql<number>`count(${resources.id})::int`,
      downloads: sql<number>`coalesce(sum(${resources.downloads}), 0)::int`,
    })
    .from(categories)
    .leftJoin(resources, eq(resources.categoryId, categories.id))
    .groupBy(categories.name)
    .orderBy(desc(sql`coalesce(sum(${resources.downloads}), 0)`));
  return rows;
}

export interface RecentOrder {
  id: string;
  buyer: string;
  email: string;
  date: string;
  totalNaira: number;
  status: string;
  method: string;
}

export async function getRecentOrders(limit = 8): Promise<RecentOrder[]> {
  const rows = await db
    .select({
      id: orders.id,
      buyer: users.name,
      email: users.email,
      date: orders.date,
      total: orders.totalNaira,
      status: orders.status,
      method: orders.method,
    })
    .from(orders)
    .innerJoin(users, eq(orders.userId, users.id))
    .orderBy(desc(orders.createdAt))
    .limit(limit);
  return rows.map((r) => ({
    id: r.id,
    buyer: r.buyer,
    email: r.email,
    date: r.date,
    totalNaira: r.total,
    status: r.status,
    method: r.method,
  }));
}

export interface SearchTrend {
  query: string;
  count: number;
  newMatches: number;
}

export async function getSearchTrends(limit = 8): Promise<SearchTrend[]> {
  const rows = await db
    .select({
      query: savedSearches.query,
      count: sql<number>`count(*)::int`,
      newMatches: sql<number>`coalesce(sum(${savedSearches.newMatches}), 0)::int`,
    })
    .from(savedSearches)
    .groupBy(savedSearches.query)
    .orderBy(desc(sql`count(*)`), desc(sql`coalesce(sum(${savedSearches.newMatches}), 0)`))
    .limit(limit);
  return rows;
}

/* -------------------------------------------------------------------------- */
/*  Management lists                                                           */
/* -------------------------------------------------------------------------- */

export interface AdminResourceRow {
  id: string;
  title: string;
  type: string;
  category: string;
  institution: string;
  priceNaira: number;
  downloads: number;
  rating: number;
  trending: boolean;
}

export async function listResources(): Promise<AdminResourceRow[]> {
  const rows = await db
    .select({
      id: resources.id,
      title: resources.title,
      type: resources.type,
      category: categories.name,
      institution: universities.shortName,
      priceNaira: resources.priceNaira,
      downloads: resources.downloads,
      rating: resources.rating,
      trending: resources.trending,
    })
    .from(resources)
    .innerJoin(categories, eq(resources.categoryId, categories.id))
    .innerJoin(universities, eq(resources.institutionId, universities.id))
    .orderBy(desc(resources.createdAt));
  return rows;
}

/** Raw resource row (with foreign keys) for the edit form. */
export async function getResourceForEdit(id: string) {
  const [row] = await db.select().from(resources).where(eq(resources.id, id)).limit(1);
  return row ?? null;
}

export async function listCategories() {
  const rows = await db
    .select({
      id: categories.id,
      slug: categories.slug,
      name: categories.name,
      iconName: categories.iconName,
      accent: categories.accent,
      resources: sql<number>`count(${resources.id})::int`,
    })
    .from(categories)
    .leftJoin(resources, eq(resources.categoryId, categories.id))
    .groupBy(categories.id)
    .orderBy(categories.name);
  return rows;
}

export async function listUniversities() {
  return db
    .select({ id: universities.id, name: universities.name, shortName: universities.shortName })
    .from(universities)
    .orderBy(universities.name);
}

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  institution: string;
  avatarSeed: string;
  purchases: number;
  spendNaira: number;
  joined: string;
}

export async function listUsers(): Promise<AdminUserRow[]> {
  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      institution: users.institution,
      avatarSeed: users.avatarSeed,
      createdAt: users.createdAt,
      purchases: sql<number>`count(${purchases.id})::int`,
      spend: sql<number>`coalesce(sum(${purchases.priceNaira}), 0)::int`,
    })
    .from(users)
    .leftJoin(purchases, eq(purchases.userId, users.id))
    .groupBy(users.id)
    .orderBy(desc(users.createdAt));
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    role: r.role,
    institution: r.institution,
    avatarSeed: r.avatarSeed,
    purchases: r.purchases,
    spendNaira: r.spend,
    joined: new Date(r.createdAt).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }),
  }));
}

export interface AdminOrderRow {
  id: string;
  buyer: string;
  email: string;
  date: string;
  items: string[];
  totalNaira: number;
  status: string;
  method: string;
}

export async function listOrders(status?: string): Promise<AdminOrderRow[]> {
  const orderRows = await db
    .select({
      id: orders.id,
      buyer: users.name,
      email: users.email,
      date: orders.date,
      total: orders.totalNaira,
      status: orders.status,
      method: orders.method,
    })
    .from(orders)
    .innerJoin(users, eq(orders.userId, users.id))
    .where(status ? eq(orders.status, status) : undefined)
    .orderBy(desc(orders.createdAt));

  if (orderRows.length === 0) return [];

  const items = await db
    .select({ orderId: orderItems.orderId, title: orderItems.title })
    .from(orderItems);
  const titlesByOrder = new Map<string, string[]>();
  for (const it of items) {
    const list = titlesByOrder.get(it.orderId) ?? [];
    list.push(it.title);
    titlesByOrder.set(it.orderId, list);
  }

  return orderRows.map((o) => ({
    id: o.id,
    buyer: o.buyer,
    email: o.email,
    date: o.date,
    items: titlesByOrder.get(o.id) ?? [],
    totalNaira: o.total,
    status: o.status,
    method: o.method,
  }));
}

export interface OrderCounts {
  all: number;
  Paid: number;
  Pending: number;
  Refunded: number;
}

export async function getOrderCounts(): Promise<OrderCounts> {
  const [row] = await db
    .select({
      all: sql<number>`count(*)::int`,
      Paid: sql<number>`count(*) filter (where ${orders.status} = 'Paid')::int`,
      Pending: sql<number>`count(*) filter (where ${orders.status} = 'Pending')::int`,
      Refunded: sql<number>`count(*) filter (where ${orders.status} = 'Refunded')::int`,
    })
    .from(orders);
  return {
    all: row?.all ?? 0,
    Paid: row?.Paid ?? 0,
    Pending: row?.Pending ?? 0,
    Refunded: row?.Refunded ?? 0,
  };
}
