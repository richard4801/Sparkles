"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  LockSimple,
  X,
  CaretLeft,
  CaretRight,
  Lightning,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

type PageContent =
  | { kind: "cover"; type: string; title: string; body: string }
  | { kind: "body"; heading?: string; body: string; toc?: string[] }
  | { kind: "image"; src: string };

interface PreviewPage {
  n: number;
  locked: boolean;
  content: PageContent;
}

/** In-site document preview. Every page is clickable and opens a reader modal —
 *  no leaving the site, no download. The opening pages are readable by anyone;
 *  later pages are locked until the resource is purchased (admins and buyers see
 *  everything). Clicking a locked page you don't own prompts you to buy. */
export function PreviewGallery({
  resourceId,
  title,
  type,
  abstract,
  tableOfContents,
  pages,
  owned = false,
  previewImages = null,
}: {
  resourceId: string;
  title: string;
  type: string;
  abstract: string;
  tableOfContents: string[];
  pages: number;
  owned?: boolean;
  previewImages?: string[] | null;
}) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const FREE = 2;

  // Split the abstract into two readable opening pages, then synthesise the
  // start of the first chapters for the locked pages.
  const words = abstract.split(/\s+/);
  const half = Math.ceil(words.length / 2);
  const page1Body = words.slice(0, half).join(" ");
  const page2Body = words.slice(half).join(" ");
  const chapterBody = (heading: string) =>
    `${heading}. ${abstract} This chapter develops the study's central argument in full, ` +
    `setting out the background to the problem, the specific objectives that guide the work, ` +
    `and the scope within which the findings should be read. Each section that follows expands ` +
    `on the summary above with the supporting data, analysis and references in complete detail.`;

  // Prefer admin-uploaded page screenshots; otherwise synthesise pages from the
  // abstract and table of contents.
  const previewPages: PreviewPage[] =
    previewImages && previewImages.length > 0
      ? previewImages.map((_, i) => ({
          n: i + 1,
          locked: i >= FREE,
          content: { kind: "image", src: `/api/preview/${resourceId}/${i}` },
        }))
      : [
          {
            n: 1,
            locked: false,
            content: { kind: "cover", type, title, body: page1Body },
          },
          {
            n: 2,
            locked: false,
            content: {
              kind: "body",
              body: page2Body,
              toc: tableOfContents.slice(0, 6),
            },
          },
          {
            n: 3,
            locked: true,
            content: {
              kind: "body",
              heading: tableOfContents[0] || "Chapter One: Introduction",
              body: chapterBody(tableOfContents[0] || "Chapter One: Introduction"),
            },
          },
          {
            n: 4,
            locked: true,
            content: {
              kind: "body",
              heading: tableOfContents[1] || "Chapter Two: Literature Review",
              body: chapterBody(tableOfContents[1] || "Chapter Two: Literature Review"),
            },
          },
        ];

  const openAt = (i: number) => {
    setActive(i);
    setOpen(true);
  };
  const go = (dir: -1 | 1) =>
    setActive((i) => Math.min(previewPages.length - 1, Math.max(0, i + dir)));

  const current = previewPages[active];
  const currentObscured = current.locked && !owned;

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
          {owned ? `All ${pages} pages` : `Showing 2 of ${pages} pages`}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {previewPages.map((p, i) => {
          const obscured = p.locked && !owned;
          return (
            <button
              key={p.n}
              type="button"
              onClick={() => openAt(i)}
              aria-label={
                obscured ? `Page ${p.n}, locked — purchase to read` : `Read page ${p.n}`
              }
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-white text-left shadow-[var(--shadow-xs)] outline-none transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-md)] focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              {obscured ? (
                <FauxPage />
              ) : (
                <div className="p-3.5">
                  <PageBody content={p.content} variant="thumb" />
                </div>
              )}

              {obscured ? (
                <div className="absolute inset-0 grid place-items-center bg-white/40 transition-colors group-hover:bg-white/25">
                  <span className="grid size-9 place-items-center rounded-full bg-surface/90 text-primary shadow-[var(--shadow-sm)]">
                    <LockSimple weight="fill" className="size-4" aria-hidden />
                  </span>
                </div>
              ) : (
                <span className="absolute bottom-2 left-2 rounded-md bg-foreground/70 px-1.5 py-0.5 text-[0.65rem] font-semibold text-white backdrop-blur">
                  Page {p.n}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        Click any page to read it here.{" "}
        {owned
          ? "You have full access to this document."
          : "The first pages are free — buy to unlock the rest."}
      </p>

      {/* Reader modal */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-foreground/60 backdrop-blur-sm data-[state=open]:animate-[fade-in_0.2s_ease]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[90] flex max-h-[92dvh] w-[94vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-surface shadow-[var(--shadow-lg)] focus:outline-none data-[state=open]:animate-[fade-in_0.2s_ease]">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
              <Dialog.Title className="truncate text-sm font-semibold text-foreground">
                {title}
              </Dialog.Title>
              <div className="flex items-center gap-1">
                <span className="mr-1 text-xs font-medium text-muted-foreground">
                  Page {current.n}
                </span>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={active === 0}
                  aria-label="Previous page"
                  className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-subtle disabled:opacity-30"
                >
                  <CaretLeft weight="bold" className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  disabled={active === previewPages.length - 1}
                  aria-label="Next page"
                  className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-subtle disabled:opacity-30"
                >
                  <CaretRight weight="bold" className="size-4" aria-hidden />
                </button>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close preview"
                    className="ml-1 grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-subtle"
                  >
                    <X weight="bold" className="size-4" aria-hidden />
                  </button>
                </Dialog.Close>
              </div>
            </div>

            <div className="overflow-y-auto bg-surface-subtle/60 p-4 sm:p-6">
              {currentObscured ? (
                <LockedPanel pages={pages} onBuy={() => setOpen(false)} />
              ) : (
                <div className="mx-auto max-w-xl rounded-xl border border-border bg-white p-7 shadow-[var(--shadow-sm)] sm:p-10">
                  <PageBody content={current.content} variant="full" />
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

/** Renders a page's content at thumbnail or full-reader scale. */
function PageBody({
  content,
  variant,
}: {
  content: PageContent;
  variant: "thumb" | "full";
}) {
  const s =
    variant === "thumb"
      ? {
          eyebrow: "text-[6px] tracking-[0.12em]",
          title: "text-[9px] leading-snug",
          body: "text-[6px] leading-[1.7]",
          heading: "text-[7px]",
          bodyClamp: "line-clamp-[11]",
          gap: "mt-2",
        }
      : {
          eyebrow: "text-xs tracking-[0.16em]",
          title: "text-2xl leading-tight",
          body: "text-[0.95rem] leading-relaxed",
          heading: "text-base",
          bodyClamp: "",
          gap: "mt-4",
        };

  if (content.kind === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={content.src}
        alt=""
        className={
          variant === "thumb"
            ? "absolute inset-0 size-full object-cover"
            : "mx-auto max-h-[70dvh] w-auto rounded-md"
        }
      />
    );
  }

  if (content.kind === "cover") {
    return (
      <>
        <p className={`font-bold uppercase text-primary ${s.eyebrow}`}>
          {content.type}
        </p>
        <p className={`mt-1 font-display font-bold text-slate-900 ${s.title}`}>
          {content.title}
        </p>
        <p className={`text-slate-600 ${s.body} ${s.gap} ${s.bodyClamp}`}>
          {content.body}
        </p>
      </>
    );
  }

  return (
    <>
      {content.heading ? (
        <p className={`font-display font-bold text-slate-900 ${s.heading}`}>
          {content.heading}
        </p>
      ) : null}
      <p
        className={`text-slate-600 ${s.body} ${content.heading ? s.gap : ""} ${
          content.toc ? s.bodyClamp : ""
        }`}
      >
        {content.body}
      </p>
      {content.toc && content.toc.length ? (
        <>
          <p className={`mt-2 font-bold text-slate-700 ${s.heading}`}>Contents</p>
          <ol className={`mt-1 space-y-0.5 text-slate-600 ${s.body}`}>
            {content.toc.map((t, i) => (
              <li key={i} className={variant === "thumb" ? "line-clamp-1" : ""}>
                {i + 1}. {t}
              </li>
            ))}
          </ol>
        </>
      ) : null}
    </>
  );
}

/** Blurred filler bars for a locked thumbnail. */
function FauxPage() {
  return (
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
  );
}

/** Shown in the reader when the viewer opens a page they haven't paid for. */
function LockedPanel({ pages, onBuy }: { pages: number; onBuy: () => void }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-xl border border-dashed border-border-strong bg-white px-6 py-14 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary">
        <LockSimple weight="fill" className="size-7" aria-hidden />
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-foreground">
        This page is locked
      </h3>
      <p className="mt-2 text-muted-foreground">
        You haven&apos;t purchased this resource yet. Buy it once to read all{" "}
        {pages} pages here — no download needed.
      </p>
      <Button asChild size="lg" className="mt-6" onClick={onBuy}>
        <a href="#buy">
          <Lightning weight="fill" className="size-5" aria-hidden />
          Buy to unlock
        </a>
      </Button>
    </div>
  );
}
