import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

/** Simple wordmark: a sparkle mark in the brand purple plus the name in display
 *  type. Kept as a single geometric mark, not a hand-rolled illustration. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="grid size-8 place-items-center rounded-[0.6rem] bg-primary text-primary-foreground shadow-[var(--shadow-sm)]">
        <Sparkle weight="fill" className="size-[1.15rem]" aria-hidden />
      </span>
      <span className="font-display text-[1.35rem] font-extrabold tracking-tight text-foreground">
        Sparklyn
      </span>
    </span>
  );
}
