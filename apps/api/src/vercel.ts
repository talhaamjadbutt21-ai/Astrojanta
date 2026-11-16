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
 * - The handler must await the HTTP response. Emitting "request" and returning immediately let Vercel
 *   freeze or reuse the instance while a hijacked chat stream (or a request queued behind it) was still
 *   running, which showed up as 300s timeouts on unrelated routes such as /api/pro/config.
 */
let appPromise: Promise<FastifyInstance> | undefined;

async function init(): Promise<FastifyInstance> {
  const env = loadEnv();
  const database = await connectDatabase(env, { migrate: false, maxConnections: 1 });
  const app = await buildApp({ db: database.db, env });
  await app.ready();
  return app;
}

function waitForResponse(res: ServerResponse): Promise<void> {
  if (res.writableEnded || res.writableFinished) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const done = () => {
      res.off("finish", done);
      res.off("close", done);
      res.off("error", onError);
      resolve();
    };
    const onError = (err: Error) => {
      res.off("finish", done);
      res.off("close", done);
      res.off("error", onError);
      reject(err);
    };
    res.on("finish", done);
    res.on("close", done);
    res.on("error", onError);
  });
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
  const finished = waitForResponse(res);
  app.server.emit("request", req, res);
  await finished;
}
