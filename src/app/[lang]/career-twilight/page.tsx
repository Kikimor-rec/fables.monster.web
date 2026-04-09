import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildSocialMetadata } from "@/lib/metadata";
import type { CareerTwilightDict } from "@/types/i18n";
import CareerTwilightHero from "@/components/career-twilight/CareerTwilightHero";
import CareerTwilightIntro from "@/components/career-twilight/CareerTwilightIntro";
import CareerTwilightTimeline from "@/components/career-twilight/CareerTwilightTimeline";
import CareerTwilightContract from "@/components/career-twilight/CareerTwilightContract";
import CareerTwilightStats from "@/components/career-twilight/CareerTwilightStats";

export const dynamic = "force-static";
export const revalidate = 3600;

const ITCH_URL = "https://fablesmonster.itch.io/career-twilight";

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

  return (
    <main className="career-twilight-theme min-h-screen text-gray-200">
      <CareerTwilightHero lang={lang} dict={dict} itchUrl={ITCH_URL} />
      <CareerTwilightIntro dict={dict} />
      <CareerTwilightTimeline dict={dict} />
      <CareerTwilightContract dict={dict} />
      <CareerTwilightStats dict={dict} />
    </main>
  );
}
