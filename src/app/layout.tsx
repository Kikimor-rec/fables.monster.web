import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fables Monster Studio - Independent Tabletop RPG Creator",
  description: "Independent tabletop RPG content creation studio. Our flagship project Lost Mark is a cosmic horror adventure for Mothership RPG with unique storytelling and immersive gameplay.",
  keywords: "tabletop RPG, indie games, Mothership, Lost Mark, cosmic horror, game development, Fables Monster",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Fables Monster Studio",
    description: "Independent tabletop RPG content creator",
    creator: "@fablesmonster",
  },
  robots: {
    index: true,
    follow: true,
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
