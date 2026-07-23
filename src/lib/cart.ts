// localStorage-backed cart, exposed as an external store for useSyncExternalStore.
export interface CartItem {
  id: string; // resource id
  title: string;
  priceNaira: number;
  thumbnailSeed: string;
  type: string;
}

const KEY = "skola:cart";
const EMPTY: CartItem[] = [];

function read(): CartItem[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

let cache: CartItem[] = read();
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function write(next: CartItem[]) {
  cache = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // ignore quota / privacy-mode errors
    }
  }
  emit();
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      cache = read();
      emit();
    }
  });
}

export function subscribeCart(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getCartSnapshot() {
  return cache;
}

export function getCartServerSnapshot() {
  return EMPTY;
}

export function isInCart(id: string) {
  return cache.some((i) => i.id === id);
}

export function addToCart(item: CartItem) {
  if (cache.some((i) => i.id === item.id)) return;
  write([...cache, item]);
}

export function removeFromCart(id: string) {
  write(cache.filter((i) => i.id !== id));
}

export function toggleCart(item: CartItem) {
  if (cache.some((i) => i.id === item.id)) removeFromCart(item.id);
  else addToCart(item);
}

export function clearCart() {
  write(EMPTY);
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.priceNaira, 0);
}
