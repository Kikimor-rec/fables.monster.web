import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function HellishBureaucracy() {
  const challenges = [
    {
      name: "Infernal Paperwork",
      description: "Navigate the literal red tape of Hell's administrative system",
      difficulty: "Social"
    },
    {
      name: "Devil's Contracts",
      description: "Read the fine print and find loopholes in demonic agreements",
      difficulty: "Investigation"
    },
    {
      name: "Middle Management",
      description: "Deal with bored demons who've been doing this job for millennia",
      difficulty: "Roleplay"
    },
    {
      name: "Office Politics",
      description: "Navigate the complex hierarchy of infernal bureaucracy",
      difficulty: "Social"
    }
  ];

  const departments = [
    {
      name: "Soul Processing",
      head: "Administrator Malphas",
      description: "Where new arrivals are sorted and assigned to their eternal departments"
    },
    {
      name: "Contract Review",
      head: "Director Belphegor",
      description: "Legal department handling all mortal-demonic agreements"
    },
    {
      name: "Complaints Department",
      head: "Manager Asmodeus",
      description: "Where grievances are filed and promptly ignored"
    },
    {
      name: "Quality Assurance",
      head: "Supervisor Mammon",
      description: "Ensuring all suffering meets Hell's high standards"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="text-8xl mb-6 font-mono text-red-400">😈</div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-mono tracking-wider">
            HELLISH BUREAUCRACY
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto font-mono">
            Fantasy Adventure for D&D 5e/2024
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="bg-red-700 text-white px-4 py-2 font-mono border border-red-600">IN DEVELOPMENT</span>
            <span className="bg-red-700 text-white px-4 py-2 font-mono border border-red-600">D&D 5E/2024</span>
            <span className="bg-red-700 text-white px-4 py-2 font-mono border border-red-600">NINE HELLS</span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 font-mono">
                THE NINE HELLS OFFICE
              </h2>
              <p className="text-lg text-gray-300 mb-6 font-mono">
                Your party has been sent to the very heart of the Nine Hells with a seemingly 
                impossible task: steal a hellish contract or prove that it&apos;s invalid.
              </p>
              <p className="text-lg text-gray-300 mb-6 font-mono">
                But Hell&apos;s greatest torture isn&apos;t fire and brimstone - it&apos;s paperwork. 
                Navigate through endless bureaucratic red tape, deal with bored demons 
                who&apos;ve been doing the same job for millennia, and survive the most 
                terrifying challenge of all: middle management.
              </p>
              <p className="text-lg text-gray-300 font-mono">
                This unique blend of comedy and horror challenges players to think 
                outside the box and solve problems through wit rather than warfare.
              </p>
            </div>
            <div className="bg-gray-800 border border-red-700 p-8">
              <div className="text-center">
                <div className="text-4xl mb-4 font-mono text-red-400">📋</div>
                <h3 className="text-2xl font-bold text-white mb-4 font-mono">CREATIVE PROBLEM SOLVING</h3>
                <p className="text-red-100 font-mono">
                  Combat won&apos;t save you here. Success depends on clever thinking, 
                  social manipulation, and understanding the twisted logic of 
                  infernal bureaucracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-20 bg-black border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6 font-mono">
              INFERNAL DEPARTMENTS
            </h2>
            <p className="text-xl text-gray-300 font-mono">
              Navigate the complex hierarchy of Hell&apos;s administration
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-gray-900 border border-red-700 p-6">
                <h3 className="text-xl font-bold text-white mb-2 font-mono">
                  {dept.name}
                </h3>
                <p className="text-red-400 font-mono mb-3">{dept.head}</p>
                <p className="text-gray-300 font-mono text-sm">
                  {dept.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6 font-mono">
              INFERNAL CHALLENGES
            </h2>
            <p className="text-xl text-gray-300 font-mono">
              What your party will face in the depths of Hell&apos;s office complex
            </p>
          </div>

          <div className="space-y-6">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-black border border-red-700 p-6">
                <div className="grid md:grid-cols-4 gap-4 items-center">
                  <div>
                    <h3 className="text-lg font-bold text-white font-mono">
                      {challenge.name}
                    </h3>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-300 font-mono text-sm">
                      {challenge.description}
                    </p>
                  </div>
                  <div>
                    <span className="bg-red-700 text-white px-3 py-1 text-sm font-mono border border-red-600">
                      {challenge.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-black border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6 font-mono">
              ADVENTURE FEATURES
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 border border-red-700 p-8">
              <div className="text-4xl mb-4 font-mono text-red-400">😈</div>
              <h3 className="text-2xl font-bold text-white mb-4 font-mono">
                COMEDY HORROR TONE
              </h3>
              <p className="text-gray-300 font-mono">
                Experience the unique blend of absurd bureaucratic comedy 
                with genuine moments of infernal dread and Sci-Fi horror.
              </p>
            </div>
            <div className="bg-gray-900 border border-red-700 p-8">
              <div className="text-4xl mb-4 font-mono text-red-400">🗣️</div>
              <h3 className="text-2xl font-bold text-white mb-4 font-mono">
                SOCIAL ENCOUNTERS
              </h3>
              <p className="text-gray-300 font-mono">
                Negotiate with devils, manipulate demons, and convince middle 
                managers to bend the rules in your favor.
              </p>
            </div>
            <div className="bg-gray-900 border border-red-700 p-8">
              <div className="text-4xl mb-4 font-mono text-red-400">🧩</div>
              <h3 className="text-2xl font-bold text-white mb-4 font-mono">
                CREATIVE SOLUTIONS
              </h3>
              <p className="text-gray-300 font-mono">
                Success comes from clever thinking and creative problem-solving 
                rather than traditional combat encounters.
              </p>
            </div>
            <div className="bg-gray-900 border border-red-700 p-8">
              <div className="text-4xl mb-4 font-mono text-red-400">⚖️</div>
              <h3 className="text-2xl font-bold text-white mb-4 font-mono">
                D&D 5E/2024 COMPATIBLE
              </h3>
              <p className="text-gray-300 font-mono">
                Fully compatible with both D&D 5e and the 2024 edition rules, 
                with scaling options for different party levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Development Progress */}
      <section className="py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6 font-mono">
              DEVELOPMENT STATUS
            </h2>
            <p className="text-xl text-gray-300 font-mono">
              Current progress on Hellish Bureaucracy
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-yellow-700 border border-yellow-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-mono">📝</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-mono">SCRIPTWRITING</h3>
              <p className="text-gray-300 font-mono">Crafting unique NPCs, encounters, and the bureaucratic maze structure</p>
              <div className="mt-4 bg-gray-800 border border-gray-700 p-3">
                <p className="text-yellow-400 font-mono text-sm">IN PROGRESS</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-700 border border-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-mono">🎭</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-mono">PLAYTESTING</h3>
              <p className="text-gray-300 font-mono">Testing the balance between comedy and challenge in social encounters</p>
              <div className="mt-4 bg-gray-800 border border-gray-700 p-3">
                <p className="text-blue-400 font-mono text-sm">IN PROGRESS</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-black border border-red-700 p-6 max-w-md mx-auto">
              <h4 className="text-lg font-bold text-white mb-2 font-mono">ESTIMATED RELEASE</h4>
              <p className="text-2xl font-bold text-red-400 mb-2 font-mono">Q4 2025</p>
              <p className="text-gray-400 font-mono">After Cemetery of Broken Ships completion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-red-900 border-t border-red-700">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6 font-mono">
            ENTER THE INFERNAL OFFICE
          </h2>
          <p className="text-xl text-red-100 mb-8 font-mono">
            Follow development and be first to experience bureaucratic horror
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/fables-monster"
              className="bg-white text-red-900 px-8 py-4 text-lg font-mono font-bold hover:bg-gray-200 transition-colors"
            >
              JOIN DISCORD
            </a>
            <Link
              href="/projects"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-900 px-8 py-4 text-lg font-mono font-bold transition-colors"
            >
              ALL PROJECTS
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 font-mono">FABLES MONSTER</h3>
              <p className="text-gray-400 font-mono">
                Independent tabletop RPG content creation studio.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-mono">PROJECTS</h4>
              <ul className="space-y-2">
                <li><Link href="/lost-mark" className="text-gray-400 hover:text-white transition-colors font-mono">Lost Mark</Link></li>
                <li><Link href="/projects" className="text-gray-400 hover:text-white transition-colors font-mono">All Projects</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-mono">STUDIO</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors font-mono">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors font-mono">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-mono">COMMUNITY</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-mono">Discord</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-mono">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-mono">itch.io</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-red-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 font-mono">
              © 2025 Fables Monster Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
