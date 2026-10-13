import type { Metadata } from "next";
import { AdminOverview } from "./admin-overview";

export const metadata: Metadata = { title: "Admin" };

export default function AdminPage() {
  return <AdminOverview />;
}
