import Link from "next/link";
import {
  CurrencyNgn,
  ShoppingBagOpen,
  UsersThree,
  DownloadSimple,
  TrendUp,
  MagnifyingGlass,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import { requireAdmin } from "@/lib/require-admin";
import {
  getAdminStats,
  getRevenueByMonth,
  getTopResources,
  getCategoryBreakdown,
  getRecentOrders,
  getSearchTrends,
} from "@/db/admin";
import { StatCard } from "@/components/dashboard/stat-card";
import { BarChart } from "@/components/dashboard/bar-chart";
import { StatusPill } from "@/components/admin/status-pill";
import { formatNaira, formatCompact, cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const admin = await requireAdmin();
  const [stats, revenue, topResources, categories, recentOrders, trends] =
    await Promise.all([
      getAdminStats(),
      getRevenueByMonth(6),
      getTopResources(6),
      getCategoryBreakdown(),
      getRecentOrders(6),
      getSearchTrends(6),
    ]);

  const maxCatDownloads = Math.max(1, ...categories.map((c) => c.downloads));

  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <p className="text-sm font-semibold text-primary">Admin</p>
        <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Analytics
        </h1>
        <p className="mt-1.5 text-muted-foreground">
          Platform-wide performance, {admin.name?.split(" ")[0] ? `${admin.name.split(" ")[0]}` : "admin"}.
        </p>
      </header>

      {/* KPIs */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={CurrencyNgn}
          label="Revenue"
          value={formatNaira(stats.revenueNaira)}
          sublabel={`${stats.paidOrders} paid orders`}
          accent="emerald"
        />
        <StatCard
          icon={ShoppingBagOpen}
          label="Sales"
          value={String(stats.sales)}
          sublabel={`${stats.pendingOrders} pending orders`}
          accent="violet"
        />
        <StatCard
          icon={UsersThree}
          label="Users"
          value={String(stats.users)}
          sublabel={`${stats.admins} admin${stats.admins === 1 ? "" : "s"}`}
          accent="blue"
        />
        <StatCard
          icon={DownloadSimple}
          label="Downloads"
          value={formatCompact(stats.catalogDownloads)}
          sublabel={`${stats.resources} resources live`}
          accent="amber"
        />
      </div>

      {/* Revenue + categories */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-xs)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">Revenue</h2>
              <p className="text-sm text-muted-foreground">Paid orders over the last 6 months.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e6f7ef] px-3 py-1 text-xs font-bold text-emerald">
              <TrendUp weight="bold" className="size-3.5" aria-hidden />
              {formatNaira(stats.revenueNaira)}
            </span>
          </div>
          <div className="mt-6">
            <BarChart
              data={revenue}
              color="bg-primary"
              caption="Monthly revenue in naira"
              format={(n) => (n === 0 ? "₦0" : `₦${formatCompact(n)}`)}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-xs)]">
          <h2 className="font-display text-lg font-bold text-foreground">Categories</h2>
          <p className="text-sm text-muted-foreground">By total downloads.</p>
          <ul className="mt-5 grid gap-3.5">
            {categories.map((c) => (
              <li key={c.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{c.name}</span>
                  <span className="text-muted-foreground">{formatCompact(c.downloads)}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-subtle">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.max((c.downloads / maxCatDownloads) * 100, 3)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Top resources + search trends */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-xs)]">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-foreground">Top resources</h2>
            <Link
              href="/dashboard/admin/resources"
              className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              Manage
            </Link>
          </div>
          <ul className="mt-4 grid gap-1">
            {topResources.map((r, i) => (
              <li key={r.id}>
                <Link
                  href={`/dashboard/admin/resources/${r.id}/edit`}
                  className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-surface-subtle"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-surface-subtle text-xs font-bold text-muted-foreground">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground group-hover:text-primary">
                      {r.title}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {r.category} · {r.sales} sold
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-muted-foreground">
                    {formatCompact(r.downloads)}
                    <span className="ml-1 text-xs font-normal text-faint-foreground">dls</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-xs)]">
          <h2 className="font-display text-lg font-bold text-foreground">Search trends</h2>
          <p className="text-sm text-muted-foreground">What students are saving searches for.</p>
          {trends.length ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {trends.map((t) => (
                <li key={t.query}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-subtle px-3 py-1.5 text-sm text-foreground">
                    <MagnifyingGlass weight="bold" className="size-3.5 text-muted-foreground" aria-hidden />
                    {t.query}
                    {t.newMatches > 0 ? (
                      <span className="rounded-full bg-primary/10 px-1.5 text-xs font-bold text-primary">
                        +{t.newMatches}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">No saved searches yet.</p>
          )}
        </section>
      </div>

      {/* Recent orders */}
      <section className="mt-6 rounded-2xl border border-border bg-surface shadow-[var(--shadow-xs)]">
        <div className="flex items-center justify-between p-6 pb-3">
          <h2 className="font-display text-lg font-bold text-foreground">Recent orders</h2>
          <Link
            href="/dashboard/admin/orders"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            View all
            <ArrowUpRight weight="bold" className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-y border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-6 py-2.5 font-semibold">Order</th>
                <th className="px-6 py-2.5 font-semibold">Buyer</th>
                <th className="px-6 py-2.5 font-semibold">Method</th>
                <th className="px-6 py-2.5 text-right font-semibold">Total</th>
                <th className="px-6 py-2.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentOrders.map((o) => (
                <tr key={o.id} className="transition-colors hover:bg-surface-subtle/50">
                  <td className="px-6 py-3 font-display font-bold text-foreground">{o.id}</td>
                  <td className="max-w-[16rem] px-6 py-3">
                    <span className="block truncate text-foreground">{o.buyer}</span>
                    <span className="block truncate text-xs text-muted-foreground">{o.email}</span>
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{o.method}</td>
                  <td className="px-6 py-3 text-right font-semibold text-foreground">
                    {formatNaira(o.totalNaira)}
                  </td>
                  <td className="px-6 py-3">
                    <StatusPill status={o.status} />
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className={cn("px-6 py-8 text-center text-muted-foreground")}>
                    No orders yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
