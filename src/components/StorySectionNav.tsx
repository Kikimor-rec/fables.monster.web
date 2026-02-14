"use client";

import { useEffect, useState, type MouseEvent } from "react";

interface StorySectionNavItem {
  id: string;
  label: string;
}

interface StorySectionNavProps {
  items: StorySectionNavItem[];
  tone?: "red" | "cyan" | "green" | "fuchsia";
  topClassName?: string;
}

const toneClasses = {
  red: {
    active: "text-red-300 border-red-500/70 bg-red-950/50",
    idle: "text-zinc-400 border-transparent hover:text-red-200 hover:border-red-800/70 hover:bg-red-950/25",
  },
  cyan: {
    active: "text-cyan-300 border-cyan-500/70 bg-cyan-950/50",
    idle: "text-zinc-400 border-transparent hover:text-cyan-200 hover:border-cyan-800/70 hover:bg-cyan-950/25",
  },
  green: {
    active: "text-green-300 border-green-500/70 bg-green-950/50",
    idle: "text-zinc-400 border-transparent hover:text-green-200 hover:border-green-800/70 hover:bg-green-950/25",
  },
  fuchsia: {
    active: "text-fuchsia-300 border-fuchsia-500/70 bg-fuchsia-950/50",
    idle: "text-zinc-400 border-transparent hover:text-fuchsia-200 hover:border-fuchsia-800/70 hover:bg-fuchsia-950/25",
  },
};

export default function StorySectionNav({
  items,
  tone = "red",
  topClassName = "top-[76px]",
}: StorySectionNavProps) {
  const [activeSection, setActiveSection] = useState(items[0]?.id ?? "");

  useEffect(() => {
    let rafId: number | null = null;

    const detectActiveSection = () => {
      let current = items[0]?.id ?? "";

      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (!element) {
          return;
        }

        const top = element.getBoundingClientRect().top;
        if (top <= 170) {
          current = item.id;
        }
      });

      setActiveSection(current);
    };

    const handleScrollOrResize = () => {
      if (rafId !== null) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        detectActiveSection();
      });
    };

    detectActiveSection();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [items]);

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (!section) {
      return;
    }

    window.scrollTo({
      top: section.offsetTop - 130,
      behavior: "smooth",
    });
  };

  return (
    <nav className={`sticky ${topClassName} z-30 border-y border-zinc-800/80 bg-black/85 backdrop-blur-lg`} aria-label="Section navigation">
      <div className="fm-shell overflow-x-auto scrollbar-hide">
        <ul className="flex min-w-max items-center justify-start gap-2 py-2">
          {items.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(event) => scrollToSection(event, item.id)}
                  className={`inline-flex items-center border px-3 py-1.5 font-orbitron text-[11px] tracking-[0.15em] uppercase transition-colors ${
                    isActive ? toneClasses[tone].active : toneClasses[tone].idle
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
