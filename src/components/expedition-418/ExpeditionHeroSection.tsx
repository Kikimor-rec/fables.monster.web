import Link from "next/link";
import type { ExpeditionStat } from "@/components/expedition-418/types";
import type { Expedition418Dict } from "@/types/i18n";

interface ExpeditionHeroSectionProps {
  lang: string;
  dict: Expedition418Dict;
  stats: ExpeditionStat[];
}

export default function ExpeditionHeroSection({ lang, dict, stats }: ExpeditionHeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-cyan-950/20" />
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(34,211,238,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.25)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="relative z-10 fm-shell max-w-5xl text-center flex flex-col items-center pt-24 md:pt-32">
        <p className="fm-page-kicker mb-5">{dict.genre.label}</p>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-4 font-orbitron tracking-wider glitch-text" data-text={dict.hero.title}>
          {dict.hero.title}
        </h1>

        <p className="text-lg md:text-xl text-cyan-400 mb-6 font-orbitron tracking-wide">{dict.hero.subtitle}</p>

        <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-4xl mx-auto font-rajdhani">{dict.hero.paragraph1}</p>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto font-rajdhani">{dict.hero.paragraph2}</p>

        <div className="max-w-4xl w-full border border-cyan-900/50 bg-black/40 p-4 sm:p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-2 sm:gap-3 text-left">
            <div className="text-zinc-500 text-xs font-orbitron uppercase tracking-[0.14em]">{stats[0]?.label}</div>
            <div className="text-zinc-200 text-sm font-rajdhani">{stats[0]?.value}</div>

            <div className="text-zinc-500 text-xs font-orbitron uppercase tracking-[0.14em]">{stats[1]?.label}</div>
            <div className="text-zinc-200 text-sm font-rajdhani">{stats[1]?.value}</div>

            <div className="text-zinc-500 text-xs font-orbitron uppercase tracking-[0.14em]">{stats[2]?.label}</div>
            <div className="text-zinc-200 text-sm font-rajdhani">{stats[2]?.value}</div>

            <div className="text-zinc-500 text-xs font-orbitron uppercase tracking-[0.14em]">{stats[3]?.label}</div>
            <div className="text-zinc-200 text-sm font-rajdhani">{stats[3]?.value}</div>
          </div>
        </div>

        <div className="bg-cyan-950/30 border border-cyan-700/50 rounded-lg p-4 mb-6 max-w-2xl">
          <p className="text-cyan-300 font-mono text-sm">{`> ${dict.hero.statusNote}`}</p>
        </div>

        <p className="text-zinc-400 font-mono text-xs mb-8">
          {dict.hero.projectCodeLabel} <span className="text-zinc-300">EXP-418-HTCPCP</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${lang}/projects`}
            className="bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 px-8 py-4 text-lg font-orbitron font-bold transition-all hover:text-white"
          >
            {dict.hero.allProjects}
          </Link>
        </div>
      </div>
    </section>
  );
}
