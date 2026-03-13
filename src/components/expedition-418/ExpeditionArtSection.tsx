import Image from "next/image";
import type { Expedition418Dict } from "@/types/i18n";

interface ExpeditionArtSectionProps {
  dict: Expedition418Dict;
}

export default function ExpeditionArtSection({ dict }: ExpeditionArtSectionProps) {
  return (
    <section className="border-t border-[#505c64] bg-[#111827] py-16 overflow-hidden">
      <div className="fm-shell max-w-6xl">
        <div className="expedition-fade-up mb-8 flex items-end gap-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#f67b40] [font-family:var(--font-exp-ui)]">
            {dict.art?.overline ?? "VISUAL TRANSMISSION"}
          </p>
          <div className="mb-0.5 h-px flex-1 bg-[#505c64]/60" />
        </div>

        {/* World Art — full-width key art */}
        <div className="expedition-fade-up relative mb-4 w-full overflow-hidden border border-[#505c64] shadow-[6px_6px_0_0_rgba(236,84,76,0.35)]">
          <div className="relative aspect-[16/7] w-full">
            <Image
              src="/images/expedition-418/world-art.webp"
              alt={dict.art?.worldAlt ?? "Expedition-418 world concept art"}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover object-center"
              priority={false}
            />
            {/* Overlay scanlines for expedition feel */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(24,33,60,0.08)_50%)] [background-size:4px_4px] opacity-40" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_70%,rgba(17,24,39,0.9))]" />
            <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.22em] text-[#f67b40]/80 [font-family:var(--font-exp-ui)]">
              CAM_WORLD // SECTOR_UNKNOWN
            </div>
            <div className="absolute right-4 top-4 border border-[#f67b40]/40 bg-[#18213c]/60 px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-[#f7a37a] [font-family:var(--font-exp-ui)]">
              ▶ LIVE
            </div>
          </div>
        </div>

        {/* Two robot concepts side by side */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="expedition-fade-up group relative overflow-hidden border border-[#505c64] shadow-[4px_4px_0_0_rgba(246,123,64,0.25)] transition-transform duration-300 hover:-translate-y-1">
            <div className="relative aspect-[4/3] w-full bg-[#0d1423]">
              <Image
                src="/images/teapot-concept.webp"
                alt={dict.intel?.imageAlt ?? "Teapot unit concept art"}
                fill
                sizes="(max-width: 640px) 100vw, 600px"
                className="object-contain object-center p-4 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_55%,rgba(17,24,39,0.7))]" />
            </div>
            <div className="border-t border-[#505c64] bg-[#18213c] px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#f67b40] [font-family:var(--font-exp-ui)]">
                UNIT_TEAPOT // AUTHORIZED FOR TESTING ONLY
              </p>
            </div>
          </div>

          <div className="expedition-fade-up group relative overflow-hidden border border-[#505c64] shadow-[4px_4px_0_0_rgba(246,123,64,0.25)] transition-transform duration-300 hover:-translate-y-1">
            <div className="relative aspect-[4/3] w-full bg-[#0d1423]">
              <Image
                src="/images/expedition-418/robot-sketch.webp"
                alt={dict.art?.robotAlt ?? "Robot unit concept sketch"}
                fill
                sizes="(max-width: 640px) 100vw, 600px"
                className="object-contain object-center p-4 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_55%,rgba(17,24,39,0.7))]" />
            </div>
            <div className="border-t border-[#505c64] bg-[#18213c] px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#f67b40] [font-family:var(--font-exp-ui)]">
                UNIT_KIKIMOR // PROTOTYPE SCHEMATIC
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
