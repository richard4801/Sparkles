import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { resolveGender, makeAvatarSeed } from "../lib/avatar";

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
  const db = drizzle(pool);
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Migrations applied.");
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
