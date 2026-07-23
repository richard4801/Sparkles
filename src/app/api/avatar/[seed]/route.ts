import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import { seedGender } from "@/lib/avatar";

export const runtime = "nodejs";

// Shared look: natural, friendly, brown skin tones, afros / braids / hijab.
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
} as const;
const FEMALE_TOP = ["bun", "bob", "curly", "curvy", "longButNotTooLong", "straight01", "straight02", "bigHair", "froBand", "hijab", "dreads01", "shavedSides"] as const;
const MALE_TOP = ["shortFlat", "shortRound", "shortCurly", "theCaesar", "theCaesarAndSidePart", "shavedSides", "fro", "dreads02", "frizzle"] as const;
const BG = ["0f766e", "b45309", "1d4ed8", "be185d", "7c3aed", "0891b2", "16a34a", "c2410c"];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Deterministic, unique cartoon avatar for a seed. Same seed → same avatar,
 *  gender matched, so no two accounts collide. Cached hard (seed is stable). */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ seed: string }> },
) {
  const { seed } = await params;
  const female = seedGender(seed) === "f";
  const options = {
    seed,
    ...BASE,
    top: female ? FEMALE_TOP : MALE_TOP,
    facialHairProbability: female ? 0 : 30,
    facialHair: ["beardLight", "beardMedium", "moustacheFancy", "beardMajestic"],
    facialHairColor: ["2c1b18", "0e0e0e", "4a312c"],
    backgroundColor: [BG[hash(seed) % BG.length]],
  };
  // DiceBear's option arrays are strict string-literal unions; our values are
  // valid but typed as string[], so cast past the enum check.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svg = createAvatar(avataaars, options as any).toString();

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
