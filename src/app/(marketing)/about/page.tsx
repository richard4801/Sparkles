import type { Metadata } from "next";
import Link from "next/link";
import { Target, Users, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sparklyn is a vetted academic marketplace built to help Nigerian students find quality study resources quickly and support the students who create them.",
};

const values = [
  {
    icon: Target,
    title: "Access, not gatekeeping",
    body: "Quality study material shouldn't hide in closed WhatsApp groups. We make it searchable, previewable and fairly priced.",
  },
  {
    icon: Users,
    title: "Students first",
    body: "Built for the realities of Nigerian campuses — the courses, the institutions, the payment methods students actually use.",
  },
  {
    icon: ShieldCheck,
    title: "Trust by default",
    body: "Every resource carries genuine reviews and a clear preview, so what you pay for is what you get.",
  },
];

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About us"
        title="Helping Nigerian students learn faster"
        subtitle="Sparklyn is a curated library of vetted academic resources — quality research projects, past questions and study material, all in one place."
      />

      <section className="container-page py-14 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-extrabold text-foreground">Why we built Sparklyn</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Finding good project references, past questions or seminar papers in Nigeria
            usually means trawling group chats, paying for photocopies sight-unseen, or
            starting from scratch. Quality material is scattered, hard to judge before you
            pay, and often never reaches the students who need it.
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Sparklyn fixes that. We build and curate a single, vetted library of academic
            resources so students can search, preview and download exactly what they need in
            minutes — everything reviewed for quality, fairly priced, with secure local
            payments and instant delivery.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-xs)]"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary">
                <v.icon weight="fill" className="size-6" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-center">
          <Button asChild size="lg">
            <Link href="/browse">Browse resources</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
