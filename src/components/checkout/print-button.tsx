"use client";

import { Printer } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button type="button" variant="outline" size="md" onClick={() => window.print()}>
      <Printer weight="bold" className="size-4" aria-hidden />
      Print / Save PDF
    </Button>
  );
}
