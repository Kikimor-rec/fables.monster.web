import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...createMetadata(
    'Chronometer Terminal | Fables Monster Studio',
    'Digital countdown timer with terminal interface for tabletop gaming sessions',
    '/timer',
  ),
  keywords: 'timer, countdown, tabletop gaming, RPG, terminal, chronometer',
};

export default function TimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
