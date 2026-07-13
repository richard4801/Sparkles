import Image from "next/image";
import type { Review } from "@/types";
import { Stars } from "@/components/stars";
import { ReviewForm } from "./review-form";
import { avatar } from "@/lib/utils";

export function Reviews({
  reviews,
  rating,
  totalReviews,
  resourceId,
  canReview = false,
}: {
  reviews: Review[];
  rating: number;
  totalReviews: number;
  resourceId: string;
  canReview?: boolean;
}) {
  // Distribution across the shown reviews (proxy for the full set).
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));
  const shown = reviews.length || 1;

  return (
    <section aria-labelledby="reviews-heading">
      <h2
        id="reviews-heading"
        className="font-display text-2xl font-extrabold tracking-tight text-foreground"
      >
        Student reviews
      </h2>

      <div className="mt-5 grid gap-6 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-[auto_1fr] sm:gap-10">
        <div className="text-center sm:border-r sm:border-border sm:pr-10">
          <p className="font-display text-5xl font-extrabold text-foreground">
            {rating.toFixed(1)}
          </p>
          <Stars rating={rating} className="mt-2 justify-center" />
          <p className="mt-2 text-sm text-muted-foreground">
            {totalReviews.toLocaleString("en-US")} reviews
          </p>
        </div>
        <ul className="grid content-center gap-2">
          {dist.map((d) => (
            <li key={d.star} className="flex items-center gap-3 text-sm">
              <span className="w-3 tabular-nums text-muted-foreground">{d.star}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface-subtle">
                <span
                  className="block h-full rounded-full bg-amber"
                  style={{ width: `${(d.count / shown) * 100}%` }}
                />
              </span>
              <span className="w-6 text-right tabular-nums text-faint-foreground">
                {d.count}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {reviews.length > 0 ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {reviews.map((r) => (
            <li
              key={r.id}
              className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-xs)]"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={avatar(r.avatarSeed)}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
                <Stars rating={r.rating} size="size-3.5" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {r.body}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-2xl border border-dashed border-border-strong bg-surface-subtle/40 px-5 py-8 text-center text-muted-foreground">
          No reviews yet. Be the first to review this resource after your purchase.
        </p>
      )}

      {canReview ? <ReviewForm resourceId={resourceId} /> : null}
    </section>
  );
}
