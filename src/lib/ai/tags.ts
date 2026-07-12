import type { Resource } from "@/types";
import { termFrequencies, tokenize } from "./text";

/** Derive "smart tags" for a resource from its own text. This is the local
 *  stand-in for LLM auto-tagging — deterministic, zero-cost, and good enough to
 *  surface the salient concepts. Swappable for a model-generated tag set later. */
export function smartTags(resource: Resource, limit = 6): string[] {
  const corpus = `${resource.title} ${resource.course} ${resource.abstract} ${resource.description}`;
  const freq = termFrequencies(corpus);

  // Title tokens are the most representative — boost them.
  for (const t of tokenize(resource.title)) {
    freq.set(t, (freq.get(t) ?? 0) + 3);
  }

  const ranked = [...freq.entries()]
    .filter(([term]) => term.length > 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([term]) => term);

  // Always include the structured facets students actually filter on.
  const facets = [resource.category, resource.level].map((f) => f.toLowerCase());
  const merged: string[] = [];
  for (const t of [...facets, ...ranked]) {
    if (!merged.includes(t)) merged.push(t);
  }
  return merged.slice(0, limit);
}
