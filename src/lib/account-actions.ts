"use server";

import { randomBytes } from "node:crypto";
import { and, eq, lt } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users, verificationTokens } from "@/db/schema";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
  siteUrl,
} from "@/lib/email";

export interface ActionResult {
  ok: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function newToken(): string {
  return randomBytes(32).toString("hex");
}

async function createToken(email: string, type: "password_reset" | "email_verify") {
  // Clear any prior tokens of this type for the address, then issue a fresh one.
  await db
    .delete(verificationTokens)
    .where(and(eq(verificationTokens.identifier, email), eq(verificationTokens.type, type)));
  const token = newToken();
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await db.insert(verificationTokens).values({ identifier: email, token, type, expires });
  return token;
}

/** Send a verification email for a freshly registered address (best-effort). */
export async function sendVerificationFor(email: string): Promise<void> {
  try {
    const token = await createToken(email, "email_verify");
    await sendVerificationEmail(email, `${siteUrl()}/verify?token=${token}`);
  } catch {
    // ignore — verification is not required to use the account
  }
}

/** Request a password reset. Always reports success (never leaks whether an
 *  account exists). Sends a reset link if the email is registered. */
export async function requestPasswordReset(email: string): Promise<ActionResult> {
  const clean = String(email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(clean)) return { ok: false, error: "Enter a valid email address." };

  const [user] = await db.select().from(users).where(eq(users.email, clean)).limit(1);
  if (user) {
    try {
      const token = await createToken(clean, "password_reset");
      await sendPasswordResetEmail(clean, `${siteUrl()}/reset-password?token=${token}`);
    } catch {
      // fall through to generic success
    }
  }
  return { ok: true };
}

/** Complete a password reset using a token. */
export async function resetPassword(token: string, password: string): Promise<ActionResult> {
  if (password.length < 8) return { ok: false, error: "Password must be at least 8 characters." };

  const [row] = await db
    .select()
    .from(verificationTokens)
    .where(and(eq(verificationTokens.token, token), eq(verificationTokens.type, "password_reset")))
    .limit(1);
  if (!row) return { ok: false, error: "This reset link is invalid or has already been used." };
  if (row.expires < new Date()) {
    await db.delete(verificationTokens).where(eq(verificationTokens.id, row.id));
    return { ok: false, error: "This reset link has expired. Please request a new one." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.update(users).set({ passwordHash }).where(eq(users.email, row.identifier));
  await db.delete(verificationTokens).where(eq(verificationTokens.id, row.id));
  return { ok: true };
}

/** Confirm an email using a verification token. */
export async function verifyEmailToken(token: string): Promise<ActionResult> {
  const [row] = await db
    .select()
    .from(verificationTokens)
    .where(and(eq(verificationTokens.token, token), eq(verificationTokens.type, "email_verify")))
    .limit(1);
  if (!row) return { ok: false, error: "This verification link is invalid or already used." };
  if (row.expires < new Date()) {
    await db.delete(verificationTokens).where(eq(verificationTokens.id, row.id));
    return { ok: false, error: "This verification link has expired." };
  }
  await db.update(users).set({ emailVerified: new Date() }).where(eq(users.email, row.identifier));
  await db.delete(verificationTokens).where(eq(verificationTokens.id, row.id));
  // Opportunistic cleanup of expired tokens.
  await db.delete(verificationTokens).where(lt(verificationTokens.expires, new Date()));
  return { ok: true };
}
