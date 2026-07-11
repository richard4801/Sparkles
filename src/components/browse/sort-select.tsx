"use client";

import { CaretUpDown } from "@phosphor-icons/react";
import { useFilterNav } from "./use-filter-nav";
import { SORT_OPTIONS } from "@/lib/filters";

export function SortSelect() {
  const { searchParams, setSingle } = useFilterNav();
  const value = searchParams.get("sort") ?? "relevance";
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Sort results</span>
      <select
        value={value}
        onChange={(e) => setSingle("sort", e.target.value)}
        className="h-10 cursor-pointer appearance-none rounded-full border border-border-strong bg-surface pl-4 pr-9 text-sm font-medium text-foreground shadow-[var(--shadow-xs)] transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <CaretUpDown
        weight="bold"
        aria-hidden
        className="pointer-events-none absolute right-3 size-4 text-faint-foreground"
      />
    </label>
  );
}
