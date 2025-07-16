"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
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
    <nav className="fixed top-0 w-full z-50 px-6 py-4 bg-black/90 backdrop-blur-sm border-b border-red-700">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <Link
          href="/"
          className="text-lg sm:text-2xl font-bold text-white font-mono tracking-wider whitespace-nowrap"
        >
          FABLES MONSTER
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link transition-colors font-mono font-bold text-sm md:text-base ${
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-red-700">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link block py-2 transition-colors font-mono font-bold text-base ${
                  isActive(link.href)
                    ? "nav-link-active text-red-400"
                    : "text-white hover:text-red-400"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
