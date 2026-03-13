"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import type { Expedition418Dict } from "@/types/i18n";

interface ExpeditionArtSectionProps {
  dict: Expedition418Dict;
}

export default function ExpeditionArtSection({ dict }: ExpeditionArtSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);
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

    const updatePosition = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setSectionTop(rect.top + window.scrollY);
      }
    };

    updatePosition();

    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updatePosition);
    };
  }, [reduceMotion]);

  // Parallax offset relative to section visibility
  const relativeScroll = scrollY - sectionTop + (typeof window !== "undefined" ? window.innerHeight : 800);
  const roverOffset = reduceMotion ? 0 : relativeScroll * 0.06;
  const squareOffset = reduceMotion ? 0 : relativeScroll * 0.1;

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-[#505c64] bg-[#111827] overflow-hidden"
    >
      {/* Cover — full-width key art */}
      <div className="relative w-full">
        <div className="relative aspect-[16/7] w-full overflow-hidden">
          <Image
            src="/images/cover.webp"
            alt={dict.art?.worldAlt ?? "Expedition-418 world concept art"}
            fill
            sizes="(max-width: 768px) 100vw, 1920px"
            className="object-cover object-center"
            priority={false}
          />
          {/* Scanlines */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(24,33,60,0.06)_50%)] [background-size:4px_4px] opacity-50" />
          {/* Bottom fade to section bg */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(17,24,39,0.95))]" />
          {/* Top subtle fade */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(17,24,39,0.3)_0%,transparent_20%)]" />

          <div className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.22em] text-[#f67b40]/80 [font-family:var(--font-exp-ui)] sm:bottom-8 sm:left-8">
            CAM_WORLD // SECTOR_UNKNOWN
          </div>
          <div className="absolute right-4 top-4 border border-[#f67b40]/40 bg-[#18213c]/60 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-[#f7a37a] [font-family:var(--font-exp-ui)] sm:right-6 sm:top-6">
            ▶ LIVE
          </div>
        </div>
      </div>

      {/* Floating rovers with parallax */}
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 md:pb-28">
        <div className="expedition-fade-up mb-6 flex items-end gap-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#f67b40] [font-family:var(--font-exp-ui)]">
            {dict.art?.overline ?? "UNIT SCHEMATICS"}
          </p>
          <div className="mb-0.5 h-px flex-1 bg-[#505c64]/40" />
        </div>

        <div className="relative min-h-[280px] sm:min-h-[380px] md:min-h-[440px]">
          {/* Rover — front layer, slower parallax */}
          <div
            className="absolute bottom-0 left-0 w-[55%] sm:w-[50%] md:w-[45%] z-10 transition-transform duration-100 ease-out"
            style={{ transform: `translateY(${-roverOffset}px)` }}
          >
            <div className="group relative">
              <Image
                src="/images/rover.webp"
                alt={dict.intel?.imageAlt ?? "Teapot rover unit concept art"}
                width={800}
                height={600}
                sizes="(max-width: 640px) 55vw, (max-width: 768px) 50vw, 540px"
                className="relative z-10 drop-shadow-[0_8px_32px_rgba(246,123,64,0.15)] transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="mt-2 text-[9px] uppercase tracking-[0.22em] text-[#f67b40]/70 [font-family:var(--font-exp-ui)] sm:text-[10px]">
                UNIT_TEAPOT // AUTHORIZED FOR TESTING ONLY
              </div>
            </div>
          </div>

          {/* Square rover — back layer, faster parallax */}
          <div
            className="absolute right-0 top-0 w-[42%] sm:w-[38%] md:w-[35%] z-0 transition-transform duration-100 ease-out"
            style={{ transform: `translateY(${-squareOffset}px)` }}
          >
            <div className="group relative">
              <Image
                src="/images/square-reover.webp"
                alt={dict.art?.robotAlt ?? "Robot unit concept sketch"}
                width={800}
                height={600}
                sizes="(max-width: 640px) 42vw, (max-width: 768px) 38vw, 420px"
                className="relative z-10 drop-shadow-[0_8px_24px_rgba(246,123,64,0.12)] transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="mt-2 text-right text-[9px] uppercase tracking-[0.22em] text-[#f67b40]/70 [font-family:var(--font-exp-ui)] sm:text-[10px]">
                UNIT_KIKIMOR // PROTOTYPE SCHEMATIC
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient glow at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(ellipse_at_50%_100%,rgba(246,123,64,0.06),transparent_70%)]" />
    </section>
  );
}
