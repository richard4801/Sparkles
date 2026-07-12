import type { Metadata } from "next";
import Link from "next/link";
import { FileText, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { requireUser } from "@/lib/require-user";
import { getDownloadHistory } from "@/db/queries";
import { DashPageHeader } from "@/components/dashboard/page-header";

export const metadata: Metadata = { title: "Download history" };

export default async function DownloadsPage() {
  const user = await requireUser();
  const downloadHistory = await getDownloadHistory(user.id);
  return (
    <div className="mx-auto max-w-5xl">
      <DashPageHeader
        title="Download history"
        description="Every file you have downloaded, most recent first."
      />

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-xs)]">
        <ul className="divide-y divide-border">
          {downloadHistory.map((d) => (
            <li key={d.id} className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <FileText weight="duotone" className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/resource/${d.resourceId}`}
                  className="block truncate font-semibold text-foreground hover:text-primary"
                >
                  {d.title}
                </Link>
                <p className="truncate text-sm text-muted-foreground">
                  {d.type} · {d.sizeMb} MB
                </p>
              </div>
              <span className="hidden text-sm text-muted-foreground sm:block">
                {d.downloadedOn}
              </span>
              <button
                type="button"
                aria-label={`Download ${d.title} again`}
                className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-subtle hover:text-primary"
              >
                <DownloadSimple weight="bold" className="size-5" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
