import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const PUBLIC_PATHS = [
  "/",
  "/ai-astrologer",
  "/kundli",
  "/matching",
  "/manglik",
  "/moon-sign",
  "/pricing",
  "/privacy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PUBLIC_PATHS.map((path) => ({ url: absoluteUrl(path), lastModified }));
}
