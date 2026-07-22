import type { Metadata } from "next";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import { requireUser } from "@/lib/require-user";
import { getWishlist } from "@/db/queries";
import { DashPageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { ResourceCard } from "@/components/resource-card";

export const metadata: Metadata = { title: "Wishlist" };

export default async function WishlistPage() {
  const user = await requireUser();
  const wishlist = await getWishlist(user.id);
  return (
    <div className="mx-auto max-w-6xl">
      <DashPageHeader
        title="Wishlist"
        description={`${wishlist.length} resources saved for later.`}
      />

      {wishlist.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((r) => (
            <ResourceCard key={r.id} resource={r} savedInWishlist />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Tap the heart on any resource to save it here for later."
          ctaLabel="Browse resources"
          ctaHref="/browse"
        />
      )}
    </div>
  );
}
