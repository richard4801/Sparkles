import type { Metadata } from "next";
import { requireUser } from "@/lib/require-user";
import { simulateMode } from "@/lib/payments";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  const user = await requireUser();
  return (
    <main id="main" className="container-page py-8 lg:py-12">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Checkout
      </h1>
      <div className="mt-8">
        <CheckoutForm email={user.email ?? ""} simulate={simulateMode()} />
      </div>
    </main>
  );
}
