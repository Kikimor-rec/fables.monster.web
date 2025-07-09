"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import FinalEditable from "@/components/FinalEditable";
import { useContent } from "@/hooks/useContent";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { content } = useContent('site-content.json');

  const navLinks = [
    { href: "/", label: content?.navigation?.home || "HOME", path: "navigation.home" },
    { href: "/projects", label: content?.navigation?.projects || "PROJECTS", path: "navigation.projects" },
    { href: "/lost-mark", label: "LOST MARK", path: "common.lost_mark_button" },
    { href: "/about", label: content?.navigation?.about || "ABOUT", path: "navigation.about" },
    { href: "/contact", label: content?.navigation?.contact || "CONTACT", path: "navigation.contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 bg-black/80 backdrop-blur-sm border-b border-red-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white font-mono tracking-wider">
          <FinalEditable trigger="click" 
            value={content?.footer?.studio_name || "FABLES MONSTER"}
            path="footer.studio_name"
            tag="span"
            className="inline-block"
          />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors font-mono font-bold ${
                isActive(link.href)
                  ? "text-red-400 border-b border-red-400"
                  : "text-white hover:text-red-400"
              }`}
            >
              <FinalEditable trigger="click" 
                value={link.label}
                path={link.path}
                tag="span"
                className="inline-block"
              />
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
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block transition-colors font-mono font-bold ${
                  isActive(link.href)
                    ? "text-red-400"
                    : "text-white hover:text-red-400"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <FinalEditable trigger="click" 
                  value={link.label}
                  path={link.path}
                  tag="span"
                  className="inline-block"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
