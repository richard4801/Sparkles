import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

/** Composed empty state for dashboard lists — icon, heading, guidance and an
 *  optional call to action. Keeps every "nothing here yet" moment on-brand. */
export function EmptyState({
  icon: IconCmp,
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  icon: Icon;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong bg-surface-subtle/40 px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-brand-deep text-white shadow-[var(--shadow-sm)]">
        <IconCmp weight="fill" className="size-7" aria-hidden />
      </span>
      <h2 className="mt-5 font-display text-xl font-bold text-foreground">{title}</h2>
      <p className="mt-2 max-w-sm text-muted-foreground">{description}</p>
      {ctaLabel && ctaHref ? (
        <Link
          href={ctaHref}
          className="mt-6 inline-flex items-center gap-1.5 font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          {ctaLabel}
          <ArrowRight weight="bold" className="size-4" aria-hidden />
        </Link>
      ) : null}
    </div>
  );
}
