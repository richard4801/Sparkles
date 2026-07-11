import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { stats } from "@/lib/data";

/** Platform statistics: a clean metric row, no card boxes, hairline dividers.
 *  Layout family: inline metric strip. */
export function Stats() {
  return (
    <section aria-label="Platform statistics" className="container-page">
      <Reveal>
        <div className="grid grid-cols-2 gap-y-8 rounded-2xl border border-border bg-surface px-6 py-8 shadow-[var(--shadow-sm)] sm:px-10 lg:grid-cols-4 lg:divide-x lg:divide-border">
          {stats.map((s) => {
            const decimals = Number.isInteger(s.value) ? 0 : 1;
            return (
              <div key={s.label} className="px-2 text-center lg:px-6">
                <p className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} decimals={decimals} />
                </p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">
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
