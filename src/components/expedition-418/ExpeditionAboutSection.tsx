import type { Expedition418Dict } from "@/types/i18n";
import FadeIn from "@/components/FadeIn";

interface ExpeditionAboutSectionProps {
  dict: Expedition418Dict;
}

export default function ExpeditionAboutSection({ dict }: ExpeditionAboutSectionProps) {
  return (
    <section id="about" className="scroll-mt-36 border-t-4 border-[#505c64] bg-[#c6d9c6] py-20 text-[#18213c]">
      <div className="fm-shell max-w-6xl">
        <div className="mb-10 flex items-end gap-4">
          <h2 className="text-3xl font-bold uppercase tracking-tight text-[#18213c] sm:text-4xl md:text-5xl [font-family:var(--font-exp-heading)]">{dict.about.aboutTitle}</h2>
          <div className="mb-2 h-[2px] flex-1 bg-[#505c64]/45" />
        </div>
        <div className="grid gap-6 md:grid-cols-12">
          <FadeIn delay={0.06} className="md:col-span-7">
            <article className="relative border border-[#505c64] bg-[#f5efe0] p-5 shadow-[5px_5px_0_0_rgba(24,33,60,0.65)] transition-transform duration-300 hover:-translate-y-0.5 sm:p-6 sm:shadow-[6px_6px_0_0_rgba(24,33,60,0.65)] md:p-7">
              <div className="pointer-events-none absolute right-4 top-4 text-[10px] uppercase tracking-[0.22em] text-[#505c64] [font-family:var(--font-exp-ui)]">Log A</div>
              <p className="text-lg leading-relaxed text-[#243149] [font-family:var(--font-exp-body)] sm:text-xl">{dict.about.paragraph1}</p>
              <p className="mt-5 text-base leading-relaxed text-[#243149] [font-family:var(--font-exp-body)] sm:text-lg">{dict.about.paragraph2}</p>
              <p className="mt-5 border-l-4 border-[#ec544c] bg-[#e8dcc4] px-4 py-3 text-lg leading-relaxed text-[#243149] [font-family:var(--font-exp-body)]">{dict.about.paragraph3}</p>
            </article>
          </FadeIn>
          <FadeIn delay={0.16} className="md:col-span-5 md:translate-y-4">
            <article className="relative border border-[#505c64] bg-[#f5efe0] p-5 shadow-[5px_5px_0_0_rgba(24,33,60,0.65)] transition-transform duration-300 hover:-translate-y-0.5 sm:p-6 sm:shadow-[6px_6px_0_0_rgba(24,33,60,0.65)] md:p-7">
              <div className="pointer-events-none absolute right-4 top-4 text-[10px] uppercase tracking-[0.22em] text-[#505c64] [font-family:var(--font-exp-ui)]">Log B</div>
              <p className="text-base leading-relaxed text-[#243149] [font-family:var(--font-exp-body)] sm:text-lg">{dict.about.paragraph4}</p>
              <p className="mt-5 text-base leading-relaxed text-[#243149] [font-family:var(--font-exp-body)] sm:text-lg">{dict.about.paragraph5}</p>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
