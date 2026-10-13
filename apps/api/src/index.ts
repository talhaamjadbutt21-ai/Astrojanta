import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildApp } from "./app";
import { connectDatabase } from "./db/client";
import { loadEnv } from "./env";

const apiRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(apiRoot, ".env");
if (existsSync(envPath)) process.loadEnvFile(envPath);
else console.warn(`No ${envPath} found. Copy .env.example to .env and add SUPABASE_* keys.`);

const env = loadEnv();
const database = await connectDatabase(env);
const app = await buildApp({ db: database.db, env });

const shutdown = async (signal: string) => {
  app.log.info(`${signal} received, shutting down`);
  await app.close();
  await database.close();
  process.exit(0);
};
process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));

await app.listen({ host: env.HOST, port: env.PORT });
