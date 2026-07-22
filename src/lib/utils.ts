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

/** Tile image for a category, keyed by slug: /public/categories/<slug>.jpg */
export function categoryImage(slug: string) {
  return `/categories/${slug}.jpg`;
}

/** A fixed decorative scene: /public/scenes/<name>.jpg */
export function sceneImage(name: string) {
  return `/scenes/${name}.jpg`;
}

// First names in our seed data that belong to women, so a seed routes to a
// female face in the avatar pool. Anything else falls back to the male pool.
const FEMALE_GIVEN_NAMES = new Set([
  "chiamaka", "ngozi", "fatima", "chidinma", "blessing", "aisha", "folake",
  "grace", "halima", "ifeoma", "adaeze", "precious", "nkechi", "ada", "zainab",
  "amaka", "hauwa", "funmilayo", "rukayat", "chinelo", "damilola", "esther",
]);

function hashSeed(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

/**
 * A consistent Nigerian portrait for a name or seed, drawn from a committed
 * pool: /public/avatars/f1..f8 (women) and m1..m8 (men). The same seed always
 * maps to the same face, and the face's gender matches the name where known.
 */
export function avatar(seed: string) {
  const given = seed.toLowerCase().split(/[^a-z]+/).filter(Boolean)[0] ?? "";
  const group = FEMALE_GIVEN_NAMES.has(given) ? "f" : "m";
  const index = (hashSeed(seed) % 8) + 1;
  return `/avatars/${group}${index}.jpg`;
}

/** Slugify a label for use in URLs and filter params. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
