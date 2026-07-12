import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/require-admin";
import { listOrders, getOrderCounts } from "@/db/admin";
import { DashPageHeader } from "@/components/dashboard/page-header";
import { OrderStatusControl } from "@/components/admin/order-status-control";
import { formatNaira, cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Orders" };
export const dynamic = "force-dynamic";

const TABS = ["all", "Paid", "Pending", "Refunded"] as const;

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const { status } = await searchParams;
  const active = TABS.includes(status as (typeof TABS)[number]) ? status! : "all";
  const [orders, counts] = await Promise.all([
    listOrders(active === "all" ? undefined : active),
    getOrderCounts(),
  ]);

  return (
    <div className="mx-auto max-w-6xl">
      <DashPageHeader
        title="Orders"
        description="Every order across the platform. Update status or issue refunds."
      />

      {/* Filter tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => {
          const label = t === "all" ? "All" : t;
          const count = t === "all" ? counts.all : counts[t];
          const isActive = active === t;
          return (
            <Link
              key={t}
              href={t === "all" ? "/dashboard/admin/orders" : `/dashboard/admin/orders?status=${t}`}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border-strong bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {label}
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs",
                  isActive ? "bg-white/20" : "bg-surface-subtle",
                )}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-xs)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Order</th>
                <th className="px-5 py-3 font-semibold">Buyer</th>
                <th className="px-5 py-3 font-semibold">Items</th>
                <th className="px-5 py-3 font-semibold">Method</th>
                <th className="px-5 py-3 text-right font-semibold">Total</th>
                <th className="px-5 py-3 text-right font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((o) => (
                <tr key={o.id} className="align-top transition-colors hover:bg-surface-subtle/50">
                  <td className="px-5 py-3">
                    <span className="font-display font-bold text-foreground">{o.id}</span>
                    <span className="block text-xs text-muted-foreground">{o.date}</span>
                  </td>
                  <td className="max-w-[14rem] px-5 py-3">
                    <span className="block truncate text-foreground">{o.buyer}</span>
                    <span className="block truncate text-xs text-muted-foreground">{o.email}</span>
                  </td>
                  <td className="max-w-[18rem] px-5 py-3 text-muted-foreground">
                    <span className="block truncate">{o.items.join(", ") || "—"}</span>
                    {o.items.length > 1 ? (
                      <span className="text-xs text-faint-foreground">{o.items.length} items</span>
                    ) : null}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{o.method}</td>
                  <td className="px-5 py-3 text-right font-semibold text-foreground">
                    {formatNaira(o.totalNaira)}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <OrderStatusControl orderId={o.id} status={o.status} />
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                    No orders in this view.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
