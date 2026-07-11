"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlass, FileText, FolderSimple, ArrowRight } from "@phosphor-icons/react";
import { addRecentSearch } from "@/lib/recent-searches";
import { cn } from "@/lib/utils";

export interface ResourceIndexItem {
  id: string;
  title: string;
  type: string;
  category: string;
}

type Suggestion =
  | { kind: "resource"; id: string; title: string; sub: string }
  | { kind: "category"; slug: string; name: string }
  | { kind: "query"; text: string };

export function SearchBox({
  resourceIndex,
  categories,
  initialQuery = "",
  size = "lg",
  autoFocus = false,
}: {
  resourceIndex: ResourceIndexItem[];
  categories: { slug: string; name: string }[];
  initialQuery?: string;
  size?: "lg" | "md";
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const [value, setValue] = React.useState(initialQuery);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const suggestions = React.useMemo<Suggestion[]>(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [];
    const res: Suggestion[] = resourceIndex
      .filter((r) => `${r.title} ${r.category} ${r.type}`.toLowerCase().includes(q))
      .slice(0, 5)
      .map((r) => ({ kind: "resource", id: r.id, title: r.title, sub: `${r.type} · ${r.category}` }));
    const cats: Suggestion[] = categories
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 3)
      .map((c) => ({ kind: "category", slug: c.slug, name: c.name }));
    return [...res, ...cats, { kind: "query", text: value.trim() }];
  }, [value, resourceIndex, categories]);

  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function go(s: Suggestion) {
    setOpen(false);
    if (s.kind === "resource") router.push(`/resource/${s.id}`);
    else if (s.kind === "category") router.push(`/browse?category=${s.slug}`);
    else {
      addRecentSearch(s.text);
      router.push(`/search?q=${encodeURIComponent(s.text)}`);
    }
  }

  function submit() {
    const t = value.trim();
    if (!t) return;
    addRecentSearch(t);
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(t)}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open || !suggestions.length) {
      if (e.key === "Enter") submit();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a <= 0 ? suggestions.length - 1 : a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0) go(suggestions[active]);
      else submit();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <div
        className={cn(
          "flex items-center gap-2.5 rounded-full border border-border-strong bg-surface px-4 shadow-[var(--shadow-sm)] transition-colors focus-within:border-primary/50",
          size === "lg" ? "h-14" : "h-11",
        )}
      >
        <MagnifyingGlass weight="bold" className="size-5 shrink-0 text-faint-foreground" aria-hidden />
        <input
          type="search"
          role="combobox"
          aria-expanded={open}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          autoFocus={autoFocus}
          value={value}
          placeholder="Search projects, courses, institutions..."
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => value.trim() && setOpen(true)}
          onKeyDown={onKeyDown}
          className="h-full w-full bg-transparent text-[0.98rem] text-foreground placeholder:text-faint-foreground focus:outline-none"
        />
        <button
          type="button"
          onClick={submit}
          className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover sm:block"
        >
          Search
        </button>
      </div>

      {open && suggestions.length > 0 ? (
        <ul
          id="search-suggestions"
          role="listbox"
          className="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-border bg-surface p-1.5 shadow-[var(--shadow-lg)]"
        >
          {suggestions.map((s, i) => {
            const isActive = i === active;
            const key =
              s.kind === "resource" ? `r-${s.id}` : s.kind === "category" ? `c-${s.slug}` : "q";
            return (
              <li key={key} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(s)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                    isActive ? "bg-primary-tint" : "hover:bg-surface-subtle",
                  )}
                >
                  {s.kind === "resource" ? (
                    <>
                      <FileText weight="duotone" className="size-5 shrink-0 text-primary" aria-hidden />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-foreground">
                          {s.title}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">{s.sub}</span>
                      </span>
                    </>
                  ) : s.kind === "category" ? (
                    <>
                      <FolderSimple weight="duotone" className="size-5 shrink-0 text-blue" aria-hidden />
                      <span className="flex-1 text-sm font-medium text-foreground">
                        Browse {s.name}
                      </span>
                    </>
                  ) : (
                    <>
                      <MagnifyingGlass weight="bold" className="size-5 shrink-0 text-faint-foreground" aria-hidden />
                      <span className="flex-1 text-sm text-foreground">
                        Search for <span className="font-semibold">&ldquo;{s.text}&rdquo;</span>
                      </span>
                      <ArrowRight weight="bold" className="size-4 text-faint-foreground" aria-hidden />
                    </>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
