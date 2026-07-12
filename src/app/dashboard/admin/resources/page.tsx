import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { requireAdmin } from "@/lib/require-admin";
import { listResources } from "@/db/admin";
import { DashPageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { ResourceTable } from "@/components/admin/resource-table";

export const metadata: Metadata = { title: "Resources" };
export const dynamic = "force-dynamic";

export default async function AdminResourcesPage() {
  await requireAdmin();
  const rows = await listResources();

  return (
    <div className="mx-auto max-w-6xl">
      <DashPageHeader
        title="Resources"
        description="Add, edit and remove resources from the catalog."
        action={
          <Button asChild size="md">
            <Link href="/dashboard/admin/resources/new">
              <Plus weight="bold" className="size-4" aria-hidden />
              New resource
            </Link>
          </Button>
        }
      />
      <div className="mt-6">
        <ResourceTable rows={rows} />
      </div>
    </div>
  );
}
