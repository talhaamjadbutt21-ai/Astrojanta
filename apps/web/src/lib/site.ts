/** Single source of truth for the public site origin (no trailing slash). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://astrojanta-web.vercel.app").replace(/\/+$/, "");
export const SITE_NAME = "Astrojanta";

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Full Open Graph block for a page (Next merges `openGraph` shallowly, so repeat shared fields). */
export function pageOpenGraph(path: string, title?: string, description?: string) {
  return {
    type: "website" as const,
    siteName: SITE_NAME,
    locale: "en_IN",
    url: path,
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "Astrojanta — Free Kundli & AI Vedic Astrologer" },
    ],
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
  };
}

// TODO(Talha): replace with the real inbox (or set NEXT_PUBLIC_SUPPORT_EMAIL in Vercel) before AdSense review.
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "contact@astrojanta.com";
