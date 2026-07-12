"use client";

import { useEffect } from "react";
import { clearCart } from "@/lib/cart";

/** Empties the cart once, after a completed order. */
export function ClearCartOnMount() {
  useEffect(() => {
    clearCart();
  }, []);
  return null;
}
