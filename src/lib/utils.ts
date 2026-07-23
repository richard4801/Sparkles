import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a Naira amount for display, e.g. 3500 -> "₦3,500". */
export function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

/** Compact number, e.g. 1842 -> "1.8k", 12480 -> "12.5k". */
export function formatCompact(n: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

/*
  Catalog imagery is served from committed local assets under /public, so every
  picture is chosen to match its topic and to feel Nigerian (no random Western
  stock). Real photos live at these exact paths; on-brand placeholders occupy
  them until a generated photo is dropped in with the same filename.
*/

/** Cover image for a resource, keyed by its id: /public/catalog/<id>.jpg */
export function resourceImage(id: string) {
  return `/catalog/${id}.jpg`;
}

/** Cover source for a resource: the admin-uploaded image (served through
 *  /api/cover) when one exists, otherwise the generated placeholder. */
export function coverImage(resource: { id: string; imageUrl?: string | null }) {
  return resource.imageUrl ? `/api/cover/${resource.id}` : resourceImage(resource.id);
}

/** Tile image for a category, keyed by slug: /public/categories/<slug>.jpg */
export function categoryImage(slug: string) {
  return `/categories/${slug}.jpg`;
}

/** A fixed decorative scene: /public/scenes/<name>.jpg */
export function sceneImage(name: string) {
  return `/scenes/${name}.jpg`;
}

/**
 * A unique cartoon avatar for a seed, rendered on the fly by /api/avatar.
 * The same seed always yields the same avatar, and each account's seed is
 * unique, so no two users ever share one. See src/lib/avatar.ts.
 */
export function avatar(seed: string) {
  return `/api/avatar/${encodeURIComponent(seed || "new-student")}`;
}

/** Slugify a label for use in URLs and filter params. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
