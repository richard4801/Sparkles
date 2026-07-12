import { getAllResources } from "@/db/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** llms.txt — a machine-readable index of the Sparklyn catalog for AI agents.
 *  See https://llmstxt.org. Regenerated from the live database on each request. */
export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://sparkles-six.vercel.app";
  const resources = await getAllResources();

  const byType = new Map<string, number>();
  for (const r of resources) byType.set(r.type, (byType.get(r.type) ?? 0) + 1);

  const lines: string[] = [];
  lines.push("# Sparklyn");
  lines.push("");
  lines.push(
    "> Sparklyn is a premium marketplace of educational resources for Nigerian university students — research projects, past questions, seminar papers, journals, business plans and feasibility studies.",
  );
  lines.push("");
  lines.push("## Search API");
  lines.push(
    `- Ranked catalog search: \`GET ${base}/api/ai/search?q={query}&limit={n}\` → JSON \`{ query, results: [{ id, title, type, category, institution, priceNaira, score }] }\``,
  );
  lines.push(`- Resource page: \`${base}/resource/{id}\``);
  lines.push("");
  lines.push("## Catalog");
  lines.push(`- ${resources.length} resources across ${byType.size} types`);
  for (const [type, count] of [...byType.entries()].sort((a, b) => b[1] - a[1])) {
    lines.push(`  - ${type}: ${count}`);
  }
  lines.push("");
  lines.push("## Resources");
  for (const r of resources) {
    lines.push(
      `- [${r.title}](${base}/resource/${r.id}) — ${r.type}, ${r.department}, ${r.institution} (₦${r.priceNaira.toLocaleString("en-NG")})`,
    );
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
