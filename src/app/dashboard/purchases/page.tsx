import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DownloadSimple, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { purchases } from "@/lib/dashboard-data";
import { DashPageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { picsum, formatNaira } from "@/lib/utils";

export const metadata: Metadata = { title: "Purchases" };

export default function PurchasesPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <DashPageHeader
        title="Your purchases"
        description={`${purchases.length} resources you own and can download any time.`}
      />

      <ul className="mt-6 grid gap-4">
        {purchases.map((p) => (
          <li
            key={p.id}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-xs)] sm:flex-row sm:items-center"
          >
            <span className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl sm:size-20">
              <Image
                src={picsum(p.thumbnailSeed, 200, 200)}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </span>
            <div className="min-w-0 flex-1">
              <Badge variant="neutral" size="sm">
                {p.type}
              </Badge>
              <h2 className="mt-1.5 font-display font-bold leading-snug text-foreground">
                <Link href={`/resource/${p.resourceId}`} className="hover:text-primary">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {p.institution} · Bought {p.purchasedOn} · Downloaded {p.downloads}x
              </p>
            </div>
            <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
              <span className="font-display font-bold text-foreground">
                {formatNaira(p.priceNaira)}
              </span>
              <Button size="sm">
                <DownloadSimple weight="bold" className="size-4" aria-hidden />
                Download
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-center rounded-2xl border border-dashed border-border-strong bg-surface-subtle/40 px-6 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Looking for more material?{" "}
          <Link
            href="/browse"
            className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-hover"
          >
            Browse the marketplace
            <ArrowRight weight="bold" className="size-4" aria-hidden />
          </Link>
        </p>
      </div>
    </div>
  );
}
