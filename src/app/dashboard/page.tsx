import Image from "next/image";
import Link from "next/link";
import {
  BagSimple,
  DownloadSimple,
  Heart,
  Wallet,
  ArrowRight,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";
import { spendSeries, recentlyViewed } from "@/lib/dashboard-data";
import { requireUser } from "@/lib/require-user";
import { getDashStats, getAllResources } from "@/db/queries";
import { StatCard } from "@/components/dashboard/stat-card";
import { BarChart } from "@/components/dashboard/bar-chart";
import { ResourceCard } from "@/components/resource-card";
import { formatNaira, formatCompact, picsum } from "@/lib/utils";

export default async function DashboardOverview() {
  const user = await requireUser();
  const dashStats = await getDashStats(user.id);
  const all = await getAllResources();
  const recommended = all.filter((r) => r.trending).slice(0, 3);
  const recent = recentlyViewed
    .map((id) => all.find((r) => r.id === id))
    .filter((r): r is NonNullable<typeof r> => Boolean(r))
    .slice(0, 4);

  const spendData = spendSeries.map((p) => ({ label: p.month, value: p.spendNaira }));
  const downloadData = spendSeries.map((p) => ({ label: p.month, value: p.downloads }));

  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Welcome back, {(user.name ?? "there").split(" ")[0]}
        </h1>
        <p className="mt-1.5 text-muted-foreground">
          Here is what is happening with your account.
        </p>
      </header>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={BagSimple}
          label="Purchases"
          value={String(dashStats.purchases)}
          sublabel="All-time resources bought"
          accent="violet"
        />
        <StatCard
          icon={DownloadSimple}
          label="Downloads"
          value={String(dashStats.downloads)}
          sublabel="Across all your resources"
          accent="blue"
        />
        <StatCard
          icon={Heart}
          label="Wishlist"
          value={String(dashStats.wishlist)}
          sublabel="Saved for later"
          accent="amber"
        />
        <StatCard
          icon={Wallet}
          label="Total spend"
          value={formatNaira(dashStats.totalSpendNaira)}
          sublabel="Lifetime on Sparklyn"
          accent="emerald"
        />
      </div>

      {/* Activity */}
      <section className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-xs)]">
        <h2 className="font-display text-lg font-bold text-foreground">Your activity</h2>
        <p className="text-sm text-muted-foreground">Spending and downloads this year.</p>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-primary" aria-hidden />
              <span className="text-sm font-semibold text-foreground">Spending</span>
            </div>
            <BarChart
              data={spendData}
              color="bg-primary"
              caption="Monthly spending in naira"
              format={(n) => (n === 0 ? "₦0" : `₦${formatCompact(n)}`)}
            />
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-emerald" aria-hidden />
              <span className="text-sm font-semibold text-foreground">Downloads</span>
            </div>
            <BarChart
              data={downloadData}
              color="bg-emerald"
              caption="Monthly downloads"
              format={(n) => String(n)}
            />
          </div>
        </div>
      </section>

      {/* Recommended */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-foreground">
            Recommended for you
          </h2>
          <Link
            href="/browse"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            Browse all
            <ArrowRight weight="bold" className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      </section>

      {/* Recently viewed */}
      {recent.length > 0 ? (
        <section className="mt-8">
          <h2 className="font-display text-lg font-bold text-foreground">Recently viewed</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {recent.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/resource/${r.id}`}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 shadow-[var(--shadow-xs)] transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[var(--shadow-sm)]"
                >
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={picsum(r.thumbnailSeed, 120, 120)}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-foreground group-hover:text-primary">
                      {r.title}
                    </span>
                    <span className="block truncate text-sm text-muted-foreground">
                      {r.type} · {r.institution}
                    </span>
                  </span>
                  <CaretRight weight="bold" className="size-4 text-faint-foreground" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
