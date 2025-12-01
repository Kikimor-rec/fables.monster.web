"use client";

import { useState, useEffect } from "react";

interface LostMarkNavigationProps {
    dict?: {
        about?: string;
        features?: string;
        expansion?: string;
        foundry?: string;
        roll20?: string;
        tools?: string;
        soundtrack?: string;
    };
}

export default function LostMarkNavigation({ dict }: LostMarkNavigationProps) {
    const [activeSection, setActiveSection] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);

            // Determine active section
            const sections = ["about", "features", "expansion", "foundry", "roll20", "tools", "soundtrack"];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= 300) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { id: "about", label: dict?.about || "About" },
        { id: "features", label: dict?.features || "Features" },
        { id: "expansion", label: dict?.expansion || "Expansion" },
        { id: "foundry", label: dict?.foundry || "Foundry VTT" },
        { id: "roll20", label: dict?.roll20 || "Roll20" },
        { id: "tools", label: dict?.tools || "Tools" },
        { id: "soundtrack", label: dict?.soundtrack || "OST" },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, // Offset for sticky header
                behavior: "smooth",
            });
        }
    };

    return (
        <nav
            className={`sticky top-[81px] z-40 transition-all duration-300 border-b border-red-900/50 ${isScrolled ? "bg-black/90 backdrop-blur-md py-2" : "bg-black py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto">
                <ul className="flex items-center justify-center gap-1 sm:gap-6 min-w-max">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                onClick={(e) => scrollToSection(e, item.id)}
                                className={`px-3 py-2 rounded text-sm sm:text-base font-nunito font-bold transition-colors duration-200 ${activeSection === item.id
                                        ? "text-red-500 bg-red-950/30"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
