import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { answerQuestion } from "@/lib/ai/assistant";
import type { ChatTurn } from "@/lib/ai/provider";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { question, history } = (body ?? {}) as {
    question?: unknown;
    history?: unknown;
  };

  if (typeof question !== "string" || question.trim().length === 0) {
    return NextResponse.json({ error: "A question is required." }, { status: 400 });
  }
  if (question.length > 500) {
    return NextResponse.json({ error: "Question is too long." }, { status: 400 });
  }

  const turns: ChatTurn[] = Array.isArray(history)
    ? (history as unknown[])
        .filter(
          (t): t is ChatTurn =>
            !!t &&
            typeof t === "object" &&
            (((t as ChatTurn).role === "user") || ((t as ChatTurn).role === "assistant")) &&
            typeof (t as ChatTurn).content === "string",
        )
        .slice(-6)
    : [];

  const result = await answerQuestion(question.trim(), turns);
  return NextResponse.json(result);
}
