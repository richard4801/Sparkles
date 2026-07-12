import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireUser } from "@/lib/require-user";
import { getUnreadNotificationCount } from "@/db/queries";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Dashboard",
  },
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  const unread = await getUnreadNotificationCount(user.id);

  return (
    <DashboardShell
      user={{ name: user.name ?? "Student", email: user.email ?? "", avatarSeed: user.avatarSeed }}
      unread={unread}
      isAdmin={user.role === "admin"}
    >
      {children}
    </DashboardShell>
  );
}
