"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileCloseButtonRef = useRef<HTMLButtonElement>(null);

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
    <nav className="fixed top-0 w-full z-50 px-6 py-4 bg-black/80 backdrop-blur-sm border-b border-red-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-red-500 rounded">
          <Image src="/logos/fm-logo-gorizntal-w.png" alt="Fables Monster Logo" width={160} height={56} className="h-12 w-auto logo-glitch" priority />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link transition-colors font-orbitron font-bold ${isActive(link.href)
                ? "nav-link-active text-red-400"
                : "text-white hover:text-red-400"
                } focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-1 py-2`}
            >
              {link.label}
            </Link>
          ))}
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
      </div>
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
            aria-label="Main menu"
          >
            <button
              ref={mobileCloseButtonRef}
              className="absolute top-4 right-4 text-white text-4xl p-2 focus:outline-none focus:ring-2 focus:ring-red-500 rounded z-50"
              onClick={handleCloseMenu}
              aria-label="Close menu"
            >
              ×
            </button>
            <nav className="w-full flex flex-col items-center gap-2" role="menubar">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-2xl font-orbitron font-bold py-6 w-full text-center transition-colors ${isActive(link.href)
                    ? "nav-link-active text-red-400"
                    : "text-white hover:text-red-400"
                    } focus:outline-none focus:ring-2 focus:ring-red-500 rounded mx-4`}
                  onClick={handleCloseMenu}
                  role="menuitem"
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
