import { getAllProjects, getContent, getFrontmatterString, getFrontmatterObject } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';
import { buildSocialMetadata } from '@/lib/metadata';
import {
  JsonLd,
  buildBreadcrumbJsonLd,
  buildCreativeWorkJsonLd,
  buildProductJsonLd,
} from '@/lib/seo/jsonld';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import StoreButton from '@/components/StoreButton';
import type { Metadata } from 'next';
import { languages } from '@/i18n/settings';

interface PlatformsType {
  itch?: string;
  driveThru?: string;
  roll20?: string;
  foundry?: string;
  foundryMarketplace?: string;
  rpgTraderCreator?: string;
  rpgTraderProduct?: string;
}

// Projects with dedicated pages — excluded from generic [slug] rendering
const DEDICATED_PROJECT_SLUGS = new Set([
  'lost-mark',
  'career-twilight',
  'expedition-418',
  'hellish-bureaucracy',
  'holiday-audit-kramp',
  'old-world-neon',
]);

export async function generateStaticParams() {
  const allParams: Array<{ lang: string; slug: string }> = [];

  for (const lang of languages) {
    const projects = await getAllProjects(lang);
    for (const project of projects) {
      if (!DEDICATED_PROJECT_SLUGS.has(project.slug)) {
        allParams.push({
          lang,
          slug: project.slug,
        });
      }
    }
  }

  return allParams;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang, 'common');
  const content = await getContent('projects', slug, lang);

  if (!content) {
    return {
      title: dict.projects?.detail?.notFoundTitle || 'Project Not Found',
    };
  }

  const title = getFrontmatterString(content.frontmatter, 'title');
  const tagline = getFrontmatterString(content.frontmatter, 'tagline');
  const image = getFrontmatterString(content.frontmatter, 'image');
  const resolvedTitle = title || dict.projects?.detail?.notFoundTitle || 'Project';
  const resolvedDescription = tagline || dict.projects?.metaDescription || 'Tabletop RPG project by Fables Monster Studio.';
  const social = buildSocialMetadata({
    lang,
    path: `/projects/${slug}`,
    title: resolvedTitle,
    description: resolvedDescription,
    type: 'article',
    imagePath: image || `/${lang}/opengraph-image`,
    imageAlt: resolvedTitle,
  });

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    ...social,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang, 'common');
  const content = await getContent('projects', slug, lang);

  if (!content) {
    notFound();
  }

  const contentTitle = getFrontmatterString(content.frontmatter, 'title');
  const contentImage = getFrontmatterString(content.frontmatter, 'image');
  const contentTagline = getFrontmatterString(content.frontmatter, 'tagline');
  const contentStatus = (getFrontmatterString(content.frontmatter, 'status') || 'in-development').toLowerCase();
  const contentType = getFrontmatterString(content.frontmatter, 'type');
  const contentSystem = getFrontmatterString(content.frontmatter, 'system');
  const platforms = getFrontmatterObject<PlatformsType>(content.frontmatter, 'platforms');
  const platformUrls = [
    platforms?.itch,
    platforms?.driveThru,
    platforms?.roll20,
    platforms?.foundry,
    platforms?.foundryMarketplace,
    platforms?.rpgTraderCreator,
    platforms?.rpgTraderProduct,
  ].filter(
    (value): value is string => typeof value === 'string' && value.length > 0,
  );
  const pageClassName = 'fm-page text-gray-200';
  const articleClassName = 'fm-panel prose prose-invert prose-lg prose-red max-w-none';

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: dict.nav?.home || 'Home', path: `/${lang}` },
    { name: dict.nav?.projects || 'Projects', path: `/${lang}/projects` },
    { name: contentTitle, path: `/${lang}/projects/${slug}` },
  ]);

  const commonJsonLdOptions = {
    name: contentTitle,
    description: contentTagline || dict.projects?.metaDescription || 'Tabletop RPG project by Fables Monster Studio.',
    path: `/${lang}/projects/${slug}`,
    lang,
    imagePath: contentImage || '/images/placeholder.webp',
    genre: contentType || contentSystem || 'Tabletop Role-Playing Game',
    keywords: [contentSystem, contentType].filter((value): value is string => typeof value === 'string' && value.length > 0),
  };

  const projectJsonLd =
    contentStatus === 'released'
      ? buildProductJsonLd({
          ...commonJsonLdOptions,
          category: contentType || 'Tabletop Role-Playing Game Adventure',
          offerUrls: platformUrls,
        })
      : buildCreativeWorkJsonLd(commonJsonLdOptions);

  return (
    <>
      <JsonLd id={`project-${slug}-breadcrumb-jsonld`} data={breadcrumbJsonLd} />
      <JsonLd id={`project-${slug}-schema-jsonld`} data={projectJsonLd} />
      <main className={pageClassName}>
      <section className="fm-page-hero">
        <div className="fm-shell">
          <div className="fm-page-hero-panel relative overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={contentImage || '/images/placeholder.webp'}
                alt={contentTitle}
                fill
                className="object-cover opacity-30"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/65 to-black/90" />
            </div>

            <div className="relative z-10 text-center">
              <p className="fm-page-kicker mb-4">{dict.projects?.detail?.kicker || 'PROJECT DOSSIER'}</p>
              <h1 className="fm-display-title font-bold text-white mb-5 font-orbitron tracking-[0.05em] text-glow-lg">
                {contentTitle}
              </h1>
              <p className="fm-page-subtitle mb-8">{contentTagline}</p>

              <div className="fm-page-actions">
                {platforms?.itch && (
                  <StoreButton
                    store="itch"
                    href={platforms.itch}
                    label={dict.projects?.detail?.labels?.itch || 'Get it on Itch.io'}
                  />
                )}
                {platforms?.driveThru && (
                  <StoreButton
                    store="drivethrurpg"
                    href={platforms.driveThru}
                    label={dict.projects?.detail?.labels?.drivethru || 'Get it on DriveThruRPG'}
                  />
                )}
                {platforms?.roll20 && (
                  <StoreButton
                    store="roll20"
                    href={platforms.roll20}
                    label={dict.projects?.detail?.labels?.roll20 || 'Roll20 Module'}
                  />
                )}
                {platforms?.foundryMarketplace && (
                  <StoreButton
                    store="foundryMarketplace"
                    href={platforms.foundryMarketplace}
                    label={dict.projects?.detail?.labels?.foundry || 'Foundry VTT Marketplace'}
                  />
                )}
                {platforms?.rpgTraderCreator && (
                  <StoreButton
                    store="rpgTraderCreator"
                    href={platforms.rpgTraderCreator}
                    label={dict.projects?.detail?.labels?.rpgTrader || 'RPG Trader'}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fm-section fm-section-bordered">
        <div className="fm-shell">
          <article className={articleClassName}>
            <div dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
          </article>
        </div>
      </section>
    </main>
    </>
  );
}
