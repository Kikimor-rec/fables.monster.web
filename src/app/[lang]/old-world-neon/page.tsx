import { Metadata } from "next";
import { getContent, getFrontmatterString } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { buildSocialMetadata } from "@/lib/metadata";
import type { OldWorldNeonDict } from "@/types/i18n";
import StayConnectedSection from "@/components/StayConnectedSection";
import StoryProgressBar from "@/components/StoryProgressBar";
import StorySectionNav from "@/components/StorySectionNav";
import StoryBackToTop from "@/components/StoryBackToTop";
import NeonHeroSection from "@/components/old-world-neon/NeonHeroSection";
import NeonTeaserSection from "@/components/old-world-neon/NeonTeaserSection";
import NeonFeaturesSection from "@/components/old-world-neon/NeonFeaturesSection";
import type { NeonStatusTag } from "@/components/old-world-neon/types";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = (await getDictionary(lang, "old-world-neon")) as OldWorldNeonDict;
  const social = buildSocialMetadata({
    lang,
    path: "/old-world-neon",
    title: dict.meta.title,
    description: dict.meta.description,
    type: "article",
    imagePath: `/${lang}/old-world-neon/opengraph-image`,
    twitterImagePath: `/${lang}/old-world-neon/twitter-image`,
  });

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    ...social,
  };
}

export default async function ProjectNeonPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const content = await getContent("projects", "old-world-neon", lang);
  const dict = (await getDictionary(lang, "old-world-neon")) as OldWorldNeonDict;
  const homeDict = await getDictionary(lang, "home");

  const sectionNavItems = [
    { id: "teaser", label: dict.nav.teaser },
    { id: "features", label: dict.nav.features },
  ];

  const statusTags: NeonStatusTag[] = [
    { label: dict.hero.statusTags.cyberpunk, classes: "bg-cyan-900/50 text-cyan-400 border-cyan-500" },
    { label: dict.hero.statusTags.classified, classes: "bg-fuchsia-900/50 text-fuchsia-400 border-fuchsia-500" },
    { label: dict.hero.statusTags.unknown, classes: "bg-yellow-900/50 text-yellow-400 border-yellow-500" },
  ];

  const imageSrc = content ? getFrontmatterString(content.frontmatter, "image") || "/images/old-world-neon-hero.png" : "/images/old-world-neon-hero.png";
  const heroTagline = (content ? getFrontmatterString(content.frontmatter, "tagline") : "") || dict.hero.taglineFallback;
  const heroDescription = (content ? getFrontmatterString(content.frontmatter, "description") : "") || dict.hero.descriptionFallback;
  const contentHtml = content?.contentHtml || "";

  return (
    <div className="fm-page relative overflow-hidden">
      <StoryProgressBar accent="fuchsia" />

      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(0,255,255,0.05) 25%, rgba(0,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(0,255,255,0.05) 75%, rgba(0,255,255,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,255,255,0.05) 25%, rgba(0,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(0,255,255,0.05) 75%, rgba(0,255,255,0.05) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <NeonHeroSection
        imageSrc={imageSrc}
        tagline={heroTagline}
        description={heroDescription}
        contentHtml={contentHtml}
        statusTags={statusTags}
        copy={{
          classified: dict.hero.classified,
          oldWorld: dict.hero.oldWorld,
          neon: dict.hero.neon,
          system: dict.hero.system,
          accessLines: dict.hero.accessLines,
          restrictedTitle: dict.hero.restrictedTitle,
        }}
      />

      <StorySectionNav items={sectionNavItems} tone="fuchsia" />

      <NeonTeaserSection dict={dict} />
      <NeonFeaturesSection dict={dict} />

      <StayConnectedSection lang={lang} dict={homeDict.stayConnected} variant="cyberpunk" />
      <StoryBackToTop tone="fuchsia" />
    </div>
  );
}
