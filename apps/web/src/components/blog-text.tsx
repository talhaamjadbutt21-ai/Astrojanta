import Link from "next/link";
import { Fragment } from "react";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders a string with [text](/path) inline links. */
export function BlogText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const i = m.index ?? 0;
    if (i > last) parts.push(text.slice(last, i));
    parts.push(
      <Link key={i} href={m[2]} className="text-gold-200 underline underline-offset-4 hover:text-gold-400">
        {m[1]}
      </Link>,
    );
    last = i + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts.map((p, i) => <Fragment key={i}>{p}</Fragment>)}</>;
}
