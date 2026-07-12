"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Field } from "./field";
import { PasswordField, scorePassword } from "./password-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [agree, setAgree] = React.useState(false);
  const [errors, setErrors] = React.useState<{
    name?: string;
    email?: string;
    password?: string;
    agree?: string;
  }>({});
  const [submitting, setSubmitting] = React.useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Enter your full name";
    if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address";
    if (scorePassword(password) < 2) next.password = "Use at least 8 characters with a number";
    if (!agree) next.agree = "Please accept the terms to continue";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    // Phase 4 wires this to Sanctum + email verification. For now, go to verify.
    router.push("/verify");
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <Field id="name" label="Full name" error={errors.name}>
        <Input
          id="name"
          value={name}
          autoComplete="name"
          placeholder="Chidinma Okonkwo"
          aria-invalid={!!errors.name}
          onChange={(e) => setName(e.target.value)}
          className="h-12"
        />
      </Field>

      <Field id="email" label="Email address" error={errors.email}>
        <Input
          id="email"
          type="email"
          value={email}
          autoComplete="email"
          placeholder="you@university.edu.ng"
          aria-invalid={!!errors.email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12"
        />
      </Field>

      <Field id="password" label="Password" error={errors.password}>
        <PasswordField
          id="password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          placeholder="Create a password"
          invalid={!!errors.password}
          showStrength
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 size-4 rounded border-border-strong accent-primary"
          />
          <span>
            I agree to the{" "}
            <a href="/terms" className="font-semibold text-primary hover:text-primary-hover">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="font-semibold text-primary hover:text-primary-hover">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.agree ? (
          <p className="mt-1 text-xs font-medium text-rose">{errors.agree}</p>
        ) : null}
      </div>

      <Button type="submit" size="lg" className="mt-1 w-full" disabled={submitting}>
        {submitting ? "Creating account..." : "Create free account"}
      </Button>
    </form>
  );
}
