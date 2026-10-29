const PH_URL =
  "https://www.producthunt.com/products/astrojanta-ai-astrologer?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-astrojanta-ai-astrologer";

/** Product Hunt "featured" badge. Dark theme to match the site's night background. */
export function ProductHuntBadge({ className, lazy = false }: { className?: string; lazy?: boolean }) {
  return (
    <a href={PH_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {/* biome-ignore lint/performance/noImgElement: tiny external SVG badge; next/image adds nothing here */}
      <img
        alt="Astrojanta AI Astrologer - Free AI Astrologer | Product Hunt"
        width={250}
        height={54}
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1295584&theme=dark&t=1793263358300"
        loading={lazy ? "lazy" : undefined}
        fetchPriority="low"
        decoding="async"
        className="h-[46px] w-auto sm:h-[54px]"
      />
    </a>
  );
}
