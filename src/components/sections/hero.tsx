import { MagnifyingGlass, Lightning, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { HeroVisual } from "./hero-visual";
import { Button } from "@/components/ui/button";

const popular = ["Mobile banking", "Solar energy", "Cyber security", "SME growth"];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora pointer-events-none absolute inset-0 -z-10" />
      <div className="container-page grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24 lg:pt-20">
        {/* Left: message + search */}
        <div className="max-w-xl">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary">
              <Lightning weight="fill" className="size-3.5" aria-hidden />
              Nigeria&apos;s academic marketplace
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Find the right academic resource,{" "}
              <span className="text-primary">in seconds.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Research projects, past questions and journals from across Nigeria.
              Preview any resource, buy securely, download straight away.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              action="/search"
              method="get"
              role="search"
              className="mt-8 flex flex-col gap-2.5 sm:flex-row"
            >
              <label htmlFor="hero-search" className="sr-only">
                Search academic resources
              </label>
              <div className="flex flex-1 items-center gap-2.5 rounded-full border border-border-strong bg-surface px-4 shadow-[var(--shadow-sm)] transition-colors focus-within:border-primary/50">
                <MagnifyingGlass
                  weight="bold"
                  className="size-5 shrink-0 text-faint-foreground"
                  aria-hidden
                />
                <input
                  id="hero-search"
                  name="q"
                  type="search"
                  placeholder="Try 'impact of inflation on SMEs'"
                  className="h-13 w-full bg-transparent text-[0.98rem] text-foreground placeholder:text-faint-foreground focus:outline-none"
                />
              </div>
              <Button type="submit" size="lg" className="sm:px-8">
                Search
              </Button>
            </form>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {popular.map((p) => (
                <a
                  key={p}
                  href={`/search?q=${encodeURIComponent(p)}`}
                  className="rounded-full border border-border-strong bg-surface px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {p}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <a
              href="/browse"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              Or browse the full library
              <ArrowRight weight="bold" className="size-4" aria-hidden />
            </a>
          </Reveal>
        </div>

        {/* Right: illustration */}
        <Reveal delay={0.15} y={32} className="lg:pl-4">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
