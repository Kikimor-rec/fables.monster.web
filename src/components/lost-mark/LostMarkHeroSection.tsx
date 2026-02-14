import Image from "next/image";
import Link from "next/link";
import type { LostMarkDictionary } from "@/components/lost-mark/types";

interface LostMarkStat {
  label: string;
  value: string;
}

interface LostMarkHeroSectionProps {
  lang: string;
  contentTitle: string;
  contentTagline: string;
  dict: LostMarkDictionary;
  stats: LostMarkStat[];
}

export default function LostMarkHeroSection({
  lang,
  contentTitle,
  contentTagline,
  dict,
  stats,
}: LostMarkHeroSectionProps) {
  const showRpgbookPrimary = Boolean(dict.buttons?.rpgbook && dict.pricing?.russianIncludesAll);

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20" />

      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/lost-mark/lm_promo_1.webp"
          alt="The Lost Mark adventure promo art"
          fill
          style={{ objectFit: "cover" }}
          priority
          sizes="100vw"
          quality={85}
        />
      </div>

      <div className="relative z-10 fm-shell max-w-5xl text-center flex flex-col items-center pt-24 md:pt-32">
        <p className="fm-page-kicker mb-4">{dict.hero?.kicker || "MISSION DOSSIER // LOST MARK"}</p>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-6 font-orbitron tracking-wider">
          {contentTitle || "THE LOST MARK"}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-rajdhani">
          {contentTagline || "Uncover the dark secrets of the research vessel Lost Mark"}
        </p>

        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto font-orbitron">
          {dict.hero?.description ||
            "A science fiction horror adventure for the role-playing game Mothership RPG. Your team encounters the wreckage of the tourist yacht Silk Star, which disappeared 217 years ago."}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-2xl mx-auto w-full">
          {stats.map((stat, index) => (
            <div key={stat.label} className="bg-black/60 border border-red-700 stat-block p-2 sm:p-3">
              <div className="text-lg sm:text-2xl font-bold text-red-400 font-orbitron mb-1">{stat.value}</div>
              <div className="stat-block-label text-gray-300 font-orbitron">
                <span className="sm:hidden">{index === 0 ? "Mothership" : stat.label}</span>
                <span className="hidden sm:inline">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-red-950/50 via-red-900/30 to-red-950/50 border border-red-700/50 rounded-xl p-6 mb-6 backdrop-blur-sm">
          {showRpgbookPrimary ? (
            <>
              <p className="text-emerald-400 text-sm font-orbitron mb-4 text-center">
                {dict.pricing?.russianIncludesAll || "Includes all bonus content."}
              </p>
              <div className="flex justify-center">
                <a
                  href="https://rpgbook.ru/lost_mark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#60A5FA] hover:to-[#3B82F6] text-white font-orbitron font-bold px-10 py-5 rounded-lg shadow-lg shadow-blue-900/30 transition-all duration-300 transform hover:scale-105 ring-2 ring-blue-400/50"
                >
                  <span className="text-xl">{dict.buttons?.rpgbook || "RPG Book Station"}</span>
                </a>
              </div>
              <p className="text-gray-500 text-xs font-orbitron mt-4 text-center">
                {dict.expansion?.englishOnlyNote || "English version is available on Itch.io and DriveThruRPG."}
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-300 text-sm font-orbitron mb-4 text-center">{dict.pricing?.baseModuleFree || "Base module is free."}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                <a
                  href="https://fablesmonster.itch.io/lost-mark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#FA5C5C] to-[#e74c4c] hover:from-[#ff6b6b] hover:to-[#FA5C5C] text-white font-orbitron font-bold px-8 py-4 rounded-lg shadow-lg shadow-red-900/30 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="text-lg">Itch.io</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">{dict.pricing?.freeLabel || "FREE"}</span>
                </a>
                <a
                  href="https://www.drivethrurpg.com/en/product/530242?affiliate_id=2863466"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#e67e22] to-[#d35400] hover:from-[#f39c12] hover:to-[#e67e22] text-white font-orbitron font-bold px-8 py-4 rounded-lg shadow-lg shadow-orange-900/30 transition-all duration-300 transform hover:scale-105"
                >
                  <Image src="/logos/dtrpg-logo-small.webp" alt="DriveThruRPG" width={24} height={24} className="w-6 h-6" />
                  <span className="text-lg">DriveThruRPG</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">{dict.pricing?.freeLabel || "FREE"}</span>
                </a>
              </div>
            </>
          )}
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${lang}/lost-mark/terminal`}
              className="inline-flex items-center gap-2 bg-green-700 text-green-200 font-orbitron font-bold px-6 py-3 rounded border-2 border-green-500 shadow-lg hover:bg-green-600 hover:border-green-400 transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
                <path d="M6 8h.01M6 12h.01M10 8h4" />
              </svg>
              {dict.buttons?.terminal || "ACCESS SILK STAR TERMINAL"}
            </Link>

            <Link
              href={`/${lang}/timer`}
              className="inline-flex items-center gap-2 bg-green-700 text-green-200 font-orbitron font-bold px-6 py-3 rounded border-2 border-green-500 shadow-lg hover:bg-green-600 hover:border-green-400 transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {dict.buttons?.timer || "CHRONOMETER TERMINAL"}
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-2 font-orbitron">
            {dict.hero?.interactiveNote || "Interactive timer and terminal available now"}
          </p>
        </div>
      </div>
    </section>
  );
}
