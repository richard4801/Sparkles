"use server";

import { revalidatePath } from "next/cache";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { reviews, resources, purchases, users } from "@/db/schema";
import { auth } from "@/auth";

export interface ReviewResult {
  ok: boolean;
  error?: string;
  needsAuth?: boolean;
}

/** Post a review. Only buyers of the resource may review, once each. Recomputes
 *  the resource's average rating and review count. */
export async function submitReview(
  resourceId: string,
  rating: number,
  body: string,
): Promise<ReviewResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, needsAuth: true };
  const userId = session.user.id;

  const stars = Math.round(Number(rating));
  if (!(stars >= 1 && stars <= 5)) return { ok: false, error: "Pick a rating from 1 to 5 stars." };
  const text = String(body ?? "").trim();
  if (text.length < 10) return { ok: false, error: "Please write at least a sentence." };

  // Must have purchased it.
  const [bought] = await db
    .select({ id: purchases.id })
    .from(purchases)
    .where(and(eq(purchases.userId, userId), eq(purchases.resourceId, resourceId)))
    .limit(1);
  if (!bought) {
    return { ok: false, error: "You can review a resource once you've purchased it." };
  }

  // One review per user per resource.
  const [existing] = await db
    .select({ id: reviews.id })
    .from(reviews)
    .where(and(eq(reviews.userId, userId), eq(reviews.resourceId, resourceId)))
    .limit(1);
  if (existing) return { ok: false, error: "You've already reviewed this resource." };

  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user) return { ok: false, error: "Account not found." };

  try {
    await db.insert(reviews).values({
      id: `rev-${userId.slice(0, 8)}-${resourceId.slice(0, 12)}-${Date.now().toString(36)}`,
      resourceId,
      userId,
      name: user.name,
      avatarSeed: user.avatarSeed,
      rating: stars,
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      body: text,
    });

    // Recompute rating + count from all reviews on this resource.
    const [agg] = await db
      .select({
        avg: sql<number>`coalesce(avg(${reviews.rating}), 0)`,
        count: sql<number>`count(*)::int`,
      })
      .from(reviews)
      .where(eq(reviews.resourceId, resourceId));

    await db
      .update(resources)
      .set({
        rating: Math.round((agg?.avg ?? 0) * 10) / 10,
        reviewsCount: agg?.count ?? 0,
      })
      .where(eq(resources.id, resourceId));

    revalidatePath(`/resource/${resourceId}`);
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not post your review. Please try again." };
  }
}
