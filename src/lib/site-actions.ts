"use server";

import { db } from "@/db";
import { subscribers, contactMessages } from "@/db/schema";

export interface FormResult {
  ok: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Capture a newsletter signup. Idempotent — re-subscribing is a no-op success. */
export async function subscribeEmail(email: string): Promise<FormResult> {
  const clean = String(email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(clean)) return { ok: false, error: "Enter a valid email address." };
  try {
    await db.insert(subscribers).values({ email: clean }).onConflictDoNothing();
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not subscribe. Please try again." };
  }
}

/** Persist a contact-form message. (Email delivery is added in the emails phase.) */
export async function submitContactMessage(fd: FormData): Promise<FormResult> {
  const name = String(fd.get("name") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim().toLowerCase();
  const subject = String(fd.get("subject") ?? "").trim();
  const message = String(fd.get("message") ?? "").trim();

  if (!name) return { ok: false, error: "Please tell us your name." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Enter a valid email address." };
  if (message.length < 10) return { ok: false, error: "Please add a bit more detail." };

  try {
    await db.insert(contactMessages).values({ name, email, subject, message });
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not send your message. Please try again." };
  }
}
