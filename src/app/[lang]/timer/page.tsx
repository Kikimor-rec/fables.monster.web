import { getDictionary } from '@/lib/i18n';
import { buildSocialMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import TimerClient from './TimerClient';

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');
  const title = dict.timer.meta?.title || 'Chronometer Terminal';
  const description = dict.timer.meta?.description || 'Digital countdown timer with terminal interface for tabletop gaming sessions.';
  const social = buildSocialMetadata({
    lang,
    path: '/timer',
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

export default async function TimerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');
  return <TimerClient lang={lang} dict={dict.timer} />;
}
