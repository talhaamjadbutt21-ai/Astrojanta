import { MOBILE_CLIENT, SESSION_COOKIE } from "@astrojanta/shared";
import type { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { offlineAstrologer } from "../src/ai/agent";
import { buildApp } from "../src/app";
import { connectDatabase, type Database } from "../src/db/client";
import { profiles } from "../src/db/schema";
import { loadEnv } from "../src/env";

const ORIGIN = "http://localhost:3000";
const env = loadEnv({
  NODE_ENV: "test",
  PGLITE_DIR: "memory://",
  CORS_ORIGINS: ORIGIN,
  FREE_DAILY_QUESTIONS: "2",
  ADMIN_EMAILS: "admin@example.com",
});

const birth = {
  name: "Asha",
  date: "1995-08-15",
  time: "07:45",
  place: { name: "New Delhi, India", latitude: 28.6139, longitude: 77.209, timezone: "Asia/Kolkata" },
};

let app: FastifyInstance;
let database: Database;

beforeAll(async () => {
  database = await connectDatabase(env);
  app = await buildApp({ db: database.db, env, astrologer: offlineAstrologer });
});

afterAll(async () => {
  await app.close();
  await database.close();
});

function cookieFrom(res: { cookies: { name: string; value: string }[] }) {
  const c = res.cookies.find((x) => x.name === SESSION_COOKIE);
  return c ? `${SESSION_COOKIE}=${c.value}` : "";
}

describe("auth", () => {
  it("registers a web user with an httpOnly cookie and never returns the token or hash", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/auth/register",
      headers: { origin: ORIGIN },
      payload: { email: "Web@Example.com", password: "correct horse battery" },
    });
    expect(res.statusCode).toBe(201);
    const body = res.json();
    expect(body.user.email).toBe("web@example.com");
    expect(body.token).toBeUndefined();
    expect(JSON.stringify(body)).not.toMatch(/hash/i);
    const raw = String(res.headers["set-cookie"]);
    expect(raw).toMatch(/astrojanta_session=/);
    expect(raw).toMatch(/astrojanta_refresh=/);
    expect(raw).toMatch(/HttpOnly/);
    expect(raw).toMatch(/SameSite=Lax/);
  });

  it("rejects duplicate emails with 409", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/auth/register",
      payload: { email: "web@example.com", password: "another password" },
    });
    expect(res.statusCode).toBe(409);
  });

  it("returns the same generic error for wrong password and unknown email", async () => {
    const wrong = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: { email: "web@example.com", password: "nope-nope" },
    });
    const unknown = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: { email: "ghost@example.com", password: "nope-nope" },
    });
    expect(wrong.statusCode).toBe(401);
    expect(unknown.statusCode).toBe(401);
    expect(wrong.json()).toEqual(unknown.json());
  });

  it("issues bearer tokens to mobile clients and revokes them on logout", async () => {
    const reg = await app.inject({
      method: "POST",
      url: "/api/auth/register",
      headers: { "x-client": MOBILE_CLIENT },
      payload: { email: "mobile@example.com", password: "mobile password 1" },
    });
    const { token } = reg.json();
    expect(token).toEqual(expect.any(String));
    expect(reg.headers["set-cookie"]).toBeUndefined();

    const auth = { authorization: `Bearer ${token}` };
    expect((await app.inject({ method: "GET", url: "/api/auth/me", headers: auth })).statusCode).toBe(200);
    expect((await app.inject({ method: "POST", url: "/api/auth/logout", headers: auth })).statusCode).toBe(204);
    const after = await app.inject({ method: "GET", url: "/api/auth/me", headers: auth });
    expect(after.statusCode).toBe(200);
    expect(after.json()).toEqual({ user: null });
  });

  it("returns 200 { user: null } from the session check for guests, and still guards protected routes", async () => {
    const me = await app.inject({ method: "GET", url: "/api/auth/me" });
    expect(me.statusCode).toBe(200);
    expect(me.json()).toEqual({ user: null });
    expect((await app.inject({ method: "DELETE", url: "/api/auth/me" })).statusCode).toBe(401);
    expect((await app.inject({ method: "GET", url: "/api/profiles" })).statusCode).toBe(401);
  });

  it("gives guests 1 kundli, 3 attempts on other chart tools and no chat allowance", async () => {
    const usage = await app.inject({ method: "GET", url: "/api/usage" });
    expect(usage.statusCode).toBe(200);
    const body = usage.json();
    expect(body.features.kundli.limit).toBe(1);
    expect(body.features.matching.limit).toBe(3);
    expect(body.features.manglik.limit).toBe(3);
    expect(body.features.moon_sign.limit).toBe(3);
    expect(body.features.chat.limit).toBe(0);
  });

  it("blocks state-changing requests from foreign origins (CSRF)", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      headers: { origin: "https://evil.example" },
      payload: { email: "web@example.com", password: "correct horse battery" },
    });
    expect(res.statusCode).toBe(403);
  });

  it("validates input with field-level errors", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/auth/register",
      payload: { email: "bad", password: "short" },
    });
    expect(res.statusCode).toBe(422);
    expect(Object.keys(res.json().error.fields)).toEqual(expect.arrayContaining(["email", "password"]));
  });
});

