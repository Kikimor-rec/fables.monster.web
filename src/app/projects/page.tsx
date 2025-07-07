import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";

export default function Projects() {
  const projects = [
    {
      id: "lost-mark",
      title: "The Lost Mark",
      description: "A Sci-Fi horror adventure for Mothership RPG. Your crew faces impossible choices and eldritch truths among the wrecks and cults of deep space.",
      status: "Available Now",
      tags: ["Mothership", "Sci-Fi Horror", "Investigation"],
      icon: "⚠",
      featured: true,
      progress: "Released"
    },
    {
      id: "cemetery-of-broken-ships",
      title: "Cemetery of Broken Ships",
      description: "Sci-Fi Horror for the Mothership system. 5 ships to explore, connected by a common lore. Use each ship separately or let players solve the mystery of the debris field.",
      status: "In Development",
      tags: ["Mothership", "Sci-Fi Horror", "5 Ships", "Connected Lore"],
      icon: "🚀",
      progress: "Scriptwriting & Playtesting"
    },
    {
      id: "hellish-bureaucracy",
      title: "Hellish Bureaucracy",
      description: "Fantasy Adventure for D&D 5e/2024. Send the players' characters to the very heart of the Seven Hells with the task of stealing a hellish contract or trying to prove that the contract is invalid.",
      status: "In Development",
      tags: ["D&D 5e 2014/2024", "Fantasy", "Seven Hells", "Social Encounters"],
      icon: "😈",
      progress: "Scriptwriting & Playtesting"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available Now":
        return "bg-green-700 border-green-600";
      case "In Development":
        return "bg-red-700 border-red-600";
      case "Early Access":
        return "bg-yellow-700 border-yellow-600";
      case "Prototype":
        return "bg-orange-700 border-orange-600";
      case "Concept":
        return "bg-gray-700 border-gray-600";
      default:
        return "bg-gray-700 border-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Header */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-mono tracking-wider">
            OUR PROJECTS
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono">
            Tabletop RPG adventures crafted with attention to detail and immersive storytelling
          </p>
        </div>
      </section>

      {/* Featured Project */}
      {projects.filter(p => p.featured).map((project) => (
        <section key={project.id} className="py-20 bg-gray-900 border-t border-red-700">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 font-mono">
                ⚠ FLAGSHIP PROJECT
              </h2>
            </div>
            
            <div className="bg-black border border-red-700 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-3 py-1 text-sm text-white font-mono border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-4 font-mono">
                    {project.title}
                  </h3>
                  <p className="text-lg text-gray-300 mb-6 font-mono">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-red-700 text-white px-3 py-1 text-sm font-mono border border-red-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/${project.id}`}
                    className="inline-block bg-red-700 hover:bg-red-600 text-white px-8 py-3 font-mono font-bold transition-colors border border-red-600"
                  >
                    LEARN MORE
                  </Link>
                </div>
                <div className="relative h-64 md:h-80 bg-gray-800 border border-red-700 overflow-hidden">
                  {project.id === 'lost-mark' ? (
                    <>
                      <Image
                        src="/images/lost-mark/lm_promo_1.webp"
                        alt={project.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white font-mono font-bold">
                        {project.title}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-8xl font-mono text-red-400 flex items-center justify-center h-full">{project.icon}</div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* All Projects Grid */}
      <section className="py-20 bg-black border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 font-mono">
              ALL PROJECTS
            </h2>
            <p className="text-xl text-gray-300 font-mono">
              Complete collection of our tabletop RPG content
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-900 border border-red-700 p-6 hover:bg-gray-800 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl font-mono text-red-400">{project.icon}</div>
                  <span className={`px-3 py-1 text-sm text-white font-mono border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 font-mono">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-4 text-sm font-mono">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="bg-red-800 text-red-200 px-2 py-1 text-xs font-mono border border-red-700">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 2 && (
                    <span className="bg-gray-700 text-gray-300 px-2 py-1 text-xs font-mono border border-gray-600">
                      +{project.tags.length - 2}
                    </span>
                  )}
                </div>

                {project.progress && (
                  <div className="mb-4 p-2 bg-gray-800 border border-gray-700">
                    <p className="text-gray-400 text-xs font-mono">
                      Progress: {project.progress}
                    </p>
                  </div>
                )}
                
                <Link
                  href={`/${project.id}`}
                  className="inline-block w-full text-center bg-red-700 hover:bg-red-600 text-white px-4 py-2 font-mono font-bold transition-colors border border-red-600"
                >
                  VIEW DETAILS
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-red-900 border-t border-red-700">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6 font-mono">
            WANT TO STAY UPDATED?
          </h2>
          <p className="text-xl text-red-100 mb-8 font-mono">
            Subscribe to our updates and be the first to know about new releases
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/fables-monster"
              className="bg-white text-red-900 px-8 py-4 text-lg font-mono font-bold hover:bg-gray-200 transition-colors"
            >
              DISCORD COMMUNITY
            </a>
            <a
              href="/newsletter"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-900 px-8 py-4 text-lg font-mono font-bold transition-colors"
            >
              NEWSLETTER
            </a>
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
