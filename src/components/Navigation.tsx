"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { NavDict } from '@/types/i18n';

export default function Navigation({ lang, dict }: { lang: string, dict: NavDict }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { href: `/${lang}`, label: dict?.home || "HOME", exact: true },
    { href: `/${lang}/projects`, label: dict?.projects || "PROJECTS" },
    { href: `/${lang}/timer`, label: dict?.timer || "TIMER" },
    { href: `/${lang}/about`, label: dict?.about || "ABOUT" },
    { href: `/${lang}/contact`, label: dict?.contact || "CONTACT" },
  ];

  const isActive = (href: string) => {
    if (href === `/${lang}` && pathname === `/${lang}`) return true;
    if (href !== `/${lang}` && pathname.startsWith(href)) return true;
    return false;
  };

  const switchLanguage = (newLang: string) => {
    if (!pathname) return `/${newLang}`;
    const segments = pathname.split('/');
    segments[1] = newLang;
    return segments.join('/');
  };

  // Handle keyboard events for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus the close button when menu opens
      setTimeout(() => {
        mobileCloseButtonRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  // Manage body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-red-700 focus:text-white focus:px-4 focus:py-2 focus:rounded font-orbitron"
      >
        {dict.skipToContent || 'Skip to content'}
      </a>

      <header role="banner" className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 py-3 bg-black/70 supports-[backdrop-filter]:bg-black/55 backdrop-blur-xl border-b border-red-900/70 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent pointer-events-none" />
        <nav className="max-w-7xl mx-auto flex justify-between items-center" aria-label={dict.mainNavigation || 'Main navigation'}>
          <Link
            href={`/${lang}`}
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
            aria-label={dict.homeAriaLabel || 'Fables Monster - Home'}
          >
            <Image src="/logos/fm-logo-gorizntal-w.png" alt="" width={160} height={56} className="h-10 sm:h-12 w-auto logo-glitch" priority aria-hidden="true" />
            <span className="sr-only">Fables Monster Studio</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 lg:space-x-8 items-center" role="menubar">
            {navLinks.map((link) => {
              const isCurrent = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link transition-colors font-orbitron font-bold ${isCurrent
                    ? "nav-link-active text-red-400"
                    : "text-white hover:text-red-400"
                    } focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-1 py-2`}
                  aria-current={isCurrent ? 'page' : undefined}
                  role="menuitem"
                >
                  {link.label}
                </Link>
              );
            })}
            {/* Language Switcher */}
            <div className="flex items-center gap-2 font-orbitron font-bold text-sm ml-4 border-l border-gray-700 pl-4" role="group" aria-label={dict.languageSelection || 'Language selection'}>
              <Link
                href={switchLanguage('en')}
                className={`transition-colors ${lang === 'en' ? 'text-red-400' : 'text-gray-400 hover:text-white'}`}
                aria-label="English"
                aria-current={lang === 'en' ? 'true' : undefined}
                hrefLang="en"
              >
                EN
              </Link>
              <span className="text-gray-600" aria-hidden="true">|</span>
              <Link
                href={switchLanguage('ru')}
                className={`transition-colors ${lang === 'ru' ? 'text-red-400' : 'text-gray-400 hover:text-white'}`}
                aria-label="Русский"
                aria-current={lang === 'ru' ? 'true' : undefined}
                hrefLang="ru"
              >
                RU
              </Link>
            </div>
          </div>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          className="md:hidden text-white p-2 rounded border border-red-900/50 bg-black/40 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={handleMenuToggle}
          aria-label={isMenuOpen ? (dict.closeMenu || 'Close menu') : (dict.openMenu || 'Open menu')}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        </nav>
      </header>

      {/* Mobile Menu (Portal) */}
      {typeof window !== 'undefined' && isMenuOpen && createPortal(
        <>
          {/* Darkened Background */}
          <div
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
            onClick={handleCloseMenu}
            aria-hidden="true"
          />
          {/* Menu Panel */}
          <aside
            ref={mobileMenuRef}
            id="mobile-menu"
            className="fixed right-0 top-0 z-50 h-dvh w-[min(92vw,420px)] bg-black/95 border-l border-red-900 shadow-2xl pt-16 px-6 pb-8 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={dict.mainMenu || 'Main menu'}
          >
            <button
              ref={mobileCloseButtonRef}
              className="absolute top-4 right-4 text-white text-3xl p-2 border border-red-900/50 bg-black/40 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              onClick={handleCloseMenu}
              aria-label={dict.closeMenu || 'Close menu'}
            >
              ×
            </button>
            <nav className="w-full flex flex-col items-stretch gap-1" role="menubar" aria-label={dict.mobileNavigation || 'Mobile navigation'}>
              {navLinks.map((link) => {
                const isCurrent = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link text-xl font-orbitron font-bold py-4 border-b border-red-900/30 transition-colors ${isCurrent
                      ? "nav-link-active text-red-400"
                      : "text-white hover:text-red-400"
                      } focus:outline-none focus:ring-2 focus:ring-red-500 rounded`}
                    onClick={handleCloseMenu}
                    role="menuitem"
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex items-center gap-4 font-orbitron font-bold text-lg mt-6 pt-4 border-t border-red-900/50" role="group" aria-label={dict.languageSelection || 'Language selection'}>
                <Link
                  href={switchLanguage('en')}
                  className={`transition-colors ${lang === 'en' ? 'text-red-400' : 'text-gray-400 hover:text-white'}`}
                  onClick={handleCloseMenu}
                  aria-label="English"
                  aria-current={lang === 'en' ? 'true' : undefined}
                  hrefLang="en"
                >
                  EN
                </Link>
                <span className="text-gray-600" aria-hidden="true">|</span>
                <Link
                  href={switchLanguage('ru')}
                  className={`transition-colors ${lang === 'ru' ? 'text-red-400' : 'text-gray-400 hover:text-white'}`}
                  onClick={handleCloseMenu}
                  aria-label="Русский"
                  aria-current={lang === 'ru' ? 'true' : undefined}
                  hrefLang="ru"
                >
                  RU
                </Link>
              </div>
            </nav>
          </aside>
        </>,
        document.body
      )}
    </>
  );
}
