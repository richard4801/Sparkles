import { NextResponse } from "next/server";
import { getAllResources } from "@/db/queries";
import { rankByRelevance } from "@/lib/ai/relevance";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Semantic-style ranked search over the catalog. Lexical relevance today,
 *  swappable for embeddings later without changing this contract.
 *  GET /api/ai/search?q=solar+feasibility&limit=8 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();
  const limit = Math.min(20, Math.max(1, Number(searchParams.get("limit")) || 8));

  if (!q) return NextResponse.json({ query: q, results: [] });

  const all = await getAllResources();
  const ranked = rankByRelevance(q, all, limit);

  return NextResponse.json({
    query: q,
    results: ranked.map(({ resource, score }) => ({
      id: resource.id,
      title: resource.title,
      type: resource.type,
      category: resource.category,
      institution: resource.institution,
      priceNaira: resource.priceNaira,
      score: Math.round(score * 100) / 100,
    })),
  });
}
