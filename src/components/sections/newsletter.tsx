import { PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { NewsletterForm } from "./newsletter-form";

const perks = ["New resources weekly", "Exam-season guides", "No spam, unsubscribe anytime"];

/** Newsletter: full-width gradient CTA band. Layout family: CTA band. */
export function Newsletter() {
  return (
    <section className="container-page">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-[#7a58f7] to-[#8b6bff] px-6 py-12 shadow-[var(--shadow-lg)] sm:px-12 lg:py-16">
          <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 size-64 rounded-full bg-accent-blue/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              <PaperPlaneTilt weight="fill" className="size-3.5" aria-hidden />
              Newsletter
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Get ahead every semester
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-white/85">
              Join thousands of students getting new resources and study guides
              in their inbox.
            </p>

            <NewsletterForm />

            <ul className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {perks.map((p) => (
                <li key={p} className="inline-flex items-center gap-1.5 text-sm text-white/80">
                  <CheckCircle weight="fill" className="size-4 text-white" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
