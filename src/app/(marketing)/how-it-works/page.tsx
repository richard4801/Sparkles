import type { Metadata } from "next";
import Link from "next/link";
import {
  MagnifyingGlass,
  Eye,
  CreditCard,
  DownloadSimple,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Find, preview, pay and download vetted academic resources on Skola in four simple steps.",
};

const steps = [
  {
    icon: MagnifyingGlass,
    title: "Search the catalogue",
    body: "Filter by course, department, institution, level or type — or ask the Study Assistant in plain language and let it surface the closest matches.",
  },
  {
    icon: Eye,
    title: "Preview before you pay",
    body: "Every resource shows its abstract, full table of contents, page count, rating and genuine student reviews, so you know exactly what you're getting.",
  },
  {
    icon: CreditCard,
    title: "Pay securely",
    body: "Check out with Paystack — card, bank transfer or USSD. One-time payment, no subscription, instant confirmation.",
  },
  {
    icon: DownloadSimple,
    title: "Download instantly",
    body: "The resource is available in your dashboard the moment payment clears, with a printable receipt and your full download history.",
  },
];

export default function HowItWorksPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="How it works"
        title="From search to download in minutes"
        subtitle="Skola cuts out the endless WhatsApp groups and photocopy shops. Everything vetted, previewable and one payment away."
      />

      <section className="container-page py-16 lg:py-24">
        <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* connecting rail on desktop */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-8 right-8 top-8 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block"
          />
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <div className="relative z-10 grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-brand-deep text-white shadow-[var(--shadow-md)]">
                <s.icon weight="fill" className="size-7" aria-hidden />
                <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-accent-lime text-[0.7rem] font-extrabold text-accent-lime-foreground ring-4 ring-background">
                  {i + 1}
                </span>
              </div>
              <h2 className="mt-5 font-display text-lg font-bold text-foreground">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface-subtle p-6">
          <div className="flex items-center gap-3">
            <Star weight="fill" className="size-6 text-amber" aria-hidden />
            <p className="font-medium text-foreground">
              Every resource is reviewed by real buyers — quality you can trust.
            </p>
          </div>
          <Button asChild size="md">
            <Link href="/browse">Browse resources</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
