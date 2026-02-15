import { Metadata } from "next";
import { Exo_2, Inter, Manrope, Oswald, Rock_Salt } from "next/font/google";
import { getDictionary } from "@/lib/i18n";
import type { Expedition418Dict } from "@/types/i18n";
import StoryProgressBar from "@/components/StoryProgressBar";
import StorySectionNav from "@/components/StorySectionNav";
import StoryBackToTop from "@/components/StoryBackToTop";
import ExpeditionHeroSection from "@/components/expedition-418/ExpeditionHeroSection";
import ExpeditionMissionSection from "@/components/expedition-418/ExpeditionMissionSection";
import ExpeditionCCTVDisplay from "@/components/expedition-418/ExpeditionCCTVDisplay";
import ExpeditionFeaturesSection from "@/components/expedition-418/ExpeditionFeaturesSection";
import ExpeditionAboutSection from "@/components/expedition-418/ExpeditionAboutSection";
import ExpeditionPlaytestSection from "@/components/expedition-418/ExpeditionPlaytestSection";
import { getExpeditionFeatures, getExpeditionStats } from "@/components/expedition-418/expedition-data";

const expeditionHeading = Oswald({
  subsets: ["latin", "cyrillic"],
  variable: "--font-exp-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const expeditionBody = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-exp-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const expeditionAccent = Exo_2({
  subsets: ["latin", "cyrillic"],
  variable: "--font-exp-accent",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const expeditionUi = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-exp-ui",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const expeditionHand = Rock_Salt({
  subsets: ["latin"],
  variable: "--font-exp-hand",
  display: "swap",
  weight: "400",
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = (await getDictionary(lang, "expedition-418")) as Expedition418Dict;

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `https://fables.monster/${lang}/expedition-418`,
      languages: {
        en: "https://fables.monster/en/expedition-418",
        ru: "https://fables.monster/ru/expedition-418",
      },
    },
  };
}

export const dynamic = "force-static";

export default async function Expedition418({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = (await getDictionary(lang, "expedition-418")) as Expedition418Dict;

  const sectionNavItems = [
    { id: "intel", label: dict.nav.intel },
    { id: "dispatcher", label: dict.nav.dispatcher },
    { id: "features", label: dict.nav.features },
    { id: "about", label: dict.nav.about },
    { id: "playtest", label: dict.nav.playtest },
  ];

  const stats = getExpeditionStats(dict);
  const features = getExpeditionFeatures(dict);

  return (
    <div
      className={`${expeditionHeading.variable} ${expeditionBody.variable} ${expeditionAccent.variable} ${expeditionUi.variable} ${expeditionHand.variable} min-h-screen bg-[#18213c] text-[#c6d9c6]`}
    >
      <StoryProgressBar accent="amber" />
      <div aria-hidden="true" className="expedition-scanline" />
      <div aria-hidden="true" className="expedition-noise" />

      <ExpeditionHeroSection dict={dict} />

      <ExpeditionMissionSection lang={lang} dict={dict} stats={stats} />

      <StorySectionNav items={sectionNavItems} tone="amber" />

      <section id="intel" className="scroll-mt-36 border-t border-[#505c64] bg-[#18213c] py-16">
        <div className="fm-shell max-w-6xl">
          <div className="grid items-start gap-6 border border-[#f67b40]/70 bg-[#1a2442] p-4 shadow-[5px_5px_0_0_rgba(236,84,76,0.35)] sm:gap-8 sm:p-5 sm:shadow-[8px_8px_0_0_rgba(236,84,76,0.35)] lg:grid-cols-[1.9fr_1fr] lg:p-6">
            <div>
              <ExpeditionCCTVDisplay imageAlt={dict.intel.imageAlt} whyTitle={dict.intel.whyTitle} />
              <p className="mt-5 text-sm tracking-[0.18em] text-[#f67b40] [font-family:var(--font-exp-ui)]">{dict.intel.feedCaption}</p>
            </div>
            <aside id="dispatcher" className="scroll-mt-44 border-t-4 border-[#ec544c] bg-[#222d4e] px-5 py-6 lg:border-l-4 lg:border-t-0">
              <p className="mb-3 text-xs uppercase tracking-[0.22em] text-[#f7a37a] [font-family:var(--font-exp-ui)]">
                {dict.nav.dispatcher}
              </p>
              <blockquote className="text-lg leading-relaxed text-[#d9e7d9] [font-family:var(--font-exp-body)]">
                "{dict.dispatcher.quote}"
              </blockquote>
              <p className="mt-5 border-t border-[#505c64] pt-3 text-xs uppercase tracking-[0.18em] text-[#f67b40] [font-family:var(--font-exp-ui)]">
                - {dict.dispatcher.author}
              </p>
            </aside>
          </div>
        </div>
      </section>

      <ExpeditionFeaturesSection title={dict.features.title} features={features} />
      <ExpeditionAboutSection dict={dict} />
      <ExpeditionPlaytestSection lang={lang} dict={dict} />

      <StoryBackToTop tone="amber" />
    </div>
  );
}
