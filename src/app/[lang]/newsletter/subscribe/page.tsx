import { Metadata } from "next";
import NewsletterForm from "@/components/NewsletterForm";
import { getDictionary } from "@/lib/i18n";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'newsletter');

  return {
    title: dict.subscribe.metaTitle || 'Subscribe to Newsletter | Fables Monster Studio',
    description: dict.subscribe.metaDescription || 'Subscribe to Fables Monster Studio newsletter',
    alternates: {
      canonical: `https://fables.monster/${lang}/newsletter/subscribe`,
      languages: {
        'en': 'https://fables.monster/en/newsletter/subscribe',
        'ru': 'https://fables.monster/ru/newsletter/subscribe',
      },
    },
  };
}

export default async function NewsletterSubscribe({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'newsletter');

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-orbitron tracking-wider text-glow-lg">
              {dict.subscribe.title || 'SUBSCRIBE'}
            </h1>
            <p className="text-xl text-gray-300 font-rajdhani max-w-2xl mx-auto">
              {dict.subscribe.description}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <NewsletterForm dict={dict.subscribe} lang={lang} />
          </div>

          <div className="text-center mt-8">
            <Link
              href={`/${lang}`}
              className="text-gray-400 hover:text-red-400 transition-colors font-rajdhani text-sm"
            >
              ← {lang === 'ru' ? 'Вернуться на главную' : 'Back to home'}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 font-orbitron tracking-wide text-center">
            {lang === 'ru' ? 'ЧТО ВЫ ПОЛУЧИТЕ' : 'WHAT YOU\'LL GET'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black border border-red-700 p-6 text-center">
              <div className="text-4xl mb-4">🎲</div>
              <h3 className="text-xl font-bold text-white mb-2 font-orbitron">
                {lang === 'ru' ? 'НОВЫЕ РЕЛИЗЫ' : 'NEW RELEASES'}
              </h3>
              <p className="text-gray-400 font-rajdhani">
                {lang === 'ru'
                  ? 'Узнавайте первыми о новых проектах и релизах'
                  : 'Be the first to know about new projects and releases'}
              </p>
            </div>

            <div className="bg-black border border-red-700 p-6 text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-white mb-2 font-orbitron">
                {lang === 'ru' ? 'ЭКСКЛЮЗИВНЫЙ КОНТЕНТ' : 'EXCLUSIVE CONTENT'}
              </h3>
              <p className="text-gray-400 font-rajdhani">
                {lang === 'ru'
                  ? 'За кулисами разработки и эксклюзивные материалы'
                  : 'Behind-the-scenes content and exclusive materials'}
              </p>
            </div>

            <div className="bg-black border border-red-700 p-6 text-center">
              <div className="text-4xl mb-4">📰</div>
              <h3 className="text-xl font-bold text-white mb-2 font-orbitron">
                {lang === 'ru' ? 'НОВОСТИ СТУДИИ' : 'STUDIO NEWS'}
              </h3>
              <p className="text-gray-400 font-rajdhani">
                {lang === 'ru'
                  ? 'Важные анонсы и обновления проектов'
                  : 'Important announcements and project updates'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
