import { Metadata } from "next";
import Link from 'next/link';
import Image from "next/image";
import StoreButton from "@/components/StoreButton";
import LazyMusicPlayer from "@/components/LazyMusicPlayer";
import OptimizedImage from "@/components/OptimizedImage";
import { AdventureJson } from '@/components/SEO';
import LostMarkNavigation from '@/components/LostMarkNavigation';
import { getContent, getFrontmatterString } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';

interface MetaDict {
  title?: string;
  description?: string;
}

interface FeatureItem {
  title?: string;
  description?: string;
}

interface HeroDict {
  title?: string;
  subtitle?: string;
  description?: string;
  interactiveNote?: string;
}

interface ExpansionListItem {
  title?: string;
  description?: string;
}

interface ExpansionDict {
  badge?: string;
  label?: string;
  title?: string;
  description?: string;
  list?: ExpansionListItem[];
  russianNote?: string;
  russianLink?: string;
  russianUrl?: string;
  englishOnlyNote?: string;
}

interface ToolItem {
  title?: string;
  badge?: string;
  description?: string;
}

interface ToolsDict {
  terminal?: ToolItem;
  timer?: ToolItem;
}

interface Roll20Dict {
  description?: string;
  englishOnly?: string;
  features?: string[];
}

interface PricingDict {
  freeEnglish?: string;
  paidRussian?: string;
  russianIncludesAll?: string;
}

interface LostMarkDict {
  meta?: MetaDict;
  hero?: HeroDict;
  stats?: Record<string, string>;
  features?: Record<string, string>;
  featuresList?: FeatureItem[];
  sections?: Record<string, string>;
  buy?: Record<string, string>;
  warning?: Record<string, string>;
  moreProjects?: string;
  buttons?: Record<string, string>;
  nav?: Record<string, string>;
  about?: Record<string, string>;
  credits?: Record<string, string>;
  gallery?: Record<string, string>;
  music?: Record<string, string>;
  cta?: Record<string, string>;
  expansion?: ExpansionDict;
  foundry?: Record<string, string>;
  roll20?: Roll20Dict;
  pricing?: PricingDict;
  tools?: ToolsDict;
  soundtrack?: Record<string, string>;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const content = await getContent('projects', 'lost-mark', lang);
  const dict = await getDictionary(lang, 'lost-mark') as LostMarkDict;
  const title = content ? getFrontmatterString(content.frontmatter, 'title') : '';
  const tagline = content ? getFrontmatterString(content.frontmatter, 'tagline') : '';
  
  return {
    title: dict.meta?.title || `${title || 'The Lost Mark'} - Sci-Fi Horror Adventure | Fables Monster Studio`,
    description: dict.meta?.description || tagline || 'A complete Sci-Fi horror adventure for Mothership RPG.',
    alternates: {
      canonical: `https://fables.monster/${lang}/lost-mark`,
      languages: {
        'en': 'https://fables.monster/en/lost-mark',
        'ru': 'https://fables.monster/ru/lost-mark',
      },
    },
  }
}

export const dynamic = 'force-static';

