import { localeRedirectHandler } from './i18n-proxy';

export function proxy(request: Parameters<typeof localeRedirectHandler>[0]) {
  return localeRedirectHandler(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|_vercel|favicon.ico|.*\\..*).*)',
  ],
};