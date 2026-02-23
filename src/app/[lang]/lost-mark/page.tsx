import { Metadata } from "next";
import { AdventureJson } from "@/components/SEO";
import StayConnectedSection from "@/components/StayConnectedSection";
import StoryProgressBar from "@/components/StoryProgressBar";
import StorySectionNav from "@/components/StorySectionNav";
import StoryBackToTop from "@/components/StoryBackToTop";
import LostMarkHeroSection from "@/components/lost-mark/LostMarkHeroSection";
import LostMarkLoreSection from "@/components/lost-mark/LostMarkLoreSection";
import LostMarkPlatformSections from "@/components/lost-mark/LostMarkPlatformSections";
import LostMarkAudioCtaSection from "@/components/lost-mark/LostMarkAudioCtaSection";
import type { LostMarkDictionary } from "@/components/lost-mark/types";
import { getContent, getFrontmatterString } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { buildSocialMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const content = await getContent("projects", "lost-mark", lang);
  const dict = (await getDictionary(lang, "lost-mark")) as LostMarkDictionary;
  const title = content ? getFrontmatterString(content.frontmatter, "title") : "";
  const tagline = content ? getFrontmatterString(content.frontmatter, "tagline") : "";
  const resolvedTitle = dict.meta?.title || `${title || "The Lost Mark"} - Sci-Fi Horror Adventure | Fables Monster Studio`;
  const resolvedDescription = dict.meta?.description || tagline || "A complete Sci-Fi horror adventure for Mothership RPG.";
  const social = buildSocialMetadata({
    lang,
    path: "/lost-mark",
    title: resolvedTitle,
    description: resolvedDescription,
    type: "article",
    imagePath: `/${lang}/lost-mark/opengraph-image`,
    twitterImagePath: `/${lang}/lost-mark/twitter-image`,
    imageAlt: title || "The Lost Mark",
  });

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    ...social,
  };
}

export const dynamic = "force-static";

export default async function LostMark({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const content = await getContent("projects", "lost-mark", lang);
  const dict = await getDictionary(lang, "lost-mark");
  const homeDict = await getDictionary(lang, "home");

  const contentTitle = content ? getFrontmatterString(content.frontmatter, "title") : "";
  const contentTagline = content ? getFrontmatterString(content.frontmatter, "tagline") : "";

  const stats = [
    { label: dict.stats?.system || "System", value: "Mothership 1e" },
    { label: dict.stats?.players || "Players", value: "2-5" },
    { label: dict.stats?.duration || "Duration", value: "2-4 hrs" },
    { label: dict.stats?.pages || "Pages", value: "2" },
  ];

  const sectionNavItems = [
    { id: "about", label: dict.nav?.about || "About" },
    { id: "features", label: dict.nav?.features || "Features" },
    { id: "expansion", label: dict.nav?.expansion || "Expansion" },
    { id: "foundry", label: dict.nav?.foundry || "Foundry VTT" },
    { id: "roll20", label: dict.nav?.roll20 || "Roll20" },
    { id: "tools", label: dict.nav?.tools || "Tools" },
    { id: "soundtrack", label: dict.nav?.soundtrack || "OST" },
  ];

  const featureIcons = {
    scifi: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    dna: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 15c6.667-6 13.333 0 20-6M2 9c6.667 6 13.333 0 20 6M9 3v18M15 3v18" />
      </svg>
    ),
    balance: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18M2 6l10 3M22 6l-10 3M2 18a5 5 0 0 0 10 0M12 18a5 5 0 0 0 10 0" />
      </svg>
    ),
    art: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  };

  const features = [
    {
      title: dict.featuresList?.[0]?.title || "Sci-Fi Horror",
      description: dict.featuresList?.[0]?.description || "A complete sci-fi horror adventure for Mothership RPG.",
      icon: featureIcons.scifi,
    },
    {
      title: dict.featuresList?.[1]?.title || "Body Horror",
      description: dict.featuresList?.[1]?.description || "Encounter the twisted fusion of flesh and metal.",
      icon: featureIcons.dna,
    },
    {
      title: dict.featuresList?.[2]?.title || "Moral Choices",
      description: dict.featuresList?.[2]?.description || "Decide the fate of the child and the ship.",
      icon: featureIcons.balance,
    },
    {
      title: dict.featuresList?.[3]?.title || "High Production",
      description: dict.featuresList?.[3]?.description || "Professional layout, art, and sound design.",
      icon: featureIcons.art,
    },
  ];

  return (
    <>
      <AdventureJson
        name="The Lost Mark"
        description="2-page sci-fi horror adventure for Mothership 1E."
        url="https://fables.monster/lost-mark"
        date="2024-10-05"
        genre="Science Fiction Horror"
      />
      <div className="fm-page">
        <StoryProgressBar accent="red" />
        <LostMarkHeroSection
          lang={lang}
          contentTitle={contentTitle}
          contentTagline={contentTagline}
          dict={dict}
          stats={stats}
        />
        <StorySectionNav items={sectionNavItems} tone="red" />
        <LostMarkLoreSection dict={dict} features={features} />
        <LostMarkPlatformSections lang={lang} dict={dict} />
        <LostMarkAudioCtaSection lang={lang} dict={dict} />
        <StoryBackToTop tone="red" />

        <StayConnectedSection lang={lang} dict={homeDict.stayConnected} />
      </div>
    </>
  );
}
