import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn, { FadeInItem } from '@/components/FadeIn';
import ProjectDossierCard, { getProjectStatusLabel, normalizeProjectStatus } from '@/components/ProjectDossierCard';
import StayConnectedSection from '@/components/StayConnectedSection';
import { buildSocialMetadata } from '@/lib/metadata';
import { getDictionary } from '@/lib/i18n';
import { getAllProjects, getFrontmatterString, getFrontmatterObject } from '@/lib/content';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'home');

  const title = dict.meta?.title || 'Fables Monster Studio - Independent Tabletop RPG Creators';
  const description = dict.meta?.description || 'Create unforgettable tabletop RPG experiences with Fables Monster Studio.';

  return {
    title,
    description,
    keywords: dict.meta?.keywords,
    ...buildSocialMetadata({
      lang,
      path: '',
      title: dict.meta?.ogTitle || title,
      description: dict.meta?.ogDescription || description,
      imagePath: `/${lang}/opengraph-image`,
      twitterImagePath: `/${lang}/twitter-image`,
      includeXDefault: true,
    }),
  };
}

type PlatformMap = Record<string, string | undefined>;

function projectSortValue(status: string) {
  const normalized = normalizeProjectStatus(status);
  if (normalized === 'released') return 1;
  if (normalized === 'coming-soon') return 2;
  return 3;
}

