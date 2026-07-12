"use client";

import * as React from "react";
import Link from "next/link";
import { EnvelopeSimple, ArrowLeft, CheckCircle } from "@phosphor-icons/react";
import { Field } from "./field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForgotForm() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState<string>();
  const [sent, setSent] = React.useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    setError(undefined);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#e6f7ef] text-emerald">
          <CheckCircle weight="fill" className="size-7" aria-hidden />
        </span>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-foreground">
          Check your inbox
        </h1>
        <p className="mt-2 text-muted-foreground">
          If an account exists for <span className="font-semibold text-foreground">{email}</span>,
          we have sent a link to reset your password.
        </p>
        <Button asChild variant="outline" size="lg" className="mt-6 w-full">
          <Link href="/login">
            <ArrowLeft weight="bold" className="size-4" aria-hidden />
            Back to sign in
          </Link>
        </Button>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-4 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div>
      <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
        <EnvelopeSimple weight="duotone" className="size-6" aria-hidden />
      </span>
      <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-foreground">
        Reset your password
      </h1>
      <p className="mt-2 text-muted-foreground">
        Enter the email tied to your account and we will send you a reset link.
      </p>

      <form onSubmit={submit} noValidate className="mt-8 grid gap-4">
        <Field id="email" label="Email address" error={error}>
          <Input
            id="email"
            type="email"
            value={email}
            autoComplete="email"
            placeholder="you@university.edu.ng"
            aria-invalid={!!error}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12"
          />
        </Field>
        <Button type="submit" size="lg" className="w-full">
          Send reset link
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft weight="bold" className="size-4" aria-hidden />
        Back to sign in
      </Link>
    </div>
  );
}
