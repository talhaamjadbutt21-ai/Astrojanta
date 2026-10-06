import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("glass rounded-3xl p-5 sm:p-6", className)} {...props} />;
}

export function Badge({
  tone = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: "neutral" | "gold" | "good" | "warn" | "bad" }) {
  const tones = {
    neutral: "bg-white/8 text-muted border-white/10",
    gold: "bg-gold-400/12 text-gold-300 border-gold-400/25",
    good: "bg-emerald-400/12 text-emerald-300 border-emerald-400/25",
    warn: "bg-amber-400/12 text-amber-300 border-amber-400/25",
    bad: "bg-rose-400/12 text-rose-300 border-rose-400/25",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-2xl", className)} aria-hidden="true" />;
}

export function EmptyState({
  icon,
  title,
  children,
}: {
  icon?: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-white/10 px-6 py-12 text-center">
      {icon && <div className="text-gold-400">{icon}</div>}
      <h3 className="font-display text-xl">{title}</h3>
      {children && <div className="max-w-sm text-sm text-muted">{children}</div>}
    </div>
  );
}
