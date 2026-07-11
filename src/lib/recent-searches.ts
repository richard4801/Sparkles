// Small external store over localStorage so components can read recent searches
// via useSyncExternalStore (no setState-in-effect, SSR-safe).
const KEY = "sparklyn:recent-searches";
const MAX = 6;
const EMPTY: string[] = [];

function read(): string[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

let cache: string[] = read();
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      cache = read();
      emit();
    }
  });
}

export function subscribeRecent(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getRecentSnapshot() {
  return cache;
}

export function getRecentServerSnapshot() {
  return EMPTY;
}

export function addRecentSearch(term: string) {
  const t = term.trim();
  if (!t || typeof window === "undefined") return;
  cache = [t, ...cache.filter((s) => s.toLowerCase() !== t.toLowerCase())].slice(0, MAX);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // ignore quota / privacy-mode errors
  }
  emit();
}

export function clearRecentSearches() {
  cache = EMPTY;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      // ignore
    }
  }
  emit();
}
