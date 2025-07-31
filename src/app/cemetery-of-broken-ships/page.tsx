import Link from "next/link";
import Navigation from "@/components/Navigation";
import { PageSEO, AdventureJSON } from '@/components/SEO';

export const dynamic = 'error';

export default function CemeteryOfBrokenShips() {
  const ships = [
    {
      name: "The Perdition",
      type: "Mining Vessel",
      description: "A massive industrial ship that went dark while extracting valuable minerals from an asteroid field.",
      hazards: ["Structural collapse", "Toxic atmosphere", "Automated defenses"]
    },
    {
      name: "Sanctuary Station",
      type: "Research Facility",
      description: "A deep space laboratory conducting classified experiments on alien artifacts.",
      hazards: ["Containment breach", "Psychic interference", "Unknown entities"]
    },
    {
      name: "The Carrion",
      type: "Military Corvette",
      description: "A warship that suffered catastrophic damage during a classified mission.",
      hazards: ["Explosive ordnance", "Hostile AI", "Radiation exposure"]
    },
    {
      name: "Haven's Rest",
      type: "Colony Ship",
      description: "A generation ship carrying thousands of colonists to a new world, now eerily silent.",
      hazards: ["Life support failure", "Biological contamination", "Mass hysteria"]
    },
    {
      name: "The Wanderer",
      type: "Explorer Vessel",
      description: "A long-range scout ship that discovered something it shouldn't have.",
      hazards: ["Reality distortion", "Time anomalies", "Eldritch corruption"]
    }
  ];

  return (
    <>
      <PageSEO
        title="Cemetery of Broken Ships – Sci-Fi Horror Adventure"
        description="Investigate five derelict ships connected by corporate greed and cosmic dread."
        canonical="https://fables.monster/cemetery-of-broken-ships"
      />
      <AdventureJSON
        name="Cemetery of Broken Ships"
        description="Sci-Fi horror adventure featuring a graveyard of spacecraft."
        url="https://fables.monster/cemetery-of-broken-ships"
        date="2024-11-10"
        genre="Science Fiction Horror"
      />
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="text-8xl mb-6 font-nunito text-red-400">🚀</div>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-nunito tracking-wider">
            CEMETERY OF BROKEN SHIPS
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto font-nunito">
            Sci-Fi Horror Adventure. All data below is preliminary and subject to change.
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="bg-red-700 text-white px-4 py-2 font-nunito border border-red-600">IN DEVELOPMENT</span>
            <span className="bg-red-700 text-white px-4 py-2 font-nunito border border-red-600">MOTHERSHIP</span>
            <span className="bg-red-700 text-white px-4 py-2 font-nunito border border-red-600">5 SHIPS</span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 font-nunito">
                THE DEBRIS FIELD
              </h2>
              <p className="text-lg text-gray-300 mb-6 font-nunito">
                Five ships float dead in space, each telling part of a larger, more terrifying story. 
                What started as isolated incidents reveals itself as something far more sinister.
              </p>
              <p className="text-lg text-gray-300 mb-6 font-nunito">
                Use each ship as a standalone adventure, or let your players piece together 
                the mystery that connects them all. The choice is yours, but the truth 
                remains the same: some things should stay buried in the void.
              </p>
              <p className="text-lg text-gray-300 font-nunito">
                Connected by a common lore, these derelicts form a network of horror 
                that will challenge even the most experienced crews.
              </p>
            </div>
            <div className="bg-gray-800 border border-red-700 p-8">
              <div className="text-center">
                <div className="text-4xl mb-4 font-nunito text-red-400">⚠</div>
                <h3 className="text-2xl font-bold text-white mb-4 font-nunito">MODULAR DESIGN</h3>
                <p className="text-red-100 font-nunito">
                  Each ship is a complete adventure that can stand alone, 
                  but together they form an interconnected web of Sci-Fi horror 
                  and corporate conspiracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ships Section */}
      <section className="py-20 bg-black border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6 font-nunito">
              THE FIVE SHIPS
            </h2>
            <p className="text-xl text-gray-300 font-nunito">
              Each vessel holds its own secrets and horrors
            </p>
          </div>

          <div className="space-y-8">
            {ships.map((ship, index) => (
              <div key={index} className="bg-gray-900 border border-red-700 p-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-nunito">
                      {ship.name}
                    </h3>
                    <p className="text-red-400 font-nunito mb-4">{ship.type}</p>
                    <p className="text-gray-300 font-nunito">
                      {ship.description}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-lg font-bold text-white mb-3 font-nunito">PRIMARY HAZARDS</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {ship.hazards.map((hazard, hazardIndex) => (
                        <div key={hazardIndex} className="bg-red-900/30 border border-red-700 p-3">
                          <p className="text-red-200 font-nunito text-sm">{hazard}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6 font-nunito">
              WHAT&apos;S INCLUDED
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black border border-red-700 p-8">
              <div className="text-4xl mb-4 font-nunito text-red-400">📚</div>
              <h3 className="text-2xl font-bold text-white mb-4 font-nunito">
                MODULAR ADVENTURES
              </h3>
              <p className="text-gray-300 font-nunito">
                Use ships individually as one-shots or connect them for a campaign 
                revealing the larger conspiracy behind the debris field.
              </p>
            </div>
            <div className="bg-black border border-red-700 p-8">
              <div className="text-4xl mb-4 font-nunito text-red-400">🗺️</div>
              <h3 className="text-2xl font-bold text-white mb-4 font-nunito">
                DETAILED SHIP LAYOUTS
              </h3>
              <p className="text-gray-300 font-nunito">
                High-quality maps for each vessel with environmental hazards, 
                hidden areas, and tactical considerations for your crew.
              </p>
            </div>
            <div className="bg-black border border-red-700 p-8">
              <div className="text-4xl mb-4 font-nunito text-red-400">⚠</div>
              <h3 className="text-2xl font-bold text-white mb-4 font-nunito">
                ENVIRONMENTAL HAZARDS
              </h3>
              <p className="text-gray-300 font-nunito">
                Each ship presents unique dangers from structural collapse 
                to alien contamination, keeping players on edge.
              </p>
            </div>
            <div className="bg-black border border-red-700 p-8">
              <div className="text-4xl mb-4 font-nunito text-red-400">🔗</div>
              <h3 className="text-2xl font-bold text-white mb-4 font-nunito">
                CONNECTED LORE
              </h3>
              <p className="text-gray-300 font-nunito">
                Discover the overarching mystery that links all five ships 
                in a web of corporate greed and Sci-Fi horror.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Development Progress */}
      <section className="py-20 bg-black border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6 font-nunito">
              DEVELOPMENT STATUS
            </h2>
            <p className="text-xl text-gray-300 font-nunito">
              Current progress on Cemetery of Broken Ships
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-yellow-700 border border-yellow-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-nunito">📝</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-nunito">SCRIPTWRITING</h3>
              <p className="text-gray-300 font-nunito">Writing ship descriptions, encounters, and connecting lore</p>
              <div className="mt-4 bg-gray-800 border border-gray-700 p-3">
                <p className="text-yellow-400 font-nunito text-sm">IN PROGRESS</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-700 border border-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-nunito">🎲</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-nunito">PLAYTESTING</h3>
              <p className="text-gray-300 font-nunito">Testing individual ships and the connected campaign structure</p>
              <div className="mt-4 bg-gray-800 border border-gray-700 p-3">
                <p className="text-blue-400 font-nunito text-sm">IN PROGRESS</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gray-900 border border-red-700 p-6 max-w-md mx-auto">
              <h4 className="text-lg font-bold text-white mb-2 font-nunito">ESTIMATED RELEASE</h4>
              <p className="text-2xl font-bold text-red-400 mb-2 font-nunito">Q1 2026</p>
              <p className="text-gray-400 font-nunito">Following completion of playtesting phase</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-red-900 border-t border-red-700">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6 font-nunito">
            FOLLOW DEVELOPMENT
          </h2>
          <p className="text-xl text-red-100 mb-8 font-nunito">
            Stay updated on Cemetery of Broken Ships development
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/qJS4h5usxe"
              className="bg-white text-red-900 px-8 py-4 text-lg font-nunito font-bold hover:bg-gray-200 transition-colors"
            >
              JOIN DISCORD
            </a>
            <Link
              href="/projects"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-900 px-8 py-4 text-lg font-nunito font-bold transition-colors"
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
              <h3 className="text-xl font-bold text-white mb-4 font-nunito">FABLES MONSTER</h3>
              <p className="text-gray-400 font-nunito">
                Independent tabletop RPG content creation studio.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-nunito">PROJECTS</h4>
              <ul className="space-y-2">
                <li><Link href="/lost-mark" className="text-gray-400 hover:text-white transition-colors font-nunito">Lost Mark</Link></li>
                <li><Link href="/projects" className="text-gray-400 hover:text-white transition-colors font-nunito">All Projects</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-nunito">STUDIO</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors font-nunito">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors font-nunito">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-nunito">COMMUNITY</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-nunito">Discord</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-nunito">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-nunito">itch.io</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-red-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 font-nunito">
              © 2025 Fables Monster Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
