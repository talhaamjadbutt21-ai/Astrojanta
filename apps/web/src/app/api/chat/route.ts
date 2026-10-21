import { type NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

/** Long-running chat stream — bypasses next.config rewrites (30s proxy timeout). */
export const maxDuration = 180;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const cookie = request.headers.get("cookie") ?? "";
  const origin = request.headers.get("origin") ?? "";
  const authorization = request.headers.get("authorization");
  // Forward the real client IP so per-IP rate limits on the API don't lump every visitor together.
  const forwardedFor = request.headers.get("x-forwarded-for");
  const body = await request.text();

  let upstream: Response;
  try {
    upstream = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: {
        accept: "text/plain",
        "content-type": "application/json",
        cookie,
        ...(origin ? { origin } : {}),
        ...(authorization ? { authorization } : {}),
        ...(forwardedFor ? { "x-forwarded-for": forwardedFor } : {}),
      },
      body,
      // Keep the upstream stream open; do not buffer the whole answer.
      cache: "no-store",
      signal: request.signal,
    });
  } catch {
    return NextResponse.json(
      { error: { code: "NETWORK", message: "Can't reach the AI service. Is the API running?" } },
      { status: 502 },
    );
  }

  const headers = new Headers();
  const contentType = upstream.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  const conversationId = upstream.headers.get("x-conversation-id");
  if (conversationId) headers.set("x-conversation-id", conversationId);
  headers.set("cache-control", "no-cache, no-transform");
  headers.set("x-accel-buffering", "no");

  return new Response(upstream.body, { status: upstream.status, headers });
}
