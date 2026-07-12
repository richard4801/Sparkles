/** Shared catalog vocabulary — safe to import from both server and client. */

export const RESOURCE_TYPES = [
  "Research Project",
  "Past Questions",
  "Seminar Paper",
  "Journal",
  "Business Plan",
  "Feasibility Study",
] as const;

export const RESOURCE_LEVELS = ["ND", "HND", "BSc", "PGD", "MSc", "PhD"] as const;

export const CATEGORY_ACCENTS = [
  "violet",
  "blue",
  "emerald",
  "amber",
  "rose",
  "cyan",
] as const;
