import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Chronometer Terminal | Fables Monster Studio',
    description: 'Digital countdown timer with terminal interface for tabletop gaming sessions',
    path: '/timer',
    image: '/opengraph-image',
  }),
  keywords: 'timer, countdown, tabletop gaming, RPG, terminal, chronometer',
};

export default function TimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
