import { Metadata } from 'next'
import { AdventureJson } from '@/components/SEO';
import StayConnectedSection from "@/components/StayConnectedSection";
import StoryProgressBar from '@/components/StoryProgressBar';
import StoryBackToTop from '@/components/StoryBackToTop';
import { getContent, getFrontmatterString } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';
import { buildSocialMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const [content, commonDict] = await Promise.all([
    getContent('projects', 'hellish-bureaucracy', lang),
    getDictionary(lang, 'common'),
  ]);
  const projectDict = commonDict.projects.hellishBureaucracy;
  const title = content ? getFrontmatterString(content.frontmatter, 'title') || 'Hellish Bureaucracy' : 'Hellish Bureaucracy';
  const fallbackTagline = projectDict?.defaultTagline || 'Navigate the administrative nightmare of Hell.';
  const tagline = content ? getFrontmatterString(content.frontmatter, 'tagline') || fallbackTagline : fallbackTagline;
  const social = buildSocialMetadata({
    lang,
    path: '/hellish-bureaucracy',
    title,
    description: tagline,
    type: 'article',
    imagePath: `/${lang}/hellish-bureaucracy/opengraph-image`,
    twitterImagePath: `/${lang}/hellish-bureaucracy/twitter-image`,
  });
  
  return {
    title,
    description: tagline,
    ...social,
  }
}



export default async function HellishBureaucracy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const [content, homeDict, commonDict] = await Promise.all([
    getContent('projects', 'hellish-bureaucracy', lang),
    getDictionary(lang, 'home'),
    getDictionary(lang, 'common'),
  ]);
  const projectDict = commonDict.projects.hellishBureaucracy;
  
  const title = content ? getFrontmatterString(content.frontmatter, 'title') : '';
  const tagline = content ? getFrontmatterString(content.frontmatter, 'tagline') : '';

  return (
    <>
      <AdventureJson
        name="Hellish Bureaucracy"
        description="Fantasy adventure about surviving infernal administration."
        url="https://fables.monster/hellish-bureaucracy"
        date="2024-12-20"
        genre="Fantasy Comedy"
      />
      <div className="fm-page">
        <StoryProgressBar accent="red" />
        {/* Hero Section */}
        <section className="fm-page-hero">
          <div className="fm-shell">
            <div className="fm-page-hero-panel text-center">
              <p className="fm-page-kicker mb-5">{projectDict?.kicker || 'UNANNOUNCED PROTOCOL'}</p>
              <h1 className="fm-display-title font-bold text-white mb-5 font-orbitron tracking-wider text-glow">
                {title || 'HELLISH BUREAUCRACY'}
              </h1>
              <p className="fm-page-subtitle text-red-300 mb-8">
                {tagline || projectDict?.defaultTagline || 'Navigate the administrative nightmare of Hell'}
              </p>

              <div className="flex justify-center">
                <span className="px-4 py-2 bg-yellow-900/50 text-yellow-400 border border-yellow-600 font-orbitron text-sm tracking-[0.12em]">
                  {projectDict?.inDevelopment || 'IN DEVELOPMENT'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="fm-section fm-section-bordered">
          <div className="fm-shell max-w-4xl">
            <article className="fm-panel prose prose-invert prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content?.contentHtml || '' }} />
          </div>
        </section>

        {/* Stay Connected Section */}
        <StayConnectedSection
          lang={lang}
          dict={homeDict.stayConnected}
        />
        <StoryBackToTop tone="red" />
      </div>
    </>
  );
}
