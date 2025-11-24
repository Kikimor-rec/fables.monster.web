import { Analytics } from '@vercel/analytics/react';
import { Orbitron, Rajdhani } from 'next/font/google';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import './globals.css';
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

export const metadata: Metadata = {
    metadataBase: new URL('https://fables.monster'),
    title: {
        default: 'Fables & Monster',
        template: '%s | Fables & Monster'
    },
    description: 'Indie game development studio specializing in narrative-driven horror and sci-fi experiences',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
            <body className="bg-black text-white">
                {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
                <Navigation />
                {children}
                <Footer />
                <Analytics />
            </body>
        </html>
    );
}
