import {
  Lightning,
  ShieldCheck,
  FilePdf,
  DownloadSimple,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import type { Resource } from "@/types";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "@/components/bookmark-button";
import { AddToCart } from "./add-to-cart";
import { formatNaira, formatCompact } from "@/lib/utils";

const includes = [
  { icon: FilePdf, label: "Full PDF document" },
  { icon: DownloadSimple, label: "Instant download after payment" },
  { icon: Lightning, label: "Editable and print ready" },
];

export function PurchaseCard({ resource }: { resource: Resource }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-md)]">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">One-time payment</p>
          <p className="font-display text-3xl font-extrabold text-foreground">
            {formatNaira(resource.priceNaira)}
          </p>
        </div>
        <BookmarkButton
          title={resource.title}
          className="relative right-0 top-0 border border-border"
        />
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1 font-semibold text-foreground">
          <Star weight="fill" className="size-4 text-amber" aria-hidden />
          {resource.rating.toFixed(1)}
        </span>
        <span aria-hidden className="text-faint-foreground">
          •
        </span>
        <span>{formatCompact(resource.downloads)} downloads</span>
      </div>

      <div className="mt-5 grid gap-2.5">
        <Button asChild size="lg" className="w-full">
          <a href="#buy" id="buy">
            <Lightning weight="fill" className="size-5" aria-hidden />
            Buy and download now
          </a>
        </Button>
        <AddToCart title={resource.title} />
      </div>

      <ul className="mt-5 grid gap-2.5 border-t border-border pt-5">
        {includes.map((it) => (
          <li
            key={it.label}
            className="flex items-center gap-2.5 text-sm text-muted-foreground"
          >
            <it.icon weight="duotone" className="size-5 text-primary" aria-hidden />
            {it.label}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-surface-subtle px-3.5 py-3">
        <ShieldCheck weight="fill" className="size-5 shrink-0 text-emerald" aria-hidden />
        <p className="text-xs text-muted-foreground">
          Secure checkout with Paystack and Flutterwave. Your payment details are
          never stored.
        </p>
      </div>
    </div>
  );
}
