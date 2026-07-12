"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Field } from "./field";
import { PasswordField } from "./password-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = React.useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address";
    if (password.length < 1) next.password = "Enter your password";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    // Phase 4 wires this to Sanctum. For now, proceed to the dashboard.
    router.push("/dashboard");
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
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
          invalid={!!errors.password}
        />
      </Field>

      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="size-4 rounded border-border-strong accent-primary"
          />
          Remember me
        </label>
        <Link
          href="/forgot-password"
          className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" size="lg" className="mt-2 w-full" disabled={submitting}>
        {submitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
