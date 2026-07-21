"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle, Warning, CircleNotch } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { verifyEmailToken } from "@/lib/account-actions";

export function VerifyClient({ token }: { token: string }) {
  const [state, setState] = React.useState<"loading" | "ok" | "error">("loading");
  const [error, setError] = React.useState<string>();
  const ran = React.useRef(false);

  React.useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    verifyEmailToken(token).then((res) => {
      if (res.ok) setState("ok");
      else {
        setState("error");
        setError(res.error);
      }
    });
  }, [token]);

  if (state === "loading") {
    return (
      <div className="text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary">
          <CircleNotch weight="bold" className="size-7 animate-spin" aria-hidden />
        </span>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-foreground">
          Verifying your email…
        </h1>
      </div>
    );
  }

  if (state === "ok") {
    return (
      <div className="text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#e6f7ef] text-emerald">
          <CheckCircle weight="fill" className="size-7" aria-hidden />
        </span>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-foreground">Email verified</h1>
        <p className="mt-2 text-muted-foreground">
          Your account is confirmed. You&apos;re all set.
        </p>
        <Button asChild size="lg" className="mt-6 w-full">
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-rose/10 text-rose">
        <Warning weight="fill" className="size-7" aria-hidden />
      </span>
      <h1 className="mt-5 font-display text-2xl font-extrabold text-foreground">
        Couldn&apos;t verify
      </h1>
      <p className="mt-2 text-muted-foreground">{error ?? "This link is invalid or expired."}</p>
      <Button asChild size="lg" variant="outline" className="mt-6 w-full">
        <Link href="/dashboard">Continue to dashboard</Link>
      </Button>
    </div>
  );
}
