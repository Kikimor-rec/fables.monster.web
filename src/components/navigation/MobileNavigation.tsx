"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { SiteNavItem } from '@/lib/site-navigation';
import type { NavDict } from '@/types/i18n';
import CaseFileLink from './CaseFileLink';
import DossierLabel from './DossierLabel';
import HeaderCta from './HeaderCta';
import LanguageSwitch from './LanguageSwitch';

type MobileNavigationProps = {
  lang: string;
  dict?: Partial<NavDict>;
  primaryItems: SiteNavItem[];
  featuredItems: SiteNavItem[];
  utilityItems: SiteNavItem[];
  cta: SiteNavItem;
};

export default function MobileNavigation({
  lang,
  dict,
  primaryItems,
  featuredItems,
  utilityItems,
  cta,
}: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    previousFocusedElementRef.current = document.activeElement as HTMLElement | null;

    const getFocusableElements = () => {
      const menu = mobileMenuRef.current;
      if (!menu) {
        return [] as HTMLElement[];
      }

      return Array.from(
        menu.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        mobileMenuRef.current?.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previousFocusedElementRef.current?.focus();
    };
  }, [isMenuOpen]);

  const isActive = (item: SiteNavItem) => {
    if (!pathname) {
      return false;
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <>
      <button
        ref={menuButtonRef}
        className="md:hidden border border-red-900/60 bg-black/50 px-3 py-2 font-orbitron text-xs font-bold uppercase tracking-[0.16em] text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        onClick={() => setIsMenuOpen((value) => !value)}
        aria-label={isMenuOpen ? dict?.closeMenu || 'Close menu' : dict?.openMenu || 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        {isMenuOpen ? 'CLOSE' : 'MENU'}
      </button>

      {typeof window !== 'undefined' &&
        isMenuOpen &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <aside
              ref={mobileMenuRef}
              id="mobile-menu"
              className="fixed right-0 top-0 z-50 h-dvh w-[min(94vw,440px)] overflow-y-auto border-l border-red-900 bg-black px-5 pb-8 pt-5 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label={dict?.mainMenu || 'Main menu'}
              tabIndex={-1}
            >
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-red-950 pb-4">
                <DossierLabel>{dict?.mainMenu || 'Main menu'}</DossierLabel>
                <button
                  ref={closeButtonRef}
                  className="border border-red-900/60 bg-zinc-950 px-3 py-2 font-orbitron text-xs font-bold uppercase tracking-[0.16em] text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={closeMenu}
                  aria-label={dict?.closeMenu || 'Close menu'}
                >
                  CLOSE
                </button>
              </div>

              <nav className="mb-7" aria-label={dict?.mobileNavigation || 'Mobile navigation'}>
                <ul className="space-y-1">
                  {primaryItems.map((item) => {
                    const active = isActive(item);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className={`block border border-transparent px-3 py-3 font-orbitron text-lg font-bold uppercase tracking-[0.12em] transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
                            active
                              ? 'border-red-600 bg-red-950/30 text-red-200'
                              : 'text-white hover:border-red-900 hover:text-red-300'
                          }`}
                          aria-current={active ? 'page' : undefined}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mb-7">
                <DossierLabel>{dict?.caseFiles || 'Case files'}</DossierLabel>
                <div className="mt-3 grid gap-2">
                  {featuredItems.slice(0, 4).map((item) => (
                    <CaseFileLink key={item.href} item={item} onClick={closeMenu} compact />
                  ))}
                </div>
              </div>

              <div className="mb-7">
                <DossierLabel>{dict?.tools || 'Tools / extras'}</DossierLabel>
                <div className="mt-3 flex flex-wrap gap-2">
                  {utilityItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className="border border-red-950 px-3 py-2 font-nunito text-sm text-zinc-300 transition-colors hover:border-red-600 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-auto border-t border-red-950 pt-5">
                <HeaderCta item={cta} className="w-full" onClick={closeMenu} />
                <LanguageSwitch
                  lang={lang}
                  dict={dict}
                  onNavigate={closeMenu}
                  className="mt-5 justify-center text-sm"
                />
              </div>
            </aside>
          </>,
          document.body,
        )}
    </>
  );
}
