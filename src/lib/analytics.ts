export function trackEvent(name: string, payload?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent('fm:analytics', {
      detail: {
        name,
        payload: payload || {},
      },
    }),
  );
}
