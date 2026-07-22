export type ResourceType =
  | "Research Project"
  | "Seminar Paper"
  | "Journal"
  | "Business Plan"
  | "Feasibility Study"
  | "Past Questions";

export interface Resource {
  id: string; // slug-like, e.g. "impact-mobile-banking-sme-lagos"
  title: string;
  type: ResourceType;
  category: string; // e.g. "Accounting", "Computer Science", "Economics"
  institution: string; // a real Nigerian university
  department: string;
  description: string; // 1 sentence, <= 22 words, plain language, no em-dashes
  abstractSnippet: string; // 2 sentences, no em-dashes
  rating: number; // realistic, messy, e.g. 4.7 (range 3.8 - 5.0)
  reviews: number; // e.g. 213
  downloads: number; // messy integer, e.g. 1842
  pages: number; // e.g. 74
  priceNaira: number; // e.g. 3500 (range 1500 - 9000, multiples of 500)
  level: "ND" | "HND" | "BSc" | "PGD" | "MSc" | "PhD";
  year: number; // 2019 - 2025
  thumbnailSeed: string; // short descriptive kebab hint for the topic image, e.g. "mobile-banking-report" (cover art is served from /catalog/<id>.jpg)
  trending?: boolean;
  addedDaysAgo: number; // for "recently added", e.g. 2
  faculty: string; // e.g. "Management Sciences", "Engineering", "Social Sciences"
  course: string; // course code + title, e.g. "ACC 401 - Financial Reporting"
  abstract: string; // 3-4 sentence full abstract, plain language, no em-dashes
  tableOfContents: string[]; // chapter/section titles
}

export interface Review {
  id: string;
  resourceId: string; // must equal an existing Resource.id
  name: string; // realistic, varied Nigerian name
  avatarSeed: string; // name-based seed → a Nigerian face from the /avatars pool
  rating: number; // 3, 4 or 5
  date: string; // relative, e.g. "3 weeks ago", "2 months ago"
  body: string; // <= 40 words, no em-dashes, sounds like a real buyer
}

export interface Category {
  slug: string;
  name: string; // e.g. "Computer Science"
  resourceCount: number; // messy, e.g. 1284
  iconName: string; // a Phosphor icon component name
  accent: "violet" | "blue" | "emerald" | "amber" | "rose" | "cyan";
}

export interface University {
  slug: string;
  name: string; // real Nigerian university
  shortName: string; // e.g. "UNILAG"
  resourceCount: number;
  logoSeed: string; // kebab seed for a generated monogram fallback
}

export interface Testimonial {
  id: string;
  quote: string; // <= 3 lines / <= 32 words, no em-dashes, sounds like a real Nigerian student/lecturer
  name: string; // realistic Nigerian name (varied: Yoruba, Igbo, Hausa, etc.)
  role: string; // e.g. "Final year, Accounting"
  institution: string;
  avatarSeed: string; // name-based seed → a Nigerian face from the /avatars pool
  rating: number; // 4 or 5
}

export interface Faq {
  q: string;
  a: string; // plain, helpful, no em-dashes
}

export interface PlatformStat {
  label: string; // e.g. "Resources available"
  value: number; // raw number for the animated counter
  suffix?: string; // e.g. "+" or "k+" or "%"
  display?: string; // optional preformatted display if needed
}
