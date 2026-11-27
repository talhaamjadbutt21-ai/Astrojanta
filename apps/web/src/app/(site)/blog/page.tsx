import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { POSTS } from "@/content/blog";
import { CLUSTERS, postsFor } from "@/content/clusters";
import { absoluteUrl, pageOpenGraph, SITE_NAME } from "@/lib/site";

const PATH = "/blog";
const TITLE = "Astrology Blog: Kundli Milan, Dosh & Rashifal";
const DESCRIPTION =
  "Saral Vedic astrology guides: kundli milan aur 36 gun, Nadi, Bhakoot, Manglik aur Kaal Sarp dosh, Sade Sati, mahadasha, rashifal aur 2027 muhurat.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph(PATH, TITLE, DESCRIPTION),
};

const fmt = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

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
        dateModified: p.updated,
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
      <nav aria-labelledby="topics" className="mt-10">
        <h2 id="topics" className="font-display text-2xl font-semibold tracking-tight">
          Topic se padhein
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {CLUSTERS.map((c) => (
            <section key={c.id} className="glass rounded-2xl px-5 py-5">
              <h3 className="font-display text-lg font-semibold">{c.label}</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {postsFor(c.slugs).map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="text-gold-200 underline underline-offset-4 hover:text-gold-400"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          Free tools:{" "}
          <Link href="/kundli" className="underline underline-offset-4 hover:text-ink">
            Janam Kundli
          </Link>{" "}
          ·{" "}
          <Link href="/matching" className="underline underline-offset-4 hover:text-ink">
            Kundli milan
          </Link>{" "}
          ·{" "}
          <Link href="/manglik" className="underline underline-offset-4 hover:text-ink">
            Manglik check
          </Link>{" "}
          ·{" "}
          <Link href="/moon-sign" className="underline underline-offset-4 hover:text-ink">
            Rashi finder
          </Link>{" "}
          ·{" "}
          <Link href="/ai-astrologer" className="underline underline-offset-4 hover:text-ink">
            AI astrologer
          </Link>
        </p>
      </nav>
      <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight">Latest guides</h2>
      <ul className="mt-4 space-y-4">
        {posts.map((p) => (
          <li key={p.slug} className="glass rounded-2xl px-5 py-5">
            <p className="text-xs uppercase tracking-wider text-muted">
              {p.updated > p.published ? `Updated ${fmt(p.updated)}` : fmt(p.published)}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold">
              <Link href={`/blog/${p.slug}`} className="hover:text-gold-200">
                {p.title}
              </Link>
            </h3>
            <p className="mt-2 leading-relaxed text-muted">{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
