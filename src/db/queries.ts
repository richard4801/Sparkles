import "server-only";
import { and, desc, eq, or, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  resources,
  categories,
  universities,
  reviews,
  users,
  purchases,
  orders,
  orderItems,
  downloads,
  savedSearches,
  notifications,
  wishlists,
} from "@/db/schema";
import type { Resource, Review } from "@/types";
import type {
  DashUser,
  Purchase,
  Order,
  DownloadEntry,
  SavedSearch,
  DashNotification,
  DashStats,
} from "@/types/dashboard";

/* -------------------------------------------------------------------------- */
/*  Catalog reads (shaped to the existing UI types)                            */
/* -------------------------------------------------------------------------- */

const resourceSelect = {
  id: resources.id,
  title: resources.title,
  type: resources.type,
  category: categories.name,
  institution: universities.name,
  department: resources.department,
  faculty: resources.faculty,
  course: resources.course,
  description: resources.description,
  abstract: resources.abstract,
  tableOfContents: resources.tableOfContents,
  rating: resources.rating,
  reviewsCount: resources.reviewsCount,
  downloads: resources.downloads,
  pages: resources.pages,
  priceNaira: resources.priceNaira,
  level: resources.level,
  year: resources.year,
  thumbnailSeed: resources.thumbnailSeed,
  trending: resources.trending,
  createdAt: resources.createdAt,
};

type ResourceRow = {
  [K in keyof typeof resourceSelect]: unknown;
};

function toResource(row: Record<string, unknown>): Resource {
  const createdAt = row.createdAt as Date;
  const addedDaysAgo = Math.max(
    0,
    Math.floor((Date.now() - new Date(createdAt).getTime()) / 86_400_000),
  );
  return {
    id: row.id as string,
    title: row.title as string,
    type: row.type as Resource["type"],
    category: row.category as string,
    institution: row.institution as string,
    department: row.department as string,
    faculty: row.faculty as string,
    course: row.course as string,
    description: row.description as string,
    abstractSnippet: (row.description as string) ?? "",
    abstract: row.abstract as string,
    tableOfContents: (row.tableOfContents as string[]) ?? [],
    rating: row.rating as number,
    reviews: row.reviewsCount as number,
    downloads: row.downloads as number,
    pages: row.pages as number,
    priceNaira: row.priceNaira as number,
    level: row.level as Resource["level"],
    year: row.year as number,
    thumbnailSeed: row.thumbnailSeed as string,
    trending: row.trending as boolean,
    addedDaysAgo,
  };
}

const baseResourceQuery = () =>
  db
    .select(resourceSelect)
    .from(resources)
    .innerJoin(categories, eq(resources.categoryId, categories.id))
    .innerJoin(universities, eq(resources.institutionId, universities.id));

export async function getAllResources(): Promise<Resource[]> {
  const rows = await baseResourceQuery();
  return (rows as Record<string, unknown>[]).map(toResource);
}

export async function getResourceById(id: string): Promise<Resource | null> {
  const rows = await baseResourceQuery().where(eq(resources.id, id)).limit(1);
  const row = (rows as Record<string, unknown>[])[0];
  return row ? toResource(row) : null;
}

export async function getAllResourceIds(): Promise<string[]> {
  const rows = await db.select({ id: resources.id }).from(resources);
  return rows.map((r) => r.id);
}

export async function getReviewsForResource(resourceId: string): Promise<Review[]> {
  const rows = await db
    .select()
    .from(reviews)
    .where(eq(reviews.resourceId, resourceId));
  return rows.map((r) => ({
    id: r.id,
    resourceId: r.resourceId,
    name: r.name,
    avatarSeed: r.avatarSeed,
    rating: r.rating,
    date: r.date,
    body: r.body,
  }));
}

export async function getRelatedResources(
  resource: Resource,
  limit = 4,
): Promise<Resource[]> {
  const all = await getAllResources();
  const sameCategory = all.filter(
    (r) => r.id !== resource.id && r.category === resource.category,
  );
  const sameInstitution = all.filter(
    (r) =>
      r.id !== resource.id &&
      r.category !== resource.category &&
      r.institution === resource.institution,
  );
  return [...sameCategory, ...sameInstitution].slice(0, limit);
}

/* -------------------------------------------------------------------------- */
/*  Dashboard reads (per user)                                                 */
/* -------------------------------------------------------------------------- */

export async function getDashUser(userId: string): Promise<DashUser | null> {
  const [u] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!u) return null;
  return {
    name: u.name,
    email: u.email,
    avatarSeed: u.avatarSeed,
    institution: u.institution,
    department: u.department,
    level: u.level,
    memberSince: new Date(u.createdAt).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
  };
}

