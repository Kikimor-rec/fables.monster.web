import { Metadata } from 'next'
import LostMarkTerminalClient from './TerminalClient';
import { getDictionary } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'terminal');
  const meta = dict.meta;
  const imageUrl = 'https://fables.monster/images/lost-mark/lm_promo_1.webp';
  const openGraphLocale = lang === 'ru' ? 'ru_RU' : 'en_US';

  return {
    title: meta?.title || 'Lost Mark Terminal - Interactive Mothership RPG Experience',
    description: meta?.description || 'Access the Lost Mark terminal interface. Experience the horror of the Parallax Mining Station through an interactive computer terminal simulation.',
    keywords: meta?.keywords || 'Mothership RPG, interactive terminal, Lost Mark adventure, horror RPG, sci-fi interface, space station computer',
    openGraph: {
      title: meta?.ogTitle || meta?.title || 'Lost Mark Terminal - Interactive Horror Experience',
      description: meta?.ogDescription || meta?.description || 'Step into the digital nightmare of Parallax Mining Station through this immersive terminal interface.',
      url: `https://fables.monster/${lang}/lost-mark/terminal`,
      siteName: 'Fables Monster Studio',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: meta?.imageAlt || 'Lost Mark Terminal Interface',
        },
      ],
      locale: openGraphLocale,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta?.twitterTitle || meta?.ogTitle || meta?.title || 'Lost Mark Terminal - Interactive Horror Experience',
      description: meta?.twitterDescription || meta?.ogDescription || meta?.description || 'Experience the horror through an interactive terminal interface.',
      images: [imageUrl],
    },
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `https://fables.monster/${lang}/lost-mark/terminal`,
      languages: {
        en: 'https://fables.monster/en/lost-mark/terminal',
        ru: 'https://fables.monster/ru/lost-mark/terminal',
      },
    },
  };
}

export const revalidate = 86400;

export default async function LostMarkTerminalPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'terminal');
  return <LostMarkTerminalClient lang={lang} dict={dict as unknown as Parameters<typeof LostMarkTerminalClient>[0]['dict']} />;
}
