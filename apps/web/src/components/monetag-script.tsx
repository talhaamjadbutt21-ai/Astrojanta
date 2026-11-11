"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

/** Monetag In-Page Push zone for astrojanta.com. */
const ZONE_ID = "12240302";
const TAG_SRC = "https://nap5k.com/tag.min.js";

/**
 * Signed-in surfaces stay ad-free. Same set as the `proxy.ts` matcher, so anything behind the
 * session check never renders the tag.
 */
const PRIVATE_PREFIXES = ["/dashboard", "/chat", "/admin"];

/**
 * Vendor snippet, verbatim apart from the hoisted constants: it appends an empty `<script>` to
 * `<body>` (or `<html>` before the body exists) and then sets `data-zone` and `src` on it, so the
 * loader fetches the zone's tag itself.
 */
const SNIPPET = `(function(s){s.dataset.zone='${ZONE_ID}',s.src='${TAG_SRC}'})([document.documentElement,document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`;

export function MonetagScript() {
  const pathname = usePathname();
  if (PRIVATE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) return null;

  // `lazyOnload` keeps the ad loader off the critical path: it runs on browser idle after `load`,
  // so it cannot delay hydration or LCP.
  return (
    <Script id="monetag-inpage-push" strategy="lazyOnload">
      {SNIPPET}
    </Script>
  );
}
