"use client";

import * as React from "react";
import Link from "next/link";
import { useActionState } from "react";
import { WarningCircle } from "@phosphor-icons/react";
import { Field } from "./field";
import { PasswordField } from "./password-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginAction } from "@/lib/auth-actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);
  const [password, setPassword] = React.useState("");

  return (
    <form action={formAction} className="grid gap-4">
      {state?.error ? (
        <p className="flex items-center gap-2 rounded-xl bg-rose/10 px-3.5 py-2.5 text-sm font-medium text-rose">
          <WarningCircle weight="fill" className="size-4 shrink-0" aria-hidden />
          {state.error}
        </p>
      ) : null}

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

      <Field id="password" label="Password">
        <PasswordField id="password" name="password" value={password} onChange={setPassword} />
      </Field>

      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="remember"
            defaultChecked
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

      <Button type="submit" size="lg" className="mt-2 w-full" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
