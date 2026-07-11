"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useFilterNav } from "./use-filter-nav";
import {
  FACET_GROUPS,
  PRICE_BUCKETS,
  type FacetKey,
  type FacetOption,
} from "@/lib/filters";
import { cn } from "@/lib/utils";

// Facets that tend to be long get a scroll cap; the first two stay open.
const OPEN_BY_DEFAULT: FacetKey[] = ["type", "category"];
const SCROLLABLE: FacetKey[] = ["institution", "department"];

function Group({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group border-b border-border py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-foreground [&::-webkit-details-marker]:hidden">
        {title}
        <CaretDown
          weight="bold"
          aria-hidden
          className="size-4 text-faint-foreground transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="pt-3">{children}</div>
    </details>
  );
}

export function FilterControls({
  facets,
}: {
  facets: Record<FacetKey, FacetOption[]>;
}) {
  const { current, toggle, setSingle, searchParams } = useFilterNav();
  const activePrice = searchParams.get("price") ?? "";

  return (
    <div>
      {FACET_GROUPS.map((g) => {
        const options = facets[g.key];
        if (!options.length) return null;
        const selected = current(g.key);
        return (
          <Group
            key={g.key}
            title={g.label}
            defaultOpen={OPEN_BY_DEFAULT.includes(g.key)}
          >
            <ul
              className={cn(
                "grid gap-1.5",
                SCROLLABLE.includes(g.key) &&
                  "max-h-52 overflow-y-auto pr-1 scrollbar-none",
              )}
            >
              {options.map((o) => {
                const checked = selected.includes(o.slug);
                return (
                  <li key={o.slug}>
                    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(g.key, o.slug)}
                        className="size-4 shrink-0 rounded border-border-strong accent-primary"
                      />
                      <span
                        className={cn(
                          "flex-1 truncate transition-colors",
                          checked
                            ? "font-medium text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {o.label}
                      </span>
                      <span className="text-xs tabular-nums text-faint-foreground">
                        {o.count}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </Group>
        );
      })}

      <Group title="Price" defaultOpen>
        <ul className="grid gap-1.5">
          {PRICE_BUCKETS.map((b) => {
            const checked = activePrice === b.id;
            return (
              <li key={b.id}>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm">
                  <input
                    type="radio"
                    name="price"
                    checked={checked}
                    onChange={() => setSingle("price", checked ? "" : b.id)}
                    onClick={() => {
                      if (checked) setSingle("price", "");
                    }}
                    className="size-4 shrink-0 accent-primary"
                  />
                  <span
                    className={cn(
                      "transition-colors",
                      checked
                        ? "font-medium text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {b.label}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </Group>
    </div>
  );
}
