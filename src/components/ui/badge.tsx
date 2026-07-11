import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-semibold leading-none transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-primary-soft text-primary",
        neutral: "bg-surface-subtle text-muted-foreground",
        outline: "border border-border-strong text-muted-foreground",
        solid: "bg-primary text-primary-foreground",
        success: "bg-[#e6f7ef] text-emerald",
      },
      size: {
        sm: "px-2.5 py-1 text-[0.7rem]",
        md: "px-3 py-1.5 text-xs",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
