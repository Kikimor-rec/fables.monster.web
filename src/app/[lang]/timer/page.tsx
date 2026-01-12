import { getDictionary } from '@/lib/i18n';
import TimerClient from './TimerClient';

export const revalidate = 86400;

export default async function TimerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');
  return <TimerClient lang={lang} dict={dict.timer} />;
}
