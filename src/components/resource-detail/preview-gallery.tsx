import Image from "next/image";
import { LockSimple, FilePdf } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { picsum } from "@/lib/utils";

/** Document preview pages. The first pages are readable; later pages are locked
 *  behind purchase. These are real page-image placeholders, not fake UI. A real,
 *  truncated preview PDF is available to read before buying. */
export function PreviewGallery({
  resourceId,
  seed,
  pages,
}: {
  resourceId: string;
  seed: string;
  pages: number;
}) {
  const previews = [
    { n: 1, locked: false },
    { n: 2, locked: false },
    { n: 3, locked: true },
    { n: 4, locked: true },
  ];
  return (
    <section aria-labelledby="preview-heading" id="preview">
      <div className="flex items-baseline justify-between">
        <h2
          id="preview-heading"
          className="font-display text-2xl font-extrabold tracking-tight text-foreground"
        >
          Preview
        </h2>
        <p className="text-sm text-muted-foreground">
          Showing 2 of {pages} pages
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {previews.map((p) => (
          <div
            key={p.n}
            className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-xs)]"
          >
            <Image
              src={picsum(`${seed}-page-${p.n}`, 300, 400)}
              alt={p.locked ? "" : `Preview page ${p.n}`}
              fill
              sizes="(max-width: 640px) 45vw, 22vw"
              className={p.locked ? "object-cover blur-sm" : "object-cover"}
            />
            {p.locked ? (
              <div className="absolute inset-0 grid place-items-center bg-surface/55 backdrop-blur-[2px]">
                <span className="grid size-9 place-items-center rounded-full bg-surface/90 text-primary shadow-[var(--shadow-sm)]">
                  <LockSimple weight="fill" className="size-4" aria-hidden />
                </span>
              </div>
            ) : (
              <span className="absolute bottom-2 left-2 rounded-md bg-foreground/70 px-1.5 py-0.5 text-[0.65rem] font-semibold text-white backdrop-blur">
                Page {p.n}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col items-start gap-2 rounded-xl border border-border bg-surface-subtle/50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Read the opening pages as a real PDF — the premium preview cuts off
          halfway.
        </p>
        <Button asChild variant="outline" size="sm" className="shrink-0">
          <a
            href={`/api/preview/${resourceId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FilePdf weight="bold" className="size-4" aria-hidden />
            Read free preview
          </a>
        </Button>
      </div>
    </section>
  );
}
