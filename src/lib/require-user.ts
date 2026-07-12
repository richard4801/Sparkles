import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

/** Returns the authenticated user or redirects to /login. Use at the top of
 *  every dashboard server component. */
export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return session.user;
}
