import Image from "next/image";
import type { KrampDictionary } from "@/components/kramp/types";

interface KrampHeroSectionProps {
  contentTitle: string;
  contentTagline: string;
  dict: KrampDictionary;
}

export default function KrampHeroSection({ contentTitle, contentTagline, dict }: KrampHeroSectionProps) {
  const showRpgbookPrimary = dict.hero?.storeMode === "rpgbook-only";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 md:pt-24">
      <div className="absolute inset-0 bg-black/80" />
      <div className="relative z-10 fm-shell max-w-6xl text-center">
        <p className="fm-page-kicker mb-4">{dict.hero?.kicker || "FESTIVE INCIDENT REPORT"}</p>

        <div className="relative w-48 h-48 mx-auto mb-6">
          <Image
            src="/images/kramp/small kramp.webp"
            alt="St.N KRAMP"
            fill
            className="object-contain filter invert drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]"
            priority
          />
        </div>

        <h1 className="fm-display-title font-bold text-white mb-6 font-orbitron tracking-wider text-glow">
          {contentTitle || dict.hero?.title || "HOLIDAY AUDIT"}
        </h1>

        <div className="text-2xl sm:text-4xl md:text-6xl font-bold text-red-500 mb-8 font-orbitron glitch-text" data-text="KRAMP.EXE">
          {dict.hero?.subtitle || "KRAMP.EXE"}
        </div>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto font-rajdhani px-4">
          {contentTagline || dict.hero?.tagline || "Christmas Eve gone catastrophically wrong in deep space"}
        </p>

        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 flex-wrap px-4">
          <span className="bg-green-900/50 text-green-400 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-orbitron border border-green-600 clip-path-slant hover:box-glow-cyan transition-all animate-pulse">
            {dict.hero?.badges?.available || "AVAILABLE NOW"}
          </span>
          <span className="bg-red-900/50 text-red-400 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-orbitron border border-red-600 clip-path-slant hover:box-glow transition-all">
            {dict.hero?.badges?.oneShot || "ONE-SHOT"}
          </span>
          <span className="bg-green-900/50 text-green-400 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-orbitron border border-green-600 clip-path-slant hover:box-glow-cyan transition-all">
            {dict.hero?.badges?.postcard || "POSTCARD SIZE"}
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {showRpgbookPrimary ? (
              <a
                href="https://rpgbook.ru/kramp_exe"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-blue-900/30 border-2 border-blue-500 text-blue-400 font-orbitron font-bold text-lg clip-path-slant hover:bg-blue-900/50 hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] min-w-[200px] text-center"
              >
                <span className="relative z-10">{dict.buttons?.rpgbook || "BUY ON RPG BOOK STATION"}</span>
              </a>
            ) : (
              <>
                <a
                  href="https://www.drivethrurpg.com/en/product/547046/kramp-exe-christmas-special-edition-for-mothership-1e?affiliate_id=2863466"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-red-900/30 border-2 border-red-500 text-red-400 font-orbitron font-bold text-lg clip-path-slant hover:bg-red-900/50 hover:text-white transition-all duration-300 hover:box-glow min-w-[200px] text-center"
                >
                  <span className="relative z-10">{dict.buttons?.drivethru || "GET ON DRIVETHRU"}</span>
                </a>
                <a
                  href="https://fablesmonster.itch.io/krampexe-mothership-1e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-green-900/30 border-2 border-green-500 text-green-400 font-orbitron font-bold text-lg clip-path-slant hover:bg-green-900/50 hover:text-white transition-all duration-300 hover:box-glow-cyan min-w-[200px] text-center"
                >
                  <span className="relative z-10">{dict.buttons?.itch || "GET ON ITCH.IO"}</span>
                </a>
                <a
                  href="https://www.patreon.com/posts/kramp-exe-for-1e-144275102"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-blue-900/30 border-2 border-blue-500 text-blue-400 font-orbitron font-bold text-lg clip-path-slant hover:bg-blue-900/50 hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] min-w-[200px] text-center"
                >
                  <span className="relative z-10">{dict.buttons?.patreon || "PATREON EXCLUSIVE"}</span>
                </a>
              </>
            )}
          </div>

          {showRpgbookPrimary && (
            <p className="text-gray-500 text-xs font-orbitron mt-2 text-center max-w-lg">
              {dict.hero?.englishVersionNote || "English edition is available on"}{" "}
              <a
                href="https://fablesmonster.itch.io/krampexe-mothership-1e"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white underline"
              >
                Itch.io
              </a>{" "}
              /{" "}
              <a
                href="https://www.drivethrurpg.com/en/product/547046/kramp-exe-christmas-special-edition-for-mothership-1e?affiliate_id=2863466"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white underline"
              >
                DriveThruRPG
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
