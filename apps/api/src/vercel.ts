import type { IncomingMessage, ServerResponse } from "node:http";
import type { FastifyInstance } from "fastify";
import { buildApp } from "./app";
import { connectDatabase } from "./db/client";
import { loadEnv } from "./env";

/**
 * Vercel serverless entry. One Fastify instance per warm function instance.
 * - Env comes from the Vercel project settings (no .env file is read).
 * - Migrations never run here; run them from a trusted machine (see DEPLOY.md).
 * - One DB connection per instance; use the Supabase transaction pooler (port 6543, prepared statements off).
 */
let appPromise: Promise<FastifyInstance> | undefined;

async function init(): Promise<FastifyInstance> {
  const env = loadEnv();
  const database = await connectDatabase(env, { migrate: false, maxConnections: 1 });
  const app = await buildApp({ db: database.db, env });
  await app.ready();
  return app;
}

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  appPromise ??= init().catch((err) => {
    appPromise = undefined; // retry on next request instead of caching a failed boot
    throw err;
  });
  let app: FastifyInstance;
  try {
    app = await appPromise;
  } catch (err) {
    console.error("API failed to start:", err instanceof Error ? err.message : err);
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ error: { code: "INTERNAL", message: "Something went wrong" } }));
    return;
  }
  app.server.emit("request", req, res);
}
