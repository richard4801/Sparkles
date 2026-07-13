"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { wishlists } from "@/db/schema";
import { auth } from "@/auth";

export interface WishlistResult {
  ok: boolean;
  saved?: boolean;
  needsAuth?: boolean;
  error?: string;
}

/** Add or remove a resource from the signed-in user's wishlist. Returns
 *  needsAuth when there's no session so the caller can send them to /login. */
export async function toggleWishlist(resourceId: string): Promise<WishlistResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, needsAuth: true };
  const userId = session.user.id;

  try {
    const [existing] = await db
      .select({ id: wishlists.id })
      .from(wishlists)
      .where(and(eq(wishlists.userId, userId), eq(wishlists.resourceId, resourceId)))
      .limit(1);

    let saved: boolean;
    if (existing) {
      await db.delete(wishlists).where(eq(wishlists.id, existing.id));
      saved = false;
    } else {
      await db.insert(wishlists).values({ userId, resourceId }).onConflictDoNothing();
      saved = true;
    }
    revalidatePath("/dashboard/wishlist");
    revalidatePath("/dashboard");
    return { ok: true, saved };
  } catch {
    return { ok: false, error: "Could not update your wishlist." };
  }
}
