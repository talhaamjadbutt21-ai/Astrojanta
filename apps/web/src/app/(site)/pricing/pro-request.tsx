"use client";

import { ApiError, type ProPlan, proInquirySchema } from "@astrojanta/shared";
import { useMutation, useQuery } from "@tanstack/react-query";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FormError, Input } from "@/components/ui/field";
import { api } from "@/lib/api";
import { cn } from "@/lib/cn";
import { useSession } from "@/lib/session";

export function ProRequest() {
  const { data: user } = useSession();
  const config = useQuery({ queryKey: ["pro", "config"], queryFn: () => api.pro.config() });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState<ProPlan>("monthly");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ requestEmail: string; emailed: boolean } | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = {
        name: name.trim(),
        email: (email.trim() || user?.email || "").toLowerCase(),
        phone: phone.trim() || undefined,
        plan,
        message: message.trim() || undefined,
      };
      return api.pro.inquire(payload);
    },
    onSuccess: (res) => setResult({ requestEmail: res.requestEmail, emailed: res.emailed }),
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = proInquirySchema.safeParse({
      name: name.trim(),
      email: (email.trim() || user?.email || "").toLowerCase(),
      phone: phone.trim() || undefined,
      plan,
      message: message.trim() || undefined,
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0] ?? "_")] ??= issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    mutation.mutate();
  };

  const apiError = mutation.error instanceof ApiError ? mutation.error : null;
  const fieldErr = (k: string) => errors[k] ?? apiError?.fields?.[k]?.[0];
  const requestEmail = config.data?.requestEmail ?? "talha.amjadbutt.21@gmail.com";
  const mailEnabled = config.data?.mailEnabled ?? false;
  const hasPaymentLink = config.data?.hasPaymentLink ?? false;

  if (user?.pro) {
    return (
      <Card className="mt-8 text-center">
        <h3 className="font-display text-xl">You’re on Pro</h3>
        <p className="mt-2 text-sm text-muted">
          Higher daily limits are active
          {user.proUntil ? ` until ${new Date(user.proUntil).toLocaleDateString()}` : ""}.
        </p>
      </Card>
    );
  }

  if (result || mutation.isSuccess) {
    const emailed = result?.emailed ?? false;
    const inbox = result?.requestEmail ?? requestEmail;
    return (
      <Card className="mt-8 text-center">
        <h3 className="font-display text-xl">{emailed ? "Check your email" : "Request saved"}</h3>
        <p className="mt-2 text-sm text-muted">
          {emailed ? (
            <>
              We emailed next steps to your address
              {hasPaymentLink ? " (including a payment link)" : ""}. Also check spam. After you pay, Pro is turned on
              for your account. Questions? Write to{" "}
              <a className="text-gold-200 underline" href={`mailto:${inbox}`}>
                {inbox}
              </a>
              .
            </>
          ) : (
            <>
              Your request is saved in our admin inbox, but email delivery is not fully set up yet (Resend can only
              send to verified addresses until a domain is added). Email{" "}
              <a className="text-gold-200 underline" href={`mailto:${inbox}`}>
                {inbox}
              </a>{" "}
              directly for a payment link, then Pro will be activated.
            </>
          )}
        </p>
      </Card>
    );
  }

  return (
    <Card className="mt-8 p-6 sm:p-8">
      <p className="mb-5 text-sm text-muted">
        {mailEnabled
          ? hasPaymentLink
            ? "Submit this form and we will email you a payment link. After you pay, Pro is turned on for your account."
            : `Submit this form — we email you a confirmation and notify ${requestEmail}. You will receive a payment link by email, then Pro is turned on.`
          : `There is no card checkout on the site. Submit this form and email ${requestEmail} for a payment link, then Pro is turned on for your account.`}
      </p>
      <form onSubmit={submit} noValidate className="grid gap-5">
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-ink/90">Plan</legend>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                ["monthly", "$2.99 / month"],
                ["yearly", "$29.99 / year"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setPlan(id)}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-sm transition-colors",
                  plan === id
                    ? "border-gold-400/50 bg-gold-400/15 text-gold-200"
                    : "border-white/10 text-muted hover:text-ink",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
        <Field label="Full name" error={fieldErr("name")}>
          {(p) => (
            <Input {...p} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={80} />
          )}
        </Field>
        <Field label="Email" error={fieldErr("email")} hint={user ? `Signed in as ${user.email}` : undefined}>
          {(p) => (
            <Input
              {...p}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              placeholder={user?.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </Field>
        <Field label="Phone (optional)" error={fieldErr("phone")}>
          {(p) => (
            <Input
              {...p}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          )}
        </Field>
        <Field label="Anything we should know?" error={fieldErr("message")}>
          {(p) => (
            <textarea
              {...p}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              rows={3}
              className="w-full rounded-2xl border border-white/10 bg-night-900/70 px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 focus:border-gold-400/70 focus:outline-none focus:ring-4 focus:ring-gold-400/10"
            />
          )}
        </Field>
        <FormError message={apiError && !apiError.fields ? apiError.message : null} />
        <Button type="submit" size="lg" loading={mutation.isPending} className="w-full">
          {mailEnabled ? "Request Pro by email" : "Save Pro request"}
        </Button>
      </form>
    </Card>
  );
}