describe("profiles, charts and chat", () => {
  let cookie = "";
  let profileId = "";

  beforeAll(async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      headers: { origin: ORIGIN },
      payload: { email: "web@example.com", password: "correct horse battery" },
    });
    cookie = cookieFrom(res);
  });

  it("computes a public chart without auth", async () => {
    const res = await app.inject({ method: "POST", url: "/api/charts", payload: birth });
    expect(res.statusCode).toBe(200);
    expect(res.json().chart.planets).toHaveLength(9);
    expect(res.json().quota.limit).toBe(1);
    expect(res.json().quota.remaining).toBe(0);
  });

  it("limits guests to one kundli attempt and keeps manglik as a separate daily bucket", async () => {
    const first = await app.inject({ method: "POST", url: "/api/charts?feature=kundli", payload: birth });
    expect(first.statusCode).toBe(200);
    const guest = first.cookies.find((c) => c.name === "astrojanta_guest");
    expect(guest?.value).toBeTruthy();
    const guestCookie = `${guest!.name}=${guest!.value}`;
    const blocked = await app.inject({
      method: "POST",
      url: "/api/charts?feature=kundli",
      headers: { cookie: guestCookie },
      payload: birth,
    });
    expect(blocked.statusCode).toBe(429);
    expect(blocked.json().error.code).toBe("QUOTA_EXCEEDED");
    const manglik = await app.inject({
      method: "POST",
      url: "/api/charts?feature=manglik",
      headers: { cookie: guestCookie },
      payload: birth,
    });
    expect(manglik.statusCode).toBe(200);
    expect(manglik.json().quota.limit).toBe(3);
  });

  it("gives a signed-in free account two kundli attempts", async () => {
    const ask = () =>
      app.inject({
        method: "POST",
        url: "/api/charts?feature=kundli",
        headers: { cookie, origin: ORIGIN },
        payload: birth,
      });
    expect((await ask()).statusCode).toBe(200);
    expect((await ask()).statusCode).toBe(200);
    expect((await ask()).statusCode).toBe(429);
  });

  it("encrypts birth details at rest", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/profiles",
      headers: { cookie, origin: ORIGIN },
      payload: { relation: "self", birth },
    });
    expect(res.statusCode).toBe(201);
    profileId = res.json().profile.id;

    const [row] = await database.db.select().from(profiles);
    expect(row!.birthEncrypted).toMatch(/^v1:/);
    expect(row!.birthEncrypted).not.toContain("Asha");
  });

  it("requires auth for profiles and hides other users' profiles", async () => {
    expect((await app.inject({ method: "GET", url: "/api/profiles" })).statusCode).toBe(401);

    const other = await app.inject({
      method: "POST",
      url: "/api/auth/register",
      headers: { "x-client": MOBILE_CLIENT },
      payload: { email: "other@example.com", password: "other password 1" },
    });
    const res = await app.inject({
      method: "GET",
      url: `/api/profiles/${profileId}`,
      headers: { authorization: `Bearer ${other.json().token}` },
    });
    expect(res.statusCode).toBe(404);
  });

  it("streams a chat answer, persists the conversation, and enforces the daily quota", async () => {
    const ask = () =>
      app.inject({
        method: "POST",
        url: "/api/chat",
        headers: { cookie, origin: ORIGIN },
        payload: { profileId, message: "What is my moon sign?" },
      });

    const first = await ask();
    expect(first.statusCode).toBe(200);
    expect(first.body).toContain("Moon sign");
    const conversationId = first.headers["x-conversation-id"] as string;
    expect(conversationId).toBeTruthy();

    const history = await app.inject({
      method: "GET",
      url: `/api/conversations/${conversationId}/messages`,
      headers: { cookie },
    });
    expect(history.json().messages.map((m: { role: string }) => m.role)).toEqual(["user", "assistant"]);

    expect((await ask()).statusCode).toBe(200);
    const blocked = await ask();
    expect(blocked.statusCode).toBe(429);
    expect(blocked.json().error.code).toBe("QUOTA_EXCEEDED");
  });
});

