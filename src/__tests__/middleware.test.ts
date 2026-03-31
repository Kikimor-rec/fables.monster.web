import { describe, it, expect, vi } from 'vitest';

// Mock external dependencies before importing middleware
vi.mock('@formatjs/intl-localematcher', () => ({
  match: vi.fn((languages: string[], supported: string[], fallback: string) => {
    // Simple match: if any language is in supported, return it; otherwise fallback
    for (const lang of languages) {
      if (supported.includes(lang)) return lang;
    }
    return fallback;
  }),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NegotiatorMock(this: any, { headers }: { headers: Record<string, string> }) {
  const acceptLang = headers['accept-language'];
  this.languages = () => {
    if (!acceptLang) return ['en'];
    return acceptLang.split(',').map((l: string) => l.trim().split(';')[0]);
  };
}
vi.mock('negotiator', () => ({
  default: NegotiatorMock,
  __esModule: true,
}));

vi.mock('../i18n/settings', () => ({
  languages: ['en', 'ru'],
  fallbackLng: 'en',
}));

// Mock Next.js server APIs
const mockRedirect = vi.fn();
vi.mock('next/server', () => ({
  NextResponse: {
    redirect: (...args: unknown[]) => {
      mockRedirect(...args);
      return { type: 'redirect' };
    },
    next: () => ({ type: 'next' }),
  },
}));

describe('middleware', () => {
  const createMockRequest = (pathname: string, acceptLanguage = 'en') => ({
    nextUrl: {
      pathname,
      clone: () => ({ pathname }),
    },
    url: `http://localhost:3000${pathname}`,
    headers: {
      get: (name: string) => {
        if (name === 'accept-language') return acceptLanguage;
        return null;
      },
    },
  });

  it('redirects paths missing locale prefix', async () => {
    const { middleware } = await import('../middleware');
    const request = createMockRequest('/about');
    // @ts-expect-error - using mock request
    middleware(request);
    expect(mockRedirect).toHaveBeenCalled();
  });

  it('does not redirect paths with locale prefix', async () => {
    vi.resetModules();
    // Re-mock all dependencies
    vi.doMock('@formatjs/intl-localematcher', () => ({
      match: vi.fn(() => 'en'),
    }));
    vi.doMock('negotiator', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function MockNeg(this: any) {
        this.languages = () => ['en'];
      }
      return { default: MockNeg, __esModule: true };
    });
    vi.doMock('../i18n/settings', () => ({
      languages: ['en', 'ru'],
      fallbackLng: 'en',
    }));
    vi.doMock('next/server', () => ({
      NextResponse: {
        redirect: vi.fn(() => ({ type: 'redirect' })),
        next: () => ({ type: 'next' }),
      },
    }));

    const { middleware } = await import('../middleware');
    const request = createMockRequest('/en/about');
    // @ts-expect-error - using mock request
    const result = middleware(request);
    expect(result).toBeUndefined();
  });
});
