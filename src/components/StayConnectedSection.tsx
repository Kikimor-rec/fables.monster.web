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
      ? 'border-t border-exp-border bg-exp-bg'
      : 'border-t border-red-700/70';

  const overlayClasses = isCyberpunk
    ? 'bg-[radial-gradient(circle_at_15%_0%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_85%_100%,rgba(217,70,239,0.16),transparent_45%)]'
    : isExpedition
      ? 'bg-[radial-gradient(circle_at_15%_0%,rgba(246,123,64,0.2),transparent_42%),radial-gradient(circle_at_85%_100%,rgba(236,84,76,0.16),transparent_44%)]'
      : 'bg-[radial-gradient(circle_at_15%_0%,rgba(239,68,68,0.18),transparent_45%),radial-gradient(circle_at_85%_100%,rgba(34,211,238,0.12),transparent_45%)]';

  const containerClasses = isExpedition
    ? 'max-w-5xl border border-exp-border bg-exp-bg-alt px-6 py-10 shadow-glow-exp/35 sm:px-8'
    : 'max-w-4xl';

  const focusClasses = isExpedition
    ? 'focus:outline-none focus:ring-2 focus:ring-exp-accent/70 focus:ring-offset-2 focus:ring-offset-exp-bg'
    : isCyberpunk
      ? 'focus:outline-none focus:ring-2 focus:ring-cyan-400/70 focus:ring-offset-2 focus:ring-offset-black'
      : 'focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:ring-offset-2 focus:ring-offset-black';

  return (
    <section className={`relative z-10 overflow-hidden bg-black py-16 sm:py-20 ${sectionClasses}`}>
      <div className={`absolute inset-0 pointer-events-none ${overlayClasses}`}></div>
      <div className={`mx-auto text-center px-4 sm:px-6 relative z-10 ${containerClasses}`}>
        <div className="mb-8">
          <div className={`mb-2 font-mono text-sm tracking-[0.3em] ${isCyberpunk ? 'text-cyan-400' : isExpedition ? 'text-exp-text-secondary' : 'text-red-400'}`}>
            {dict.label}
          </div>
          <h2 className={`mb-6 text-3xl font-bold sm:text-4xl ${isExpedition ? 'text-exp-text-primary [font-family:var(--font-exp-heading)] uppercase' : 'font-orbitron text-white'}`}>
            {dict.title}{' '}
            <span className={isCyberpunk ? 'text-fuchsia-400' : isExpedition ? 'text-exp-accent-alt' : 'text-red-500'}>
              {dict.titleHighlight}
            </span>
          </h2>
          <p className={`mb-8 text-lg sm:text-xl ${isExpedition ? 'text-exp-text-primary/90 [font-family:var(--font-exp-body)]' : 'font-rajdhani text-gray-300'}`}>
            {dict.description}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <a
            href="https://discord.gg/eAwK9DfKf4"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${dict.discord} (opens in new tab)`}
            className={`px-8 py-4 text-lg font-orbitron font-bold transition-all border ${focusClasses} ${
              isCyberpunk
                ? 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.3)]'
                : isExpedition
                  ? 'bg-exp-accent-alt hover:bg-exp-accent text-exp-bg border-exp-accent-alt hover:text-white [font-family:var(--font-exp-heading)] uppercase min-w-44'
                : 'bg-red-700 hover:bg-red-600 text-white border-red-500 hover:box-glow'
            }`}
          >
            {dict.discord}
          </a>
          <Link
            href={`/${lang}/newsletter/subscribe`}
            className={`px-8 py-4 text-lg font-orbitron font-bold transition-all border-2 ${focusClasses} ${
              isCyberpunk
                ? 'bg-transparent border-fuchsia-500 text-fuchsia-400 hover:bg-fuchsia-500 hover:text-black'
                : isExpedition
                  ? 'bg-transparent border-exp-text-primary text-exp-text-primary hover:bg-exp-text-primary hover:text-exp-bg [font-family:var(--font-exp-heading)] uppercase min-w-44'
                : 'bg-transparent border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 hover:text-white'
            }`}
          >
            {dict.newsletter}
          </Link>
          <Link
            href={`/${lang}/projects`}
            className={`px-8 py-4 text-lg font-orbitron font-bold transition-all border-2 ${focusClasses} ${
              isExpedition
                ? 'border-exp-border text-exp-text-muted hover:border-exp-accent hover:text-exp-text-secondary [font-family:var(--font-exp-heading)] uppercase min-w-44'
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
