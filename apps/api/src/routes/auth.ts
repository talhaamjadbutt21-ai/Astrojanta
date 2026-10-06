import { eq } from "drizzle-orm";
import type { FastifyInstance } from "fastify";
import { loginSchema, registerSchema, SESSION_COOKIE, type AuthResponse, type User } from "@sebt/shared";
import { users } from "../db/schema";
import { AppError } from "../lib/errors";
import { hashPassword, verifyAgainstDummy, verifyPassword } from "../lib/password";
import { parse } from "../lib/validate";
import { endSession, requireAuth, startSession } from "../plugins/auth";
import type { AppContext } from "../app";

const toUser = (u: { id: string; email: string; createdAt: Date }): User => ({
  id: u.id,
  email: u.email,
  createdAt: u.createdAt.toISOString(),
});

const AUTH_RATE_LIMIT = { config: { rateLimit: { max: 10, timeWindow: "1 minute" } } };

export async function authRoutes(app: FastifyInstance, { db, env }: AppContext) {
  app.post("/api/auth/register", AUTH_RATE_LIMIT, async (request, reply) => {
    const input = parse(registerSchema, request.body);
    const passwordHash = await hashPassword(input.password);

    const [user] = await db
      .insert(users)
      .values({ email: input.email, passwordHash })
      .onConflictDoNothing({ target: users.email })
      .returning();
    if (!user) throw new AppError("CONFLICT", "An account with this email already exists");

    const token = await startSession(db, env, request, reply, user.id);
    const body: AuthResponse = { user: toUser(user), ...(token ? { token } : {}) };
    return reply.code(201).send(body);
  });

  app.post("/api/auth/login", AUTH_RATE_LIMIT, async (request, reply) => {
    const input = parse(loginSchema, request.body);
    const [user] = await db.select().from(users).where(eq(users.email, input.email)).limit(1);

    const ok = user ? await verifyPassword(user.passwordHash, input.password) : await verifyAgainstDummy(input.password);
    if (!user || !ok) throw new AppError("UNAUTHENTICATED", "Invalid email or password");

    const token = await startSession(db, env, request, reply, user.id);
    const body: AuthResponse = { user: toUser(user), ...(token ? { token } : {}) };
    return body;
  });

  app.post("/api/auth/logout", async (request, reply) => {
    await endSession(db, reply, requireAuth(request));
    return reply.code(204).send();
  });

  app.get("/api/auth/me", async (request) => {
    const auth = requireAuth(request);
    const [user] = await db.select().from(users).where(eq(users.id, auth.userId)).limit(1);
    if (!user) throw new AppError("UNAUTHENTICATED", "Session is no longer valid");
    return { user: toUser(user) };
  });

  /** Permanently deletes the account and all associated data (DPDP Act right to erasure). */
  app.delete("/api/auth/me", async (request, reply) => {
    const auth = requireAuth(request);
    await db.delete(users).where(eq(users.id, auth.userId));
    reply.clearCookie(SESSION_COOKIE, { path: "/" });
    return reply.code(204).send();
  });
}
