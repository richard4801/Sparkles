"use client";

import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import {
  DotsThreeVertical,
  ArrowUp,
  ArrowDown,
  Trash,
} from "@phosphor-icons/react";
import { setUserRole, deleteUser } from "@/lib/admin-actions";

export function UserRowActions({
  userId,
  name,
  role,
  isSelf,
  adminCount,
}: {
  userId: string;
  name: string;
  role: string;
  isSelf: boolean;
  adminCount: number;
}) {
  const [pending, startTransition] = React.useTransition();
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const isAdmin = role === "admin";
  const canDemote = isAdmin && !isSelf && adminCount > 1;
  const canDelete = !isSelf && !isAdmin;

  function toggleRole() {
    startTransition(async () => {
      const res = await setUserRole(userId, isAdmin ? "user" : "admin");
      if (!res.ok && res.error) window.alert(res.error);
    });
  }

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            aria-label={`Actions for ${name}`}
            disabled={pending}
            className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-subtle hover:text-foreground disabled:opacity-50"
          >
            <DotsThreeVertical weight="bold" className="size-5" aria-hidden />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={6}
            className="z-[90] w-52 rounded-2xl border border-border bg-surface p-1.5 shadow-[var(--shadow-lg)]"
          >
            {!isAdmin ? (
              <DropdownMenu.Item
                onSelect={toggleRole}
                className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-foreground outline-none transition-colors data-[highlighted]:bg-surface-subtle"
              >
                <ArrowUp weight="bold" className="size-4 text-emerald" aria-hidden />
                Make admin
              </DropdownMenu.Item>
            ) : (
              <DropdownMenu.Item
                disabled={!canDemote}
                onSelect={(e) => {
                  if (!canDemote) {
                    e.preventDefault();
                    return;
                  }
                  toggleRole();
                }}
                className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-foreground outline-none transition-colors data-[highlighted]:bg-surface-subtle data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40"
              >
                <ArrowDown weight="bold" className="size-4 text-muted-foreground" aria-hidden />
                Revoke admin
              </DropdownMenu.Item>
            )}

            {canDelete ? (
              <>
                <div className="my-1 h-px bg-border" />
                <DropdownMenu.Item
                  onSelect={(e) => {
                    e.preventDefault();
                    setConfirmOpen(true);
                  }}
                  className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-rose outline-none transition-colors data-[highlighted]:bg-rose/5"
                >
                  <Trash weight="bold" className="size-4" aria-hidden />
                  Delete user
                </DropdownMenu.Item>
              </>
            ) : null}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {/* Controlled confirm dialog for deletion (opened from the menu). */}
      <ConfirmDialogController
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        name={name}
        onConfirm={() => deleteUser(userId)}
      />
    </>
  );
}

/** Thin wrapper so the dropdown item can open a confirm dialog imperatively. */
function ConfirmDialogController({
  open,
  onOpenChange,
  name,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  name: string;
  onConfirm: () => ReturnType<typeof deleteUser>;
}) {
  const [error, setError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();
  const D = Dialog;

  function confirm() {
    setError(null);
    startTransition(async () => {
      const res = await onConfirm();
      if (!res.ok) {
        setError(res.error ?? "Could not delete user.");
        return;
      }
      onOpenChange(false);
    });
  }

  return (
    <D.Root open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setError(null); }}>
      <D.Portal>
        <D.Overlay className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm data-[state=open]:animate-[fade-in_0.2s_ease]" />
        <D.Content className="fixed left-1/2 top-1/2 z-[110] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-lg)] focus:outline-none">
          <D.Title className="font-display text-lg font-bold text-foreground">Delete user?</D.Title>
          <D.Description className="mt-1 text-sm text-muted-foreground">
            {name}&apos;s account and all their orders, purchases and activity will be permanently removed.
          </D.Description>
          {error ? (
            <p className="mt-4 rounded-xl bg-rose/10 px-3 py-2 text-sm font-medium text-rose">{error}</p>
          ) : null}
          <div className="mt-6 flex justify-end gap-3">
            <D.Close asChild>
              <button type="button" className="h-9 rounded-full border border-border-strong bg-surface px-4 text-sm font-semibold text-foreground hover:border-primary/40">
                Cancel
              </button>
            </D.Close>
            <button
              type="button"
              onClick={confirm}
              disabled={pending}
              className="h-9 rounded-full bg-rose px-4 text-sm font-semibold text-white hover:bg-rose/90 disabled:opacity-50"
            >
              {pending ? "Deleting…" : "Delete"}
            </button>
          </div>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}
