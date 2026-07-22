"use client";

import { X } from "@phosphor-icons/react";
import { useFilterNav } from "./use-filter-nav";
import {
  FACET_GROUPS,
  PRICE_BUCKETS,
  type FacetKey,
  type FacetOption,
} from "@/lib/filters";

export function ActiveFilters({
  facets,
}: {
  facets: Record<FacetKey, FacetOption[]>;
}) {
  const { current, toggle, setSingle, clearAll, searchParams } = useFilterNav();

  const chips: { key: string; label: string; remove: () => void }[] = [];
  for (const g of FACET_GROUPS) {
    const labels = new Map(facets[g.key].map((o) => [o.slug, o.label]));
    for (const slug of current(g.key)) {
      chips.push({
        key: `${g.key}:${slug}`,
        label: labels.get(slug) ?? slug,
        remove: () => toggle(g.key, slug),
      });
    }
  }
  const price = searchParams.get("price");
  if (price) {
    const bucket = PRICE_BUCKETS.find((b) => b.id === price);
    if (bucket)
      chips.push({
        key: `price:${price}`,
        label: bucket.label,
        remove: () => setSingle("price", ""),
      });
  }

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={c.remove}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft py-1 pl-3 pr-2 text-sm font-medium text-primary transition-colors hover:bg-[#c6e6e0]"
        >
          {c.label}
          <X weight="bold" aria-hidden className="size-3.5" />
          <span className="sr-only">Remove filter</span>
        </button>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className="rounded-full px-2 py-1 text-sm font-semibold text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
