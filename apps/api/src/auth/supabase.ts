import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { AppError } from "../lib/errors";
import type { AuthSession, IdentityProvider, IdentityUser } from "./types";

function mapUser(user: User): IdentityUser {
  const email = user.email?.trim().toLowerCase();
  if (!email) throw new AppError("INTERNAL", "Something went wrong");
  return { id: user.id, email, createdAt: new Date(user.created_at) };
}

function isDuplicate(error: { code?: string; message: string; status?: number }): boolean {
  const code = error.code ?? "";
  const message = error.message.toLowerCase();
  return (
    code === "email_exists" ||
    code === "user_already_exists" ||
    message.includes("already been registered") ||
    message.includes("already registered") ||
    message.includes("user already exists")
  );
}

function toSession(user: User, session: { access_token: string; refresh_token: string; expires_in: number }): AuthSession {
  return {
    user: mapUser(user),
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    expiresIn: session.expires_in,
  };
}

export class SupabaseAuthProvider implements IdentityProvider {
  readonly kind = "supabase" as const;
  private readonly anon: SupabaseClient;
  private readonly admin: SupabaseClient;

  constructor(url: string, anonKey: string, serviceRoleKey: string) {
    const auth = { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } as const;
    this.anon = createClient(url, anonKey, { auth });
    this.admin = createClient(url, serviceRoleKey, { auth });
  }

  async register(email: string, password: string): Promise<AuthSession> {
    const { error } = await this.admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) {
      if (isDuplicate(error)) throw new AppError("CONFLICT", "An account with this email already exists");
      throw new AppError("UPSTREAM", "Could not create the account. Try again.");
    }
    return this.login(email, password);
  }

  async login(email: string, password: string): Promise<AuthSession> {
    const { data, error } = await this.anon.auth.signInWithPassword({ email, password });
    if (error || !data.session || !data.user) {
      throw new AppError("UNAUTHENTICATED", "Invalid email or password");
    }
    return toSession(data.user, data.session);
  }

  async getUser(accessToken: string): Promise<IdentityUser | null> {
    const { data, error } = await this.anon.auth.getUser(accessToken);
    if (error || !data.user?.email) return null;
    return mapUser(data.user);
  }

  async refresh(refreshToken: string): Promise<AuthSession | null> {
    const { data, error } = await this.anon.auth.refreshSession({ refresh_token: refreshToken });
    if (error || !data.session || !data.user) return null;
    return toSession(data.user, data.session);
  }

  async revoke(accessToken: string): Promise<void> {
    await this.admin.auth.admin.signOut(accessToken, "global");
  }

  async deleteAccount(userId: string): Promise<void> {
    const { error } = await this.admin.auth.admin.deleteUser(userId);
    if (error) throw new AppError("UPSTREAM", "Could not delete the account. Try again.");
  }
}
