"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Warning } from "@phosphor-icons/react";
import { Field } from "@/components/auth/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createResource, updateResource, type ActionResult } from "@/lib/admin-actions";
import { RESOURCE_TYPES, RESOURCE_LEVELS } from "@/lib/catalog";

export interface ResourceInitial {
  title: string;
  type: string;
  categoryId: number;
  institutionId: number;
  department: string;
  faculty: string;
  course: string;
  description: string;
  abstract: string;
  tableOfContents: string[];
  rating: number;
  reviewsCount: number;
  downloads: number;
  pages: number;
  priceNaira: number;
  level: string;
  year: number;
  thumbnailSeed: string;
  trending: boolean;
  fileName?: string | null;
}

interface Option {
  id: number;
  name: string;
}

const selectClass =
  "h-12 w-full rounded-[var(--radius-sm)] border border-border-strong bg-surface px-4 text-[0.95rem] text-foreground shadow-[var(--shadow-xs)] focus-visible:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const areaClass =
  "w-full rounded-[var(--radius-sm)] border border-border-strong bg-surface px-4 py-3 text-[0.95rem] text-foreground shadow-[var(--shadow-xs)] focus-visible:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-xs)]">
      <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export function ResourceForm({
  mode,
  resourceId,
  initial,
  categories,
  universities,
}: {
  mode: "create" | "edit";
  resourceId?: string;
  initial: ResourceInitial;
  categories: Option[];
  universities: Option[];
}) {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const action: (f: FormData) => Promise<ActionResult> =
        mode === "create" ? createResource : (f) => updateResource(resourceId!, f);
      const res = await action(fd);
      // On success the action redirects; only failures return here.
      if (res && !res.ok) setError(res.error ?? "Could not save the resource.");
    });
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      {error ? (
        <p className="flex items-center gap-2 rounded-xl bg-rose/10 px-4 py-3 text-sm font-medium text-rose">
          <Warning weight="fill" className="size-4 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}

      <Card title="Details">
        <div className="sm:col-span-2">
          <Field id="title" label="Title">
            <Input id="title" name="title" defaultValue={initial.title} className="h-12" required />
          </Field>
        </div>

        <Field id="type" label="Type">
          <select id="type" name="type" defaultValue={initial.type} className={selectClass}>
            {RESOURCE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field id="level" label="Level">
          <select id="level" name="level" defaultValue={initial.level} className={selectClass}>
            {RESOURCE_LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </Field>

        <Field id="categoryId" label="Category">
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={String(initial.categoryId || categories[0]?.id || "")}
            className={selectClass}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>

        <Field id="institutionId" label="Institution">
          <select
            id="institutionId"
            name="institutionId"
            defaultValue={String(initial.institutionId || universities[0]?.id || "")}
            className={selectClass}
          >
            {universities.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </Field>

        <Field id="faculty" label="Faculty">
          <Input id="faculty" name="faculty" defaultValue={initial.faculty} className="h-12" />
        </Field>
        <Field id="department" label="Department">
          <Input id="department" name="department" defaultValue={initial.department} className="h-12" required />
        </Field>
        <div className="sm:col-span-2">
          <Field id="course" label="Course">
            <Input id="course" name="course" defaultValue={initial.course} className="h-12" required />
          </Field>
        </div>
      </Card>

      <Card title="Content">
        <div className="sm:col-span-2">
          <Field id="description" label="Short description">
            <textarea
              id="description"
              name="description"
              defaultValue={initial.description}
              rows={2}
              className={areaClass}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id="abstract" label="Abstract">
            <textarea
              id="abstract"
              name="abstract"
              defaultValue={initial.abstract}
              rows={4}
              className={areaClass}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id="tableOfContents" label="Table of contents (one item per line)">
            <textarea
              id="tableOfContents"
              name="tableOfContents"
              defaultValue={initial.tableOfContents.join("\n")}
              rows={5}
              className={areaClass}
            />
          </Field>
        </div>
      </Card>

      <Card title="Pricing & metrics">
        <Field id="priceNaira" label="Price (₦) — 0 for free">
          <Input
            id="priceNaira"
            name="priceNaira"
            type="number"
            min={0}
            defaultValue={initial.priceNaira}
            className="h-12"
          />
        </Field>
        <Field id="pages" label="Pages">
          <Input id="pages" name="pages" type="number" min={1} defaultValue={initial.pages} className="h-12" />
        </Field>
        <Field id="year" label="Year">
          <Input id="year" name="year" type="number" defaultValue={initial.year} className="h-12" />
        </Field>
        <Field id="thumbnailSeed" label="Thumbnail seed">
          <Input
            id="thumbnailSeed"
            name="thumbnailSeed"
            defaultValue={initial.thumbnailSeed}
            placeholder="auto from title"
            className="h-12"
          />
        </Field>
        <Field id="downloads" label="Downloads">
          <Input id="downloads" name="downloads" type="number" min={0} defaultValue={initial.downloads} className="h-12" />
        </Field>
        <Field id="rating" label="Rating (0–5)">
          <Input
            id="rating"
            name="rating"
            type="number"
            min={0}
            max={5}
            step={0.1}
            defaultValue={initial.rating}
            className="h-12"
          />
        </Field>
        <Field id="reviewsCount" label="Reviews count">
          <Input
            id="reviewsCount"
            name="reviewsCount"
            type="number"
            min={0}
            defaultValue={initial.reviewsCount}
            className="h-12"
          />
        </Field>
        <label className="flex items-center gap-3 self-end pb-3">
          <input
            type="checkbox"
            name="trending"
            defaultChecked={initial.trending}
            className="size-5 rounded border-border-strong text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
          <span className="text-sm font-medium text-foreground">Mark as trending</span>
        </label>
      </Card>

      <section className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-xs)]">
        <h2 className="font-display text-lg font-bold text-foreground">Downloadable file</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The document buyers receive. PDF or Word, up to 25MB.
          {initial.fileName ? (
            <>
              {" "}Current file: <span className="font-medium text-foreground">{initial.fileName}</span>.
              Upload a new one to replace it.
            </>
          ) : (
            " Until you upload one, buyers get a placeholder PDF."
          )}
        </p>
        <input
          type="file"
          name="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="mt-4 block w-full text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-primary-soft file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-[#c6e6e0]"
        />
      </section>

      <div className="flex items-center gap-3">
        <Button type="submit" size="md" disabled={pending}>
          {pending ? "Saving…" : mode === "create" ? "Create resource" : "Save changes"}
        </Button>
        <Button type="button" variant="ghost" size="md" onClick={() => router.push("/dashboard/admin/resources")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
