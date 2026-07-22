import { Reveal } from "@/components/motion/reveal";
import { universities } from "@/lib/data";

/*
  Featured universities: a continuous marquee strip (the only marquee on the
  page). Official crests are trademarked and unavailable offline, so each school
  gets a distinct emblem — its own colour plus a compact monogram — rather than
  a blank or identical chip. ASSET TODO: swap the emblem for the official crest
  SVG per school when brand assets are provided (drop into public/crests/).
*/
const emblem: Record<string, { code: string; color: string }> = {
  "university-of-lagos": { code: "UL", color: "#1d4ed8" },
  "university-of-ibadan": { code: "UI", color: "#7f1d1d" },
  "ahmadu-bello-university": { code: "AB", color: "#14532d" },
  "university-of-nigeria-nsukka": { code: "UN", color: "#3730a3" },
  "obafemi-awolowo-university": { code: "OAU", color: "#9a3412" },
  "covenant-university": { code: "CU", color: "#991b1b" },
  "university-of-benin": { code: "UB", color: "#166534" },
  "federal-university-of-technology-akure": { code: "FT", color: "#0e7490" },
};

function UniChip({
  slug,
  shortName,
  name,
}: {
  slug: string;
  shortName: string;
  name: string;
}) {
  const e = emblem[slug] ?? { code: shortName.slice(0, 2).toUpperCase(), color: "#0f766e" };
  return (
    <div
      className="flex shrink-0 items-center gap-3 rounded-full border border-border bg-surface py-2 pl-2 pr-5 shadow-[var(--shadow-sm)]"
      title={name}
    >
      <span
        className="grid size-10 place-items-center rounded-full font-display text-[0.62rem] font-extrabold uppercase leading-none text-white ring-[3px] ring-inset ring-white/25"
        style={{ backgroundColor: e.color }}
      >
        {e.code}
      </span>
      <span className="whitespace-nowrap font-display text-sm font-bold text-foreground">
        {shortName}
      </span>
    </div>
  );
}

export function Universities() {
  const row = [...universities, ...universities];
  return (
    <section aria-labelledby="universities-heading" className="container-page">
      <Reveal className="text-center">
        <h2
          id="universities-heading"
          className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl"
        >
          Material from Nigeria&apos;s leading institutions
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Resources sourced and vetted across 148 universities and polytechnics.
        </p>
      </Reveal>

      <div
        className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
        aria-label="Featured universities"
      >
        <div className="flex w-max animate-marquee gap-4">
          {row.map((u, i) => (
            <UniChip
              key={`${u.slug}-${i}`}
              slug={u.slug}
              shortName={u.shortName}
              name={u.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
