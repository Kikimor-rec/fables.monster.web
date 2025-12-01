import { Metadata } from 'next'
import Link from 'next/link';
import Image from "next/image";
import Navigation from "@/components/Navigation";
import { getContent, getFrontmatterString } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';
import './christmas.css';

interface KrampDict {
  meta?: { title?: string; description?: string };
  nav?: Record<string, string>;
  hero?: { title?: string; subtitle?: string; tagline?: string; badges?: Record<string, string> };
  features?: Record<string, { name?: string; description?: string }>;
  sections?: Record<string, string>;
  buttons?: Record<string, string>;
  links?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const content = await getContent('projects', 'holiday-audit-kramp', lang);
  const dict = await getDictionary(lang, 'kramp') as KrampDict;
  const title = content ? getFrontmatterString(content.frontmatter, 'title') || 'Holiday Audit: KRAMP.EXE' : 'Holiday Audit: KRAMP.EXE';
  const tagline = content ? getFrontmatterString(content.frontmatter, 'tagline') || 'A Christmas Eve gone catastrophically wrong in space.' : 'A Christmas Eve gone catastrophically wrong in space.';
  
  return {
    title: dict.meta?.title || `${title} | Fables Monster Studio`,
    description: dict.meta?.description || tagline,
    alternates: {
      canonical: `https://fables.monster/${lang}/holiday-audit-kramp`,
      languages: {
        'en': 'https://fables.monster/en/holiday-audit-kramp',
        'ru': 'https://fables.monster/ru/holiday-audit-kramp',
      },
    },
  }
}

