"use client";

import * as React from "react";
import { useActionState } from "react";
import { WarningCircle } from "@phosphor-icons/react";
import { Field } from "./field";
import { PasswordField } from "./password-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerAction } from "@/lib/auth-actions";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, undefined);
  const [password, setPassword] = React.useState("");

  return (
    <form action={formAction} className="grid gap-4">
      {state?.error ? (
        <p className="flex items-center gap-2 rounded-xl bg-rose/10 px-3.5 py-2.5 text-sm font-medium text-rose">
          <WarningCircle weight="fill" className="size-4 shrink-0" aria-hidden />
          {state.error}
        </p>
      ) : null}

      <Field id="name" label="Full name">
        <Input
          id="name"
          name="name"
          required
          autoComplete="name"
          placeholder="Chidinma Okonkwo"
          className="h-12"
        />
      </Field>

      <Field id="email" label="Email address">
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@university.edu.ng"
          className="h-12"
        />
      </Field>

      <Field id="password" label="Password" hint="At least 8 characters.">
        <PasswordField
          id="password"
          name="password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          placeholder="Create a password"
          showStrength
        />
      </Field>

      <label className="flex cursor-pointer items-start gap-2.5 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="agree"
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

      <Button type="submit" size="lg" className="mt-1 w-full" disabled={pending}>
        {pending ? "Creating account..." : "Create free account"}
      </Button>
    </form>
  );
}
