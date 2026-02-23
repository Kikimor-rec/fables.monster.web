"use client";

import { useEffect, useState } from "react";

type Tone = "red" | "cyan" | "green" | "fuchsia" | "amber";

interface StoryBackToTopProps {
  tone?: Tone;
}

const toneClasses: Record<Tone, string> = {
  red: "border-red-500/60 bg-red-950/80 text-red-200 hover:bg-red-900/85 hover:border-red-400",
  cyan: "border-cyan-500/60 bg-cyan-950/80 text-cyan-200 hover:bg-cyan-900/85 hover:border-cyan-400",
  green: "border-green-500/60 bg-green-950/80 text-green-200 hover:bg-green-900/85 hover:border-green-400",
  fuchsia: "border-fuchsia-500/60 bg-fuchsia-950/80 text-fuchsia-200 hover:bg-fuchsia-900/85 hover:border-fuchsia-400",
  amber: "border-[#f78840]/70 bg-[#2f3f58]/90 text-[#f7c89f] hover:bg-[#2f3f58] hover:border-[#ff683d]",
};

const toneFontClasses: Record<Tone, string> = {
  red: "font-orbitron",
  cyan: "font-orbitron",
  green: "font-orbitron",
  fuchsia: "font-orbitron",
  amber: "[font-family:var(--font-exp-heading)]",
};

export default function StoryBackToTop({ tone = "red" }: StoryBackToTopProps) {
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  useEffect(() => {
    let rafId: number | null = null;

    const evaluate = () => {
      setVisible(window.scrollY > 700);
    };

    const onScroll = () => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        evaluate();
      });
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-5 right-4 z-40 min-h-[44px] min-w-[44px] border px-3 py-2.5 text-xs tracking-[0.14em] uppercase backdrop-blur transition-colors ${toneFontClasses[tone]} ${toneClasses[tone]}`}
      aria-label="Back to top"
    >
      Top
    </button>
  );
}
