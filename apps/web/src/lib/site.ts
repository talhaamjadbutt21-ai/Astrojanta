/**
 * Single source of truth for the public site origin (no trailing slash).
 * NEXT_PUBLIC_SITE_URL overrides this default, so in Vercel it must be https://astrojanta.com (or unset).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://astrojanta.com").replace(/\/+$/, "");
export const SITE_NAME = "Astrojanta";

/**
 * Canonical home URL, in the one form used everywhere (canonical, og:url, sitemap, JSON-LD).
 * No trailing slash: Next.js always renders the root canonical / og:url without one, so the
 * sitemap and structured data follow suit.
 */
export const HOME_URL = SITE_URL;

export function absoluteUrl(path = "/"): string {
  if (path === "/" || path === "") return HOME_URL;
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

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "talha.amjadbutt.21@gmail.com";

/** Founder and owner of Astrojanta. Only facts confirmed by the owner — no invented credentials. */
export const FOUNDER = {
  name: "Talha Amjad",
  email: "talha.amjadbutt.21@gmail.com",
} as const;

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;

/** schema.org Person for the founder; referenced by `@id` from the Organization. */
export const founderJsonLd = {
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: FOUNDER.name,
  email: `mailto:${FOUNDER.email}`,
  jobTitle: "Founder",
  worksFor: { "@id": ORGANIZATION_ID },
} as const;
