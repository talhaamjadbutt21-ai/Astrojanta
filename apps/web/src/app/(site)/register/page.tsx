import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Create account", robots: { index: false } };

export default function RegisterPage() {
  return (
    <div className="px-4 py-12 sm:py-20">
      <Suspense>
        <AuthForm mode="register" />
      </Suspense>
    </div>
  );
}
