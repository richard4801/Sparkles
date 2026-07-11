"use client";

import * as React from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import {
  MagnifyingGlass,
  Heart,
  ShoppingBag,
  List,
  X,
  CaretDown,
  ArrowRight,
} from "@phosphor-icons/react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "@/components/category-icon";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";

const resourceTypes = [
  { label: "Research Projects", desc: "Full final-year projects", href: "/browse?type=research-project" },
  { label: "Past Questions", desc: "Exam papers by course", href: "/browse?type=past-questions" },
  { label: "Business Plans", desc: "Investor-ready templates", href: "/browse?type=business-plan" },
  { label: "Journals", desc: "Peer-reviewed articles", href: "/browse?type=journal" },
  { label: "Seminar Papers", desc: "Presentation-ready drafts", href: "/browse?type=seminar-paper" },
  { label: "Feasibility Studies", desc: "Costed market reports", href: "/browse?type=feasibility-study" },
];

const topLinks = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
];

const accentText: Record<string, string> = {
  violet: "text-violet",
  blue: "text-blue",
  emerald: "text-emerald",
  amber: "text-amber",
  rose: "text-rose",
  cyan: "text-cyan",
};

function BrowseMega() {
  const [open, setOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="static"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3 py-2 text-[0.95rem] font-medium text-muted-foreground transition-colors hover:text-foreground",
          open && "text-foreground",
        )}
      >
        Browse
        <CaretDown
          weight="bold"
          className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="absolute inset-x-0 top-full z-50 pt-3"
          >
            <div className="container-page">
              <div className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-lg)] lg:grid-cols-[1.1fr_1.1fr_0.9fr]">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-faint-foreground">
                    Resource types
                  </p>
                  <ul className="grid gap-1">
                    {resourceTypes.map((r) => (
                      <li key={r.label}>
                        <a
                          href={r.href}
                          className="group flex flex-col rounded-xl px-3 py-2 transition-colors hover:bg-primary-tint"
                        >
                          <span className="text-[0.95rem] font-semibold text-foreground group-hover:text-primary">
                            {r.label}
                          </span>
                          <span className="text-xs text-muted-foreground">{r.desc}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-faint-foreground">
                    Top categories
                  </p>
                  <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                    {categories.slice(0, 8).map((c) => (
                      <li key={c.slug}>
                        <a
                          href={`/browse?category=${c.slug}`}
                          className="group flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors hover:bg-primary-tint"
                        >
                          <CategoryIcon
                            name={c.iconName}
                            className={cn("size-5", accentText[c.accent])}
                            aria-hidden
                          />
                          <span className="text-[0.9rem] font-medium text-foreground group-hover:text-primary">
                            {c.name}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="/browse"
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#8b6bff] p-5 text-primary-foreground"
                >
                  <div>
                    <p className="font-display text-lg font-bold leading-tight">
                      Explore the full library
                    </p>
                    <p className="mt-1 text-sm text-white/80">
                      Over 12,000 vetted resources across 148 institutions.
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Browse everything
                    <ArrowRight
                      weight="bold"
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileDrawer() {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="grid size-11 place-items-center rounded-full text-foreground transition-colors hover:bg-surface-subtle lg:hidden"
        >
          <List weight="bold" className="size-6" aria-hidden />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-foreground/40 backdrop-blur-sm data-[state=open]:animate-[fade-in_0.2s_ease]" />
        <Dialog.Content
          className="fixed inset-y-0 right-0 z-[80] flex w-[86%] max-w-sm flex-col overflow-y-auto bg-surface p-6 shadow-[var(--shadow-lg)] focus:outline-none data-[state=open]:animate-[slide-in-right_0.28s_cubic-bezier(0.16,1,0.3,1)]"
        >
          <div className="flex items-center justify-between">
            <Logo />
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-subtle"
              >
                <X weight="bold" className="size-5" aria-hidden />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>

          <div className="mt-6 flex items-center gap-2 rounded-[var(--radius-sm)] border border-border-strong bg-surface-subtle px-3.5">
            <MagnifyingGlass weight="bold" className="size-4 text-faint-foreground" aria-hidden />
            <input
              type="search"
              placeholder="Search resources..."
              className="h-11 w-full bg-transparent text-sm text-foreground placeholder:text-faint-foreground focus:outline-none"
            />
          </div>

          <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
            <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-faint-foreground">
              Browse
            </p>
            {resourceTypes.map((r) => (
              <a
                key={r.label}
                href={r.href}
                className="rounded-xl px-3 py-2.5 text-[0.98rem] font-medium text-foreground transition-colors hover:bg-primary-tint hover:text-primary"
              >
                {r.label}
              </a>
            ))}
            <div className="my-2 h-px bg-border" />
            {topLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-xl px-3 py-2.5 text-[0.98rem] font-medium text-foreground transition-colors hover:bg-primary-tint hover:text-primary"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/wishlist"
              className="rounded-xl px-3 py-2.5 text-[0.98rem] font-medium text-foreground transition-colors hover:bg-primary-tint hover:text-primary"
            >
              Wishlist
            </a>
            <a
              href="/cart"
              className="rounded-xl px-3 py-2.5 text-[0.98rem] font-medium text-foreground transition-colors hover:bg-primary-tint hover:text-primary"
            >
              Cart
            </a>
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Button asChild variant="outline" size="lg">
              <a href="/login">Log in</a>
            </Button>
            <Button asChild size="lg">
              <a href="/register">Create free account</a>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function IconLink({
  href,
  label,
  count,
  children,
}: {
  href: string;
  label: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={count ? `${label}, ${count} items` : label}
      className="relative grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-subtle hover:text-foreground"
    >
      {children}
      {count ? (
        <span className="absolute right-1.5 top-1.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[0.6rem] font-bold text-primary-foreground">
          {count}
        </span>
      ) : null}
    </a>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 8;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-surface/85 backdrop-blur-xl"
          : "border-b border-transparent bg-background/0",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <div className="flex items-center gap-1">
          <Link href="/" aria-label="Sparklyn home">
            <Logo />
          </Link>
          <nav className="ml-4 hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            <BrowseMega />
            {topLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-full px-3 py-2 text-[0.95rem] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <IconLink href="/search" label="Search">
            <MagnifyingGlass weight="bold" className="size-[1.35rem]" aria-hidden />
          </IconLink>
          <IconLink href="/wishlist" label="Wishlist" count={3}>
            <Heart weight="bold" className="size-[1.35rem]" aria-hidden />
          </IconLink>
          <IconLink href="/cart" label="Cart" count={2}>
            <ShoppingBag weight="bold" className="size-[1.35rem]" aria-hidden />
          </IconLink>

          <div className="ml-1 hidden items-center gap-2 lg:flex">
            <Button asChild variant="ghost" size="sm">
              <a href="/login">Log in</a>
            </Button>
            <Button asChild size="sm">
              <a href="/register">Get started</a>
            </Button>
          </div>

          <MobileDrawer />
        </div>
      </div>
    </header>
  );
}
