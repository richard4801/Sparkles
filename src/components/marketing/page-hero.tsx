import { Reveal } from "@/components/motion/reveal";

/** Shared hero band for content pages — keeps titling consistent across the
 *  marketing surface. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="brand-band relative -mt-16 overflow-hidden text-white lg:-mt-[4.5rem]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 size-80 rounded-full bg-accent-lime/10 blur-3xl" />
        <div className="absolute -bottom-28 left-1/4 size-80 rounded-full bg-accent-cyan/15 blur-3xl" />
      </div>
      <div className="container-page relative pb-16 pt-28 lg:pb-24 lg:pt-36">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            {eyebrow ? (
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent-lime">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
                {subtitle}
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Simple prose wrapper for legal / long-form pages. */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-page py-12 lg:py-16">
      <div className="mx-auto max-w-3xl [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2:first-child]:mt-0 [&_p]:mt-3 [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1.5 [&_li]:text-muted-foreground [&_a]:font-medium [&_a]:text-primary hover:[&_a]:underline">
        {children}
      </div>
    </div>
  );
}
