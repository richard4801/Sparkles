import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const accents: Record<string, string> = {
  violet: "bg-violet/10 text-violet",
  blue: "bg-blue/10 text-blue",
  emerald: "bg-emerald/10 text-emerald",
  amber: "bg-amber/10 text-amber",
};

export function StatCard({
  icon: IconCmp,
  label,
  value,
  sublabel,
  accent = "violet",
}: {
  icon: Icon;
  label: string;
  value: string;
  sublabel?: string;
  accent?: keyof typeof accents;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-xs)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 font-display text-2xl font-extrabold tracking-tight text-foreground">
            {value}
          </p>
        </div>
        <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl", accents[accent])}>
          <IconCmp weight="fill" className="size-5" aria-hidden />
        </span>
      </div>
      {sublabel ? (
        <p className="mt-3 text-xs text-muted-foreground">{sublabel}</p>
      ) : null}
    </div>
  );
}
