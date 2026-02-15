import Link from 'next/link';
import { StayConnectedDict } from '@/types/i18n';

interface StayConnectedSectionProps {
  lang: string;
  dict: StayConnectedDict;
  variant?: 'default' | 'cyberpunk' | 'expedition';
}

export default function StayConnectedSection({
  lang,
  dict,
  variant = 'default'
}: StayConnectedSectionProps) {
  const isCyberpunk = variant === 'cyberpunk';
  const isExpedition = variant === 'expedition';

  const sectionClasses = isCyberpunk
    ? 'border-t border-cyan-700/30'
    : isExpedition
      ? 'border-t border-[#505c64] bg-[#18213c]'
      : 'border-t border-red-700/70';

  const overlayClasses = isCyberpunk
    ? 'bg-[radial-gradient(circle_at_15%_0%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_85%_100%,rgba(217,70,239,0.16),transparent_45%)]'
    : isExpedition
      ? 'bg-[radial-gradient(circle_at_15%_0%,rgba(246,123,64,0.2),transparent_42%),radial-gradient(circle_at_85%_100%,rgba(236,84,76,0.16),transparent_44%)]'
      : 'bg-[radial-gradient(circle_at_15%_0%,rgba(239,68,68,0.18),transparent_45%),radial-gradient(circle_at_85%_100%,rgba(34,211,238,0.12),transparent_45%)]';

  const containerClasses = isExpedition
    ? 'max-w-5xl border border-[#505c64] bg-[#202b49] px-6 py-10 shadow-[8px_8px_0_0_rgba(236,84,76,0.35)] sm:px-8'
    : 'max-w-4xl';

  return (
    <section className={`relative z-10 overflow-hidden bg-black py-16 sm:py-20 ${sectionClasses}`}>
      <div className={`absolute inset-0 pointer-events-none ${overlayClasses}`}></div>
      <div className={`mx-auto text-center px-4 sm:px-6 relative z-10 ${containerClasses}`}>
        <div className="mb-8">
          <div className={`mb-2 font-mono text-sm tracking-[0.3em] ${isCyberpunk ? 'text-cyan-400' : isExpedition ? 'text-[#f7a37a]' : 'text-red-400'}`}>
            {dict.label}
          </div>
          <h2 className={`mb-6 text-3xl font-bold sm:text-4xl ${isExpedition ? 'text-[#c6d9c6] [font-family:var(--font-exp-heading)] uppercase' : 'font-orbitron text-white'}`}>
            {dict.title}{' '}
            <span className={isCyberpunk ? 'text-fuchsia-400' : isExpedition ? 'text-[#f67b40]' : 'text-red-500'}>
              {dict.titleHighlight}
            </span>
          </h2>
          <p className={`mb-8 text-lg sm:text-xl ${isExpedition ? 'text-[#d9e7d9] [font-family:var(--font-exp-body)]' : 'font-rajdhani text-gray-300'}`}>
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
                : isExpedition
                  ? 'bg-[#f67b40] hover:bg-[#ec544c] text-[#18213c] border-[#f67b40] hover:text-[#f5efe0] [font-family:var(--font-exp-heading)] uppercase min-w-44'
                : 'bg-red-700 hover:bg-red-600 text-white border-red-500 hover:box-glow'
            }`}
          >
            {dict.discord}
          </a>
          <Link
            href={`/${lang}/newsletter/subscribe`}
            className={`px-8 py-4 text-lg font-orbitron font-bold transition-all border-2 ${
              isCyberpunk
                ? 'bg-transparent border-fuchsia-500 text-fuchsia-400 hover:bg-fuchsia-500 hover:text-black'
                : isExpedition
                  ? 'bg-transparent border-[#c6d9c6] text-[#c6d9c6] hover:bg-[#c6d9c6] hover:text-[#18213c] [font-family:var(--font-exp-heading)] uppercase min-w-44'
                : 'bg-transparent border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 hover:text-white'
            }`}
          >
            {dict.newsletter}
          </Link>
          <Link
            href={`/${lang}/projects`}
            className={`px-8 py-4 text-lg font-orbitron font-bold transition-all border-2 ${
              isExpedition
                ? 'border-[#505c64] text-[#a9b9b5] hover:border-[#ec544c] hover:text-[#f7a37a] [font-family:var(--font-exp-heading)] uppercase min-w-44'
                : 'border-gray-600 text-gray-400 hover:border-white hover:text-white'
            }`}
          >
            {dict.allProjects}
          </Link>
        </div>
      </div>
    </section>
  );
}
