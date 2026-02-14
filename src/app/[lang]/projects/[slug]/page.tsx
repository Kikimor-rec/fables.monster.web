import { getAllProjects, getContent, getFrontmatterString, getFrontmatterObject } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';
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
}

export async function generateStaticParams() {
  const allParams: Array<{ lang: string; slug: string }> = [];

  for (const lang of languages) {
    const projects = await getAllProjects(lang);
    for (const project of projects) {
      allParams.push({
        lang,
        slug: project.slug,
      });
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

  return {
    title: `${title} | Fables Monster Studio`,
    description: tagline || undefined,
    openGraph: {
      title: title || undefined,
      description: tagline || undefined,
      images: image ? [image] : undefined,
    },
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
  const platforms = getFrontmatterObject<PlatformsType>(content.frontmatter, 'platforms');

  return (
    <main className="fm-page text-gray-200">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fm-section fm-section-bordered">
        <div className="fm-shell">
          <article className="fm-panel prose prose-invert prose-lg prose-red max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
          </article>
        </div>
      </section>
    </main>
  );
}
