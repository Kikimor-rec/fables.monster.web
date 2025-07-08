"use client";

import Link from "next/link";
import Image from "next/image";
import CompactTeamMember from "@/components/CompactTeamMember";

export default function Home() {
  const teamMembers = [
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
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-mono tracking-wider">
            FABLES MONSTER
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-mono">
            Independent tabletop RPG content creation studio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="bg-red-700 hover:bg-red-600 text-white px-8 py-4 text-lg font-mono font-bold transition-colors border border-red-600"
            >
              VIEW PROJECTS
            </Link>
            <Link
              href="/lost-mark"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-mono font-bold transition-colors"
            >
              LOST MARK
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 font-mono">
                ABOUT THE STUDIO
              </h2>
              <p className="text-lg text-gray-300 mb-6 font-mono">
                We are a team of enthusiasts dedicated to creating immersive tabletop RPG adventures and digital experiences. 
                Our mission is to craft projects that leave a lasting impact on players.
              </p>
              <p className="text-lg text-gray-300 mb-8 font-mono">
                From cosmic horror to fantasy adventures, we explore various forms of interactive entertainment, 
                creating unique experiences for every player.
              </p>
              <Link
                href="/about"
                className="inline-block bg-red-700 hover:bg-red-600 text-white px-6 py-3 font-mono font-bold transition-colors border border-red-600"
              >
                MORE ABOUT US
              </Link>
            </div>
            <div className="bg-gradient-to-br from-red-800 to-red-900 p-8 border border-red-700">
              <div className="text-center">
                <div className="text-4xl mb-4 font-mono">⚡</div>
                <h3 className="text-2xl font-bold text-white mb-4 font-mono">OUR PHILOSOPHY</h3>
                <p className="text-red-100 font-mono">
                  Every game is a story, every story is a world, every world is an opportunity 
                  for players to become heroes of their own adventure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-20 bg-black border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 font-mono">
              FIRST PROJECT
            </h2>
            <p className="text-xl text-gray-300 font-mono">
              Our pride and most ambitious project
            </p>
          </div>
          
          <div className="bg-gray-900 border border-red-700 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4 font-mono">
                  THE LOST MARK
                </h3>
                <p className="text-lg text-gray-300 mb-6 font-mono">
                  A cosmic horror adventure for Mothership RPG where your crew faces impossible choices 
                  and eldritch truths among the wrecks and cults of deep space.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-red-700 text-white px-3 py-1 text-sm font-mono border border-red-600">MOTHERSHIP</span>
                  <span className="bg-red-700 text-white px-3 py-1 text-sm font-mono border border-red-600">COSMIC HORROR</span>
                  <span className="bg-red-700 text-white px-3 py-1 text-sm font-mono border border-red-600">INVESTIGATION</span>
                </div>
                <Link
                  href="/lost-mark"
                  className="inline-block bg-red-700 hover:bg-red-600 text-white px-8 py-3 font-mono font-bold transition-colors border border-red-600"
                >
                  LEARN MORE
                </Link>
              </div>
              <div className="relative h-64 md:h-80 bg-gray-800 border border-red-700 overflow-hidden">
                <Image
                  src="/images/lost-mark/lm_promo_1.webp"
                  alt="Lost Mark"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white font-mono font-bold">
                  THE LOST MARK
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-mono">
            THE TEAM
          </h2>
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <CompactTeamMember key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-red-900 border-t border-red-700">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6 font-mono">
            READY TO EXPLORE OUR WORLDS?
          </h2>
          <p className="text-xl text-red-100 mb-8 font-mono">
            Follow our projects and become part of the Fables Monster community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="bg-white text-red-900 px-8 py-4 text-lg font-mono font-bold hover:bg-gray-200 transition-colors"
            >
              ALL PROJECTS
            </Link>
            <a
              href="https://discord.gg/qJS4h5usxe"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-900 px-8 py-4 text-lg font-mono font-bold transition-colors"
            >
              JOIN DISCORD
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
