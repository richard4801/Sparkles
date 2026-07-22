"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Users, Star, TrendUp } from "@phosphor-icons/react";
import { avatar } from "@/lib/utils";

/*
  Hero showcase — the student cutout that breaks out of the teal band, with
  frosted-glass stat cards floating over its edges.
  ASSET: /hero-student.png is a transparent-background PNG (person + chair).
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
    <div className="relative mx-auto h-[26rem] w-full max-w-[26rem] sm:h-[30rem] lg:h-[48rem] lg:max-w-none">
      {/* Lime glow behind the figure */}
      <div className="absolute inset-x-8 bottom-16 top-20 rounded-[50%] bg-accent-lime/25 blur-3xl" />

      {/* The cutout — sits at the bottom of the box so the feet reach the edge */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/hero-student.png"
          alt="A student smiling while reading a study resource on a laptop"
          fill
          priority
          sizes="(max-width: 1024px) 80vw, 42vw"
          className="object-contain object-bottom"
        />
      </div>

      {/* Glass: students joined (top-left) */}
      <motion.div
        {...float(0)}
        className="absolute left-0 top-8 z-20 flex items-center gap-2.5 rounded-2xl border border-white/25 bg-white/15 px-3.5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_30px_rgba(10,40,36,0.25)] backdrop-blur-xl sm:top-12"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-accent-lime text-accent-lime-foreground">
          <Users weight="fill" className="size-4" aria-hidden />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-extrabold text-white">4,812</p>
          <p className="text-[0.7rem] text-white/70">students this term</p>
        </div>
      </motion.div>

      {/* Glass: rating with avatars (lower-left) */}
      <motion.div
        {...float(0.9)}
        className="absolute -left-2 bottom-16 z-20 flex items-center gap-2.5 rounded-2xl border border-white/25 bg-white/15 px-3.5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_30px_rgba(10,40,36,0.25)] backdrop-blur-xl lg:bottom-24"
      >
        <div className="flex -space-x-2">
          {["ada", "chidi", "zainab"].map((s) => (
            <Image
              key={s}
              src={avatar(s, 48)}
              alt=""
              width={24}
              height={24}
              className="size-6 rounded-full ring-2 ring-white/60"
            />
          ))}
        </div>
        <div className="leading-tight">
          <p className="flex items-center gap-1 text-sm font-extrabold text-white">
            <Star weight="fill" className="size-3.5 text-accent-lime" aria-hidden />
            4.7
          </p>
          <p className="text-[0.7rem] text-white/70">21,400 reviews</p>
        </div>
      </motion.div>

      {/* Lime solid: downloads (right) */}
      <motion.div
        {...float(1.4)}
        className="absolute -right-1 bottom-28 z-20 rounded-2xl bg-accent-lime px-4 py-3 shadow-[0_14px_30px_rgba(191,242,63,0.45)] lg:bottom-36"
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
