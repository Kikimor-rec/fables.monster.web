import { Metadata } from "next";
import KrampHeroSection from "@/components/kramp/KrampHeroSection";
import KrampLoreSection from "@/components/kramp/KrampLoreSection";
import KrampPostcardSection from "@/components/kramp/KrampPostcardSection";
import KrampLinksSection from "@/components/kramp/KrampLinksSection";
import KrampSectionDivider from "@/components/kramp/KrampSectionDivider";
import KrampSections from "@/components/kramp/KrampSections";
import type { KrampDictionary, KrampFeature, KrampLink } from "@/components/kramp/types";
import StayConnectedSection from "@/components/StayConnectedSection";
import StoryProgressBar from "@/components/StoryProgressBar";
import StorySectionNav from "@/components/StorySectionNav";
import StoryBackToTop from "@/components/StoryBackToTop";
import { getContent, getFrontmatterString } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { buildSocialMetadata } from "@/lib/metadata";
import "./christmas.css";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const content = await getContent("projects", "holiday-audit-kramp", lang);
  const dict = (await getDictionary(lang, "kramp")) as KrampDictionary;
  const fallbackTitle = content ? getFrontmatterString(content.frontmatter, "title") || "Holiday Audit: KRAMP.EXE" : "Holiday Audit: KRAMP.EXE";
  const tagline =
    content
      ? getFrontmatterString(content.frontmatter, "tagline") || "A Christmas Eve gone catastrophically wrong in space."
      : "A Christmas Eve gone catastrophically wrong in space.";
  const title = dict.meta?.title || `${fallbackTitle} | Fables Monster Studio`;
  const description = dict.meta?.description || tagline;
  const social = buildSocialMetadata({
    lang,
    path: "/holiday-audit-kramp",
    title,
    description,
    type: "article",
    imagePath: `/${lang}/holiday-audit-kramp/opengraph-image`,
    twitterImagePath: `/${lang}/holiday-audit-kramp/twitter-image`,
  });

  return {
    title,
    description,
    ...social,
  };
}

export default async function HolidayAuditKramp({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const content = await getContent("projects", "holiday-audit-kramp", lang);
  const dict = (await getDictionary(lang, "kramp")) as KrampDictionary;
  const homeDict = await getDictionary(lang, "home");

  const contentTitle = content ? getFrontmatterString(content.frontmatter, "title") : "";
  const contentTagline = content ? getFrontmatterString(content.frontmatter, "tagline") : "";

  const featureIcons = {
    clipboard: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h6" />
      </svg>
    ),
    tree: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3l8 8h-3l4 5h-5l2 5H6l2-5H3l4-5H4l8-8z" />
        <rect x="10" y="21" width="4" height="2" />
      </svg>
    ),
    bolt: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    music: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  };

  const features: KrampFeature[] = [
    {
      name: dict.features?.sinTracking?.name || "Sin-Tracking Mechanic",
      description: dict.features?.sinTracking?.description || "Document past transgressions and watch consequences snowball.",
      icon: featureIcons.clipboard,
    },
    {
      name: dict.features?.postcardFormat?.name || "Postcard-Size Format",
      description: dict.features?.postcardFormat?.description || "Perfect for slipping into stockings or sending to your warden.",
      icon: featureIcons.tree,
    },
    {
      name: dict.features?.singleSession?.name || "Single Session Horror",
      description: dict.features?.singleSession?.description || "Sci-fi suspense wrapped in tinsel and static.",
      icon: featureIcons.bolt,
    },
    {
      name: dict.features?.festiveSynth?.name || "Festive Synthwave",
      description: dict.features?.festiveSynth?.description || "Special sci-fi horror soundtrack for deeper immersion.",
      icon: featureIcons.music,
    },
  ];

  const links: KrampLink[] = [
    {
      platform: "itch.io",
      url: "https://fablesmonster.itch.io/",
      description: dict.links?.itch || "dev-logs and previews",
      icon: "/itchio-logo-textless-white.svg",
    },
    {
      platform: "Patreon",
      url: "https://www.patreon.com/FablesMonster",
      description: dict.links?.patreon || "behind-the-scenes art and tools",
      icon: "/logos/PATREON_SYMBOL_1_WHITE_RGB.svg",
    },
    {
      platform: "DriveThruRPG",
      url: "https://legacy.drivethrurpg.com/browse/pub/30815/FablesMonster",
      description: dict.links?.drivethru || "PDF release and future bundles",
      icon: "/logos/dtrpg-logo-small.png",
    },
    {
      platform: "Discord",
      url: "https://discord.gg/eAwK9DfKf4",
      description: dict.links?.discord || "playtests and community chat",
      icon: "/logos/Discord-Symbol-White.svg",
    },
  ];

  const sectionNavItems = [
    { id: "about", label: dict.sections?.about || "About" },
    { id: "features", label: dict.sections?.features || "Features" },
    { id: "postcard", label: dict.sections?.postcard || "Postcard" },
    { id: "soundtrack", label: dict.sections?.soundtrack || "OST" },
    { id: "tables", label: dict.sections?.tables || "Tables" },
    { id: "links", label: dict.sections?.links || "Links" },
  ];

  return (
    <div className="fm-page relative overflow-hidden font-rajdhani">
      <StoryProgressBar accent="green" />

      <div className="christmas-lights opacity-30 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`light ${["red", "green", "blue", "yellow"][i % 4]}`} />
        ))}
      </div>

      <div className="snow opacity-20 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="snowflake">
            ❄
          </div>
        ))}
      </div>

      <KrampHeroSection contentTitle={contentTitle} contentTagline={contentTagline} dict={dict} />

      <KrampSectionDivider />
      <StorySectionNav items={sectionNavItems} tone="green" />

      <KrampLoreSection contentTitle={contentTitle} dict={dict} features={features} />
      <KrampSectionDivider />

      <KrampPostcardSection dict={dict} />
      <KrampSectionDivider />

      <KrampSections lang={lang} dict={dict} />
      <KrampSectionDivider />

      <KrampLinksSection dict={dict} links={links} />
      <KrampSectionDivider />

      <StoryBackToTop tone="green" />

      <StayConnectedSection lang={lang} dict={homeDict.stayConnected} />
    </div>
  );
}
