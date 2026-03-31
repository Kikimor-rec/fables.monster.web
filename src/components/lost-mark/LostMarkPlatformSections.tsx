import Image from "next/image";
import Link from "next/link";
import GlitchReveal from "@/components/GlitchReveal";
import OptimizedImage from "@/components/OptimizedImage";
import type { LostMarkDictionary } from "@/components/lost-mark/types";

interface LostMarkPlatformSectionsProps {
  lang: string;
  dict: LostMarkDictionary;
}

export default function LostMarkPlatformSections({ lang, dict }: LostMarkPlatformSectionsProps) {
  return (
    <>
      <hr className="fm-section-divider-glow" />
      <section id="expansion" className="lm-section lm-section-dark scroll-mt-36">
        <div className="fm-shell">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <GlitchReveal className="order-2 md:order-1" variant="warp">
              <div className="lm-panel w-full aspect-video mx-auto overflow-hidden relative group">
                <OptimizedImage
                  src="/images/lost-mark/Lost mark ext.jpg"
                  alt="Lost Mark expansion pack"
                  width={800}
                  height={450}
                  quality={90}
                  className="w-full h-full object-cover lm-scroll-distort"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-red-500 font-mono text-xs mb-1 tracking-widest">
                    {dict.expansion?.badge || "AVAILABLE NOW"}
                  </div>
                  <div className="text-white font-bold font-orbitron text-xl">{dict.expansion?.label || "EXPANSION CONTENT"}</div>
                </div>
              </div>
            </GlitchReveal>
            <GlitchReveal className="order-1 md:order-2" variant="horror" delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-orbitron">
                {dict.sections?.expansion || "EXPANSION PACK"}
              </h2>
              <p className="text-lg text-gray-300 mb-6 font-orbitron">
                {dict.expansion?.description ||
                  "A special expansion pack available separately from the main free module. Enhance your session with premium assets designed to immerse your players in the horror."}
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">&gt;</span>
                  <span className="text-gray-300 font-orbitron">
                    <strong className="text-white">{dict.expansion?.list?.[0]?.title || "12 New Arts"}</strong> -{" "}
                    {dict.expansion?.list?.[0]?.description || "A unique illustration for every location on the ship."}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">&gt;</span>
                  <span className="text-gray-300 font-orbitron">
                    <strong className="text-white">{dict.expansion?.list?.[1]?.title || "13 Ambient Sounds"}</strong> -{" "}
                    {dict.expansion?.list?.[1]?.description || "Specifically composed tracks to set the atmosphere for each area."}
                  </span>
                </li>
              </ul>

              {(dict.expansion?.russianNote || dict.expansion?.englishOnlyNote) && (
                <div className="mb-6 space-y-3">
                  {dict.expansion?.russianNote && (
                    <div className="bg-blue-950/30 border border-blue-700/50 rounded-lg p-4">
                      <p className="text-blue-300 font-orbitron text-sm">
                        {dict.expansion.russianNote} {" "}
                        <a
                          href={dict.expansion.russianUrl || "https://rpgbook.ru/lost_mark"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline font-bold"
                        >
                          {dict.expansion.russianLink || "RPG Book Station"}
                        </a>
                      </p>
                    </div>
                  )}
                  {dict.expansion?.englishOnlyNote && (
                    <div className="bg-amber-950/30 border border-amber-700/50 rounded-lg p-4">
                      <p className="text-amber-400 font-orbitron text-sm">{dict.expansion.englishOnlyNote}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.patreon.com/posts/lost-mark-pack-143990208?fables.monster"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lm-btn lm-btn-red"
                >
                  {dict.buttons?.patreon || "Get on Patreon"}
                </a>
                <a
                  href="https://fablesmonster.itch.io/lost-mark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lm-btn lm-btn-red"
                >
                  {dict.buttons?.itch || "Get on Itch.io"}
                </a>
                <a
                  href="https://www.drivethrurpg.com/en/product/546658/mothership-lost-mark-expansion-pack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lm-btn lm-btn-red"
                >
                  {dict.buttons?.drivethru || "Get on DriveThruRPG"}
                </a>
              </div>
            </GlitchReveal>
          </div>
        </div>
      </section>

      <hr className="fm-section-divider-glow" />
      <section id="foundry" className="lm-section lm-section-muted scroll-mt-36">
        <div className="fm-shell">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <GlitchReveal className="order-1" variant="horror">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-orbitron">
                {dict.sections?.foundry || "FOUNDRY VTT MODULE"}
              </h2>
              <p className="text-lg text-gray-300 mb-4 font-orbitron">
                {dict.foundry?.description ||
                  "Experience Lost Mark in Foundry Virtual Tabletop. Fully configured with dynamic lighting, walls, ambient sounds, and journal entries for a seamless horror experience."}
              </p>
              <p className="text-emerald-400 text-sm font-orbitron mb-6">
                {dict.foundry?.supportNote || "Russian language support included"}
              </p>

              <div className="flex flex-col gap-4">
                <a
                  href="https://www.patreon.com/posts/lost-mark-vtt-143997921"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lm-btn lm-btn-red"
                >
                  <Image src="/logos/PATREON_SYMBOL_1_WHITE_RGB.svg" alt="Patreon" width={20} height={20} className="w-5 h-5" />
                  Patreon
                </a>
                <a
                  href="https://fablesmonster.itch.io/lost-mark-foundry-vtt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lm-btn lm-btn-red"
                >
                  Itch.io
                </a>
              </div>
            </GlitchReveal>
            <GlitchReveal className="order-2" variant="warp" delay={150}>
              <div className="lm-panel w-full aspect-video mx-auto overflow-hidden relative">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/0v8utSfPluw"
                  title={dict.foundry?.videoTitle || "Lost Mark Foundry VTT teaser"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </GlitchReveal>
          </div>
        </div>
      </section>

      <hr className="fm-section-divider-glow" />
      <section id="roll20" className="lm-section lm-section-dark scroll-mt-36">
        <div className="fm-shell max-w-6xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center font-orbitron lm-heading-lined">
            <span className="lm-heading-line" />
            <span>{dict.sections?.roll20 || "ROLL20 MODULE"}</span>
            <span className="lm-heading-line" />
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <GlitchReveal variant="horror">
              <p className="text-gray-300 mb-6">
                {dict.roll20?.description ||
                  "Experience Lost Mark on Roll20. Ready-to-play module with all maps, tokens, and handouts configured for an immersive virtual tabletop experience."}
              </p>
              {dict.roll20?.englishOnly && (
                <p className="text-amber-400 text-sm mb-6">
                  {dict.roll20.englishOnly}
                </p>
              )}
              <ul className="space-y-3 mb-6">
                {(dict.roll20?.features || [
                  "Ready-to-play adventure",
                  "All maps and tokens included",
                  "Handouts and journal entries",
                  "Dynamic lighting support",
                ]).map((feature: string) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-300">
                    <span className="text-red-500">&gt;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="https://marketplace.roll20.net/browse/module/39314/lost-mark-sci-fi-horror-one-shot-for-mothership"
                target="_blank"
                rel="noopener noreferrer"
                className="lm-btn lm-btn-red"
              >
                <span>{dict.buttons?.roll20 || "Roll20 Marketplace"}</span>
                <span className="text-xs border border-current/30 px-2 py-0.5">$9.99</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </GlitchReveal>
            <GlitchReveal className="relative" variant="warp" delay={100}>
              <div className="lm-panel p-4 overflow-hidden">
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 font-orbitron">
                  Roll20
                </div>
                <OptimizedImage
                  src="/images/lost-mark/roll20-marketplace.jpg"
                  alt="Lost Mark Roll20 module preview"
                  width={500}
                  height={300}
                  className="w-full h-auto transition-transform duration-500 hover:scale-105"
                />
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <span className="bg-red-900/50 text-red-300 text-xs px-3 py-1 rounded-full border border-red-700/50 font-orbitron">{dict.roll20?.badges?.maps || "MAPS"}</span>
                  <span className="bg-red-900/50 text-red-300 text-xs px-3 py-1 rounded-full border border-red-700/50 font-orbitron">{dict.roll20?.badges?.tokens || "TOKENS"}</span>
                  <span className="bg-red-900/50 text-red-300 text-xs px-3 py-1 rounded-full border border-red-700/50 font-orbitron">{dict.roll20?.badges?.handouts || "HANDOUTS"}</span>
                  <span className="bg-red-900/50 text-red-300 text-xs px-3 py-1 rounded-full border border-red-700/50 font-orbitron">{dict.roll20?.badges?.lighting || "LIGHTING"}</span>
                </div>
              </div>
            </GlitchReveal>
          </div>
        </div>
      </section>

      <hr className="fm-section-divider-glow" />
      <section id="tools" className="lm-section lm-section-muted scroll-mt-36">
        <div className="fm-shell max-w-6xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center font-orbitron lm-heading-lined">
            <span className="lm-heading-line" />
            <span>{dict.sections?.tools || "INTERACTIVE TOOLS"}</span>
            <span className="lm-heading-line" />
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <GlitchReveal variant="static">
            <Link
              href={`/${lang}/lost-mark/terminal`}
              className="block lm-panel !border-green-700/40 hover:!border-green-500/60 p-6 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                  <path d="M6 8h.01M6 12h.01M10 8h4" />
                </svg>
                <h3 className="text-xl font-bold text-white font-orbitron">{dict.tools?.terminal?.title || "SILK STAR TERMINAL"}</h3>
                <span className="text-xs bg-green-700 text-white px-2 py-1 rounded font-orbitron">
                  {dict.tools?.terminal?.badge || "AVAILABLE NOW"}
                </span>
              </div>
              <p className="text-white font-orbitron text-sm mb-4">
                {dict.tools?.terminal?.description ||
                  "Access the ship's computer system and uncover the dark secrets hidden in the logs. Navigate through corrupted data, system failures, and mysterious transmissions."}
              </p>
            </Link>
            </GlitchReveal>

            <GlitchReveal variant="static" delay={120}>
            <Link
              href={`/${lang}/timer`}
              className="block lm-panel !border-green-700/40 hover:!border-green-500/60 p-6 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <h3 className="text-xl font-bold text-white font-orbitron">{dict.tools?.timer?.title || "CHRONOMETER TERMINAL"}</h3>
                <span className="text-xs bg-green-700 text-white px-2 py-1 rounded font-orbitron">
                  {dict.tools?.timer?.badge || "AVAILABLE NOW"}
                </span>
              </div>
              <p className="text-white font-orbitron text-sm mb-4">
                {dict.tools?.timer?.description ||
                  "A digital countdown timer designed for tabletop gaming sessions. Perfect for time-sensitive scenarios and building tension during gameplay."}
              </p>
            </Link>
            </GlitchReveal>
          </div>
        </div>
      </section>
    </>
  );
}
