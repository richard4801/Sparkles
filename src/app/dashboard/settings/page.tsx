import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/require-user";
import { getDashUser } from "@/db/queries";
import { DashPageHeader } from "@/components/dashboard/page-header";
import { SettingsForm } from "@/components/dashboard/settings-form";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const authed = await requireUser();
  const user = await getDashUser(authed.id);
  if (!user) notFound();
  return (
    <div className="mx-auto max-w-3xl">
      <DashPageHeader title="Settings" description="Manage your profile, notifications and password." />
      <div className="mt-6">
        <SettingsForm user={user} />
      </div>
    </div>
  );
}
