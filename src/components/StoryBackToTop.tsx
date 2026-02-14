"use client";

import { useEffect, useState } from "react";

type Tone = "red" | "cyan" | "green" | "fuchsia";

interface StoryBackToTopProps {
  tone?: Tone;
}

const toneClasses: Record<Tone, string> = {
  red: "border-red-500/60 bg-red-950/80 text-red-200 hover:bg-red-900/85 hover:border-red-400",
  cyan: "border-cyan-500/60 bg-cyan-950/80 text-cyan-200 hover:bg-cyan-900/85 hover:border-cyan-400",
  green: "border-green-500/60 bg-green-950/80 text-green-200 hover:bg-green-900/85 hover:border-green-400",
  fuchsia: "border-fuchsia-500/60 bg-fuchsia-950/80 text-fuchsia-200 hover:bg-fuchsia-900/85 hover:border-fuchsia-400",
};

export default function StoryBackToTop({ tone = "red" }: StoryBackToTopProps) {
  const [visible, setVisible] = useState(false);

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
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 right-4 z-40 border px-3 py-2 font-orbitron text-xs tracking-[0.14em] uppercase backdrop-blur transition-colors ${toneClasses[tone]}`}
      aria-label="Back to top"
    >
      Top
    </button>
  );
}
