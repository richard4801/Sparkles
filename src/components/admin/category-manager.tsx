"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, PencilSimple, Trash, Warning } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/admin-actions";
import { CATEGORY_ACCENTS } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export interface CategoryRow {
  id: number;
  name: string;
  accent: string;
  iconName: string;
  resources: number;
}

const swatch: Record<string, string> = {
  violet: "bg-violet",
  blue: "bg-blue",
  emerald: "bg-emerald",
  amber: "bg-amber",
  rose: "bg-rose",
  cyan: "bg-cyan",
};

function AccentPicker({ value, name }: { value: string; name: string }) {
  const [selected, setSelected] = React.useState(value);
  return (
    <div className="flex flex-wrap gap-2">
      <input type="hidden" name={name} value={selected} />
      {CATEGORY_ACCENTS.map((a) => (
        <button
          key={a}
          type="button"
          aria-label={a}
          aria-pressed={selected === a}
          onClick={() => setSelected(a)}
          className={cn(
            "size-7 rounded-full ring-offset-2 ring-offset-surface transition-all",
            swatch[a] ?? "bg-border-strong",
            selected === a ? "ring-2 ring-foreground" : "hover:scale-110",
          )}
        />
      ))}
    </div>
  );
}

function EditCategoryDialog({ category }: { category: CategoryRow }) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updateCategory(category.id, fd);
      if (!res.ok) {
        setError(res.error ?? "Could not save.");
        return;
      }
      setOpen(false);
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`Edit ${category.name}`}
          className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-subtle hover:text-foreground"
        >
          <PencilSimple weight="bold" className="size-4" aria-hidden />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-foreground/40 backdrop-blur-sm data-[state=open]:animate-[fade-in_0.2s_ease]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[110] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-lg)] focus:outline-none data-[state=open]:animate-[fade-in_0.2s_ease]">
          <Dialog.Title className="font-display text-lg font-bold text-foreground">
            Edit category
          </Dialog.Title>
          <form onSubmit={onSubmit} className="mt-5 grid gap-4">
            <div>
              <label htmlFor={`cat-name-${category.id}`} className="mb-1.5 block text-sm font-semibold text-foreground">
                Name
              </label>
              <Input id={`cat-name-${category.id}`} name="name" defaultValue={category.name} className="h-12" required />
            </div>
            <div>
              <span className="mb-1.5 block text-sm font-semibold text-foreground">Accent</span>
              <AccentPicker value={category.accent} name="accent" />
            </div>
            {error ? (
              <p className="flex items-center gap-2 rounded-xl bg-rose/10 px-3 py-2 text-sm font-medium text-rose">
                <Warning weight="fill" className="size-4 shrink-0" aria-hidden />
                {error}
              </p>
            ) : null}
            <div className="mt-1 flex justify-end gap-3">
              <Dialog.Close asChild>
                <Button type="button" variant="outline" size="sm">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" size="sm" disabled={pending}>
                {pending ? "Saving…" : "Save"}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function CategoryManager({ categories }: { categories: CategoryRow[] }) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();

  function onAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createCategory(fd);
      if (!res.ok) {
        setError(res.error ?? "Could not add category.");
        return;
      }
      formRef.current?.reset();
    });
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-xs)]">
        <h2 className="font-display text-lg font-bold text-foreground">Add category</h2>
        <form ref={formRef} onSubmit={onAdd} className="mt-4 flex flex-wrap items-end gap-4">
          <div className="min-w-[12rem] flex-1">
            <label htmlFor="new-cat-name" className="mb-1.5 block text-sm font-semibold text-foreground">
              Name
            </label>
            <Input id="new-cat-name" name="name" placeholder="e.g. Engineering" className="h-12" required />
          </div>
          <div>
            <span className="mb-1.5 block text-sm font-semibold text-foreground">Accent</span>
            <AccentPicker value={CATEGORY_ACCENTS[0]} name="accent" />
          </div>
          <Button type="submit" size="md" disabled={pending}>
            <Plus weight="bold" className="size-4" aria-hidden />
            {pending ? "Adding…" : "Add"}
          </Button>
        </form>
        {error ? (
          <p className="mt-3 flex items-center gap-2 text-sm font-medium text-rose">
            <Warning weight="fill" className="size-4 shrink-0" aria-hidden />
            {error}
          </p>
        ) : null}
      </section>

      <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-xs)]">
        <ul className="divide-y divide-border">
          {categories.map((c) => (
            <li key={c.id} className="flex items-center gap-4 px-5 py-4">
              <span className={cn("size-3 shrink-0 rounded-full", swatch[c.accent] ?? "bg-border-strong")} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">
                  {c.resources} resource{c.resources === 1 ? "" : "s"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <EditCategoryDialog category={c} />
                <ConfirmDialog
                  title="Delete category?"
                  description={
                    c.resources > 0
                      ? `"${c.name}" has ${c.resources} resource(s). Reassign or remove them first.`
                      : `"${c.name}" will be permanently removed.`
                  }
                  onConfirm={() => deleteCategory(c.id)}
                  trigger={
                    <button
                      type="button"
                      aria-label={`Delete ${c.name}`}
                      className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-rose/10 hover:text-rose"
                    >
                      <Trash weight="bold" className="size-4" aria-hidden />
                    </button>
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
