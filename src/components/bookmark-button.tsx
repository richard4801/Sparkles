"use client";

import * as React from "react";
import { Heart } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function BookmarkButton({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const [saved, setSaved] = React.useState(false);
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
      onClick={() => setSaved((v) => !v)}
      className={cn(
        "grid size-9 place-items-center rounded-full bg-surface/90 text-muted-foreground shadow-[var(--shadow-sm)] backdrop-blur transition-all hover:text-rose active:scale-90",
        saved && "text-rose",
        className,
      )}
    >
      <Heart weight={saved ? "fill" : "bold"} className="size-[1.1rem]" aria-hidden />
    </button>
  );
}
