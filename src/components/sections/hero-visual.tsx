"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Users, Star, TrendUp } from "@phosphor-icons/react";
import { avatar, picsum } from "@/lib/utils";

/*
  Hero showcase — a student photo panel that breaks out of the teal brand band,
  with floating glass stat cards overlapping its edges.
  ASSET NOTE: a transparent-background cutout (person only, PNG) would let the
  figure break the frame cleanly like the reference. Until one is provided this
  uses a rounded photo panel that overflows the band, which reads the same way.
*/
export function HeroShowcase() {
  const reduce = useReducedMotion();
  const float = (delay: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -9, 0] },
          transition: {
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[24rem] lg:max-w-none lg:self-end">
      {/* Lime glow disc behind the figure */}
      <div className="absolute -right-2 top-6 size-48 rounded-full bg-accent-lime/30 blur-3xl" />

      {/* Photo panel — overflows the band bottom on desktop (the frame break) */}
      <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[1.75rem] rounded-b-[2.75rem] bg-brand-deep shadow-[var(--shadow-lg)] ring-1 ring-white/20 lg:translate-y-16">
        <Image
          src={picsum("sparklyn-nigerian-student-smiling-laptop", 760, 950)}
          alt="A student browsing study resources"
          fill
          priority
          sizes="(max-width: 1024px) 80vw, 34vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/40 via-transparent to-transparent" />
      </div>

      {/* Floating: students joined */}
      <motion.div
        {...float(0)}
        className="absolute -left-4 top-10 z-20 flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/95 px-3.5 py-2.5 shadow-[var(--shadow-md)] backdrop-blur sm:-left-6"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
          <Users weight="fill" className="size-4" aria-hidden />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-extrabold text-foreground">4,812 students</p>
          <p className="text-[0.7rem] text-muted-foreground">joined this term</p>
        </div>
      </motion.div>

      {/* Floating: rating with avatars */}
      <motion.div
        {...float(0.8)}
        className="absolute -left-3 bottom-24 z-20 flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/95 px-3.5 py-2.5 shadow-[var(--shadow-md)] backdrop-blur lg:bottom-6"
      >
        <div className="flex -space-x-2">
          {["ada", "chidi", "zainab"].map((s) => (
            <Image
              key={s}
              src={avatar(s, 48)}
              alt=""
              width={24}
              height={24}
              className="size-6 rounded-full ring-2 ring-white"
            />
          ))}
        </div>
        <div className="leading-tight">
          <p className="flex items-center gap-1 text-sm font-extrabold text-foreground">
            <Star weight="fill" className="size-3.5 text-amber" aria-hidden />
            4.7
          </p>
          <p className="text-[0.7rem] text-muted-foreground">21,400 reviews</p>
        </div>
      </motion.div>

      {/* Floating: lime downloads stat */}
      <motion.div
        {...float(1.4)}
        className="absolute -right-3 bottom-8 z-20 rounded-2xl bg-accent-lime px-4 py-3 shadow-[0_14px_30px_rgba(191,242,63,0.45)] sm:-right-5 lg:-bottom-2"
      >
        <span className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-wide text-accent-lime-foreground/80">
          <TrendUp weight="bold" className="size-3.5" aria-hidden />
          Downloads
        </span>
        <p className="mt-0.5 font-display text-xl font-extrabold text-accent-lime-foreground">
          128,940
        </p>
      </motion.div>
    </div>
  );
}
