import type { Metadata } from "next";
import { Receipt, CreditCard } from "@phosphor-icons/react/dist/ssr";
import { requireUser } from "@/lib/require-user";
import { getOrders } from "@/db/queries";
import type { Order } from "@/types/dashboard";
import { DashPageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { formatNaira, cn } from "@/lib/utils";

const statusStyle: Record<Order["status"], string> = {
  Paid: "bg-[#e6f7ef] text-emerald",
  Refunded: "bg-surface-subtle text-muted-foreground",
  Pending: "bg-amber/10 text-amber",
};

export const metadata: Metadata = { title: "Orders" };

export default async function OrdersPage() {
  const user = await requireUser();
  const orders = await getOrders(user.id);
  return (
    <div className="mx-auto max-w-4xl">
      <DashPageHeader
        title="Order history"
        description="Your past orders and downloadable receipts."
      />

      <ul className="mt-6 grid gap-4">
        {orders.map((o) => (
          <li
            key={o.id}
            className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-xs)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-display font-bold text-foreground">{o.id}</span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold",
                    statusStyle[o.status],
                  )}
                >
                  {o.status}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{o.date}</span>
            </div>

            <ul className="mt-3 grid gap-1 border-t border-border pt-3">
              {o.items.map((item, i) => (
                <li key={i} className="truncate text-sm text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <CreditCard weight="bold" className="size-4" aria-hidden />
                {o.method}
              </span>
              <div className="flex items-center gap-4">
                <span className="font-display text-lg font-extrabold text-foreground">
                  {formatNaira(o.totalNaira)}
                </span>
                <Button variant="outline" size="sm" disabled={o.status === "Refunded"}>
                  <Receipt weight="bold" className="size-4" aria-hidden />
                  Receipt
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
