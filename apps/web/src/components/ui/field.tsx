import { type ComponentProps, type ReactNode, useId } from "react";
import { cn } from "@/lib/cn";

export const inputStyles =
  "w-full h-12 rounded-2xl bg-night-900/70 border border-white/10 px-4 text-[15px] text-ink placeholder:text-muted/60 transition-colors hover:border-white/20 focus:border-gold-400/70 focus:outline-none focus:ring-4 focus:ring-gold-400/10 aria-[invalid=true]:border-red-400/60";

interface FieldProps {
  label: string;
  error?: string;
  hint?: ReactNode;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
  className?: string;
}

export function Field({ label, error, hint, children, className }: FieldProps) {
  const id = useId();
  const descId = `${id}-desc`;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink/90">
        {label}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": error || hint ? descId : undefined })}
      {error ? (
        <p id={descId} role="alert" className="text-xs text-red-300">
          {error}
        </p>
      ) : hint ? (
        <p id={descId} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(inputStyles, className)} {...props} />;
}

export function FormError({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <div role="alert" className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
      {message}
    </div>
  );
}
