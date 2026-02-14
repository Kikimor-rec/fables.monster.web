import { getDictionary } from '@/lib/i18n';
import type { Metadata } from 'next';
import TimerClient from './TimerClient';

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');

  return {
    title: dict.timer.meta?.title || 'Chronometer Terminal | Fables Monster Studio',
    description: dict.timer.meta?.description || 'Digital countdown timer with terminal interface for tabletop gaming sessions.',
    alternates: {
      canonical: `https://fables.monster/${lang}/timer`,
      languages: {
        en: 'https://fables.monster/en/timer',
        ru: 'https://fables.monster/ru/timer',
      },
    },
  };
}

export default async function TimerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');
  return <TimerClient lang={lang} dict={dict.timer} />;
}
