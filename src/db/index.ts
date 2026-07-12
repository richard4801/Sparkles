import "server-only";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Reuse a single pool across hot reloads / serverless invocations.
const globalForDb = globalThis as unknown as { __sparklynPool?: Pool };

const pool =
  globalForDb.__sparklynPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  });

if (process.env.NODE_ENV !== "production") globalForDb.__sparklynPool = pool;

export const db = drizzle(pool, { schema });
export { schema };
