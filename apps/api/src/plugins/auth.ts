import { CLIENT_HEADER, MOBILE_CLIENT, REFRESH_COOKIE, SESSION_COOKIE } from "@astrojanta/shared";
import { eq } from "drizzle-orm";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { AuthSession, IdentityProvider, IdentityUser } from "../auth";
import type { Db } from "../db/client";
import { users } from "../db/schema";
import type { Env } from "../env";
import { sha256 } from "../lib/crypto";
import { AppError, forbidden, unauthenticated } from "../lib/errors";

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

function cookieOptions(env: Env) {
  return {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: env.SESSION_TTL_DAYS * 86_400,
  };
}

export function setAuthCookies(reply: FastifyReply, env: Env, session: AuthSession) {
  const opts = cookieOptions(env);
  reply.setCookie(SESSION_COOKIE, session.accessToken, opts);
  reply.setCookie(REFRESH_COOKIE, session.refreshToken, opts);
}

export function clearAuthCookies(reply: FastifyReply) {
  reply.clearCookie(SESSION_COOKIE, { path: "/" });
  reply.clearCookie(REFRESH_COOKIE, { path: "/" });
}

export async function syncLocalUser(db: Db, identity: IdentityUser) {
  const [existing] = await db.select().from(users).where(eq(users.id, identity.id)).limit(1);
  if (existing) {
    if (existing.email === identity.email) return existing;
    const [updated] = await db
      .update(users)
      .set({ email: identity.email })
      .where(eq(users.id, identity.id))
      .returning();
    return updated ?? existing;
  }

  const [created] = await db
    .insert(users)
    .values({ id: identity.id, email: identity.email })
    .onConflictDoNothing({ target: users.email })
    .returning();
  if (created) return created;

  const [byEmail] = await db.select().from(users).where(eq(users.email, identity.email)).limit(1);
  if (byEmail) return byEmail;
  throw new AppError("INTERNAL", "Something went wrong");
}

export function registerAuth(app: FastifyInstance, db: Db, env: Env, identity: IdentityProvider) {
  const allowedOrigins = new Set(env.CORS_ORIGINS);

  app.decorateRequest("auth", null);

  app.addHook("onRequest", async (request, reply) => {
    const origin = request.headers.origin;
    if (!SAFE_METHODS.has(request.method) && origin && !allowedOrigins.has(origin)) {
      throw new AppError("FORBIDDEN", "Origin not allowed");
    }

    const found = readToken(request);
    const refreshToken = found?.via === "cookie" ? request.cookies[REFRESH_COOKIE] : undefined;
    let user = found ? await identity.getUser(found.token) : null;
    let accessToken = found?.token;

    if (!user && refreshToken) {
      const rotated = await identity.refresh(refreshToken);
      if (rotated) {
        setAuthCookies(reply, env, rotated);
        user = rotated.user;
        accessToken = rotated.accessToken;
      }
    }

    if (user && accessToken) {
      const local = await syncLocalUser(db, user);
      request.auth = {
        userId: local.id,
        email: local.email,
        sessionId: sha256(accessToken),
        via: found?.via ?? "cookie",
      };
      return;
    }

    if (found?.via === "cookie") clearAuthCookies(reply);
  });
}

export function requireAuth(request: FastifyRequest): AuthContext {
  if (!request.auth) throw unauthenticated();
  return request.auth;
}

export function isAdminEmail(email: string, env: Env): boolean {
  return env.ADMIN_EMAILS.includes(email.toLowerCase());
}

export function requireAdmin(request: FastifyRequest, env: Env): AuthContext {
  const auth = requireAuth(request);
  if (!isAdminEmail(auth.email, env)) throw forbidden();
  return auth;
}

/** Delivers a session as httpOnly cookies (web) or returns the access token (mobile). */
export async function deliverSession(
  env: Env,
  request: FastifyRequest,
  reply: FastifyReply,
  session: AuthSession,
): Promise<string | undefined> {
  if (isMobileClient(request)) return session.accessToken;
  setAuthCookies(reply, env, session);
  return undefined;
}

export async function endSession(identity: IdentityProvider, request: FastifyRequest, reply: FastifyReply) {
  const found = readToken(request);
  if (found) await identity.revoke(found.token);
  clearAuthCookies(reply);
}
