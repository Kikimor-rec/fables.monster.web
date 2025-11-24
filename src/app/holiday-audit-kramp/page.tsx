import { Metadata } from 'next'
import Link from 'next/link';
import Image from "next/image";
import Navigation from "@/components/Navigation";
import './christmas.css';

export const metadata: Metadata = {
  title: 'Holiday Audit: KRAMP.EXE | Fables Monster Studio',
  description: 'A Christmas Eve gone catastrophically wrong in space. Face the malfunctioning St.N KRAMP AI in this festive horror one-shot for Mothership RPG.',
  keywords: 'Mothership RPG, Christmas horror, holiday RPG, space station, AI horror, one-shot adventure, sci-fi Christmas, postcard adventure',
  openGraph: {
    title: 'Holiday Audit: KRAMP.EXE - Christmas Horror in Space',
    description: 'Christmas Eve gone wrong in deep space. Can you survive the karma-reviewing AI St.N KRAMP in this festive horror one-shot?',
    url: 'https://fables.monster/holiday-audit-kramp',
    siteName: 'Fables Monster Studio',
    images: [
      {
        url: 'https://fables.monster/projects/holiday-audit-kramp-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Holiday Audit: KRAMP.EXE RPG Adventure Cover',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Holiday Audit: KRAMP.EXE - Christmas Horror Adventure',
    description: 'Christmas Eve gone wrong in deep space. Survive the karma-reviewing AI in this festive horror one-shot.',
    images: ['https://fables.monster/projects/holiday-audit-kramp-cover.jpg'],
  },
  alternates: {
    canonical: 'https://fables.monster/holiday-audit-kramp',
  },
}


export default function HolidayAuditKramp() {
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

  const features = [
    {
      name: "Sin-Tracking Mechanic",
      description: "Document past transgressions and watch consequences snowball.",
      icon: "📋"
    },
    {
      name: "Postcard-Size Format",
      description: "Perfect for slipping into stockings or sending to your warden.",
      icon: "🎄"
    },
    {
      name: "Single Session Horror",
      description: "Sci-fi suspense wrapped in tinsel and static.",
      icon: "⚡"
    },
    {
      name: "Festive Synthwave",
      description: "Special sci-fi horror soundtrack for deeper immersion.",
      icon: "🎵"
    }
  ];

  const links = [
    {
      platform: "itch.io",
      url: "https://fablesmonster.itch.io/",
      description: "dev-logs & previews",
      icon: "/itchio-logo-textless-white.svg"
    },
    {
      platform: "Patreon",
      url: "https://www.patreon.com/FablesMonster",
      description: "behind-the-scenes art & tools",
      icon: "/logos/PATREON_SYMBOL_1_WHITE_RGB.svg"
    },
    {
      platform: "DriveThruRPG",
      url: "https://legacy.drivethrurpg.com/browse/pub/30815/FablesMonster",
      description: "PDF release & future bundles",
      icon: "/logos/dtrpg-logo-small.png"
    },
    {
      platform: "Discord",
      url: "https://discord.gg/qJS4h5usxe",
      description: "playtests & community chat",
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

      <Navigation />

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
            HOLIDAY AUDIT
          </h1>
          <div className="text-4xl md:text-6xl font-bold text-red-500 mb-8 font-orbitron glitch-text" data-text="KRAMP.EXE">
            KRAMP.EXE
          </div>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto font-rajdhani">
            Christmas Eve gone catastrophically wrong in deep space
          </p>
          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
            <span className="bg-green-900/50 text-green-400 px-4 py-2 font-orbitron border border-green-600 clip-path-slant hover:box-glow-cyan transition-all animate-pulse">AVAILABLE NOW</span>
            <span className="bg-red-900/50 text-red-400 px-4 py-2 font-orbitron border border-red-600 clip-path-slant hover:box-glow transition-all">ONE-SHOT</span>
            <span className="bg-green-900/50 text-green-400 px-4 py-2 font-orbitron border border-green-600 clip-path-slant hover:box-glow-cyan transition-all">POSTCARD SIZE</span>
          </div>
          
          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <a
              href="https://www.drivethrurpg.com/en/product/547046/kramp-exe-christmas-special-edition-for-mothership-1e?affiliate_id=2863466"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-red-900/30 border-2 border-red-500 text-red-400 font-orbitron font-bold text-lg clip-path-slant hover:bg-red-900/50 hover:text-white transition-all duration-300 hover:box-glow min-w-[200px] text-center"
            >
              <span className="relative z-10">GET ON DRIVETHRU</span>
            </a>
            <a
              href="https://fablesmonster.itch.io/krampexe-mothership-1e"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-green-900/30 border-2 border-green-500 text-green-400 font-orbitron font-bold text-lg clip-path-slant hover:bg-green-900/50 hover:text-white transition-all duration-300 hover:box-glow-cyan min-w-[200px] text-center"
            >
              <span className="relative z-10">GET ON ITCH.IO</span>
            </a>
            <a
              href="https://www.patreon.com/posts/kramp-exe-for-1e-144275102"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-blue-900/30 border-2 border-blue-500 text-blue-400 font-orbitron font-bold text-lg clip-path-slant hover:bg-blue-900/50 hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] min-w-[200px] text-center"
            >
              <span className="relative z-10">PATREON EXCLUSIVE</span>
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Description Section */}
      <section className="py-20 relative z-10 bg-gray-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gray-900/50 border border-red-700/50 p-8 mb-12 hud-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
              <span className="text-6xl">⚠️</span>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-6 font-orbitron text-glow">
                  St.N KRAMP — Holiday Audit in Deep Space
                </h2>
                <div className="text-lg text-gray-300 font-rajdhani leading-relaxed space-y-4">
                  <p>
                    This postcard-size one-shot drops your crew into a Christmas Eve gone catastrophically wrong.
                    The station's karma-review AI, <strong className="text-red-400 font-orbitron">St.N KRAMP</strong> (Standardized Node Karma Review
                    Automation Mobile Processor), malfunctions and starts dredging up every hidden misdeed—old or new,
                    character or player alike.
                  </p>
                  <p>
                    Chain-rattling alerts, sealed bulkheads, and festive dread tighten with each passing minute.
                    Can you cleanse your record before the system wipes you from it?
                  </p>
                  <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-950/10 my-6">
                    <p className="italic text-red-200">
                      Inside you'll find a bespoke <strong className="text-white">sin-tracking mechanic</strong> that lets the table gleefully document past
                      transgressions and watch the consequences snowball. Slip the card into a stocking, unfold at the table,
                      and survive a one-shot session of sci-fi suspense wrapped in tinsel and static.
                    </p>
                  </div>
                  <p className="text-green-400 font-bold font-orbitron tracking-wide">
                    Launching November 24, 2025—just in time to haunt your holiday schedule.
                  </p>
                </div>
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
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
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
              POSTCARD FORMAT
            </h2>
            <p className="text-gray-400 font-rajdhani text-lg">
              Unfold the horror. Perfect for stockings or last-minute gifts.
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
                {'// UNFOLD_AT_TABLE.EXE'}
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
              Stay in the Loop
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
            href="/projects"
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-orbitron transition-colors text-lg hover:text-glow"
          >
            ← Back to Projects
          </Link>
        </div>
      </section>
    </div>
  );
}
