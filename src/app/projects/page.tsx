import ProjectCard from "@/components/ProjectCard";

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

  return (
    <div className="bg-black">
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
        <ProjectCard key={project.id} project={project} featured={true} />
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
              <ProjectCard key={project.id} project={project} featured={false} />
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
    </div>
  );
}
