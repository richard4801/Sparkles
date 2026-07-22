import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

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
  await pool.end();
  console.log("Migrations applied.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
