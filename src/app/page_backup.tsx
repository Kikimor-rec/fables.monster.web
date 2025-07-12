"use client";

import Link from "next/link";
import CompactTeamMember from "@/components/CompactTeamMember";
import FadeIn from "@/components/FadeIn";
import OptimizedImage from "@/components/OptimizedImage";
import { useContent } from "@/hooks/useContent";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export default function Home() {
  const { content, loading } = useContent('site-content.json');

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  
  const teamMembers: TeamMember[] = content?.team?.members || [
    {
      name: "Stepan Kulikov",
      role: "Writer & Game Designer",
      image: "stepan-kulikov.webp"
    },
    {
      name: "Tatiana Bond", 
      role: "Layout Designer",
      image: "tanka-bond.webp"
    },
    {
      name: "Zlata Ignatova",
      role: "Artist",
      image: "zlata.webp"
    },
    {
      name: "Stanislav DariDai",
      role: "Music Composer", 
      image: "stanislav-darida.webp"
    },
    {
      name: "Allecks",
      role: "Developer",
      image: "alleks.webp"
    }
  ];
  
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <FadeIn delay={0.2}>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-6 font-mono tracking-wider">
              {content?.hero?.title || "FABLES MONSTER"}
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-mono">
              {content?.hero?.subtitle || "Independent tabletop RPG content creation studio"}
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/projects"
                className="w-full sm:w-auto bg-red-700 hover:bg-red-600 text-white px-6 sm:px-8 py-4 text-base sm:text-lg font-mono font-bold transition-colors border border-red-600 text-center"
              >
                {content?.common?.view_projects || "VIEW PROJECTS"}
              </Link>
              <Link
                href="/lost-mark"
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-6 sm:px-8 py-4 text-base sm:text-lg font-mono font-bold transition-colors text-center"
              >
                LOST MARK
              </Link>
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
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-mono">
                  {content?.about?.title || "ABOUT THE STUDIO"}
                </h2>
                <p className="text-base sm:text-lg text-gray-300 mb-6 font-mono">
                  We are a team of enthusiasts dedicated to creating immersive tabletop RPG adventures and digital experiences. 
                  Our mission is to craft projects that leave a lasting impact on players.
                </p>
                <p className="text-base sm:text-lg text-gray-300 mb-8 font-mono">
                  From Sci-Fi horror to fantasy adventures, we explore various forms of interactive entertainment, 
                  creating unique experiences for every player.
                </p>
                <Link
                  href="/about"
                  className="inline-block bg-red-700 hover:bg-red-600 text-white px-4 sm:px-6 py-3 font-mono font-bold transition-colors border border-red-600 text-sm sm:text-base"
                >
                  {content?.common?.learn_more || "MORE ABOUT US"}
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <div className="bg-gradient-to-br from-red-800 to-red-900 p-6 sm:p-8 border border-red-700">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-4 font-mono">⚡</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 font-mono">OUR PHILOSOPHY</h3>
                  <p className="text-red-100 font-mono text-sm sm:text-base">
                    {content?.about?.philosophy || "Every game is a story, every story is a world, every world is an opportunity for players to become heroes of their own adventure."}
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
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-mono">
                {content?.projects?.featured_title || "FIRST PROJECT"}
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 font-mono">
                {content?.projects?.featured_subtitle || "Our pride and most ambitious project"}
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="bg-gray-900 border border-red-700 p-4 sm:p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-mono">
                    THE LOST MARK
                  </h3>
                  <p className="text-base sm:text-lg text-gray-300 mb-6 font-mono">
                    A Sci-Fi horror adventure for Mothership RPG where your crew faces impossible choices 
                    and eldritch truths among the wrecks and cults of deep space.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-red-700 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-mono border border-red-600">MOTHERSHIP</span>
                    <span className="bg-red-700 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-mono border border-red-600">SCI-FI HORROR</span>
                    <span className="bg-red-700 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-mono border border-red-600">INVESTIGATION</span>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 text-center font-mono">
              {content?.team?.title || "THE TEAM"}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 max-w-5xl mx-auto">
              {teamMembers.map((member: TeamMember, index: number) => (
                <CompactTeamMember key={index} member={member} index={index} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-20 bg-red-900 border-t border-red-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-mono">
              {content?.common?.ready_to_explore || "READY TO EXPLORE OUR WORLDS?"}
            </h2>
            <p className="text-lg sm:text-xl text-red-100 mb-8 font-mono">
              {content?.common?.follow_projects || "Follow our projects and become part of the Fables Monster community"}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/projects"
                className="w-full sm:w-auto bg-white text-red-900 px-6 sm:px-8 py-4 text-base sm:text-lg font-mono font-bold hover:bg-gray-200 transition-colors text-center"
              >
                {content?.common?.all_projects || "ALL PROJECTS"}
              </Link>
              <a
                href="https://discord.gg/qJS4h5usxe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-900 px-6 sm:px-8 py-4 text-base sm:text-lg font-mono font-bold transition-colors text-center"
              >
                {content?.common?.join_discord || "JOIN DISCORD"}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
