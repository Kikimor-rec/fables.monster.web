import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { languages, fallbackLng } from './i18n/settings'

function getLocale(request: NextRequest): string {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' }
  const languagesList = new Negotiator({ headers }).languages()
  return match(languagesList, languages, fallbackLng)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = languages.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    
    // Redirect if there is no locale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal/system paths and files
    '/((?!api|_next/static|_next/image|_vercel|favicon.ico|.*\\..*).*)',
  ],
}
