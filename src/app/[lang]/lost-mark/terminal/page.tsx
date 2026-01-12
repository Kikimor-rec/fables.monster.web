import { Metadata } from 'next'
import LostMarkTerminalClient from './TerminalClient';

export const metadata: Metadata = {
  title: 'Lost Mark Terminal - Interactive Mothership RPG Experience',
  description: 'Access the Lost Mark terminal interface. Experience the horror of the Parallax Mining Station through an interactive computer terminal simulation.',
  keywords: 'Mothership RPG, interactive terminal, Lost Mark adventure, horror RPG, sci-fi interface, space station computer',
  openGraph: {
    title: 'Lost Mark Terminal - Interactive Horror Experience',
    description: 'Step into the digital nightmare of Parallax Mining Station through this immersive terminal interface.',
    url: 'https://fables.monster/lost-mark/terminal',
    siteName: 'Fables Monster Studio',
    images: [
      {
        url: 'https://fables.monster/lost-mark/terminal-interface.jpg',
        width: 1200,
        height: 630,
        alt: 'Lost Mark Terminal Interface',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lost Mark Terminal - Interactive Horror Experience',
    description: 'Experience the horror through an interactive terminal interface.',
    images: ['https://fables.monster/lost-mark/terminal-interface.jpg'],
  },
  alternates: {
    canonical: 'https://fables.monster/lost-mark/terminal',
  },
}

export const revalidate = 86400;

import { getDictionary } from '@/lib/i18n';

export default async function LostMarkTerminalPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'terminal');
  return <LostMarkTerminalClient lang={lang} dict={dict as unknown as Parameters<typeof LostMarkTerminalClient>[0]['dict']} />;
}
