import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Astrojanta — Astrology for Everyone",
    short_name: "Astrojanta",
    description: "Astrology for Everyone. Free Kundli and an AI Vedic astrologer in Hindi and English.",
    start_url: "/",
    display: "standalone",
    background_color: "#07061a",
    theme_color: "#07061a",
    icons: [
      { src: "/icons/icon-48.png", sizes: "48x48", type: "image/png", purpose: "any" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}
