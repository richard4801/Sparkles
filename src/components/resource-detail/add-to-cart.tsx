"use client";

import * as React from "react";
import { ShoppingBagOpen, Check } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function AddToCart({ title }: { title: string }) {
  const [added, setAdded] = React.useState(false);
  return (
    <Button
      type="button"
      variant={added ? "secondary" : "outline"}
      size="lg"
      className="w-full"
      aria-live="polite"
      onClick={() => setAdded((v) => !v)}
    >
      {added ? (
        <>
          <Check weight="bold" className="size-5" aria-hidden />
          Added to cart
        </>
      ) : (
        <>
          <ShoppingBagOpen weight="bold" className="size-5" aria-hidden />
          Add to cart
        </>
      )}
      <span className="sr-only">{title}</span>
    </Button>
  );
}
