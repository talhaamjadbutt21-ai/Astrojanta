import Link from "next/link";
import type { ToolGuide } from "@/content/tool-guides";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { JsonLd } from "./json-ld";

/** Renders the long-form guide, FAQ and matching JSON-LD for a tool page. */
export function ToolGuideSection({ guide }: { guide: ToolGuide }) {
  const url = absoluteUrl(guide.path);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: guide.appName,
      url,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      inLanguage: ["en-IN", "hi-IN"],
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      provider: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <section className="mx-auto mt-16 max-w-3xl text-left" aria-labelledby={`${guide.id}-guide`}>
      <JsonLd data={jsonLd} />
      <h2 id={`${guide.id}-guide`} className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        {guide.heading}
      </h2>
      {guide.sections.map((s) => (
        <div key={s.title} className="mt-8">
          <h3 className="font-display text-xl font-semibold">{s.title}</h3>
          {s.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="mt-3 leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </div>
      ))}
      <div className="mt-8">
        <h3 className="font-display text-xl font-semibold">Related free tools</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
          {guide.related.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="text-gold-200 underline underline-offset-4 hover:text-gold-400">
                {r.label}
              </Link>{" "}
              — {r.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Frequently asked questions</h2>
        <div className="mt-4 space-y-3">
          {guide.faqs.map((f) => (
            <details key={f.q} className="glass rounded-2xl px-5 py-4">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
