"use client";

import { useState, useEffect } from "react";

interface KrampNavigationProps {
  dict?: {
    about?: string;
    features?: string;
    postcard?: string;
    soundtrack?: string;
    tables?: string;
    links?: string;
  };
}

export default function KrampNavigation({ dict }: KrampNavigationProps) {
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero (about 600px)
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        setIsVisible(rect.top <= 150);
      }

      // Determine active section
      const sections = ["about", "features", "postcard", "soundtrack", "tables", "links"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "about", label: dict?.about || "About" },
    { id: "features", label: dict?.features || "Features" },
    { id: "postcard", label: dict?.postcard || "Postcard" },
    { id: "soundtrack", label: dict?.soundtrack || "OST" },
    { id: "tables", label: dict?.tables || "Tables" },
    { id: "links", label: dict?.links || "Links" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 130,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-[80px] left-0 right-0 z-40 transition-all duration-300 border-b border-red-900/50 font-orbitron ${
        isVisible 
          ? "translate-y-0 opacity-100" 
          : "-translate-y-full opacity-0 pointer-events-none"
      } bg-black/95 backdrop-blur-md py-2`}
    >
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.03)_2px,rgba(0,255,0,0.03)_4px)]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-2 sm:px-6 overflow-x-auto relative z-10 scrollbar-hide">
        <ul className="flex items-center justify-start sm:justify-center gap-1 sm:gap-3 min-w-max px-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded text-[10px] sm:text-xs font-bold transition-all duration-200 uppercase tracking-wide whitespace-nowrap ${
                  activeSection === item.id
                    ? "text-green-400 bg-green-900/30 border border-green-500/50 shadow-[0_0_10px_rgba(74,222,128,0.3)]"
                    : "text-gray-400 hover:text-red-400 hover:bg-red-900/20 border border-transparent hover:border-red-500/30"
                }`}
              >
                <span className={activeSection === item.id ? "animate-pulse" : ""}>
                  {activeSection === item.id ? ">" : ""} {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
