import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildSocialMetadata } from "@/lib/metadata";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'newsletter');
  const title = dict.confirmation.metaTitle || 'Subscription Confirmation';
  const description = dict.confirmation.metaDescription || 'Confirm your newsletter subscription';
  const social = buildSocialMetadata({
    lang,
    path: '/newsletter/confirm',
    title,
    description,
    imagePath: `/${lang}/opengraph-image`,
  });

  return {
    title,
    description,
    ...social,
  };
}

export default async function NewsletterConfirm({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'newsletter');

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 font-orbitron tracking-[0.06em] text-glow-lg">
              {dict.confirmation.title || 'CONFIRMATION'}
            </h1>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Success State */}
            <div className="bg-black border border-green-500 p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <svg className="w-12 h-12 text-green-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <h2 className="text-3xl font-bold text-white font-orbitron">
                  {dict.confirmation.success.heading}
                </h2>
              </div>
              <p className="text-gray-300 font-rajdhani text-lg mb-6">
                {dict.confirmation.success.message}
              </p>
              <Link
                href={`/${lang}`}
                className="inline-block bg-red-700 hover:bg-red-600 text-white px-8 py-3 font-orbitron font-bold transition-colors border border-red-600"
              >
                {dict.confirmation.success.action}
              </Link>
            </div>

            {/* Pending Confirmation Info */}
            <div className="bg-black border border-yellow-500 p-8">
              <div className="flex items-center gap-4 mb-6">
                <svg className="w-12 h-12 text-yellow-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="text-2xl font-bold text-white font-orbitron">
                  {dict.confirmation.pending?.heading || 'CHECK YOUR EMAIL'}
                </h3>
              </div>
              <p className="text-gray-300 font-rajdhani text-lg mb-4">
                {dict.confirmation.pending?.message || 'We\'ve sent a confirmation email to your address. Click the link in the email to complete your subscription.'}
              </p>
              <p className="text-gray-400 font-rajdhani text-sm">
                {dict.confirmation.pending?.hint || 'Didn\'t receive the email? Check your spam folder or try subscribing again.'}
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href={`/${lang}/newsletter/subscribe`}
              className="text-gray-400 hover:text-red-400 transition-colors font-rajdhani text-sm"
            >
              {dict.confirmation.backToSubscribe || '← Back to subscription form'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
