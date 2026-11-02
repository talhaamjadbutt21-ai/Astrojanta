import type { ReactNode } from "react";

export function LegalArticle({
  title,
  updated,
  eyebrow = "Legal",
  children,
}: {
  title: string;
  updated: string;
  /** Small label above the H1. Defaults to "Legal"; use e.g. "Company" for About/Contact pages. */
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
      <p className="text-xs uppercase tracking-wider text-muted">{eyebrow}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-muted">Last updated {updated}</p>
      <div className="legal-prose mt-10 space-y-6 text-[15px] leading-relaxed text-ink/90 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:text-gold-300 [&_a]:underline">
        {children}
      </div>
    </article>
  );
}
