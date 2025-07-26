import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fables.monster"),
  title: {
    default: "Fables Monster Studio - Independent Tabletop RPG Creator",
    template: "%s | Fables Monster Studio"
  },
  description: "Independent tabletop RPG content creation studio. Our flagship project Lost Mark is a Sci-Fi horror adventure for Mothership RPG with unique storytelling and immersive gameplay.",
  keywords: "tabletop RPG, indie games, Mothership, Lost Mark, Sci-Fi horror, game development, Fables Monster",
  authors: [{ name: "Fables Monster Studio" }],
  creator: "Fables Monster Studio",
  publisher: "Fables Monster Studio",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Fables Monster Studio - Independent Tabletop RPG Creator",
    description: "Creating unique tabletop RPG worlds and unforgettable stories",
    url: "https://fables.monster",
    siteName: "Fables Monster Studio",
    locale: "en_US",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fables Monster Studio",
    description: "Independent tabletop RPG content creator",
    creator: "@fablesmonster",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://fables.monster"
  },
  verification: {
    google: "your-google-verification-code-here", // Add your actual Google Search Console verification code here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//discord.gg" />
        <link rel="dns-prefetch" href="//github.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Fables Monster Studio',
            url: 'https://fables.monster',
            logo: 'https://fables.monster/logos/logo-white-new.svg',
            sameAs: [
              'https://twitter.com/fablesmonster',
              'https://github.com/Kikimor-rec/fables.monster.web',
              'https://fablesmonster.itch.io/',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'contact@fables.monster',
              contactType: 'customer service',
            },
          })
        }} />
      </head>
      <body className={`${nunito.variable} ${nunito.className} antialiased`} suppressHydrationWarning>
        <Navigation />
        <main className="min-h-screen pt-20 md:pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
