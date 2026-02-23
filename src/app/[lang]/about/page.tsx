import { Metadata } from 'next';
import TeamMember from '@/components/TeamMember';
import FadeIn from '@/components/FadeIn';
import { buildSocialMetadata } from '@/lib/metadata';
import { getDictionary } from '@/lib/i18n';

const valueMarkers: Record<string, string> = {
  QUALITY: '01',
  HUMAN: '02',
  COMMUNITY: '03',
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');
  const title = dict.nav?.about || 'About';
  const description =
    dict.about?.metaDescription ||
    'Meet the team behind Fables Monster Studio - talented creators crafting immersive tabletop RPG experiences, horror adventures, and sci-fi campaigns.';
  const social = buildSocialMetadata({
    lang,
    path: '/about',
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

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');

  return (
    <div className="fm-page">
      <section className="fm-page-hero">
        <div className="fm-shell">
          <FadeIn>
            <div className="fm-page-hero-panel text-center">
              <p className="fm-page-kicker mb-5">{dict.about?.heroKicker || 'STUDIO DOSSIER'}</p>
              <h1 className="fm-display-title font-bold text-white font-orbitron tracking-[0.06em] text-glow-lg">
                {dict.about?.title || 'ABOUT US'}
              </h1>
              <p className="fm-page-subtitle mt-5">
                {dict.about?.subtitle || 'Meet the team behind Fables Monster Studio'}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="fm-section fm-section-bordered">
        <div className="fm-shell">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(dict.about?.values || []).map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.08}>
                <article className="fm-panel h-full text-center">
                  <span className="inline-flex border border-cyan-900/70 bg-black/70 px-3 py-1 text-cyan-300 font-orbitron text-sm tracking-[0.18em]">
                    {valueMarkers[value.icon] || `0${index + 1}`}
                  </span>
                  <h2 className="text-2xl font-orbitron text-white mt-5 mb-3">{value.title}</h2>
                  <p className="text-zinc-300 font-rajdhani leading-relaxed">{value.description}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="fm-section fm-section-bordered">
        <div className="fm-shell">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="fm-page-kicker mb-4">{dict.about?.rosterKicker || 'TEAM ROSTER'}</p>
              <h2 className="fm-section-title font-bold text-white font-orbitron mb-4">
                {dict.about?.rosterTitle || 'THE CREW'}
              </h2>
              <p className="text-zinc-300 font-rajdhani text-lg">
                {dict.about?.rosterDescription || 'The people building new adventures, visuals, and sound for the worlds of Fables Monster Studio.'}
              </p>
            </div>
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {(dict.team || []).map((member, index) => (
              <FadeIn key={`${member.name}-${index}`} delay={(index % 6) * 0.08}>
                <TeamMember member={member} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
