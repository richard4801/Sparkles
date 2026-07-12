"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkle,
  PaperPlaneRight,
  ArrowUpRight,
  Student,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { formatNaira, cn } from "@/lib/utils";

interface Source {
  id: string;
  title: string;
  type: string;
  institution: string;
  priceNaira: number;
}
interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  mode?: "ai" | "local";
}

const SUGGESTIONS = [
  "Final year project ideas in computer science",
  "Past questions for accounting students",
  "Feasibility study on solar energy",
  "Research on youth unemployment in Nigeria",
];

export function AssistantChat() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || loading) return;
    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer, sources: data.sources, mode: data.mode },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            e instanceof Error ? e.message : "Sorry, I couldn't answer that. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const empty = messages.length === 0;

  return (
    <div className="flex h-[calc(100dvh-9rem)] flex-col rounded-2xl border border-border bg-surface shadow-[var(--shadow-xs)]">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 sm:p-6">
        {empty ? (
          <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Sparkle weight="fill" className="size-7" aria-hidden />
            </span>
            <h2 className="mt-4 font-display text-xl font-extrabold text-foreground">
              How can I help you study?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Ask about a topic, course or project and I&apos;ll find the most relevant
              resources in the Sparklyn catalog.
            </p>
            <div className="mt-6 grid w-full gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => ask(s)}
                  className="rounded-xl border border-border bg-surface px-3.5 py-2.5 text-left text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-primary-tint"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <ul className="mx-auto grid max-w-2xl gap-5">
            {messages.map((m, i) => (
              <li key={i} className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full",
                    m.role === "user"
                      ? "bg-surface-subtle text-muted-foreground"
                      : "bg-primary text-primary-foreground",
                  )}
                >
                  {m.role === "user" ? (
                    <Student weight="fill" className="size-4" aria-hidden />
                  ) : (
                    <Sparkle weight="fill" className="size-4" aria-hidden />
                  )}
                </span>
                <div className={cn("min-w-0 max-w-[85%]", m.role === "user" && "text-right")}>
                  <div
                    className={cn(
                      "inline-block whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-surface-subtle text-foreground",
                    )}
                  >
                    {m.content}
                  </div>
                  {m.sources && m.sources.length > 0 ? (
                    <ul className="mt-3 grid gap-2 text-left">
                      {m.sources.map((s) => (
                        <li key={s.id}>
                          <Link
                            href={`/resource/${s.id}`}
                            className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-primary/30 hover:bg-primary-tint"
                          >
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold text-foreground group-hover:text-primary">
                                {s.title}
                              </span>
                              <span className="block truncate text-xs text-muted-foreground">
                                {s.type} · {s.institution} · {formatNaira(s.priceNaira)}
                              </span>
                            </span>
                            <ArrowUpRight
                              weight="bold"
                              className="size-4 shrink-0 text-faint-foreground group-hover:text-primary"
                              aria-hidden
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
            {loading ? (
              <li className="flex gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Sparkle weight="fill" className="size-4 animate-pulse" aria-hidden />
                </span>
                <div className="inline-flex items-center gap-1 rounded-2xl bg-surface-subtle px-4 py-3">
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
                </div>
              </li>
            ) : null}
          </ul>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex items-center gap-2 border-t border-border p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a topic, course or project…"
          aria-label="Ask the study assistant"
          maxLength={500}
          className="h-12 flex-1 rounded-full border border-border-strong bg-surface px-5 text-sm text-foreground shadow-[var(--shadow-xs)] focus-visible:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
        <Button type="submit" size="icon" disabled={loading || !input.trim()} aria-label="Send">
          <PaperPlaneRight weight="fill" className="size-5" aria-hidden />
        </Button>
      </form>
    </div>
  );
}
