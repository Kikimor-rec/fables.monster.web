import { Metadata } from 'next'
import TeamMember from "@/components/TeamMember";
import { getDictionary } from '@/lib/i18n';


export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');
  
  return {
    title: `${dict.nav?.about || 'About'} | Fables Monster Studio`,
    description: 'Meet the team behind Fables Monster Studio - talented creators crafting immersive tabletop RPG experiences, horror adventures, and sci-fi campaigns.',
    alternates: {
      canonical: `https://fables.monster/${lang}/about`,
      languages: {
        'en': 'https://fables.monster/en/about',
        'ru': 'https://fables.monster/ru/about',
      },
    },
  };
}

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang, 'common');

  return (
    <div className="min-h-screen bg-black">
      
      {/* Header */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 font-orbitron tracking-wider text-glow-lg">
            {dict.about?.title || 'ABOUT US'}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-rajdhani uppercase tracking-widest">
            {dict.about?.subtitle || 'Meet the team behind Fables Monster Studio'}
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-20 bg-black border-t border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(dict.about?.values || []).map((value, index) => (
              <div key={index} className="bg-gray-900/50 p-8 border border-gray-800 text-center">
                <div className="text-4xl mb-4 text-red-500 font-orbitron">
                  {value.icon === 'QUALITY' ? '★' : value.icon === 'HUMAN' ? '♟' : '♥'}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 font-orbitron">{value.title}</h3>
                <p className="text-gray-400 font-rajdhani">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-20 bg-black border-t border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center font-orbitron">
            {lang === 'ru' ? 'КОМАНДА' : 'THE CREW'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(dict.team || []).map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