describe("matching and pro inquiries", () => {
  const girl = {
    name: "India",
    date: "1947-08-15",
    time: "00:00",
    place: { name: "New Delhi, India", latitude: 28.6139, longitude: 77.209, timezone: "Asia/Kolkata" },
  };

  it("returns an 8-koota Guna Milan score without auth", async () => {
    const res = await app.inject({ method: "POST", url: "/api/matching", payload: { boy: birth, girl } });
    expect(res.statusCode).toBe(200);
    const { matching } = res.json();
    expect(matching.kootas).toHaveLength(8);
    expect(matching.max).toBe(36);
    expect(matching.total).toBeGreaterThanOrEqual(0);
    expect(matching.total).toBeLessThanOrEqual(36);
  });

  it("stores a Pro inquiry and rejects invalid plans", async () => {
    const ok = await app.inject({
      method: "POST",
      url: "/api/pro/inquiries",
      payload: { name: "Priya", email: "priya@example.com", plan: "yearly" },
    });
    expect(ok.statusCode).toBe(201);
    expect(ok.json().id).toEqual(expect.any(String));
    expect(ok.json().requestEmail).toContain("@");

    const bad = await app.inject({
      method: "POST",
      url: "/api/pro/inquiries",
      payload: { name: "Priya", email: "priya@example.com", plan: "lifetime" },
    });
    expect(bad.statusCode).toBe(422);
  });
});

describe("admin overview", () => {
  it("rejects unauthenticated and non-admin callers", async () => {
    expect((await app.inject({ method: "GET", url: "/api/admin/overview" })).statusCode).toBe(401);

    const login = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      headers: { origin: ORIGIN },
      payload: { email: "web@example.com", password: "correct horse battery" },
    });
    const denied = await app.inject({
      method: "GET",
      url: "/api/admin/overview",
      headers: { cookie: cookieFrom(login) },
    });
    expect(denied.statusCode).toBe(403);
    expect(denied.json().error.code).toBe("FORBIDDEN");
  });

  it("returns counts for an admin email and flags the session", async () => {
    const reg = await app.inject({
      method: "POST",
      url: "/api/auth/register",
      headers: { origin: ORIGIN },
      payload: { email: "admin@example.com", password: "admin password 1" },
    });
    expect(reg.statusCode).toBe(201);
    expect(reg.json().user.admin).toBe(true);

    const cookie = cookieFrom(reg);
    const me = await app.inject({ method: "GET", url: "/api/auth/me", headers: { cookie } });
    expect(me.json().user.admin).toBe(true);

    const res = await app.inject({ method: "GET", url: "/api/admin/overview", headers: { cookie } });
    expect(res.statusCode).toBe(200);
    const { overview } = res.json();
    expect(overview.users.total).toBeGreaterThanOrEqual(1);
    expect(overview.users.last7Days).toBeGreaterThanOrEqual(1);
    expect(overview.chat.questionsToday).toBeGreaterThanOrEqual(0);
    expect(overview.chat.conversations).toBeGreaterThanOrEqual(0);
    expect(overview.pro.inquiries).toBeGreaterThanOrEqual(1);
    expect(overview.pro.subscribers).toBeGreaterThanOrEqual(0);
  });
});

describe("pro manual grants", () => {
  it("exposes the manual request-email config", async () => {
    const cfg = await app.inject({ method: "GET", url: "/api/pro/config" });
    expect(cfg.statusCode).toBe(200);
    expect(cfg.json().mode).toBe("manual");
    expect(cfg.json().requestEmail).toContain("@");
    expect(cfg.json().mailEnabled).toBe(false);
    expect(cfg.json().hasPaymentLink).toBe(false);
    expect(
      (await app.inject({ method: "POST", url: "/api/pro/checkout", payload: { plan: "monthly" } })).statusCode,
    ).toBe(404);
  });

  it("lets an admin grant and revoke Pro by email", async () => {
    const reg = await app.inject({
      method: "POST",
      url: "/api/auth/register",
      headers: { origin: ORIGIN },
      payload: { email: "pro@example.com", password: "pro password 1" },
    });
    expect(reg.json().user.pro).toBe(false);
    const userCookie = cookieFrom(reg);

    const adminLogin = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      headers: { origin: ORIGIN },
      payload: { email: "admin@example.com", password: "admin password 1" },
    });
    const adminCookie = cookieFrom(adminLogin);

    const granted = await app.inject({
      method: "POST",
      url: "/api/admin/pro",
      headers: { origin: ORIGIN, cookie: adminCookie },
      payload: { email: "pro@example.com", plan: "monthly" },
    });
    expect(granted.statusCode).toBe(200);
    expect(granted.json().user.pro).toBe(true);

    const me = await app.inject({ method: "GET", url: "/api/auth/me", headers: { cookie: userCookie } });
    expect(me.json().user.pro).toBe(true);

    const quota = await app.inject({ method: "GET", url: "/api/chat/quota", headers: { cookie: userCookie } });
    expect(quota.json().quota.pro).toBe(true);
    expect(quota.json().quota.limit).toBe(6);

    const revoked = await app.inject({
      method: "POST",
      url: "/api/admin/pro",
      headers: { origin: ORIGIN, cookie: adminCookie },
      payload: { email: "pro@example.com", plan: "revoke" },
    });
    expect(revoked.json().user.pro).toBe(false);
  });
});
