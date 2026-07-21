import { and, eq, sql } from "drizzle-orm";
import { get } from "@vercel/blob";
import { db } from "@/db";
import { resources, purchases, downloads } from "@/db/schema";
import { auth } from "@/auth";
import { placeholderPdf } from "@/lib/placeholder-pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Gated download: only a buyer of the resource can fetch its file. Streams the
 *  uploaded file from Blob storage (URL never exposed), or a placeholder PDF if
 *  no file has been uploaded yet. Records the download. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resourceId: string }> },
) {
  const { resourceId } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Sign in to download.", { status: 401 });
  }
  const userId = session.user.id;

  const [resource] = await db
    .select()
    .from(resources)
    .where(eq(resources.id, resourceId))
    .limit(1);
  if (!resource) return new Response("Not found.", { status: 404 });

  // Admins own the entire library — they can download anything without buying.
  const isAdmin = session.user.role === "admin";
  if (!isAdmin) {
    const [bought] = await db
      .select({ id: purchases.id })
      .from(purchases)
      .where(and(eq(purchases.userId, userId), eq(purchases.resourceId, resourceId)))
      .limit(1);
    if (!bought) {
      return new Response("You need to buy this resource before downloading it.", {
        status: 403,
      });
    }
  }

  // Fetch the real file, or fall back to a generated placeholder PDF.
  let body: Buffer;
  let filename: string;
  let contentType = "application/pdf";
  if (resource.fileUrl) {
    try {
      // The blob is private, so read it through the SDK with the token — a plain
      // fetch of the URL would be denied.
      const res = await get(resource.fileUrl, {
        access: "private",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      if (!res || res.statusCode !== 200 || !res.stream) throw new Error("blob get failed");
      body = Buffer.from(await new Response(res.stream).arrayBuffer());
      filename = resource.fileName || `${resource.id}.pdf`;
      contentType = res.blob.contentType || "application/octet-stream";
    } catch {
      body = placeholderPdf(resource.title, `${resource.type} · ${resource.department}`);
      filename = `${resource.id}.pdf`;
    }
  } else {
    body = placeholderPdf(resource.title, `${resource.type} · ${resource.department}`);
    filename = `${resource.id}.pdf`;
  }

  // Record the download (best-effort; never block the file on logging).
  try {
    const sizeMb = Math.max(0.1, Math.round((body.length / 1_000_000) * 10) / 10);
    const today = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    await db.insert(downloads).values({
      id: `dl-${userId.slice(0, 8)}-${resourceId.slice(0, 12)}-${Date.now().toString(36)}`,
      userId,
      resourceId,
      title: resource.title,
      type: resource.type,
      downloadedOn: today,
      sizeMb,
    });
    await db
      .update(purchases)
      .set({ downloads: sql`${purchases.downloads} + 1` })
      .where(and(eq(purchases.userId, userId), eq(purchases.resourceId, resourceId)));
    await db
      .update(resources)
      .set({ downloads: sql`${resources.downloads} + 1` })
      .where(eq(resources.id, resourceId));
  } catch {
    // ignore logging failures
  }

  const asciiName = filename.replace(/[^\x20-\x7E]/g, "_").replace(/"/g, "");
  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${asciiName}"`,
      "Content-Length": String(body.length),
      "Cache-Control": "private, no-store",
    },
  });
}
