import type { MetadataRoute } from "next";
import { POSTS } from "@/content/blog";
import { absoluteUrl } from "@/lib/site";

const PUBLIC_PATHS = [
  "/",
  "/ai-astrologer",
  "/kundli",
  "/matching",
  "/manglik",
  "/moon-sign",
  "/pricing",
  "/blog",
  "/about",
  "/about-methodology",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    // absoluteUrl("/") === HOME_URL, so the home <loc> matches its canonical exactly.
    ...PUBLIC_PATHS.map((path) => ({ url: absoluteUrl(path), lastModified })),
    ...POSTS.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: new Date(p.updated) })),
  ];
}
