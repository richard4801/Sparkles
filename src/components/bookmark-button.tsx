"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Heart } from "@phosphor-icons/react";
import { toggleWishlist } from "@/lib/wishlist-actions";
import { cn } from "@/lib/utils";

export function BookmarkButton({
  resourceId,
  title,
  initialSaved = false,
  className,
}: {
  resourceId: string;
  title: string;
  initialSaved?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [saved, setSaved] = React.useState(initialSaved);
  const [pending, startTransition] = React.useTransition();

  function onClick() {
    const next = !saved;
    setSaved(next); // optimistic
    startTransition(async () => {
      const res = await toggleWishlist(resourceId);
      if (res.needsAuth) {
        setSaved(false);
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        return;
      }
      if (!res.ok) setSaved(!next); // revert on failure
      else setSaved(Boolean(res.saved));
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
      className={cn(
        "grid size-9 place-items-center rounded-full bg-surface/90 text-muted-foreground shadow-[var(--shadow-sm)] backdrop-blur transition-all hover:text-rose active:scale-90 disabled:opacity-60",
        saved && "text-rose",
        className,
      )}
    >
      <Heart weight={saved ? "fill" : "bold"} className="size-[1.1rem]" aria-hidden />
    </button>
  );
}
