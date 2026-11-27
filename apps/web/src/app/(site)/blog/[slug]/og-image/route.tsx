import { ImageResponse } from "next/og";
import { getPost, POSTS } from "@/content/blog";

// Per-article social/Discover image at a stable URL (/blog/<slug>/og-image), used by the page's
// og:image, twitter:image and BlogPosting.image. Prerendered at build time.
const size = { width: 1200, height: 630 };
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Astrojanta Vedic astrology guides";
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "linear-gradient(135deg, #07061a 0%, #1b1446 60%, #3b2a6b 100%)",
        color: "#fff0c9",
      }}
    >
      <div style={{ fontSize: 34, color: "#f8cf72", letterSpacing: 4 }}>ASTROJANTA · GUIDE</div>
      <div style={{ fontSize: title.length > 40 ? 68 : 80, fontWeight: 700, lineHeight: 1.12 }}>{title}</div>
      <div style={{ fontSize: 30, color: "#d9d4f5" }}>Free Kundli · Kundli Milan · AI Astrologer — astrojanta.com</div>
    </div>,
    size,
  );
}
