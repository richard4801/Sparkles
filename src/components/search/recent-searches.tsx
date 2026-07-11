"use client";

import { useSyncExternalStore } from "react";
import { ClockCounterClockwise, X } from "@phosphor-icons/react";
import {
  subscribeRecent,
  getRecentSnapshot,
  getRecentServerSnapshot,
  clearRecentSearches,
} from "@/lib/recent-searches";

export function RecentSearches() {
  const recent = useSyncExternalStore(
    subscribeRecent,
    getRecentSnapshot,
    getRecentServerSnapshot,
  );

  if (recent.length === 0) return null;

  return (
    <section aria-labelledby="recent-searches-heading">
      <div className="flex items-center justify-between">
        <h2
          id="recent-searches-heading"
          className="inline-flex items-center gap-2 text-sm font-bold text-foreground"
        >
          <ClockCounterClockwise weight="bold" className="size-4 text-faint-foreground" aria-hidden />
          Recent searches
        </h2>
        <button
          type="button"
          onClick={() => clearRecentSearches()}
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <X weight="bold" className="size-3" aria-hidden />
          Clear
        </button>
      </div>
      <ul className="mt-3 flex flex-wrap gap-2">
        {recent.map((term) => (
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
  );
}
