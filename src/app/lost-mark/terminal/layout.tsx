import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "SILK STAR Terminal Access | Lost Mark",
  description: "Secure terminal access to SILK STAR ship systems. Classification required.",
  robots: "noindex, nofollow",
};

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-screen bg-black text-green-400 font-mono antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
