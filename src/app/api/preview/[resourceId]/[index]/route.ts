import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { resources, purchases } from "@/db/schema";
import { auth } from "@/auth";
import { readBlob } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Number of preview pages anyone may see before purchase. */
const FREE_PAGES = 2;

/** Streams one uploaded preview-page image. The first pages are public; later
 *  pages require ownership (a purchase, or admin), so the actual bytes are
 *  never served to someone who hasn't unlocked them. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resourceId: string; index: string }> },
) {
  const { resourceId, index } = await params;
  const i = Number(index);
  if (!Number.isInteger(i) || i < 0) return new Response("Bad request.", { status: 400 });

  const [resource] = await db
    .select({ previewImages: resources.previewImages })
    .from(resources)
    .where(eq(resources.id, resourceId))
    .limit(1);

  const url = resource?.previewImages?.[i];
  if (!url) return new Response("Not found.", { status: 404 });

  if (i >= FREE_PAGES) {
    const session = await auth();
    const userId = session?.user?.id;
    const isAdmin = session?.user?.role === "admin";
    let owned = isAdmin;
    if (userId && !isAdmin) {
      const [bought] = await db
        .select({ id: purchases.id })
        .from(purchases)
        .where(and(eq(purchases.userId, userId), eq(purchases.resourceId, resourceId)))
        .limit(1);
      owned = Boolean(bought);
    }
    if (!owned) return new Response("Locked. Buy this resource to view.", { status: 403 });
  }

  const blob = await readBlob(url);
  if (!blob) return new Response("Not found.", { status: 404 });

  return new Response(new Uint8Array(blob.buffer), {
    headers: {
      "Content-Type": blob.contentType,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
