"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]{}|";

interface ScrollDecryptTextProps {
  text: string;
  className?: string;
  /** tag to render as */
  as?: "span" | "h2" | "h3" | "p" | "div";
  /** decode speed in ms per character */
  charDelay?: number;
  /** initial scramble refresh rate in ms */
  scrambleInterval?: number;
}

export default function ScrollDecryptText({
  text,
  className = "",
  as: Tag = "span",
  charDelay = 40,
  scrambleInterval = 60,
}: ScrollDecryptTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [hasRevealed, setHasRevealed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduceMotion(true);
      setDisplayText(text);
    }
  }, [text]);

  // Initial scrambled state
  useEffect(() => {
    if (reduceMotion || hasRevealed) return;

    setDisplayText(
      text
        .split("")
        .map((c) => (c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join("")
    );

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((c) => (c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join("")
      );
    }, scrambleInterval);

    return () => clearInterval(interval);
  }, [text, reduceMotion, hasRevealed, scrambleInterval]);

  // Decode animation: reveal characters left-to-right
  const decode = useCallback(() => {
    let revealedCount = 0;
    const chars = text.split("");
    const total = chars.length;

    const step = () => {
      revealedCount++;
      setDisplayText(
        chars
          .map((c, i) => {
            if (c === " ") return " ";
            if (i < revealedCount) return c;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      if (revealedCount < total) {
        setTimeout(step, charDelay);
      } else {
        setHasRevealed(true);
      }
    };

    step();
  }, [text, charDelay]);

  // Intersection observer
  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRevealed) {
          decode();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion, hasRevealed, decode]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={`font-mono ${className}`}>
      {displayText}
    </Tag>
  );
}
