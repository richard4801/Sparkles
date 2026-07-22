import type { Metadata } from "next";
import { Bell } from "@phosphor-icons/react/dist/ssr";
import { requireUser } from "@/lib/require-user";
import { getNotifications } from "@/db/queries";
import { DashPageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { NotificationsFeed } from "@/components/dashboard/notifications-feed";

export const metadata: Metadata = { title: "Notifications" };

export default async function NotificationsPage() {
  const user = await requireUser();
  const notifications = await getNotifications(user.id);
  return (
    <div className="mx-auto max-w-3xl">
      <DashPageHeader title="Notifications" description="Updates about your account and resources." />
      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="You're all caught up"
          description="Order confirmations, price drops and saved-search matches will show up here."
        />
      ) : (
        <div className="mt-6">
          <NotificationsFeed items={notifications} />
        </div>
      )}
    </div>
  );
}
