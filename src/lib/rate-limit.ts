interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
}

type RateLimitStore = Map<string, number[]>;

declare global {
  var __fmRateLimitStore: RateLimitStore | undefined;
}

const store: RateLimitStore = globalThis.__fmRateLimitStore ?? new Map<string, number[]>();
if (!globalThis.__fmRateLimitStore) {
  globalThis.__fmRateLimitStore = store;
}

function pruneExpired(now: number, windowMs: number) {
  if (store.size < 5000) return;

  for (const [key, timestamps] of store.entries()) {
    const valid = timestamps.filter((timestamp) => now - timestamp < windowMs);
    if (valid.length === 0) {
      store.delete(key);
      continue;
    }

    if (valid.length !== timestamps.length) {
      store.set(key, valid);
    }
  }
}

export function checkRateLimit(key: string, options: RateLimitOptions): boolean {
  const now = Date.now();
  pruneExpired(now, options.windowMs);

  const requests = (store.get(key) || []).filter(
    (timestamp) => now - timestamp < options.windowMs,
  );

  requests.push(now);
  store.set(key, requests);

  return requests.length <= options.maxRequests;
}
