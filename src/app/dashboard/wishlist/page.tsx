import type { Metadata } from "next";
import Link from "next/link";
import { Heart, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { resources } from "@/lib/data";
import { dashStats } from "@/lib/dashboard-data";
import { DashPageHeader } from "@/components/dashboard/page-header";
import { ResourceCard } from "@/components/resource-card";

export const metadata: Metadata = { title: "Wishlist" };

// Mock wishlist selection until the backend tracks saved items (Phase 4).
const wishlist = resources.slice(2, 2 + 5);

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <DashPageHeader
        title="Wishlist"
        description={`${dashStats.wishlist} resources saved for later.`}
      />

      {wishlist.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong bg-surface-subtle/40 px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary">
            <Heart weight="duotone" className="size-7" aria-hidden />
          </span>
          <h2 className="mt-5 font-display text-xl font-bold text-foreground">
            Your wishlist is empty
          </h2>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Tap the heart on any resource to save it here for later.
          </p>
          <Link
            href="/browse"
            className="mt-6 inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary-hover"
          >
            Browse resources
            <ArrowRight weight="bold" className="size-4" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}
