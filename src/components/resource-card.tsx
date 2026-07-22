import Image from "next/image";
import { Star, DownloadSimple, Eye } from "@phosphor-icons/react/dist/ssr";
import type { Resource } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/bookmark-button";
import { cn, formatNaira, formatCompact, resourceImage } from "@/lib/utils";

export function ResourceCard({
  resource,
  className,
  savedInWishlist = false,
}: {
  resource: Resource;
  className?: string;
  savedInWishlist?: boolean;
}) {
  const href = `/resource/${resource.id}`;
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[var(--shadow-lg)]",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={resourceImage(resource.id)}
          alt=""
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3">
          <Badge variant="solid" size="sm" className="bg-foreground/80 backdrop-blur">
            {resource.type}
          </Badge>
        </div>
        <BookmarkButton
          resourceId={resource.id}
          title={resource.title}
          initialSaved={savedInWishlist}
          className="absolute right-3 top-3"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {resource.category}
        </p>
        <h3 className="mt-1.5">
          <a
            href={href}
            className="line-clamp-2 font-display text-[1.05rem] font-bold leading-snug text-foreground transition-colors hover:text-primary"
          >
            {resource.title}
          </a>
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
          {resource.institution} · {resource.department}
        </p>

        <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1 font-semibold text-foreground">
            <Star weight="fill" className="size-4 text-amber" aria-hidden />
            {resource.rating.toFixed(1)}
          </span>
          <span className="text-faint-foreground" aria-hidden>
            •
          </span>
          <span className="inline-flex items-center gap-1">
            <DownloadSimple weight="bold" className="size-4" aria-hidden />
            {formatCompact(resource.downloads)}
          </span>
          <span className="text-faint-foreground" aria-hidden>
            •
          </span>
          <span>{resource.pages} pages</span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3.5">
          <span className="font-display text-lg font-extrabold text-foreground">
            {formatNaira(resource.priceNaira)}
          </span>
          <div className="flex items-center gap-1.5">
            <Button asChild variant="subtle" size="sm" className="px-3">
              <a href={`${href}#preview`} aria-label={`Preview ${resource.title}`}>
                <Eye weight="bold" className="size-4" aria-hidden />
                Preview
              </a>
            </Button>
            <Button asChild size="sm" className="px-3.5">
              <a href={`${href}#buy`} aria-label={`Buy ${resource.title}`}>
                Buy
              </a>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
