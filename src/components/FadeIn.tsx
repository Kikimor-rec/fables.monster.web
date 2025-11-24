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

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            setGlitched(true);
          }, delay * 1000);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-50px"
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

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
      className={`${className} transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${glitched ? "terminal-glitch" : ""}`}
      style={{
        transform: isVisible ? 'translate3d(0, 0, 0)' : getInitialTransform()
      }}
    >
      {children}
    </div>
  );
}
