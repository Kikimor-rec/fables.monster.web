"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on desktop (no touch)
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;
      dot.style.transform = `translate(${dotX - 10}px, ${dotY - 10}px)`;
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,31,31,0.4) 0%, rgba(0,240,255,0.15) 60%, transparent 100%)",
        boxShadow: "0 0 15px 5px rgba(255,31,31,0.2), 0 0 30px 10px rgba(0,240,255,0.08)",
        mixBlendMode: "screen",
      }}
    />
  );
}
