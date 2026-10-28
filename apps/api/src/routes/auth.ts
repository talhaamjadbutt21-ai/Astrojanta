import { type AuthResponse, loginSchema, registerSchema, type User } from "@astrojanta/shared";
import { eq } from "drizzle-orm";
import type { FastifyInstance } from "fastify";
import type { AppContext } from "../app";
import { users } from "../db/schema";
import type { Env } from "../env";
import { AppError } from "../lib/errors";
import { parse } from "../lib/validate";
import {
  clearAuthCookies,
  deliverSession,
  endSession,
  isAdminEmail,
  requireAuth,
  syncLocalUser,
} from "../plugins/auth";
import { isProUntil } from "../services/entitlements";

const toUser = (u: { id: string; email: string; createdAt: Date; proUntil: Date | null }, env: Env): User => ({
  id: u.id,
  email: u.email,
  createdAt: u.createdAt.toISOString(),
  admin: isAdminEmail(u.email, env),
  pro: isProUntil(u.proUntil),
  proUntil: u.proUntil?.toISOString() ?? null,
});

const AUTH_RATE_LIMIT = { config: { rateLimit: { max: 10, timeWindow: "1 minute" } } };

export async function authRoutes(app: FastifyInstance, { db, env, identity }: AppContext) {
  app.post("/api/auth/register", AUTH_RATE_LIMIT, async (request, reply) => {
    const input = parse(registerSchema, request.body);
    const session = await identity.register(input.email, input.password);
    const user = await syncLocalUser(db, session.user);
    const token = await deliverSession(env, request, reply, session);
    const body: AuthResponse = { user: toUser(user, env), ...(token ? { token } : {}) };
    return reply.code(201).send(body);
  });

  app.post("/api/auth/login", AUTH_RATE_LIMIT, async (request, reply) => {
    const input = parse(loginSchema, request.body);
    const session = await identity.login(input.email, input.password);
    const user = await syncLocalUser(db, session.user);
    const token = await deliverSession(env, request, reply, session);
    const body: AuthResponse = { user: toUser(user, env), ...(token ? { token } : {}) };
    return body;
  });

  app.post("/api/auth/logout", async (request, reply) => {
    requireAuth(request);
    await endSession(identity, request, reply);
    return reply.code(204).send();
  });

  /** Session check. Signed-out visitors get 200 { user: null } so the browser doesn't log a 401 on every page. */
  app.get("/api/auth/me", async (request) => {
    if (!request.auth) return { user: null };
    const [user] = await db.select().from(users).where(eq(users.id, request.auth.userId)).limit(1);
    if (!user) return { user: null };
    return { user: toUser(user, env) };
  });

  /** Permanently deletes the account and all associated data (DPDP Act right to erasure). */
  app.delete("/api/auth/me", async (request, reply) => {
    const auth = requireAuth(request);
    await identity.deleteAccount(auth.userId);
    await db.delete(users).where(eq(users.id, auth.userId));
    clearAuthCookies(reply);
    return reply.code(204).send();
  });
}
