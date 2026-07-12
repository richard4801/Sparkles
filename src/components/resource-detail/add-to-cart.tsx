"use client";

import { useSyncExternalStore } from "react";
import { ShoppingBagOpen, Check } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  subscribeCart,
  getCartSnapshot,
  getCartServerSnapshot,
  toggleCart,
  type CartItem,
} from "@/lib/cart";

export function AddToCart({ item }: { item: CartItem }) {
  const cart = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getCartServerSnapshot,
  );
  const inCart = cart.some((i) => i.id === item.id);

  return (
    <Button
      type="button"
      variant={inCart ? "secondary" : "outline"}
      size="lg"
      className="w-full"
      aria-pressed={inCart}
      onClick={() => toggleCart(item)}
    >
      {inCart ? (
        <>
          <Check weight="bold" className="size-5" aria-hidden />
          In cart
        </>
      ) : (
        <>
          <ShoppingBagOpen weight="bold" className="size-5" aria-hidden />
          Add to cart
        </>
      )}
    </Button>
  );
}
