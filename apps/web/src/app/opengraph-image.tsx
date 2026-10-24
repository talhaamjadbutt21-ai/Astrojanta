import { ImageResponse } from "next/og";

export const alt = "Astrojanta — Free Kundli & AI Vedic Astrologer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "linear-gradient(135deg, #07061a 0%, #1b1446 60%, #3b2a6b 100%)",
        color: "#fff0c9",
      }}
    >
      <div style={{ fontSize: 40, color: "#f8cf72", letterSpacing: 4 }}>ASTROJANTA</div>
      <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>
        Free Kundli &amp; AI Vedic Astrologer
      </div>
      <div style={{ fontSize: 34, marginTop: 28, color: "#d9d4f5" }}>
        Janam Kundli · Kundli Matching · Manglik · Moon Sign — in Hindi &amp; English
      </div>
    </div>,
    size,
  );
}
