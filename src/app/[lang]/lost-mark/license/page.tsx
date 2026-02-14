import { Metadata } from 'next';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { getDictionary } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'lost-mark-license');
  const imageUrl = 'https://fables.monster/images/lost-mark/lm_promo_1.webp';
  const openGraphLocale = lang === 'ru' ? 'ru_RU' : 'en_US';

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      url: `https://fables.monster/${lang}/lost-mark/license`,
      siteName: 'Fables Monster Studio',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: dict.meta.imageAlt,
        },
      ],
      locale: openGraphLocale,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.twitterTitle,
      description: dict.meta.twitterDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://fables.monster/${lang}/lost-mark/license`,
      languages: {
        en: 'https://fables.monster/en/lost-mark/license',
        ru: 'https://fables.monster/ru/lost-mark/license',
      },
    },
  };
}

export default async function LostMarkLicense({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'lost-mark-license');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <FadeIn>
          <div className="mb-8">
            <Link
              href={`/${lang}/lost-mark`}
              className="text-red-400 hover:text-red-300 font-mono text-sm transition-colors"
            >
              {dict.backToProject}
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-gray-900 border border-red-700 p-8 mb-8">
            <h1 className="text-3xl md:text-4xl font-mono font-bold text-red-400 mb-2">{dict.header.title}</h1>
            <div className="text-xl font-mono text-gray-300 mb-6">{dict.header.year}</div>
            <div className="text-gray-400 font-mono">
              {dict.header.byline} -{' '}
              <a href="https://fables.monster" className="text-red-400 hover:underline">https://fables.monster</a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="bg-gray-900 border border-red-700 p-8 mb-8">
            <h2 className="text-xl font-mono font-bold text-white mb-4">{dict.licenseTitle}</h2>

            <div className="mb-6">
              <h3 className="text-lg font-mono font-bold text-green-400 mb-3">{dict.freeToUseTitle}</h3>
              <ul className="space-y-2 text-gray-300 font-mono">
                {dict.freeToUseItems.map((item, index) => (
                  <li key={`free-${index}`}>- {item}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-mono font-bold text-yellow-400 mb-3">{dict.termsTitle}</h3>
              <ul className="space-y-2 text-gray-300 font-mono">
                {dict.terms.map((term) => (
                  <li key={term.term}>
                    <strong className="text-white">{term.term}</strong> - {term.description}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-mono font-bold text-blue-400 mb-3">{dict.attributionTitle}</h3>
              <div className="bg-black border border-gray-600 p-4 font-mono text-gray-300 text-sm">
                {dict.attributionLines.map((line, index) => (
                  <div key={`attr-${index}`}>- {line}</div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="bg-gray-900 border border-red-700 p-8 mb-8">
            <h3 className="text-lg font-mono font-bold text-red-400 mb-3">{dict.contactTitle}</h3>
            <div className="text-gray-300 font-mono mb-4">
              - <a href="mailto:info@fables.monster" className="text-red-400 hover:underline">info@fables.monster</a>
            </div>

            <div className="text-sm text-gray-400 font-mono">
              {dict.licenseDetailsLabel}{' '}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://creativecommons.org/licenses/by-nc-sa/4.0/
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/lost-mark`}
              className="bg-red-700 hover:bg-red-600 text-white px-8 py-4 font-mono font-bold transition-colors border border-red-600 text-center"
            >
              {dict.actions.backToProject}
            </Link>
            <Link
              href={`/${lang}/projects`}
              className="bg-transparent border-2 border-red-700 text-red-400 hover:bg-red-700 hover:text-white px-8 py-4 font-mono font-bold transition-colors text-center"
            >
              {dict.actions.viewProjects}
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
