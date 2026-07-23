import { cn } from "@/lib/utils";

/** The Skola mark: an open book (learning) with a lime bookmark (a saved,
 *  curated resource) inside a rounded brand badge. */
function SkolaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      {/* open book — two pages fanning from a centre spine */}
      <path
        d="M12 6.6C9.7 5.2 6.7 4.9 4.2 5.6c-.5.15-.8.6-.8 1.1v10.1c0 .7.66 1.2 1.35 1.03C6.9 17.3 9.6 17.6 12 19V6.6Z"
        fill="currentColor"
      />
      <path
        d="M12 6.6c2.3-1.4 5.3-1.7 7.8-1 .5.15.8.6.8 1.1v10.1c0 .7-.66 1.2-1.35 1.03C16.7 17.3 14 17.6 12 19V6.6Z"
        fill="currentColor"
        opacity="0.82"
      />
      {/* lime bookmark tucked into the right page */}
      <path
        d="M15.1 4.2h3.4v6.3l-1.7-1.25L15.1 10.5V4.2Z"
        fill="var(--accent-lime, #bff23f)"
      />
    </svg>
  );
}

/** Wordmark: the Skola mark plus the name in display type. `light` renders it for
 *  dark/brand backgrounds (glass mark, white wordmark). */
export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "grid size-8 place-items-center rounded-[0.6rem] shadow-[var(--shadow-sm)]",
          light
            ? "border border-white/25 bg-white/15 text-white backdrop-blur"
            : "bg-primary text-primary-foreground",
        )}
      >
        <SkolaMark className="size-[1.3rem]" />
      </span>
      <span
        className={cn(
          "font-display text-[1.35rem] font-extrabold tracking-tight",
          light ? "text-white" : "text-foreground",
        )}
      >
        Skola
      </span>
    </span>
  );
}
