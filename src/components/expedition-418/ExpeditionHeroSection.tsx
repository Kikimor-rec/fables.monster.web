import Image from "next/image";
import type { Expedition418Dict } from "@/types/i18n";
import ExpeditionHeroLogo from "./ExpeditionHeroLogo";
import ExpeditionFloatingRover from "./ExpeditionFloatingRover";

interface ExpeditionHeroSectionProps {
  dict: Expedition418Dict;
}

export default function ExpeditionHeroSection({ dict }: ExpeditionHeroSectionProps) {
  return (
    <section className="relative overflow-visible border-b border-[#505c64] bg-[#18213c]">
      {/* Background layers — clipped */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cover art background */}
        <Image
          src="/images/cover.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          quality={80}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#18213c]/70" />
        {/* Bottom fade into next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#18213c]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(188,214,187,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(188,214,187,0.25)_1px,transparent_1px)] [background-size:34px_34px]" />
        {/* Radial accent gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(246,123,64,0.2),transparent_40%),radial-gradient(circle_at_82%_12%,rgba(236,84,76,0.18),transparent_36%)]" />
      </div>

      {/* Corner brackets — outside clip wrapper so they render on top */}
      <div className="pointer-events-none absolute left-4 top-6 h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-[#ff683d]/70 md:left-8 md:top-8 md:h-24 md:w-24 z-[5]" />
      <div className="pointer-events-none absolute right-4 top-6 h-16 w-16 rounded-tr-2xl border-r-2 border-t-2 border-[#ff683d]/70 md:right-8 md:top-8 md:h-24 md:w-24 z-[5]" />
      <div className="pointer-events-none absolute bottom-6 left-4 h-16 w-16 rounded-bl-2xl border-b-2 border-l-2 border-[#ff683d]/70 md:bottom-8 md:left-8 md:h-24 md:w-24 z-[5]" />
      <div className="pointer-events-none absolute bottom-6 right-4 h-16 w-16 rounded-br-2xl border-b-2 border-r-2 border-[#ff683d]/70 md:bottom-8 md:right-8 md:h-24 md:w-24 z-[5]" />

      {/* Content */}
      <div className="relative z-10 fm-shell max-w-6xl text-center min-h-[85vh] flex flex-col justify-center pt-28 pb-20 md:pt-36 md:pb-24">
        <p className="mb-8 block text-center text-[11px] uppercase tracking-[0.24em] text-[#f67b40] [font-family:var(--font-exp-ui)] md:mb-10">
          {dict.genre.label}
        </p>

        <h1 className="sr-only">{dict.hero.title}</h1>

        <div className="mb-8 mt-2 inline-block max-w-full text-center md:mb-10">
          <div className="relative inline-block max-w-full">
            <ExpeditionHeroLogo />
            <div className="absolute right-0 top-0 translate-x-1 -translate-y-2 rotate-12 bg-[#ec544c] px-2 py-1 text-[10px] font-bold text-[#18213c] shadow-lg transition-transform hover:scale-110 sm:-right-10 sm:-top-6 sm:translate-x-0 sm:translate-y-0 sm:px-4 sm:text-sm md:-right-16 [font-family:var(--font-exp-heading)]">
              EST. 2426
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-2xl border-y border-[#505c64] bg-[#18213c]/60 px-4 py-6 backdrop-blur-sm sm:px-8">
          <p className="text-pretty text-lg leading-relaxed text-[#c6d9c6] sm:text-xl md:text-2xl [font-family:var(--font-exp-accent)]">
            {dict.hero.subtitle}
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[#f67b40] [font-family:var(--font-exp-ui)]">SYSTEM STATUS: CRITICAL</p>
        </div>

        <p className="mt-8 text-xs text-[#8b97a5] [font-family:var(--font-exp-ui)]">
          {dict.hero.projectCodeLabel} <span className="text-[#c6d9c6]">EXP-418-HTCPCP</span>
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="https://expedition418.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#f67b40] bg-[#f67b40] px-6 py-3 text-sm uppercase tracking-[0.12em] text-[#18213c] font-bold transition-colors hover:bg-[#ec544c] hover:text-[#f5efe0] [font-family:var(--font-exp-heading)] sm:text-base"
          >
            <span>expedition418.com</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a
            href="#playtest"
            className="inline-flex min-h-12 items-center justify-center border border-[#c6d9c6]/60 bg-transparent px-6 py-3 text-sm uppercase tracking-[0.12em] text-[#c6d9c6] transition-colors hover:bg-[#c6d9c6]/10 [font-family:var(--font-exp-heading)] sm:text-base"
          >
            {dict.nav.playtest}
          </a>
        </div>
      </div>

      {/* Teapot rover — floating at hero/mission boundary */}
      <ExpeditionFloatingRover
        src="/images/rover.webp"
        width={800}
        height={600}
        sizes="(max-width: 768px) 140px, (max-width: 1024px) 200px, 280px"
        parallaxFactor={0.06}
        className="absolute -bottom-16 right-[5%] w-[140px] md:w-[200px] lg:w-[280px] z-20 opacity-80 md:opacity-90 hidden sm:block"
      />
    </section>
  );
}
