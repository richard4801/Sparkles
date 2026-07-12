import type { Metadata } from "next";
import Link from "next/link";
import { GoogleButton } from "@/components/auth/google-button";
import { RegisterForm } from "@/components/auth/register-form";
import { googleEnabled } from "@/auth";
import { googleLoginAction } from "@/lib/auth-actions";

export const metadata: Metadata = {
  title: "Create account",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
        Create your account
      </h1>
      <p className="mt-2 text-muted-foreground">
        Join thousands of students finding resources faster.
      </p>

      {googleEnabled ? (
        <>
          <form action={googleLoginAction} className="mt-8">
            <GoogleButton label="Sign up with Google" />
          </form>
          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium uppercase tracking-wide text-faint-foreground">
              or
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
        </>
      ) : (
        <div className="mt-8" />
      )}

      <RegisterForm />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