function projectToCard(project: Awaited<ReturnType<typeof getAllProjects>>[number], lang: string, statusLabels: { released?: string; inDev?: string; comingSoon?: string }, priority = false) {
  const title = getFrontmatterString(project.frontmatter, 'title') || project.slug;
  const status = getFrontmatterString(project.frontmatter, 'status') || 'in-development';
  return {
    href: `/${lang}/${project.slug}`,
    title,
    tagline: getFrontmatterString(project.frontmatter, 'tagline'),
    image: getFrontmatterString(project.frontmatter, 'cardImage') || getFrontmatterString(project.frontmatter, 'image') || '/images/placeholder.webp',
    status,
    statusLabel: getProjectStatusLabel(status, statusLabels),
    system: getFrontmatterString(project.frontmatter, 'system'),
    type: getFrontmatterString(project.frontmatter, 'type'),
    tags: Array.isArray(project.frontmatter.tags) ? project.frontmatter.tags as string[] : [],
    platforms: getFrontmatterObject<PlatformMap>(project.frontmatter, 'platforms'),
    priority,
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'home');
  const allProjects = await getAllProjects(lang);
  const sortedProjects = [...allProjects].sort((a, b) => {
    const statusA = getFrontmatterString(a.frontmatter, 'status') || 'in-development';
    const statusB = getFrontmatterString(b.frontmatter, 'status') || 'in-development';
    return projectSortValue(statusA) - projectSortValue(statusB);
  });

  const statusLabels = dict.status || {};
  const releasedProjects = sortedProjects.filter((project) => normalizeProjectStatus(getFrontmatterString(project.frontmatter, 'status')) === 'released');
  const developmentProjects = sortedProjects.filter((project) => normalizeProjectStatus(getFrontmatterString(project.frontmatter, 'status')) !== 'released');

  const isRu = lang === 'ru';
  const copy = {
    heroKicker: isRu ? 'СТУДИЯ / РЕЛИЗЫ / VTT' : 'STUDIO / RELEASES / VTT',
    heroTitle: isRu ? 'Fables Monster Studio' : 'Fables Monster Studio',
    heroText: isRu
      ? 'Независимая студия настольных ролевых игр: хоррор, фантастика, странные документы, VTT-модули и игровые артефакты.'
      : 'Independent tabletop RPG studio making horror, sci-fi, strange documents, VTT modules, and playable artifacts.',
    viewWork: isRu ? 'Смотреть работы' : 'View Work',
    vttServices: isRu ? 'VTT-сервисы' : 'VTT Services',
    getUpdates: isRu ? 'Получать новости' : 'Get Updates',
    latest: isRu ? 'Свежие релизы' : 'Latest Releases',
    latestText: isRu ? 'Готовые сценарии и материалы, которые уже можно открыть, купить или запустить за столом.' : 'Released scenarios and materials ready to open, buy, or run at the table.',
    development: isRu ? 'В разработке' : 'In Development',
    developmentText: isRu ? 'Проекты, которые формируют следующую волну студии.' : 'Projects shaping the next wave of the studio.',
    whatWeMake: isRu ? 'Что мы делаем' : 'What We Make',
    capabilities: isRu ? 'Возможности студии' : 'Studio Capabilities',
    connect: isRu ? 'Подключиться' : 'Connect',
  };

  const workTypes = isRu
    ? ['Приключения и ваншоты', 'VTT-модули', 'Игровые инструменты', 'Музыка, карты и handouts']
    : ['Adventures and one-shots', 'VTT modules', 'Playable tools', 'Music, maps, and handouts'];
  const capabilities = isRu
    ? ['Сценарии и разработка', 'Редактура и production', 'Верстка и арт-дирекшн', 'Foundry / Roll20 адаптация']
    : ['Writing and game design', 'Editing and production', 'Layout and art direction', 'Foundry / Roll20 adaptation'];

  return (
    <div className="bg-black text-white">
      <section className="relative overflow-hidden border-b border-red-950 pt-28 sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(220,38,38,0.22),transparent_32%),radial-gradient(circle_at_80%_24%,rgba(8,145,178,0.18),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-24">
          <FadeIn>
            <div>
              <p className="mb-5 font-orbitron text-xs font-bold uppercase tracking-[0.24em] text-red-300">{copy.heroKicker}</p>
              <h1 className="font-orbitron text-5xl font-black uppercase tracking-[0.03em] text-white sm:text-7xl lg:text-8xl">
                {copy.heroTitle}
              </h1>
              <p className="mt-6 max-w-3xl font-rajdhani text-xl leading-relaxed text-zinc-300 sm:text-2xl">
                {copy.heroText}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href={`/${lang}/projects`} className="border border-red-500 bg-red-700 px-6 py-3 text-center font-orbitron text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-red-600">
                  {copy.viewWork}
                </Link>
                <Link href={`/${lang}/vtt`} className="border border-cyan-700 bg-cyan-950/30 px-6 py-3 text-center font-orbitron text-sm font-bold uppercase tracking-[0.16em] text-cyan-200 transition-colors hover:border-cyan-400 hover:text-white">
                  {copy.vttServices}
                </Link>
                <Link href={`/${lang}/newsletter/subscribe`} className="border border-zinc-700 bg-black/40 px-6 py-3 text-center font-orbitron text-sm font-bold uppercase tracking-[0.16em] text-zinc-200 transition-colors hover:border-red-400 hover:text-white">
                  {copy.getUpdates}
                </Link>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative mx-auto max-w-md lg:ml-auto">
              <div className="absolute inset-8 bg-red-600/20 blur-3xl" />
              <Image src="/logos/mascot_white.PNG" alt={dict.hero?.logoAlt || 'Fables Monster Mascot'} width={420} height={420} className="relative z-10 w-full" priority />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-red-950 bg-zinc-950/70">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-5 sm:px-6 md:grid-cols-4">
          {[
            [dict.telemetry?.modules || 'MODULES', String(allProjects.length)],
            [dict.telemetry?.available || 'AVAILABLE', String(releasedProjects.length)],
            [dict.telemetry?.inDevelopment || 'IN DEVELOPMENT', String(developmentProjects.length)],
            [dict.telemetry?.locales || 'LOCALES', dict.telemetry?.localesValue || 'EN / RU'],
          ].map(([label, value]) => (
            <div key={label} className="border border-zinc-800 bg-black px-4 py-3 text-center">
              <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">{label}</div>
              <div className="font-orbitron text-lg text-white sm:text-xl">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-col gap-4 border-b border-red-950 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-orbitron text-3xl font-bold uppercase text-white sm:text-5xl">{copy.latest}</h2>
              <p className="mt-3 max-w-2xl font-rajdhani text-lg text-zinc-400">{copy.latestText}</p>
            </div>
            <Link href={`/${lang}/projects`} className="font-orbitron text-sm font-bold uppercase tracking-[0.16em] text-cyan-300 hover:text-white">
              {dict.latestProjects?.viewAll || (isRu ? 'Все проекты ->' : 'All projects ->')}
            </Link>
          </div>
          <FadeIn stagger staggerDelay={0.1}>
            <div className="grid gap-6 md:grid-cols-3">
              {releasedProjects.slice(0, 3).map((project, index) => (
                <FadeInItem key={project.slug}>
                  <ProjectDossierCard {...projectToCard(project, lang, statusLabels, index === 0)} />
                </FadeInItem>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {developmentProjects.length > 0 && (
        <section className="border-y border-zinc-900 bg-zinc-950/55 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-8">
              <h2 className="font-orbitron text-2xl font-bold uppercase text-white sm:text-4xl">{copy.development}</h2>
              <p className="mt-2 font-rajdhani text-lg text-zinc-400">{copy.developmentText}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {developmentProjects.map((project) => (
                <ProjectDossierCard key={project.slug} {...projectToCard(project, lang, statusLabels)} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-orbitron text-3xl font-bold uppercase text-white sm:text-4xl">{copy.whatWeMake}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {workTypes.map((item) => <div key={item} className="border border-zinc-800 bg-zinc-950 p-5 font-rajdhani text-lg text-zinc-200">{item}</div>)}
            </div>
          </div>
          <div>
            <h2 className="font-orbitron text-3xl font-bold uppercase text-white sm:text-4xl">{copy.capabilities}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {capabilities.map((item) => <div key={item} className="border border-red-950 bg-black p-5 font-rajdhani text-lg text-zinc-200">{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-red-950 bg-zinc-950/70 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6 font-orbitron text-xs font-bold uppercase tracking-[0.24em] text-red-300">{copy.connect}</div>
          <StayConnectedSection lang={lang} dict={dict.stayConnected} />
        </div>
      </section>
    </div>
  );
}
