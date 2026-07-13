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
    "Find, preview, pay and download vetted academic resources on Sparklyn in four simple steps.",
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
    body: "Check out with Paystack or Flutterwave — card, bank transfer or USSD. One-time payment, no subscription, instant confirmation.",
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
        subtitle="Sparklyn cuts out the endless WhatsApp groups and photocopy shops. Everything vetted, previewable and one payment away."
      />

      <section className="container-page py-14 lg:py-20">
        <ol className="grid gap-6 sm:grid-cols-2">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-xs)]"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary">
                  <s.icon weight="fill" className="size-6" aria-hidden />
                </span>
                <span className="font-display text-sm font-bold text-faint-foreground">
                  Step {i + 1}
                </span>
              </div>
              <h2 className="mt-4 font-display text-xl font-bold text-foreground">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
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
