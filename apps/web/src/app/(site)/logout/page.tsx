import type { Metadata } from "next";
import { LogoutScreen } from "./logout-screen";

export const metadata: Metadata = { title: "Signing out", robots: { index: false } };

export default function LogoutPage() {
  return <LogoutScreen />;
}
