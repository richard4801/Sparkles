"use client";

import * as React from "react";
import Link from "next/link";
import { useSyncExternalStore, useTransition } from "react";
import { Lightning, ShieldCheck } from "@phosphor-icons/react";
import {
  subscribeCart,
  getCartSnapshot,
  getCartServerSnapshot,
  cartTotal,
} from "@/lib/cart";
import { startCheckout } from "@/lib/checkout-actions";
import type { Provider } from "@/lib/payments";
import { Button } from "@/components/ui/button";
import { formatNaira, cn } from "@/lib/utils";

const methods: { id: Provider; label: string; dot: string }[] = [
  { id: "paystack", label: "Paystack", dot: "bg-[#0fa958]" },
  { id: "flutterwave", label: "Flutterwave", dot: "bg-[#f5a623]" },
];

export function CheckoutForm({
  email,
  simulate,
}: {
  email: string;
  simulate: boolean;
}) {
  const cart = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getCartServerSnapshot,
  );
  const [provider, setProvider] = React.useState<Provider>("paystack");
  const [pending, startTransition] = useTransition();
  const total = cartTotal(cart);

  if (cart.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border-strong bg-surface-subtle/40 px-6 py-16 text-center">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Button asChild size="md" className="mt-4">
          <Link href="/browse">Browse resources</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      {/* Left: contact + payment method */}
      <div className="grid gap-6">
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-xs)]">
          <h2 className="font-display text-lg font-bold text-foreground">Contact</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your receipt and downloads go to
          </p>
          <p className="font-medium text-foreground">{email}</p>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-xs)]">
          <h2 className="font-display text-lg font-bold text-foreground">
            Payment method
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {methods.map((m) => {
              const active = provider === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setProvider(m.id)}
                  aria-pressed={active}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-4 text-left transition-colors",
                    active
                      ? "border-primary bg-primary-tint"
                      : "border-border-strong hover:border-primary/40",
                  )}
                >
                  <span className={cn("size-2.5 rounded-full", m.dot)} aria-hidden />
                  <span className="font-semibold text-foreground">{m.label}</span>
                  <span
                    className={cn(
                      "ml-auto grid size-5 place-items-center rounded-full border",
                      active ? "border-primary bg-primary" : "border-border-strong",
                    )}
                  >
                    {active ? (
                      <span className="size-2 rounded-full bg-white" aria-hidden />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
          {simulate ? (
            <p className="mt-4 rounded-xl bg-amber/10 px-3.5 py-2.5 text-xs text-amber">
              Demo mode: no payment keys configured, so checkout completes
              instantly without charging. Add Paystack or Flutterwave keys to go
              live.
            </p>
          ) : null}
        </section>
      </div>

      {/* Right: summary */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-sm)]">
          <h2 className="font-display text-lg font-bold text-foreground">
            Order summary
          </h2>
          <ul className="mt-4 grid gap-2 text-sm">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <span className="line-clamp-1 text-muted-foreground">{item.title}</span>
                <span className="shrink-0 font-medium text-foreground">
                  {formatNaira(item.priceNaira)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4">
            <span className="font-bold text-foreground">Total</span>
            <span className="font-display text-xl font-extrabold text-foreground">
              {formatNaira(total)}
            </span>
          </div>

          <Button
            type="button"
            size="lg"
            className="mt-5 w-full"
            disabled={pending}
            onClick={() => startTransition(() => startCheckout(cart, provider))}
          >
            {pending ? (
              "Processing..."
            ) : (
              <>
                <Lightning weight="fill" className="size-5" aria-hidden />
                Pay {formatNaira(total)}
              </>
            )}
          </Button>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck weight="fill" className="size-4 text-emerald" aria-hidden />
            Secure payment. You can download immediately after.
          </p>
        </div>
      </aside>
    </div>
  );
}
