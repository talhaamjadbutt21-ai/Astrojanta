import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This page does not exist. Try the free Janam Kundli, Kundli matching, Manglik or Moon sign tools on Astrojanta.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-5xl font-semibold tracking-tight">404</h1>
      <p className="mt-4 text-muted">We couldn’t find that page. Try one of our free tools:</p>
      <nav className="mt-6 flex flex-wrap justify-center gap-4 text-gold-200 underline underline-offset-4">
        <Link href="/">Home</Link>
        <Link href="/kundli">Free Janam Kundli</Link>
        <Link href="/matching">Kundli Matching</Link>
        <Link href="/manglik">Manglik Calculator</Link>
        <Link href="/moon-sign">Moon Sign</Link>
      </nav>
    </main>
  );
}
