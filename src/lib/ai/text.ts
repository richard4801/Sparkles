/** Shared text utilities for the local (no-key) AI heuristics.
 *  Pure functions — safe to import anywhere, run on server or client. */

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "of", "to", "in", "on", "for", "with", "at",
  "by", "from", "up", "about", "into", "over", "after", "is", "are", "was",
  "were", "be", "been", "being", "this", "that", "these", "those", "it", "its",
  "as", "if", "than", "then", "so", "such", "can", "will", "would", "should",
  "study", "research", "project", "analysis", "using", "based", "case", "impact",
  "effect", "effects", "role", "review", "paper", "among", "between", "their",
  "how", "what", "which", "when", "why", "who", "i", "my", "me", "do", "does",
  "need", "want", "looking", "find", "get", "some", "any", "all", "more", "help",
]);

/** Lowercase, split on non-alphanumerics, drop stopwords and very short tokens. */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

/** Unique tokens, preserving first-seen order. */
export function uniqueTokens(text: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of tokenize(text)) {
    if (!seen.has(t)) {
      seen.add(t);
      out.push(t);
    }
  }
  return out;
}

/** Count token frequencies. */
export function termFrequencies(text: string): Map<string, number> {
  const freq = new Map<string, number>();
  for (const t of tokenize(text)) freq.set(t, (freq.get(t) ?? 0) + 1);
  return freq;
}
