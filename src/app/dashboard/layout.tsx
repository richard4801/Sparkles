import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { GenderPrompt } from "@/components/dashboard/gender-prompt";
import { requireUser } from "@/lib/require-user";
import { getUnreadNotificationCount, getUserChrome } from "@/db/queries";

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
  const [unread, chrome] = await Promise.all([
    getUnreadNotificationCount(user.id),
    getUserChrome(user.id),
  ]);
  const name = chrome?.name ?? user.name ?? "Student";
  // Read the avatar from the DB, not the cached session token, so a just-set
  // gender is reflected immediately.
  const avatarSeed = chrome?.avatarSeed ?? user.avatarSeed;

  return (
    <DashboardShell
      user={{ name, email: user.email ?? "", avatarSeed }}
      unread={unread}
      isAdmin={user.role === "admin"}
    >
      {chrome && chrome.gender == null ? (
        <GenderPrompt firstName={name.split(" ")[0]} />
      ) : null}
      {children}
    </DashboardShell>
  );
}
