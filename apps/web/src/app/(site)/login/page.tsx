import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

export default function LoginPage() {
  return (
    <div className="px-4 py-12 sm:py-20">
      <Suspense>
        <AuthForm mode="login" />
      </Suspense>
    </div>
  );
}
