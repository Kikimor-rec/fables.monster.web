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
  const mobileMenuRef = useRef<HTMLDivElement>(null);
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
        {lang === 'ru' ? 'Перейти к контенту' : 'Skip to content'}
      </a>

      <header role="banner" className="fixed top-0 w-full z-50 px-6 py-4 bg-black/80 backdrop-blur-sm border-b border-red-700">
        <nav className="max-w-7xl mx-auto flex justify-between items-center" aria-label="Main navigation">
          <Link
            href={`/${lang}`}
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
            aria-label={lang === 'ru' ? 'Fables Monster - На главную' : 'Fables Monster - Home'}
          >
            <Image src="/logos/fm-logo-gorizntal-w.png" alt="" width={160} height={56} className="h-12 w-auto logo-glitch" priority aria-hidden="true" />
            <span className="sr-only">Fables Monster Studio</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center" role="menubar">
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
            <div className="flex items-center gap-2 font-orbitron font-bold text-sm ml-4 border-l border-gray-700 pl-4" role="group" aria-label={lang === 'ru' ? 'Выбор языка' : 'Language selection'}>
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
          className="md:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
          onClick={handleMenuToggle}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
            className="fixed inset-0 z-40 bg-black/70"
            onClick={handleCloseMenu}
            aria-hidden="true"
          />
          {/* Menu Panel */}
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="fixed left-0 top-0 z-50 w-full bg-black flex flex-col items-center shadow-2xl animate-slide-down pt-8 pb-8"
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'ru' ? 'Главное меню' : 'Main menu'}
          >
            <button
              ref={mobileCloseButtonRef}
              className="absolute top-4 right-4 text-white text-4xl p-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded z-50"
              onClick={handleCloseMenu}
              aria-label={lang === 'ru' ? 'Закрыть меню' : 'Close menu'}
            >
              ×
            </button>
            <nav className="w-full flex flex-col items-center gap-2" role="menubar" aria-label={lang === 'ru' ? 'Мобильная навигация' : 'Mobile navigation'}>
              {navLinks.map((link) => {
                const isCurrent = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link text-2xl font-orbitron font-bold py-6 w-full text-center transition-colors ${isCurrent
                      ? "nav-link-active text-red-400"
                      : "text-white hover:text-red-400"
                      } focus:outline-none focus:ring-2 focus:ring-red-500 rounded mx-4`}
                    onClick={handleCloseMenu}
                    role="menuitem"
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex items-center gap-4 font-orbitron font-bold text-xl mt-4" role="group" aria-label={lang === 'ru' ? 'Выбор языка' : 'Language selection'}>
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
          </div>
        </>,
        document.body
      )}
    </>
  );
}
