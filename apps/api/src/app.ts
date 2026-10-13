import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import type { ApiErrorBody } from "@astronex/shared";
import Fastify, { type FastifyError, type FastifyInstance } from "fastify";
import { type Astrologer, createAstrologer } from "./ai/agent";
import { createIdentityProvider, type IdentityProvider } from "./auth";
import type { Db } from "./db/client";
import { llmProvider, type Env } from "./env";
import { FieldCipher } from "./lib/crypto";
import { AppError } from "./lib/errors";
import { registerAuth } from "./plugins/auth";
import { adminRoutes } from "./routes/admin";
import { authRoutes } from "./routes/auth";
import { chartRoutes } from "./routes/charts";
import { chatRoutes } from "./routes/chat";
import { matchingRoutes } from "./routes/matching";
import { placeRoutes } from "./routes/places";
import { usageRoutes } from "./routes/usage";
import { proRoutes } from "./routes/pro";
import { profileRoutes } from "./routes/profiles";
import { createMailer, type Mailer } from "./services/mail";
import { ProfileService } from "./services/profiles";

export interface AppContext {
  db: Db;
  env: Env;
  identity: IdentityProvider;
  profiles: ProfileService;
  astrologer: Astrologer;
  mailer: Mailer;
}

export interface BuildAppOptions {
  db: Db;
  env: Env;
  /** Override the AI layer (used by tests). */
  astrologer?: Astrologer;
  /** Override identity (tests default to in-memory email/password). */
  identity?: IdentityProvider;
}

export async function buildApp({ db, env, astrologer, identity: identityOverride }: BuildAppOptions): Promise<FastifyInstance> {
  const app = Fastify({
    trustProxy: env.TRUST_PROXY,
    bodyLimit: 64 * 1024,
    logger:
      env.NODE_ENV === "test"
        ? false
        : {
            level: env.NODE_ENV === "production" ? "info" : "debug",
            redact: ["req.headers.authorization", "req.headers.cookie"],
          },
  });

  await app.register(helmet, { contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: "same-site" } });
  await app.register(cors, {
    origin: env.CORS_ORIGINS,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    exposedHeaders: ["x-conversation-id"],
  });
  await app.register(cookie);
  await app.register(rateLimit, {
    max: 300,
    timeWindow: "1 minute",
    errorResponseBuilder: (_req, ctx) => ({
      statusCode: ctx.statusCode,
      code: "RATE_LIMITED",
      message: `Too many requests. Try again in ${ctx.after}.`,
    }),
  });

  app.setErrorHandler((error: FastifyError | AppError, request, reply) => {
    if (error instanceof AppError) return reply.code(error.statusCode).send(error.toBody());

    const status = error.statusCode ?? 500;
    if (status === 429) {
      return reply.code(429).send({ error: { code: "RATE_LIMITED", message: error.message } } satisfies ApiErrorBody);
    }
    if (status >= 400 && status < 500) {
      return reply.code(status).send({ error: { code: "VALIDATION", message: error.message } } satisfies ApiErrorBody);
    }
    request.log.error({ err: error }, "unhandled error");
    return reply
      .code(500)
      .send({ error: { code: "INTERNAL", message: "Something went wrong" } } satisfies ApiErrorBody);
  });

  app.setNotFoundHandler((_req, reply) =>
    reply.code(404).send({ error: { code: "NOT_FOUND", message: "Route not found" } } satisfies ApiErrorBody),
  );

  const cipher = new FieldCipher(env.DATA_ENCRYPTION_KEY, env.NODE_ENV !== "production");
  if (!env.DATA_ENCRYPTION_KEY && env.NODE_ENV === "development") {
    app.log.warn("DATA_ENCRYPTION_KEY not set: using an insecure development key");
  }
  if (!llmProvider(env) && env.NODE_ENV !== "test") {
    app.log.warn("GEMINI_API_KEY not set: AI chat is in offline chart-summary mode");
  }

  const identity = identityOverride ?? createIdentityProvider(env);
  if (identity.kind === "memory" && env.NODE_ENV === "development") {
    app.log.warn("SUPABASE_* not set: using in-memory auth (accounts reset on restart)");
  }

  const mailer = createMailer(env);
  if (!mailer.enabled && env.NODE_ENV !== "test") {
    app.log.warn("RESEND_API_KEY / MAIL_FROM not set: Pro request emails are not sent (mailto fallback only)");
  }

  const ctx: AppContext = {
    db,
    env,
    identity,
    profiles: new ProfileService(db, cipher),
    astrologer: astrologer ?? createAstrologer(env),
    mailer,
  };

  registerAuth(app, db, env, identity);

  app.get("/api/health", async () => ({
    ok: true,
    ai: ctx.astrologer.mode,
    auth: identity.kind,
    payments: "manual",
    mail: mailer.enabled,
  }));
  await app.register(authRoutes, ctx);
  await app.register(chartRoutes, ctx);
  await app.register(matchingRoutes, ctx);
  await app.register(usageRoutes, ctx);
  await app.register(proRoutes, ctx);
  await app.register(placeRoutes, ctx);
  await app.register(profileRoutes, ctx);
  await app.register(chatRoutes, ctx);
  await app.register(adminRoutes, ctx);

  return app;
}
