"use server";

import { revalidatePath } from "next/cache";
import { eq, and, ne } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { auth } from "@/auth";

export interface SettingsResult {
  ok: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LEVELS = ["ND", "HND", "BSc", "PGD", "MSc", "PhD"];

/** Persist profile fields for the signed-in user. */
export async function updateProfile(fd: FormData): Promise<SettingsResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "You need to be signed in." };
  const userId = session.user.id;

  const name = String(fd.get("name") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim().toLowerCase();
  const institution = String(fd.get("institution") ?? "").trim();
  const department = String(fd.get("department") ?? "").trim();
  const level = String(fd.get("level") ?? "").trim();

  if (!name) return { ok: false, error: "Name is required." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Enter a valid email address." };
  if (level && !LEVELS.includes(level)) return { ok: false, error: "Invalid level." };

  // Email must stay unique.
  const [clash] = await db
    .select({ id: users.id })
    .from(users)
    .where(and(eq(users.email, email), ne(users.id, userId)))
    .limit(1);
  if (clash) return { ok: false, error: "That email is already in use." };

  try {
    await db
      .update(users)
      .set({ name, email, institution, department, level: level || "BSc" })
      .where(eq(users.id, userId));
    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard");
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not save your profile." };
  }
}

/** Change the signed-in user's password (verifies the current one). */
export async function updatePassword(fd: FormData): Promise<SettingsResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, error: "You need to be signed in." };
  const userId = session.user.id;

  const current = String(fd.get("current") ?? "");
  const next = String(fd.get("next") ?? "");
  if (next.length < 8) return { ok: false, error: "New password must be at least 8 characters." };

  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user?.passwordHash) {
    return { ok: false, error: "This account has no password set." };
  }
  const ok = await bcrypt.compare(current, user.passwordHash);
  if (!ok) return { ok: false, error: "Your current password is incorrect." };

  try {
    const passwordHash = await bcrypt.hash(next, 10);
    await db.update(users).set({ passwordHash }).where(eq(users.id, userId));
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not update your password." };
  }
}
