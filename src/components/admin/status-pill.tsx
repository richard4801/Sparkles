import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  Paid: "bg-[#e6f7ef] text-emerald",
  Pending: "bg-amber/10 text-amber",
  Refunded: "bg-surface-subtle text-muted-foreground",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        styles[status] ?? "bg-surface-subtle text-muted-foreground",
      )}
    >
      {status}
    </span>
  );
}
