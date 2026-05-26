import Link from "next/link";
import StoreButton from "@/components/StoreButton";

interface CareerTwilightHeroProps {
  lang: string;
  dict: {
    hero: { kicker: string; title: string; tagline: string; badge: string };
    buttons: { itch: string; drivethru: string; rpgbook: string; maps: string };
    cta: { followPrompt: string; discord: string };
    backToProjects: string;
  };
  urls: {
    itch: string;
    drivethru: string;
    rpgbook: string;
    maps: string;
  };
}

export default function CareerTwilightHero({ lang, dict, urls }: CareerTwilightHeroProps) {
  const isRussian = lang === "ru";

  return (
    <section className="relative overflow-hidden border-b border-cyan-500/30">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080d12] via-[#0a1118] to-[#0d1520]" />
      <div className="absolute inset-0 opacity-[0.03] ct-hero-scanlines" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-14 pt-18 md:py-20 text-center">
        <Link
          href={`/${lang}/projects`}
          className="inline-block mb-6 text-sm font-mono text-cyan-400/70 hover:text-cyan-300 transition-colors"
        >
          {dict.backToProjects}
        </Link>

        <p className="font-mono text-xs tracking-[0.3em] text-cyan-400/60 mb-4 uppercase">
          {dict.hero.kicker}
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-orbitron tracking-[0.05em] text-white mb-6 ct-hero-title">
          {dict.hero.title}
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed">
          {dict.hero.tagline}
        </p>

        <span className="inline-block px-3 py-1 text-xs font-mono tracking-wider text-cyan-300 border border-cyan-500/40 bg-cyan-500/10 mb-7">
          {dict.hero.badge}
        </span>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          {isRussian ? (
            <StoreButton store="rpgbook" href={urls.rpgbook} label={dict.buttons.rpgbook} />
          ) : (
            <>
              <StoreButton store="drivethrurpg" href={urls.drivethru} label={dict.buttons.drivethru} />
              <StoreButton store="itch" href={urls.itch} label={dict.buttons.itch} />
            </>
          )}
          <div>
            <a
              href={urls.maps}
              className="inline-flex w-full items-center justify-center gap-2 border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 font-orbitron text-sm font-bold uppercase tracking-wide text-cyan-100 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-cyan-300/60 focus:ring-offset-2 focus:ring-offset-black"
            >
              {dict.buttons.maps}
            </a>
          </div>
        </div>

        {/* Follow CTA */}
        <p className="mt-6 text-sm text-gray-400 font-mono">
          {dict.cta.followPrompt}{' '}
          <a
            href="https://fablesmonster.itch.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            itch.io
          </a>
          {', '}
          <a
            href="https://drivethrurpg.com/browse/pub/22136/Fables-Monster-Studio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            DriveThruRPG
          </a>
          {' '}
          <a
            href="https://discord.gg/uw2uvny7n6"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {dict.cta.discord}
          </a>
        </p>
      </div>
    </section>
  );
}
