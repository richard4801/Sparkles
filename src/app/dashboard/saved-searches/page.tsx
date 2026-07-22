import type { Metadata } from "next";
import Link from "next/link";
import { MagnifyingGlass, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { requireUser } from "@/lib/require-user";
import { getSavedSearches } from "@/db/queries";
import { DashPageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Saved searches" };

export default async function SavedSearchesPage() {
  const user = await requireUser();
  const savedSearches = await getSavedSearches(user.id);

  if (savedSearches.length === 0) {
    return (
      <div className="mx-auto max-w-4xl">
        <DashPageHeader
          title="Saved searches"
          description="We check these for new matches so you do not have to."
        />
        <EmptyState
          icon={MagnifyingGlass}
          title="No saved searches"
          description="Run a search, then save it — we'll watch for new matching resources and flag them here."
          ctaLabel="Search resources"
          ctaHref="/search"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <DashPageHeader
        title="Saved searches"
        description="We check these for new matches so you do not have to."
      />

      <ul className="mt-6 grid gap-3">
        {savedSearches.map((s) => (
          <li
            key={s.id}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-xs)]"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
              <MagnifyingGlass weight="bold" className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate font-semibold text-foreground">{s.query}</p>
                {s.newMatches > 0 ? (
                  <Badge variant="success" size="sm">
                    {s.newMatches} new
                  </Badge>
                ) : null}
              </div>
              <p className="truncate text-sm text-muted-foreground">
                {s.filtersLabel} · saved {s.savedOn}
              </p>
            </div>
            <Link
              href={`/search?q=${encodeURIComponent(s.query)}`}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              View
              <ArrowRight weight="bold" className="size-4" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
