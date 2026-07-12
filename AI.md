# AI features (Phase 5)

Sparklyn is built to be **AI-ready**: the architecture supports AI features
without a redesign, and several ship today. Everything works **with zero API
keys** via deterministic local heuristics, and transparently upgrades to a real
LLM when a key is present — the same pattern as payments' simulate mode. No
database migration is required; all AI features are derived at runtime.

## What's included

| Brief item | Where | How it works |
|------------|-------|--------------|
| AI research assistant / AI chat support | `/dashboard/assistant` | Chat grounded in the live catalog (RAG-lite): retrieve relevant resources, then answer with Claude (if keyed) or a grounded local reply |
| AI-powered / semantic search | `GET /api/ai/search?q=` | Relevance ranker over the catalog; swappable for embeddings behind the same contract |
| Intelligent recommendations / similar resources | `/resource/[id]` | Content-similarity ("More like this") |
| Personalized homepage | `/dashboard` | "Recommended for you" ranked from what the student has bought |
| Smart tagging | `/resource/[id]` | Keyword tags derived from each resource |
| Machine discovery | `/llms.txt` | A live, machine-readable index of the catalog for AI agents ([llmstxt.org](https://llmstxt.org)) |

## Architecture

```
src/lib/ai/
  text.ts        tokenizer + stopwords (pure)
  relevance.ts   query → ranked resources (semantic search / retrieval)
  recommend.ts   content similarity + personalization
  tags.ts        derived smart tags
  provider.ts    Claude client + config check (server-only)
  assistant.ts   retrieval + Claude-or-fallback answer (server-only)
```

- **`provider.ts`** is the only file that talks to an LLM. `aiConfigured()`
  gates every call; when it returns false the app uses the local heuristics.
- The heuristics (`relevance`, `recommend`, `tags`) are pure and deterministic —
  they are the fallback *and* the retrieval layer that grounds the LLM, so the
  assistant never hallucinates resources.

## Enabling live AI

Set these in the environment (e.g. Vercel → Settings → Environment Variables):

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Enables Claude-generated answers in the Study Assistant. Without it, the assistant still works using grounded local answers. |
| `ANTHROPIC_MODEL` | Optional. Model id (defaults to a fast, low-cost Claude model). Set a more capable model for richer answers. |

Get a key at <https://console.anthropic.com>. Nothing else changes — the
Study Assistant header shows "AI answers on" once a key is set.

## Upgrading the retrieval to embeddings

`rankByRelevance(query, resources)` is the single retrieval entry point used by
both search and the assistant. To move from lexical to vector search, replace
its body with an embeddings lookup — callers and the `/api/ai/search` contract
stay the same.
