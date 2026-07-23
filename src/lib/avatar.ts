/*
  Avatar identity helpers. Every account gets a unique, auto-generated cartoon
  avatar (rendered by /api/avatar), seeded so no two users ever share one and
  gender-matched from the person's first name.

  The seed is `${gender}-${uuid}` — the uuid guarantees uniqueness, the gender
  prefix tells the renderer which hairstyle/clothing set to use. Older seeds
  (e.g. testimonial data like "chiamaka-portrait") have no prefix, so we fall
  back to guessing gender from the first name.
*/

// First names we treat as female. Nigerian (Yoruba, Igbo, Hausa) + common
// international names. Anything not listed falls back to a deterministic guess.
const FEMALE = new Set([
  // Igbo
  "adaeze", "ada", "adaobi", "amaka", "chiamaka", "chinelo", "chioma", "chidinma",
  "chinaza", "chinwe", "chinwendu", "amarachi", "ngozi", "nkechi", "nneka", "nne",
  "ifeoma", "uchechi", "ugochi", "adaugo", "ihuoma", "ozioma", "chizoba", "chidera",
  "somtochukwu", "sochima", "ebele", "obianuju", "anwuli", "kambili", "oluchi",
  // Yoruba
  "funke", "funmilayo", "funmi", "folake", "folashade", "shade", "yetunde", "yewande",
  "kemi", "kemisola", "bosede", "ronke", "titi", "titilayo", "bisola", "bisi",
  "modupe", "mojisola", "moji", "omolara", "omotola", "omowunmi", "bukola", "bukky",
  "bimpe", "simi", "simisola", "temi", "morenike", "abisola", "adunni", "ololade",
  "lola", "toyosi", "wuraola", "oyinkansola", "oyin", "iyabo", "abike", "damilola",
  // Hausa / Muslim
  "aisha", "aishat", "amina", "aminat", "hauwa", "hadiza", "halima", "halimat",
  "fatima", "fatimah", "zainab", "zara", "maryam", "maimuna", "rukayat", "rukayya",
  "rahma", "rahmat", "habiba", "hafsat", "safiya", "bilkisu", "zulaikha", "khadija",
  "jamila", "salamatu", "balkisu", "fadila", "nafisa", "sadiya", "hafsah", "asma",
  // Common international / Christian
  "blessing", "grace", "precious", "favour", "gift", "peace", "joy", "mercy",
  "charity", "faith", "esther", "ruth", "deborah", "rebecca", "sarah", "sarai",
  "mary", "maria", "elizabeth", "hannah", "rachael", "rachel", "comfort", "patience",
  "rita", "vivian", "cynthia", "gloria", "juliana", "gladys", "stella", "helen",
  "victoria", "veronica", "loveth", "chidimma", "ashley", "sophia", "sophie",
  "emily", "olivia", "jessica", "linda", "susan", "nancy", "diana", "clara",
]);

// A handful of common male names so unisex-leaning ones resolve to male, plus
// disambiguation for names that also appear female elsewhere.
const MALE = new Set([
  "abdulrahman", "abubakar", "ibrahim", "yusuf", "suleiman", "musa", "bashir",
  "aliyu", "kabir", "sani", "umar", "usman", "bello", "danladi", "sadiq", "idris",
  "emeka", "chidi", "chinedu", "chukwuemeka", "obinna", "ifeanyi", "kelechi",
  "tobenna", "nnamdi", "uche", " chibuzo", "chukwudi", "okechukwu", "chuka",
  "tunde", "segun", "wale", "kunle", "femi", "gbenga", "seyi", "dele", "biodun",
  "ayodeji", "olamide", "damilare", "temitope", "tope", "ayo", "daniel", "david",
  "emmanuel", "samuel", "john", "peter", "paul", "james", "michael", "joseph",
  "victor", "goodluck", "richard", "chinonso", "kingsley", "success", "godwin",
]);

function hashPick(s: string): "f" | "m" {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 2 === 0 ? "f" : "m";
}

/** Best-effort gender guess from a name, for choosing the avatar's look. */
export function guessGender(name?: string | null): "f" | "m" {
  const first = (name ?? "").toLowerCase().trim().split(/\s+/)[0]?.replace(/[^a-z]/g, "") ?? "";
  if (!first) return "m";
  if (FEMALE.has(first)) return "f";
  if (MALE.has(first)) return "m";
  return hashPick(first);
}

/** A fresh, unique, gender-tagged avatar seed for a new account. */
export function makeAvatarSeed(name?: string | null): string {
  return `${guessGender(name)}-${globalThis.crypto.randomUUID()}`;
}

/** The gender encoded in a seed, or guessed from it for legacy seeds. */
export function seedGender(seed: string): "f" | "m" {
  const m = /^([fm])-/.exec(seed);
  if (m) return m[1] as "f" | "m";
  return guessGender(seed.split(/[^a-zA-Z]/).filter(Boolean)[0] ?? "");
}
