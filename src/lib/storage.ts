import "server-only";
import { put, get } from "@vercel/blob";

/** Vercel Blob is configured when a read/write token is present. On Vercel this
 *  is provisioned automatically once you add Blob storage to the project. */
export function storageConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export interface UploadedFile {
  url: string;
  name: string;
  size: number;
}

/** Upload a resource's downloadable file to Blob storage. Stored privately —
 *  the blob URL is not publicly fetchable; only our /api/download route (holding
 *  the read-write token) can read it back, after verifying the buyer. */
export async function uploadResourceFile(
  file: File,
  resourceId: string,
): Promise<UploadedFile> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_") || "resource.pdf";
  const blob = await put(`resources/${resourceId}/${safeName}`, file, {
    access: "private",
    addRandomSuffix: true,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return { url: blob.url, name: file.name, size: file.size };
}

/** Upload a cover or preview-page image for a resource. Stored privately like
 *  the document; it is streamed back to viewers through /api/cover and
 *  /api/preview (which enforce who may see which page). */
export async function uploadResourceImage(
  file: File,
  resourceId: string,
  kind: "cover" | "preview",
): Promise<string> {
  const ext = (file.name.split(".").pop() ?? "jpg").replace(/[^a-zA-Z0-9]/g, "").slice(0, 5) || "jpg";
  const blob = await put(`resources/${resourceId}/${kind}.${ext}`, file, {
    access: "private",
    addRandomSuffix: true,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return blob.url;
}

/** Read a private blob's bytes for streaming back through our own route. */
export async function readBlob(
  url: string,
): Promise<{ buffer: Buffer; contentType: string } | null> {
  try {
    const res = await get(url, {
      access: "private",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    if (!res || res.statusCode !== 200 || !res.stream) return null;
    const buffer = Buffer.from(await new Response(res.stream).arrayBuffer());
    const ext = url.split("?")[0].split(".").pop()?.toLowerCase() ?? "";
    const contentType =
      ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : ext === "gif" ? "image/gif" : "image/jpeg";
    return { buffer, contentType };
  } catch {
    return null;
  }
}
