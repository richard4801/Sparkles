import type { Metadata } from "next";
import { MagnifyingGlass, FileMagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { getAllResources } from "@/db/queries";
import {
  parseFilters,
  buildFacets,
  applyFilters,
  countActive,
} from "@/lib/filters";
import { ResourceCard } from "@/components/resource-card";
import { FilterControls } from "@/components/browse/filter-controls";
import { FilterDrawer } from "@/components/browse/filter-drawer";
import { SortSelect } from "@/components/browse/sort-select";
import { ActiveFilters } from "@/components/browse/active-filters";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Browse academic resources",
  description:
    "Filter research projects, past questions, journals and business plans by institution, department, level, year and price.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const filters = parseFilters(sp);
  const resources = await getAllResources();
  const facets = buildFacets(resources);
  const results = applyFilters(resources, filters);
  const active = countActive(filters);

  return (
    <main id="main" className="container-page py-8 lg:py-12">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {filters.q ? (
            <>
              Results for{" "}
              <span className="text-primary">&ldquo;{filters.q}&rdquo;</span>
            </>
          ) : (
            "Browse resources"
          )}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Vetted academic material from across Nigeria. Filter to find exactly
          what your project needs.
        </p>
      </header>

      <div className="mt-8 lg:grid lg:grid-cols-[16rem_1fr] lg:gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:overflow-y-auto lg:pr-1">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-foreground">
              Filters
            </h2>
          </div>
          <FilterControls facets={facets} />
        </aside>

        {/* Results column */}
        <section aria-label="Search results">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <FilterDrawer facets={facets} />
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">
                  {results.length}
                </span>{" "}
                {results.length === 1 ? "resource" : "resources"}
              </p>
            </div>
            <SortSelect />
          </div>

          {active > 0 ? (
            <div className="mt-4">
              <ActiveFilters facets={facets} />
            </div>
          ) : null}

          {results.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong bg-surface-subtle/40 px-6 py-20 text-center">
              <span className="grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary">
                <FileMagnifyingGlass weight="duotone" className="size-7" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-foreground">
                No resources match those filters
              </h3>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Try removing a filter or searching a broader term. New material is
                added every day.
              </p>
              <Button asChild variant="outline" size="md" className="mt-6">
                <a href="/browse">
                  <MagnifyingGlass weight="bold" className="size-4" aria-hidden />
                  Reset and browse all
                </a>
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
