import { Metadata } from 'next'
import Link from "next/link";
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

export const dynamic = 'error';

export default function HolidayAuditKramp() {
  // Component for section divider lights
  const SectionDivider = () => (
    <div className="section-divider">
      <div className="divider-lights">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`divider-light ${['red', 'green', 'blue', 'yellow'][i % 4]}`}></div>
        ))}
      </div>
    </div>
  );

  const features = [
    {
      name: "Bespoke Sin-Tracking Mechanic",
      description: "Document past transgressions and watch consequences snowball",
      icon: "📋"
    },
    {
      name: "Postcard-Size Format",
      description: "Perfect for slipping into stockings and unfolding at the table or send your warden",
      icon: "🎄"
    },
    {
      name: "Single Session Horror",
      description: "Sci-fi suspense wrapped in tinsel and static",
      icon: "⚡"
    },
    {
      name: "Special Christmas music.",
      description: "Sci-fi Horror Synthwave for deeper immersion",
      icon: "⛓️"
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Christmas Lights Animation */}
      <div className="christmas-lights">
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
      <div className="snow">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="snowflake">❄</div>
        ))}
      </div>

      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 md:pt-24">
        <div className="absolute inset-0 bg-black"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="text-8xl mb-6 font-nunito text-red-400">🎅</div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-nunito tracking-wider">
            HOLIDAY AUDIT
          </h1>
          <div className="text-4xl md:text-6xl font-bold text-red-400 mb-8 font-nunito">
            KRAMP.EXE
          </div>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto font-nunito">
            Christmas Eve gone catastrophically wrong in deep space
          </p>
          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
            <span className="bg-green-700 text-white px-4 py-2 font-nunito border border-green-600 christmas-badge">COMING OCTOBER 2025</span>
            <span className="bg-red-700 text-white px-4 py-2 font-nunito border border-red-600 christmas-badge">ONE-SHOT</span>
            <span className="bg-green-700 text-white px-4 py-2 font-nunito border border-green-600 christmas-badge">POSTCARD SIZE</span>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Description Section */}
      <section className="py-20 relative z-10 bg-gray-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gray-900 border border-red-700 p-8 mb-12 christmas-card">
            <h2 className="text-3xl md:text-4xl font-bold text-red-400 mb-6 font-nunito">
              St.N KRAMP — Holiday Audit in Deep Space
            </h2>
            <div className="text-lg text-gray-200 font-nunito leading-relaxed space-y-4">
              <p>
                This postcard-size one-shot drops your crew into a Christmas Eve gone catastrophically wrong. 
                The station's karma-review AI, <strong className="text-red-400">St.N KRAMP</strong> (Standardized Node Karma Review 
                Automation Mobile Processor), malfunctions and starts dredging up every hidden misdeed—old or new, 
                character or player alike.
              </p>
              <p>
                Chain-rattling alerts, sealed bulkheads, and festive dread tighten with each passing minute. 
                Can you cleanse your record before the system wipes you from it?
              </p>
              <p>
                Inside you'll find a bespoke sin-tracking mechanic that lets the table gleefully document past 
                transgressions and watch the consequences snowball. Slip the card into a stocking, unfold at the table, 
                and survive a one-shot session of sci-fi suspense wrapped in tinsel and static.
              </p>
              <p className="text-green-400 font-bold">
                Launching mid-October 2025—just in time to haunt your holiday schedule.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 border border-green-700 p-6 christmas-card">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-green-400 mb-3 font-nunito">{feature.name}</h3>
                <p className="text-gray-200 font-nunito">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Stay in the Loop Section */}
      <section className="py-20 relative z-10 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gray-900 border border-red-700 p-8 christmas-card">
            <h2 className="text-3xl md:text-4xl font-bold text-red-400 mb-8 font-nunito text-center">
              Stay in the Loop
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gray-800 border border-gray-600 hover:border-green-400 transition-colors christmas-link"
                >
                  <div className="w-8 h-8 flex-shrink-0">
                    <Image 
                      src={link.icon} 
                      alt={link.platform} 
                      width={32} 
                      height={32} 
                      className="w-full h-full object-contain filter brightness-0 invert"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-green-400 font-nunito">{link.platform}</div>
                    <div className="text-sm text-gray-200 font-nunito">{link.description}</div>
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
            className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-nunito transition-colors text-lg christmas-link"
          >
            ← Back to Projects
          </Link>
        </div>
      </section>
    </div>
  );
}
