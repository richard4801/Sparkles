/*
  Generates on-brand INTERIM placeholder images for the catalog so every image
  path renders while the real Nigerian photos are being produced. Replace any
  file under public/{catalog,categories,avatars,scenes} with a real photo of the
  same name and no code changes are needed.

  Run: node scripts/gen-placeholders.mjs
*/
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const PUBLIC = path.resolve("public");

const CATEGORY_SLUGS = [
  "computer-science", "accounting", "economics", "business-administration",
  "mass-communication", "electrical-engineering", "law", "microbiology",
  "nursing-science", "political-science", "estate-management",
  "agricultural-science", "education", "public-health",
];

const RESOURCE_IDS = [
  "impact-mobile-banking-sme-lagos", "campus-course-registration-system",
  "exchange-rate-volatility-fdi-nigeria", "solar-cold-storage-business-plan-ogun",
  "poultry-processing-plant-feasibility-zaria",
  "past-questions-circuit-theory-electromagnetic-futa",
  "social-media-political-participation-benin", "land-use-act-property-rights-nigeria",
  "microbial-contamination-sachet-water-kano", "machine-learning-crop-disease-detection",
  "youth-unemployment-south-east-nigeria", "past-questions-financial-accounting-nd",
  "mini-grid-solar-electrification-kaduna", "fair-hearing-election-tribunals-nigeria",
  "exclusive-breastfeeding-knowledge-kano", "antenatal-care-attendance-rural-oyo",
  "social-media-2023-elections-nigeria", "godfatherism-democratic-consolidation-nigeria",
  "residential-property-rental-values-lekki", "poultry-manure-maize-yield-zaria",
  "class-size-academic-performance-enugu", "malaria-prevention-practices-ibadan",
  "ict-skills-business-education-graduates", "mobile-student-result-notification-firebase",
  "cooperative-societies-financing-smes-nnewi", "internal-control-fraud-prevention-banks",
  "automatic-phase-changeover-switch", "post-utme-past-questions-ui",
];

const ACCENTS = ["#22d3aa", "#38bdf8", "#a78bfa", "#fbbf24", "#fb7185", "#34d399"];

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function titleCase(slug) {
  return slug
    .split("-")
    .map((w) => (w.length <= 3 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// naive word wrap by character budget
function wrap(text, maxChars, maxLines) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars) {
      if (line) lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
    if (lines.length === maxLines) break;
  }
  if (line && lines.length < maxLines) lines.push(line.trim());
  return lines.slice(0, maxLines);
}

async function svgToJpg(svg, out) {
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
}

function coverSvg({ w, h, eyebrow, title, accent }) {
  const lines = wrap(title, Math.floor(w / 22), 3);
  const startY = h / 2 - (lines.length - 1) * 30;
  const tspans = lines
    .map(
      (ln, i) =>
        `<tspan x="${w * 0.08}" y="${startY + i * 58}">${esc(ln)}</tspan>`,
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0f766e"/>
        <stop offset="1" stop-color="#0a3d39"/>
      </linearGradient>
      <radialGradient id="glow" cx="78%" cy="22%" r="60%">
        <stop offset="0" stop-color="${accent}" stop-opacity="0.55"/>
        <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <rect width="${w}" height="${h}" fill="url(#glow)"/>
    <circle cx="${w * 0.84}" cy="${h * 0.8}" r="${h * 0.34}" fill="#ffffff" opacity="0.04"/>
    <text x="${w * 0.08}" y="${h * 0.16}" fill="${accent}" font-family="Montserrat, Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="3">${esc(eyebrow.toUpperCase())}</text>
    <text fill="#ffffff" font-family="Montserrat, Arial, sans-serif" font-size="42" font-weight="800">${tspans}</text>
    <text x="${w * 0.08}" y="${h * 0.9}" fill="#ffffff" opacity="0.55" font-family="Montserrat, Arial, sans-serif" font-size="18" font-weight="600" letter-spacing="1">SPARKLYN · sample cover</text>
  </svg>`;
}

function categorySvg({ w, h, name, accent }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0" stop-color="${accent}" stop-opacity="0.9"/>
        <stop offset="0.55" stop-color="#0f766e"/>
        <stop offset="1" stop-color="#0a3d39"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <circle cx="${w * 0.22}" cy="${h * 0.26}" r="${h * 0.18}" fill="#ffffff" opacity="0.09"/>
    <circle cx="${w * 0.8}" cy="${h * 0.82}" r="${h * 0.26}" fill="#ffffff" opacity="0.05"/>
  </svg>`;
}

function avatarSvg({ size, accent, initials }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${accent}"/>
        <stop offset="1" stop-color="#0a4a45"/>
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" fill="url(#g)"/>
    <circle cx="${size / 2}" cy="${size * 0.42}" r="${size * 0.18}" fill="#ffffff" opacity="0.9"/>
    <path d="M ${size * 0.18} ${size} a ${size * 0.32} ${size * 0.3} 0 0 1 ${size * 0.64} 0 Z" fill="#ffffff" opacity="0.9"/>
  </svg>`;
}

async function main() {
  for (const d of ["catalog", "categories", "avatars", "scenes"]) {
    await mkdir(path.join(PUBLIC, d), { recursive: true });
  }

  // Category tiles (5:4)
  for (const slug of CATEGORY_SLUGS) {
    const accent = ACCENTS[hash(slug) % ACCENTS.length];
    const svg = categorySvg({ w: 800, h: 640, name: titleCase(slug), accent });
    await svgToJpg(svg, path.join(PUBLIC, "categories", `${slug}.jpg`));
  }

  // Resource covers (16:10)
  for (const id of RESOURCE_IDS) {
    const accent = ACCENTS[hash(id) % ACCENTS.length];
    const svg = coverSvg({
      w: 1200, h: 750, eyebrow: "Sparklyn resource",
      title: titleCase(id), accent,
    });
    await svgToJpg(svg, path.join(PUBLIC, "catalog", `${id}.jpg`));
  }
  // default fallback cover for admin-added resources without an image yet
  await svgToJpg(
    coverSvg({ w: 1200, h: 750, eyebrow: "Sparklyn resource", title: "Study Resource", accent: ACCENTS[0] }),
    path.join(PUBLIC, "catalog", "_default.jpg"),
  );

  // Avatar pool: f1..f8, m1..m8
  for (const group of ["f", "m"]) {
    for (let i = 1; i <= 8; i += 1) {
      const accent = ACCENTS[(i * 2 + (group === "f" ? 1 : 0)) % ACCENTS.length];
      const svg = avatarSvg({ size: 400, accent, initials: `${group}${i}`.toUpperCase() });
      await svgToJpg(svg, path.join(PUBLIC, "avatars", `${group}${i}.jpg`));
    }
  }

  // Scenes
  await svgToJpg(
    coverSvg({ w: 1100, h: 1500, eyebrow: "Sparklyn", title: "Nigerian Campus Life", accent: ACCENTS[1] }),
    path.join(PUBLIC, "scenes", "campus.jpg"),
  );
  await svgToJpg(
    coverSvg({ w: 1000, h: 1120, eyebrow: "Sparklyn", title: "The Full Library", accent: ACCENTS[2] }),
    path.join(PUBLIC, "scenes", "library.jpg"),
  );

  console.log("Placeholders generated.");
}

await main();
