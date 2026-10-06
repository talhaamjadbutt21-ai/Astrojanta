"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useSession } from "@/lib/session";
import { Logo } from "./logo";
import { ButtonLink } from "./ui/button";

const NAV = [
  { href: "/kundli", label: "Free Kundli" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const { data: user, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cta = isPending ? null : user ? (
    <ButtonLink href="/dashboard" size="sm">
      Dashboard
    </ButtonLink>
  ) : (
    <>
      <ButtonLink href="/login" variant="ghost" size="sm">
        Sign in
      </ButtonLink>
      <ButtonLink href="/register" size="sm">
        Get started
      </ButtonLink>
    </>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "border-b border-white/8 bg-night-950/70 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">{cta}</div>
        <button
          type="button"
          className="grid size-10 place-items-center rounded-full text-ink hover:bg-white/5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/8 bg-night-950/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 pb-5 pt-2" aria-label="Mobile">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl px-4 py-3 text-ink hover:bg-white/5">
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex gap-2 [&>*]:flex-1">{cta}</div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
