import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { OtpForm } from "@/components/auth/otp-form";

export const metadata: Metadata = {
  title: "Verify your email",
  robots: { index: false, follow: false },
};

export default function VerifyPage() {
  return (
    <div>
      <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
        <ShieldCheck weight="duotone" className="size-6" aria-hidden />
      </span>
      <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-foreground">
        Verify your email
      </h1>
      <p className="mt-2 text-muted-foreground">
        We sent a 6-digit code to your email. Enter it below to confirm your account.
      </p>

      <div className="mt-8">
        <OtpForm />
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Entered the wrong email?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          Go back
        </Link>
      </p>
    </div>
  );
}
