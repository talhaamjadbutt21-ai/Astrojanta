import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { POSTS } from "@/content/blog";
import { absoluteUrl, pageOpenGraph, SITE_NAME } from "@/lib/site";

const PATH = "/blog";
const TITLE = "Vedic Astrology Blog — Transits, Kundli Guides & AI Astrology";
const DESCRIPTION =
  "Clear, practical Vedic astrology articles from Astrojanta: planetary transits, Kundli and matching guides, and how to use an AI astrologer.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph(PATH, TITLE, DESCRIPTION),
};

const fmt = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => b.published.localeCompare(a.published));
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl(PATH) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `${SITE_NAME} Blog`,
      url: absoluteUrl(PATH),
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: absoluteUrl(`/blog/${p.slug}`),
        datePublished: p.published,
      })),
    },
  ];
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
      <JsonLd data={jsonLd} />
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Astrojanta <span className="text-gradient-gold">Blog</span>
      </h1>
      <p className="mt-4 text-muted">{DESCRIPTION}</p>
      <ul className="mt-10 space-y-4">
        {posts.map((p) => (
          <li key={p.slug} className="glass rounded-2xl px-5 py-5">
            <p className="text-xs uppercase tracking-wider text-muted">{fmt(p.published)}</p>
            <h2 className="mt-2 font-display text-xl font-semibold">
              <Link href={`/blog/${p.slug}`} className="hover:text-gold-200">
                {p.title}
              </Link>
            </h2>
            <p className="mt-2 leading-relaxed text-muted">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
