import { MagnifyingGlass, SealCheck, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { HeroShowcase } from "./hero-visual";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative px-4 pb-16 pt-6 lg:px-8 lg:pb-28 lg:pt-10">
      <div className="mx-auto max-w-[80rem]">
        <div className="brand-band relative rounded-[2.25rem] px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
          {/* Clipped decorative layer (keeps blobs inside the rounded band) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.25rem]">
            <div className="absolute -left-16 -top-16 size-64 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute right-1/3 top-1/2 size-48 rounded-full bg-accent-cyan/20 blur-3xl" />
          </div>

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
            {/* Left: message + search */}
            <div className="max-w-xl">
              <Reveal>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur">
                  <SealCheck weight="fill" className="size-3.5 text-accent-lime" aria-hidden />
                  Nigeria&apos;s vetted study-resource library
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
                  Find the exact study resource,{" "}
                  <span className="text-accent-lime">ready in seconds.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75">
                  Vetted projects, past questions and journals from across Nigeria.
                  Preview anything, then buy and download in seconds.
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
                    Search study resources
                  </label>
                  <div className="flex flex-1 items-center gap-2.5 rounded-full bg-white px-4 shadow-[var(--shadow-md)]">
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
                  <Button type="submit" variant="accent" size="lg" className="sm:px-8">
                    Search
                  </Button>
                </form>
              </Reveal>

              <Reveal delay={0.2}>
                <a
                  href="/browse"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 transition-colors hover:text-accent-lime"
                >
                  Browse the full library
                  <ArrowRight weight="bold" className="size-4" aria-hidden />
                </a>
              </Reveal>
            </div>

            {/* Right: frame-breaking showcase */}
            <Reveal delay={0.15} y={32}>
              <HeroShowcase />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
