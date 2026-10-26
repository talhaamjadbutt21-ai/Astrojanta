import { REFRESH_COOKIE, SESSION_COOKIE } from "@astrojanta/shared";
import { type NextRequest, NextResponse } from "next/server";

/** Optimistic check only: real authorisation happens in the API on every request. */
export function proxy(request: NextRequest) {
  if (request.cookies.has(SESSION_COOKIE) || request.cookies.has(REFRESH_COOKIE)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = `?next=${encodeURIComponent(request.nextUrl.pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/dashboard/:path*", "/chat/:path*", "/admin/:path*"],
};
