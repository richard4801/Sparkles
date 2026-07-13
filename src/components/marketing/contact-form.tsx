"use client";

import * as React from "react";
import { CheckCircle, Warning } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { submitContactMessage } from "@/lib/site-actions";

const labelClass = "mb-1.5 block text-sm font-semibold text-foreground";
const areaClass =
  "w-full rounded-[var(--radius-sm)] border border-border-strong bg-surface px-4 py-3 text-[0.95rem] text-foreground shadow-[var(--shadow-xs)] focus-visible:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function ContactForm() {
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await submitContactMessage(fd);
      if (res.ok) setDone(true);
      else setError(res.error ?? "Something went wrong.");
    });
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-[var(--shadow-xs)]">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#e6f7ef] text-emerald">
          <CheckCircle weight="fill" className="size-7" aria-hidden />
        </span>
        <h2 className="mt-4 font-display text-xl font-bold text-foreground">Message sent</h2>
        <p className="mt-2 text-muted-foreground">
          Thanks for reaching out — we&apos;ll get back to you by email soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-xs)] sm:p-8"
    >
      {error ? (
        <p className="mb-5 flex items-center gap-2 rounded-xl bg-rose/10 px-4 py-3 text-sm font-medium text-rose">
          <Warning weight="fill" className="size-4 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className={labelClass}>
            Name
          </label>
          <Input id="c-name" name="name" className="h-12" required />
        </div>
        <div>
          <label htmlFor="c-email" className={labelClass}>
            Email
          </label>
          <Input id="c-email" name="email" type="email" className="h-12" required />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="c-subject" className={labelClass}>
          Subject
        </label>
        <Input id="c-subject" name="subject" className="h-12" placeholder="How can we help?" />
      </div>
      <div className="mt-4">
        <label htmlFor="c-message" className={labelClass}>
          Message
        </label>
        <textarea id="c-message" name="message" rows={5} className={areaClass} required />
      </div>
      <Button type="submit" size="lg" disabled={pending} className="mt-6 w-full sm:w-auto">
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
