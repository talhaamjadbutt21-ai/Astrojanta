"use client";

import { ApiError, type ProPlan } from "@astronex/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Inbox, MessageCircle, MessagesSquare, Users } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, EmptyState, Skeleton } from "@/components/ui/card";
import { Field, FormError, Input } from "@/components/ui/field";
import { api } from "@/lib/api";
import { SESSION_KEY, useRequireSession } from "@/lib/session";

type GrantPlan = ProPlan | "revoke";

export function AdminOverview() {
  const { data: user } = useRequireSession("/admin");
  const overview = useQuery({
    queryKey: ["admin", "overview"],
    queryFn: () => api.admin.overview(),
    enabled: Boolean(user?.admin),
  });
  const inquiries = useQuery({
    queryKey: ["admin", "pro-inquiries"],
    queryFn: () => api.admin.proInquiries(),
    enabled: Boolean(user?.admin),
  });

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <Skeleton className="h-10 w-48" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
        </div>
      </div>
    );
  }

  if (!user.admin) {
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6">
        <EmptyState title="No access">
          This account cannot open the admin overview. Sign in with an admin email if you were invited.
        </EmptyState>
      </div>
    );
  }

  const err =
    overview.error instanceof ApiError ? overview.error.message : overview.error ? "Could not load overview." : null;
  const data = overview.data?.overview;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-sm text-muted">Private</p>
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Overview</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        After someone pays via your payment link, grant Pro here by their account email.
      </p>

      {overview.isPending && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
        </div>
      )}

      {err && (
        <div className="mt-8">
          <FormError message={err} />
        </div>
      )}

      {data && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            icon={Users}
            label="Users"
            value={data.users.total}
            hint={`${data.users.last7Days} in the last 7 days`}
          />
          <Stat
            icon={MessageCircle}
            label="Questions today"
            value={data.chat.questionsToday}
            hint="User messages in the last 24 hours"
          />
          <Stat icon={MessagesSquare} label="Conversations" value={data.chat.conversations} hint="Saved AI chats" />
          <Stat
            icon={Inbox}
            label="Pro"
            value={data.pro.subscribers}
            hint={`${data.pro.inquiries} payment-link requests`}
          />
        </div>
      )}

      <GrantProPanel />

      <section className="mt-10">
        <h2 className="font-display text-2xl">Recent Pro requests</h2>
        <p className="mt-1 text-sm text-muted">Email them a payment link, then grant Pro once paid.</p>
        {inquiries.isPending && <Skeleton className="mt-4 h-40" />}
        {inquiries.data?.inquiries.length === 0 && <p className="mt-4 text-sm text-muted">No requests yet.</p>}
        {inquiries.data && inquiries.data.inquiries.length > 0 && (
          <InquiryList inquiries={inquiries.data.inquiries} />
        )}
      </section>
    </div>
  );
}

function InquiryList({
  inquiries,
}: {
  inquiries: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    plan: ProPlan;
    message: string | null;
    createdAt: string;
  }[];
}) {
  const qc = useQueryClient();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const grant = async (email: string, plan: ProPlan, id: string) => {
    setBusyId(id);
    setError(null);
    setOk(null);
    try {
      const res = await api.admin.grantPro({ email: email.trim().toLowerCase(), plan });
      setOk(`${res.user.email} → Pro until ${res.user.proUntil ? new Date(res.user.proUntil).toLocaleDateString() : "—"}`);
      void qc.invalidateQueries({ queryKey: ["admin"] });
      void qc.invalidateQueries({ queryKey: SESSION_KEY });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not grant Pro.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="mt-4 grid gap-3">
      {error && <FormError message={error} />}
      {ok && <p className="text-sm text-gold-200">{ok}</p>}
      <ul className="grid gap-3">
        {inquiries.map((row) => (
          <li key={row.id} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-medium">
                {row.name} · {row.email}
              </p>
              <p className="text-xs text-muted">
                {row.plan} · {new Date(row.createdAt).toLocaleString()}
              </p>
            </div>
            {row.phone && <p className="mt-1 text-muted">{row.phone}</p>}
            {row.message && <p className="mt-1 text-muted">{row.message}</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                loading={busyId === row.id}
                onClick={() => void grant(row.email, row.plan, row.id)}
              >
                Grant {row.plan}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GrantProPanel() {
  const qc = useQueryClient();
  const [email, setEmail] = useState("");
  const [lookup, setLookup] = useState<{ email: string; pro: boolean; proUntil: string | null } | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const find = useMutation({
    mutationFn: () => api.admin.findUser(email.trim().toLowerCase()),
    onSuccess: (res) => {
      setSuccess(null);
      setLookup({ email: res.user.email, pro: res.user.pro, proUntil: res.user.proUntil });
    },
  });

  const grant = useMutation({
    mutationFn: (plan: GrantPlan) => api.admin.grantPro({ email: email.trim().toLowerCase(), plan }),
    onSuccess: (res) => {
      setLookup({ email: res.user.email, pro: res.user.pro, proUntil: res.user.proUntil });
      setSuccess(
        res.user.pro
          ? `Granted Pro until ${res.user.proUntil ? new Date(res.user.proUntil).toLocaleDateString() : "—"}`
          : `Revoked Pro for ${res.user.email}`,
      );
      void qc.invalidateQueries({ queryKey: ["admin"] });
      void qc.invalidateQueries({ queryKey: SESSION_KEY });
    },
  });

  const onFind = (e: FormEvent) => {
    e.preventDefault();
    find.mutate();
  };

  const err =
    (find.error instanceof ApiError ? find.error.message : null) ||
    (grant.error instanceof ApiError ? grant.error.message : null);

  return (
    <Card className="mt-10 p-6">
      <h2 className="font-display text-2xl">Grant or revoke Pro</h2>
      <p className="mt-1 text-sm text-muted">Use the customer’s Astrojanta account email after they pay.</p>
      <form onSubmit={onFind} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Field label="Account email" className="flex-1">
          {(p) => (
            <Input
              {...p}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
            />
          )}
        </Field>
        <Button type="submit" loading={find.isPending} className="sm:mt-7">
          Look up
        </Button>
      </form>
      {lookup && (
        <p className="mt-3 text-sm text-muted">
          {lookup.email}:{" "}
          {lookup.pro
            ? `Pro until ${lookup.proUntil ? new Date(lookup.proUntil).toLocaleDateString() : "—"}`
            : "not Pro"}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {(
          [
            ["monthly", "Grant 1 month"],
            ["yearly", "Grant 1 year"],
            ["revoke", "Revoke"],
          ] as const
        ).map(([id, label]) => (
          <Button
            key={id}
            type="button"
            variant={id === "revoke" ? "danger" : "primary"}
            size="sm"
            loading={grant.isPending && grant.variables === id}
            disabled={!email.trim() || grant.isPending}
            onClick={() => grant.mutate(id)}
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        <FormError message={err} />
        {success && <p className="text-sm text-gold-200">{success}</p>}
      </div>
    </Card>
  );
}

function Stat({ icon: Icon, label, value, hint }: { icon: typeof Users; label: string; value: number; hint: string }) {
  return (
    <Card>
      <div className="grid size-10 place-items-center rounded-2xl bg-gold-400/12 text-gold-300">
        <Icon className="size-5" />
      </div>
      <p className="mt-4 text-sm text-muted">{label}</p>
      <p className="mt-1 font-display text-4xl tabular-nums">{value}</p>
      <p className="mt-2 text-xs text-muted">{hint}</p>
    </Card>
  );
}
