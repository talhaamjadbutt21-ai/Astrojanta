import { Fragment, type ReactNode } from "react";

const INLINE_TOKEN = /(\*\*[^*]+\*\*|_[^_]+_|`[^`]+`)/g;

/** Renders the small markdown subset the astrologer uses (bold, italics, code, bullets) without injecting HTML. */
function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let offset = 0;
  for (const part of text.split(INLINE_TOKEN)) {
    const key = offset;
    offset += part.length;
    if (!part) continue;
    if (part.startsWith("**") && part.endsWith("**"))
      nodes.push(
        <strong key={key} className="font-semibold text-gold-200">
          {part.slice(2, -2)}
        </strong>,
      );
    else if (part.startsWith("_") && part.endsWith("_"))
      nodes.push(
        <em key={key} className="text-muted">
          {part.slice(1, -1)}
        </em>,
      );
    else if (part.startsWith("`") && part.endsWith("`"))
      nodes.push(
        <code key={key} className="rounded bg-white/10 px-1 text-[0.9em]">
          {part.slice(1, -1)}
        </code>,
      );
    else nodes.push(<Fragment key={key}>{part}</Fragment>);
  }
  return nodes;
}

interface Line {
  key: number;
  text: string;
}

export function RichText({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: Line[] = [];
  const flush = () => {
    const first = list[0];
    if (!first) return;
    const items = list;
    blocks.push(
      <ul key={`ul-${first.key}`} className="my-1 grid gap-1.5 pl-1">
        {items.map((item) => (
          <li key={item.key} className="flex gap-2">
            <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-gold-400" />
            <span>{inline(item.text)}</span>
          </li>
        ))}
      </ul>,
    );
    list = [];
  };

  let offset = 0;
  for (const raw of text.split("\n")) {
    const key = offset;
    offset += raw.length + 1;
    const line = raw.trimEnd();
    const bullet = line.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)$/);
    if (bullet) {
      list.push({ key, text: bullet[1]! });
      continue;
    }
    flush();
    if (!line.trim()) continue;
    const heading = line.match(/^#{1,4}\s+(.*)$/);
    blocks.push(
      heading ? (
        <p key={key} className="mt-1 font-display text-base text-gold-200">
          {inline(heading[1]!)}
        </p>
      ) : (
        <p key={key}>{inline(line)}</p>
      ),
    );
  }
  flush();
  return <div className="grid gap-2.5 leading-relaxed">{blocks}</div>;
}
