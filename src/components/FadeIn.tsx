"use client";

import { ReactNode, useRef, useEffect, useState } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = ""
}: FadeInProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [glitched, setGlitched] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setIsVisible(true);
      setGlitched(false);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    let revealTimeout: ReturnType<typeof setTimeout> | undefined;
    let glitchTimeout: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealTimeout = setTimeout(() => {
            setIsVisible(true);
            setGlitched(true);
            glitchTimeout = setTimeout(() => {
              setGlitched(false);
            }, 450);
          }, delay * 1000);
          observer.disconnect(); // Stop observing once visible
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (revealTimeout) clearTimeout(revealTimeout);
      if (glitchTimeout) clearTimeout(glitchTimeout);
    };
  }, [delay, reduceMotion]);

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translate3d(0, 30px, 0)";
      case "down":
        return "translate3d(0, -30px, 0)";
      case "left":
        return "translate3d(30px, 0, 0)";
      case "right":
        return "translate3d(-30px, 0, 0)";
      default:
        return "translate3d(0, 30px, 0)";
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${className} transition-all duration-700 ease-in-out motion-reduce:duration-0 ${isVisible ? 'opacity-100' : 'opacity-0'} ${glitched ? "terminal-glitch" : ""}`}
      style={{
        transform: isVisible ? 'translate3d(0, 0, 0)' : getInitialTransform()
      }}
    >
      {children}
    </div>
  );
}
