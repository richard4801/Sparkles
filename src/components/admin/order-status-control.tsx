"use client";

import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CaretDown, Check } from "@phosphor-icons/react";
import { setOrderStatus } from "@/lib/admin-actions";
import { cn } from "@/lib/utils";

const STATUSES = ["Paid", "Pending", "Refunded"] as const;

const pill: Record<string, string> = {
  Paid: "bg-[#e6f7ef] text-emerald",
  Pending: "bg-amber/10 text-amber",
  Refunded: "bg-surface-subtle text-muted-foreground",
};

export function OrderStatusControl({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) {
  const [pending, startTransition] = React.useTransition();

  function change(next: string) {
    if (next === status) return;
    startTransition(async () => {
      const res = await setOrderStatus(orderId, next);
      if (!res.ok && res.error) window.alert(res.error);
    });
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          disabled={pending}
          aria-label={`Change status for ${orderId}`}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-opacity disabled:opacity-50",
            pill[status] ?? "bg-surface-subtle text-muted-foreground",
          )}
        >
          {status}
          <CaretDown weight="bold" className="size-3" aria-hidden />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          className="z-[90] w-40 rounded-2xl border border-border bg-surface p-1.5 shadow-[var(--shadow-lg)]"
        >
          {STATUSES.map((s) => (
            <DropdownMenu.Item
              key={s}
              onSelect={() => change(s)}
              className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm text-foreground outline-none transition-colors data-[highlighted]:bg-surface-subtle"
            >
              {s}
              {s === status ? (
                <Check weight="bold" className="size-4 text-primary" aria-hidden />
              ) : null}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
