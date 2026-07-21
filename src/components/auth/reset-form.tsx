"use client";

import * as React from "react";
import Link from "next/link";
import { LockKey, ArrowLeft, CheckCircle, Warning } from "@phosphor-icons/react";
import { Field } from "./field";
import { PasswordField } from "./password-field";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/lib/account-actions";

export function ResetForm({ token }: { token?: string }) {
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [error, setError] = React.useState<string>();
  const [done, setDone] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  if (!token) {
    return (
      <div className="text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-rose/10 text-rose">
          <Warning weight="fill" className="size-7" aria-hidden />
        </span>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-foreground">
          Invalid reset link
        </h1>
        <p className="mt-2 text-muted-foreground">
          This link is missing or malformed. Request a new one to continue.
        </p>
        <Button asChild size="lg" className="mt-6 w-full">
          <Link href="/forgot-password">Request a new link</Link>
        </Button>
      </div>
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError(undefined);
    startTransition(async () => {
      const res = await resetPassword(token!, password);
      if (res.ok) setDone(true);
      else setError(res.error ?? "Could not reset your password.");
    });
  }

  if (done) {
    return (
      <div className="text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#e6f7ef] text-emerald">
          <CheckCircle weight="fill" className="size-7" aria-hidden />
        </span>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-foreground">
          Password updated
        </h1>
        <p className="mt-2 text-muted-foreground">
          You can now sign in with your new password.
        </p>
        <Button asChild size="lg" className="mt-6 w-full">
          <Link href="/login">
            <ArrowLeft weight="bold" className="size-4" aria-hidden />
            Back to sign in
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
        <LockKey weight="duotone" className="size-6" aria-hidden />
      </span>
      <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-foreground">
        Set a new password
      </h1>
      <p className="mt-2 text-muted-foreground">Choose a strong password you don&apos;t use elsewhere.</p>

      <form onSubmit={submit} noValidate className="mt-8 grid gap-4">
        <Field id="password" label="New password" error={error}>
          <PasswordField
            id="password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            showStrength
          />
        </Field>
        <Field id="confirm" label="Confirm password">
          <PasswordField
            id="confirm"
            value={confirm}
            onChange={setConfirm}
            autoComplete="new-password"
            placeholder="Re-enter your password"
          />
        </Field>
        <Button type="submit" size="lg" disabled={pending} className="w-full">
          {pending ? "Updating…" : "Update password"}
        </Button>
      </form>
    </div>
  );
}
