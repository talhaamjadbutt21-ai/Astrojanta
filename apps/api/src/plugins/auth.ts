import { CLIENT_HEADER, MOBILE_CLIENT, SESSION_COOKIE } from "@sebt/shared";
import { and, eq, gt } from "drizzle-orm";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { Db } from "../db/client";
import { sessions, users } from "../db/schema";
import type { Env } from "../env";
import { newSessionToken, sha256 } from "../lib/crypto";
import { AppError, unauthenticated } from "../lib/errors";

export interface AuthContext {
  userId: string;
  email: string;
  sessionId: string;
  via: "cookie" | "bearer";
}

declare module "fastify" {
  interface FastifyRequest {
    auth: AuthContext | null;
  }
}

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

export function isMobileClient(request: FastifyRequest): boolean {
  return request.headers[CLIENT_HEADER] === MOBILE_CLIENT;
}

function readToken(request: FastifyRequest): { token: string; via: AuthContext["via"] } | null {
  const header = request.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    const token = header.slice(7).trim();
    return token ? { token, via: "bearer" } : null;
  }
  const cookie = request.cookies[SESSION_COOKIE];
  return cookie ? { token: cookie, via: "cookie" } : null;
}

export function registerAuth(app: FastifyInstance, db: Db, env: Env) {
  const allowedOrigins = new Set(env.CORS_ORIGINS);

  app.decorateRequest("auth", null);

  app.addHook("onRequest", async (request, reply) => {
    // CSRF defence: browsers always send Origin on cross-site state-changing requests.
    const origin = request.headers.origin;
    if (!SAFE_METHODS.has(request.method) && origin && !allowedOrigins.has(origin)) {
      throw new AppError("FORBIDDEN", "Origin not allowed");
    }

    const found = readToken(request);
    if (!found) return;

    const [row] = await db
      .select({ sessionId: sessions.id, userId: users.id, email: users.email })
      .from(sessions)
      .innerJoin(users, eq(users.id, sessions.userId))
      .where(and(eq(sessions.id, sha256(found.token)), gt(sessions.expiresAt, new Date())))
      .limit(1);

    if (row) request.auth = { ...row, via: found.via };
    else if (found.via === "cookie") reply.clearCookie(SESSION_COOKIE, { path: "/" });
  });
}

export function requireAuth(request: FastifyRequest): AuthContext {
  if (!request.auth) throw unauthenticated();
  return request.auth;
}

/** Creates a session and delivers it as an httpOnly cookie (web) or returns the token (mobile). */
export async function startSession(
  db: Db,
  env: Env,
  request: FastifyRequest,
  reply: FastifyReply,
  userId: string,
): Promise<string | undefined> {
  const token = newSessionToken();
  const mobile = isMobileClient(request);
  const maxAgeSeconds = env.SESSION_TTL_DAYS * 86_400;

  await db.insert(sessions).values({
    id: sha256(token),
    userId,
    client: mobile ? "mobile" : "web",
    userAgent: request.headers["user-agent"]?.slice(0, 256) ?? null,
    expiresAt: new Date(Date.now() + maxAgeSeconds * 1000),
  });

  if (mobile) return token;

  reply.setCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSeconds,
  });
  return undefined;
}

export async function endSession(db: Db, reply: FastifyReply, auth: AuthContext) {
  await db.delete(sessions).where(eq(sessions.id, auth.sessionId));
  reply.clearCookie(SESSION_COOKIE, { path: "/" });
}
