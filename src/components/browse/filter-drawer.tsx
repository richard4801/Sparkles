"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { SlidersHorizontal, X } from "@phosphor-icons/react";
import { FilterControls } from "./filter-controls";
import { useFilterNav } from "./use-filter-nav";
import { Button } from "@/components/ui/button";
import { countActive, parseFilters, type FacetKey, type FacetOption } from "@/lib/filters";

export function FilterDrawer({
  facets,
}: {
  facets: Record<FacetKey, FacetOption[]>;
}) {
  const [open, setOpen] = React.useState(false);
  const { searchParams, clearAll } = useFilterNav();
  const active = countActive(parseFilters(Object.fromEntries(searchParams)));

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-border-strong bg-surface px-4 text-sm font-semibold text-foreground shadow-[var(--shadow-xs)] transition-colors hover:border-primary/40 lg:hidden"
        >
          <SlidersHorizontal weight="bold" className="size-4" aria-hidden />
          Filters
          {active > 0 ? (
            <span className="grid size-5 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {active}
            </span>
          ) : null}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-foreground/40 backdrop-blur-sm data-[state=open]:animate-[fade-in_0.2s_ease] lg:hidden" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-[80] flex w-[86%] max-w-sm flex-col bg-surface shadow-[var(--shadow-lg)] focus:outline-none data-[state=open]:animate-[slide-in-left_0.28s_cubic-bezier(0.16,1,0.3,1)] lg:hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Dialog.Title className="font-display text-lg font-bold text-foreground">
              Filters
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close filters"
                className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-subtle"
              >
                <X weight="bold" className="size-5" aria-hidden />
              </button>
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto px-5">
            <FilterControls facets={facets} />
          </div>
          <div className="flex items-center gap-3 border-t border-border p-4">
            <Button
              type="button"
              variant="outline"
              size="md"
              className="flex-1"
              onClick={() => clearAll()}
              disabled={active === 0}
            >
              Clear
            </Button>
            <Dialog.Close asChild>
              <Button type="button" size="md" className="flex-1">
                Show results
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
