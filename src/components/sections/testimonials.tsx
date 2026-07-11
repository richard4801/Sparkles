import Image from "next/image";
import { Star, Quotes } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";
import { testimonials } from "@/lib/data";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          weight="fill"
          className={i < rating ? "size-4 text-amber" : "size-4 text-border-strong"}
          aria-hidden
        />
      ))}
    </div>
  );
}

/** Testimonials: quote grid with photo attribution. Layout family: quote grid. */
export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="container-page">
      <SectionHeading
        eyebrow="Loved by students"
        title={<span id="testimonials-heading">Trusted at every stage of the semester</span>}
        description="From first drafts to final submissions, students rely on Sparklyn to move faster."
        align="center"
      />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.id} delay={(i % 3) * 0.06}>
            <figure className="flex h-full flex-col rounded-lg border border-border bg-surface p-6 shadow-[var(--shadow-sm)]">
              <div className="flex items-center justify-between">
                <Stars rating={t.rating} />
                <Quotes weight="fill" className="size-7 text-primary-soft" aria-hidden />
              </div>
              <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-foreground">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <Image
                  src={`https://i.pravatar.cc/96?u=${t.avatarSeed}`}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 rounded-full object-cover"
                />
                <div className="leading-tight">
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.role}, {t.institution}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
