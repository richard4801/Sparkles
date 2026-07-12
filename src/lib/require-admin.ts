import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

/** Returns the authenticated admin user, or redirects. Non-authenticated users
 *  go to /login; authenticated non-admins are bounced back to their dashboard.
 *  Use at the top of every /dashboard/admin server component. */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  if (session.user.role !== "admin") redirect("/dashboard");
  return session.user;
}
