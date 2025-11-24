import { Metadata } from 'next';
import Link from 'next/link';
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { projects, getLocalizedProject, sortProjectsByStatus } from "@/data/projects";

export const metadata: Metadata = {
  title: 'Projects | Fables Monster Studio',
  description: 'Explore our tabletop RPG adventures and digital experiences. From sci-fi horror to cyberpunk mysteries.',
};

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const typedLocale = locale as 'en' | 'ru';
  const sortedProjects = sortProjectsByStatus(projects);
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 font-orbitron tracking-wider text-glow-lg">
              PROJECTS
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-rajdhani uppercase tracking-widest">
              Explore our tabletop RPG adventures and digital experiences
            </p>
          </FadeIn>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-12 sm:py-20 bg-black border-t border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects.map((project, index) => {
                const localized = getLocalizedProject(project, typedLocale);
                return (
                  <FadeIn key={project.id} delay={0.1 * (index + 1)}>
                    <Link
                      href={`/${project.slug}`}
                      className="group block border border-border bg-black hover:border-accent transition-all duration-300 h-full flex flex-col"
                    >
                      {/* Project Image */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 text-xs font-orbitron font-bold border ${project.status === 'released' ? 'bg-green-900/50 text-green-400 border-green-500' :
                            project.status === 'in-development' ? 'bg-yellow-900/50 text-yellow-400 border-yellow-500' :
                              'bg-blue-900/50 text-blue-400 border-blue-500'
                            }`}>
                            {project.status === 'released' ? (typedLocale === 'en' ? 'RELEASED' : 'ВЫШЛО') :
                              project.status === 'in-development' ? (typedLocale === 'en' ? 'IN DEV' : 'В РАЗРАБОТКЕ') :
                                (typedLocale === 'en' ? 'COMING SOON' : 'СКОРО')}
                          </span>
                        </div>

                        {/* Featured Badge */}
                        {project.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-xs font-orbitron font-bold bg-red-900/80 text-red-400 border border-red-500">
                              {typedLocale === 'en' ? 'FEATURED' : 'ИЗБРАННОЕ'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Project Info */}
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-2xl font-bold text-white mb-2 font-orbitron group-hover:text-accent transition-colors">
                          {localized.title}
                        </h3>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-xs font-rajdhani uppercase tracking-wide text-cyan-400 border border-cyan-700 px-2 py-1">
                            {project.system}
                          </span>
                          <span className="text-xs font-rajdhani uppercase tracking-wide text-gray-400 border border-gray-700 px-2 py-1">
                            {project.type}
                          </span>
                        </div>

                        <p className="text-gray-300 text-sm font-rajdhani leading-relaxed mb-4 flex-grow">
                          {localized.tagline}
                        </p>

                        {/* Tags */}
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 bg-gray-800 text-gray-400 border border-gray-700 font-rajdhani uppercase tracking-wide"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-20 bg-red-900 border-t border-red-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-orbitron">
              JOIN THE COMMUNITY
            </h2>
            <p className="text-lg sm:text-xl text-red-100 mb-8 font-rajdhani">
              Follow our development and become part of the Fables Monster community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://discord.gg/qJS4h5usxe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white text-red-900 px-8 py-4 text-lg font-orbitron font-bold hover:bg-gray-200 transition-colors text-center"
              >
                JOIN DISCORD
              </a>
              <a
                href="https://www.patreon.com/FablesMonster"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-900 px-8 py-4 text-lg font-orbitron font-bold transition-colors text-center"
              >
                SUPPORT ON PATREON
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
