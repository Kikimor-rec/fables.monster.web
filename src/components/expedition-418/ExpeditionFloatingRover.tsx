"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

interface ExpeditionFloatingRoverProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  sizes: string;
  parallaxFactor?: number;
  className?: string;
}

export default function ExpeditionFloatingRover({
  src,
  alt = "",
  width,
  height,
  sizes,
  parallaxFactor = 0.06,
  className = "",
}: ExpeditionFloatingRoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const viewportH = window.innerHeight;
            // Only compute when element is near viewport
            if (rect.top < viewportH + 200 && rect.bottom > -200) {
              const relativePos = viewportH - rect.top;
              setOffset(relativePos * parallaxFactor);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial position
    return () => window.removeEventListener("scroll", onScroll);
  }, [parallaxFactor, reduceMotion]);

  return (
    <div
      ref={ref}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
      style={{
        transform: reduceMotion ? undefined : `translateY(${-offset}px)`,
        willChange: reduceMotion ? undefined : "transform",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className="drop-shadow-[0_8px_32px_rgba(246,123,64,0.12)]"
      />
    </div>
  );
}
