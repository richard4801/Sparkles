import { ChatCircleDots } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/lib/data";

/** FAQ: heading + full-width accordion. Layout family: accordion. */
export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="container-page">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <h2
              id="faq-heading"
              className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            >
              Questions, answered
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Everything you need to know about buying and downloading on Skola.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-xs)]">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <ChatCircleDots weight="fill" className="size-5" aria-hidden />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Still need help?
                </p>
                <p className="text-sm text-muted-foreground">
                  Our team replies within a few hours.
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <a href="/support">Contact</a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <Accordion type="single" collapsible defaultValue="faq-0" className="grid gap-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
