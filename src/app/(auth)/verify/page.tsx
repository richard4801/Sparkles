import type { Metadata } from "next";
import Link from "next/link";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { VerifyClient } from "@/components/auth/verify-client";

export const metadata: Metadata = {
  title: "Verify your email",
  robots: { index: false, follow: false },
};

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (token) return <VerifyClient token={token} />;

  return (
    <div>
      <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
        <EnvelopeSimple weight="duotone" className="size-6" aria-hidden />
      </span>
      <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-foreground">
        Check your email
      </h1>
      <p className="mt-2 text-muted-foreground">
        We&apos;ve sent a verification link to your inbox. Click it to confirm your account.
        You can keep using Skola in the meantime.
      </p>

      <Link
        href="/dashboard"
        className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
      >
        Continue to dashboard
      </Link>
    </div>
  );
}
