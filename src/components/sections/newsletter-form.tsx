"use client";

import * as React from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { subscribeEmail } from "@/lib/site-actions";

export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "done" | "error">("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await subscribeEmail(email);
      if (res.ok) {
        setStatus("done");
        setEmail("");
      } else {
        setStatus("error");
        setError(res.error ?? "Something went wrong.");
      }
    });
  }

  if (status === "done") {
    return (
      <p className="mx-auto mt-8 inline-flex max-w-md items-center justify-center gap-2 rounded-full bg-white/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur">
        <CheckCircle weight="fill" className="size-5" aria-hidden />
        You&apos;re subscribed — watch your inbox for new resources.
      </p>
    );
  }

  return (
    <>
      <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-2.5 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@university.edu.ng"
          className="h-13 flex-1 rounded-full border border-white/20 bg-white/95 px-5 text-[0.98rem] text-foreground placeholder:text-faint-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        />
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="bg-white text-primary hover:bg-white hover:text-primary-hover"
        >
          {pending ? "Subscribing…" : "Subscribe"}
        </Button>
      </form>
      {error ? <p className="mt-3 text-sm font-medium text-white">{error}</p> : null}
    </>
  );
}
