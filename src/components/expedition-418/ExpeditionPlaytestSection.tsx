import Link from "next/link";
import type { Expedition418Dict } from "@/types/i18n";

interface ExpeditionPlaytestSectionProps {
  lang: string;
  dict: Expedition418Dict;
}

export default function ExpeditionPlaytestSection({ lang, dict }: ExpeditionPlaytestSectionProps) {
  return (
    <section id="playtest" className="scroll-mt-36 border-t border-[#505c64] bg-[#18213c] py-20">
      <div className="fm-shell max-w-5xl">
        <div className="expedition-fade-up relative overflow-hidden border border-[#f67b40] bg-[#202b49] px-4 py-6 shadow-[5px_5px_0_0_rgba(236,84,76,0.4)] sm:px-6 sm:py-8 sm:shadow-[8px_8px_0_0_rgba(236,84,76,0.4)] md:px-10 md:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(246,123,64,0.18),transparent_36%)]" />
          <p className="relative mb-4 inline-flex border border-[#f67b40]/70 bg-[#18213c] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#f7a37a] [font-family:var(--font-exp-ui)] sm:mb-5 sm:text-xs">{dict.playtest.incoming}</p>
          <p className="relative mb-4 text-base leading-relaxed text-[#d9e7d9] [font-family:var(--font-exp-body)] sm:mb-5 sm:text-xl">{dict.playtest.paragraph1}</p>
          <p className="relative text-base leading-relaxed text-[#d9e7d9] [font-family:var(--font-exp-body)] sm:text-xl">{dict.playtest.paragraph2}</p>

          <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
            <a
              href="https://discord.gg/eAwK9DfKf4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center border border-[#f67b40] bg-[#f67b40] px-5 py-3 text-base uppercase tracking-[0.08em] text-[#18213c] transition-colors hover:bg-[#ec544c] hover:text-[#f5efe0] [font-family:var(--font-exp-heading)]"
            >
              {dict.playtest.buttons.discord}
            </a>
            <Link
              href={`/${lang}/newsletter/subscribe`}
              className="inline-flex min-h-12 items-center justify-center border border-[#c6d9c6] bg-transparent px-5 py-3 text-base uppercase tracking-[0.08em] text-[#c6d9c6] transition-colors hover:bg-[#c6d9c6] hover:text-[#18213c] [font-family:var(--font-exp-heading)]"
            >
              {dict.playtest.buttons.subscribe}
            </Link>
            <a
              href="https://www.patreon.com/FablesMonster"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center border border-[#ec544c] bg-transparent px-5 py-3 text-base uppercase tracking-[0.08em] text-[#f7a37a] transition-colors hover:bg-[#ec544c]/20 hover:text-[#f5efe0] [font-family:var(--font-exp-heading)]"
            >
              {dict.playtest.buttons.patreon}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
