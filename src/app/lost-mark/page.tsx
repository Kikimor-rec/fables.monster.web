import Link from "next/link";
import Image from "next/image";
import StoreButton from "@/components/StoreButton";
import LazyMusicPlayer from "@/components/LazyMusicPlayer";
import CSSGlitchImage from '@/components/CSSGlitchImage';
import { PageSEO, AdventureJSON } from '@/components/SEO';

export const dynamic = 'force-static';

export default function LostMark() {
  const features = [
    {
      title: "Sci-Fi Horror Investigation",
      description: "Uncover the dark secrets of the research vessel Lost Mark through careful investigation and psychological tension.",
      icon: "🔍"
    },
    {
      title: "Mothership System",
      description: "Designed specifically for the Mothership RPG system, emphasizing survival horror and stress mechanics.",
      icon: "⚠️"
    },
    {
      title: "Handouts and art assets (in progress)",
      description: "All what you need to run the game smoothly, including maps, character sheets, and visual art.",
      icon: "📖"
    },
    {
      title: "VTT Assets (in progress)",
      description: "Tokens, maps, and other assets for virtual tabletops to enhance your online gaming experience. Foundry VTT and Roll20 play-ready modules.",
      icon: "💻"
    }
  ];

  const stats = [
    { label: "Pages", value: "2" },
    { label: "Players", value: "3-5" },
    { label: "Hours", value: "3-4" },
    { label: "System", value: "Mothership 1E"}
  ];

  return (
    <>
      <PageSEO
        title="The Lost Mark – Sci-Fi Horror TTRPG Module for Mothership 1E"
        description="Free 2-page sci-fi horror adventure for Mothership 1E. 3-5 players, 3-4 hours, eldritch mystery and a stranded cult."
        canonical="https://fables.monster/lost-mark"
      />
      <AdventureJSON
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
            alt="Lost Mark Promo"
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
            quality={85}
          />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-6 font-nunito tracking-wider mt-8">
            THE LOST MARK
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-nunito">
            A science fiction horror adventure for the role-playing game Mothership RPG. Your team encounters the wreckage of the tourist yacht Silk Star, which disappeared 217 years ago.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-black/60 border border-red-700 stat-block p-2 sm:p-3">
              <div className="text-lg sm:text-2xl font-bold text-red-400 font-nunito mb-1">{stat.value}</div>
              <div className="stat-block-label text-gray-300 font-nunito">
                  <span className="sm:hidden">{stat.label === "System" ? "Mothership" : stat.label}</span>
                  <span className="hidden sm:inline">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <StoreButton
              store="itch"
              href="https://fablesmonster.itch.io/lost-mark"
              price="Free or PWYW"
            />
            <StoreButton
              store="drivethrurpg"
              href="https://www.drivethrurpg.com/en/product/530242?affiliate_id=2863466"
              price="Free or PWYW"
            />
          </div>
          
          {/* Terminal and Timer Access Buttons */}
          <div className="mt-6 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/lost-mark/terminal"
                className="inline-flex items-center gap-2 bg-green-700 text-green-200 font-nunito font-bold px-6 py-3 rounded border-2 border-green-500 shadow-lg hover:bg-green-600 hover:border-green-400 transition-all duration-200"
              >
                <span className="text-lg">📟</span>
                ACCESS SILK STAR TERMINAL
              </Link>
              
              <Link 
                href="/timer"
                className="inline-flex items-center gap-2 bg-green-700 text-green-200 font-nunito font-bold px-6 py-3 rounded border-2 border-green-500 shadow-lg hover:bg-green-600 hover:border-green-400 transition-all duration-200"
              >
                <span className="text-lg">⏰</span>
                CHRONOMETER TERMINAL
              </Link>
            </div>
              <p className="text-sm text-gray-400 mt-2 font-nunito">
              Interactive timer and terminal available now
            </p>
          </div>
        </div>
      </section>

      {/* VTT Modules Announcement */}
      <section className="py-8 border-t border-red-700 bg-gray-950/50">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
            <p className="text-gray-300 font-nunito">
            We have a plan to release modules for popular virtual tabletops.
          </p>
          <div className="flex justify-center gap-4">
            <div className="px-4 py-2 bg-gray-600 text-gray-400 border-2 border-gray-500 rounded font-nunito cursor-not-allowed opacity-75">
              Foundry VTT
            </div>
            <div className="px-4 py-2 bg-gray-600 text-gray-400 border-2 border-gray-500 rounded font-nunito cursor-not-allowed opacity-75">
              Roll20
            </div>
          </div>
          <p className="text-sm text-gray-400 font-nunito">
            Planned release: September 2025
          </p>
        </div>
      </section>

      {/* About Section with Ship Image */}
      <section className="py-10 sm:py-16 md:py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 font-nunito">
                ABOUT THE ADVENTURE
              </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 font-nunito">
                After making the final jump, the players' ship finds themselves in the proximity of a compact but active black hole. There are no jump cores left. All they observe is a very old hyper beacon, a cloud of debris, and the **Ship of the Lost** - a giant drifting structure assembled from dozens of other ships.
              </p>
          <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 font-nunito">
                On board lives and rots **Mark Opollo**, a pilot who was fused to the ship during a crash 217 years ago. His surviving companions have become a cult. His flesh is metal. His mind is a net.
              </p>
          <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 font-nunito">
                Hidden inside the ship is a **cryopod containing a child**, the final element for Mark's Ascension. Mark plans to transfer his consciousness into the child or someone more convenient and finally leave this place. Players will have to choose to: **stop** it... or **allow it to happen**.
              </p>
              {/* Credits */}
              <div className="bg-black border border-red-700 p-4 sm:p-6 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-4 font-nunito">CREDITS</h3>
                <div className="space-y-2 text-xs sm:text-sm font-nunito">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Written by:</span>
                    <span className="text-white">Stepan Kulikov</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Layout by:</span>
                    <span className="text-white">Tatiana Bond</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Art by:</span>
                    <span className="text-white">Zlata Ignatova</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Music By:</span>
                    <span className="text-white">Stanislav DariDai</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Coding by:</span>
                    <span className="text-white">Allecks</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center w-full">
              <div className="bg-black border-2 border-red-700 shadow-lg mb-4 w-full aspect-[3/2] mx-auto overflow-hidden">
                <CSSGlitchImage
                  src="/images/lost-mark/ship_lm.webp"
                  alt="Lost Mark Ship"
                  width={600}
                  height={400}
                  quality={85}
                  className="w-full h-full"
                  theme="horror"
                />
              </div>
              <div className="w-full max-w-full sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] bg-red-950/20 border-2 border-red-700 p-4 sm:p-6">
                <div className="text-white font-nunito font-bold text-lg sm:text-xl mb-2 text-center">
                  ⚠ WARNING
                </div>
                <div className="text-gray-300 font-nunito text-xs sm:text-sm text-center">
                  This adventure contains Sci-Fi horror themes, body horror, and psychological stress. 
                  Player discretion advised.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-16 border-t border-red-700 bg-gray-950/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8 text-center font-nunito">
            INTERACTIVE TOOLS
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link
              href="/lost-mark/terminal"
              className="bg-black/60 border-2 border-green-500 p-6 rounded hover:bg-white/10 transition-all duration-200 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📟</span>
                <h3 className="text-xl font-bold text-white font-nunito">
                  SILK STAR TERMINAL
                </h3>
                <span className="text-xs bg-green-700 text-white px-2 py-1 rounded font-nunito">AVAILABLE NOW</span>

              </div>
              <p className="text-white font-nunito text-sm mb-4">
                Access the ship's computer system and uncover the dark secrets hidden in the logs.
                Navigate through corrupted data, system failures, and mysterious transmissions.
              </p>
            </Link>
             <Link
              href="/timer"
              className="bg-black/60 border-2 border-green-500 p-6 rounded hover:bg-white/10 transition-all duration-200 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3l">⌛</span>
                <h3 className="text-xl font-bold text-white font-nunito">
                  CHRONOMETER TERMINAL
                </h3>
                <span className="text-xs bg-green-700 text-white px-2 py-1 rounded font-nunito">AVAILABLE NOW</span>
              </div>
              <p className="text-white font-nunito text-sm mb-4">
                A digital countdown timer designed for tabletop gaming sessions. 
                Perfect for time-sensitive scenarios and building tension during gameplay.
              </p>
              </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-nunito">
            KEY FEATURES
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-900 border border-red-700 p-6 hover:bg-red-950/20 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div>
                      <h3 className="text-xl font-bold text-white mb-3 font-nunito">
                      {feature.title}
                    </h3>
                      <p className="text-gray-300 font-nunito">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audio Section */}
      <section className="py-20 border-t border-red-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-nunito">
            🎵 ATMOSPHERIC SOUNDTRACK
          </h2>
          
          {/* Streaming Service Link */}
          <div className="py-6 mb-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4 font-nunito">Use Your Favorite Streaming Service</h3>
            <p className="text-gray-300 font-nunito mb-6 max-w-2xl mx-auto">
              Access the full soundtrack on any platform you prefer for convenient listening during your game sessions.
            </p>
            <a 
              href="https://distrokid.com/hyperfollow/fablesmonsters/lost-mark-original-soundtrack" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-red-700 hover:bg-red-600 text-white font-nunito font-bold py-3 px-6 rounded border-2 border-red-600 transition-colors mb-3"
            >
              Listen on Streaming Services
            </a>
          </div>

          {/* YouTube Playlist */}
          <div className="mb-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 text-center font-nunito">YouTube Playlist</h3>
            <p className="text-gray-300 font-nunito mb-6 max-w-2xl mx-auto text-center">
              Watch and listen to the complete soundtrack on YouTube with our dedicated playlist.
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
            <h3 className="text-2xl font-bold text-white mb-4 text-center font-nunito">Website Player</h3>
            <p className="text-gray-300 font-nunito mb-6 max-w-2xl mx-auto text-center">
              Use our embedded player to enjoy the full soundtrack directly on our website with all 11 tracks.
            </p>
            <LazyMusicPlayer />
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-red-700 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-6 font-nunito">
            READY TO EXPLORE THE LOST MARK?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-nunito">
            Download now and begin your descent into Sci-Fi horror. Available on multiple platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <StoreButton
              store="itch"
              href="https://fablesmonster.itch.io/lost-mark"
              price="Free or PWYW"
            />
            <StoreButton
              store="drivethrurpg"
              href="https://www.drivethrurpg.com/en/product/530242?affiliate_id=2863466"
              price="Free or PWYW"
            />
            <Link
              href="/projects"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-nunito font-bold transition-colors"
            >
              MORE PROJECTS
            </Link>
          </div>
          
          {/* License Link */}
          <div className="mt-8 pt-6 border-t border-red-700/50">
            <Link
              href="/lost-mark/license"
              className="text-gray-400 hover:text-red-400 font-nunito text-sm underline transition-colors"
            >
              📄 View License Information (CC BY-NC-SA 4.0)
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
