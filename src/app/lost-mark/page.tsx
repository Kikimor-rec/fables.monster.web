import Link from "next/link";
import Image from "next/image";
import StoreButton from "@/components/StoreButton";
import LazyMusicPlayer from "@/components/LazyMusicPlayer";

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
      title: "Atmospheric Storytelling",
      description: "Rich narrative that builds tension through environmental storytelling and gradual revelation.",
      icon: "📖"
    },
    {
      title: "Moral Complexity",
      description: "Face impossible choices that challenge your crew's sanity and humanity in the depths of space.",
      icon: "🎭"
    }
  ];

  const stats = [
    { label: "Pages", value: "2" },
    { label: "Players", value: "3-5" },
    { label: "Hours", value: "3-5" },
    { label: "System", value: "Mothership RPG 1E" }
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
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-mono tracking-wider">
            THE LOST MARK
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-mono">
            A Sci-Fi horror adventure for Mothership RPG. Your crew faces impossible choices and eldritch truths among the wrecks and cults of deep space.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-black/60 border border-red-700 p-4 text-center">
                <div className="text-2xl font-bold text-red-400 font-mono">{stat.value}</div>
                <div className="text-sm text-gray-300 font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <StoreButton 
              store="itch"
              href="https://fablesmonster.itch.io/"
              price="Free"
            />
            <StoreButton 
              store="drivethrurpg"
              href="https://www.drivethrurpg.com/en/publisher/30815/Stepan%20Kulikov"
              price="$5"
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
              Interactive timer available now • Terminal coming soon
            </p>
          </div>
        </div>
      </section>

      {/* About Section with Ship Image */}
      <section className="py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 font-mono">
                ABOUT THE ADVENTURE
              </h2>
              <p className="text-lg text-gray-300 mb-6 font-mono">
                When your crew receives a distress signal from the research vessel &ldquo;Lost Mark,&rdquo; 
                you&apos;re thrust into a nightmare that challenges your sanity and survival instincts.
              </p>
              <p className="text-lg text-gray-300 mb-6 font-mono">
                This two-page Sci-Fi horror adventure module emphasizes investigation, atmosphere, 
                and psychological tension. Perfect for crews who want to explore the darker corners 
                of space and face the unknown.
              </p>
              
              {/* Credits */}
              <div className="bg-black border border-red-700 p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4 font-mono">CREDITS</h3>
                <div className="space-y-2 text-sm font-mono">
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
                    <span className="text-white">Zlata (jamakuci) Ignatova</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="relative">
                <Image
                  src="/images/lost-mark/ship_lm.webp"
                  alt="Lost Mark Ship"
                  width={500}
                  height={333}
                  className="mx-auto"
                  style={{ width: 'auto', height: 'auto' }}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-red-700/10 border-2 border-red-700"></div>
              </div>
              <div className="mt-6 bg-red-950/20 border-2 border-red-700 p-6">
                <div className="text-white font-mono font-bold text-xl mb-2">
                  ⚠ WARNING
                </div>
                <div className="text-gray-300 font-mono text-sm">
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
              <ul className="text-gray-500 font-mono text-xs space-y-1">
                <li>• Ship system logs and diagnostics</li>
                <li>• Crew manifest and personnel records</li>
                <li>• Life support system monitoring</li>
                <li>• Corrupted data recovery attempts</li>
              </ul>
            </div>
            
            <div className="bg-black/60 border-2 border-green-600 p-6 rounded">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⏰</span>
                <h3 className="text-xl font-bold text-green-400 font-mono">
                  CHRONOMETER TERMINAL
                </h3>
                <span className="text-xs bg-green-700 text-green-200 px-2 py-1 rounded font-mono">AVAILABLE NOW</span>
              </div>
              <p className="text-green-300 font-mono text-sm mb-4">
                A digital countdown timer designed for tabletop gaming sessions. 
                Perfect for time-sensitive scenarios and building tension during gameplay.
              </p>
              <ul className="text-green-500 font-mono text-xs space-y-1">
                <li>• Customizable countdown timer</li>
                <li>• Hours, minutes, and seconds precision</li>
                <li>• Pause and resume functionality</li>
                <li>• Terminal-style visual interface</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
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

      {/* What's Inside */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-mono">
            WHAT&apos;S INSIDE
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black border border-red-700 p-6">
              <h3 className="text-xl font-bold text-white mb-4 font-mono">
                📋 INVESTIGATION
              </h3>
              <ul className="space-y-2 text-gray-300 font-mono text-sm">
                <li>• Detailed ship layouts and maps</li>
                <li>• Clues and evidence system</li>
                <li>• Multiple investigation paths</li>
                <li>• Environmental storytelling</li>
              </ul>
            </div>
            
            <div className="bg-black border border-red-700 p-6">
              <h3 className="text-xl font-bold text-white mb-4 font-mono">
                🎭 CHARACTERS
              </h3>
              <ul className="space-y-2 text-gray-300 font-mono text-sm">
                <li>• Memorable NPCs with motives</li>
                <li>• Crew member backgrounds</li>
                <li>• Moral dilemmas and choices</li>
                <li>• Character development hooks</li>
              </ul>
            </div>
            
            <div className="bg-black border border-red-700 p-6">
              <h3 className="text-xl font-bold text-white mb-4 font-mono">
                🚀 MECHANICS
              </h3>
              <ul className="space-y-2 text-gray-300 font-mono text-sm">
                <li>• Stress and panic mechanics</li>
                <li>• Custom horror encounters</li>
                <li>• Equipment and technology</li>
                <li>• Survival challenges</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Music Player */}
      <LazyMusicPlayer />

      {/* Download Section */}
      <section className="py-20 border-t border-red-700 text-center">
        <div className="max-w-7xl mx-auto px-6">
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
              price="Free"
            />
            <StoreButton 
              store="drivethrurpg"
              href="https://www.drivethrurpg.com/en/publisher/30815/Stepan%20Kulikov"
              price="$5"
            />
            <Link
              href="/projects"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-mono font-bold transition-colors"
            >
              MORE PROJECTS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
