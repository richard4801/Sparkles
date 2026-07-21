import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  CaretRight,
  Star,
  DownloadSimple,
  FileText,
  Buildings,
  GraduationCap,
  CalendarBlank,
} from "@phosphor-icons/react/dist/ssr";
import {
  getResourceById,
  getReviewsForResource,
  getAllResources,
  isWishlisted,
  canReviewResource,
  hasPurchased,
} from "@/db/queries";
import { auth } from "@/auth";
import { similarResources } from "@/lib/ai/recommend";
import { smartTags } from "@/lib/ai/tags";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResourceCard } from "@/components/resource-card";
import { PurchaseCard } from "@/components/resource-detail/purchase-card";
import { PreviewGallery } from "@/components/resource-detail/preview-gallery";
import { Reviews } from "@/components/resource-detail/reviews";
import { formatNaira, formatCompact, picsum, slugify } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const resource = await getResourceById(id);
  if (!resource) return { title: "Resource not found" };
  return {
    title: resource.title,
    description: resource.description,
    openGraph: {
      title: resource.title,
      description: resource.description,
      type: "article",
    },
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resource = await getResourceById(id);
  if (!resource) notFound();

  const reviews = await getReviewsForResource(resource.id);
  const all = await getAllResources();
  const related = similarResources(resource, all, 4);
  const tags = smartTags(resource);

  const session = await auth();
  const isAdmin = session?.user?.role === "admin";
  const saved = session?.user?.id
    ? await isWishlisted(session.user.id, resource.id)
    : false;
  const canReview = session?.user?.id
    ? await canReviewResource(session.user.id, resource.id, isAdmin)
    : false;
  // Admins own the entire library, so they can download without purchasing.
  const owned = session?.user?.id
    ? isAdmin || (await hasPurchased(session.user.id, resource.id))
    : false;

  const meta = [
    { icon: Buildings, label: resource.institution },
    { icon: FileText, label: resource.department },
    { icon: GraduationCap, label: resource.level },
    { icon: CalendarBlank, label: String(resource.year) },
  ];

  return (
    <main id="main" className="container-page py-6 pb-28 lg:py-10 lg:pb-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
          <li>
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
          </li>
          <CaretRight weight="bold" className="size-3.5 text-faint-foreground" aria-hidden />
          <li>
            <Link href="/browse" className="transition-colors hover:text-primary">
              Browse
            </Link>
          </li>
          <CaretRight weight="bold" className="size-3.5 text-faint-foreground" aria-hidden />
          <li>
            <Link
              href={`/browse?category=${slugify(resource.category)}`}
              className="transition-colors hover:text-primary"
            >
              {resource.category}
            </Link>
          </li>
          <CaretRight weight="bold" className="size-3.5 text-faint-foreground" aria-hidden />
          <li className="max-w-[16rem] truncate font-medium text-foreground" aria-current="page">
            {resource.title}
          </li>
        </ol>
      </nav>

      <div className="mt-6 lg:grid lg:grid-cols-[1fr_20rem] lg:gap-10 xl:gap-14">
        {/* Main column */}
        <div className="min-w-0">
          <Badge variant="primary" size="md">
            {resource.type}
          </Badge>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
            {resource.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
              <Star weight="fill" className="size-4 text-amber" aria-hidden />
              {resource.rating.toFixed(1)}
              <span className="font-normal text-muted-foreground">
                ({resource.reviews})
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <DownloadSimple weight="bold" className="size-4" aria-hidden />
              {formatCompact(resource.downloads)} downloads
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileText weight="bold" className="size-4" aria-hidden />
              {resource.pages} pages
            </span>
          </div>

          {/* Cover */}
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-sm)]">
            <Image
              src={picsum(resource.thumbnailSeed, 1200, 675)}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>

          {/* Meta chips */}
          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {meta.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-border bg-surface p-3.5"
              >
                <m.icon weight="duotone" className="size-5 text-primary" aria-hidden />
                <dd className="mt-1.5 line-clamp-2 text-sm font-semibold text-foreground">
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>

          {/* Smart tags */}
          {tags.length > 0 ? (
            <div className="mt-6">
              <h2 className="sr-only">Topics</h2>
              <ul className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center rounded-full border border-border bg-surface-subtle px-3 py-1 text-xs font-medium capitalize text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Abstract */}
          <section aria-labelledby="abstract-heading" className="mt-10">
            <h2
              id="abstract-heading"
              className="font-display text-2xl font-extrabold tracking-tight text-foreground"
            >
              Abstract
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {resource.abstract}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Course:</span>{" "}
              {resource.course} · <span className="font-semibold text-foreground">Faculty:</span>{" "}
              {resource.faculty}
            </p>
          </section>

          {/* Table of contents */}
          <section aria-labelledby="toc-heading" className="mt-10">
            <h2
              id="toc-heading"
              className="font-display text-2xl font-extrabold tracking-tight text-foreground"
            >
              Table of contents
            </h2>
            <ol className="mt-4 grid gap-2.5">
              {resource.tableOfContents.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary-soft text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Preview */}
          <div className="mt-10">
            <PreviewGallery
              resourceId={resource.id}
              title={resource.title}
              type={resource.type}
              abstract={resource.abstract}
              tableOfContents={resource.tableOfContents}
              pages={resource.pages}
            />
          </div>

          {/* Reviews */}
          <div className="mt-12">
            <Reviews
              reviews={reviews}
              rating={resource.rating}
              totalReviews={resource.reviews}
              resourceId={resource.id}
              canReview={canReview}
            />
          </div>
        </div>

        {/* Sticky purchase column (desktop) */}
        <aside className="mt-8 hidden lg:mt-0 lg:block">
          <div className="lg:sticky lg:top-24">
            <PurchaseCard resource={resource} saved={saved} owned={owned} isAdmin={isAdmin} />
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="mt-16">
          <h2
            id="related-heading"
            className="font-display text-2xl font-extrabold tracking-tight text-foreground"
          >
            Similar resources
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Picked by content similarity to what you&apos;re viewing.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Mobile sticky buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-border bg-surface/95 px-4 py-3 shadow-[0_-8px_24px_rgba(76,60,160,0.08)] backdrop-blur lg:hidden">
        <div>
          <p className="text-xs text-muted-foreground">
            {owned ? (isAdmin ? "Admin access" : "You own this") : "One-time payment"}
          </p>
          <p className="font-display text-xl font-extrabold text-foreground">
            {formatNaira(resource.priceNaira)}
          </p>
        </div>
        {owned ? (
          <Button asChild size="lg">
            <a href={`/api/download/${resource.id}`} download>
              Download now
            </a>
          </Button>
        ) : (
          <Button asChild size="lg">
            <a href="#buy">Buy and download</a>
          </Button>
        )}
      </div>
    </main>
  );
}
