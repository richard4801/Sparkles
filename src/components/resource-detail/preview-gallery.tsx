import { LockSimple, FilePdf } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

/** Document preview pages rendered as page "screenshots" — the actual title and
 *  opening text laid out like a printed page, not unrelated stock imagery. The
 *  first pages are readable; later pages are locked behind purchase. A real,
 *  truncated preview PDF is available to open before buying. */
export function PreviewGallery({
  resourceId,
  title,
  type,
  abstract,
  tableOfContents,
  pages,
}: {
  resourceId: string;
  title: string;
  type: string;
  abstract: string;
  tableOfContents: string[];
  pages: number;
}) {
  // Split the abstract into two readable "pages" of body text.
  const words = abstract.split(/\s+/);
  const half = Math.ceil(words.length / 2);
  const page1Body = words.slice(0, half).join(" ");
  const page2Body = words.slice(half).join(" ");

  return (
    <section aria-labelledby="preview-heading" id="preview">
      <div className="flex items-baseline justify-between">
        <h2
          id="preview-heading"
          className="font-display text-2xl font-extrabold tracking-tight text-foreground"
        >
          Preview
        </h2>
        <p className="text-sm text-muted-foreground">Showing 2 of {pages} pages</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {/* Page 1 — cover + start of abstract */}
        <PageCard n={1}>
          <p className="text-[6px] font-bold uppercase tracking-[0.12em] text-primary">
            {type}
          </p>
          <p className="mt-1 line-clamp-3 font-display text-[9px] font-bold leading-snug text-slate-900">
            {title}
          </p>
          <p className="mt-2 line-clamp-[11] text-[6px] leading-[1.7] text-slate-500">
            {page1Body}
          </p>
        </PageCard>

        {/* Page 2 — continuation + table of contents */}
        <PageCard n={2}>
          <p className="line-clamp-6 text-[6px] leading-[1.7] text-slate-500">
            {page2Body}
          </p>
          <p className="mt-2 text-[7px] font-bold text-slate-700">Contents</p>
          <ol className="mt-1 space-y-0.5">
            {tableOfContents.slice(0, 5).map((t, i) => (
              <li key={i} className="line-clamp-1 text-[6px] text-slate-500">
                {i + 1}. {t}
              </li>
            ))}
          </ol>
        </PageCard>

        {/* Pages 3 & 4 — locked */}
        <PageCard n={3} locked />
        <PageCard n={4} locked />
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

function PageCard({
  n,
  locked = false,
  children,
}: {
  n: number;
  locked?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-white shadow-[var(--shadow-xs)]">
      {locked ? (
        // A faux page of redacted text bars, blurred behind the lock.
        <div className="space-y-1.5 p-3.5 blur-[3px]">
          <div className="h-1.5 w-2/3 rounded bg-slate-300" />
          <div className="mt-3 h-1 w-full rounded bg-slate-200" />
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-1 rounded bg-slate-200"
              style={{ width: `${70 + ((i * 37) % 30)}%` }}
            />
          ))}
        </div>
      ) : (
        <div className="p-3.5">{children}</div>
      )}

      {locked ? (
        <div className="absolute inset-0 grid place-items-center bg-white/40">
          <span className="grid size-9 place-items-center rounded-full bg-surface/90 text-primary shadow-[var(--shadow-sm)]">
            <LockSimple weight="fill" className="size-4" aria-hidden />
          </span>
        </div>
      ) : (
        <span className="absolute bottom-2 left-2 rounded-md bg-foreground/70 px-1.5 py-0.5 text-[0.65rem] font-semibold text-white backdrop-blur">
          Page {n}
        </span>
      )}
    </div>
  );
}
