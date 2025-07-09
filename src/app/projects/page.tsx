import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/FadeIn";

export default function Projects() {
  const projects = [
    {
      id: "lost-mark",
      title: "The Lost Mark",
      description: "A Sci-Fi horror adventure for Mothership RPG. Your crew faces impossible choices and eldritch truths among the wrecks and cults of deep space.",
      status: "Available Soon",
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
      description: "Fantasy Adventure for D&D 5e/2024. Send the players' characters to the very heart of the Nine Hells with the task of stealing a hellish contract or trying to prove that the contract is invalid.",
      status: "In Development",
      tags: ["D&D 5e 2014/2024", "Fantasy", "Nine Hells", "Social Encounters"],
      icon: "😈",
      progress: "Scriptwriting & Playtesting"
    }
  ];

  return (
    <div className="bg-black">
      {/* Header */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 font-mono tracking-wider">
              OUR PROJECTS
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-mono">
              Tabletop RPG adventures crafted with attention to detail and immersive storytelling
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Project */}
      <FadeIn delay={0.2}>
        {projects.filter(p => p.featured).map((project) => (
          <ProjectCard key={project.id} project={project} featured={true} />
        ))}
      </FadeIn>

      {/* All Projects Grid */}
      <section className="py-12 sm:py-20 bg-black border-t border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-mono">
                ALL PROJECTS
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 font-mono">
                Complete collection of our tabletop RPG content
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {projects.map((project, index) => (
              <FadeIn key={project.id} delay={0.1 * index}>
                <ProjectCard project={project} featured={false} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-20 bg-red-900 border-t border-red-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-mono">
              WANT TO STAY UPDATED?
            </h2>
            <p className="text-lg sm:text-xl text-red-100 mb-8 font-mono">
              Subscribe to our updates and be the first to know about new releases
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://discord.gg/fables-monster"
                className="w-full sm:w-auto bg-white text-red-900 px-6 sm:px-8 py-4 text-base sm:text-lg font-mono font-bold hover:bg-gray-200 transition-colors text-center"
              >
                DISCORD COMMUNITY
              </a>
              <a
                href="/newsletter"
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-900 px-6 sm:px-8 py-4 text-base sm:text-lg font-mono font-bold transition-colors text-center"
              >
                NEWSLETTER
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
