import { Metadata } from 'next';
import Link from 'next/link';
import FadeIn, { FadeInItem } from '@/components/FadeIn';
import ProjectDossierCard, { getProjectStatusLabel, normalizeProjectStatus } from '@/components/ProjectDossierCard';
import { getAllProjects, getFrontmatterString, getFrontmatterObject } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';
import { buildSocialMetadata } from '@/lib/metadata';
import { JsonLd, buildBreadcrumbJsonLd, buildCollectionPageJsonLd } from '@/lib/seo/jsonld';

export const revalidate = 3600;

type PlatformMap = Record<string, string | undefined>;

type ProjectContent = Awaited<ReturnType<typeof getAllProjects>>[number];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');

  const title = dict.nav?.projects || 'Projects';
  const description = dict.projects?.description || 'Explore our tabletop RPG adventures and digital experiences.';

  return {
    title,
    description,
    ...buildSocialMetadata({
      lang,
      path: '/projects',
      title,
      description,
      imagePath: `/${lang}/opengraph-image`,
      twitterImagePath: `/${lang}/twitter-image`,
    }),
  };
}

function sortProjects(projects: ProjectContent[]) {
  const statusOrder: Record<string, number> = { released: 1, 'coming-soon': 2, 'in-development': 3 };
  return [...projects].sort((a, b) => {
    const aStatus = normalizeProjectStatus(getFrontmatterString(a.frontmatter, 'status') || 'in-development');
    const bStatus = normalizeProjectStatus(getFrontmatterString(b.frontmatter, 'status') || 'in-development');
    return statusOrder[aStatus] - statusOrder[bStatus];
  });
}

function cardProps(project: ProjectContent, lang: string, labels: { released?: string; inDev?: string; comingSoon?: string }, priority = false) {
  const title = getFrontmatterString(project.frontmatter, 'title') || project.slug;
  const status = getFrontmatterString(project.frontmatter, 'status') || 'in-development';
  return {
    href: `/${lang}/${project.slug}`,
    title,
    tagline: getFrontmatterString(project.frontmatter, 'tagline'),
    image: getFrontmatterString(project.frontmatter, 'cardImage') || getFrontmatterString(project.frontmatter, 'image') || '/images/placeholder.webp',
    status,
    statusLabel: getProjectStatusLabel(status, labels),
    system: getFrontmatterString(project.frontmatter, 'system'),
    type: getFrontmatterString(project.frontmatter, 'type'),
    tags: Array.isArray(project.frontmatter.tags) ? project.frontmatter.tags as string[] : [],
    platforms: getFrontmatterObject<PlatformMap>(project.frontmatter, 'platforms'),
    priority,
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');
  const allProjects = sortProjects(await getAllProjects(lang));
  const statusLabels = dict.projects?.status || {};
  const isRu = lang === 'ru';

  const grouped = [
    { id: 'released', title: statusLabels.released || 'Released', projects: allProjects.filter((project) => normalizeProjectStatus(getFrontmatterString(project.frontmatter, 'status')) === 'released') },
    { id: 'in-development', title: statusLabels.inDev || 'In Development', projects: allProjects.filter((project) => normalizeProjectStatus(getFrontmatterString(project.frontmatter, 'status')) === 'in-development') },
    { id: 'coming-soon', title: statusLabels.comingSoon || 'Coming Soon', projects: allProjects.filter((project) => normalizeProjectStatus(getFrontmatterString(project.frontmatter, 'status')) === 'coming-soon') },
  ].filter((group) => group.projects.length > 0);

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: dict.nav?.home || 'Home', path: `/${lang}` },
    { name: dict.nav?.projects || 'Projects', path: `/${lang}/projects` },
  ]);

  const projectsCollectionJsonLd = buildCollectionPageJsonLd({
    name: dict.nav?.projects || 'Projects',
    description: dict.projects?.description || 'Explore our tabletop RPG adventures and digital experiences.',
    path: `/${lang}/projects`,
    items: allProjects.map((project) => ({
      name: getFrontmatterString(project.frontmatter, 'title') || project.slug,
      path: `/${lang}/${project.slug}`,
    })),
  });

  return (
    <>
      <JsonLd id="projects-breadcrumb-jsonld" data={breadcrumbJsonLd} />
      <JsonLd id="projects-collection-jsonld" data={projectsCollectionJsonLd} />
      <div className="min-h-screen bg-black text-white">
        <section className="border-b border-red-950 bg-gradient-to-b from-zinc-950 to-black pt-28 sm:pt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16">
            <FadeIn>
              <p className="mb-4 font-orbitron text-xs font-bold uppercase tracking-[0.24em] text-red-300">
                {isRu ? 'АРХИВ РАБОТ' : 'WORK ARCHIVE'}
              </p>
              <h1 className="font-orbitron text-5xl font-black uppercase tracking-[0.04em] text-white sm:text-7xl">
                {dict.nav?.work || dict.nav?.projects || 'Projects'}
              </h1>
              <p className="mt-5 max-w-3xl font-rajdhani text-xl leading-relaxed text-zinc-300">
                {dict.projects?.description || 'Explore our tabletop RPG adventures and digital experiences.'}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {grouped.map((group) => (
                  <a key={group.id} href={`#${group.id}`} className="border border-zinc-800 bg-black/70 px-4 py-2 font-orbitron text-xs font-bold uppercase tracking-[0.16em] text-zinc-300 transition-colors hover:border-red-500 hover:text-white">
                    {group.title} ({group.projects.length})
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          {grouped.map((group, groupIndex) => (
            <section key={group.id} id={group.id} className="scroll-mt-28 pb-16 last:pb-0">
              <div className="mb-8 flex items-end justify-between border-b border-zinc-900 pb-4">
                <h2 className="font-orbitron text-2xl font-bold uppercase tracking-[0.08em] text-white sm:text-4xl">
                  {group.title}
                </h2>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">{group.projects.length} files</span>
              </div>
              <FadeIn stagger staggerDelay={0.08}>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {group.projects.map((project, index) => (
                    <FadeInItem key={project.slug}>
                      <ProjectDossierCard {...cardProps(project, lang, statusLabels, groupIndex === 0 && index === 0)} />
                    </FadeInItem>
                  ))}
                </div>
              </FadeIn>
            </section>
          ))}
        </div>

        <section className="border-t border-red-950 bg-zinc-950/70 py-12 sm:py-16">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-orbitron text-2xl font-bold uppercase text-white">
                {isRu ? 'Следите за новыми релизами' : 'Follow new releases'}
              </h2>
              <p className="mt-2 font-rajdhani text-lg text-zinc-400">
                {isRu ? 'Новости студии, плейтесты и новые материалы без лишнего шума.' : 'Studio news, playtests, and new materials without extra noise.'}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={`/${lang}/newsletter/subscribe`} className="border border-red-500 bg-red-700 px-6 py-3 text-center font-orbitron text-sm font-bold uppercase tracking-[0.16em] text-white hover:bg-red-600">
                {isRu ? 'Подписаться' : 'Subscribe'}
              </Link>
              <a href="https://discord.gg/uw2uvny7n6" target="_blank" rel="noopener noreferrer" className="border border-zinc-700 bg-black px-6 py-3 text-center font-orbitron text-sm font-bold uppercase tracking-[0.16em] text-zinc-200 hover:border-cyan-500 hover:text-white">
                Discord
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
