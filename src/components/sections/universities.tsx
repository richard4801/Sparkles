import { Reveal } from "@/components/motion/reveal";
import { universities } from "@/lib/data";

/*
  Featured universities: a continuous marquee strip (the only marquee on the
  page). Real institution logos are not available offline, so each mark is a
  clean monogram of the short name. ASSET TODO: swap monograms for official
  crest SVGs when brand assets are provided.
*/
function UniChip({ shortName, name }: { shortName: string; name: string }) {
  return (
    <div
      className="flex shrink-0 items-center gap-3 rounded-full border border-border bg-surface py-2 pl-2 pr-5 shadow-[var(--shadow-sm)]"
      title={name}
    >
      <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-primary to-brand-deep font-display text-[0.7rem] font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
        {shortName.slice(0, 3)}
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
              shortName={u.shortName}
              name={u.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
