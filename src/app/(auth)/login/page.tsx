import type { Metadata } from "next";
import Link from "next/link";
import { GoogleButton } from "@/components/auth/google-button";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
        Welcome back
      </h1>
      <p className="mt-2 text-muted-foreground">
        Sign in to access your resources and dashboard.
      </p>

      <div className="mt-8">
        <GoogleButton label="Continue with Google" />
      </div>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-wide text-faint-foreground">
          or
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <LoginForm />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        New to Sparklyn?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
