"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Star, DownloadSimple, SealCheck } from "@phosphor-icons/react";
import { picsum } from "@/lib/utils";

/*
  Hero illustration.
  --------------------------------------------------------------------------
  Brief calls for a 3D render (stacked books, graduation cap, rolled diploma,
  plant) on a soft lavender gradient with abstract layered shapes.
  ASSET TODO: replace the <Image> below with the final 3D illustration export
  (transparent PNG/WebP, ~1200x1200). The lavender gradient, layered abstract
  shapes and floating accents are built here and can stay.
*/
export function HeroVisual() {
  const reduce = useReducedMotion();
  const float = (delay: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -10, 0] },
          transition: {
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem] lg:max-w-none">
      {/* Soft lavender gradient ground */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#efeaff] via-[#f3eeff] to-[#e7efff]" />

      {/* Abstract layered shapes */}
      <div className="absolute -left-6 top-10 size-40 rounded-[2rem] bg-primary/15 blur-2xl" />
      <div className="absolute bottom-6 right-2 size-48 rounded-full bg-accent-blue/15 blur-3xl" />
      <div className="absolute right-10 top-6 size-24 rotate-12 rounded-[1.5rem] border border-primary/20 bg-white/40" />
      <div className="absolute bottom-10 left-8 size-16 -rotate-6 rounded-2xl border border-accent-blue/20 bg-white/40" />

      {/* Focal academic image (placeholder for the 3D render) */}
      <div className="absolute inset-6 overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lg)]">
        <Image
          src={picsum("sparklyn-stacked-books-graduation", 900, 900)}
          alt="Stacked academic books with a graduation cap"
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 40vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
      </div>

      {/* Floating accent: rating */}
      <motion.div
        {...float(0)}
        className="absolute -left-3 top-1/3 flex items-center gap-2 rounded-2xl border border-border bg-surface/95 px-3.5 py-2.5 shadow-[var(--shadow-md)] backdrop-blur"
      >
        <span className="grid size-8 place-items-center rounded-xl bg-amber/15 text-amber">
          <Star weight="fill" className="size-4" aria-hidden />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-foreground">4.7 average</p>
          <p className="text-[0.7rem] text-muted-foreground">from 21,400 reviews</p>
        </div>
      </motion.div>

      {/* Floating accent: downloads */}
      <motion.div
        {...float(1.2)}
        className="absolute -right-3 bottom-16 flex items-center gap-2 rounded-2xl border border-border bg-surface/95 px-3.5 py-2.5 shadow-[var(--shadow-md)] backdrop-blur"
      >
        <span className="grid size-8 place-items-center rounded-xl bg-emerald/15 text-emerald">
          <DownloadSimple weight="bold" className="size-4" aria-hidden />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-foreground">Instant download</p>
          <p className="text-[0.7rem] text-muted-foreground">right after checkout</p>
        </div>
      </motion.div>

      {/* Floating accent: verified */}
      <motion.div
        {...float(0.6)}
        className="absolute right-8 top-2 flex items-center gap-1.5 rounded-full border border-border bg-surface/95 px-3 py-1.5 shadow-[var(--shadow-sm)] backdrop-blur"
      >
        <SealCheck weight="fill" className="size-4 text-primary" aria-hidden />
        <span className="text-xs font-semibold text-foreground">Vetted</span>
      </motion.div>
    </div>
  );
}
