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
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
