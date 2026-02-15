import type { ExpeditionStat } from "@/components/expedition-418/types";
import type { Expedition418Dict } from "@/types/i18n";

interface ExpeditionMissionSectionProps {
  lang: string;
  dict: Expedition418Dict;
  stats: ExpeditionStat[];
}

export default function ExpeditionMissionSection({ lang, dict, stats }: ExpeditionMissionSectionProps) {
  const targetLaunch = lang === "ru" ? "Целевой релиз: Апрель 2026" : "Target Launch: April 2026";
  const heading = lang === "ru" ? "МИССИЯ" : "MISSION";
  const headingAccent = lang === "ru" ? "БРИФИНГ" : "BRIEFING";
  const parametersTitle = lang === "ru" ? "ПАРАМЕТРЫ МИССИИ" : "MISSION PARAMETERS";
  const currentStatus = lang === "ru" ? "ТЕКУЩИЙ СТАТУС" : "CURRENT STATUS";
  const currentStatusValue = lang === "ru" ? "В АКТИВНОЙ РАЗРАБОТКЕ" : "IN ACTIVE DEVELOPMENT";

  return (
    <section className="relative border-t border-[#505c64] bg-[#c6d9c6] py-16 text-[#18213c]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.23] [background-image:radial-gradient(#243149_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
      <div className="fm-shell relative z-10 max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="expedition-fade-up relative border border-[#505c64]/60 bg-[#d0e2cf] p-6 shadow-[6px_6px_0_0_rgba(236,84,76,0.42)] md:p-8" style={{ animationDelay: "120ms" }}>
            <div className="expedition-brief-outline-outer pointer-events-none absolute -inset-4 border-2 border-[#505c64] opacity-30" />
            <div className="expedition-brief-outline-inner pointer-events-none absolute -inset-2 border border-[#f67b40] opacity-60" />
            <h2 className="mb-6 text-5xl font-bold uppercase tracking-tight [font-family:var(--font-exp-heading)] md:text-6xl">
              {heading} <span className="text-[#ec544c]">{headingAccent}</span>
            </h2>
            <p className="text-lg font-semibold leading-relaxed text-[#081329] [font-family:var(--font-exp-body)] md:text-xl">
              {dict.hero.paragraph1}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-[#16233c] [font-family:var(--font-exp-body)] md:text-xl">
              {dict.hero.paragraph2}
            </p>
          </article>

          <article className="expedition-fade-up expedition-params-card border border-[#505c64] bg-[#f5efe0] p-6 shadow-[6px_6px_0_0_rgba(24,33,60,0.78)] md:p-8" style={{ animationDelay: "220ms" }}>
            <p className="mx-auto mb-5 w-fit -translate-y-10 border border-[#ec544c] bg-[#18213c] px-4 py-1 text-sm uppercase tracking-[0.14em] text-[#c6d9c6] [font-family:var(--font-exp-ui)] md:mb-1">
              {parametersTitle}
            </p>

            <div className="space-y-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between gap-4 border-b border-[#505c64]/45 pb-3">
                  <span className="text-2xl uppercase text-[#243149] [font-family:var(--font-exp-heading)]">{stat.label}</span>
                  <span className="text-xl font-semibold text-[#081329] [font-family:var(--font-exp-body)]">{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-[#505c64] px-6 py-5 text-center">
              <p className="text-sm uppercase tracking-[0.14em] text-[#c6d9c6] [font-family:var(--font-exp-ui)]">{currentStatus}</p>
              <p className="mt-1 text-3xl font-semibold uppercase text-[#f67b40] [font-family:var(--font-exp-heading)]">{currentStatusValue}</p>
              <p className="mt-1 text-sm text-[#f7a37a] [font-family:var(--font-exp-ui)]">{targetLaunch}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
