import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import type { Expedition418Dict } from "@/types/i18n";
import StayConnectedSection from "@/components/StayConnectedSection";
import StoryProgressBar from "@/components/StoryProgressBar";
import StorySectionNav from "@/components/StorySectionNav";
import StoryBackToTop from "@/components/StoryBackToTop";
import ExpeditionHeroSection from "@/components/expedition-418/ExpeditionHeroSection";
import ExpeditionCCTVDisplay from "@/components/expedition-418/ExpeditionCCTVDisplay";
import ExpeditionDispatcherSection from "@/components/expedition-418/ExpeditionDispatcherSection";
import ExpeditionFeaturesSection from "@/components/expedition-418/ExpeditionFeaturesSection";
import ExpeditionAboutSection from "@/components/expedition-418/ExpeditionAboutSection";
import ExpeditionPlaytestSection from "@/components/expedition-418/ExpeditionPlaytestSection";
import { getExpeditionFeatures, getExpeditionStats } from "@/components/expedition-418/expedition-data";

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
  const homeDict = await getDictionary(lang, "home");

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
    <div className="fm-page">
      <StoryProgressBar accent="cyan" />

      <ExpeditionHeroSection lang={lang} dict={dict} stats={stats} />

      <StorySectionNav items={sectionNavItems} tone="cyan" />

      <section id="intel" className="py-16 bg-gray-950 border-t border-cyan-900/30 scroll-mt-36">
        <div className="fm-shell max-w-4xl">
          <ExpeditionCCTVDisplay imageAlt={dict.intel.imageAlt} whyTitle={dict.intel.whyTitle} />
          <p className="text-center text-gray-500 font-mono text-sm mt-4">{dict.intel.feedCaption}</p>
        </div>
      </section>

      <ExpeditionDispatcherSection dict={dict} />
      <ExpeditionFeaturesSection title={dict.features.title} features={features} />
      <ExpeditionAboutSection dict={dict} />
      <ExpeditionPlaytestSection lang={lang} dict={dict} />

      <StayConnectedSection lang={lang} dict={homeDict.stayConnected} variant="cyberpunk" />
      <StoryBackToTop tone="cyan" />
    </div>
  );
}
