import Link from "next/link";
import Image from "next/image";
import StoreButton from "@/components/StoreButton";
import LazyMusicPlayer from "@/components/LazyMusicPlayer";
import GlitchImage from '@/components/GlitchImage';

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
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 font-mono tracking-wider">
            THE LOST MARK
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-mono">
            A science fiction horror adventure for the role-playing game Mothership RPG. Your team encounters the wreckage of the tourist yacht Silk Star, which disappeared 217 years ago.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-black/60 border border-red-700 stat-block p-2 sm:p-3">
                <div className="text-lg sm:text-2xl font-bold text-red-400 font-mono mb-1">{stat.value}</div>
                <div className="stat-block-label text-gray-300 font-mono">
                  <span className="sm:hidden">{stat.label === "System" ? "Mothership" : stat.label}</span>
                  <span className="hidden sm:inline">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <StoreButton 
              store="itch"
              href="https://fablesmonster.itch.io/"
              price="Free or PWYW"
            />
            <StoreButton 
              store="drivethrurpg"
              href="https://www.drivethrurpg.com/en/publisher/30815/Stepan%20Kulikov"
              price="Free or PWYW"
            />
          </div>
          
          {/* Terminal and Timer Access Buttons */}
          <div className="mt-6 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="inline-flex items-center gap-2 bg-gray-600 text-gray-400 font-mono font-bold px-6 py-3 rounded border-2 border-gray-500 shadow-lg cursor-not-allowed opacity-75">
                <span className="text-lg">📟</span>
                ACCESS SILK STAR TERMINAL
                <span className="text-xs bg-black/20 px-2 py-1 rounded ml-2">COMING SOON</span>
              </div>
              
              <Link 
                href="/timer"
                className="inline-flex items-center gap-2 bg-green-700 text-green-200 font-mono font-bold px-6 py-3 rounded border-2 border-green-500 shadow-lg hover:bg-green-600 hover:border-green-400 transition-all duration-200"
              >
                <span className="text-lg">⏰</span>
                CHRONOMETER TERMINAL
              </Link>
            </div>
            <p className="text-sm text-gray-400 mt-2 font-mono">
              Interactive timer available now • Terminal will be available after the release
            </p>
          </div>
        </div>
      </section>

      {/* VTT Modules Announcement */}
      <section className="py-8 border-t border-red-700 bg-gray-950/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <p className="text-gray-300 font-mono">
            We plan to release modules for popular virtual tabletops.
          </p>
          <div className="flex justify-center gap-4">
            <div className="px-4 py-2 bg-gray-600 text-gray-400 border-2 border-gray-500 rounded font-mono cursor-not-allowed opacity-75">
              Foundry VTT
            </div>
            <div className="px-4 py-2 bg-gray-600 text-gray-400 border-2 border-gray-500 rounded font-mono cursor-not-allowed opacity-75">
              Roll20
            </div>
          </div>
          <p className="text-sm text-gray-400 font-mono">
            Planned release: September 2025
          </p>
        </div>
      </section>

      {/* About Section with Ship Image */}
      <section className="py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 font-mono">
                ABOUT THE ADVENTURE
              </h2>
              <p className="text-lg text-gray-300 mb-6 font-mono">
                After making the final jump, the players' ship finds themselves in the proximity of a compact but active black hole. There are no jump cores left. All they observe is a very old hyper beacon, a cloud of debris, and the **Ship of the Lost** - a giant drifting structure assembled from dozens of other ships.
              </p>
              <p className="text-lg text-gray-300 mb-6 font-mono">
                On board lives and rots **Mark Opollo**, a pilot who was fused to the ship during a crash 217 years ago. His surviving companions have become a cult. His flesh is metal. His mind is a net.
              </p>
              <p className="text-lg text-gray-300 mb-6 font-mono">
                Hidden inside the ship is a **cryopod containing a child**, the final element for Mark's Ascension. Mark plans to transfer his consciousness into the child or someone more convenient and finally leave this place. Players will have to choose to: **stop** it... or **allow it to happen**.
              </p>
              {/* Credits */}
              <div className="bg-black border border-red-700 p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4 font-mono">CREDITS</h3>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex flex-wrap justify-between gap-x-2 gap-y-1">
                    <span className="text-gray-300">Written by:</span>
                    <span className="text-white">Stepan Kulikov</span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-2 gap-y-1">
                    <span className="text-gray-300">Layout by:</span>
                    <span className="text-white">Tatiana Bond</span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-2 gap-y-1">
                    <span className="text-gray-300">Art by:</span>
                    <span className="text-white">Zlata Ignatova</span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-2 gap-y-1">
                    <span className="text-gray-300">Music By:</span>
                    <span className="text-white">Stanislav DariDa</span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-2 gap-y-1">
                    <span className="text-gray-300">Coding by:</span>
                    <span className="text-white">Allecks</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-black border-2 border-red-700 shadow-lg mb-4 w-full max-w-[600px] overflow-hidden">
                <GlitchImage
                  src="/images/lost-mark/ship_lm.webp"
                  alt="Lost Mark Ship"
                  width={600}
                  height={400}
                  className="mx-auto"
                />
              </div>
              <div className="w-full max-w-[600px] bg-red-950/20 border-2 border-red-700 p-6">
                <div className="text-white font-mono font-bold text-xl mb-2 text-center">
                  ⚠ WARNING
                </div>
                <div className="text-gray-300 font-mono text-sm text-center">
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-8 text-center font-mono">
            INTERACTIVE TOOLS
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/60 border-2 border-gray-600 p-6 rounded opacity-60">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📟</span>
                <h3 className="text-xl font-bold text-gray-400 font-mono">
                  SILK STAR TERMINAL
                </h3>
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded font-mono">COMING SOON</span>
              </div>
              <p className="text-gray-400 font-mono text-sm mb-4">
                Access the ship's computer system and uncover the dark secrets hidden in the logs. 
                Navigate through corrupted data, system failures, and mysterious transmissions.
              </p>
            </div>
            
            <div className="bg-black/60 border-2 border-green-600 p-6 rounded">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⌛</span>
                <h3 className="text-xl font-bold text-green-400 font-mono">
                  CHRONOMETER TERMINAL
                </h3>
                <span className="text-xs bg-green-700 text-green-200 px-2 py-1 rounded font-mono">AVAILABLE NOW</span>
              </div>
              <p className="text-green-300 font-mono text-sm mb-4">
                A digital countdown timer designed for tabletop gaming sessions. 
                Perfect for time-sensitive scenarios and building tension during gameplay.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-mono">
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
                    <h3 className="text-xl font-bold text-white mb-3 font-mono">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 font-mono">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Music Player */}
      <LazyMusicPlayer />

      {/* Download Section */}
      <section className="py-20 border-t border-red-700 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl font-bold text-white mb-6 font-mono">
            READY TO EXPLORE THE LOST MARK?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-mono">
            Download now and begin your descent into Sci-Fi horror. Available on multiple platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <StoreButton 
              store="itch"
              href="https://fablesmonster.itch.io/"
              price="Free or PWYW"
            />
            <StoreButton 
              store="drivethrurpg"
              href="https://www.drivethrurpg.com/en/publisher/30815/Stepan%20Kulikov"
              price="Free or PWYW"
            />
            <Link
              href="/projects"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-mono font-bold transition-colors"
            >
              MORE PROJECTS
            </Link>
          </div>
          
          {/* License Link */}
          <div className="mt-8 pt-6 border-t border-red-700/50">
            <Link
              href="/lost-mark/license"
              className="text-gray-400 hover:text-red-400 font-mono text-sm underline transition-colors"
            >
              📄 View License Information (CC BY-NC-SA 4.0)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
