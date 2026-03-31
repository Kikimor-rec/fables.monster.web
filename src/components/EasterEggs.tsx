"use client";

import { useEffect, useCallback, useRef, useState } from "react";

const STORAGE_KEY = "fm-discoveries";

interface Discovery {
  id: string;
  label: string;
  found: boolean;
}

const ALL_DISCOVERIES: Omit<Discovery, "found">[] = [
  { id: "konami", label: "↑↑↓↓←→←→BA" },
  { id: "logo-click", label: "Logo Secret" },
  { id: "scroll-bottom", label: "Deep Diver" },
];

function getDiscoveries(): Discovery[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const found: string[] = raw ? JSON.parse(raw) : [];
    return ALL_DISCOVERIES.map((d) => ({ ...d, found: found.includes(d.id) }));
  } catch {
    return ALL_DISCOVERIES.map((d) => ({ ...d, found: false }));
  }
}

function markFound(id: string): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const found: string[] = raw ? JSON.parse(raw) : [];
    if (found.includes(id)) return false;
    found.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    return true;
  } catch {
    return false;
  }
}

// ── Toast notification ──
function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] animate-[slide-down_0.3s_ease-out] pointer-events-auto">
      <div className="bg-gray-900 border border-cyan-500 text-cyan-400 px-5 py-3 font-orbitron text-sm shadow-[0_0_20px_rgba(0,240,255,0.3)]">
        <span className="text-cyan-300 mr-2">▸</span>
        {message}
      </div>
    </div>
  );
}

export default function EasterEggs() {
  const [toast, setToast] = useState<string | null>(null);
  const konamiRef = useRef<string[]>([]);

  const trigger = useCallback((id: string) => {
    const disc = ALL_DISCOVERIES.find((d) => d.id === id);
    if (!disc) return;
    const isNew = markFound(id);
    if (isNew) {
      const discoveries = getDiscoveries();
      const count = discoveries.filter((d) => d.found).length;
      setToast(`DISCOVERED: ${disc.label} [${count}/${ALL_DISCOVERIES.length}]`);
    }
  }, []);

  // Konami code: ↑↑↓↓←→←→BA
  useEffect(() => {
    const KONAMI = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a",
    ];

    const handler = (e: KeyboardEvent) => {
      konamiRef.current.push(e.key);
      if (konamiRef.current.length > KONAMI.length) {
        konamiRef.current = konamiRef.current.slice(-KONAMI.length);
      }
      if (konamiRef.current.join(",") === KONAMI.join(",")) {
        trigger("konami");
        // Visual reward: brief glitch on body
        document.body.classList.add("animate-[soft-glitch_0.4s_ease-in-out]");
        setTimeout(() => document.body.classList.remove("animate-[soft-glitch_0.4s_ease-in-out]"), 500);
        konamiRef.current = [];
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [trigger]);

  // Scroll to bottom detection
  useEffect(() => {
    const handler = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll > 500 && window.scrollY >= maxScroll - 5) {
        trigger("scroll-bottom");
      }
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [trigger]);

  // Logo click (listen for clicks on elements with data-easter="logo")
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-easter="logo"]')) {
        trigger("logo-click");
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [trigger]);

  return toast ? <Toast message={toast} onDone={() => setToast(null)} /> : null;
}
