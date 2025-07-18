'use client';
import React, { useEffect, useRef, useState } from "react";

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
  const [containerWidth, setContainerWidth] = useState(width);
  const [stripsArr, setStripsArr] = useState<React.ReactElement[] | null>(null);

  // Update container width on mount and when resized
  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const actualHeight = (containerWidth * height) / width;

  useEffect(() => {
    const stripHeight = Math.ceil(actualHeight / strips);
    const arr = Array.from({ length: strips }, (_, i) => {
      const top = i * stripHeight;
      const h = i === strips - 1 ? actualHeight - top : stripHeight;
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
            width: containerWidth,
            height: h,
            backgroundImage: `url(${src})`,
            backgroundPosition: `0 -${top}px`,
            backgroundSize: `${containerWidth}px ${actualHeight}px`,
            animationName: animation,
            animationDuration: `${duration}ms`,
            animationDelay: `${delay}ms`,
            animationIterationCount: "infinite",
            animationDirection: "alternate",
            animationTimingFunction: "linear",
            imageRendering: "pixelated",
            // Кастомные CSS-переменные для анимации
            "--glitch-x-1": x1,
            "--glitch-x-2": x2,
            "--glitch-hue-1": hue1,
            "--glitch-hue-2": hue2,
          } as React.CSSProperties}
        />
      );
    });
    setStripsArr(arr);
    // (eslint-disable-next-line react-hooks/exhaustive-deps) — убрано, так как не используется
  }, [src, containerWidth, actualHeight, strips]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none ${className}`}
      style={{ width: "100%", maxWidth: width, aspectRatio: `${width}/${height}`, ...style }}
      tabIndex={0}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).classList.add("glitch-paused");
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).classList.remove("glitch-paused");
      }}
    >
      {/* Используем <img>, а не <Image>, так как требуется абсолютный контроль над слоями и рендерингом полос */}
      <img
        src={src}
        alt={alt}
        width={containerWidth}
        height={actualHeight}
        style={{ display: "block", width: "100%", height: "100%" }}
        draggable={false}
      />
      {/* Глитч-полосы только на клиенте */}
      {stripsArr && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          {stripsArr}
        </div>
      )}
    </div>
  );
} 