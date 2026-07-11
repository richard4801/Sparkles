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

/** Picsum placeholder URL from a descriptive seed. */
export function picsum(seed: string, w: number, h: number) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}
