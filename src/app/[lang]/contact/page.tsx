import { Metadata } from 'next';
import Image from 'next/image';
import FadeIn from '@/components/FadeIn';
import ContactForm from '@/components/ContactForm';
import { buildSocialMetadata } from '@/lib/metadata';
import { getDictionary } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');
  const title = dict.contact.metaTitle || 'Contact';
  const description = dict.contact.metaDescription || 'Get in touch with Fables Monster Studio';
  const social = buildSocialMetadata({
    lang,
    path: '/contact',
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

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');

  const channels = [
    {
      href: 'https://discord.gg/eAwK9DfKf4',
      title: 'Discord',
      image: '/logos/discord-badge-color.png',
      imageWidth: 200,
      imageHeight: 40,
    },
    {
      href: 'https://fablesmonster.itch.io/',
      title: 'Itch.io',
      image: '/logos/logo-white-new.svg',
      imageWidth: 200,
      imageHeight: 40,
    },
    {
      href: 'https://patreon.com/FablesMonster?fables.monster',
      title: 'Patreon',
      image: '/logos/patreon-badge-color.png',
      imageWidth: 200,
      imageHeight: 40,
    },
    {
      href: 'https://www.drivethrurpg.com/en/publisher/30815/Stepan%20Kulikov?affiliate_id=2863466',
      title: 'DriveThruRPG',
      image: '/logos/drivethrurpg-badge-color.png',
      imageWidth: 200,
      imageHeight: 40,
    },
  ];

  return (
    <div className="fm-page">
      <section className="fm-page-hero">
        <div className="fm-shell">
          <FadeIn>
            <div className="fm-page-hero-panel text-center">
              <p className="fm-page-kicker mb-5">{dict.contact.heroKicker || 'OPEN COMM CHANNEL'}</p>
              <h1 className="fm-display-title font-bold text-white font-orbitron tracking-[0.06em] text-glow-lg">
                {dict.contact.title || 'CONTACT'}
              </h1>
              <p className="fm-page-subtitle mt-5">
                {dict.contact.heroDescription ||
                  'Collaborations, release questions, and partnership ideas. Reach us through your preferred channel or the direct form.'}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="fm-section fm-section-bordered">
        <div className="fm-shell grid lg:grid-cols-[0.92fr_1.08fr] gap-6 lg:gap-8">
          <FadeIn>
            <aside className="fm-panel h-full">
              <h2 className="text-3xl font-bold text-white mb-5 font-orbitron tracking-wide">
                {dict.contact.getInTouch || 'GET IN TOUCH'}
              </h2>
              <p className="text-zinc-300 font-rajdhani text-lg leading-relaxed mb-6">
                {dict.contact.channelsLabel || 'Official studio channels for discussion, updates, and support:'}
              </p>

              <div className="space-y-3">
                {channels.map((channel) => (
                  <a
                    key={channel.title}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={channel.title}
                    className="group fm-panel fm-panel-muted flex items-center justify-between gap-4 transition-colors hover:border-red-500/70"
                  >
                    <Image
                      src={channel.image}
                      alt={channel.title}
                      width={channel.imageWidth}
                      height={channel.imageHeight}
                      className="h-10 w-auto"
                    />
                    <span className="fm-link-arrow text-sm font-orbitron tracking-[0.14em] text-zinc-400 group-hover:text-red-300">
                      {dict.contact.channelAction || 'ENTER'}
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-6 border border-zinc-800 bg-black/40 p-4">
                <p className="text-xs font-orbitron tracking-[0.18em] text-zinc-500 mb-2">
                  {dict.contact.directChannelLabel || 'DIRECT CHANNEL'}
                </p>
                <a href="mailto:info@fables.monster" className="text-cyan-300 font-rajdhani text-lg hover:text-cyan-200 transition-colors">
                  info@fables.monster
                </a>
              </div>
            </aside>
          </FadeIn>

          <FadeIn delay={0.1}>
            <ContactForm dict={dict.contact.form} />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
