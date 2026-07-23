import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkle, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { requireUser } from "@/lib/require-user";
import { getOrderForUser } from "@/lib/orders";
import { PrintButton } from "@/components/checkout/print-button";
import { formatNaira } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Receipt",
  robots: { index: false, follow: false },
};

export default async function ReceiptPage({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;
  const user = await requireUser();
  const data = await getOrderForUser(ref, user.id);
  if (!data) notFound();
  const { order, items } = data;

  return (
    <main id="main" className="min-h-[100dvh] bg-background py-8 lg:py-12">
      <div className="container-page">
        <div className="mx-auto max-w-2xl">
          <div className="mb-5 flex items-center justify-between print:hidden">
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft weight="bold" className="size-4" aria-hidden />
              Back to orders
            </Link>
            <PrintButton />
          </div>

          <article className="rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow-sm)]">
            <header className="flex items-start justify-between gap-4 border-b border-border pb-6">
              <div>
                <span className="inline-flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-[0.6rem] bg-primary text-primary-foreground">
                    <Sparkle weight="fill" className="size-[1.15rem]" aria-hidden />
                  </span>
                  <span className="font-display text-xl font-extrabold text-foreground">
                    Skola
                  </span>
                </span>
                <p className="mt-2 text-sm text-muted-foreground">Payment receipt</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e6f7ef] px-3 py-1 text-xs font-bold text-emerald">
                <SealCheck weight="fill" className="size-3.5" aria-hidden />
                {order.status}
              </span>
            </header>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Receipt no.</dt>
                <dd className="font-semibold text-foreground">{order.id}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Date</dt>
                <dd className="font-semibold text-foreground">{order.date}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Billed to</dt>
                <dd className="font-semibold text-foreground">{user.email}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Payment method</dt>
                <dd className="font-semibold text-foreground">{order.method}</dd>
              </div>
            </dl>

            <table className="mt-8 w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-2 font-medium">Item</th>
                  <th className="pb-2 text-right font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id} className="border-b border-border">
                    <td className="py-3 pr-4 text-foreground">{it.title}</td>
                    <td className="py-3 text-right font-medium text-foreground">
                      {formatNaira(it.priceNaira)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="pt-4 font-bold text-foreground">Total paid</td>
                  <td className="pt-4 text-right font-display text-lg font-extrabold text-foreground">
                    {formatNaira(order.totalNaira)}
                  </td>
                </tr>
              </tfoot>
            </table>

            <p className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
              Thank you for your purchase. Skola, Lagos, Nigeria.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
