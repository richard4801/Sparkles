import { TrendUp } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";
import { ResourceCard } from "@/components/resource-card";
import { trendingResources } from "@/lib/data";

/** Trending resources: horizontal scroll-snap carousel. Layout family: carousel. */
export function Trending() {
  return (
    <section aria-labelledby="trending-heading" className="overflow-hidden">
      <div className="container-page">
        <SectionHeading
          eyebrow="Trending now"
          title={<span id="trending-heading">What students are downloading</span>}
          description="The most-purchased resources across the platform this week."
        />
      </div>

      <Reveal className="mt-10">
        <div className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 lg:px-[max(2rem,calc((100%-80rem)/2+2rem))]">
          {trendingResources.map((r) => (
            <div
              key={r.id}
              className="w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-[23rem]"
            >
              <ResourceCard resource={r} />
            </div>
          ))}
          <div className="flex w-[80%] shrink-0 snap-start items-center justify-center sm:w-[46%] lg:w-[23rem]">
            <a
              href="/browse?sort=trending"
              className="group flex size-full min-h-[18rem] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border-strong bg-surface-subtle/50 text-center transition-colors hover:border-primary/40 hover:bg-primary-tint"
            >
              <span className="grid size-12 place-items-center rounded-full bg-primary-soft text-primary transition-transform group-hover:scale-105">
                <TrendUp weight="bold" className="size-6" aria-hidden />
              </span>
              <span className="font-display font-bold text-foreground">
                See all trending
              </span>
              <span className="max-w-[12rem] text-sm text-muted-foreground">
                Ranked by real purchases and downloads
              </span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
