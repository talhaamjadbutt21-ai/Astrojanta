import { supabaseConfigured, type Env } from "../env";
import { MemoryAuthProvider } from "./memory";
import { SupabaseAuthProvider } from "./supabase";
import type { IdentityProvider } from "./types";

export type { AuthSession, IdentityProvider, IdentityUser } from "./types";
export { MemoryAuthProvider } from "./memory";
export { SupabaseAuthProvider } from "./supabase";

export function createIdentityProvider(env: Env): IdentityProvider {
  if (supabaseConfigured(env) && env.SUPABASE_URL && env.SUPABASE_ANON_KEY && env.SUPABASE_SERVICE_ROLE_KEY) {
    return new SupabaseAuthProvider(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, env.SUPABASE_SERVICE_ROLE_KEY);
  }
  if (env.NODE_ENV === "production") {
    throw new Error("SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY are required in production");
  }
  return new MemoryAuthProvider();
}
