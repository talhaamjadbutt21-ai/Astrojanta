"use client";

import { ApiError, loginSchema, registerSchema } from "@astronex/shared";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { safeNext, useSession, useSetSession } from "@/lib/session";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Field, FormError, Input } from "./ui/field";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));
  const setSession = useSetSession();
  const { data: user } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) router.replace(next);
  }, [user, next, router]);

  const mutation = useMutation({
    mutationFn: () => (mode === "login" ? api.auth.login({ email, password }) : api.auth.register({ email, password })),
    onSuccess: ({ user }) => {
      setSession(user);
      router.replace(next);
    },
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const schema = mode === "login" ? loginSchema : registerSchema;
    const parsed = schema.safeParse({ email, password });
    const next: Record<string, string> = {};
    if (!parsed.success) for (const i of parsed.error.issues) next[String(i.path[0])] ??= i.message;
    if (mode === "register" && password !== confirm) next.confirm = "Passwords don’t match";
    setErrors(next);
    if (Object.keys(next).length === 0) mutation.mutate();
  };

  const apiError = mutation.error instanceof ApiError ? mutation.error : null;
  const fieldErr = (k: string) => errors[k] ?? apiError?.fields?.[k]?.[0];

  return (
    <Card className="mx-auto w-full max-w-md p-6 sm:p-8">
      <h1 className="font-display text-3xl font-semibold">
        {mode === "login" ? "Welcome back" : "Create your account"}
      </h1>
      <p className="mt-2 text-sm text-muted">
        {mode === "login"
          ? "Sign in to continue your conversations."
          : "Save your charts and chat with the AI astrologer."}
      </p>
      <form onSubmit={submit} noValidate className="mt-7 grid gap-5">
        <Field label="Email" error={fieldErr("email")}>
          {(p) => (
            <Input
              {...p}
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </Field>
        <Field
          label="Password"
          error={fieldErr("password")}
          hint={mode === "register" ? "At least 8 characters" : undefined}
        >
          {(p) => (
            <Input
              {...p}
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
        </Field>
        {mode === "register" && (
          <Field label="Confirm password" error={fieldErr("confirm")}>
            {(p) => (
              <Input
                {...p}
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            )}
          </Field>
        )}
        <FormError message={apiError && !apiError.fields ? apiError.message : null} />
        <Button type="submit" size="lg" loading={mutation.isPending} className="w-full">
          {mode === "login" ? "Sign in" : "Create account"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        {mode === "login" ? "New here? " : "Already have an account? "}
        <Link
          href={`/${mode === "login" ? "register" : "login"}${params.get("next") ? `?next=${encodeURIComponent(next)}` : ""}`}
          className="font-medium text-gold-300 hover:text-gold-200"
        >
          {mode === "login" ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </Card>
  );
}
