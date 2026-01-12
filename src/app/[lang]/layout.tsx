import { Analytics } from '@vercel/analytics/react';
import { Orbitron, Rajdhani, Nunito } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { languages } from '@/i18n/settings';
import { getDictionary } from '@/lib/i18n';
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
        default: 'Fables & Monster',
        template: '%s | Fables & Monster'
    },
    description: 'Indie game development studio specializing in narrative-driven horror and sci-fi experiences',
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

    return (
        <html lang={lang} className={`${orbitron.variable} ${rajdhani.variable} ${nunito.variable}`}>
            <body className="bg-black text-white">
                {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
                <Navigation lang={lang} dict={dict.nav || {}} />
                {children}
                <Footer lang={lang} dict={dict.footer || {}} />
                <Analytics />
            </body>
        </html>
    );
}
