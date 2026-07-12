"use client";

import * as React from "react";
import { BagSimple, Tag, Sparkle, Info, Check } from "@phosphor-icons/react";
import type { DashNotification } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const kindIcon = {
  purchase: BagSimple,
  "price-drop": Tag,
  "new-match": Sparkle,
  system: Info,
} as const;

const kindAccent = {
  purchase: "bg-violet/10 text-violet",
  "price-drop": "bg-emerald/10 text-emerald",
  "new-match": "bg-blue/10 text-blue",
  system: "bg-amber/10 text-amber",
} as const;

export function NotificationsFeed({ items }: { items: DashNotification[] }) {
  const [read, setRead] = React.useState<Record<string, boolean>>(
    () => Object.fromEntries(items.map((n) => [n.id, n.read])),
  );
  const unread = items.filter((n) => !read[n.id]).length;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {unread > 0 ? `${unread} unread` : "You are all caught up"}
        </p>
        <button
          type="button"
          disabled={unread === 0}
          onClick={() => setRead(Object.fromEntries(items.map((n) => [n.id, true])))}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover disabled:text-faint-foreground"
        >
          <Check weight="bold" className="size-4" aria-hidden />
          Mark all as read
        </button>
      </div>

      <ul className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-xs)]">
        {items.map((n) => {
          const Icon = kindIcon[n.kind];
          const isRead = read[n.id];
          return (
            <li
              key={n.id}
              className={cn(
                "flex gap-4 border-b border-border px-4 py-4 last:border-0 sm:px-5",
                !isRead && "bg-primary-tint/50",
              )}
            >
              <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl", kindAccent[n.kind])}>
                <Icon weight="fill" className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground">{n.title}</p>
                  {!isRead ? (
                    <span className="size-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />
                  ) : null}
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                <p className="mt-1 text-xs text-faint-foreground">{n.time}</p>
              </div>
              {!isRead ? (
                <button
                  type="button"
                  onClick={() => setRead((r) => ({ ...r, [n.id]: true }))}
                  className="shrink-0 self-start text-xs font-semibold text-primary hover:text-primary-hover"
                >
                  Mark read
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
