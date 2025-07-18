'use client';
import React, { useEffect, useState, useRef } from "react";

interface GlitchImageProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  strips?: number; // количество полос
  className?: string;
  style?: React.CSSProperties;
}

function random(min: number, max: number) {
  return Math.round(Math.random() * (max - min)) + min;
}

const ANIMATIONS = [5, 6, 7, 8, 9, 10].map((n) => `glitch-${n}`);

export default function GlitchImage({
  src,
  alt = "",
  width,
  height,
  strips = 16,
  className = "",
  style = {},
}: GlitchImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [realSize, setRealSize] = useState<{w: number, h: number}>({w: width || 0, h: height || 0});
  const [stripsArr, setStripsArr] = useState<React.ReactElement[] | null>(null);

  // Вычисляем реальные размеры контейнера, если width/height не заданы
  useEffect(() => {
    if (!width || !height) {
      const updateSize = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setRealSize({ w: Math.round(rect.width), h: Math.round(rect.height) });
        }
      };
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    } else {
      setRealSize({ w: width, h: height });
    }
  }, [width, height]);

  useEffect(() => {
    const w = realSize.w;
    const h = realSize.h;
    if (!w || !h) return;
    const stripHeight = Math.ceil(h / strips);
    const arr = Array.from({ length: strips }, (_, i) => {
      const top = i * stripHeight;
      const hh = i === strips - 1 ? h - top : stripHeight;
      const animation = ANIMATIONS[random(0, ANIMATIONS.length - 1)];
      const duration = random(5, 10) * 1000;
      const delay = random(0, 2000);
      const x1 = `${random(-8, 8)}px`;
      const x2 = `${random(-8, 8)}px`;
      const hue1 = `${random(-30, 30)}deg`;
      const hue2 = `${random(-30, 30)}deg`;
      return (
        <div
          key={i}
          className="glitch-strip"
          style={{
            position: "absolute",
            left: 0,
            top: top,
            width: w,
            height: hh,
            backgroundImage: `url(${src})`,
            backgroundPosition: `0 -${top}px`,
            backgroundSize: `${w}px ${h}px`,
            animationName: animation,
            animationDuration: `${duration}ms`,
            animationDelay: `${delay}ms`,
            animationIterationCount: "infinite",
            animationDirection: "alternate",
            animationTimingFunction: "linear",
            imageRendering: "pixelated",
            "--glitch-x-1": x1,
            "--glitch-x-2": x2,
            "--glitch-hue-1": hue1,
            "--glitch-hue-2": hue2,
          } as React.CSSProperties}
        />
      );
    });
    setStripsArr(arr);
  }, [src, realSize, strips]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none ${className}`}
      style={{ ...style }}
      tabIndex={0}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).classList.add("glitch-paused");
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).classList.remove("glitch-paused");
      }}
    >
      <img
        src={src}
        alt={alt}
        width={realSize.w}
        height={realSize.h}
        style={{ display: "block", width: "100%", height: "100%" }}
        draggable={false}
      />
      {stripsArr && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          {stripsArr}
        </div>
      )}
    </div>
  );
} 