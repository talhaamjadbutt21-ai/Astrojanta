import { z } from "zod";

const blankToUndefined = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);
const opt = <T extends z.ZodType>(schema: T) => z.preprocess(blankToUndefined, schema.optional());

export type LlmProvider = "google" | "openrouter" | "openai";

interface LlmKeys {
  GEMINI_API_KEY?: string;
  GOOGLE_GENERATIVE_AI_API_KEY?: string;
  OPENAI_API_KEY?: string;
}

export function googleApiKey(env: LlmKeys): string | undefined {
  return env.GEMINI_API_KEY ?? env.GOOGLE_GENERATIVE_AI_API_KEY;
}

function isOpenRouterKey(key: string): boolean {
  return key.startsWith("sk-or-");
}

export function llmProvider(env: LlmKeys): LlmProvider | undefined {
  const googleKey = googleApiKey(env);
  if (googleKey) return isOpenRouterKey(googleKey) ? "openrouter" : "google";
  if (env.OPENAI_API_KEY) return isOpenRouterKey(env.OPENAI_API_KEY) ? "openrouter" : "openai";
  return undefined;
}

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    HOST: z.string().default("0.0.0.0"),
    PORT: z.coerce.number().int().positive().default(4000),
    /** Postgres connection string. When absent, an embedded PGlite database is used (dev/test only). */
    DATABASE_URL: opt(z.string().min(1)),
    /** Direct Postgres URL for migrations when DATABASE_URL points at a transaction pooler (port 6543). */
    DATABASE_MIGRATE_URL: opt(z.string().min(1)),
    PGLITE_DIR: z.string().default(".data/pglite"),
    MIGRATIONS_DIR: z.string().default("drizzle"),
    CORS_ORIGINS: z
      .string()
      .default("http://localhost:3000")
      .transform((s) =>
        s
          .split(",")
          .map((o) => o.trim())
          .filter(Boolean),
      ),
    /** Comma-separated emails that may call /api/admin/*. Empty means nobody is an admin. */
    ADMIN_EMAILS: z
      .string()
      .default("")
      .transform((s) =>
        s
          .split(",")
          .map((e) => e.trim().toLowerCase())
          .filter(Boolean),
      ),
    SESSION_TTL_DAYS: z.coerce.number().int().min(1).max(365).default(30),
    /** Project URL from Supabase Settings → API. Required in production. */
    SUPABASE_URL: opt(z.url()),
    /** Anon (public) key. Used only on the API for sign-in and token verification. */
    SUPABASE_ANON_KEY: opt(z.string().min(1)),
    /** Service role key. Server-only: create/delete users. Never expose to the browser. */
    SUPABASE_SERVICE_ROLE_KEY: opt(z.string().min(1)),
    /** 32-byte key, base64. Encrypts birth details at rest. */
    DATA_ENCRYPTION_KEY: opt(z.string()),
    TRUST_PROXY: z.preprocess(blankToUndefined, z.stringbool().default(false)),
    /** Google AI Studio key (Gemini / Gemma). Chat is live if this or OPENAI_API_KEY is set. */
    GEMINI_API_KEY: opt(z.string()),
    /** Alias used by the Vercel AI SDK Google provider. */
    GOOGLE_GENERATIVE_AI_API_KEY: opt(z.string()),
    OPENAI_API_KEY: opt(z.string()),
    AI_MODEL: z.string().default("gemma-4-26b-a4b-it"),
    /** Daily attempts per tool without an account. */
    GUEST_DAILY_ATTEMPTS: z.coerce.number().int().min(0).default(3),
    /** Daily attempts per tool with a free account. */
    FREE_DAILY_QUESTIONS: z.coerce.number().int().min(0).default(2),
    /** Daily attempts per tool with Pro. */
    PRO_DAILY_QUESTIONS: z.coerce.number().int().min(0).default(6),
    GEOCODING_URL: z.url().default("https://geocoding-api.open-meteo.com/v1/search"),
    /** Inbox for Pro requests and Reply-To on customer mail. */
    PRO_REQUEST_EMAIL: opt(z.email()),
    /** Resend API key. When set with MAIL_FROM, Pro request/grant emails are sent for real. */
    RESEND_API_KEY: opt(z.string().min(1)),
    /** Verified sender, e.g. `Astrojanta <hello@yourdomain.com>`. Resend test: `Astrojanta <onboarding@resend.dev>`. */
    MAIL_FROM: opt(z.string().min(3)),
    /** Optional payment URLs included in the customer’s Pro request email. */
    PRO_PAYMENT_LINK_MONTHLY: opt(z.url()),
    PRO_PAYMENT_LINK_YEARLY: opt(z.url()),
  })
  .superRefine((env, ctx) => {
    if (env.NODE_ENV !== "production") return;
    if (!env.DATABASE_URL) ctx.addIssue({ code: "custom", path: ["DATABASE_URL"], message: "Required in production" });
    for (const key of ["SUPABASE_URL", "SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"] as const) {
      if (!env[key]) ctx.addIssue({ code: "custom", path: [key], message: "Required in production" });
    }
    if (!llmProvider(env)) {
      ctx.addIssue({
        code: "custom",
        path: ["GEMINI_API_KEY"],
        message: "Set GEMINI_API_KEY or OPENAI_API_KEY in production so chat is not offline",
      });
    }
    for (const origin of env.CORS_ORIGINS) {
      if (origin === "*" || !origin.startsWith("https://")) {
        ctx.addIssue({
          code: "custom",
          path: ["CORS_ORIGINS"],
          message: `Must be https:// origins in production (got ${origin})`,
        });
      }
    }
    const key = env.DATA_ENCRYPTION_KEY ? Buffer.from(env.DATA_ENCRYPTION_KEY, "base64") : null;
    if (key?.length !== 32) {
      ctx.addIssue({ code: "custom", path: ["DATA_ENCRYPTION_KEY"], message: "Must be 32 bytes, base64-encoded" });
    }
  });

export type Env = z.infer<typeof envSchema>;

export function loadEnv(source: Record<string, string | undefined> = process.env): Env {
  const parsed = envSchema.safeParse(
    Object.fromEntries(Object.entries(source).map(([k, v]) => [k, blankToUndefined(v)])),
  );
  if (!parsed.success) {
    const details = parsed.error.issues.map((i) => `  ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Invalid environment configuration:\n${details}`);
  }
  return parsed.data;
}

export function supabaseConfigured(env: Env): boolean {
  return Boolean(env.SUPABASE_URL && env.SUPABASE_ANON_KEY && env.SUPABASE_SERVICE_ROLE_KEY);
}
