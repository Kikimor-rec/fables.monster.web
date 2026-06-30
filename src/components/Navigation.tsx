import Link from 'next/link';
import Image from 'next/image';
import type { NavDict } from '@/types/i18n';
import {
  getFeaturedWork,
  getHeaderCta,
  getPrimaryNavigation,
  getUtilityLinks,
} from '@/lib/site-navigation';
import DesktopNavigation from './navigation/DesktopNavigation';
import HeaderCta from './navigation/HeaderCta';
import LanguageSwitch from './navigation/LanguageSwitch';
import MobileNavigation from './navigation/MobileNavigation';

export default function Navigation({ lang, dict }: { lang: string; dict: NavDict }) {
  const primaryItems = getPrimaryNavigation(lang, dict);
  const featuredItems = getFeaturedWork(lang);
  const utilityItems = getUtilityLinks(lang);
  const cta = getHeaderCta(lang, dict);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-red-700 focus:px-4 focus:py-2 focus:font-orbitron focus:text-white"
      >
        {dict.skipToContent || 'Skip to content'}
      </a>

      <header
        role="banner"
        className="fixed inset-x-0 top-0 z-50 border-b border-red-950/80 bg-black/75 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl supports-[backdrop-filter]:bg-black/55 sm:px-6"
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-4"
          aria-label={dict.mainNavigation || 'Main navigation'}
        >
          <Link
            href={`/${lang}`}
            className="flex min-w-0 items-center gap-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label={dict.homeAriaLabel || 'Fables Monster - Home'}
            data-easter="logo"
          >
            <Image
              src="/logos/fm-logo-gorizntal-w.png"
              alt=""
              width={160}
              height={56}
              className="logo-glitch h-10 w-auto sm:h-12"
              priority
              aria-hidden="true"
            />
            <span className="sr-only">Fables Monster Studio</span>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <DesktopNavigation items={primaryItems} lang={lang} />
            <div className="h-6 w-px bg-red-950" aria-hidden="true" />
            <LanguageSwitch lang={lang} dict={dict} />
            <HeaderCta item={cta} />
          </div>

          <MobileNavigation
            lang={lang}
            dict={dict}
            primaryItems={primaryItems}
            featuredItems={featuredItems}
            utilityItems={utilityItems}
            cta={cta}
          />
        </nav>
      </header>
    </>
  );
}
