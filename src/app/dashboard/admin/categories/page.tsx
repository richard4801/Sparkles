import type { Metadata } from "next";
import { requireAdmin } from "@/lib/require-admin";
import { listCategories } from "@/db/admin";
import { DashPageHeader } from "@/components/dashboard/page-header";
import { CategoryManager } from "@/components/admin/category-manager";

export const metadata: Metadata = { title: "Categories" };
export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const categories = await listCategories();

  return (
    <div className="mx-auto max-w-3xl">
      <DashPageHeader
        title="Categories"
        description="Organise the catalog. Categories with resources can't be deleted."
      />
      <div className="mt-6">
        <CategoryManager
          categories={categories.map((c) => ({
            id: c.id,
            name: c.name,
            accent: c.accent,
            iconName: c.iconName,
            resources: c.resources,
          }))}
        />
      </div>
    </div>
  );
}
