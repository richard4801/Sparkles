import type { Metadata } from "next";
import Link from "next/link";
import { Check, CreditCard, Package } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Sparklyn has no subscription. Pay once per resource — priced fairly, previewable before you buy, and yours to download instantly.",
};

const howYouPay = [
  "No subscription, ever — pay only for what you download",
  "Prices are per resource, typically ₦1,500 – ₦9,000",
  "Preview the abstract, contents and reviews before paying",
  "Pay with card, bank transfer or USSD via Paystack & Flutterwave",
  "The price you see is the price you pay — no hidden charges",
];

const whatYouGet = [
  "The full resource as a downloadable file",
  "Instant access the moment payment clears",
  "A printable receipt and full download history",
  "It stays in your dashboard — re-download anytime",
  "Genuine student reviews to guide every purchase",
];

export default function PricingPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Pricing"
        title="Simple, honest pricing"
        subtitle="No monthly fees and no lock-in. Every resource in the Sparklyn library is a one-time purchase, priced fairly for students."
      />

      <section className="container-page py-14 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow-xs)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
            <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-brand-deep text-white shadow-[var(--shadow-sm)]">
              <CreditCard weight="fill" className="size-6" aria-hidden />
            </span>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-foreground">
              How you pay
            </h2>
            <p className="mt-5 font-display text-4xl font-extrabold text-foreground">
              Pay per resource
            </p>
            <ul className="mt-6 grid gap-3">
              {howYouPay.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check weight="bold" className="mt-0.5 size-4 shrink-0 text-emerald" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-primary/30 bg-primary-tint p-8 shadow-[var(--shadow-sm)]">
            <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Package weight="fill" className="size-6" aria-hidden />
            </span>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-foreground">
              What&apos;s included
            </h2>
            <p className="mt-5 font-display text-4xl font-extrabold text-foreground">
              Every purchase
            </p>
            <ul className="mt-6 grid gap-3">
              {whatYouGet.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check weight="bold" className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <Link href="/browse">Browse the library</Link>
          </Button>
          <p className="mx-auto mt-6 max-w-2xl text-sm text-muted-foreground">
            See our{" "}
            <Link href="/refunds" className="font-medium text-primary hover:underline">
              refund policy
            </Link>{" "}
            for how returns work.
          </p>
        </div>
      </section>
    </main>
  );
}
