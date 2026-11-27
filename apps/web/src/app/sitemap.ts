import type { MetadataRoute } from "next";
import { POSTS } from "@/content/blog";
import { absoluteUrl } from "@/lib/site";

// Real last-significant-change dates (from git history), not the build time: a lastmod that changes
// on every deploy teaches Google to ignore it. Bump a date when that page's content really changes.
const PUBLIC_PATHS: Record<string, string> = {
  "/": "2026-11-26",
  "/ai-astrologer": "2026-11-13",
  "/kundli": "2026-11-10",
  "/matching": "2026-11-12",
  "/manglik": "2026-11-24",
  "/moon-sign": "2026-11-24",
  "/pricing": "2026-11-17",
  "/blog": "2026-11-27",
  "/about": "2026-11-16",
  "/about-methodology": "2026-11-02",
  "/contact": "2026-11-02",
  "/privacy": "2026-11-02",
  "/terms": "2026-11-02",
  "/disclaimer": "2026-11-16",
};

export default function sitemap(): MetadataRoute.Sitemap {
  // Home and blog index list the newest guides, so they change whenever a post is added or updated.
  const newestPost = POSTS.reduce((max, p) => (p.updated > max ? p.updated : max), "");
  const lastmod = (path: string, date: string) =>
    path === "/" || path === "/blog" ? (newestPost > date ? newestPost : date) : date;
  return [
    // absoluteUrl("/") === HOME_URL, so the home <loc> matches its canonical exactly.
    ...Object.entries(PUBLIC_PATHS).map(([path, date]) => ({
      url: absoluteUrl(path),
      lastModified: new Date(lastmod(path, date)),
    })),
    ...POSTS.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: new Date(p.updated) })),
  ];
}
