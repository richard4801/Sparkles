import { Star, StarHalf } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

export function Stars({
  rating,
  size = "size-4",
  className,
}: {
  rating: number;
  size?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating > i + 0.25 && rating < i + 1;
        if (half)
          return (
            <StarHalf key={i} weight="fill" className={cn(size, "text-amber")} aria-hidden />
          );
        return (
          <Star
            key={i}
            weight="fill"
            className={cn(size, filled ? "text-amber" : "text-border-strong")}
            aria-hidden
          />
        );
      })}
    </div>
  );
}
