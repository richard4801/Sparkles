import type { Resource } from "@/types";
import { slugify } from "@/lib/utils";

export type SortKey =
  | "relevance"
  | "newest"
  | "rating"
  | "downloads"
  | "price-asc"
  | "price-desc";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "relevance", label: "Most relevant" },
  { value: "downloads", label: "Most downloaded" },
  { value: "rating", label: "Highest rated" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export const PRICE_BUCKETS: {
  id: string;
  label: string;
  min: number;
  max: number;
}[] = [
  { id: "under-3000", label: "Under ₦3,000", min: 0, max: 2999 },
  { id: "3000-5000", label: "₦3,000 - ₦5,000", min: 3000, max: 5000 },
  { id: "5000-7000", label: "₦5,000 - ₦7,000", min: 5000, max: 7000 },
  { id: "7000-plus", label: "₦7,000 and above", min: 7000, max: Infinity },
];

/** Which facet groups the sidebar renders, in order. `key` maps to the
 *  `Resource` field the facet is derived from. */
export const FACET_GROUPS = [
  { key: "type", field: "type", label: "Resource type" },
  { key: "category", field: "category", label: "Category" },
  { key: "institution", field: "institution", label: "Institution" },
  { key: "faculty", field: "faculty", label: "Faculty" },
  { key: "department", field: "department", label: "Department" },
  { key: "level", field: "level", label: "Level" },
  { key: "year", field: "year", label: "Year" },
] as const;

export type FacetKey = (typeof FACET_GROUPS)[number]["key"];

export interface FacetOption {
  slug: string;
  label: string;
  count: number;
}

export interface Filters {
  q: string;
  sort: SortKey;
  price: string; // price bucket id, or ""
  selections: Record<FacetKey, string[]>; // slugs per facet
}

function toArray(v: string | string[] | undefined): string[] {
  if (!v) return [];
  const raw = Array.isArray(v) ? v : [v];
  return raw
    .flatMap((s) => s.split(","))
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseFilters(
  sp: Record<string, string | string[] | undefined>,
): Filters {
  const sortRaw = (Array.isArray(sp.sort) ? sp.sort[0] : sp.sort) ?? "relevance";
  const sort = SORT_OPTIONS.some((o) => o.value === sortRaw)
    ? (sortRaw as SortKey)
    : "relevance";
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q) ?? "";
  const price = (Array.isArray(sp.price) ? sp.price[0] : sp.price) ?? "";

  const selections = {} as Record<FacetKey, string[]>;
  for (const g of FACET_GROUPS) selections[g.key] = toArray(sp[g.key]);

  return { q: q.trim(), sort, price, selections };
}

function fieldSlug(resource: Resource, field: string): string {
  return slugify(String(resource[field as keyof Resource]));
}

export function buildFacets(
  resources: Resource[],
): Record<FacetKey, FacetOption[]> {
  const result = {} as Record<FacetKey, FacetOption[]>;
  for (const g of FACET_GROUPS) {
    const map = new Map<string, FacetOption>();
    for (const r of resources) {
      const label = String(r[g.field as keyof Resource]);
      const slug = slugify(label);
      const existing = map.get(slug);
      if (existing) existing.count += 1;
      else map.set(slug, { slug, label, count: 1 });
    }
    const opts = [...map.values()];
    // Years descending; everything else alphabetical.
    if (g.key === "year") opts.sort((a, b) => b.label.localeCompare(a.label));
    else opts.sort((a, b) => a.label.localeCompare(b.label));
    result[g.key] = opts;
  }
  return result;
}

export function applyFilters(
  resources: Resource[],
  filters: Filters,
): Resource[] {
  const q = filters.q.toLowerCase();
  const bucket = PRICE_BUCKETS.find((b) => b.id === filters.price);

  const filtered = resources.filter((r) => {
    if (q) {
      const haystack = [
        r.title,
        r.description,
        r.category,
        r.department,
        r.institution,
        r.course,
        r.type,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    for (const g of FACET_GROUPS) {
      const selected = filters.selections[g.key];
      if (selected.length && !selected.includes(fieldSlug(r, g.field)))
        return false;
    }

    if (bucket && !(r.priceNaira >= bucket.min && r.priceNaira <= bucket.max))
      return false;

    return true;
  });

  return sortResources(filtered, filters.sort);
}

function sortResources(resources: Resource[], sort: SortKey): Resource[] {
  const copy = [...resources];
  switch (sort) {
    case "newest":
      return copy.sort((a, b) => a.addedDaysAgo - b.addedDaysAgo);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    case "downloads":
      return copy.sort((a, b) => b.downloads - a.downloads);
    case "price-asc":
      return copy.sort((a, b) => a.priceNaira - b.priceNaira);
    case "price-desc":
      return copy.sort((a, b) => b.priceNaira - a.priceNaira);
    default:
      // relevance: trending first, then downloads
      return copy.sort(
        (a, b) =>
          Number(Boolean(b.trending)) - Number(Boolean(a.trending)) ||
          b.downloads - a.downloads,
      );
  }
}

/** Count active facet + price selections (not sort or query). */
export function countActive(filters: Filters): number {
  const facetCount = FACET_GROUPS.reduce(
    (n, g) => n + filters.selections[g.key].length,
    0,
  );
  return facetCount + (filters.price ? 1 : 0);
}
