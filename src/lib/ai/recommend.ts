import type { Resource } from "@/types";
import { uniqueTokens } from "./text";

/** Content-similarity between two resources: shared vocabulary (Jaccard over
 *  title+course+abstract tokens) plus structured-facet bonuses. */
function similarity(a: Resource, b: Resource): number {
  const ta = new Set(uniqueTokens(`${a.title} ${a.course} ${a.abstract}`));
  const tb = new Set(uniqueTokens(`${b.title} ${b.course} ${b.abstract}`));
  if (ta.size === 0 || tb.size === 0) return 0;
  let shared = 0;
  for (const t of ta) if (tb.has(t)) shared++;
  const jaccard = shared / (ta.size + tb.size - shared);

  let score = jaccard * 10;
  if (a.category === b.category) score += 2;
  if (a.department === b.department) score += 1.5;
  if (a.institution === b.institution) score += 1;
  if (a.level === b.level) score += 0.5;
  return score;
}

/** "More like this" — resources most similar to the given one. */
export function similarResources(
  resource: Resource,
  all: Resource[],
  limit = 4,
): Resource[] {
  return all
    .filter((r) => r.id !== resource.id)
    .map((r) => ({ r, score: similarity(resource, r) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.r);
}

/** Personalized picks: rank the catalog by aggregate similarity to what the
 *  student already owns / saved, excluding items they already have. Falls back
 *  to trending when there's no history yet (the cold-start case). */
export function recommendForUser(
  owned: Resource[],
  all: Resource[],
  limit = 3,
): Resource[] {
  const ownedIds = new Set(owned.map((r) => r.id));
  const pool = all.filter((r) => !ownedIds.has(r.id));

  if (owned.length === 0) {
    return pool.filter((r) => r.trending).slice(0, limit).length
      ? pool.filter((r) => r.trending).slice(0, limit)
      : [...pool].sort((a, b) => b.downloads - a.downloads).slice(0, limit);
  }

  return pool
    .map((r) => ({
      r,
      score: owned.reduce((sum, o) => sum + affinity(o, r), 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.r);
}

/** Lightweight affinity used for personalization (facet overlap + shared tokens). */
function affinity(owned: Resource, candidate: Resource): number {
  let score = 0;
  if (owned.category === candidate.category) score += 3;
  if (owned.department === candidate.department) score += 2;
  if (owned.level === candidate.level) score += 1;
  const ot = new Set(uniqueTokens(`${owned.title} ${owned.course}`));
  const ct = new Set(uniqueTokens(`${candidate.title} ${candidate.course}`));
  for (const t of ot) if (ct.has(t)) score += 0.5;
  return score;
}