export default async function HolidayAuditKramp({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const content = await getContent('projects', 'holiday-audit-kramp', lang);
  const dict = await getDictionary(lang, 'kramp') as KrampDict;
  
  const contentTitle = content ? getFrontmatterString(content.frontmatter, 'title') : '';
  const contentTagline = content ? getFrontmatterString(content.frontmatter, 'tagline') : '';

  // Component for section divider lights
  const SectionDivider = () => (
    <div className="section-divider opacity-50">
      <div className="divider-lights">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`divider-light ${['red', 'green', 'blue', 'yellow'][i % 4]}`}></div>
        ))}
      </div>
    </div>
  );

  // SVG icons for features (replacing emojis)
  const FeatureIcons = {
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
    )
  };

  const features = [
    {
      name: dict.features?.sinTracking?.name || "Sin-Tracking Mechanic",
      description: dict.features?.sinTracking?.description || "Document past transgressions and watch consequences snowball.",
      icon: FeatureIcons.clipboard
    },
    {
      name: dict.features?.postcardFormat?.name || "Postcard-Size Format",
      description: dict.features?.postcardFormat?.description || "Perfect for slipping into stockings or sending to your warden.",
      icon: FeatureIcons.tree
    },
    {
      name: dict.features?.singleSession?.name || "Single Session Horror",
      description: dict.features?.singleSession?.description || "Sci-fi suspense wrapped in tinsel and static.",
      icon: FeatureIcons.bolt
    },
    {
      name: dict.features?.festiveSynth?.name || "Festive Synthwave",
      description: dict.features?.festiveSynth?.description || "Special sci-fi horror soundtrack for deeper immersion.",
      icon: FeatureIcons.music
    }
  ];

  const links = [
    {
      platform: "itch.io",
      url: "https://fablesmonster.itch.io/",
      description: dict.links?.itch || "dev-logs & previews",
      icon: "/itchio-logo-textless-white.svg"
    },
    {
      platform: "Patreon",
      url: "https://www.patreon.com/FablesMonster",
      description: dict.links?.patreon || "behind-the-scenes art & tools",
      icon: "/logos/PATREON_SYMBOL_1_WHITE_RGB.svg"
    },
    {
      platform: "DriveThruRPG",
      url: "https://legacy.drivethrurpg.com/browse/pub/30815/FablesMonster",
      description: dict.links?.drivethru || "PDF release & future bundles",
      icon: "/logos/dtrpg-logo-small.png"
    },
    {
      platform: "Discord",
      url: "https://discord.gg/qJS4h5usxe",
      description: dict.links?.discord || "playtests & community chat",
      icon: "/logos/Discord-Symbol-White.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-rajdhani">
      {/* Christmas Lights Animation */}
      <div className="christmas-lights opacity-30 pointer-events-none">
        <div className="light red"></div>
        <div className="light green"></div>
        <div className="light blue"></div>
        <div className="light yellow"></div>
        <div className="light red"></div>
        <div className="light green"></div>
        <div className="light blue"></div>
        <div className="light yellow"></div>
        <div className="light red"></div>
        <div className="light green"></div>
        <div className="light blue"></div>
        <div className="light yellow"></div>
      </div>

      {/* Snow Effect */}
      <div className="snow opacity-20 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="snowflake">❄</div>
        ))}
      </div>

      <Navigation lang={lang} dict={dict.nav || {}} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 md:pt-24">
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="relative w-48 h-48 mx-auto mb-6">
            <Image
              src="/images/kramp/small kramp.webp"
              alt="St.N KRAMP Pointing"
              fill
              className="object-contain filter invert drop-shadow-[0_0_15px_rgba(255,0,0,0.3)]"
              priority
            />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-orbitron tracking-wider text-glow">
            {contentTitle || dict.hero?.title || 'HOLIDAY AUDIT'}
          </h1>
          <div className="text-4xl md:text-6xl font-bold text-red-500 mb-8 font-orbitron glitch-text" data-text="KRAMP.EXE">
            {dict.hero?.subtitle || "KRAMP.EXE"}
          </div>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto font-rajdhani">
            {contentTagline || dict.hero?.tagline || 'Christmas Eve gone catastrophically wrong in deep space'}
          </p>
          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
            <span className="bg-green-900/50 text-green-400 px-4 py-2 font-orbitron border border-green-600 clip-path-slant hover:box-glow-cyan transition-all animate-pulse">{dict.hero?.badges?.available || 'AVAILABLE NOW'}</span>
            <span className="bg-red-900/50 text-red-400 px-4 py-2 font-orbitron border border-red-600 clip-path-slant hover:box-glow transition-all">{dict.hero?.badges?.oneShot || 'ONE-SHOT'}</span>
            <span className="bg-green-900/50 text-green-400 px-4 py-2 font-orbitron border border-green-600 clip-path-slant hover:box-glow-cyan transition-all">{dict.hero?.badges?.postcard || 'POSTCARD SIZE'}</span>
          </div>
          
          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <a
              href="https://www.drivethrurpg.com/en/product/547046/kramp-exe-christmas-special-edition-for-mothership-1e?affiliate_id=2863466"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-red-900/30 border-2 border-red-500 text-red-400 font-orbitron font-bold text-lg clip-path-slant hover:bg-red-900/50 hover:text-white transition-all duration-300 hover:box-glow min-w-[200px] text-center"
            >
              <span className="relative z-10">{dict.buttons?.drivethru || 'GET ON DRIVETHRU'}</span>
            </a>
            <a
              href="https://fablesmonster.itch.io/krampexe-mothership-1e"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-green-900/30 border-2 border-green-500 text-green-400 font-orbitron font-bold text-lg clip-path-slant hover:bg-green-900/50 hover:text-white transition-all duration-300 hover:box-glow-cyan min-w-[200px] text-center"
            >
              <span className="relative z-10">{dict.buttons?.itch || 'GET ON ITCH.IO'}</span>
            </a>
            <a
              href="https://www.patreon.com/posts/kramp-exe-for-1e-144275102"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-blue-900/30 border-2 border-blue-500 text-blue-400 font-orbitron font-bold text-lg clip-path-slant hover:bg-blue-900/50 hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] min-w-[200px] text-center"
            >
              <span className="relative z-10">{dict.buttons?.patreon || 'PATREON EXCLUSIVE'}</span>
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Description Section */}
      <section className="py-20 relative z-10 bg-gray-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gray-900/50 border border-red-700/50 p-8 mb-12 hud-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <svg className="w-12 h-12 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 4v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
              </svg>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-6 font-orbitron text-glow">
                  {contentTitle || 'St.N KRAMP — Holiday Audit in Deep Space'}
                </h2>
                <div 
                  className="text-lg text-gray-300 font-rajdhani leading-relaxed space-y-4 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: content?.contentHtml || '' }}
                />
              </div>
              <div className="relative w-48 h-48 flex-shrink-0 hidden md:block">
                <Image
                  src="/images/kramp/big kramp.webp"
                  alt="St.N KRAMP Gift"
                  fill
                  className="object-contain filter invert drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]"
                />
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900/30 border border-green-700/30 p-6 hud-border hover:bg-green-900/10 transition-colors group">
                <div className="text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold text-green-400 mb-3 font-orbitron group-hover:text-glow-cyan">{feature.name}</h3>
                <p className="text-gray-300 font-rajdhani">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Postcard Mockup Section */}
      <section className="py-20 relative z-10 bg-gradient-to-b from-black via-red-950/10 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-orbitron text-glow">
              {dict.sections?.postcard || 'POSTCARD FORMAT'}
            </h2>
            <p className="text-gray-400 font-rajdhani text-lg">
              {dict.postcard?.description || 'Unfold the horror. Perfect for stockings or last-minute gifts.'}
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gray-900/50 border-2 border-red-700/50 p-4 md:p-8 hud-border">
              <Image
                src="/images/kramp/promo.webp"
                alt="KRAMP.EXE Postcard Mockup - Unfolded Adventure"
                width={1200}
                height={800}
                className="w-full h-auto border border-red-500/30 shadow-2xl shadow-red-900/50"
                priority
              />
              <div className="mt-4 text-center text-sm text-gray-500 font-mono">
                {dict.postcard?.unfold || '// UNFOLD_AT_TABLE.EXE'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Stay in the Loop Section */}
      <section className="py-20 relative z-10 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gray-900/50 border border-red-700/50 p-8 hud-border">
            <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-8 font-orbitron text-center text-glow">
              {dict.sections?.stayInLoop || 'Stay in the Loop'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gray-800/50 border border-gray-700 hover:border-green-500 transition-all duration-300 hover:box-glow-cyan group"
                >
                  <div className="w-8 h-8 flex-shrink-0">
                    <Image
                      src={link.icon}
                      alt={link.platform}
                      width={32}
                      height={32}
                      className="w-full h-full object-contain filter brightness-0 invert group-hover:drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-green-400 font-orbitron group-hover:text-green-300">{link.platform}</div>
                    <div className="text-sm text-gray-400 font-rajdhani group-hover:text-gray-200">{link.description}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Back to Projects */}
      <section className="py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Link
            href={`/${lang}/projects`}
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-orbitron transition-colors text-lg hover:text-glow"
          >
            {dict.backToProjects || '← Back to Projects'}
          </Link>
        </div>
      </section>
    </div>
  );
}
