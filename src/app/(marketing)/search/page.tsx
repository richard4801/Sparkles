import type { Metadata } from "next";
import { TrendUp, SlidersHorizontal, FileMagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { categories } from "@/lib/data";
import { getAllResources } from "@/db/queries";
import { parseFilters, applyFilters } from "@/lib/filters";
import { SearchBox } from "@/components/search/search-box";
import { RecentSearches } from "@/components/search/recent-searches";
import { ResourceCard } from "@/components/resource-card";
import { CategoryIcon } from "@/components/category-icon";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search Sparklyn for research projects, past questions, journals and business plans across Nigerian institutions.",
};

const trending = [
  "Mobile banking",
  "Machine learning",
  "Solar energy",
  "Financial accounting",
  "Entrepreneurship",
  "Cyber security",
];

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const filters = parseFilters(sp);
  const hasQuery = filters.q.length > 0;
  const resources = await getAllResources();
  const results = hasQuery ? applyFilters(resources, filters) : [];

  const resourceIndex = resources.map((r) => ({
    id: r.id,
    title: r.title,
    type: r.type,
    category: r.category,
  }));
  const catList = categories.map((c) => ({ slug: c.slug, name: c.name }));

  return (
    <main id="main" className="container-page py-8 lg:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Search Sparklyn
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Find the exact resource you need across every institution and department.
        </p>
        <div className="mt-6 text-left">
          <SearchBox
            resourceIndex={resourceIndex}
            categories={catList}
            initialQuery={filters.q}
            size="lg"
            autoFocus={!hasQuery}
          />
        </div>
      </div>

      {hasQuery ? (
        <section aria-label="Search results" className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-muted-foreground">
              <span className="font-bold text-foreground">{results.length}</span>{" "}
              {results.length === 1 ? "result" : "results"} for{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{filters.q}&rdquo;
              </span>
            </p>
            <Button asChild variant="outline" size="sm">
              <a href={`/browse?q=${encodeURIComponent(filters.q)}`}>
                <SlidersHorizontal weight="bold" className="size-4" aria-hidden />
                Refine with filters
              </a>
            </Button>
          </div>

          {results.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong bg-surface-subtle/40 px-6 py-16 text-center">
              <span className="grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary">
                <FileMagnifyingGlass weight="duotone" className="size-7" aria-hidden />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold text-foreground">
                Nothing found for &ldquo;{filters.q}&rdquo;
              </h2>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Check the spelling or try a broader term like the course or
                department name.
              </p>
            </div>
          )}
        </section>
      ) : (
        <div className="mx-auto mt-12 grid max-w-3xl gap-10">
          <section aria-labelledby="trending-searches-heading">
            <h2
              id="trending-searches-heading"
              className="inline-flex items-center gap-2 text-sm font-bold text-foreground"
            >
              <TrendUp weight="bold" className="size-4 text-primary" aria-hidden />
              Trending searches
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {trending.map((term) => (
                <li key={term}>
                  <a
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="inline-block rounded-full border border-border-strong bg-surface px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {term}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <RecentSearches />

          <section aria-labelledby="browse-categories-heading">
            <h2
              id="browse-categories-heading"
              className="text-sm font-bold text-foreground"
            >
              Browse by category
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {categories.map((c) => (
                <a
                  key={c.slug}
                  href={`/browse?category=${c.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-primary/30 hover:bg-primary-tint"
                >
                  <CategoryIcon
                    name={c.iconName}
                    className="size-5 text-primary"
                    aria-hidden
                  />
                  <span className="text-sm font-medium text-foreground group-hover:text-primary">
                    {c.name}
                  </span>
                </a>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
