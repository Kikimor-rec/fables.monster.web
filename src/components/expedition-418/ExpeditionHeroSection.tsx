import type { Expedition418Dict } from "@/types/i18n";
import ExpeditionHeroLogo from "./ExpeditionHeroLogo";

interface ExpeditionHeroSectionProps {
  dict: Expedition418Dict;
}

export default function ExpeditionHeroSection({ dict }: ExpeditionHeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#505c64] bg-[#18213c] pt-28 pb-20 md:pt-36 md:pb-24">
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(188,214,187,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(188,214,187,0.25)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(246,123,64,0.2),transparent_40%),radial-gradient(circle_at_82%_12%,rgba(236,84,76,0.18),transparent_36%)]" />

      <div className="pointer-events-none absolute left-4 top-6 h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-[#ff683d]/70 md:left-8 md:top-8 md:h-24 md:w-24" />
      <div className="pointer-events-none absolute right-4 top-6 h-16 w-16 rounded-tr-2xl border-r-2 border-t-2 border-[#ff683d]/70 md:right-8 md:top-8 md:h-24 md:w-24" />
      <div className="pointer-events-none absolute bottom-6 left-4 h-16 w-16 rounded-bl-2xl border-b-2 border-l-2 border-[#ff683d]/70 md:bottom-8 md:left-8 md:h-24 md:w-24" />
      <div className="pointer-events-none absolute bottom-6 right-4 h-16 w-16 rounded-br-2xl border-b-2 border-r-2 border-[#ff683d]/70 md:bottom-8 md:right-8 md:h-24 md:w-24" />

      <div className="relative z-10 fm-shell max-w-6xl text-center">
        <p className="mb-8 block text-center text-[11px] uppercase tracking-[0.24em] text-[#f67b40] [font-family:var(--font-exp-ui)] md:mb-10">
          {dict.genre.label}
        </p>

        <div className="mb-8 mt-2 inline-block max-w-full text-center md:mb-10">
          <div className="relative inline-block max-w-full">
            <ExpeditionHeroLogo title={dict.hero.title} />
            <div className="absolute right-0 top-0 translate-x-1 -translate-y-2 rotate-12 bg-[#ec544c] px-2 py-1 text-[10px] font-bold text-[#18213c] shadow-lg transition-transform hover:scale-110 sm:-right-10 sm:-top-6 sm:translate-x-0 sm:translate-y-0 sm:px-4 sm:text-sm md:-right-16 [font-family:var(--font-exp-heading)]">
              EST. 2426
            </div>
          </div>
        </div>

        <div className="mb-12 relative">
          <div className="relative flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-lg tracking-[0.08em] text-[#f67b40] sm:text-2xl sm:tracking-[0.12em] md:text-4xl [font-family:var(--font-exp-heading)]">
            <span className="relative inline-flex flex-col items-center sm:inline-block">
              <span className="expedition-strike-hand">ROLE</span>
              <span className="mt-1 -rotate-6 whitespace-nowrap text-2xl text-[#ec544c] drop-shadow-md sm:absolute sm:-top-7 sm:left-1/2 sm:mt-0 sm:-translate-x-1/2 sm:text-3xl md:-top-8 md:text-5xl [font-family:var(--font-exp-hand)]">
                Rover
              </span>
            </span>
            <span className="sm:pl-1">PLAYING GAME</span>
          </div>
        </div>

        <div className="mx-auto mt-2 max-w-2xl border-y border-[#505c64] bg-[#18213c]/60 px-4 py-6 backdrop-blur-sm sm:px-8">
          <p className="text-pretty text-lg leading-relaxed text-[#c6d9c6] sm:text-xl md:text-2xl [font-family:var(--font-exp-accent)]">
            {dict.hero.subtitle}
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[#f67b40] [font-family:var(--font-exp-ui)]">SYSTEM STATUS: CRITICAL</p>
        </div>

        <p className="mt-8 text-xs text-[#8b97a5] [font-family:var(--font-exp-ui)]">
          {dict.hero.projectCodeLabel} <span className="text-[#c6d9c6]">EXP-418-HTCPCP</span>
        </p>
      </div>
    </section>
  );
}
