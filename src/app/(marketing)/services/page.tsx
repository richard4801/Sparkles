import type { Metadata } from "next";
import Link from "next/link";
import {
  Books,
  Exam,
  Presentation,
  ChartLineUp,
  Sparkle,
  SealCheck,
} from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "What Skola offers Nigerian students — vetted research projects, past questions, seminar papers, journals, business plans and an AI study assistant.",
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
    icon: SealCheck,
    title: "Vetted for quality",
    body: "Every resource in the catalogue is reviewed and curated by the Skola team before it goes live — so you can trust what you download.",
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

      <section className="container-page py-16 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-xs)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-md)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-1 top-1 font-display text-7xl font-extrabold leading-none text-primary/[0.06]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-brand-deep text-white shadow-[var(--shadow-sm)]">
                <s.icon weight="fill" className="size-6" aria-hidden />
              </span>
              <h2 className="relative mt-4 font-display text-lg font-bold text-foreground">{s.title}</h2>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="accent" size="lg">
            <Link href="/browse">Explore the marketplace</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
