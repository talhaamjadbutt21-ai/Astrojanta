import { existsSync } from "node:fs";
import { buildApp } from "./app";
import { connectDatabase } from "./db/client";
import { loadEnv } from "./env";

if (existsSync(".env")) process.loadEnvFile(".env");

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