export default async function LostMark({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const content = await getContent('projects', 'lost-mark', lang);
  const dict = await getDictionary(lang, 'lost-mark') as LostMarkDict;
  
  const contentTitle = content ? getFrontmatterString(content.frontmatter, 'title') : '';
  const contentTagline = content ? getFrontmatterString(content.frontmatter, 'tagline') : '';

  const stats = [
    { label: dict.stats?.system || "System", value: "Mothership 1e" },
    { label: dict.stats?.players || "Players", value: "2-5" },
    { label: dict.stats?.duration || "Duration", value: "2-4 hrs" },
    { label: dict.stats?.pages || "Pages", value: "2" }
  ];

  // SVG icons for features (replacing emojis)
  const FeatureIcons = {
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
    )
  };

  const features = [
    {
      title: dict.featuresList?.[0]?.title || "Sci-Fi Horror",
      description: dict.featuresList?.[0]?.description || "A complete Sci-Fi horror adventure for Mothership RPG.",
      icon: FeatureIcons.scifi
    },
    {
      title: dict.featuresList?.[1]?.title || "Body Horror",
      description: dict.featuresList?.[1]?.description || "Encounter the twisted fusion of flesh and metal.",
      icon: FeatureIcons.dna
    },
    {
      title: dict.featuresList?.[2]?.title || "Moral Choices",
      description: dict.featuresList?.[2]?.description || "Decide the fate of the child and the ship.",
      icon: FeatureIcons.balance
    },
    {
      title: dict.featuresList?.[3]?.title || "High Production",
      description: dict.featuresList?.[3]?.description || "Professional layout, art, and sound design.",
      icon: FeatureIcons.art
    }
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
      <div className="bg-black">
        {/* Hero Section with Promo Image */}
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20"></div>

          {/* Background promo image */}
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/lost-mark/lm_promo_1.webp"
              alt="The Lost Mark Adventure Promo Art - Sci-Fi Horror Atmosphere"
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="100vw"
              quality={85}
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center pt-24 md:pt-32">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-6 font-orbitron tracking-wider">
              {contentTitle || 'THE LOST MARK'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-rajdhani">
              {contentTagline || 'Uncover the dark secrets of the research vessel Lost Mark'}
            </p>

            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto font-orbitron">
              {dict.hero?.description || "A science fiction horror adventure for the role-playing game Mothership RPG. Your team encounters the wreckage of the tourist yacht Silk Star, which disappeared 217 years ago."}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-2xl mx-auto w-full">
              {stats.map((stat, index) => (
                <div key={index} className="bg-black/60 border border-red-700 stat-block p-2 sm:p-3">
                  <div className="text-lg sm:text-2xl font-bold text-red-400 font-orbitron mb-1">{stat.value}</div>
                  <div className="stat-block-label text-gray-300 font-orbitron">
                    <span className="sm:hidden">{stat.label === "System" ? "Mothership" : stat.label}</span>
                    <span className="hidden sm:inline">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Purchase Buttons - More Prominent */}
            <div className="bg-gradient-to-r from-red-950/50 via-red-900/30 to-red-950/50 border border-red-700/50 rounded-xl p-6 mb-6 backdrop-blur-sm">
              {lang === 'ru' ? (
                <>
                  <p className="text-emerald-400 text-sm font-orbitron mb-4 text-center">
                    ✨ Включает весь дополнительный контент
                  </p>
                  <div className="flex justify-center">
                    <a
                      href="https://rpgbook.ru/lost_mark"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#60A5FA] hover:to-[#3B82F6] text-white font-orbitron font-bold px-10 py-5 rounded-lg shadow-lg shadow-blue-900/30 transition-all duration-300 transform hover:scale-105 ring-2 ring-blue-400/50"
                    >
                      <span className="text-xl">{dict.buttons?.rpgbook || "Станция Ролевая"}</span>
                    </a>
                  </div>
                  <p className="text-gray-500 text-xs font-orbitron mt-4 text-center">
                    Версия на английском доступна на <a href="https://fablesmonster.itch.io/lost-mark" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white underline">Itch.io</a> и <a href="https://www.drivethrurpg.com/en/product/530242?affiliate_id=2863466" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white underline">DriveThruRPG</a>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-300 text-sm font-orbitron mb-4 text-center">
                    🎁 Base module is FREE!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                    <a
                      href="https://fablesmonster.itch.io/lost-mark"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#FA5C5C] to-[#e74c4c] hover:from-[#ff6b6b] hover:to-[#FA5C5C] text-white font-orbitron font-bold px-8 py-4 rounded-lg shadow-lg shadow-red-900/30 transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="text-lg">Itch.io</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">Free</span>
                    </a>
                    <a
                      href="https://www.drivethrurpg.com/en/product/530242?affiliate_id=2863466"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#e67e22] to-[#d35400] hover:from-[#f39c12] hover:to-[#e67e22] text-white font-orbitron font-bold px-8 py-4 rounded-lg shadow-lg shadow-orange-900/30 transition-all duration-300 transform hover:scale-105"
                    >
                      <Image src="/logos/dtrpg-logo-small.webp" alt="" width={24} height={24} className="w-6 h-6" />
                      <span className="text-lg">DriveThruRPG</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">Free</span>
                    </a>
                  </div>
                </>
              )}
            </div>

            {/* Terminal and Timer Access Buttons */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/lost-mark/terminal"
                  className="inline-flex items-center gap-2 bg-green-700 text-green-200 font-orbitron font-bold px-6 py-3 rounded border-2 border-green-500 shadow-lg hover:bg-green-600 hover:border-green-400 transition-all duration-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                    <path d="M6 8h.01M6 12h.01M10 8h4" />
                  </svg>
                  {dict.buttons?.terminal || "ACCESS SILK STAR TERMINAL"}
                </Link>

                <Link
                  href="/timer"
                  className="inline-flex items-center gap-2 bg-green-700 text-green-200 font-orbitron font-bold px-6 py-3 rounded border-2 border-green-500 shadow-lg hover:bg-green-600 hover:border-green-400 transition-all duration-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {dict.buttons?.timer || "CHRONOMETER TERMINAL"}
                </Link>
              </div>
              <p className="text-sm text-gray-400 mt-2 font-orbitron">
                {dict.hero?.interactiveNote || "Interactive timer and terminal available now"}
              </p>
            </div>
          </div>
        </section>

        <LostMarkNavigation dict={dict.nav} />

        {/* About Section with Ship Image */}
        <section id="about" className="py-10 sm:py-16 md:py-20 bg-gray-900 border-t border-red-700 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 font-orbitron">
                  {dict.sections?.about || "ABOUT THE ADVENTURE"}
                </h2>
                <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 font-orbitron" dangerouslySetInnerHTML={{ __html: dict.about?.paragraph1 || "After making the final jump, the players' ship finds themselves in the proximity of a compact but active black hole. There are no jump cores left. All they observe is a very old hyper beacon, a cloud of debris, and the **Ship of the Lost** - a giant drifting structure assembled from dozens of other ships." }} />
                <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 font-orbitron" dangerouslySetInnerHTML={{ __html: dict.about?.paragraph2 || "On board lives and rots **Mark Opollo**, a pilot who was fused to the ship during a crash 217 years ago. His surviving companions have become a cult. His flesh is metal. His mind is a net." }} />
                <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 font-orbitron" dangerouslySetInnerHTML={{ __html: dict.about?.paragraph3 || "Hidden inside the ship is a **cryopod containing a child**, the final element for Mark's Ascension. Mark plans to transfer his consciousness into the child or someone more convenient and finally leave this place. Players will have to choose to: **stop** it... or **allow it to happen**." }} />
                {/* Credits */}
                <div className="bg-black border border-red-700 p-4 sm:p-6 mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-4 font-orbitron">{dict.credits?.title || "CREDITS"}</h3>
                  <div className="space-y-2 text-xs sm:text-sm font-orbitron">
                    <div className="flex justify-between">
                      <span className="text-gray-300">{dict.credits?.writtenBy || "Written by:"}</span>
                      <span className="text-white">Stepan Kulikov</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">{dict.credits?.layoutBy || "Layout by:"}</span>
                      <span className="text-white">Tatiana Bond</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">{dict.credits?.artBy || "Art by:"}</span>
                      <span className="text-white">Zlata Ignatova</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">{dict.credits?.musicBy || "Music By:"}</span>
                      <span className="text-white">Stanislav DariDai</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">{dict.credits?.codingBy || "Coding by:"}</span>
                      <span className="text-white">Allecks</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center w-full">
                <div className="bg-black border-2 border-red-700 shadow-lg mb-4 w-full aspect-[3/2] mx-auto overflow-hidden">
                  <OptimizedImage
                    src="/images/lost-mark/ship_lm.webp"
                    alt="The Lost Mark Spaceship drifting in deep space"
                    width={600}
                    height={400}
                    quality={85}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full max-w-full sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] bg-red-950/20 border-2 border-red-700 p-4 sm:p-6">
                  <div className="text-white font-orbitron font-bold text-lg sm:text-xl mb-2 text-center flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 4v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
                    </svg>
                    <span>{dict.warning?.title || "WARNING"}</span>
                  </div>
                  <div className="text-gray-300 font-orbitron text-xs sm:text-sm text-center">
                    {dict.warning?.content || "This adventure contains Sci-Fi horror themes, body horror, and psychological stress. Player discretion advised."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features - Moved Up */}
        <section id="features" className="py-20 border-t border-red-700 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white mb-12 text-center font-orbitron">
              {dict.sections?.features || "KEY FEATURES"}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-900 border border-red-700 p-6 hover:bg-red-950/20 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-red-400 flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3 font-orbitron">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 font-orbitron">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expansion Pack Section */}
        <section id="expansion" className="py-16 bg-black border-t border-red-700 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-black border-2 border-red-700 shadow-lg w-full aspect-video mx-auto overflow-hidden relative group">
                  <OptimizedImage
                    src="/images/lost-mark/Lost mark ext.jpg"
                    alt="Lost Mark Expansion Pack"
                    width={800}
                    height={450}
                    quality={90}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-red-500 font-mono text-xs mb-1 tracking-widest">{dict.expansion?.badge || "AVAILABLE NOW"}</div>
                    <div className="text-white font-bold font-orbitron text-xl">{dict.expansion?.label || "EXPANSION CONTENT"}</div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-orbitron">
                  {dict.sections?.expansion || "EXPANSION PACK"}
                </h2>
                <p className="text-lg text-gray-300 mb-6 font-orbitron">
                  {dict.expansion?.description || "A special expansion pack available separately from the main free module. Enhance your session with premium assets designed to immerse your players in the horror."}
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✦</span>
                    <span className="text-gray-300 font-orbitron">
                      <strong className="text-white">{dict.expansion?.list?.[0]?.title || "12 New Arts"}</strong> — {dict.expansion?.list?.[0]?.description || "A unique illustration for every location on the ship."}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✦</span>
                    <span className="text-gray-300 font-orbitron">
                      <strong className="text-white">{dict.expansion?.list?.[1]?.title || "13 Ambient Sounds"}</strong> — {dict.expansion?.list?.[1]?.description || "Specifically composed tracks to set the atmosphere for each area."}
                    </span>
                  </li>
                </ul>

                {/* Russian-only note about Станция Ролевая */}
                {lang === 'ru' && (
                  <div className="mb-6 space-y-3">
                    <div className="bg-blue-950/30 border border-blue-700/50 rounded-lg p-4">
                      <p className="text-blue-300 font-orbitron text-sm">
                        {dict.expansion?.russianNote || "📚 PDF и материалы на русском языке доступны на"}{" "}
                        <a 
                          href={dict.expansion?.russianUrl || "https://rpgbook.ru/lost_mark"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline font-bold"
                        >
                          {dict.expansion?.russianLink || "Станции Ролевой"}
                        </a>
                      </p>
                    </div>
                    <div className="bg-amber-950/30 border border-amber-700/50 rounded-lg p-4">
                      <p className="text-amber-400 font-orbitron text-sm">
                        {dict.expansion?.englishOnlyNote || "⚠️ Продукты на Itch.io, DriveThruRPG и Roll20 доступны только на английском языке"}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.patreon.com/posts/lost-mark-pack-143990208?fables.monster"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FF424D] hover:bg-[#E63B45] text-white px-6 py-3 rounded font-orbitron font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{dict.buttons?.patreon || "Get on Patreon"}</span>
                  </a>
                  <a
                    href="https://fablesmonster.itch.io/lost-mark"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FA5C5C] hover:bg-[#D44E4E] text-white px-6 py-3 rounded font-orbitron font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{dict.buttons?.itch || "Get on Itch.io"}</span>
                  </a>
                  <a
                    href="https://www.drivethrurpg.com/en/product/546658/mothership-lost-mark-expansion-pack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#e67e22] hover:bg-[#d35400] text-white px-6 py-3 rounded font-orbitron font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{dict.buttons?.drivethru || "Get on DriveThruRPG"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Foundry VTT Section */}
        <section id="foundry" className="py-16 bg-gray-900 border-t border-red-700 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-orbitron">
                  {dict.sections?.foundry || "FOUNDRY VTT MODULE"}
                </h2>
                <p className="text-lg text-gray-300 mb-4 font-orbitron">
                  {dict.foundry?.description || "Experience Lost Mark in Foundry Virtual Tabletop. Fully configured with dynamic lighting, walls, ambient sounds, and journal entries for a seamless horror experience."}
                </p>
                <p className="text-emerald-400 text-sm font-orbitron mb-6">
                  {lang === 'ru' ? '🌐 Поддержка русского языка' : '🌐 Russian language support included'}
                </p>

                <div className="flex flex-col gap-4">
                  <a
                    href="https://www.patreon.com/posts/lost-mark-vtt-143997921"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF424D] to-[#E63B45] hover:from-[#ff5a65] hover:to-[#FF424D] text-white px-6 py-4 rounded-lg font-orbitron font-bold transition-all duration-300 shadow-lg shadow-red-900/30 transform hover:scale-[1.02]"
                  >
                    <Image src="/logos/PATREON_SYMBOL_1_WHITE_RGB.svg" alt="" width={20} height={20} className="w-5 h-5" />
                    <span>Patreon</span>
                  </a>
                  <a
                    href="https://fablesmonster.itch.io/lost-mark-foundry-vtt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#FA5C5C] to-[#D44E4E] hover:from-[#ff6b6b] hover:to-[#FA5C5C] text-white px-6 py-4 rounded-lg font-orbitron font-bold transition-all duration-300 shadow-lg shadow-red-900/30 transform hover:scale-[1.02]"
                  >
                    <span>Itch.io</span>
                  </a>
                </div>
              </div>
              <div className="order-2">
                <div className="border-2 border-red-700 shadow-lg w-full aspect-video mx-auto overflow-hidden relative bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/0v8utSfPluw"
                    title="Lost Mark Foundry VTT Teaser"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roll20 Module Section */}
        <section id="roll20" className="py-16 border-t border-red-700 bg-gray-900/50 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-8 text-center font-orbitron">
              {dict.sections?.roll20 || "ROLL20 MODULE"}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 mb-6">
                  {dict.roll20?.description || "Experience Lost Mark on Roll20. Ready-to-play module with all maps, tokens, and handouts configured for an immersive virtual tabletop experience."}
                </p>
                {lang === 'ru' && (
                  <p className="text-amber-400 text-sm mb-6">
                    {dict.roll20?.englishOnly || "⚠️ Модуль Roll20 доступен только на английском языке"}
                  </p>
                )}
                <ul className="space-y-3 mb-6">
                  {(dict.roll20?.features || [
                    "Ready-to-play adventure",
                    "All maps and tokens included",
                    "Handouts and journal entries",
                    "Dynamic lighting support"
                  ]).map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <span className="text-red-500">▸</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a 
                  href="https://marketplace.roll20.net/browse/module/39314/lost-mark-sci-fi-horror-one-shot-for-mothership"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#E02020] to-[#B81C1C] hover:from-[#FF2D2D] hover:to-[#E02020] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 font-orbitron shadow-lg shadow-red-900/30 transform hover:scale-105"
                >
                  <span className="text-lg">{dict.buttons?.roll20 || "Roll20 Marketplace"}</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">$6.99</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-4 border-2 border-red-700/50 shadow-2xl shadow-red-900/20 overflow-hidden">
                  {/* Roll20 Logo Badge */}
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 font-orbitron">
                    Roll20
                  </div>
                  <OptimizedImage 
                    src="/images/lost-mark/roll20-preview.webp"
                    alt="Lost Mark Roll20 Module - Virtual Tabletop"
                    width={500}
                    height={300}
                    className="rounded-lg w-full h-auto transition-transform duration-500 hover:scale-105"
                  />
                  {/* Feature badges под изображением */}
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    <span className="bg-red-900/50 text-red-300 text-xs px-3 py-1 rounded-full border border-red-700/50 font-orbitron">Maps</span>
                    <span className="bg-red-900/50 text-red-300 text-xs px-3 py-1 rounded-full border border-red-700/50 font-orbitron">Tokens</span>
                    <span className="bg-red-900/50 text-red-300 text-xs px-3 py-1 rounded-full border border-red-700/50 font-orbitron">Handouts</span>
                    <span className="bg-red-900/50 text-red-300 text-xs px-3 py-1 rounded-full border border-red-700/50 font-orbitron">Lighting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Tools Section */}
        <section id="tools" className="py-16 border-t border-red-700 bg-gray-950/50 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-8 text-center font-orbitron">
              {dict.sections?.tools || "INTERACTIVE TOOLS"}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Link
                href="/lost-mark/terminal"
                className="bg-black/60 border-2 border-green-500 p-6 rounded hover:bg-white/10 transition-all duration-200 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                    <path d="M6 8h.01M6 12h.01M10 8h4" />
                  </svg>
                  <h3 className="text-xl font-bold text-white font-orbitron">
                    {dict.tools?.terminal?.title || "SILK STAR TERMINAL"}
                  </h3>
                  <span className="text-xs bg-green-700 text-white px-2 py-1 rounded font-orbitron">{dict.tools?.terminal?.badge || "AVAILABLE NOW"}</span>

                </div>
                <p className="text-white font-orbitron text-sm mb-4">
                  {dict.tools?.terminal?.description || "Access the ship's computer system and uncover the dark secrets hidden in the logs. Navigate through corrupted data, system failures, and mysterious transmissions."}
                </p>
              </Link>
              <Link
                href="/timer"
                className="bg-black/60 border-2 border-green-500 p-6 rounded hover:bg-white/10 transition-all duration-200 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <h3 className="text-xl font-bold text-white font-orbitron">
                    {dict.tools?.timer?.title || "CHRONOMETER TERMINAL"}
                  </h3>
                  <span className="text-xs bg-green-700 text-white px-2 py-1 rounded font-orbitron">{dict.tools?.timer?.badge || "AVAILABLE NOW"}</span>
                </div>
                <p className="text-white font-orbitron text-sm mb-4">
                  {dict.tools?.timer?.description || "A digital countdown timer designed for tabletop gaming sessions. Perfect for time-sensitive scenarios and building tension during gameplay."}
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Audio Section */}
        <section id="soundtrack" className="py-20 border-t border-red-700 bg-gray-900 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white mb-12 text-center font-orbitron flex items-center justify-center gap-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
              <span>{dict.sections?.soundtrack || "ATMOSPHERIC SOUNDTRACK"}</span>
            </h2>

            {/* Streaming Service Link */}
            <div className="py-6 mb-12 text-center">
              <h3 className="text-2xl font-bold text-white mb-4 font-orbitron">{dict.soundtrack?.streamingTitle || "Use Your Favorite Streaming Service"}</h3>
              <p className="text-gray-300 font-orbitron mb-6 max-w-2xl mx-auto">
                {dict.soundtrack?.streamingDesc || "Access the full soundtrack on any platform you prefer for convenient listening during your game sessions."}
              </p>
              <a
                href="https://distrokid.com/hyperfollow/fablesmonsters/lost-mark-original-soundtrack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-700 hover:bg-red-600 text-white font-orbitron font-bold py-3 px-6 rounded border-2 border-red-600 transition-colors mb-3"
              >
                {dict.buttons?.listenStreaming || "Listen on Streaming Services"}
              </a>
            </div>

            {/* YouTube Playlist */}
            <div className="mb-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4 text-center font-orbitron">{dict.soundtrack?.youtubeTitle || "YouTube Playlist"}</h3>
              <p className="text-gray-300 font-orbitron mb-6 max-w-2xl mx-auto text-center">
                {dict.soundtrack?.youtubeDesc || "Watch and listen to the complete soundtrack on YouTube with our dedicated playlist."}
              </p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/videoseries?si=enlxSeQmCInMMZ95&list=PLO8bKMtLeNZT3DrnjgMhfhDl18NJbaFHl"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full aspect-video"
              ></iframe>
            </div>

            {/* Music Player */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4 text-center font-orbitron">{dict.soundtrack?.playerTitle || "Website Player"}</h3>
              <p className="text-gray-300 font-orbitron mb-6 max-w-2xl mx-auto text-center">
                {dict.soundtrack?.playerDesc || "Use our embedded player to enjoy the full soundtrack directly on our website with all 11 tracks."}
              </p>
              <LazyMusicPlayer />
            </div>
          </div>
        </section>

        <section className="py-20 border-t border-red-700 text-center">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white mb-6 font-orbitron">
              {dict.sections?.cta || "READY TO EXPLORE THE LOST MARK?"}
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-orbitron">
              {dict.cta?.description || "Download now and begin your descent into Sci-Fi horror. Available on multiple platforms."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <StoreButton
                store="itch"
                href="https://fablesmonster.itch.io/lost-mark"
                price="Free or PWYW"
                label={dict.buttons?.itch}
              />
              <StoreButton
                store="drivethrurpg"
                href="https://www.drivethrurpg.com/en/product/530242?affiliate_id=2863466"
                price="Free or PWYW"
                label={dict.buttons?.drivethru}
              />
              <Link
                href="/projects"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-orbitron font-bold transition-colors"
              >
                {dict.buttons?.moreProjects || "MORE PROJECTS"}
              </Link>
            </div>

            {/* License Link */}
            <div className="mt-8 pt-6 border-t border-red-700/50">
              <Link
                href="/lost-mark/license"
                className="text-gray-400 hover:text-red-400 font-orbitron text-sm underline transition-colors"
              >
                📄 {dict.buttons?.viewLicense || "View License Information (CC BY-NC-SA 4.0)"}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
