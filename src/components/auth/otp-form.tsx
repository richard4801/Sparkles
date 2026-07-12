"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LENGTH = 6;
const RESEND_SECONDS = 30;

export function OtpForm() {
  const router = useRouter();
  const [digits, setDigits] = React.useState<string[]>(Array(LENGTH).fill(""));
  const [error, setError] = React.useState<string>();
  const [seconds, setSeconds] = React.useState(RESEND_SECONDS);
  const inputs = React.useRef<Array<HTMLInputElement | null>>([]);

  React.useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  function setDigit(i: number, v: string) {
    const clean = v.replace(/\D/g, "");
    if (!clean) {
      setDigits((d) => d.map((x, idx) => (idx === i ? "" : x)));
      return;
    }
    setError(undefined);
    const chars = clean.split("");
    setDigits((d) => {
      const next = [...d];
      let idx = i;
      for (const c of chars) {
        if (idx >= LENGTH) break;
        next[idx] = c;
        idx++;
      }
      return next;
    });
    const focusTo = Math.min(i + chars.length, LENGTH - 1);
    inputs.current[focusTo]?.focus();
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < LENGTH - 1) inputs.current[i + 1]?.focus();
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (digits.some((d) => !d)) {
      setError("Enter the full 6-digit code");
      return;
    }
    // Phase 4 verifies the code server-side. For now, continue.
    router.push("/dashboard");
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="flex justify-between gap-2" role="group" aria-label="Verification code">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            value={d}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            maxLength={LENGTH}
            aria-label={`Digit ${i + 1}`}
            aria-invalid={!!error}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            className={cn(
              "h-14 w-full rounded-xl border bg-surface text-center font-display text-xl font-bold text-foreground shadow-[var(--shadow-xs)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              error ? "border-rose/60" : "border-border-strong focus-visible:border-primary/50",
            )}
          />
        ))}
      </div>
      {error ? <p className="mt-2 text-xs font-medium text-rose">{error}</p> : null}

      <Button type="submit" size="lg" className="mt-6 w-full">
        Verify and continue
      </Button>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Did not get the code?{" "}
        {seconds > 0 ? (
          <span className="text-faint-foreground">Resend in {seconds}s</span>
        ) : (
          <button
            type="button"
            onClick={() => setSeconds(RESEND_SECONDS)}
            className="font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            Resend code
          </button>
        )}
      </p>
    </form>
  );
}
