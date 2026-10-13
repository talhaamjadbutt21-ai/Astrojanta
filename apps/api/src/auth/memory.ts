import { randomBytes, randomUUID } from "node:crypto";
import { AppError } from "../lib/errors";
import type { AuthSession, IdentityProvider, IdentityUser } from "./types";

interface StoredUser extends IdentityUser {
  password: string;
}

/** In-process email/password store for tests and local development without Supabase. */
export class MemoryAuthProvider implements IdentityProvider {
  readonly kind = "memory" as const;
  private readonly usersByEmail = new Map<string, StoredUser>();
  private readonly usersById = new Map<string, StoredUser>();
  private readonly accessSessions = new Map<string, { userId: string; refreshToken: string }>();
  private readonly refreshToAccess = new Map<string, string>();

  async register(email: string, password: string): Promise<AuthSession> {
    if (this.usersByEmail.has(email)) {
      throw new AppError("CONFLICT", "An account with this email already exists");
    }
    const user: StoredUser = { id: randomUUID(), email, password, createdAt: new Date() };
    this.usersByEmail.set(email, user);
    this.usersById.set(user.id, user);
    return this.issue(user);
  }

  async login(email: string, password: string): Promise<AuthSession> {
    const user = this.usersByEmail.get(email);
    if (!user || user.password !== password) {
      throw new AppError("UNAUTHENTICATED", "Invalid email or password");
    }
    return this.issue(user);
  }

  async getUser(accessToken: string): Promise<IdentityUser | null> {
    const row = this.accessSessions.get(accessToken);
    if (!row) return null;
    const user = this.usersById.get(row.userId);
    return user ? { id: user.id, email: user.email, createdAt: user.createdAt } : null;
  }

  async refresh(refreshToken: string): Promise<AuthSession | null> {
    const accessToken = this.refreshToAccess.get(refreshToken);
    if (!accessToken) return null;
    const row = this.accessSessions.get(accessToken);
    if (!row) return null;
    const user = this.usersById.get(row.userId);
    if (!user) return null;
    this.forget(accessToken, refreshToken);
    return this.issue(user);
  }

  async revoke(accessToken: string): Promise<void> {
    const row = this.accessSessions.get(accessToken);
    this.forget(accessToken, row?.refreshToken);
  }

  async deleteAccount(userId: string): Promise<void> {
    const user = this.usersById.get(userId);
    if (user) {
      this.usersByEmail.delete(user.email);
      this.usersById.delete(userId);
    }
    for (const [token, row] of this.accessSessions) {
      if (row.userId === userId) this.forget(token, row.refreshToken);
    }
  }

  private issue(user: StoredUser): AuthSession {
    const accessToken = `mem_${randomBytes(32).toString("base64url")}`;
    const refreshToken = `memr_${randomBytes(32).toString("base64url")}`;
    this.accessSessions.set(accessToken, { userId: user.id, refreshToken });
    this.refreshToAccess.set(refreshToken, accessToken);
    return {
      user: { id: user.id, email: user.email, createdAt: user.createdAt },
      accessToken,
      refreshToken,
      expiresIn: 3600,
    };
  }

  private forget(accessToken: string, refreshToken?: string) {
    this.accessSessions.delete(accessToken);
    if (refreshToken) this.refreshToAccess.delete(refreshToken);
  }
}
