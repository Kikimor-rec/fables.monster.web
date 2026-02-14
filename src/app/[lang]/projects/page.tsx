import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/FadeIn';
import { getAllProjects, getFrontmatterString } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';

const normalizeStatus = (status: string) => status.toLowerCase().trim();

const isReleasedStatus = (status: string) => ['released', 'вышло'].includes(normalizeStatus(status));

const isInDevelopmentStatus = (status: string) => ['in-development', 'in development', 'в разработке'].includes(normalizeStatus(status));

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');

  return {
    title: `${dict.nav?.projects || 'Projects'} | Fables Monster Studio`,
    description: dict.projects?.metaDescription || 'Explore our tabletop RPG adventures and digital experiences. From sci-fi horror to cyberpunk mysteries.',
    alternates: {
      canonical: `https://fables.monster/${lang}/projects`,
      languages: {
        en: 'https://fables.monster/en/projects',
        ru: 'https://fables.monster/ru/projects',
      },
    },
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');
  const allProjects = await getAllProjects(lang);

  const statusOrder: Record<string, number> = {
    released: 1,
    вышло: 1,
    'coming-soon': 2,
    'coming soon': 2,
    скоро: 2,
    'in-development': 3,
    'in development': 3,
    'в разработке': 3,
  };

  const sortedProjects = [...allProjects].sort((a, b) => {
    const statusA = normalizeStatus(getFrontmatterString(a.frontmatter, 'status') || 'in-development');
    const statusB = normalizeStatus(getFrontmatterString(b.frontmatter, 'status') || 'in-development');
    return (statusOrder[statusA] || 99) - (statusOrder[statusB] || 99);
  });

  const releasedCount = sortedProjects.filter((project) =>
    isReleasedStatus(getFrontmatterString(project.frontmatter, 'status') || '')
  ).length;

  const inDevCount = sortedProjects.filter((project) =>
    isInDevelopmentStatus(getFrontmatterString(project.frontmatter, 'status') || '')
  ).length;

  const comingSoonCount = sortedProjects.length - releasedCount - inDevCount;

  const telemetry = [
    { label: dict.projects?.telemetry?.total || 'TOTAL', value: String(sortedProjects.length) },
    { label: dict.projects?.telemetry?.released || 'RELEASED', value: String(releasedCount) },
    { label: dict.projects?.telemetry?.inDevelopment || 'IN DEVELOPMENT', value: String(inDevCount) },
    { label: dict.projects?.telemetry?.comingSoon || 'COMING SOON', value: String(Math.max(comingSoonCount, 0)) },
  ];

  return (
    <div className="fm-page">
      <section className="fm-page-hero">
        <div className="fm-shell">
          <FadeIn>
            <div className="fm-page-hero-panel text-center">
              <p className="fm-page-kicker mb-5">{dict.projects?.heroKicker || 'MISSION CATALOG'}</p>
              <h1 className="fm-display-title font-bold text-white font-orbitron tracking-[0.06em] text-glow-lg">
                {(dict.nav?.projects || 'Projects').toUpperCase()}
              </h1>
              <p className="fm-page-subtitle mt-5">
                {dict.projects?.description || 'Explore our tabletop RPG adventures and digital experiences'}
              </p>
              <div className="fm-stat-grid max-w-3xl mx-auto">
                {telemetry.map((entry) => (
                  <div key={entry.label} className="fm-stat-card">
                    <span className="fm-stat-label">{entry.label}</span>
                    <span className="fm-stat-value">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="fm-section fm-section-bordered">
        <div className="fm-shell">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project, index) => {
              const statusRaw = getFrontmatterString(project.frontmatter, 'status') || 'in-development';
              const projectImage = getFrontmatterString(project.frontmatter, 'image') || '/images/placeholder.webp';
              const projectTitle = getFrontmatterString(project.frontmatter, 'title') || '';
              const isReleased = isReleasedStatus(statusRaw);
              const isInDevelopment = isInDevelopmentStatus(statusRaw);

              const statusClass = isReleased
                ? 'border-green-500/70 bg-green-950/50 text-green-300'
                : isInDevelopment
                  ? 'border-yellow-500/70 bg-yellow-950/50 text-yellow-300'
                  : 'border-blue-500/70 bg-blue-950/50 text-blue-300';

              const statusText = isReleased
                ? (dict.projects?.status?.released || 'RELEASED')
                : isInDevelopment
                  ? (dict.projects?.status?.inDev || 'IN DEV')
                  : (dict.projects?.status?.comingSoon || 'COMING SOON');

              return (
                <FadeIn key={project.slug} delay={(index % 6) * 0.08}>
                  <Link
                    href={`/${lang}/${project.slug}`}
                    className="group flex h-full flex-col overflow-hidden border border-red-950/70 bg-zinc-950/70 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/65 hover:shadow-[0_20px_36px_rgba(120,0,0,0.28)]"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={projectImage}
                        alt={projectTitle}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                      <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2">
                        {project.frontmatter.featured ? (
                          <span className="fm-chip border-red-600/70 bg-red-950/70 text-red-200">
                            {dict.projects?.featured || 'FEATURED'}
                          </span>
                        ) : (
                          <span className="fm-chip invisible" aria-hidden="true">
                            FEATURED
                          </span>
                        )}
                        <span className={`px-3 py-1 text-[11px] font-orbitron font-bold border tracking-[0.12em] ${statusClass}`}>
                          {statusText}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold text-white mb-2 font-orbitron group-hover:text-red-300 transition-colors">
                        {projectTitle}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {getFrontmatterString(project.frontmatter, 'system') && (
                          <span className="text-xs font-rajdhani uppercase tracking-wide text-cyan-300 border border-cyan-800/80 px-2 py-1">
                            {getFrontmatterString(project.frontmatter, 'system')}
                          </span>
                        )}
                        {getFrontmatterString(project.frontmatter, 'type') && (
                          <span className="text-xs font-rajdhani uppercase tracking-wide text-zinc-400 border border-zinc-700 px-2 py-1">
                            {getFrontmatterString(project.frontmatter, 'type')}
                          </span>
                        )}
                      </div>

                      <p className="text-zinc-300 text-sm font-rajdhani leading-relaxed mb-4 flex-grow line-clamp-3">
                        {getFrontmatterString(project.frontmatter, 'tagline')}
                      </p>

                      {Array.isArray(project.frontmatter.tags) && project.frontmatter.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {(project.frontmatter.tags as string[]).slice(0, 3).map((tag: string, i: number) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 bg-zinc-900 text-zinc-400 border border-zinc-800 font-rajdhani uppercase tracking-wide"
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
        </div>
      </section>

      <section className="fm-section fm-section-bordered">
        <div className="fm-shell">
          <FadeIn>
            <div className="fm-panel text-center max-w-4xl mx-auto">
              <h2 className="fm-section-title font-bold text-white font-orbitron mb-4">
                {dict.projects?.joinCommunity?.title || 'JOIN THE COMMUNITY'}
              </h2>
              <p className="fm-lead text-zinc-300 max-w-2xl mx-auto">
                {dict.projects?.joinCommunity?.description || 'Follow our development and become part of the Fables Monster community'}
              </p>

              <div className="fm-page-actions mt-8">
                <a
                  href="https://discord.gg/eAwK9DfKf4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-red-700 text-white px-7 py-3 text-base font-orbitron font-bold hover:bg-red-600 transition-colors border border-red-500"
                >
                  {dict.projects?.joinCommunity?.discord || 'JOIN DISCORD'}
                </a>
                <Link
                  href={`/${lang}/newsletter/subscribe`}
                  className="w-full sm:w-auto border border-cyan-500/80 text-cyan-300 hover:bg-cyan-500 hover:text-black px-7 py-3 text-base font-orbitron font-bold transition-colors"
                >
                  {dict.projects?.joinCommunity?.subscribe || 'SUBSCRIBE'}
                </Link>
                <a
                  href="https://www.patreon.com/FablesMonster"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto border border-zinc-500 text-zinc-200 hover:border-white hover:text-white px-7 py-3 text-base font-orbitron font-bold transition-colors"
                >
                  {dict.projects?.joinCommunity?.patreon || 'SUPPORT ON PATREON'}
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
