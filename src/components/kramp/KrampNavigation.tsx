"use client";

import { useState, useEffect } from "react";

interface KrampNavigationProps {
  dict: {
    about: string;
    features: string;
    postcard: string;
    soundtrack: string;
    tables: string;
    links: string;
  };
}

const sections = ["about", "features", "postcard", "soundtrack", "tables", "links"] as const;

export default function KrampNavigation({ dict }: KrampNavigationProps) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-sm border-b border-red-900/50 transition-transform"
      aria-label="Section navigation"
    >
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex items-center justify-center gap-1 overflow-x-auto py-2 text-sm" role="list">
          {sections.map((id) => (
            <li key={id} role="listitem">
              <a
                href={`#${id}`}
                className={`px-3 py-1.5 rounded font-orbitron whitespace-nowrap transition-colors ${
                  active === id
                    ? "text-red-400 bg-red-900/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {dict[id]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
