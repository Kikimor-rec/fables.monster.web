import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildSocialMetadata } from "@/lib/metadata";
import type { CareerTwilightDict } from "@/types/i18n";
import CareerTwilightHero from "@/components/career-twilight/CareerTwilightHero";
import CareerTwilightIntro from "@/components/career-twilight/CareerTwilightIntro";
import CareerTwilightRelease from "@/components/career-twilight/CareerTwilightRelease";
import CareerTwilightTimeline from "@/components/career-twilight/CareerTwilightTimeline";
import CareerTwilightContract from "@/components/career-twilight/CareerTwilightContract";
import CareerTwilightStats from "@/components/career-twilight/CareerTwilightStats";
import { JsonLd, buildBreadcrumbJsonLd, buildCreativeWorkJsonLd } from "@/lib/seo/jsonld";

export const dynamic = "force-static";
export const revalidate = 3600;

const PRODUCT_URLS = {
  itch: "https://fablesmonster.itch.io/career-twilight",
  drivethru: "https://www.drivethrurpg.com/en/product/569217/career-twilight-mothership-1e",
  rpgbook: "https://rpgbook.ru/search?fables.monster",
  rpgTrader: "https://rpg-trader.com/creator/246/fablesmonster",
  maps: "/downloads/career-twilight/maps.zip",
  handouts: "/downloads/career-twilight/ct-handouts.pdf",
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = (await getDictionary(lang, "career-twilight")) as CareerTwilightDict;

  const social = buildSocialMetadata({
    lang,
    path: "/career-twilight",
    title: dict.meta.title,
    description: dict.meta.description,
    type: "article",
    imagePath: "/images/career-twilight/dr-reiner.webp",
    imageAlt: "Career Twilight",
  });

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    ...social,
  };
}

export default async function CareerTwilightPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = (await getDictionary(lang, "career-twilight")) as CareerTwilightDict;
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: `/${lang}` },
    { name: "Projects", path: `/${lang}/projects` },
    { name: "Career Twilight", path: `/${lang}/career-twilight` },
  ]);
  const careerTwilightJsonLd = buildCreativeWorkJsonLd({
    name: "Career Twilight",
    description: dict.meta.description,
    path: `/${lang}/career-twilight`,
    lang,
    imagePath: "/images/career-twilight/dr-reiner.webp",
    genre: "Science Fiction Horror",
    keywords: ["Mothership 1E", "One-Shot", "Corporate Horror", "Career Twilight"],
  });

  return (
    <>
      <JsonLd id="career-twilight-breadcrumb-jsonld" data={breadcrumbJsonLd} />
      <JsonLd id="career-twilight-creativework-jsonld" data={careerTwilightJsonLd} />
      <main className="career-twilight-theme min-h-screen text-gray-200">
      <CareerTwilightHero lang={lang} dict={dict} urls={PRODUCT_URLS} />
      <CareerTwilightIntro dict={dict} />
      <CareerTwilightRelease lang={lang} dict={dict} urls={PRODUCT_URLS} />
      <section className="border-b border-cyan-500/20 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-8 text-center">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.26em] text-red-300/80">
              WARDEN DOSSIER // SPOILER MATERIAL
            </p>
            <h2 className="font-orbitron text-2xl uppercase tracking-[0.12em] text-white md:text-3xl">
              Restricted Operations File
            </h2>
          </div>
          <div className="space-y-10">
            <CareerTwilightTimeline dict={dict} />
            <CareerTwilightContract dict={dict} />
          </div>
        </div>
      </section>
      <CareerTwilightStats dict={dict} />
    </main>
    </>
  );
}
