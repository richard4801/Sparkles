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
    <section className="border-b border-border bg-surface-subtle/50">
      <div className="container-page py-14 lg:py-20">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            {eyebrow ? (
              <p className="text-sm font-bold uppercase tracking-wider text-primary">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
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
