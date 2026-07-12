import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
import * as schema from "./schema";
import {
  resources as mockResources,
  categories as mockCategories,
  universities as mockUniversities,
  reviews as mockReviews,
} from "../lib/data";
import {
  currentUser,
  purchases as mockPurchases,
  orders as mockOrders,
  downloadHistory,
  savedSearches as mockSaved,
  notifications as mockNotifs,
} from "../lib/dashboard-data";

function slugify(v: string) {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function shortNameFrom(name: string) {
  const caps = name.replace(/[^A-Z]/g, "");
  if (caps.length >= 3) return caps.slice(0, 6);
  return name.split(/\s+/)[0].slice(0, 6).toUpperCase();
}

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });

  console.log("Clearing existing rows...");
  await db.execute(sql`
    TRUNCATE TABLE
      notifications, saved_searches, downloads, wishlists,
      order_items, orders, purchases, reviews, resources,
      users, categories, universities
    RESTART IDENTITY CASCADE
  `);

  // Categories
  console.log("Seeding categories...");
  const insertedCats = await db
    .insert(schema.categories)
    .values(
      mockCategories.map((c) => ({
        slug: c.slug,
        name: c.name,
        iconName: c.iconName,
        accent: c.accent,
      })),
    )
    .returning();
  const catBySlug = new Map(insertedCats.map((c) => [c.slug, c.id]));

  // Universities: from the mock list + any institution referenced by a resource.
  console.log("Seeding universities...");
  const uniByName = new Map<string, { slug: string; name: string; shortName: string; logoSeed: string }>();
  for (const u of mockUniversities) {
    uniByName.set(u.name, {
      slug: u.slug,
      name: u.name,
      shortName: u.shortName,
      logoSeed: u.logoSeed,
    });
  }
  for (const r of mockResources) {
    if (!uniByName.has(r.institution)) {
      uniByName.set(r.institution, {
        slug: slugify(r.institution),
        name: r.institution,
        shortName: shortNameFrom(r.institution),
        logoSeed: slugify(r.institution),
      });
    }
  }
  const insertedUnis = await db
    .insert(schema.universities)
    .values([...uniByName.values()])
    .returning();
  const uniIdByName = new Map(insertedUnis.map((u) => [u.name, u.id]));

  // Resources
  console.log(`Seeding ${mockResources.length} resources...`);
  await db.insert(schema.resources).values(
    mockResources.map((r) => {
      const categoryId = catBySlug.get(slugify(r.category));
      const institutionId = uniIdByName.get(r.institution);
      if (!categoryId) throw new Error(`No category for ${r.category}`);
      if (!institutionId) throw new Error(`No institution for ${r.institution}`);
      return {
        id: r.id,
        title: r.title,
        type: r.type,
        categoryId,
        institutionId,
        department: r.department,
        faculty: r.faculty,
        course: r.course,
        description: r.description,
        abstract: r.abstract,
        tableOfContents: r.tableOfContents,
        rating: r.rating,
        reviewsCount: r.reviews,
        downloads: r.downloads,
        pages: r.pages,
        priceNaira: r.priceNaira,
        level: r.level,
        year: r.year,
        thumbnailSeed: r.thumbnailSeed,
        trending: Boolean(r.trending),
        createdAt: new Date(Date.now() - r.addedDaysAgo * 86_400_000),
      };
    }),
  );

  // Reviews
  console.log(`Seeding ${mockReviews.length} reviews...`);
  await db.insert(schema.reviews).values(
    mockReviews.map((rv) => ({
      id: rv.id,
      resourceId: rv.resourceId,
      name: rv.name,
      avatarSeed: rv.avatarSeed,
      rating: rv.rating,
      date: rv.date,
      body: rv.body,
    })),
  );

  // Users: a populated demo account + an admin.
  console.log("Seeding users...");
  const [demo] = await db
    .insert(schema.users)
    .values({
      name: currentUser.name,
      email: "demo@sparklyn.ng",
      passwordHash: await bcrypt.hash("password123", 10),
      avatarSeed: currentUser.avatarSeed,
      institution: currentUser.institution,
      department: currentUser.department,
      level: currentUser.level,
      role: "user",
      emailVerified: new Date(),
    })
    .returning();
  await db.insert(schema.users).values({
    name: "Sparklyn Admin",
    email: "admin@sparklyn.ng",
    passwordHash: await bcrypt.hash("admin123", 10),
    avatarSeed: "sparklyn-admin",
    role: "admin",
    emailVerified: new Date(),
  });

  // Demo user's commerce + activity
  console.log("Seeding demo account activity...");
  await db.insert(schema.purchases).values(
    mockPurchases.map((p) => ({
      id: p.id,
      userId: demo.id,
      resourceId: p.resourceId,
      priceNaira: p.priceNaira,
      purchasedOn: p.purchasedOn,
      downloads: p.downloads,
    })),
  );

  for (const o of mockOrders) {
    await db.insert(schema.orders).values({
      id: o.id,
      userId: demo.id,
      date: o.date,
      totalNaira: o.totalNaira,
      status: o.status,
      method: o.method,
    });
    await db.insert(schema.orderItems).values(
      o.items.map((title) => ({
        orderId: o.id,
        resourceId: mockResources.find((r) => r.title === title)?.id ?? null,
        title,
        priceNaira: 0,
      })),
    );
  }

  await db.insert(schema.downloads).values(
    downloadHistory.map((d) => ({
      id: d.id,
      userId: demo.id,
      resourceId: d.resourceId,
      title: d.title,
      type: d.type,
      downloadedOn: d.downloadedOn,
      sizeMb: d.sizeMb,
    })),
  );

  await db.insert(schema.savedSearches).values(
    mockSaved.map((s) => ({
      id: s.id,
      userId: demo.id,
      query: s.query,
      filtersLabel: s.filtersLabel,
      newMatches: s.newMatches,
      savedOn: s.savedOn,
    })),
  );

  await db.insert(schema.notifications).values(
    mockNotifs.map((n) => ({
      id: n.id,
      userId: demo.id,
      kind: n.kind,
      title: n.title,
      body: n.body,
      time: n.time,
      read: n.read,
    })),
  );

  // A small wishlist for the demo user.
  const wishlistResourceIds = mockResources.slice(2, 2 + 5).map((r) => r.id);
  await db.insert(schema.wishlists).values(
    wishlistResourceIds.map((resourceId) => ({ userId: demo.id, resourceId })),
  );

  await pool.end();
  console.log("Seed complete.");
  console.log("  Demo login:  demo@sparklyn.ng / password123");
  console.log("  Admin login: admin@sparklyn.ng / admin123");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
