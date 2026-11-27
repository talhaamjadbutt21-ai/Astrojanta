import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import localFont from "next/font/local";
import { CosmicBackground } from "@/components/cosmic-background";
import { JsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import {
  absoluteUrl,
  CONTACT_EMAIL,
  FOUNDER_ID,
  founderJsonLd,
  ORGANIZATION_ID,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap", axes: ["SOFT", "opsz"] });
// Self-hosted (Noto Sans Devanagari, SIL OFL; devanagari subset, variable 400-600). Loading it via
// next/font/google intermittently broke Vercel builds ("next/font/google queries have exactly one
// entry" while fetching from fonts.gstatic.com), so the build no longer needs a network fetch for it.
const devanagari = localFont({
  src: "./fonts/noto-sans-devanagari-400-600.woff2",
  variable: "--font-noto-deva",
  weight: "400 600",
  display: "swap",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0900-097F, U+1CD0-1CF4, U+1CF7-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0, U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B0A",
    },
  ],
  // Only a few short Hindi phrases use this font, and unicode-range means the browser fetches it
  // only when Devanagari text renders. Not preloading it frees bandwidth for the LCP text and image.
  preload: false,
  fallback: ["ui-sans-serif", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: { google: "sktipJarFhWoRv02UHvvYSaBWepLh8CCk9_JxMKy7jc" },
  other: {
    "google-adsense-account": "ca-pub-5762804424232905",
  },
  title: {
    default: "Astrojanta — Free Kundli & AI Vedic Astrologer in Hindi and English",
    template: "%s · Astrojanta",
  },
  description:
    "Astrology for Everyone. Generate your free Janam Kundli with accurate Lahiri calculations, then ask an AI Vedic astrologer about career, marriage and dasha — in Hindi, Hinglish or English.",
  keywords: [
    "free kundli",
    "janam kundli",
    "kundli in hindi",
    "AI astrologer",
    "vedic astrology",
    "manglik dosha",
    "dasha",
    "astrojanta",
  ],
  applicationName: "Astrojanta",
  // No `url` or `canonical` here: they would be inherited by every page that doesn't override them
  // (privacy, terms, 404 …) and point those pages at the home page. Each indexable page sets its own.
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN" },
  twitter: { card: "summary_large_image" },
  // One consistent icon set with stable public URLs. The 48px PNG (a multiple of 48, as Google's
  // favicon guidelines recommend) is the primary icon; favicon.ico carries 16/32/48 frames for
  // browsers and clients that request /favicon.ico directly.
  icons: {
    icon: [
      { url: "/icons/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    email: `mailto:${CONTACT_EMAIL}`,
    founder: { "@id": FOUNDER_ID },
    contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: CONTACT_EMAIL },
  },
  { "@context": "https://schema.org", ...founderJsonLd },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    inLanguage: "en-IN",
    publisher: { "@id": ORGANIZATION_ID },
  },
];

export const viewport: Viewport = {
  themeColor: "#07061a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${fraunces.variable} ${devanagari.variable} antialiased`}>
      <head>
        {/* async: AdSense never blocks parsing or the LCP paint. Keep it in <head> for site verification. */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5762804424232905"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-dvh overflow-x-clip font-sans">
        <JsonLd data={siteJsonLd} />
        <CosmicBackground />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
