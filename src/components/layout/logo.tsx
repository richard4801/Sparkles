import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/** Wordmark: a sparkle mark plus the name in display type. `light` renders it for
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
        <Sparkle weight="fill" className="size-[1.15rem]" aria-hidden />
      </span>
      <span
        className={cn(
          "font-display text-[1.35rem] font-extrabold tracking-tight",
          light ? "text-white" : "text-foreground",
        )}
      >
        Sparklyn
      </span>
    </span>
  );
}
