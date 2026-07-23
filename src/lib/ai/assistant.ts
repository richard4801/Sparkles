import "server-only";
import { getAllResources } from "@/db/queries";
import { rankByRelevance } from "@/lib/ai/relevance";
import { aiConfigured, completeChat, type ChatTurn } from "@/lib/ai/provider";
import { formatNaira } from "@/lib/utils";

export interface AssistantSource {
  id: string;
  title: string;
  type: string;
  institution: string;
  priceNaira: number;
}

export interface AssistantAnswer {
  answer: string;
  sources: AssistantSource[];
  mode: "ai" | "local";
}

const SYSTEM = `You are the Skola Study Assistant, helping Nigerian university students find educational resources (research projects, past questions, seminar papers, journals, business plans, feasibility studies) on the Skola marketplace.

Rules:
- Only recommend resources from the CATALOG provided in the user message. Never invent titles, authors, prices, or institutions.
- Reference resources by their exact title.
- If nothing in the catalog fits, say so plainly and suggest how to refine the search (by course code, department, or topic).
- Be concise, warm and practical. Two or three short paragraphs at most. Use Naira (₦) for any prices.`;

function buildCatalogBlock(sources: AssistantSource[]): string {
  if (sources.length === 0) return "CATALOG: (no close matches found)";
  const lines = sources.map(
    (s) => `- "${s.title}" — ${s.type}, ${s.institution}, ${formatNaira(s.priceNaira)}`,
  );
  return `CATALOG (only recommend from these):\n${lines.join("\n")}`;
}

function localAnswer(question: string, sources: AssistantSource[]): string {
  if (sources.length === 0) {
    return `I couldn't find resources in the Skola catalog that match that yet. Try a more specific search — a course code, department, or topic works best, for example "accounting past questions" or "solar feasibility study". You can also browse the full marketplace to see what's available.`;
  }
  const top = sources[0];
  const others = sources.slice(1, 3).map((s) => `"${s.title}"`);
  const more =
    others.length > 0
      ? ` I've also pulled up ${others.join(" and ")} in case they fit better.`
      : "";
  return `Based on your question, the closest match in the catalog is "${top.title}" — a ${top.type.toLowerCase()} from ${top.institution} (${formatNaira(top.priceNaira)}).${more} Take a look at the matches below and open any one for its abstract, table of contents and reviews before you decide.`;
}

/** Answer a study question, grounded in the live catalog. Uses Claude when a
 *  key is configured; otherwise returns a grounded, non-hallucinating local
 *  answer built from the same retrieved resources. */
export async function answerQuestion(
  question: string,
  history: ChatTurn[] = [],
): Promise<AssistantAnswer> {
  const all = await getAllResources();
  const ranked = rankByRelevance(question, all, 5);
  const sources: AssistantSource[] = ranked.map(({ resource }) => ({
    id: resource.id,
    title: resource.title,
    type: resource.type,
    institution: resource.institution,
    priceNaira: resource.priceNaira,
  }));

  if (!aiConfigured()) {
    return { answer: localAnswer(question, sources), sources, mode: "local" };
  }

  try {
    const messages: ChatTurn[] = [
      ...history.slice(-6),
      {
        role: "user",
        content: `${buildCatalogBlock(sources)}\n\nStudent question: ${question}`,
      },
    ];
    const answer = await completeChat({ system: SYSTEM, messages, maxTokens: 700 });
    return { answer: answer || localAnswer(question, sources), sources, mode: "ai" };
  } catch {
    // Provider error (bad key, rate limit, network) — degrade gracefully.
    return { answer: localAnswer(question, sources), sources, mode: "local" };
  }
}
