import type { Metadata } from "next";
import Link from "next/link";
import {
  Books,
  Exam,
  Presentation,
  ChartLineUp,
  Sparkle,
  Storefront,
} from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "What Sparklyn offers Nigerian students — vetted research projects, past questions, seminar papers, journals, business plans and an AI study assistant.",
};

const services = [
  {
    icon: Books,
    title: "Research projects & theses",
    body: "Complete, well-structured final-year projects across faculties — for reference, formatting and inspiration.",
  },
  {
    icon: Exam,
    title: "Past questions & answers",
    body: "Curated exam past questions by course and level to help you revise what actually gets tested.",
  },
  {
    icon: Presentation,
    title: "Seminar papers & journals",
    body: "Presentation-ready seminar papers and peer-style journals for coursework and literature reviews.",
  },
  {
    icon: ChartLineUp,
    title: "Business plans & feasibility studies",
    body: "Practical, Nigeria-focused business plans and feasibility studies for entrepreneurship courses and real ventures.",
  },
  {
    icon: Sparkle,
    title: "AI Study Assistant",
    body: "Ask in plain language and get pointed to the most relevant resources in the catalogue instantly.",
  },
  {
    icon: Storefront,
    title: "Sell your own work",
    body: "Turn the resources you've written into income — list them, set your price and earn on every sale.",
  },
];

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Services"
        title="Everything you need to study, in one place"
        subtitle="A vetted marketplace of academic resources built specifically for Nigerian universities and polytechnics."
      />

      <section className="container-page py-14 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-xs)] transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[var(--shadow-sm)]"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary">
                <s.icon weight="fill" className="size-6" aria-hidden />
              </span>
              <h2 className="mt-4 font-display text-lg font-bold text-foreground">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <Link href="/browse">Explore the marketplace</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
