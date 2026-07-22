import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";
import { categories } from "@/lib/data";
import { formatCompact, picsum } from "@/lib/utils";

/** Popular categories: image tiles with a teal wash, name and count. The photo
 *  carries each field; the brand-teal overlay keeps the grid cohesive.
 *  Layout family: image-tile grid. */
export function Categories() {
  return (
    <section aria-labelledby="categories-heading" className="container-page">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          title={<span id="categories-heading">Browse by field</span>}
          description="Every field is stocked with vetted, up-to-date material from across Nigeria."
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
              className="group relative flex aspect-[5/4] flex-col justify-end overflow-hidden rounded-2xl bg-brand-deep shadow-[var(--shadow-sm)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
            >
              <Image
                src={picsum(`sparklyn-field-${c.slug}`, 480, 384)}
                alt=""
                fill
                sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
                className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/55 to-brand-deep/5" />

              <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                <ArrowUpRight weight="bold" className="size-4" aria-hidden />
              </span>

              <div className="relative p-4">
                <h3 className="font-display text-lg font-bold leading-tight text-white">
                  {c.name}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-white/70">
                  {formatCompact(c.resourceCount)} resources
                </p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
