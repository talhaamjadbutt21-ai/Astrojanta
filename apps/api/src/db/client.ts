import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import type { Env } from "../env";
import * as schema from "./schema";

export type Db = PgDatabase<PgQueryResultHKT, typeof schema>;

export interface Database {
  db: Db;
  close(): Promise<void>;
}

/** Supabase transaction pooler (port 6543) does not support prepared statements. */
function usesPreparedStatements(url: string): boolean {
  try {
    return new URL(url).port !== "6543";
  } catch {
    return true;
  }
}

/** Connects to Postgres when DATABASE_URL is set, otherwise to an embedded PGlite instance. Runs migrations. */
export async function connectDatabase(env: Env): Promise<Database> {
  const migrationsFolder = resolve(process.cwd(), env.MIGRATIONS_DIR);

  if (env.DATABASE_URL) {
    const [{ default: postgres }, { drizzle }, { migrate }] = await Promise.all([
      import("postgres"),
      import("drizzle-orm/postgres-js"),
      import("drizzle-orm/postgres-js/migrator"),
    ]);
    const migrateUrl = env.DATABASE_MIGRATE_URL ?? env.DATABASE_URL;

    if (migrateUrl !== env.DATABASE_URL) {
      const migrateClient = postgres(migrateUrl, { max: 1, prepare: true });
      const migrateDb = drizzle({ client: migrateClient, schema });
      await migrate(migrateDb, { migrationsFolder });
      await migrateClient.end({ timeout: 5 });
    }

    const client = postgres(env.DATABASE_URL, {
      max: 10,
      prepare: usesPreparedStatements(env.DATABASE_URL),
    });
    const db = drizzle({ client, schema });
    if (migrateUrl === env.DATABASE_URL) {
      await migrate(db, { migrationsFolder });
    }
    return { db: db as unknown as Db, close: () => client.end() };
  }

  const [{ PGlite }, { drizzle }, { migrate }] = await Promise.all([
    import("@electric-sql/pglite"),
    import("drizzle-orm/pglite"),
    import("drizzle-orm/pglite/migrator"),
  ]);
  const inMemory = env.PGLITE_DIR.startsWith("memory://");
  if (!inMemory) mkdirSync(env.PGLITE_DIR, { recursive: true });
  const client = new PGlite(inMemory ? env.PGLITE_DIR : resolve(env.PGLITE_DIR));
  const db = drizzle({ client, schema });
  await migrate(db, { migrationsFolder });
  return { db: db as unknown as Db, close: () => client.close() };
}
