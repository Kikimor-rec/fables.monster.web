import Link from 'next/link';
import { StayConnectedDict } from '@/types/i18n';

interface StayConnectedSectionProps {
  lang: string;
  dict: StayConnectedDict;
  variant?: 'default' | 'cyberpunk';
}

export default function StayConnectedSection({
  lang,
  dict,
  variant = 'default'
}: StayConnectedSectionProps) {
  const isCyberpunk = variant === 'cyberpunk';

  return (
    <section className={`py-20 bg-black relative z-10 ${isCyberpunk ? 'border-t border-cyan-700/30' : 'border-t border-red-700'}`}>
      <div className="max-w-4xl mx-auto text-center px-6">
        <div className="mb-8">
          <div className={`font-mono text-sm mb-2 tracking-[0.3em] ${isCyberpunk ? 'text-cyan-400' : 'text-red-400'}`}>
            {dict.label}
          </div>
          <h2 className="text-4xl font-bold text-white mb-6 font-orbitron">
            {dict.title}{' '}
            <span className={isCyberpunk ? 'text-magenta-400' : 'text-red-500'}>
              {dict.titleHighlight}
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 font-rajdhani">
            {dict.description}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <a
            href="https://discord.gg/eAwK9DfKf4"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-8 py-4 text-lg font-orbitron font-bold transition-all border ${
              isCyberpunk
                ? 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.3)]'
                : 'bg-red-700 hover:bg-red-600 text-white border-red-500 hover:box-glow'
            }`}
          >
            {dict.discord}
          </a>
          <Link
            href={`/${lang}/newsletter/subscribe`}
            className={`px-8 py-4 text-lg font-orbitron font-bold transition-all border-2 ${
              isCyberpunk
                ? 'bg-transparent border-magenta-500 text-magenta-400 hover:bg-magenta-500 hover:text-black'
                : 'bg-transparent border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 hover:text-white'
            }`}
          >
            {dict.newsletter}
          </Link>
          <Link
            href={`/${lang}/projects`}
            className="bg-transparent border-2 border-gray-600 text-gray-400 hover:border-white hover:text-white px-8 py-4 text-lg font-orbitron font-bold transition-all"
          >
            {dict.allProjects}
          </Link>
        </div>
      </div>
    </section>
  );
}
