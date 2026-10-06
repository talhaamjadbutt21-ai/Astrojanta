"use client";

import { ApiError, type BirthDetails, type Profile } from "@sebt/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, LogOut, MapPin, MessageCircleHeart, Plus, Trash2, UserRound, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BirthForm } from "@/components/birth-form";
import { Button, buttonStyles } from "@/components/ui/button";
import { Badge, Card, EmptyState, Skeleton } from "@/components/ui/card";
import { api } from "@/lib/api";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import { pendingBirth, useRequireSession, useSetSession } from "@/lib/session";

const RELATIONS: Profile["relation"][] = ["self", "partner", "child", "parent", "friend", "other"];

export function Dashboard() {
  const router = useRouter();
  const qc = useQueryClient();
  const setSession = useSetSession();
  const { data: user } = useRequireSession("/dashboard");
  const [adding, setAdding] = useState(false);
  const [relation, setRelation] = useState<Profile["relation"]>("self");

  const profiles = useQuery({ queryKey: ["profiles"], queryFn: () => api.profiles.list(), enabled: Boolean(user) });
  const quota = useQuery({ queryKey: ["quota"], queryFn: () => api.chat.quota(), enabled: Boolean(user) });

  const create = useMutation({
    mutationFn: (args: { birth: BirthDetails; relation: Profile["relation"] }) => api.profiles.create(args),
    onSuccess: () => {
      setAdding(false);
      void qc.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
  const remove = useMutation({
    mutationFn: (id: string) => api.profiles.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profiles"] }),
  });
  const logout = useMutation({
    mutationFn: () => api.auth.logout(),
    onSettled: () => {
      setSession(null);
      router.replace("/");
    },
  });
  const deleteAccount = useMutation({
    mutationFn: () => api.auth.deleteAccount(),
    onSuccess: () => {
      setSession(null);
      router.replace("/");
    },
  });

  // Complete a "save & ask AI" started on the public Kundli page before sign-up.
  const pendingHandled = useRef(false);
  useEffect(() => {
    if (!user || pendingHandled.current) return;
    pendingHandled.current = true;
    const birth = pendingBirth.take<BirthDetails>();
    if (birth) {
      api.profiles
        .create({ relation: "self", birth })
        .then(({ profile }) => router.push(`/chat/${profile.id}`))
        .catch(() => void qc.invalidateQueries({ queryKey: ["profiles"] }));
    }
  }, [user, router, qc]);

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <Skeleton className="h-10 w-64" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-44" />
          <Skeleton className="h-44" />
          <Skeleton className="h-44" />
        </div>
      </div>
    );
  }

  const createErr = create.error instanceof ApiError ? create.error : null;
  const list = profiles.data?.profiles ?? [];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted">Namaste 🙏</p>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">Your charts</h1>
        </div>
        <div className="flex items-center gap-2">
          {quota.data && (
            <Badge tone={quota.data.quota.remaining > 0 ? "gold" : "warn"} className="h-9 px-4 text-sm">
              {quota.data.quota.remaining}/{quota.data.quota.limit} free questions today
            </Badge>
          )}
          <Button onClick={() => setAdding(true)} size="sm">
            <Plus className="size-4" /> Add profile
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-8"
          >
            <Card className="mx-auto max-w-2xl p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-2xl">New birth profile</h2>
                <button
                  type="button"
                  onClick={() => setAdding(false)}
                  className="grid size-9 place-items-center rounded-full text-muted hover:bg-white/10"
                  aria-label="Close"
                >
                  <X className="size-5" />
                </button>
              </div>
              <fieldset className="mb-5">
                <legend className="mb-2 text-sm font-medium text-ink/90">This chart belongs to</legend>
                <div className="flex flex-wrap gap-2">
                  {RELATIONS.map((r) => (
                    <button
                      key={r}
                      type="button"
                      aria-pressed={relation === r}
                      onClick={() => setRelation(r)}
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-sm capitalize transition-colors",
                        relation === r
                          ? "border-gold-400/50 bg-gold-400/15 text-gold-200"
                          : "border-white/10 text-muted hover:text-ink",
                      )}
                    >
                      {r === "self" ? "Me" : r}
                    </button>
                  ))}
                </div>
              </fieldset>
              <BirthForm
                submitLabel="Save profile"
                pending={create.isPending}
                serverError={createErr && !createErr.fields ? createErr.message : null}
                serverFields={createErr?.fields}
                onSubmit={(birth) => create.mutate({ birth, relation })}
              />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="mt-8" aria-live="polite">
        {profiles.isPending ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-44" />
            <Skeleton className="h-44" />
          </div>
        ) : profiles.isError ? (
          <Card className="text-center">
            <p className="text-red-300">Couldn’t load your profiles.</p>
            <Button variant="secondary" size="sm" className="mt-4" onClick={() => profiles.refetch()}>
              Try again
            </Button>
          </Card>
        ) : list.length === 0 ? (
          !adding && (
            <EmptyState icon={<UserRound className="size-8" />} title="No charts yet">
              Add your birth details to get your Kundli and start asking the AI astrologer.
              <div className="mt-5">
                <Button onClick={() => setAdding(true)}>
                  <Plus className="size-4" /> Add my birth details
                </Button>
              </div>
            </EmptyState>
          )
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <motion.li key={p.id} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
                <Card className="flex h-full flex-col gap-4 transition-transform hover:-translate-y-0.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="grid size-11 place-items-center rounded-full bg-gradient-gold font-display text-lg font-semibold text-night-950">
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-display text-lg leading-tight">{p.name}</h3>
                        <Badge className="mt-1 capitalize">{p.relation === "self" ? "Me" : p.relation}</Badge>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="grid size-8 place-items-center rounded-full text-muted hover:bg-red-500/15 hover:text-red-300"
                      aria-label={`Delete ${p.name}`}
                      onClick={() => {
                        if (confirm(`Delete ${p.name}'s profile and conversations?`)) remove.mutate(p.id);
                      }}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="grid gap-1.5 text-sm text-muted">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="size-4" /> {formatDate(`${p.birthDate}T12:00:00Z`)}{" "}
                      {p.birthTime ? `· ${p.birthTime}` : ""}
                    </span>
                    <span className="flex items-center gap-2 truncate">
                      <MapPin className="size-4 shrink-0" /> <span className="truncate">{p.placeName}</span>
                    </span>
                  </div>
                  <Link href={`/chat/${p.id}`} className={cn(buttonStyles({ size: "sm" }), "mt-auto w-full")}>
                    <MessageCircleHeart className="size-4" /> Open chart & chat
                  </Link>
                </Card>
              </motion.li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-16 grid gap-4 border-t border-white/8 pt-8 sm:flex sm:items-center sm:justify-between">
        <p className="text-sm text-muted">Signed in as {user.email}</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={() => logout.mutate()} loading={logout.isPending}>
            <LogOut className="size-4" /> Sign out
          </Button>
          <Button
            variant="danger"
            size="sm"
            loading={deleteAccount.isPending}
            onClick={() => {
              if (confirm("Permanently delete your account, charts and conversations? This cannot be undone.")) {
                deleteAccount.mutate();
              }
            }}
          >
            Delete account
          </Button>
        </div>
      </section>
    </div>
  );
}
