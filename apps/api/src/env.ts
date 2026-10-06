import { z } from "zod";

const blankToUndefined = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);
const opt = <T extends z.ZodType>(schema: T) => z.preprocess(blankToUndefined, schema.optional());

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    HOST: z.string().default("0.0.0.0"),
    PORT: z.coerce.number().int().positive().default(4000),
    /** Postgres connection string. When absent, an embedded PGlite database is used (dev/test only). */
    DATABASE_URL: opt(z.string().min(1)),
    PGLITE_DIR: z.string().default(".data/pglite"),
    MIGRATIONS_DIR: z.string().default("drizzle"),
    CORS_ORIGINS: z
      .string()
      .default("http://localhost:3000,http://localhost:8081")
      .transform((s) =>
        s
          .split(",")
          .map((o) => o.trim())
          .filter(Boolean),
      ),
    SESSION_TTL_DAYS: z.coerce.number().int().min(1).max(365).default(30),
    /** 32-byte key, base64. Encrypts birth details at rest. */
    DATA_ENCRYPTION_KEY: opt(z.string()),
    TRUST_PROXY: z.preprocess(blankToUndefined, z.stringbool().default(false)),
    OPENAI_API_KEY: opt(z.string()),
    AI_MODEL: z.string().default("gpt-5-mini"),
    FREE_DAILY_QUESTIONS: z.coerce.number().int().min(0).default(5),
    GEOCODING_URL: z.url().default("https://geocoding-api.open-meteo.com/v1/search"),
  })
  .superRefine((env, ctx) => {
    if (env.NODE_ENV !== "production") return;
    if (!env.DATABASE_URL) ctx.addIssue({ code: "custom", path: ["DATABASE_URL"], message: "Required in production" });
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
