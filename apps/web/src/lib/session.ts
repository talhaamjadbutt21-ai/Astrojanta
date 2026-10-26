"use client";

import { ApiError, type User } from "@astrojanta/shared";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "./api";

export const SESSION_KEY = ["session"] as const;

export function useSession() {
  return useQuery<User | null>({
    queryKey: SESSION_KEY,
    queryFn: async () => {
      try {
        return (await api.auth.me()).user;
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) return null;
        throw err;
      }
    },
    staleTime: 60_000,
    retry: false,
  });
}

/** Client-side guard: the proxy does an optimistic cookie check, this confirms the session with the API. */
export function useRequireSession(returnTo: string) {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.data === null) router.replace(`/login?next=${encodeURIComponent(returnTo)}`);
  }, [session.data, router, returnTo]);
  return session;
}

export function useSetSession() {
  const qc = useQueryClient();
  return (user: User | null) => {
    if (user === null) qc.clear();
    qc.setQueryData(SESSION_KEY, user);
  };
}

/** Only allow same-site relative redirects (prevents open-redirect via ?next=). */
export function safeNext(next: string | null | undefined, fallback = "/dashboard"): string {
  if (!next?.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return fallback;
  return next;
}

const PENDING_BIRTH_KEY = "astrojanta:pending-birth";

export const pendingBirth = {
  save(value: unknown) {
    sessionStorage.setItem(PENDING_BIRTH_KEY, JSON.stringify(value));
  },
  take<T>(): T | null {
    const raw = sessionStorage.getItem(PENDING_BIRTH_KEY);
    sessionStorage.removeItem(PENDING_BIRTH_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },
};
