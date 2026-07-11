"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/** URL-as-state helpers for the marketplace filters. Every change is a shallow
 *  router.push so results stay shareable, bookmarkable and back-button friendly. */
export function useFilterNav() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const push = useCallback(
    (next: URLSearchParams) => {
      const qs = next.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname],
  );

  const current = useCallback(
    (key: string): string[] => {
      const v = searchParams.get(key);
      return v ? v.split(",").filter(Boolean) : [];
    },
    [searchParams],
  );

  const toggle = useCallback(
    (key: string, slug: string) => {
      const set = new Set(current(key));
      if (set.has(slug)) set.delete(slug);
      else set.add(slug);
      const next = new URLSearchParams(searchParams.toString());
      if (set.size) next.set(key, [...set].join(","));
      else next.delete(key);
      push(next);
    },
    [current, searchParams, push],
  );

  const setSingle = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      push(next);
    },
    [searchParams, push],
  );

  const clearAll = useCallback(() => {
    // Preserve only the free-text query when clearing filters.
    const q = searchParams.get("q");
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    push(next);
  }, [searchParams, push]);

  return { searchParams, current, toggle, setSingle, clearAll };
}
