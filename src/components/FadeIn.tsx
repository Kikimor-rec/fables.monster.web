"use client";

import { ReactNode, useEffect, useRef, useState, type CSSProperties } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  /** Enable staggered animation for direct children. */
  stagger?: boolean;
  staggerDelay?: number;
}

function useRevealOnce() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  stagger = false,
  staggerDelay = 0.08,
}: FadeInProps) {
  const { ref, visible } = useRevealOnce();

  return (
    <div
      ref={ref}
      className={`fm-reveal ${visible ? "is-visible" : ""} ${stagger ? "fm-reveal-stagger" : ""} ${className}`}
      data-direction={direction}
      style={{
        "--fm-reveal-delay": `${delay}s`,
        "--fm-stagger-delay": `${staggerDelay}s`,
      } as CSSProperties}
    >
      {children}
    </div>
  );
}

/**
 * Wrap each child of a staggered FadeIn in this component.
 */
export function FadeInItem({
  children,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  return (
    <div className={`fm-reveal-item ${className}`} data-direction={direction}>
      {children}
    </div>
  );
}