export async function getPurchases(userId: string): Promise<Purchase[]> {
  const rows = await db
    .select({
      id: purchases.id,
      resourceId: purchases.resourceId,
      title: resources.title,
      type: resources.type,
      institution: universities.name,
      thumbnailSeed: resources.thumbnailSeed,
      priceNaira: purchases.priceNaira,
      purchasedOn: purchases.purchasedOn,
      downloads: purchases.downloads,
    })
    .from(purchases)
    .innerJoin(resources, eq(purchases.resourceId, resources.id))
    .innerJoin(universities, eq(resources.institutionId, universities.id))
    .where(eq(purchases.userId, userId))
    .orderBy(desc(purchases.createdAt));
  return rows;
}

export async function getOrders(userId: string): Promise<Order[]> {
  const orderRows = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));
  const items = await db
    .select()
    .from(orderItems)
    .where(
      orderRows.length
        ? or(...orderRows.map((o) => eq(orderItems.orderId, o.id)))
        : sql`false`,
    );
  return orderRows.map((o) => ({
    id: o.id,
    date: o.date,
    items: items.filter((it) => it.orderId === o.id).map((it) => it.title),
    totalNaira: o.totalNaira,
    status: o.status as Order["status"],
    method: o.method as Order["method"],
  }));
}

export async function getDownloadHistory(userId: string): Promise<DownloadEntry[]> {
  const rows = await db
    .select()
    .from(downloads)
    .where(eq(downloads.userId, userId));
  return rows.map((d) => ({
    id: d.id,
    resourceId: d.resourceId,
    title: d.title,
    type: d.type,
    downloadedOn: d.downloadedOn,
    sizeMb: d.sizeMb,
  }));
}

export async function getSavedSearches(userId: string): Promise<SavedSearch[]> {
  const rows = await db
    .select()
    .from(savedSearches)
    .where(eq(savedSearches.userId, userId));
  return rows.map((s) => ({
    id: s.id,
    query: s.query,
    filtersLabel: s.filtersLabel,
    newMatches: s.newMatches,
    savedOn: s.savedOn,
  }));
}

export async function getNotifications(userId: string): Promise<DashNotification[]> {
  const rows = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId));
  return rows.map((n) => ({
    id: n.id,
    kind: n.kind as DashNotification["kind"],
    title: n.title,
    body: n.body,
    time: n.time,
    read: n.read,
  }));
}

export async function hasPurchased(userId: string, resourceId: string): Promise<boolean> {
  const [row] = await db
    .select({ id: purchases.id })
    .from(purchases)
    .where(and(eq(purchases.userId, userId), eq(purchases.resourceId, resourceId)))
    .limit(1);
  return Boolean(row);
}

/** A user may review a resource if they've bought it and not reviewed it yet. */
export async function canReviewResource(
  userId: string,
  resourceId: string,
): Promise<boolean> {
  const [bought] = await db
    .select({ id: purchases.id })
    .from(purchases)
    .where(and(eq(purchases.userId, userId), eq(purchases.resourceId, resourceId)))
    .limit(1);
  if (!bought) return false;
  const [reviewed] = await db
    .select({ id: reviews.id })
    .from(reviews)
    .where(and(eq(reviews.userId, userId), eq(reviews.resourceId, resourceId)))
    .limit(1);
  return !reviewed;
}

export async function isWishlisted(userId: string, resourceId: string): Promise<boolean> {
  const [row] = await db
    .select({ id: wishlists.id })
    .from(wishlists)
    .where(and(eq(wishlists.userId, userId), eq(wishlists.resourceId, resourceId)))
    .limit(1);
  return Boolean(row);
}

export async function getWishlistedIds(userId: string): Promise<Set<string>> {
  const rows = await db
    .select({ resourceId: wishlists.resourceId })
    .from(wishlists)
    .where(eq(wishlists.userId, userId));
  return new Set(rows.map((r) => r.resourceId));
}

export async function getWishlist(userId: string): Promise<Resource[]> {
  const rows = await baseResourceQuery()
    .innerJoin(wishlists, eq(wishlists.resourceId, resources.id))
    .where(eq(wishlists.userId, userId));
  return (rows as Record<string, unknown>[]).map(toResource);
}

export async function getDashStats(userId: string): Promise<DashStats> {
  const [p] = await db
    .select({ count: sql<number>`count(*)::int`, spend: sql<number>`coalesce(sum(${purchases.priceNaira}),0)::int` })
    .from(purchases)
    .where(eq(purchases.userId, userId));
  const [d] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(downloads)
    .where(eq(downloads.userId, userId));
  const [w] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(wishlists)
    .where(eq(wishlists.userId, userId));
  return {
    purchases: p?.count ?? 0,
    downloads: d?.count ?? 0,
    wishlist: w?.count ?? 0,
    totalSpendNaira: p?.spend ?? 0,
  };
}

export async function getUnreadNotificationCount(userId: string): Promise<number> {
  const [row] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(notifications)
    .where(and(eq(notifications.userId, userId), eq(notifications.read, false)));
  return row?.count ?? 0;
}

export type { ResourceRow };
