import type { Metadata } from "next";
import { notifications } from "@/lib/dashboard-data";
import { DashPageHeader } from "@/components/dashboard/page-header";
import { NotificationsFeed } from "@/components/dashboard/notifications-feed";

export const metadata: Metadata = { title: "Notifications" };

export default function NotificationsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <DashPageHeader title="Notifications" description="Updates about your account and resources." />
      <div className="mt-6">
        <NotificationsFeed items={notifications} />
      </div>
    </div>
  );
}
