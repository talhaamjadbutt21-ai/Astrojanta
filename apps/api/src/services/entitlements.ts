import { eq } from "drizzle-orm";
import type { Db } from "../db/client";
import { users } from "../db/schema";
import type { Env } from "../env";

/** Accepts Date or ISO strings (drivers / JSON sometimes return strings). */
export function asDate(value: Date | string | null | undefined): Date | null {
  if (value == null) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function isProUntil(proUntil: Date | string | null | undefined, now = new Date()): boolean {
  const date = asDate(proUntil);
  return Boolean(date && date.getTime() > now.getTime());
}

export async function questionLimit(db: Db, userId: string, env: Env) {
  const [row] = await db.select({ proUntil: users.proUntil }).from(users).where(eq(users.id, userId)).limit(1);
  const pro = isProUntil(row?.proUntil ?? null);
  const limit = pro ? env.PRO_DAILY_QUESTIONS : env.FREE_DAILY_QUESTIONS;
  return { pro, limit };
}

const PLAN_DAYS = { monthly: 31, yearly: 366 } as const;

/** Extends Pro from now (or current expiry if still active). */
export function proUntilForPlan(
  plan: "monthly" | "yearly",
  current: Date | string | null | undefined,
  now = new Date(),
): Date {
  const currentDate = asDate(current);
  const base = isProUntil(currentDate, now) && currentDate ? currentDate.getTime() : now.getTime();
  return new Date(base + PLAN_DAYS[plan] * 86_400_000);
}

export async function grantProByEmail(db: Db, email: string, plan: "monthly" | "yearly" | "revoke") {
  const normalised = email.trim().toLowerCase();
  const [row] = await db.select().from(users).where(eq(users.email, normalised)).limit(1);
  if (!row) return null;

  const proUntil = plan === "revoke" ? null : proUntilForPlan(plan, row.proUntil);
  const [updated] = await db.update(users).set({ proUntil }).where(eq(users.id, row.id)).returning();
  return updated ?? null;
}
