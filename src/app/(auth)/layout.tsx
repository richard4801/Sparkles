import Link from "next/link";
import { SealCheck, Lightning, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/layout/logo";

const points = [
  { icon: Lightning, text: "Preview and download resources in seconds" },
  { icon: SealCheck, text: "Every resource vetted before it is listed" },
  { icon: ShieldCheck, text: "Secure payments with Paystack and Flutterwave" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-[100dvh] lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-[#7a58f7] to-[#8b6bff] p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-accent-blue/20 blur-3xl" />

        <Link href="/" className="relative">
          <span className="inline-flex items-center gap-2 text-primary-foreground">
            <span className="grid size-8 place-items-center rounded-[0.6rem] bg-white/20 backdrop-blur">
              <SealCheck weight="fill" className="size-5" aria-hidden />
            </span>
            <span className="font-display text-xl font-extrabold">Sparklyn</span>
          </span>
        </Link>

        <div className="relative max-w-md">
          <h2 className="font-display text-3xl font-extrabold leading-tight text-white">
            The academic marketplace built for Nigerian students.
          </h2>
          <ul className="mt-8 grid gap-4">
            {points.map((p) => (
              <li key={p.text} className="flex items-center gap-3 text-white/90">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur">
                  <p.icon weight="fill" className="size-5" aria-hidden />
                </span>
                <span className="text-[0.98rem]">{p.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-white/70">
          Over 12,000 vetted resources across 148 institutions.
        </p>
      </aside>

      {/* Form panel */}
      <main id="main" className="flex flex-col justify-center px-5 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link href="/" aria-label="Sparklyn home">
              <Logo />
            </Link>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
