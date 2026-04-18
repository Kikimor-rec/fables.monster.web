import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import TeamMember from '@/components/TeamMember';
import FadeIn from '@/components/FadeIn';
import StructuredInquiryForm, { InquiryField } from '@/components/StructuredInquiryForm';
import { buildSocialMetadata } from '@/lib/metadata';
import { getDictionary } from '@/lib/i18n';
import { getAllProjects, getFrontmatterString } from '@/lib/content';

export const revalidate = 3600; // ISR: revalidate every hour

const valueMarkers: Record<string, string> = {
  QUALITY: '01',
  HUMAN: '02',
  COMMUNITY: '03',
};

const getAuthors = (frontmatter: Record<string, unknown>) => {
  const authors = frontmatter.authors;
  if (Array.isArray(authors)) {
    return authors.filter((author): author is string => typeof author === 'string');
  }

  const author = frontmatter.author;
  return typeof author === 'string' && author ? [author] : [];
};

const buildProjectHref = (lang: string, projectPage: string, slug: string) => {
  const path = projectPage || `/${slug}`;
  if (path.startsWith('http')) return path;
  return `/${lang}${path.startsWith('/') ? path : `/${path}`}`;
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');
  const title = dict.nav?.about || 'About';
  const description =
    dict.about?.metaDescription ||
    'Meet the team behind Fables Monster Studio - talented creators crafting immersive tabletop RPG experiences, horror adventures, and sci-fi campaigns.';
  const social = buildSocialMetadata({
    lang,
    path: '/about',
    title,
    description,
    imagePath: `/${lang}/opengraph-image`,
  });

  return {
    title,
    description,
    ...social,
  };
}

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');
  const allProjects = await getAllProjects(lang);
  const showcaseProjects = allProjects
    .filter((project) => project.frontmatter.studioShowcase === true)
    .slice(0, 4);

  const partnershipCopy = lang === 'ru'
    ? {
        kicker: 'ПРОЕКТЫ С АВТОРАМИ',
        title: 'Независимые проекты и авторские релизы',
        intro:
          'Некоторые релизы Fables.Monster выходят вместе с авторами и небольшими командами. Мы помогаем довести материал до готового релиза: редактура, вёрстка, визуальная подача, музыка, VTT и подготовка к публикации. Авторство остается у создателей проекта; наша роль указана рядом с релизом.',
        authorLabel: 'Автор',
        fallbackRole: 'Роль Fables.Monster: подготовка релиза',
        helpTitle: 'Как подключается студия',
        helpText:
          'Обычно это работа с текстом, упаковка, вёрстка, обложка или иллюстрации, саундтрек, VTT-адаптация, страница релиза и техническая подготовка файлов. Объём обсуждаем по каждому проекту отдельно.',
        ctaTitle: 'Есть материал, который хочется выпустить?',
        ctaText:
          'Пришлите короткое описание и ссылку на черновик или материалы. Мы посмотрим, подходит ли проект по формату, объёму и тону, и ответим без обещания автоматического сотрудничества.',
        ctaButton: 'Написать о проекте',
        projectsLink: 'Смотреть все проекты',
        formTitle: 'Коротко о проекте',
        formContext: 'Сообщение об авторском проекте для Fables.Monster',
        formSubject: 'Author project inquiry',
        submit: 'Отправить',
        sending: 'Отправка...',
        success: 'Сообщение отправлено. Мы посмотрим проект и ответим.',
        error: 'Не удалось отправить форму. Попробуйте еще раз или напишите на info@fables.monster.',
      }
    : {
        kicker: 'AUTHOR PROJECTS',
        title: 'Independent Projects and Author Releases',
        intro:
          'Some Fables.Monster releases are made with independent authors and small teams. We help shape the material for publication: editing, layout, visual direction, music, VTT work, and release preparation. The authorship stays with the creators; our role is stated next to the project.',
        authorLabel: 'Author',
        fallbackRole: 'Fables.Monster role: release preparation',
        helpTitle: 'Where the Studio Can Join',
        helpText:
          'Typical work includes text, packaging, layout, cover or illustration direction, soundtrack, VTT adaptation, release page, and technical file preparation. Scope depends on the project.',
        ctaTitle: 'Have material you want to release?',
        ctaText:
          'Send a short description and a link to a draft or materials. We will check fit by format, scope, and tone, then reply without promising automatic collaboration.',
        ctaButton: 'Write about a project',
        projectsLink: 'View all projects',
        formTitle: 'Project Note',
        formContext: 'Author project message for Fables.Monster',
        formSubject: 'Author project inquiry',
        submit: 'Send',
        sending: 'Sending...',
        success: 'Message sent. We will review the project and reply.',
        error: 'Could not send the form. Try again or write to info@fables.monster.',
      };
  const authorInquiryFields: InquiryField[] = lang === 'ru'
    ? [
        { name: 'name', label: 'Имя или команда', placeholder: 'Как к вам обращаться' },
        { name: 'email', label: 'Email для ответа', type: 'email', placeholder: 'name@example.com', required: true },
        { name: 'project', label: 'Проект', placeholder: 'Название или рабочее имя' },
        { name: 'stage', label: 'Стадия', type: 'select', placeholder: 'Если уже понятно', options: ['Идея', 'Черновик', 'Плейтест', 'Готовый текст', 'Сверстанный релиз'] },
        { name: 'comment', label: 'Что нужно от студии', type: 'textarea', rows: 5, placeholder: 'Коротко: что это за материал, что уже есть, где лежит черновик, какая помощь нужна.' },
      ]
    : [
        { name: 'name', label: 'Name or team', placeholder: 'How should we address you?' },
        { name: 'email', label: 'Reply email', type: 'email', placeholder: 'name@example.com', required: true },
        { name: 'project', label: 'Project', placeholder: 'Title or working name' },
        { name: 'stage', label: 'Stage', type: 'select', placeholder: 'If you already know', options: ['Idea', 'Draft', 'Playtest', 'Finished text', 'Laid-out release'] },
        { name: 'comment', label: 'What you need from the studio', type: 'textarea', rows: 5, placeholder: 'What the material is, what already exists, where the draft is, what kind of help you need.' },
      ];
  return (
    <div className="fm-page">
      <section className="fm-page-hero">
        <div className="fm-shell">
          <FadeIn>
            <div className="fm-page-hero-panel text-center">
              <p className="fm-page-kicker mb-5">{dict.about?.heroKicker || 'STUDIO DOSSIER'}</p>
              <h1 className="fm-display-title font-bold text-white font-orbitron tracking-[0.06em] text-glow-lg">
                {dict.about?.title || 'ABOUT US'}
              </h1>
              <p className="fm-page-subtitle mt-5">
                {dict.about?.subtitle || 'Meet the team behind Fables Monster Studio'}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="fm-section fm-section-bordered">
        <div className="fm-shell">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(dict.about?.values || []).map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.08}>
                <article className="fm-panel h-full text-center">
                  <span className="inline-flex border border-cyan-900/70 bg-black/70 px-3 py-1 text-cyan-300 font-orbitron text-sm tracking-[0.18em]">
                    {valueMarkers[value.icon] || `0${index + 1}`}
                  </span>
                  <h2 className="text-2xl font-orbitron text-white mt-5 mb-3">{value.title}</h2>
                  <p className="text-zinc-300 font-rajdhani leading-relaxed">{value.description}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="author-projects" className="fm-section fm-section-bordered">
        <div className="fm-shell">
          <FadeIn>
            <div className="grid lg:grid-cols-[0.96fr_1.04fr] gap-8 lg:gap-12 items-end mb-10">
              <div>
                <p className="fm-page-kicker mb-4">{partnershipCopy.kicker}</p>
                <h2 className="fm-section-title font-bold text-white font-orbitron mb-5">
                  {partnershipCopy.title}
                </h2>
                <p className="text-zinc-300 font-rajdhani text-lg leading-relaxed">
                  {partnershipCopy.intro}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 min-h-[220px]">
                {showcaseProjects.slice(0, 3).map((project, index) => {
                  const image = getFrontmatterString(project.frontmatter, 'cardImage') || getFrontmatterString(project.frontmatter, 'image') || '/images/placeholder.webp';
                  const title = getFrontmatterString(project.frontmatter, 'title') || project.slug;
                  return (
                    <div key={project.slug} className={`relative overflow-hidden border border-red-900/40 bg-black ${index === 1 ? 'translate-y-6' : ''}`}>
                      <Image src={image} alt="" fill className="object-cover opacity-75 grayscale" sizes="(max-width: 1024px) 33vw, 280px" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                      <span className="absolute bottom-3 left-3 right-3 font-orbitron text-[10px] tracking-[0.14em] text-white uppercase">
                        {title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {showcaseProjects.map((project, index) => {
              const title = getFrontmatterString(project.frontmatter, 'title') || project.slug;
              const image = getFrontmatterString(project.frontmatter, 'cardImage') || getFrontmatterString(project.frontmatter, 'image') || '/images/placeholder.webp';
              const description = getFrontmatterString(project.frontmatter, 'showcaseDescription') || getFrontmatterString(project.frontmatter, 'tagline');
              const involvement = getFrontmatterString(project.frontmatter, 'studioInvolvement') || partnershipCopy.fallbackRole;
              const involvementType = getFrontmatterString(project.frontmatter, 'studioInvolvementType');
              const projectPage = getFrontmatterString(project.frontmatter, 'projectPage');
              const authors = getAuthors(project.frontmatter).join(', ');
              const href = buildProjectHref(lang, projectPage, project.slug);

              return (
                <FadeIn key={project.slug} delay={(index % 4) * 0.08}>
                  <Link href={href} className="group block h-full border border-zinc-800 bg-black hover:border-red-500/70 transition-colors">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    </div>
                    <div className="p-5">
                      {involvementType && (
                        <p className="text-[10px] font-orbitron tracking-[0.2em] uppercase text-cyan-300 mb-3">{involvementType}</p>
                      )}
                      <h3 className="font-orbitron text-xl text-white mb-2 group-hover:text-red-300 transition-colors">{title}</h3>
                      {authors && (
                        <p className="text-sm font-rajdhani text-zinc-400 mb-3">
                          {partnershipCopy.authorLabel}: <span className="text-zinc-200">{authors}</span>
                        </p>
                      )}
                      <p className="font-rajdhani text-zinc-300 leading-relaxed mb-4">{description}</p>
                      <p className="border-t border-zinc-800 pt-4 text-sm font-rajdhani text-red-200">
                        {involvement}
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>

          <div className="mt-10 grid lg:grid-cols-[0.86fr_1.14fr] gap-6 lg:gap-8 items-start">
            <FadeIn>
              <div className="fm-panel h-full">
                <p className="fm-page-kicker mb-4">{partnershipCopy.helpTitle}</p>
                <p className="text-zinc-300 font-rajdhani text-lg leading-relaxed mb-8">
                  {partnershipCopy.helpText}
                </p>

                <div className="border border-red-900/45 bg-red-950/15 p-5">
                  <h3 className="text-2xl font-orbitron text-white mb-3">{partnershipCopy.ctaTitle}</h3>
                  <p className="text-zinc-300 font-rajdhani leading-relaxed mb-5">{partnershipCopy.ctaText}</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href="#author-project-form" className="inline-flex justify-center bg-red-700 hover:bg-red-600 text-white px-5 py-3 font-orbitron font-bold transition-colors border border-red-500">
                      {partnershipCopy.ctaButton}
                    </a>
                    <Link href={`/${lang}/projects`} className="inline-flex justify-center border border-cyan-700/70 text-cyan-300 hover:text-white hover:border-cyan-400 px-5 py-3 font-orbitron font-bold transition-colors">
                      {partnershipCopy.projectsLink}
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div id="author-project-form" className="scroll-mt-28">
                <StructuredInquiryForm
                  title={partnershipCopy.formTitle}
                  context={partnershipCopy.formContext}
                  subject={partnershipCopy.formSubject}
                  fields={authorInquiryFields}
                  submitLabel={partnershipCopy.submit}
                  sendingLabel={partnershipCopy.sending}
                  successMessage={partnershipCopy.success}
                  errorMessage={partnershipCopy.error}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="fm-section fm-section-bordered">
        <div className="fm-shell">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="fm-page-kicker mb-4">{dict.about?.rosterKicker || 'TEAM ROSTER'}</p>
              <h2 className="fm-section-title font-bold text-white font-orbitron mb-4">
                {dict.about?.rosterTitle || 'THE CREW'}
              </h2>
              <p className="text-zinc-300 font-rajdhani text-lg">
                {dict.about?.rosterDescription || 'The people building new adventures, visuals, and sound for the worlds of Fables Monster Studio.'}
              </p>
            </div>
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {(dict.team || []).map((member, index) => (
              <FadeIn key={`${member.name}-${index}`} delay={(index % 6) * 0.08}>
                <TeamMember member={member} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
