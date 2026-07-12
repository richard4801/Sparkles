import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { requireAdmin } from "@/lib/require-admin";
import { getResourceForEdit, listCategories, listUniversities } from "@/db/admin";
import { ResourceForm, type ResourceInitial } from "@/components/admin/resource-form";

export const metadata: Metadata = { title: "Edit resource" };
export const dynamic = "force-dynamic";

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const [row, categories, universities] = await Promise.all([
    getResourceForEdit(id),
    listCategories(),
    listUniversities(),
  ]);
  if (!row) notFound();

  const initial: ResourceInitial = {
    title: row.title,
    type: row.type,
    categoryId: row.categoryId,
    institutionId: row.institutionId,
    department: row.department,
    faculty: row.faculty,
    course: row.course,
    description: row.description,
    abstract: row.abstract,
    tableOfContents: row.tableOfContents ?? [],
    rating: row.rating,
    reviewsCount: row.reviewsCount,
    downloads: row.downloads,
    pages: row.pages,
    priceNaira: row.priceNaira,
    level: row.level,
    year: row.year,
    thumbnailSeed: row.thumbnailSeed,
    trending: row.trending,
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/dashboard/admin/resources"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft weight="bold" className="size-4" aria-hidden />
        Back to resources
      </Link>
      <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
        Edit resource
      </h1>
      <p className="mt-1.5 truncate text-muted-foreground">{row.title}</p>

      <div className="mt-6">
        <ResourceForm
          mode="edit"
          resourceId={row.id}
          initial={initial}
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
          universities={universities.map((u) => ({ id: u.id, name: u.name }))}
        />
      </div>
    </div>
  );
}
