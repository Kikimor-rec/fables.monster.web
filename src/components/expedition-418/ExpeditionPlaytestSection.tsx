import Link from "next/link";
import type { Expedition418Dict } from "@/types/i18n";

interface ExpeditionPlaytestSectionProps {
  lang: string;
  dict: Expedition418Dict;
}

export default function ExpeditionPlaytestSection({ lang, dict }: ExpeditionPlaytestSectionProps) {
  return (
    <section id="playtest" className="py-20 border-t border-cyan-900/30 bg-black/80 scroll-mt-36">
      <div className="fm-shell max-w-5xl">
        <div className="fm-panel border-cyan-800/70 bg-cyan-950/20">
          <p className="font-orbitron text-xs tracking-[0.2em] uppercase text-cyan-300 mb-5">{dict.playtest.incoming}</p>
          <p className="text-zinc-200 font-rajdhani text-lg mb-5 leading-relaxed">{dict.playtest.paragraph1}</p>
          <p className="text-zinc-200 font-rajdhani text-lg leading-relaxed">{dict.playtest.paragraph2}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="https://discord.gg/eAwK9DfKf4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-cyan-500/80 bg-cyan-900/30 px-5 py-3 font-orbitron text-sm text-cyan-200 hover:bg-cyan-800/40 transition-colors"
            >
              {dict.playtest.buttons.discord}
            </a>
            <Link
              href={`/${lang}/newsletter/subscribe`}
              className="inline-flex items-center justify-center border border-zinc-500/80 bg-zinc-900/40 px-5 py-3 font-orbitron text-sm text-zinc-200 hover:bg-zinc-800/45 transition-colors"
            >
              {dict.playtest.buttons.subscribe}
            </Link>
            <a
              href="https://www.patreon.com/FablesMonster"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-red-500/80 bg-red-900/30 px-5 py-3 font-orbitron text-sm text-red-200 hover:bg-red-800/40 transition-colors"
            >
              {dict.playtest.buttons.patreon}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
