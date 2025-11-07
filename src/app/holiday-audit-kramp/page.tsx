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
      name: "Misdemeanor Mechanics",
      description: "Track violations and sins as KRAMP judges the crew",
      icon: "📋"
    },
    {
      name: "Postcard Format",
      description: "Compact design for easy storage and quick reference",
      icon: "🎄"
    },
    {
      name: "Flexible Setting",
      description: "Runs on any ship or station - minimal prep required",
      icon: "�"
    },
    {
      name: "Dark Comedy Horror",
      description: "Blend of parody, paranoia, and social satire",
      icon: "�"
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
            A festive audit gone wrong. Black comedy × paranoia × moral "compliance."
          </p>
          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
            <span className="bg-green-700 text-white px-4 py-2 font-nunito border border-green-600 christmas-badge text-sm">COMING SOON</span>
            <span className="bg-red-700 text-white px-4 py-2 font-nunito border border-red-600 christmas-badge text-sm">3-4 HOURS</span>
            <span className="bg-green-700 text-white px-4 py-2 font-nunito border border-green-600 christmas-badge text-sm">4-6 PLAYERS</span>
            <span className="bg-red-700 text-white px-4 py-2 font-nunito border border-red-600 christmas-badge text-sm">MINIMAL PREP</span>
            <span className="bg-green-700 text-white px-4 py-2 font-nunito border border-green-600 christmas-badge text-sm">POSTCARD FORMAT</span>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Description Section */}
      <section className="py-20 relative z-10 bg-gray-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gray-900 border border-red-700 p-8 mb-12 christmas-card">
            <h2 className="text-3xl md:text-4xl font-bold text-red-400 mb-6 font-nunito">
              St.N KRAMP — Holiday Audit Gone Wrong
            </h2>
            <div className="text-lg text-gray-200 font-nunito leading-relaxed space-y-4">
              <p>
                The festive season is imminent at the corporate station. The station's AI, <strong className="text-red-400">St.N KRAMP</strong> (Standardized Node 
                Karma Review Automation Mobile Processor), has been updated for the festive season and is assessing 
                the 'moral climate' of the crew.
              </p>
              <p>
                However, as often happens, something went wrong. The system has started to hunt down those who 
                violate corporate values, turning the holiday week into a brutal audit. Here, each player pays 
                for their own (or others') 'sins'. It's also an excellent opportunity to remind the characters 
                of their misbehaviors.
              </p>
              <p>
                This provides an ideal scenario for a session incorporating elements of <strong className="text-green-400">parody, 
                dark humor, social satire and frightening moments</strong>.
              </p>
              <p className="text-green-400 font-bold">
                Coming soon—just in time to haunt your holiday schedule.
              </p>
            </div>
          </div>

          {/* What's Inside */}
          <div className="bg-gray-900 border border-red-700 p-8 mb-12 christmas-card">
            <h2 className="text-3xl md:text-4xl font-bold text-red-400 mb-6 font-nunito text-center">
              What Makes It Special
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 border border-green-700/50 p-6 rounded">
                <h3 className="text-xl font-bold text-green-400 mb-3 font-nunito">📋 Misdemeanor Tracking System</h3>
                <p className="text-gray-200 font-nunito text-sm">
                  Special mechanics for tracking violations and misdemeanors. Every sin, every mistake gets catalogued 
                  by KRAMP, building tension as consequences pile up.
                </p>
              </div>
              <div className="bg-gray-800 border border-green-700/50 p-6 rounded">
                <h3 className="text-xl font-bold text-green-400 mb-3 font-nunito">⏱️ Pacing Structure</h3>
                <p className="text-gray-200 font-nunito text-sm">
                  Built-in structure for better tempo control. Keep the session moving smoothly through escalating 
                  paranoia and moral compliance checks.
                </p>
              </div>
              <div className="bg-gray-800 border border-green-700/50 p-6 rounded">
                <h3 className="text-xl font-bold text-green-400 mb-3 font-nunito">🎄 Runs Anywhere</h3>
                <p className="text-gray-200 font-nunito text-sm">
                  Works on any ship or station in your campaign. Drop it into your existing setting—no special 
                  preparation needed.
                </p>
              </div>
              <div className="bg-gray-800 border border-green-700/50 p-6 rounded">
                <h3 className="text-xl font-bold text-green-400 mb-3 font-nunito">📦 Extra Tables & Tools</h3>
                <p className="text-gray-200 font-nunito text-sm">
                  Dedicated online tables with KRAMP messages, random encounters, and more. Available at release 
                  for easy reference during play.
                </p>
              </div>
            </div>
            
            {/* Coming Soon Button */}
            <div className="mt-8 text-center">
              <button 
                disabled
                className="px-8 py-3 bg-gray-700 text-gray-400 font-bold font-nunito border-2 border-gray-600 cursor-not-allowed opacity-50"
              >
                Online Tables - Coming at Release
              </button>
              <p className="text-gray-500 text-sm mt-2 font-nunito">KRAMP messages, encounters, and reference tables will be available here</p>
            </div>
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
