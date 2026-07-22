"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash, ShoppingBag, ArrowRight, ArrowLeft } from "@phosphor-icons/react";
import {
  subscribeCart,
  getCartSnapshot,
  getCartServerSnapshot,
  removeFromCart,
  cartTotal,
} from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { resourceImage, formatNaira } from "@/lib/utils";

export default function CartPage() {
  const cart = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getCartServerSnapshot,
  );
  const total = cartTotal(cart);

  return (
    <main id="main" className="container-page py-8 lg:py-12">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Your cart
      </h1>

      {cart.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong bg-surface-subtle/40 px-6 py-20 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary">
            <ShoppingBag weight="duotone" className="size-7" aria-hidden />
          </span>
          <h2 className="mt-5 font-display text-xl font-bold text-foreground">
            Your cart is empty
          </h2>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Browse the marketplace and add resources to get started.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/browse">
              Browse resources
              <ArrowRight weight="bold" className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <ul className="grid gap-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-xs)]"
              >
                <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={resourceImage(item.id)}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {item.type}
                  </p>
                  <Link
                    href={`/resource/${item.id}`}
                    className="line-clamp-2 font-display font-bold text-foreground hover:text-primary"
                  >
                    {item.title}
                  </Link>
                </div>
                <span className="font-display font-extrabold text-foreground">
                  {formatNaira(item.priceNaira)}
                </span>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.title}`}
                  className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-rose/10 hover:text-rose"
                >
                  <Trash weight="bold" className="size-5" aria-hidden />
                </button>
              </li>
            ))}
          </ul>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-sm)]">
              <h2 className="font-display text-lg font-bold text-foreground">
                Order summary
              </h2>
              <dl className="mt-4 grid gap-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    Items ({cart.length})
                  </dt>
                  <dd className="font-medium text-foreground">
                    {formatNaira(total)}
                  </dd>
                </div>
                <div className="mt-2 flex justify-between border-t border-border pt-3">
                  <dt className="font-bold text-foreground">Total</dt>
                  <dd className="font-display text-lg font-extrabold text-foreground">
                    {formatNaira(total)}
                  </dd>
                </div>
              </dl>
              <Button asChild size="lg" className="mt-5 w-full">
                <Link href="/checkout">
                  Proceed to checkout
                  <ArrowRight weight="bold" className="size-4" aria-hidden />
                </Link>
              </Button>
              <Link
                href="/browse"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft weight="bold" className="size-4" aria-hidden />
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
