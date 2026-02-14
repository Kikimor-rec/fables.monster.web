"use client";

import { useEffect, useState } from "react";

type Accent = "red" | "cyan" | "green" | "fuchsia";

interface StoryProgressBarProps {
  accent?: Accent;
  topClassName?: string;
}

const accentClasses: Record<Accent, string> = {
  red: "from-red-700 via-red-500 to-red-700 shadow-[0_0_14px_rgba(239,68,68,0.6)]",
  cyan: "from-cyan-700 via-cyan-400 to-cyan-700 shadow-[0_0_14px_rgba(34,211,238,0.6)]",
  green: "from-green-700 via-green-400 to-green-700 shadow-[0_0_14px_rgba(74,222,128,0.55)]",
  fuchsia: "from-fuchsia-700 via-fuchsia-400 to-fuchsia-700 shadow-[0_0_14px_rgba(232,121,249,0.55)]",
};

export default function StoryProgressBar({ accent = "red", topClassName = "top-[76px]" }: StoryProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const updateProgress = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(0, doc.scrollHeight - window.innerHeight);
      const next = maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0;
      setProgress(next);
    };

    const onScrollOrResize = () => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateProgress();
      });
    };

    updateProgress();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <div aria-hidden="true" className={`pointer-events-none fixed left-0 right-0 z-[39] ${topClassName}`}>
      <div className="h-[3px] bg-black/70 border-y border-white/5">
        <div
          className={`h-full bg-gradient-to-r ${accentClasses[accent]} transition-[width] duration-150 motion-reduce:transition-none`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
