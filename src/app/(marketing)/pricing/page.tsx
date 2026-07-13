import type { Metadata } from "next";
import Link from "next/link";
import { Check, CreditCard, Storefront, Lightning } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Sparklyn has no subscription. Pay once per resource, priced by its author. Selling? Keep the majority of every sale.",
};

const buyerPoints = [
  "No subscription, ever — pay only for what you download",
  "Prices set per resource, typically ₦1,500 – ₦9,000",
  "Preview the abstract, contents and reviews before paying",
  "Instant download and a receipt the moment payment clears",
  "Pay with card, bank transfer or USSD via Paystack & Flutterwave",
];

const sellerPoints = [
  "List your own projects, past questions and papers for free",
  "Set your own price — you decide what your work is worth",
  "Keep the majority of every sale; a small platform fee covers payments & hosting",
  "Withdraw earnings to your Nigerian bank account",
  "Reach students across every university and polytechnic",
];

export default function PricingPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Pricing"
        title="Simple, honest pricing"
        subtitle="No monthly fees and no lock-in. You pay per resource, and every price is set by the person who made it."
      />

      <section className="container-page py-14 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Buyers */}
          <div className="rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow-xs)]">
            <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary">
              <CreditCard weight="fill" className="size-6" aria-hidden />
            </span>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-foreground">
              For students
            </h2>
            <p className="mt-1 text-muted-foreground">Buy what you need, when you need it.</p>
            <p className="mt-5 font-display text-4xl font-extrabold text-foreground">
              Pay per resource
            </p>
            <ul className="mt-6 grid gap-3">
              {buyerPoints.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check weight="bold" className="mt-0.5 size-4 shrink-0 text-emerald" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8 w-full">
              <Link href="/browse">Browse resources</Link>
            </Button>
          </div>

          {/* Sellers */}
          <div className="rounded-2xl border-2 border-primary/30 bg-primary-tint p-8 shadow-[var(--shadow-sm)]">
            <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Storefront weight="fill" className="size-6" aria-hidden />
            </span>
            <h2 className="mt-4 font-display text-2xl font-extrabold text-foreground">
              For sellers
            </h2>
            <p className="mt-1 text-muted-foreground">Earn from work you&apos;ve already done.</p>
            <p className="mt-5 inline-flex items-center gap-2 font-display text-4xl font-extrabold text-foreground">
              <Lightning weight="fill" className="size-8 text-primary" aria-hidden />
              Free to list
            </p>
            <ul className="mt-6 grid gap-3">
              {sellerPoints.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check weight="bold" className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8 w-full">
              <Link href="/register">Start selling</Link>
            </Button>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Prices shown across the marketplace are what you pay — no hidden charges at checkout.
          See our <Link href="/refunds" className="font-medium text-primary hover:underline">refund policy</Link> for
          how returns work.
        </p>
      </section>
    </main>
  );
}
