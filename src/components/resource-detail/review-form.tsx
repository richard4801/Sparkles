"use client";

import * as React from "react";
import { Star, CheckCircle, Warning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { submitReview } from "@/lib/review-actions";
import { cn } from "@/lib/utils";

const areaClass =
  "w-full rounded-[var(--radius-sm)] border border-border-strong bg-surface px-4 py-3 text-sm text-foreground shadow-[var(--shadow-xs)] focus-visible:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function ReviewForm({ resourceId }: { resourceId: string }) {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [body, setBody] = React.useState("");
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (rating < 1) {
      setError("Pick a star rating.");
      return;
    }
    startTransition(async () => {
      const res = await submitReview(resourceId, rating, body);
      if (res.ok) setDone(true);
      else setError(res.error ?? "Could not post your review.");
    });
  }

  if (done) {
    return (
      <div className="mt-6 flex items-center gap-2 rounded-2xl border border-border bg-[#e6f7ef] px-5 py-4 text-sm font-medium text-emerald">
        <CheckCircle weight="fill" className="size-5 shrink-0" aria-hidden />
        Thanks for your review — it&apos;s now live on this page.
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-xs)]"
    >
      <p className="font-display font-bold text-foreground">Write a review</p>
      <div className="mt-3 flex items-center gap-1" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={rating === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(n)}
            className="p-0.5 transition-transform hover:scale-110"
          >
            <Star
              weight={(hover || rating) >= n ? "fill" : "regular"}
              className={cn("size-7", (hover || rating) >= n ? "text-amber" : "text-border-strong")}
              aria-hidden
            />
          </button>
        ))}
      </div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
        placeholder="Share how this resource helped you…"
        className={cn(areaClass, "mt-4")}
      />
      {error ? (
        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-rose">
          <Warning weight="fill" className="size-4 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
      <Button type="submit" size="md" disabled={pending} className="mt-4">
        {pending ? "Posting…" : "Post review"}
      </Button>
    </form>
  );
}
