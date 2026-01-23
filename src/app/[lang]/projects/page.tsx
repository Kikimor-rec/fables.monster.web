import { Metadata } from 'next';
import Link from 'next/link';
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { getAllProjects, getFrontmatterString } from "@/lib/content";
import { getDictionary } from '@/lib/i18n';
import Navigation from "@/components/Navigation";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');
  
  return {
    title: `${dict.nav?.projects || 'Projects'} | Fables Monster Studio`,
    description: 'Explore our tabletop RPG adventures and digital experiences. From sci-fi horror to cyberpunk mysteries.',
    alternates: {
      canonical: `https://fables.monster/${lang}/projects`,
      languages: {
        'en': 'https://fables.monster/en/projects',
        'ru': 'https://fables.monster/ru/projects',
      },
    },
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');
  const allProjects = await getAllProjects(lang);

  // Sort projects: released -> coming-soon -> in-development
  const statusOrder: Record<string, number> = {
    "released": 1,
    "coming-soon": 2,
    "in-development": 3,
  };

  const sortedProjects = [...allProjects].sort((a, b) => {
    const statusA = (getFrontmatterString(a.frontmatter, 'status') || 'in-development').toLowerCase();
    const statusB = (getFrontmatterString(b.frontmatter, 'status') || 'in-development').toLowerCase();
    
    const orderA = statusOrder[statusA] || 99;
    const orderB = statusOrder[statusB] || 99;
    
    return orderA - orderB;
  });

  return (
    <div className="min-h-screen bg-black">
      <Navigation lang={lang} dict={dict.nav || {}} />
      
      {/* Header */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 font-orbitron tracking-wider text-glow-lg">
              {(dict.nav?.projects || 'Projects').toUpperCase()}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-rajdhani uppercase tracking-widest">
              {dict.projects?.description || 'Explore our tabletop RPG adventures and digital experiences'}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-12 sm:py-20 bg-black border-t border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects.map((project) => {
                const status = (getFrontmatterString(project.frontmatter, 'status') || 'in-development').toLowerCase();
                const projectImage = getFrontmatterString(project.frontmatter, 'image') || '/images/placeholder.jpg';
                const projectTitle = getFrontmatterString(project.frontmatter, 'title') || '';
                return (
                    <Link
                      key={project.slug}
                      href={`/${lang}/${project.slug}`}
                      className="group flex border border-border bg-black hover:border-accent transition-all duration-300 h-full flex-col"
                    >
                      {/* Project Image */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={projectImage}
                          alt={projectTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 text-xs font-orbitron font-bold border ${
                            status === 'released' ? 'bg-green-900/50 text-green-400 border-green-500' :
                            status === 'in-development' ? 'bg-yellow-900/50 text-yellow-400 border-yellow-500' :
                              'bg-blue-900/50 text-blue-400 border-blue-500'
                            }`}>
                            {status === 'released' ? (dict.projects?.status?.released || 'RELEASED') :
                              status === 'in-development' ? (dict.projects?.status?.inDev || 'IN DEV') :
                                (dict.projects?.status?.comingSoon || 'COMING SOON')}
                          </span>
                        </div>

                        {/* Featured Badge */}
                        {project.frontmatter.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-xs font-orbitron font-bold bg-red-900/80 text-red-400 border border-red-500">
                              {dict.projects?.featured || 'FEATURED'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Project Info */}
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-2xl font-bold text-white mb-2 font-orbitron group-hover:text-accent transition-colors">
                          {projectTitle}
                        </h3>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {getFrontmatterString(project.frontmatter, 'system') && (
                            <span className="text-xs font-rajdhani uppercase tracking-wide text-cyan-400 border border-cyan-700 px-2 py-1">
                              {getFrontmatterString(project.frontmatter, 'system')}
                            </span>
                          )}
                          {getFrontmatterString(project.frontmatter, 'type') && (
                            <span className="text-xs font-rajdhani uppercase tracking-wide text-gray-400 border border-gray-700 px-2 py-1">
                              {getFrontmatterString(project.frontmatter, 'type')}
                            </span>
                          )}
                        </div>

                        <p className="text-gray-300 text-sm font-rajdhani leading-relaxed mb-4 flex-grow">
                          {getFrontmatterString(project.frontmatter, 'tagline')}
                        </p>

                        {/* Tags */}
                        {Array.isArray(project.frontmatter.tags) && project.frontmatter.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {(project.frontmatter.tags as string[]).slice(0, 3).map((tag: string, i: number) => (
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
                );
              })}
            </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-20 bg-red-900 border-t border-red-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-orbitron">
              {dict.projects?.joinCommunity?.title || 'JOIN THE COMMUNITY'}
            </h2>
            <p className="text-lg sm:text-xl text-red-100 mb-8 font-rajdhani">
              {dict.projects?.joinCommunity?.description || 'Follow our development and become part of the Fables Monster community'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
              <a
                href="https://discord.gg/qJS4h5usxe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white text-red-900 px-8 py-4 text-lg font-orbitron font-bold hover:bg-gray-200 transition-colors text-center"
              >
                {dict.projects?.joinCommunity?.discord || 'JOIN DISCORD'}
              </a>
              <Link
                href={`/${lang}/newsletter/subscribe`}
                className="w-full sm:w-auto bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 text-lg font-orbitron font-bold transition-colors text-center"
              >
                {lang === 'ru' ? 'ПОДПИСАТЬСЯ' : 'SUBSCRIBE'}
              </Link>
              <a
                href="https://www.patreon.com/FablesMonster"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-900 px-8 py-4 text-lg font-orbitron font-bold transition-colors text-center"
              >
                {dict.projects?.joinCommunity?.patreon || 'SUPPORT ON PATREON'}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
