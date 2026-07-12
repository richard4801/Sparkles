import type { Resource } from "@/types";
import { tokenize } from "./text";

/** Weighted fields — a query token matching the title counts for much more than
 *  one buried in the abstract. This is the lexical stand-in for embeddings: the
 *  same ranking API can be swapped to a vector search later without touching
 *  callers. */
const WEIGHTS: { get: (r: Resource) => string; weight: number }[] = [
  { get: (r) => r.title, weight: 6 },
  { get: (r) => r.course, weight: 4 },
  { get: (r) => r.department, weight: 3 },
  { get: (r) => r.category, weight: 3 },
  { get: (r) => r.type, weight: 3 },
  { get: (r) => r.faculty, weight: 2 },
  { get: (r) => r.institution, weight: 2 },
  { get: (r) => r.abstract, weight: 1 },
  { get: (r) => r.description, weight: 1 },
];

export interface RankedResource {
  resource: Resource;
  score: number;
}

/** Score one resource against a set of query tokens. */
function scoreResource(queryTokens: string[], resource: Resource): number {
  if (queryTokens.length === 0) return 0;
  let score = 0;
  for (const field of WEIGHTS) {
    const fieldTokens = new Set(tokenize(field.get(resource)));
    if (fieldTokens.size === 0) continue;
    for (const qt of queryTokens) {
      if (fieldTokens.has(qt)) score += field.weight;
      // partial credit for prefix matches (e.g. "account" ~ "accounting")
      else if ([...fieldTokens].some((ft) => ft.startsWith(qt) || qt.startsWith(ft))) {
        score += field.weight * 0.4;
      }
    }
  }
  // Gentle popularity prior so ties resolve to the more useful resource.
  score += Math.log10(1 + resource.downloads) * 0.15;
  if (resource.trending) score += 0.5;
  return score;
}

/** Rank resources by relevance to a free-text query. Returns only positive
 *  matches, best first, capped at `limit`. */
export function rankByRelevance(
  query: string,
  resources: Resource[],
  limit = 8,
): RankedResource[] {
  const queryTokens = [...new Set(tokenize(query))];
  if (queryTokens.length === 0) return [];
  return resources
    .map((resource) => ({ resource, score: scoreResource(queryTokens, resource) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
