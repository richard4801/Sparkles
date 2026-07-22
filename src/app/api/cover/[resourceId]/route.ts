import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { resources } from "@/db/schema";
import { readBlob } from "@/lib/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Public cover image for a resource. Streams the admin-uploaded image from
 *  private Blob storage; if none was uploaded, falls back to the generated
 *  placeholder in /public/catalog. Covers are marketing material, so no auth. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resourceId: string }> },
) {
  const { resourceId } = await params;
  const [resource] = await db
    .select({ imageUrl: resources.imageUrl })
    .from(resources)
    .where(eq(resources.id, resourceId))
    .limit(1);

  if (!resource?.imageUrl) {
    redirect(`/catalog/${resourceId}.jpg`);
  }

  const blob = await readBlob(resource.imageUrl);
  if (!blob) redirect(`/catalog/${resourceId}.jpg`);

  return new Response(new Uint8Array(blob.buffer), {
    headers: {
      "Content-Type": blob.contentType,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
