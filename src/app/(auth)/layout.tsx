import Link from "next/link";
import Image from "next/image";
import { SealCheck, Lightning, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/layout/logo";
import { picsum } from "@/lib/utils";

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
      <aside className="relative hidden overflow-hidden bg-brand-deep p-12 lg:flex lg:flex-col lg:justify-between">
        {/* Campus photo, washed into the teal brand */}
        <Image
          src={picsum("sparklyn-nigerian-students-campus", 1100, 1500)}
          alt=""
          fill
          sizes="50vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/90 via-primary/75 to-brand-deep/95" />
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent-lime/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 size-72 rounded-full bg-accent-cyan/20 blur-3xl" />

        <Link href="/" className="relative">
          <Logo light />
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
