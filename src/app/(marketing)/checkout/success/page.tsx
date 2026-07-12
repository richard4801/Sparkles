import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, DownloadSimple, Receipt, SquaresFour } from "@phosphor-icons/react/dist/ssr";
import { requireUser } from "@/lib/require-user";
import { getOrderForUser } from "@/lib/orders";
import { Button } from "@/components/ui/button";
import { ClearCartOnMount } from "@/components/checkout/clear-cart";
import { formatNaira } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order complete",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const user = await requireUser();
  const data = ref ? await getOrderForUser(ref, user.id) : null;
  if (!data) notFound();
  const { order, items } = data;

  return (
    <main id="main" className="container-page py-10 lg:py-16">
      <ClearCartOnMount />
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#e6f7ef] text-emerald">
            <CheckCircle weight="fill" className="size-8" aria-hidden />
          </span>
          <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-foreground">
            Payment successful
          </h1>
          <p className="mt-2 text-muted-foreground">
            Order <span className="font-semibold text-foreground">{order.id}</span> is
            complete. Your resources are ready to download.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-sm)]">
          <ul className="divide-y divide-border">
            {items.map((it) => (
              <li key={it.id} className="flex items-center gap-4 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-foreground">{it.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatNaira(it.priceNaira)}
                  </p>
                </div>
                <Button
                  asChild
                  size="sm"
                  variant="subtle"
                >
                  <a
                    href={it.resourceId ? `/resource/${it.resourceId}` : "#"}
                    aria-label={`Download ${it.title}`}
                  >
                    <DownloadSimple weight="bold" className="size-4" aria-hidden />
                    Download
                  </a>
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-border bg-surface-subtle/50 px-5 py-4">
            <span className="font-bold text-foreground">Total paid</span>
            <span className="font-display text-lg font-extrabold text-foreground">
              {formatNaira(order.totalNaira)}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard/purchases">
              <SquaresFour weight="bold" className="size-4" aria-hidden />
              Go to my purchases
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={`/receipt/${order.id}`}>
              <Receipt weight="bold" className="size-4" aria-hidden />
              View receipt
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
