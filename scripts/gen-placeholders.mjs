/*
  Generates INTERIM placeholder imagery for the catalog:
    • People are diverse Nigerian/African student avatars (DiceBear "avataaars",
      constrained to natural looks, brown skin tones, afros / braids / hijab).
    • Topic objects use the app's own Phosphor icons, so each cover relates to
      its field (laptop, scales, flask, graduation cap, ...).
  Everything is generated locally (no external images) so it is easy to manage
  and to swap for real photos later — drop a real file over the same path.
  See docs/IMAGE-PROMPTS.md.

  Needs dev tools:  npm i -D @dicebear/core @dicebear/collection @phosphor-icons/core
  Run:              node scripts/gen-placeholders.mjs
*/
import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";

const PUBLIC = path.resolve("public");
const ICONS = path.resolve("node_modules/@phosphor-icons/core/assets/regular");

// slug -> { accent, icon }
const CATS = {
  "computer-science": { accent: "#4f46e5", icon: "laptop" },
  accounting: { accent: "#0f766e", icon: "calculator" },
  economics: { accent: "#0e7490", icon: "chart-line-up" },
  "business-administration": { accent: "#b45309", icon: "briefcase" },
  "mass-communication": { accent: "#be185d", icon: "megaphone" },
  "electrical-engineering": { accent: "#0891b2", icon: "lightning" },
  law: { accent: "#6d28d9", icon: "scales" },
  microbiology: { accent: "#15803d", icon: "flask" },
  "nursing-science": { accent: "#db2777", icon: "heartbeat" },
  "political-science": { accent: "#1d4ed8", icon: "bank" },
  "estate-management": { accent: "#c2410c", icon: "buildings" },
  "agricultural-science": { accent: "#16a34a", icon: "plant" },
  education: { accent: "#7c3aed", icon: "graduation-cap" },
  "public-health": { accent: "#0d9488", icon: "first-aid" },
};

const RESOURCE_CATEGORY = {
  "impact-mobile-banking-sme-lagos": "accounting",
  "campus-course-registration-system": "computer-science",
  "exchange-rate-volatility-fdi-nigeria": "economics",
  "solar-cold-storage-business-plan-ogun": "business-administration",
  "poultry-processing-plant-feasibility-zaria": "business-administration",
  "past-questions-circuit-theory-electromagnetic-futa": "electrical-engineering",
  "social-media-political-participation-benin": "mass-communication",
  "land-use-act-property-rights-nigeria": "law",
  "microbial-contamination-sachet-water-kano": "microbiology",
  "machine-learning-crop-disease-detection": "computer-science",
  "youth-unemployment-south-east-nigeria": "economics",
  "past-questions-financial-accounting-nd": "accounting",
  "mini-grid-solar-electrification-kaduna": "electrical-engineering",
  "fair-hearing-election-tribunals-nigeria": "law",
  "exclusive-breastfeeding-knowledge-kano": "nursing-science",
  "antenatal-care-attendance-rural-oyo": "nursing-science",
  "social-media-2023-elections-nigeria": "political-science",
  "godfatherism-democratic-consolidation-nigeria": "political-science",
  "residential-property-rental-values-lekki": "estate-management",
  "poultry-manure-maize-yield-zaria": "agricultural-science",
  "class-size-academic-performance-enugu": "education",
  "malaria-prevention-practices-ibadan": "public-health",
  "ict-skills-business-education-graduates": "education",
  "mobile-student-result-notification-firebase": "computer-science",
  "cooperative-societies-financing-smes-nnewi": "business-administration",
  "internal-control-fraud-prevention-banks": "accounting",
  "automatic-phase-changeover-switch": "electrical-engineering",
  "post-utme-past-questions-ui": "education",
};

// ---- DiceBear: constrained, natural Nigerian students ----
const BASE = {
  skinColor: ["614335", "ae5d29", "d08b5b"],
  hairColor: ["2c1b18", "4a312c", "0e0e0e", "724133"],
  eyebrows: ["default", "defaultNatural", "flatNatural", "raisedExcitedNatural"],
  eyes: ["default", "happy", "wink", "squint"],
  mouth: ["smile", "default", "twinkle"],
  clothing: ["blazerAndShirt", "collarAndSweater", "hoodie", "shirtCrewNeck", "shirtScoopNeck", "shirtVNeck", "graphicShirt"],
  clothesColor: ["0f766e", "b45309", "1d4ed8", "be185d", "15803d", "6d28d9", "c2410c"],
  accessoriesProbability: 12,
  accessories: ["prescription01", "prescription02", "round"],
};
const FEMALE_TOP = ["bun", "bob", "curly", "curvy", "longButNotTooLong", "straight01", "straight02", "bigHair", "froBand", "hijab", "dreads01", "shavedSides"];
const MALE_TOP = ["shortFlat", "shortRound", "shortCurly", "theCaesar", "theCaesarAndSidePart", "shavedSides", "fro", "dreads02", "frizzle"];

function avatarSvg(seed, female, bg) {
  return createAvatar(avataaars, {
    seed,
    ...BASE,
    top: female ? FEMALE_TOP : MALE_TOP,
    facialHairProbability: female ? 0 : 30,
    facialHair: ["beardLight", "beardMedium", "moustacheFancy", "beardMajestic"],
    facialHairColor: ["2c1b18", "0e0e0e", "4a312c"],
    ...(bg ? { backgroundColor: [bg.replace("#", "")] } : {}),
  }).toString();
}

