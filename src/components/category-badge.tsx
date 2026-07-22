import { cn } from "@/lib/utils";

/** A category's identity mark: its initials in a teal chip. Replaces the generic
 *  stock-icon-per-subject system with a consistent, on-brand monogram. */
function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/);
  const raw = words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2);
  return raw.toUpperCase();
}

export function CategoryBadge({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-lg bg-primary-soft font-display font-extrabold text-primary",
        className,
      )}
    >
      {initialsOf(name)}
    </span>
  );
}
