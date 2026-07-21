import { getResourceById } from "@/db/queries";
import { previewPdf } from "@/lib/placeholder-pdf";
import { formatNaira } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Public premium preview: anyone can read the opening pages of a resource as a
 *  real PDF that cuts off halfway, before deciding to buy. No purchase or sign-in
 *  required — this is the free sample, not the full document. Served inline so it
 *  opens in the browser's PDF viewer. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ resourceId: string }> },
) {
  const { resourceId } = await params;
  const resource = await getResourceById(resourceId);
  if (!resource) return new Response("Not found.", { status: 404 });

  const body = previewPdf({
    title: resource.title,
    subtitle: `${resource.type} · ${resource.department} · ${resource.institution}`,
    abstract: resource.abstract,
    tableOfContents: resource.tableOfContents,
    pages: resource.pages,
    priceLabel: formatNaira(resource.priceNaira),
  });

  const asciiName = `${resource.id}-preview.pdf`.replace(/[^\x20-\x7E]/g, "_");
  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${asciiName}"`,
      "Content-Length": String(body.length),
      "Cache-Control": "public, max-age=300",
    },
  });
}
