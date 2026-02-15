import type { ExpeditionFeature } from "@/components/expedition-418/types";

interface ExpeditionFeaturesSectionProps {
  title: string;
  features: ExpeditionFeature[];
}

export default function ExpeditionFeaturesSection({ title, features }: ExpeditionFeaturesSectionProps) {
  return (
    <section id="features" className="scroll-mt-36 border-t border-[#505c64] bg-[#18213c] py-20">
      <div className="fm-shell max-w-6xl">
        <h2 className="mb-8 text-center text-3xl font-bold uppercase text-[#c6d9c6] sm:mb-12 sm:text-4xl md:text-5xl [font-family:var(--font-exp-heading)]">
          {title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="expedition-fade-up group relative border border-[#c6d9c6]/70 bg-[#202b49] p-5 shadow-[5px_5px_0_0_rgba(236,84,76,0.42)] transition-all duration-300 hover:-translate-y-1 hover:border-[#f67b40] hover:shadow-[10px_10px_0_0_rgba(236,84,76,0.56)] sm:p-7 sm:shadow-[7px_7px_0_0_rgba(236,84,76,0.42)]"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <span className="pointer-events-none absolute right-4 top-4 text-[10px] tracking-[0.2em] text-[#9aa8b7] [font-family:var(--font-exp-ui)]">
                0{index + 1}
              </span>
              <div className="flex items-start gap-4">
                <div className="shrink-0 border border-[#ec544c] bg-[#18213c] p-2 text-[#f67b40] transition-colors group-hover:bg-[#ec544c] group-hover:text-[#f5efe0]">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="mb-3 text-[26px] font-semibold leading-[0.95] text-[#f5efe0] [font-family:var(--font-exp-heading)] sm:text-[34px] md:text-[40px]">
                    {feature.title}
                  </h3>
                  <p className="max-w-[42ch] text-base leading-relaxed text-[#d1dfd1] [font-family:var(--font-exp-body)] sm:text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
