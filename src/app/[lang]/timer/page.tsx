import { getDictionary } from '@/lib/i18n';
import TimerClient from './TimerClient';

export const revalidate = 86400;

interface TimerDict {
  title?: string;
  status?: {
    completed?: string;
    running?: string;
    paused?: string;
    ready?: string;
    standby?: string;
  };
  boot?: {
    initializing?: string;
    loading?: string;
    calibrating?: string;
    syncing?: string;
    ready?: string;
  };
  labels?: {
    setDuration?: string;
    hrs?: string;
    min?: string;
    sec?: string;
    remainingTime?: string;
  };
  buttons?: {
    initialize?: string;
    start?: string;
    running?: string;
    pause?: string;
    resume?: string;
    reset?: string;
    clear?: string;
    return?: string;
  };
  messages?: {
    sequenceComplete?: string;
  };
}

interface CommonDict {
  timer?: TimerDict;
}

export default async function TimerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common') as CommonDict;
  return <TimerClient lang={lang} dict={dict.timer} />;
}
