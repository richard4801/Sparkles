import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";
import { CategoryIcon } from "@/components/category-icon";
import { categories } from "@/lib/data";
import { cn, formatCompact } from "@/lib/utils";

const accentBg: Record<string, string> = {
  violet: "bg-violet/10 text-violet",
  blue: "bg-blue/10 text-blue",
  emerald: "bg-emerald/10 text-emerald",
  amber: "bg-amber/10 text-amber",
  rose: "bg-rose/10 text-rose",
  cyan: "bg-cyan/10 text-cyan",
};

/** Popular categories: tile grid with iconography. Layout family: icon-tile grid. */
export function Categories() {
  return (
    <section aria-labelledby="categories-heading" className="container-page">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          title={<span id="categories-heading">Browse by category</span>}
          description="Jump straight to your field. Every category is stocked with vetted, up-to-date material."
        />
        <Reveal>
          <a
            href="/browse"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            All categories
            <ArrowRight weight="bold" className="size-4" aria-hidden />
          </a>
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 4) * 0.05}>
            <a
              href={`/browse?category=${c.slug}`}
              className="group flex h-full items-center gap-4 rounded-lg border border-border bg-surface p-4 shadow-[var(--shadow-xs)] transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[var(--shadow-md)]"
            >
              <span
                className={cn(
                  "grid size-12 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-105",
                  accentBg[c.accent],
                )}
              >
                <CategoryIcon name={c.iconName} className="size-6" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display font-bold text-foreground group-hover:text-primary">
                  {c.name}
                </span>
                <span className="block text-sm text-muted-foreground">
                  {formatCompact(c.resourceCount)} resources
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
