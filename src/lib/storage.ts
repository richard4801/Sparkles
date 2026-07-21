import "server-only";
import { put } from "@vercel/blob";

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

/** Upload a resource's downloadable file to Blob storage. Stored under a
 *  per-resource path with a random suffix so URLs are unguessable; access is
 *  still gated by our /api/download route (the URL is never exposed to buyers). */
export async function uploadResourceFile(
  file: File,
  resourceId: string,
): Promise<UploadedFile> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_") || "resource.pdf";
  const blob = await put(`resources/${resourceId}/${safeName}`, file, {
    access: "public",
    addRandomSuffix: true,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return { url: blob.url, name: file.name, size: file.size };
}
