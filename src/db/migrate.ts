import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { resolveGender, makeAvatarSeed } from "../lib/avatar";

/**
 * Idempotent column guards, applied with raw SQL *independently* of the Drizzle
 * migrator. Prod's migration journal has drifted from the real schema before
 * (additive columns were added by hand), which makes `migrate()` throw on an
 * already-applied migration — and because the build swallows migration errors so
 * a bad journal can't block a deploy, any brand-new column would silently never
 * land, shipping code that selects a column that doesn't exist (→ 500 on every
 * page that reads it). These guards close that gap: they run first, each on its
 * own, so the columns the current code depends on always exist regardless of
 * journal state. Add a line here whenever the schema gains an additive column.
 */
const COLUMN_GUARDS = [
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "gender" text`,
  `ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "avatar_seed" text NOT NULL DEFAULT 'new-student'`,
  `ALTER TABLE "resources" ADD COLUMN IF NOT EXISTS "image_url" text`,
  `ALTER TABLE "resources" ADD COLUMN IF NOT EXISTS "preview_images" jsonb`,
];

async function ensureColumns(pool: Pool) {
  for (const sql of COLUMN_GUARDS) {
    try {
      await pool.query(sql);
    } catch (err) {
      // One guard failing (e.g. a table that doesn't exist yet) must not stop
      // the others — the Drizzle migrate pass below handles fresh databases.
      console.error("Column guard skipped:", sql, err);
    }
  }
  console.log("Column guards applied.");
}

/**
 * Force-fix mis-gendered avatars for every existing account. An account's gender
 * is its explicit signup choice when set, otherwise a guess from the name. Any
 * seed whose baked-in gender prefix disagrees is regenerated in place — so a
 * fix lands immediately on deploy instead of waiting for each user's next login.
 */
async function backfillAvatars(pool: Pool) {
  const { rows } = await pool.query<{
    id: string;
    name: string;
    gender: string | null;
    avatar_seed: string | null;
  }>("SELECT id, name, gender, avatar_seed FROM users");

  let fixed = 0;
  for (const u of rows) {
    const stored = /^([fm])-/.exec(u.avatar_seed ?? "")?.[1];
    const desired = resolveGender(u.gender, u.name);
    if (!u.avatar_seed || u.avatar_seed === "new-student" || stored !== desired) {
      const seed = makeAvatarSeed(u.name, u.gender);
      await pool.query("UPDATE users SET avatar_seed = $1 WHERE id = $2", [seed, u.id]);
      fixed += 1;
    }
  }
  console.log(`Avatar backfill: ${fixed} of ${rows.length} account(s) corrected.`);
}

async function main() {
  // Runs as part of the build (see package.json). If no database is configured
  // — e.g. a local build without env — skip quietly rather than fail the build.
  if (!process.env.DATABASE_URL) {
    console.log("Migrations skipped — DATABASE_URL is not set.");
    return;
  }
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  // Guarantee critical columns exist *before* anything reads them, so a drifted
  // migration journal can't leave the deploy serving code that 500s.
  await ensureColumns(pool);

  try {
    const db = drizzle(pool);
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations applied.");
  } catch (err) {
    // The column guards above already cover the additive changes the running
    // code needs; a migrator hiccup on a drifted journal shouldn't abort the
    // rest (or the deploy). The strict `db:migrate` script still surfaces these.
    console.error("Drizzle migrate skipped:", err);
  }

  try {
    await backfillAvatars(pool);
  } catch (err) {
    // Never let the one-time backfill block a deploy.
    console.error("Avatar backfill skipped:", err);
  }
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  // During the build (MIGRATE_NONFATAL=1) a migration problem must never block a
  // deploy — log it and carry on. The schema may already be correct (e.g. a
  // column added by hand). The explicit `db:migrate` script stays strict.
  process.exit(process.env.MIGRATE_NONFATAL ? 0 : 1);
});
