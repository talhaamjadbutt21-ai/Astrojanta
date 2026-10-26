import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogText } from "@/components/blog-text";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { getPost, POSTS } from "@/content/blog";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      locale: "en_IN",
      url: path,
      title: post.title,
      description: post.description,
      publishedTime: post.published,
      modifiedTime: post.updated,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: post.title }],
    },
  };
}

const fmt = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const url = absoluteUrl(`/blog/${post.slug}`);
  const org = { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") };
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.published,
      dateModified: post.updated,
      mainEntityOfPage: url,
      url,
      image: absoluteUrl("/opengraph-image"),
      inLanguage: "en-IN",
      keywords: post.keyword,
      author: org,
      publisher: org,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const h2 = "mt-12 font-display text-2xl font-semibold tracking-tight sm:text-3xl";
  const p = "mt-4 leading-relaxed text-muted";

  return (
    <div className="mx-auto max-w-3xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="hover:text-ink">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:text-ink">Blog</Link>
          </li>
        </ol>
      </nav>
      <article className="mt-6">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">{post.h1}</h1>
        <p className="mt-3 text-sm text-muted">
          By the {SITE_NAME} team · <time dateTime={post.published}>{fmt(post.published)}</time>
        </p>
        <p className="mt-6 text-lg leading-relaxed text-ink/90">
          <BlogText text={post.intro} />
        </p>
        {post.body.map((b, i) => {
          switch (b.type) {
            case "h2":
              return <h2 key={i} className={h2}>{b.text}</h2>;
            case "h3":
              return <h3 key={i} className="mt-8 font-display text-xl font-semibold">{b.text}</h3>;
            case "p":
              return <p key={i} className={p}><BlogText text={b.text} /></p>;
            case "ul":
              return (
                <ul key={i} className="mt-4 list-disc space-y-2 pl-5 text-muted">
                  {b.items.map((it) => <li key={it}><BlogText text={it} /></li>)}
                </ul>
              );
            case "table":
              return (
                <div key={i} className="glass mt-6 overflow-x-auto rounded-2xl">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr>{b.head.map((h) => <th key={h} className="px-4 py-3 font-semibold text-ink">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {b.rows.map((r) => (
                        <tr key={r[0]} className="border-t border-white/8">
                          {r.map((c) => <td key={c} className="px-4 py-3 text-muted">{c}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
          }
        })}

        <section className="glass mt-14 rounded-3xl px-6 py-10 text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">See what this means for your chart</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">
            Make your free Kundli in seconds, then ask the AI astrologer about your own houses and dasha.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/ai-astrologer" size="lg" className="w-full sm:w-auto">Ask the AI astrologer</ButtonLink>
            <ButtonLink href="/kundli" variant="secondary" size="lg" className="w-full sm:w-auto">Make my free Kundli</ButtonLink>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {post.faqs.map((f) => (
              <details key={f.q} className="glass rounded-2xl px-5 py-4">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        <p className="mt-10 text-xs leading-relaxed text-muted/80">
          Astrology offers guidance and reflection, not certainty, and is not a substitute for professional advice.
        </p>
      </article>
    </div>
  );
}
