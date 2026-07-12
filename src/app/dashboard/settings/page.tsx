import type { Metadata } from "next";
import { DashPageHeader } from "@/components/dashboard/page-header";
import { SettingsForm } from "@/components/dashboard/settings-form";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <DashPageHeader title="Settings" description="Manage your profile, notifications and password." />
      <div className="mt-6">
        <SettingsForm />
      </div>
    </div>
  );
}
