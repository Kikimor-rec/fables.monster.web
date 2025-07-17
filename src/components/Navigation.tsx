"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import Image from "next/image";
// ...удалён импорт FinalEditable...
// ...удалён импорт useContent...

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();


  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/projects", label: "PROJECTS" },
    { href: "/lost-mark", label: "LOST MARK" },
    { href: "/timer", label: "TIMER" },
    { href: "/about", label: "ABOUT" },
    { href: "/contact", label: "CONTACT" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 bg-black/80 backdrop-blur-sm border-b border-red-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logos/fm-logo-gorizntal-w.png" alt="Fables Monster Logo" width={160} height={56} className="h-12 w-auto" priority />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link transition-colors font-nunito font-bold ${
                isActive(link.href)
                  ? "nav-link-active text-red-400"
                  : "text-white hover:text-red-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
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
      </div>
      {/* Mobile Menu (Portal) */}
      {typeof window !== 'undefined' && isMenuOpen && createPortal(
        <>
          {/* Затемнённый фон */}
          <div
            className="fixed inset-0 z-40 bg-black/70"
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Само меню */}
          <div className="fixed left-0 top-0 z-50 w-full bg-black flex flex-col items-center shadow-2xl animate-slide-down pt-8 pb-8">
            <button
              className="absolute top-4 right-4 text-white text-4xl p-2 focus:outline-none z-50"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Закрыть меню"
            >
              ×
            </button>
            <nav className="w-full flex flex-col items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-2xl font-nunito font-bold py-6 w-full text-center transition-colors ${
                    isActive(link.href)
                      ? "nav-link-active text-red-400"
                      : "text-white hover:text-red-400"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </>,
        document.body
      )}
    </nav>
  );
}
