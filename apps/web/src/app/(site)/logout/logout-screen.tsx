"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/lib/api";
import { useSetSession } from "@/lib/session";

export function LogoutScreen() {
  const router = useRouter();
  const setSession = useSetSession();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    api.auth
      .logout()
      .catch(() => undefined)
      .finally(() => {
        setSession(null);
        router.replace("/login");
      });
  }, [router, setSession]);

  return (
    <div className="grid min-h-[50dvh] place-items-center px-4" role="status" aria-live="polite">
      <p className="flex items-center gap-3 text-muted">
        <Spinner className="size-5 text-gold-400" /> Signing you out…
      </p>
    </div>
  );
}
