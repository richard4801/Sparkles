"use client";

import * as React from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function scorePassword(pw: string): number {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4);
}

const STRENGTH = [
  { label: "Too short", color: "bg-rose" },
  { label: "Weak", color: "bg-rose" },
  { label: "Fair", color: "bg-amber" },
  { label: "Good", color: "bg-blue" },
  { label: "Strong", color: "bg-emerald" },
];

export function PasswordField({
  id,
  value,
  onChange,
  placeholder = "Enter your password",
  autoComplete = "current-password",
  invalid = false,
  showStrength = false,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  invalid?: boolean;
  showStrength?: boolean;
}) {
  const [show, setShow] = React.useState(false);
  const score = showStrength ? scorePassword(value) : 0;

  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={invalid}
          className={cn(
            "h-12 w-full rounded-[var(--radius-sm)] border bg-surface px-4 pr-11 text-[0.95rem] text-foreground shadow-[var(--shadow-xs)] transition-colors placeholder:text-faint-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            invalid ? "border-rose/60" : "border-border-strong focus-visible:border-primary/50",
          )}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-faint-foreground transition-colors hover:text-foreground"
        >
          {show ? <EyeSlash className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
        </button>
      </div>

      {showStrength && value.length > 0 ? (
        <div className="mt-2 flex items-center gap-2">
          <div className="flex flex-1 gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  i < score ? STRENGTH[score].color : "bg-surface-subtle",
                )}
              />
            ))}
          </div>
          <span className="w-14 text-right text-xs font-medium text-muted-foreground">
            {STRENGTH[score].label}
          </span>
        </div>
      ) : null}
    </div>
  );
}
