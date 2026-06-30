import type { FooterDict, Language, NavDict } from '@/types/i18n';

export type SiteNavItem = {
  href: string;
  label: string;
  description?: string;
  exact?: boolean;
  external?: boolean;
};

export type SocialNavItem = SiteNavItem & {
  icon: string;
};

const withLang = (lang: string, path = '') => `/${lang}${path}`;

export function buildLocalizedHref(lang: string, path = '') {
  return withLang(lang, path);
}

export function switchLanguagePath(pathname: string | null, newLang: Language) {
  if (!pathname) {
    return `/${newLang}`;
  }

  const segments = pathname.split('/');
  if (segments.length > 1 && (segments[1] === 'en' || segments[1] === 'ru')) {
    segments[1] = newLang;
    return segments.join('/') || `/${newLang}`;
  }

  return `/${newLang}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

export function getPrimaryNavigation(lang: string, dict?: Partial<NavDict>): SiteNavItem[] {
  return [
    {
      href: withLang(lang, '/projects'),
      label: dict?.work || dict?.projects || 'WORK',
      description: dict?.featuredWork || 'Featured case files',
    },
    {
      href: withLang(lang, '/vtt'),
      label: dict?.vttServices || dict?.vtt || 'VTT SERVICES',
      description: 'Foundry, Roll20, and digital tabletop production',
    },
    {
      href: withLang(lang, '/about'),
      label: dict?.studio || dict?.about || 'STUDIO',
      description: 'People, process, and values',
    },
    {
      href: withLang(lang, '/contact'),
      label: dict?.contact || 'CONTACT',
      description: 'Commissions, publishing, and support',
    },
  ];
}

export function getHeaderCta(lang: string, dict?: Partial<NavDict>): SiteNavItem {
  return {
    href: withLang(lang, '/newsletter/subscribe'),
    label: dict?.getUpdates || 'GET UPDATES',
    description: 'Release alerts and studio transmissions',
  };
}

export function getFeaturedWork(lang: string, dict?: Partial<FooterDict>): SiteNavItem[] {
  return [
    {
      href: withLang(lang, '/lost-mark'),
      label: dict?.projectLostMark || 'The Lost Mark',
      description: 'Mothership sci-fi horror dossier',
    },
    {
      href: withLang(lang, '/career-twilight'),
      label: dict?.projectCareerTwilight || 'Career Twilight',
      description: 'Corporate extraction case file',
    },
    {
      href: withLang(lang, '/holiday-audit-kramp'),
      label: dict?.projectKramp || 'Holiday Audit: Kramp.exe',
      description: 'Festive bureaucratic horror',
    },
    {
      href: withLang(lang, '/expedition-418'),
      label: dict?.projectExpedition || 'Expedition-418',
      description: 'Field report in development',
    },
    {
      href: withLang(lang, '/projects'),
      label: dict?.allProjects || 'All projects ->',
      description: 'Open the complete archive',
    },
  ];
}

export function getUtilityLinks(lang: string, dict?: Partial<FooterDict>): SiteNavItem[] {
  return [
    {
      href: withLang(lang, '/lost-mark/terminal'),
      label: dict?.lostMarkTerminal || 'Silk Star Terminal',
      description: 'Lost Mark interactive artifact',
    },
    {
      href: withLang(lang, '/timer'),
      label: dict?.chronometer || 'Chronometer',
      description: 'Scenario timer and tension tool',
    },
    {
      href: withLang(lang, '/newsletter/subscribe'),
      label: dict?.getUpdates || dict?.newsletter || 'Get updates',
      description: 'Studio newsletter',
    },
  ];
}

export function getFooterLinkGroups(lang: string, dict?: Partial<FooterDict>, featuredLinks?: SiteNavItem[]) {
  const featuredWorkLinks = featuredLinks && featuredLinks.length > 0 ? featuredLinks : getFeaturedWork(lang, dict);

  return [
    {
      title: dict?.featuredWork || dict?.projects || 'FEATURED WORK',
      ariaLabel: dict?.projectsAriaLabel || 'Featured work',
      links: featuredWorkLinks,
    },
    {
      title: dict?.studioServices || dict?.links || 'STUDIO / SERVICES',
      ariaLabel: dict?.linksAriaLabel || 'Studio and services',
      links: [
        {
          href: withLang(lang, '/vtt'),
          label: dict?.vttServices || 'VTT Services',
        },
        {
          href: withLang(lang, '/about'),
          label: dict?.about || 'About',
        },
        {
          href: withLang(lang, '/contact'),
          label: dict?.contact || 'Contact',
        },
        {
          href: withLang(lang, '/privacy'),
          label: dict?.privacy || 'Privacy',
        },
      ],
    },
    {
      title: dict?.tools || 'TOOLS / EXTRAS',
      ariaLabel: dict?.tools || 'Tools and extras',
      links: getUtilityLinks(lang, dict),
    },
  ];
}

export function getSocialLinks(): SocialNavItem[] {
  return [
    {
      href: 'https://discord.gg/uw2uvny7n6',
      icon: '/logos/Discord-Symbol-White.svg',
      label: 'Discord',
      description: 'Join our community',
      external: true,
    },
    {
      href: 'https://fablesmonster.itch.io/',
      icon: '/itchio-logo-textless-white.svg',
      label: 'Itch.io',
      description: 'Get our games',
      external: true,
    },
    {
      href: 'https://www.drivethrurpg.com/en/publisher/30815/fables-monster?affiliate_id=2863466',
      icon: '/logos/dtrpg-logo-small.png',
      label: 'DriveThruRPG',
      description: 'RPG collection',
      external: true,
    },
    {
      href: 'https://patreon.com/FablesMonster?fables.monster',
      icon: '/logos/PATREON_SYMBOL_1_WHITE_RGB.svg',
      label: 'Patreon',
      description: 'Support us',
      external: true,
    },
    {
      href: 'https://boosty.to/fables.monster',
      icon: '/logos/boosty-logo-white.svg',
      label: 'Boosty',
      description: 'Support us',
      external: true,
    },
    {
      href: 'https://bsky.app/profile/fablesmonster.bsky.social',
      icon: '/logos/bluesky-logo.svg',
      label: 'Bluesky',
      description: 'Follow us',
      external: true,
    },
    {
      href: 'https://www.youtube.com/@fables.monster',
      icon: '/logos/yt_icon_mono_dark.png',
      label: 'YouTube',
      description: 'Watch our videos',
      external: true,
    },
    {
      href: 'mailto:info@fables.monster',
      icon: '/logos/mail-512.png',
      label: 'Email',
      description: 'Contact us',
    },
  ];
}
