import type { Metadata } from "next";
import Image from "next/image";
import { requireAdmin } from "@/lib/require-admin";
import { listUsers } from "@/db/admin";
import { DashPageHeader } from "@/components/dashboard/page-header";
import { UserRowActions } from "@/components/admin/user-row-actions";
import { avatar, formatNaira, cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Users" };
export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const admin = await requireAdmin();
  const users = await listUsers();
  const adminCount = users.filter((u) => u.role === "admin").length;

  return (
    <div className="mx-auto max-w-6xl">
      <DashPageHeader
        title="Users"
        description="Manage accounts and access. Promote trusted users to admin."
      />

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-xs)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-semibold">User</th>
                <th className="px-5 py-3 font-semibold">Role</th>
                <th className="px-5 py-3 font-semibold">Institution</th>
                <th className="px-5 py-3 text-right font-semibold">Purchases</th>
                <th className="px-5 py-3 text-right font-semibold">Spend</th>
                <th className="px-5 py-3 font-semibold">Joined</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u) => (
                <tr key={u.id} className="transition-colors hover:bg-surface-subtle/50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={avatar(u.avatarSeed)}
                        alt=""
                        width={36}
                        height={36}
                        className="size-9 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <span className="flex items-center gap-1.5 font-semibold text-foreground">
                          <span className="truncate">{u.name}</span>
                          {u.id === admin.id ? (
                            <span className="rounded-full bg-surface-subtle px-1.5 py-0.5 text-[0.65rem] font-bold text-muted-foreground">
                              You
                            </span>
                          ) : null}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
                        u.role === "admin"
                          ? "bg-primary/10 text-primary"
                          : "bg-surface-subtle text-muted-foreground",
                      )}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="max-w-[12rem] px-5 py-3 text-muted-foreground">
                    <span className="block truncate">{u.institution || "—"}</span>
                  </td>
                  <td className="px-5 py-3 text-right text-foreground">{u.purchases}</td>
                  <td className="px-5 py-3 text-right font-medium text-foreground">
                    {formatNaira(u.spendNaira)}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{u.joined}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <UserRowActions
                        userId={u.id}
                        name={u.name}
                        role={u.role}
                        isSelf={u.id === admin.id}
                        adminCount={adminCount}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
