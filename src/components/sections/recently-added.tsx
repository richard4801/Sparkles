import { Clock, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";
import { ResourceCard } from "@/components/resource-card";
import { recentResources } from "@/lib/data";

/** Recently added materials: responsive card grid. Layout family: card grid. */
export function RecentlyAdded() {
  return (
    <section aria-labelledby="recent-heading" className="container-page">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          title={
            <span id="recent-heading" className="inline-flex items-center gap-2.5">
              Fresh on Sparklyn
            </span>
          }
          description="New material is vetted and published every day. Here is the latest."
        />
        <Reveal>
          <a
            href="/browse?sort=newest"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            View newest
            <ArrowRight weight="bold" className="size-4" aria-hidden />
          </a>
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {recentResources.slice(0, 8).map((r, i) => (
          <Reveal key={r.id} delay={(i % 4) * 0.05}>
            <div className="relative">
              {r.addedDaysAgo <= 3 ? (
                <span className="absolute -top-2 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-emerald px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white shadow-[var(--shadow-sm)]">
                  <Clock weight="fill" className="size-3" aria-hidden />
                  New
                </span>
              ) : null}
              <ResourceCard resource={r} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
