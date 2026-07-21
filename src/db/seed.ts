import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import {
  resources as mockResources,
  categories as mockCategories,
  universities as mockUniversities,
  reviews as mockReviews,
} from "../lib/data";

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

/**
 * Seeds the catalogue only — categories, universities, resources and reviews.
 * No user accounts are created: Sparklyn is a first-party library, so real
 * users register through the app. To grant yourself admin, run:
 *   UPDATE users SET role = 'admin' WHERE email = 'you@example.com';
 */
async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });

  // Non-destructive: insert catalogue rows that don't already exist. Safe to run
  // against a live database — it never touches users or their purchases.
  console.log("Seeding categories...");
  await db
    .insert(schema.categories)
    .values(
      mockCategories.map((c) => ({
        slug: c.slug,
        name: c.name,
        iconName: c.iconName,
        accent: c.accent,
      })),
    )
    .onConflictDoNothing();
  const allCats = await db.select().from(schema.categories);
  const catBySlug = new Map(allCats.map((c) => [c.slug, c.id]));

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
  await db
    .insert(schema.universities)
    .values([...uniByName.values()])
    .onConflictDoNothing();
  const allUnis = await db.select().from(schema.universities);
  const uniIdByName = new Map(allUnis.map((u) => [u.name, u.id]));

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
  ).onConflictDoNothing();

  // Reviews (catalogue seed data; no user attribution)
  console.log(`Seeding ${mockReviews.length} reviews...`);
  await db
    .insert(schema.reviews)
    .values(
      mockReviews.map((rv) => ({
        id: rv.id,
        resourceId: rv.resourceId,
        name: rv.name,
        avatarSeed: rv.avatarSeed,
        rating: rv.rating,
        date: rv.date,
        body: rv.body,
      })),
    )
    .onConflictDoNothing();

  await pool.end();
  console.log("Seed complete — catalogue only. Register a real account in the app,");
  console.log("then grant admin with: UPDATE users SET role='admin' WHERE email='you@example.com';");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
