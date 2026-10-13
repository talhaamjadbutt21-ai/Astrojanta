import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Astrojanta home">
      <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-gradient-gold shadow-[0_0_24px_-4px_rgb(242_181_68/0.7)] transition-transform group-hover:rotate-45">
        <svg viewBox="0 0 24 24" className="size-5 text-night-950" fill="currentColor" aria-hidden="true">
          <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" />
          <circle cx="19" cy="19" r="1.6" />
          <circle cx="5" cy="19" r="1" />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-tight">
          Astro<span className="text-gradient-gold">janta</span>
        </span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted sm:text-[11px]">
          Astrology for Everyone
        </span>
      </span>
    </Link>
  );
}
