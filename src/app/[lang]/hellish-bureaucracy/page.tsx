import { Metadata } from 'next'
import Navigation from "@/components/Navigation";
import { AdventureJson } from '@/components/SEO';
import StayConnectedSection from "@/components/StayConnectedSection";
import { getContent, getFrontmatterString } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const content = await getContent('projects', 'hellish-bureaucracy', lang);
  const title = content ? getFrontmatterString(content.frontmatter, 'title') || 'Hellish Bureaucracy' : 'Hellish Bureaucracy';
  const tagline = content ? getFrontmatterString(content.frontmatter, 'tagline') || 'Navigate the administrative nightmare of Hell.' : 'Navigate the administrative nightmare of Hell.';
  
  return {
    title: `${title} | Fables Monster Studio`,
    description: tagline,
    alternates: {
      canonical: `https://fables.monster/${lang}/hellish-bureaucracy`,
      languages: {
        'en': 'https://fables.monster/en/hellish-bureaucracy',
        'ru': 'https://fables.monster/ru/hellish-bureaucracy',
      },
    },
  }
}



export default async function HellishBureaucracy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const content = await getContent('projects', 'hellish-bureaucracy', lang);
  const dict = await getDictionary(lang, 'common');
  const homeDict = await getDictionary(lang, 'home');
  
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
      <div className="min-h-screen bg-black">
        <Navigation lang={lang} dict={dict.nav || {}} />

        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center pt-24 md:pt-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20 z-10"></div>
          
          <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-orbitron tracking-wider text-glow">
              {title || 'HELLISH BUREAUCRACY'}
            </h1>
            <p className="text-xl md:text-2xl text-red-400 mb-8 max-w-3xl mx-auto font-rajdhani">
              {tagline || 'Navigate the administrative nightmare of Hell'}
            </p>
            
            {/* Status Badge */}
            <div className="flex justify-center mb-8">
              <span className="px-4 py-2 bg-yellow-900/50 text-yellow-400 border border-yellow-600 font-orbitron text-sm">
                {lang === 'ru' ? 'В РАЗРАБОТКЕ' : 'IN DEVELOPMENT'}
              </span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-gray-950 border-t border-red-700/30">
          <div className="max-w-4xl mx-auto px-6">
            <div className="prose prose-invert prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content?.contentHtml || '' }} />
          </div>
        </section>

        {/* Stay Connected Section */}
        <StayConnectedSection
          lang={lang}
          dict={homeDict.stayConnected}
        />
      </div>
    </>
  );
}
