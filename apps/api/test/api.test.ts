import type { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { MOBILE_CLIENT, SESSION_COOKIE } from "@sebt/shared";
import { buildApp } from "../src/app";
import { offlineAstrologer } from "../src/ai/agent";
import { connectDatabase, type Database } from "../src/db/client";
import { profiles } from "../src/db/schema";
import { loadEnv } from "../src/env";

const ORIGIN = "http://localhost:3000";
const env = loadEnv({ NODE_ENV: "test", PGLITE_DIR: "memory://", CORS_ORIGINS: ORIGIN, FREE_DAILY_QUESTIONS: "2" });

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
    const wrong = await app.inject({ method: "POST", url: "/api/auth/login", payload: { email: "web@example.com", password: "nope-nope" } });
    const unknown = await app.inject({ method: "POST", url: "/api/auth/login", payload: { email: "ghost@example.com", password: "nope-nope" } });
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
    expect((await app.inject({ method: "GET", url: "/api/auth/me", headers: auth })).statusCode).toBe(401);
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
    const res = await app.inject({ method: "POST", url: "/api/auth/register", payload: { email: "bad", password: "short" } });
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

    const history = await app.inject({ method: "GET", url: `/api/conversations/${conversationId}/messages`, headers: { cookie } });
    expect(history.json().messages.map((m: { role: string }) => m.role)).toEqual(["user", "assistant"]);

    expect((await ask()).statusCode).toBe(200);
    const blocked = await ask();
    expect(blocked.statusCode).toBe(429);
    expect(blocked.json().error.code).toBe("QUOTA_EXCEEDED");
  });
});
