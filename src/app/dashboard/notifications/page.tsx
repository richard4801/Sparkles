import type { Metadata } from "next";
import { requireUser } from "@/lib/require-user";
import { getNotifications } from "@/db/queries";
import { DashPageHeader } from "@/components/dashboard/page-header";
import { NotificationsFeed } from "@/components/dashboard/notifications-feed";

export const metadata: Metadata = { title: "Notifications" };

export default async function NotificationsPage() {
  const user = await requireUser();
  const notifications = await getNotifications(user.id);
  return (
    <div className="mx-auto max-w-3xl">
      <DashPageHeader title="Notifications" description="Updates about your account and resources." />
      <div className="mt-6">
        <NotificationsFeed items={notifications} />
      </div>
    </div>
  );
}
