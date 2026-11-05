import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Noto_Sans_Devanagari } from "next/font/google";
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
const devanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-deva",
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: { google: "sktipJarFhWoRv02UHvvYSaBWepLh8CCk9_JxMKy7jc" },
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
  // Stable public URLs (multiples of 48px) so Google can pick a branded SERP favicon.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icons/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
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
      <body className="min-h-dvh overflow-x-clip font-sans">
        <JsonLd data={siteJsonLd} />
        <CosmicBackground />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
