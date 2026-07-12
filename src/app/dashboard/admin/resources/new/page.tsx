import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { requireAdmin } from "@/lib/require-admin";
import { listCategories, listUniversities } from "@/db/admin";
import { ResourceForm, type ResourceInitial } from "@/components/admin/resource-form";

export const metadata: Metadata = { title: "New resource" };
export const dynamic = "force-dynamic";

const empty: ResourceInitial = {
  title: "",
  type: "Research Project",
  categoryId: 0,
  institutionId: 0,
  department: "",
  faculty: "",
  course: "",
  description: "",
  abstract: "",
  tableOfContents: [],
  rating: 0,
  reviewsCount: 0,
  downloads: 0,
  pages: 1,
  priceNaira: 0,
  level: "BSc",
  year: new Date().getFullYear(),
  thumbnailSeed: "",
  trending: false,
};

export default async function NewResourcePage() {
  await requireAdmin();
  const [categories, universities] = await Promise.all([
    listCategories(),
    listUniversities(),
  ]);

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
        New resource
      </h1>
      <p className="mt-1.5 text-muted-foreground">Add a resource to the catalog.</p>

      <div className="mt-6">
        <ResourceForm
          mode="create"
          initial={empty}
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
          universities={universities.map((u) => ({ id: u.id, name: u.name }))}
        />
      </div>
    </div>
  );
}
