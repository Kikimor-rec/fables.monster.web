import { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, "privacy");

  return {
    title: dict.metaTitle,
    description: dict.metaDescription,
    alternates: {
      canonical: `https://fables.monster/${lang}/privacy`,
      languages: {
        en: "https://fables.monster/en/privacy",
        ru: "https://fables.monster/ru/privacy",
      },
    },
  };
}

export default async function PrivacyPolicy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, "privacy");

  return (
    <div className="bg-black min-h-screen">
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-orbitron tracking-wider text-glow-lg text-center">
            {dict.title}
          </h1>
          <p className="text-center text-gray-400 font-rajdhani text-lg">{dict.lastUpdated}</p>
        </div>
      </section>

      <section className="py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-black border border-red-700 p-8 mb-8">
            <p className="text-gray-300 font-rajdhani text-lg leading-relaxed">{dict.intro}</p>
          </div>

          {dict.sections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <div className="bg-black border border-red-700 p-8">
                <h2 className="text-2xl font-bold text-white mb-4 font-orbitron tracking-wide text-glow-sm">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.content.map((paragraph, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-gray-300 font-rajdhani text-lg leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="text-center mt-12">
            <Link
              href={`/${lang}`}
              className="inline-block bg-red-700 hover:bg-red-600 text-white px-8 py-3 font-orbitron font-bold transition-colors border border-red-600"
            >
              {dict.backToHome}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
