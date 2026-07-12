import "server-only";
import Anthropic from "@anthropic-ai/sdk";

/** Whether a live LLM provider is configured. When false, the app runs in
 *  "local mode": every AI feature falls back to the deterministic heuristics in
 *  this folder, so nothing breaks without an API key. */
export function aiConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/** Model id, configurable per-deployment. Defaults to a fast, low-cost Claude
 *  model that suits a study-help chat; set ANTHROPIC_MODEL to a more capable
 *  model for richer answers. */
export function aiModel(): string {
  return process.env.ANTHROPIC_MODEL || "claude-haiku-4-5";
}

let client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!client) client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return client;
}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

/** Single grounded completion. Callers must check `aiConfigured()` first; this
 *  throws if no key is set. Returns the assistant's plain-text reply. */
export async function completeChat({
  system,
  messages,
  maxTokens = 1024,
}: {
  system: string;
  messages: ChatTurn[];
  maxTokens?: number;
}): Promise<string> {
  const response = await getClient().messages.create({
    model: aiModel(),
    max_tokens: maxTokens,
    system,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });
  return response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();
}
