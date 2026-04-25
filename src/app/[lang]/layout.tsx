import { Analytics } from '@vercel/analytics/react';
import { Orbitron, Rajdhani, Nunito } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SpeedInsightsClient from '@/components/SpeedInsightsClient';
import CursorGlow from '@/components/CursorGlow';
import GlobalExperience from '@/components/GlobalExperience';
import PageTransition from '@/components/PageTransition';
import { languages } from '@/i18n/settings';
import { getDictionary } from '@/lib/i18n';
import { JsonLd, buildOrganizationJsonLd, buildWebsiteJsonLd } from '@/lib/seo/jsonld';
import '../globals.css';
import type { Metadata } from 'next';

const orbitron = Orbitron({
    subsets: ['latin'],
    variable: '--font-orbitron',
    display: 'swap',
    weight: ['400', '700', '900'],
});

const rajdhani = Rajdhani({
    subsets: ['latin'],
    variable: '--font-rajdhani',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
});

const nunito = Nunito({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-nunito',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://fables.monster'),
    title: {
        default: 'Fables Monster Studio',
        template: '%s | Fables Monster Studio'
    },
    description: 'Independent tabletop RPG content creation studio. Specializing in horror, sci-fi, and supernatural adventures for Mothership RPG, D&D, and more.',
    keywords: ['tabletop RPG', 'TTRPG', 'Mothership RPG', 'indie games', 'horror RPG', 'sci-fi RPG', 'D&D adventures'],
    authors: [{ name: 'Fables Monster Studio', url: 'https://fables.monster' }],
    creator: 'Fables Monster Studio',
    publisher: 'Fables Monster Studio',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        alternateLocale: 'ru_RU',
        siteName: 'Fables Monster Studio',
    },
    twitter: {
        card: 'summary_large_image',
        creator: '@fablesmonster',
        site: '@fablesmonster',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang, 'common');
    const newsletterDict = await getDictionary(lang, 'newsletter');
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    const shouldLoadGa = !!gaId && /^G-[A-Z0-9]+$/i.test(gaId) && gaId !== 'G-XXXXXXXXXX';

    return (
        <html lang={lang} className={`${orbitron.variable} ${rajdhani.variable} ${nunito.variable}`}>
            <head>
                <JsonLd id="organization-jsonld" data={buildOrganizationJsonLd()} />
                <JsonLd id="website-jsonld" data={buildWebsiteJsonLd()} />
            </head>
            <body className="bg-black text-white" suppressHydrationWarning>
                {shouldLoadGa && <GoogleAnalytics gaId={gaId} />}
                    <GlobalExperience />
                    <CursorGlow />
                    <Navigation lang={lang} dict={dict.nav || {}} />
                    <main id="main-content">
                        <PageTransition>
                            {children}
                        </PageTransition>
                    </main>
                    <Footer lang={lang} dict={dict.footer || {}} newsletterDict={newsletterDict || undefined} />
                <Analytics />
                <SpeedInsightsClient />
            </body>
        </html>
    );
}
