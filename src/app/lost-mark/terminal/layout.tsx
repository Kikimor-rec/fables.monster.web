import type { Metadata } from "next";

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
    <div className="min-h-screen bg-black">
      {/* Терминал занимает весь экран с учетом header/footer */}
      <div className="pt-16 pb-16 md:pt-20 md:pb-20">
        {children}
      </div>
    </div>
  );
}
