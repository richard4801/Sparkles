import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { stats } from "@/lib/data";

/** Platform statistics: a clean metric row, no card boxes, hairline dividers.
 *  Layout family: inline metric strip. */
export function Stats() {
  return (
    <section
      aria-label="Platform statistics"
      className="container-page relative z-[5] lg:-mt-28"
    >
      <Reveal>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-6 rounded-2xl border border-border bg-surface px-6 py-6 shadow-[0_24px_60px_-12px_rgba(10,60,54,0.22)] sm:px-8 lg:grid-cols-4 lg:divide-x lg:divide-border">
          {stats.map((s) => {
            const decimals = Number.isInteger(s.value) ? 0 : 1;
            return (
              <div key={s.label} className="px-2 text-center lg:px-6">
                <p className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} decimals={decimals} />
                </p>
                <p className="mt-1.5 text-sm font-medium text-muted-foreground">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
