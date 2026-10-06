import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SEBT AI — Vedic Astrologer",
    short_name: "SEBT AI",
    description: "Free Kundli and an AI Vedic astrologer in Hindi and English.",
    start_url: "/",
    display: "standalone",
    background_color: "#07061a",
    theme_color: "#07061a",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
