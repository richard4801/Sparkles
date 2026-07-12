"use client";

import * as React from "react";
import Link from "next/link";
import { MagnifyingGlass, PencilSimple, Trash, TrendUp } from "@phosphor-icons/react";
import { deleteResource } from "@/lib/admin-actions";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { formatNaira, formatCompact, cn } from "@/lib/utils";
import type { AdminResourceRow } from "@/db/admin";

export function ResourceTable({ rows }: { rows: AdminResourceRow[] }) {
  const [q, setQ] = React.useState("");

  const filtered = React.useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter(
      (r) =>
        r.title.toLowerCase().includes(needle) ||
        r.category.toLowerCase().includes(needle) ||
        r.type.toLowerCase().includes(needle) ||
        r.institution.toLowerCase().includes(needle),
    );
  }, [q, rows]);

  return (
    <div>
      <div className="relative mb-4 max-w-sm">
        <MagnifyingGlass
          weight="bold"
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search resources…"
          aria-label="Search resources"
          className="h-11 w-full rounded-full border border-border-strong bg-surface pl-10 pr-4 text-sm text-foreground shadow-[var(--shadow-xs)] focus-visible:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-xs)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Institution</th>
                <th className="px-5 py-3 text-right font-semibold">Price</th>
                <th className="px-5 py-3 text-right font-semibold">Downloads</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-surface-subtle/50">
                  <td className="max-w-[22rem] px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/admin/resources/${r.id}/edit`}
                        className="truncate font-semibold text-foreground hover:text-primary"
                      >
                        {r.title}
                      </Link>
                      {r.trending ? (
                        <span
                          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[0.65rem] font-bold text-primary"
                          title="Trending"
                        >
                          <TrendUp weight="bold" className="size-3" aria-hidden />
                        </span>
                      ) : null}
                    </div>
                    <span className="text-xs text-muted-foreground">{r.category}</span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{r.type}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.institution}</td>
                  <td className="px-5 py-3 text-right font-medium text-foreground">
                    {r.priceNaira === 0 ? "Free" : formatNaira(r.priceNaira)}
                  </td>
                  <td className="px-5 py-3 text-right text-muted-foreground">
                    {formatCompact(r.downloads)}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/dashboard/admin/resources/${r.id}/edit`}
                        aria-label={`Edit ${r.title}`}
                        className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-subtle hover:text-foreground"
                      >
                        <PencilSimple weight="bold" className="size-4" aria-hidden />
                      </Link>
                      <ConfirmDialog
                        title="Delete resource?"
                        description={`"${r.title}" will be permanently removed from the catalog. This cannot be undone.`}
                        onConfirm={() => deleteResource(r.id)}
                        trigger={
                          <button
                            type="button"
                            aria-label={`Delete ${r.title}`}
                            className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-rose/10 hover:text-rose"
                          >
                            <Trash weight="bold" className="size-4" aria-hidden />
                          </button>
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className={cn("px-5 py-10 text-center text-muted-foreground")}>
                    {rows.length === 0 ? "No resources yet." : "No resources match your search."}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        {filtered.length} of {rows.length} resources
      </p>
    </div>
  );
}
