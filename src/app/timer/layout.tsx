import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chronometer Terminal | Fables Monster Studio',
  description: 'Digital countdown timer with terminal interface for tabletop gaming sessions',
  keywords: 'timer, countdown, tabletop gaming, RPG, terminal, chronometer',
};

export default function TimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