async function personPng(seed, female, size) {
  // transparent-background bust for compositing onto our own backdrop
  return sharp(Buffer.from(avatarSvg(seed, female, null))).resize(size, size).png().toBuffer();
}

// ---- Phosphor topic icons ----
async function iconInner(name) {
  let s = await readFile(path.join(ICONS, `${name}.svg`), "utf8");
  return s.replace(/<svg[^>]*>/, "").replace(/<\/svg>/, "").replace(/<rect[^>]*\/>/, "").trim();
}
async function iconBadgePng(name, size, color, badge = "#ffffff") {
  const inner = await iconInner(name);
  const s = size, ic = s * 0.56, off = (s - ic) / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
    <circle cx="${s / 2}" cy="${s / 2}" r="${s / 2}" fill="${badge}"/>
    <g transform="translate(${off} ${off}) scale(${ic / 256})" fill="${color}">${inner}</g>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

function lighten(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r = Math.round(r + (255 - r) * amt); g = Math.round(g + (255 - g) * amt); b = Math.round(b + (255 - b) * amt);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
function bgPng(w, h, accent, softer = 0.82) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0.5" y2="1">
      <stop offset="0" stop-color="${lighten(accent, softer)}"/><stop offset="1" stop-color="${lighten(accent, softer - 0.24)}"/></linearGradient></defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <circle cx="${w * 0.34}" cy="${h * 0.92}" r="${h * 0.5}" fill="${lighten(accent, 0.45)}"/>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}
async function jpg(buf, out) { await sharp(buf).jpeg({ quality: 85, mozjpeg: true }).toFile(out); }

async function cover(id) {
  const w = 1200, h = 750;
  const cat = RESOURCE_CATEGORY[id] ?? "education";
  const { accent, icon } = CATS[cat];
  const person = await personPng(`cover-${id}`, hashBool(id), 560);
  const badge = await iconBadgePng(icon, 220, accent);
  const base = await bgPng(w, h, accent);
  const out = await sharp(base).composite([
    { input: person, left: Math.round(w * 0.16), top: Math.round(h * 0.16) },
    { input: badge, left: Math.round(w * 0.66), top: Math.round(h * 0.24) },
  ]).png().toBuffer();
  await jpg(out, path.join(PUBLIC, "catalog", `${id}.jpg`));
}

async function categoryTile(slug) {
  const w = 800, h = 640;
  const { accent, icon } = CATS[slug];
  const person = await personPng(`cat-${slug}`, hashBool(slug), 460);
  const badge = await iconBadgePng(icon, 190, accent);
  const base = await bgPng(w, h, accent, 0.7);
  const out = await sharp(base).composite([
    { input: person, left: Math.round(w * 0.06), top: Math.round(h * 0.2) },
    { input: badge, left: Math.round(w * 0.58), top: Math.round(h * 0.14) },
  ]).png().toBuffer();
  await jpg(out, path.join(PUBLIC, "categories", `${slug}.jpg`));
}

function hashBool(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h % 2 === 0; }

const AV_BG = ["#0f766e", "#b45309", "#1d4ed8", "#be185d", "#7c3aed", "#0891b2", "#16a34a", "#c2410c"];
async function avatar(group, i) {
  const svg = avatarSvg(`${group}${i}-sparklyn`, group === "f", AV_BG[(i - 1) % AV_BG.length]);
  await jpg(await sharp(Buffer.from(svg)).resize(600, 600).png().toBuffer(), path.join(PUBLIC, "avatars", `${group}${i}.jpg`));
}

async function scene(kind, w, h) {
  const accent = kind === "campus" ? "#0891b2" : "#7c3aed";
  const base = await bgPng(w, h, accent, 0.55);
  const p1 = await personPng(`${kind}-1`, true, Math.round(w * 0.5));
  const p2 = await personPng(`${kind}-2`, false, Math.round(w * 0.5));
  const icon = await iconBadgePng(kind === "campus" ? "graduation-cap" : "flask", 200, accent);
  const out = await sharp(base).composite([
    { input: p1, left: Math.round(-w * 0.04), top: Math.round(h * 0.42) },
    { input: p2, left: Math.round(w * 0.52), top: Math.round(h * 0.5) },
    { input: icon, left: Math.round(w * 0.4), top: Math.round(h * 0.14) },
  ]).png().toBuffer();
  await jpg(out, path.join(PUBLIC, "scenes", `${kind}.jpg`));
}

async function main() {
  for (const d of ["catalog", "categories", "avatars", "scenes"]) {
    await mkdir(path.join(PUBLIC, d), { recursive: true });
  }
  for (const slug of Object.keys(CATS)) await categoryTile(slug);
  for (const id of Object.keys(RESOURCE_CATEGORY)) await cover(id);
  await cover("post-utme-past-questions-ui");
  // default fallback
  {
    const base = await bgPng(1200, 750, "#0f766e");
    const person = await personPng("default", true, 560);
    const badge = await iconBadgePng("graduation-cap", 220, "#0f766e");
    const out = await sharp(base).composite([
      { input: person, left: 190, top: 120 }, { input: badge, left: 790, top: 180 },
    ]).png().toBuffer();
    await jpg(out, path.join(PUBLIC, "catalog", "_default.jpg"));
  }
  for (const g of ["f", "m"]) for (let i = 1; i <= 8; i++) await avatar(g, i);
  await scene("campus", 1100, 1500);
  await scene("library", 1000, 1120);
  console.log("Placeholders generated.");
}

await main();
