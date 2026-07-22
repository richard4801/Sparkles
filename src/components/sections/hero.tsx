import { MagnifyingGlass, SealCheck, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/motion/reveal";
import { HeroShowcase } from "./hero-visual";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="brand-band relative -mt-16 text-white lg:-mt-[4.5rem]">
      {/* Clipped decorative layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 size-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-1/3 top-1/3 size-56 rounded-full bg-accent-cyan/20 blur-3xl" />
      </div>

      <div className="container-page relative pb-16 pt-28 lg:pb-0 lg:pt-36">
        {/* Left: message + search */}
        <div className="max-w-xl lg:pb-28">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur">
              <SealCheck weight="fill" className="size-3.5 text-accent-lime" aria-hidden />
              Nigeria&apos;s vetted study-resource library
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Find the exact study resource,{" "}
              <span className="text-accent-lime">ready in seconds.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/75">
              Vetted projects, past questions and journals from across Nigeria.
              Preview anything, then buy and download in seconds.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              action="/search"
              method="get"
              role="search"
              className="mt-8 flex max-w-lg items-center gap-2 rounded-full bg-white p-2 pl-5 shadow-[0_18px_40px_rgba(10,40,36,0.28)] ring-1 ring-black/[0.04] transition-shadow focus-within:ring-2 focus-within:ring-accent-lime/70"
            >
              <label htmlFor="hero-search" className="sr-only">
                Search study resources
              </label>
              <MagnifyingGlass
                weight="bold"
                className="size-5 shrink-0 text-primary"
                aria-hidden
              />
              <input
                id="hero-search"
                name="q"
                type="search"
                placeholder="Try 'impact of inflation on SMEs'"
                style={{ outline: "none" }}
                className="h-11 w-full flex-1 bg-transparent text-[0.98rem] text-foreground placeholder:text-faint-foreground"
              />
              <Button
                type="submit"
                variant="accent"
                size="md"
                className="shrink-0 rounded-full px-6"
              >
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

        {/* Right: cutout figure breaking the band (in-flow on mobile, anchored on desktop) */}
        <Reveal
          delay={0.15}
          y={32}
          className="mt-8 lg:absolute lg:-bottom-24 lg:right-0 lg:mt-0 lg:w-[53%]"
        >
          <HeroShowcase />
        </Reveal>
      </div>
    </section>
  );
}
