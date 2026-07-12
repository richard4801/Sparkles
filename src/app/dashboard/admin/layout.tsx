import type { Metadata } from "next";
import { requireAdmin } from "@/lib/require-admin";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

/** Server-side gate: every /dashboard/admin page is admin-only. */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return <>{children}</>;
}
