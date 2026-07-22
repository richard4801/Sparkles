import type { Metadata } from "next";
import { requireUser } from "@/lib/require-user";
import { simulateMode } from "@/lib/payments";
import { getResourceById } from "@/db/queries";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import type { CartItem } from "@/lib/cart";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ buy?: string }>;
}) {
  const user = await requireUser();
  const { buy } = await searchParams;

  // "Buy now": checkout a single resource directly, bypassing the cart.
  let buyNow: CartItem | null = null;
  if (buy) {
    const r = await getResourceById(buy);
    if (r) {
      buyNow = {
        id: r.id,
        title: r.title,
        priceNaira: r.priceNaira,
        thumbnailSeed: r.thumbnailSeed,
        type: r.type,
      };
    }
  }

  return (
    <main id="main" className="container-page py-8 lg:py-12">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Checkout
      </h1>
      <div className="mt-8">
        <CheckoutForm
          email={user.email ?? ""}
          simulate={simulateMode()}
          buyNow={buyNow}
        />
      </div>
    </main>
  );
}
