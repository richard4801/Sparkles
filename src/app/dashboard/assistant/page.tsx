import type { Metadata } from "next";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import { requireUser } from "@/lib/require-user";
import { aiConfigured } from "@/lib/ai/provider";
import { AssistantChat } from "@/components/ai/assistant-chat";

export const metadata: Metadata = { title: "Study assistant" };
export const dynamic = "force-dynamic";

export default async function AssistantPage() {
  await requireUser();
  const live = aiConfigured();

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Study assistant
          </h1>
          <p className="mt-1.5 text-muted-foreground">
            Find the right resources by asking in plain language.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-subtle px-3 py-1.5 text-xs font-semibold text-muted-foreground">
          <Sparkle weight="fill" className="size-3.5 text-primary" aria-hidden />
          {live ? "AI answers on" : "Smart catalog search"}
        </span>
      </header>
      <AssistantChat />
    </div>
  );
}
