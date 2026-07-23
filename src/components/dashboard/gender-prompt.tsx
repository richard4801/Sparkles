"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { setGender } from "@/lib/settings-actions";

/**
 * One-time prompt shown to accounts with no explicit gender yet — chiefly Google
 * sign-ups, who never pass through the registration form. Picking an option
 * saves it and regenerates the avatar to match, so we stop guessing from the
 * name. "Not now" defers it to the next visit rather than guessing forever.
 */
export function GenderPrompt({ firstName }: { firstName: string }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const [pending, setPending] = React.useState<"f" | "m" | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  if (!open) return null;

  async function choose(gender: "f" | "m") {
    setError(null);
    setPending(gender);
    const res = await setGender(gender);
    if (res.ok) {
      setOpen(false);
      router.refresh();
    } else {
      setError(res.error ?? "Could not save your choice.");
      setPending(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-lg)]">
        <h2 className="font-display text-lg font-bold text-foreground">
          One quick thing, {firstName}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Pick your gender so we can give you an avatar that fits. You can change
          this anytime in Settings.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {([
            { value: "f", label: "Female" },
            { value: "m", label: "Male" },
          ] as const).map((opt) => (
            <button
              key={opt.value}
              type="button"
              disabled={pending !== null}
              onClick={() => choose(opt.value)}
              className="flex h-12 items-center justify-center rounded-[var(--radius-sm)] border border-border-strong text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 disabled:opacity-60"
            >
              {pending === opt.value ? "Saving…" : opt.label}
            </button>
          ))}
        </div>

        {error ? <p className="mt-3 text-sm font-medium text-rose">{error}</p> : null}

        <button
          type="button"
          disabled={pending !== null}
          onClick={() => setOpen(false)}
          className="mt-4 w-full text-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-60"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
