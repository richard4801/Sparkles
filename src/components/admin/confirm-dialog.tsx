"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Warning } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/lib/admin-actions";

/** Generic destructive-action confirmation. The trigger is provided by the
 *  caller; onConfirm runs a server action and any error is surfaced inline. */
export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel = "Delete",
  onConfirm,
  onDone,
}: {
  trigger: React.ReactNode;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => Promise<ActionResult>;
  onDone?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();

  function handleConfirm() {
    setError(null);
    startTransition(async () => {
      const res = await onConfirm();
      if (res && !res.ok) {
        setError(res.error ?? "Something went wrong.");
        return;
      }
      setOpen(false);
      onDone?.();
    });
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setError(null);
      }}
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm data-[state=open]:animate-[fade-in_0.2s_ease]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[110] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-lg)] focus:outline-none data-[state=open]:animate-[fade-in_0.2s_ease]">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-rose/10 text-rose">
              <Warning weight="fill" className="size-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <Dialog.Title className="font-display text-lg font-bold text-foreground">
                {title}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                {description}
              </Dialog.Description>
            </div>
          </div>

          {error ? (
            <p className="mt-4 rounded-xl bg-rose/10 px-3 py-2 text-sm font-medium text-rose">
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <Button type="button" variant="outline" size="sm">
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              type="button"
              size="sm"
              onClick={handleConfirm}
              disabled={pending}
              className="bg-rose text-white hover:bg-rose/90"
            >
              {pending ? "Working…" : confirmLabel}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
