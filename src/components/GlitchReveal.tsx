"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

interface GlitchRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "glitch" = data corruption, "warp" = space distortion, "static" = signal noise, "horror" = RGB split, "poweron" = power-on flash */
  variant?: "glitch" | "warp" | "static" | "horror" | "poweron";
}

export default function GlitchReveal({
  children,
  className = "",
  delay = 0,
  variant = "glitch",
}: GlitchRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animClass = isVisible ? `fm-reveal-${variant}` : "fm-reveal-hidden";

  return (
    <div
      ref={ref}
      className={`${animClass} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
