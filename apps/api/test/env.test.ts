import { afterEach, describe, expect, it } from "vitest";
import { cookieSecure, loadEnv } from "../src/env";

const originalVercel = process.env.VERCEL;

afterEach(() => {
  if (originalVercel === undefined) delete process.env.VERCEL;
  else process.env.VERCEL = originalVercel;
});

describe("cookieSecure", () => {
  it("is off for local development and tests so http:// cookies still work", () => {
    delete process.env.VERCEL;
    expect(cookieSecure({ NODE_ENV: "development" })).toBe(false);
    expect(cookieSecure({ NODE_ENV: "test" })).toBe(false);
  });

  it("is on in production and whenever Vercel is hosting the process", () => {
    delete process.env.VERCEL;
    expect(cookieSecure({ NODE_ENV: "production" })).toBe(true);
    process.env.VERCEL = "1";
    expect(cookieSecure({ NODE_ENV: "development" })).toBe(true);
    expect(cookieSecure({ NODE_ENV: "test" })).toBe(true);
  });
});

describe("TRUST_PROXY", () => {
  it("defaults to false off Vercel and true on Vercel, and an explicit value wins", () => {
    delete process.env.VERCEL;
    expect(loadEnv({ NODE_ENV: "test" }).TRUST_PROXY).toBe(false);

    process.env.VERCEL = "1";
    expect(loadEnv({ NODE_ENV: "test" }).TRUST_PROXY).toBe(true);
    expect(loadEnv({ NODE_ENV: "test", TRUST_PROXY: "false" }).TRUST_PROXY).toBe(false);
    expect(loadEnv({ NODE_ENV: "test", TRUST_PROXY: "true" }).TRUST_PROXY).toBe(true);
  });
});
