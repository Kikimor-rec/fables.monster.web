import { Metadata } from 'next'
import Link from "next/link";
import CompactTeamMember from "@/components/CompactTeamMember";
import FadeIn from "@/components/FadeIn";
import OptimizedImage from "@/components/OptimizedImage";
import Image from "next/image";
import siteContent from "../../public/content/site-content.json";

import { teamMembers } from "@/data/team";

type SiteContent = {
  team?: { members?: typeof teamMembers };
};

export const metadata: Metadata = {
  title: 'Fables Monster Studio - Independent Tabletop RPG Creators',
  description: 'Create unforgettable tabletop RPG experiences with Fables Monster Studio. Specializing in horror, sci-fi, and supernatural adventures for Mothership RPG, D&D, and more.',
  keywords: 'tabletop RPG, horror RPG, Mothership RPG, indie games, D&D adventures, cosmic horror, sci-fi RPG, supernatural adventures',
  openGraph: {
    title: 'Fables Monster Studio - Where Nightmares Become Adventures',
    description: 'Independent creators of award-winning tabletop RPG content. From cosmic horror to supernatural mysteries, we bring your darkest gaming fantasies to life.',
    url: 'https://fables.monster',
    siteName: 'Fables Monster Studio',
    images: [
      {
        url: 'https://fables.monster/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Fables Monster Studio - Tabletop RPG Creators',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fables Monster Studio - Where Nightmares Become Adventures',
    description: 'Independent creators of award-winning tabletop RPG content.',
    images: ['https://fables.monster/og-home.jpg'],
  },
  alternates: {
    canonical: 'https://fables.monster',
  },
}

export const dynamic = 'error';


interface TeamMember {
  name: string;
  role: string;
  image: string;
  status?: string;
  bio?: string;
  portfolio?: string;
}

export default function Home() {
  // const content = siteContent as SiteContent; // Deprecated
  // const teamMembers: TeamMember[] = content.team?.members ?? []; // Deprecated
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-20 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-red-950/20"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <FadeIn delay={0.2}>
            <div className="flex flex-col items-center justify-center mb-6 group">
              <div className="relative">
                <Image
                  src="/logos/mascot_white.PNG"
                  alt="Fables Monster Mascot"
                  width={320}
                  height={320}
                  className="w-[320px] max-w-full mb-4 mt-16 sm:mt-0 relative z-10 logo-glitch"
                  priority
                />
              </div>
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white font-orbitron tracking-wider text-glow-lg glitch-text" data-text="FABLES MONSTER">
                FABLES MONSTER
              </h1>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-lg sm:text-xl md:text-2xl text-cyan-400 mb-8 max-w-3xl mx-auto font-rajdhani tracking-widest uppercase border-b border-cyan-900/50 pb-4 inline-block">
              Independent tabletop RPG content creation studio
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/projects"
                className="w-full sm:w-auto bg-red-700 hover:bg-red-600 text-white px-8 py-4 text-lg font-orbitron font-bold transition-all border border-red-500 hover:box-glow clip-path-slant"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
              >
                VIEW PROJECTS
              </Link>
              <Link
                href="/lost-mark"
                className="w-full sm:w-auto bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 px-8 py-4 text-lg font-orbitron font-bold transition-all hover:text-white hover:box-glow-cyan"
                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
              >
                LOST MARK
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Holiday Special Project - Moved Up */}
      <section className="py-12 sm:py-20 bg-black border-y border-green-900/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-black to-black"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-12">
              <Link href="/holiday-audit-kramp" className="group block">
                <div className="relative w-32 h-32 mx-auto mb-6 transition-transform group-hover:scale-110 duration-300">
                  <Image
                    src="/images/kramp/small kramp.png"
                    alt="St.N KRAMP"
                    fill
                    className="object-contain filter invert drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-orbitron text-glow group-hover:text-red-400 transition-colors">
                  COMING NOVEMBER 24TH
                </h2>
                <p className="text-lg sm:text-xl text-green-400 font-rajdhani uppercase tracking-widest group-hover:text-green-300 transition-colors">
                  A festive horror one-shot for your holiday table
                </p>
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="hud-border p-6 sm:p-8 max-w-4xl mx-auto bg-black/80 backdrop-blur-sm">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-red-500 mb-4 font-orbitron glitch-text" data-text="HOLIDAY AUDIT: KRAMP.EXE">
                  HOLIDAY AUDIT: KRAMP.EXE
                </h3>
                <p className="text-gray-300 mb-6 font-rajdhani text-lg leading-relaxed">
                  Christmas Eve gone catastrophically wrong in deep space. The station's karma-review AI,
                  <span className="text-red-500 font-bold"> St.N KRAMP</span>, malfunctions and starts dredging up every hidden misdeed.
                  Can you cleanse your record before the system wipes you from it?
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <span className="bg-green-900/50 text-green-400 border border-green-500 px-3 py-1 text-sm font-orbitron">POSTCARD SIZE</span>
                  <span className="bg-red-900/50 text-red-400 border border-red-500 px-3 py-1 text-sm font-orbitron">ONE-SHOT</span>
                </div>
                <Link
                  href="/holiday-audit-kramp"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-orbitron font-bold transition-all hover:box-glow"
                  style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                >
                  INITIATE PROTOCOL
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <FadeIn>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-nunito">
                  ABOUT THE STUDIO
                </h2>
                <p className="text-base sm:text-lg text-gray-300 mb-6 font-nunito">
                  We are a team of enthusiasts dedicated to creating immersive tabletop RPG adventures and digital experiences. Our mission is to craft projects that leave a lasting impact on players.
                </p>
                <p className="text-base sm:text-lg text-gray-300 mb-8 font-nunito">
                  From Sci-Fi horror to fantasy adventures, we explore various forms of interactive entertainment, creating unique experiences for every player.
                </p>
                <Link
                  href="/about"
                  className="inline-block bg-red-700 hover:bg-red-600 text-white px-4 sm:px-6 py-3 font-mono font-bold transition-colors border border-red-600 text-sm sm:text-base"
                >
                  MORE ABOUT US
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <div className="bg-gradient-to-br from-red-800 to-red-900 p-6 sm:p-8 border border-red-700">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-4 font-mono">⚡</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 font-nunito">
                    OUR PHILOSOPHY
                  </h3>
                  <p className="text-red-100 font-mono text-sm sm:text-base">
                    Every game is a story, every story is a world, every world is an opportunity for players to become heroes of their own adventure.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-12 sm:py-20 bg-black border-t border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-nunito">
                FIRST PROJECT
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 font-nunito">
                Our pride and most ambitious project
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-gray-900 border border-red-700 p-4 sm:p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-nunito">
                    THE LOST MARK
                  </h3>
                  <p className="text-base sm:text-lg text-gray-300 mb-6 font-nunito">
                    A Sci-Fi horror adventure for Mothership RPG where your crew faces impossible choices and eldritch truths among the wrecks and cults of deep space.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-red-700 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-nunito border border-red-600">
                      MOTHERSHIP
                    </span>
                    <span className="bg-red-700 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-nunito border border-red-600">
                      SCI-FI HORROR
                    </span>
                    <span className="bg-red-700 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-nunito border border-red-600">
                      INVESTIGATION
                    </span>
                  </div>
                  <Link
                    href="/lost-mark"
                    className="inline-block bg-red-700 hover:bg-red-600 text-white px-6 sm:px-8 py-3 font-mono font-bold transition-colors border border-red-600 text-sm sm:text-base"
                  >
                    LEARN MORE
                  </Link>
                </div>
                <div className="relative h-48 sm:h-64 md:h-80 bg-gray-800 border border-red-700 overflow-hidden">
                  <OptimizedImage
                    src="/images/lost-mark/lm_promo_1.webp"
                    alt="Lost Mark"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="opacity-80"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white font-mono font-bold text-sm sm:text-base">
                    THE LOST MARK
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>



      {/* Team Section */}
      <section className="py-12 sm:py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 text-center font-nunito">
              THE TEAM
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                  <CompactTeamMember member={member} />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section >

      {/* Call to Action */}
      < section className="py-12 sm:py-20 bg-red-900 border-t border-red-700" >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-nunito">
              READY TO EXPLORE OUR WORLDS?
            </h2>
            <p className="text-lg sm:text-xl text-red-100 mb-8 font-nunito">
              Follow our projects and become part of the Fables Monster community
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/projects"
                className="w-full sm:w-auto bg-white text-red-900 px-6 sm:px-8 py-4 text-base sm:text-lg font-nunito font-bold hover:bg-gray-200 transition-colors text-center"
              >
                ALL PROJECTS
              </Link>
              <a
                href="https://discord.gg/qJS4h5usxe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-900 px-6 sm:px-8 py-4 text-base sm:text-lg font-nunito font-bold transition-colors text-center"
              >
                JOIN DISCORD
              </a>
            </div>
          </FadeIn>
        </div>
      </section >
    </div >
  );
}
