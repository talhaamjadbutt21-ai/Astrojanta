import type { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { type Astrologer, offlineAstrologer } from "../src/ai/agent";
import { buildApp } from "../src/app";
import { connectDatabase, type Database } from "../src/db/client";
import { loadEnv } from "../src/env";

const ORIGIN = "http://localhost:3000";
const birth = {
  name: "Asha",
  date: "1995-08-15",
  time: "07:45",
  place: { name: "New Delhi, India", latitude: 28.6139, longitude: 77.209, timezone: "Asia/Kolkata" },
};

const failingAstrologer: Astrologer = {
  mode: "llm",
  async *stream() {
    yield* [];
    throw new Error("provider 500");
  },
};

const emptyAstrologer: Astrologer = {
  mode: "llm",
  async *stream() {},
};

const hangingAstrologer: Astrologer = {
  mode: "llm",
  async *stream({ abortSignal }) {
    await new Promise<void>((resolve) => {
      if (abortSignal?.aborted) {
        resolve();
        return;
      }
      abortSignal?.addEventListener("abort", () => resolve(), { once: true });
    });
  },
};

async function startApp(astrologer: Astrologer, extra: Record<string, string> = {}) {
  const env = loadEnv({
    NODE_ENV: "test",
    PGLITE_DIR: "memory://",
    CORS_ORIGINS: ORIGIN,
    FREE_DAILY_QUESTIONS: "2",
    ...extra,
  });
  const database = await connectDatabase(env);
  const app = await buildApp({ db: database.db, env, astrologer });
  return { app, database, env };
}

async function signInWithProfile(app: FastifyInstance, email: string) {
  const reg = await app.inject({
    method: "POST",
    url: "/api/auth/register",
    headers: { origin: ORIGIN },
    payload: { email, password: "correct horse battery" },
  });
  expect(reg.statusCode).toBe(201);
  const raw = reg.cookies.find((c) => c.name === "astrojanta_session");
  const cookie = raw ? `${raw.name}=${raw.value}` : "";
  const created = await app.inject({
    method: "POST",
    url: "/api/profiles",
    headers: { cookie, origin: ORIGIN },
    payload: { relation: "self", birth },
  });
  expect(created.statusCode).toBe(201);
  return { cookie, profileId: created.json().profile.id as string };
}

async function remainingChat(app: FastifyInstance, cookie: string) {
  const res = await app.inject({ method: "GET", url: "/api/chat/quota", headers: { cookie } });
  expect(res.statusCode).toBe(200);
  return res.json().quota.remaining as number;
}

describe("chat quota is not charged when the model fails", () => {
  let app: FastifyInstance;
  let database: Database;

  beforeAll(async () => {
    ({ app, database } = await startApp(failingAstrologer));
  });
  afterAll(async () => {
    await app.close();
    await database.close();
  });

  it("refunds the reservation after a provider error and still allows a later success", async () => {
    const { cookie, profileId } = await signInWithProfile(app, "fail@example.com");
    expect(await remainingChat(app, cookie)).toBe(2);

    const failed = await app.inject({
      method: "POST",
      url: "/api/chat",
      headers: { cookie, origin: ORIGIN },
      payload: { profileId, message: "What is my moon sign?" },
    });
    expect(failed.statusCode).toBe(200);
    expect(failed.body).toContain("couldn't finish");
    expect(await remainingChat(app, cookie)).toBe(2);
  });
});

describe("chat quota is not charged for an empty model answer", () => {
  let app: FastifyInstance;
  let database: Database;

  beforeAll(async () => {
    ({ app, database } = await startApp(emptyAstrologer));
  });
  afterAll(async () => {
    await app.close();
    await database.close();
  });

  it("writes the retry notice and leaves the daily allowance intact", async () => {
    const { cookie, profileId } = await signInWithProfile(app, "empty@example.com");
    const res = await app.inject({
      method: "POST",
      url: "/api/chat",
      headers: { cookie, origin: ORIGIN },
      payload: { profileId, message: "What is my moon sign?" },
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("couldn't generate an answer");
    expect(await remainingChat(app, cookie)).toBe(2);
  });
});

describe("chat quota is not charged when the model times out", () => {
  let app: FastifyInstance;
  let database: Database;

  beforeAll(async () => {
    ({ app, database } = await startApp(hangingAstrologer, { CHAT_MODEL_TIMEOUT_MS: "40" }));
  });
  afterAll(async () => {
    await app.close();
    await database.close();
  });

  it("aborts a hung stream and refunds the attempt", async () => {
    const { cookie, profileId } = await signInWithProfile(app, "timeout@example.com");
    const res = await app.inject({
      method: "POST",
      url: "/api/chat",
      headers: { cookie, origin: ORIGIN },
      payload: { profileId, message: "What is my moon sign?" },
    });
    expect(res.statusCode).toBe(200);
    expect(await remainingChat(app, cookie)).toBe(2);
  });
});

describe("chat reservations are race-safe", () => {
  let app: FastifyInstance;
  let database: Database;

  beforeAll(async () => {
    ({ app, database } = await startApp(offlineAstrologer));
  });
  afterAll(async () => {
    await app.close();
    await database.close();
  });

  it("does not let concurrent requests exceed the daily limit", async () => {
    const { cookie, profileId } = await signInWithProfile(app, "race@example.com");
    const results = await Promise.all(
      Array.from({ length: 5 }, () =>
        app.inject({
          method: "POST",
          url: "/api/chat",
          headers: { cookie, origin: ORIGIN },
          payload: { profileId, message: "What is my moon sign?" },
        }),
      ),
    );
    const ok = results.filter((r) => r.statusCode === 200);
    const blocked = results.filter((r) => r.statusCode === 429);
    expect(ok).toHaveLength(2);
    expect(blocked).toHaveLength(3);
    expect(blocked.every((r) => r.json().error.code === "QUOTA_EXCEEDED")).toBe(true);
    expect(await remainingChat(app, cookie)).toBe(0);
  });
});
