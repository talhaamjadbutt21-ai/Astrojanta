import {
  type FeatureQuota,
  GUEST_COOKIE,
  PRODUCT_FEATURES,
  type ProductFeature,
  type UsagePlan,
  type UsageSnapshot,
} from "@astrojanta/shared";
import { and, count, eq, gte, sql } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import type { Db } from "../db/client";
import { featureUses } from "../db/schema";
import { cookieSecure, type Env } from "../env";
import { AppError } from "../lib/errors";
import { questionLimit } from "./entitlements";

const guestIdSchema = z.uuid();

export function utcDayStart(now = new Date()): Date {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export function utcNextDay(now = new Date()): Date {
  return new Date(utcDayStart(now).getTime() + 86_400_000);
}

export async function planFor(db: Db, env: Env, userId: string | null) {
  if (!userId) return { plan: "guest" as const, pro: false, limit: env.GUEST_DAILY_ATTEMPTS };
  const { pro, limit } = await questionLimit(db, userId, env);
  return { plan: (pro ? "pro" : "free") as UsagePlan, pro, limit };
}

/** AI chat requires an account, so guests have no chat allowance. */
async function planForFeature(db: Db, env: Env, userId: string | null, feature: ProductFeature) {
  if (!userId && feature === "chat") return { plan: "guest" as const, pro: false, limit: 0 };
  if (!userId && feature === "kundli")
    return { plan: "guest" as const, pro: false, limit: env.GUEST_KUNDLI_DAILY_ATTEMPTS };
  return planFor(db, env, userId);
}

function subjectOf(request: FastifyRequest, reply: FastifyReply, env: Env): { type: "user" | "guest"; id: string } {
  if (request.auth) return { type: "user", id: request.auth.userId };
  const existing = request.cookies[GUEST_COOKIE];
  const id = existing && guestIdSchema.safeParse(existing).success ? existing : crypto.randomUUID();
  reply.setCookie(GUEST_COOKIE, id, {
    httpOnly: true,
    secure: cookieSecure(env),
    sameSite: "lax",
    path: "/",
    maxAge: 400 * 86_400,
  });
  return { type: "guest", id };
}

export function quotaMessage(quota: Pick<FeatureQuota, "plan" | "limit">): string {
  if (quota.plan === "guest") {
    return `You've used today's ${quota.limit === 1 ? "free attempt" : `${quota.limit} free attempts`} on this tool. Create a free account at /register for more attempts and AI chat, or come back tomorrow.`;
  }
  if (quota.plan === "free") {
    return `You've used today's ${quota.limit} attempts on this tool. Upgrade to Pro for 6 per day, or come back tomorrow.`;
  }
  return `You've used today's ${quota.limit} Pro attempts on this tool. Come back tomorrow.`;
}

export async function readFeatureQuota(
  db: Db,
  env: Env,
  request: FastifyRequest,
  reply: FastifyReply,
  feature: ProductFeature,
): Promise<FeatureQuota> {
  const subject = subjectOf(request, reply, env);
  const { plan, pro, limit } = await planForFeature(db, env, subject.type === "user" ? subject.id : null, feature);
  const since = utcDayStart();
  const [row] = await db
    .select({ used: count() })
    .from(featureUses)
    .where(
      and(eq(featureUses.subjectId, subject.id), eq(featureUses.feature, feature), gte(featureUses.createdAt, since)),
    );
  const used = Number(row?.used ?? 0);
  return {
    feature,
    used,
    limit,
    remaining: Math.max(0, limit - used),
    resetsAt: utcNextDay().toISOString(),
    plan,
    pro,
  };
}

export async function readUsageSnapshot(
  db: Db,
  env: Env,
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<UsageSnapshot> {
  const features = {} as UsageSnapshot["features"];
  let plan: UsagePlan = "guest";
  let pro = false;
  for (const feature of PRODUCT_FEATURES) {
    const quota = await readFeatureQuota(db, env, request, reply, feature);
    features[feature] = quota;
    plan = quota.plan;
    pro = quota.pro;
  }
  return { plan, pro, features };
}

export interface FeatureReservation {
  id: string;
  quota: FeatureQuota;
}

/** Reserve one daily attempt. Uses a transaction advisory lock so concurrent requests cannot exceed the limit. */
export async function reserveFeature(
  db: Db,
  env: Env,
  request: FastifyRequest,
  reply: FastifyReply,
  feature: ProductFeature,
): Promise<FeatureReservation> {
  const subject = subjectOf(request, reply, env);
  const { plan, pro, limit } = await planForFeature(db, env, subject.type === "user" ? subject.id : null, feature);
  const since = utcDayStart();

  const reserved = await db.transaction(async (tx) => {
    await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${subject.id}), hashtext(${feature}))`);
    const [row] = await tx
      .select({ used: count() })
      .from(featureUses)
      .where(
        and(eq(featureUses.subjectId, subject.id), eq(featureUses.feature, feature), gte(featureUses.createdAt, since)),
      );
    const used = Number(row?.used ?? 0);
    if (used >= limit) return null;
    const [inserted] = await tx
      .insert(featureUses)
      .values({ subjectType: subject.type, subjectId: subject.id, feature })
      .returning({ id: featureUses.id });
    return { id: inserted!.id, used: used + 1 };
  });

  if (!reserved) throw new AppError("QUOTA_EXCEEDED", quotaMessage({ plan, limit }));
  return {
    id: reserved.id,
    quota: {
      feature,
      used: reserved.used,
      limit,
      remaining: Math.max(0, limit - reserved.used),
      resetsAt: utcNextDay().toISOString(),
      plan,
      pro,
    },
  };
}

/** Drop a reservation that was not fulfilled (model error, timeout, empty answer, or a failure before the stream). */
export async function releaseFeature(db: Db, reservationId: string): Promise<void> {
  await db.delete(featureUses).where(eq(featureUses.id, reservationId));
}

export async function consumeFeature(
  db: Db,
  env: Env,
  request: FastifyRequest,
  reply: FastifyReply,
  feature: ProductFeature,
): Promise<FeatureQuota> {
  const { quota } = await reserveFeature(db, env, request, reply, feature);
  return quota;
}
