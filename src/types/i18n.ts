/**
 * Централизованные типы для i18n словарей
 * Единый источник истины для всех переводов
 */

// Поддерживаемые языки
export type Language = 'en' | 'ru';

// Словари для каждой секции
export type DictionaryNamespace = 'common' | 'home' | 'kramp' | 'lost-mark' | 'terminal' | 'newsletter';

// === COMMON DICTIONARY ===

export interface NotFoundDict {
  title: string;
  diagnostic: string;
  heading: string;
  description: string;
  bureaucracy: string;
  neon: string;
  errorCode: string;
  evac: string;
  archives: string;
  terminalLines: string[];
}

export interface TimerDict {
  title: string;
  status: {
    completed: string;
    running: string;
    paused: string;
    ready: string;
    standby: string;
  };
  boot: {
    initializing: string;
    loading: string;
    calibrating: string;
    syncing: string;
    ready: string;
  };
  labels: {
    setDuration: string;
    hrs: string;
    min: string;
    sec: string;
    remainingTime: string;
  };
  buttons: {
    initialize: string;
    start: string;
    running: string;
    pause: string;
    resume: string;
    reset: string;
    clear: string;
    return: string;
  };
  messages: {
    sequenceComplete: string;
  };
}

export interface NavDict {
  home: string;
  projects: string;
  lostMark: string;
  timer: string;
  about: string;
  contact: string;
}

export interface FooterDict {
  tagline: string;
  projects: string;
  links: string;
  about: string;
  contact: string;
  social: string;
  copyright: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  link?: string;
}

export interface AboutValue {
  title: string;
  description: string;
  icon: string;
}

export interface AboutDict {
  title: string;
  subtitle: string;
  values: AboutValue[];
}

export interface ContactFormDict {
  title: string;
  name: string;
  email: string;
  message: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  tip: string;
}

export interface ContactDict {
  title: string;
  getInTouch: string;
  metaTitle: string;
  metaDescription: string;
  form: ContactFormDict;
}

export interface ProjectStatusDict {
  released: string;
  inDev: string;
  comingSoon: string;
}

export interface JoinCommunityDict {
  title: string;
  description: string;
  discord: string;
  patreon: string;
}

export interface LostMarkProjectDict {
  description: string;
  stats: {
    system: string;
    players: string;
    duration: string;
    pages: string;
  };
  buttons: {
    terminal: string;
    timer: string;
    itch: string;
    drivethru: string;
  };
}

export interface HolidayAuditProjectDict {
  description: string;
  buttons: {
    itch: string;
    drivethru: string;
    patreon: string;
  };
  badges: {
    available: string;
    oneShot: string;
    postcard: string;
  };
}

export interface ProjectsDict {
  status: ProjectStatusDict;
  featured: string;
  description: string;
  joinCommunity: JoinCommunityDict;
  lostMark: LostMarkProjectDict;
  holidayAudit: HolidayAuditProjectDict;
}

export interface CommonDict {
  notFound: NotFoundDict;
  timer: TimerDict;
  nav: NavDict;
  footer: FooterDict;
  team: TeamMember[];
  about: AboutDict;
  contact: ContactDict;
  projects: ProjectsDict;
}

// === HOME DICTIONARY ===

export interface HeroDict {
  title: string;
  subtitle: string;
  ctaProjects: string;
  ctaLostMark: string;
}

export interface LatestProjectsDict {
  title: string;
  projects: string;
  viewAll: string;
}

export interface KrampFeatureDict {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
}

export interface AboutSectionDict {
  title: string;
  description: string;
  cta: string;
}

export interface StayConnectedDict {
  label: string;
  title: string;
  titleHighlight: string;
  description: string;
  discord: string;
  allProjects: string;
}

export interface HomeDict {
  hero: HeroDict;
  latestProjects: LatestProjectsDict;
  status: ProjectStatusDict;
  kramp: KrampFeatureDict;
  about: AboutSectionDict;
  stayConnected: StayConnectedDict;
}

// === KRAMP DICTIONARY ===

export interface KrampMetaDict {
  title: string;
  description: string;
}

export interface KrampHeroDict {
  title: string;
  subtitle: string;
  tagline: string;
  badges: {
    available: string;
    oneShot: string;
    postcard: string;
  };
}

export interface KrampButtonsDict {
  drivethru: string;
  itch: string;
  patreon: string;
  rpgbook: string;
}

export interface KrampSectionsDict {
  about: string;
  features: string;
  postcard: string;
  soundtrack: string;
  tables: string;
  links: string;
  description: string;
  stayInLoop: string;
}

export interface KrampAboutDict {
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
}

export interface KrampSoundtrackDict {
  description: string;
}

export interface KrampTablesDict {
  description: string;
}

export interface KrampPostcardDict {
  description: string;
  unfold: string;
}

export interface KrampFeatureItem {
  name: string;
  description: string;
}

export interface KrampFeaturesDict {
  sinTracking: KrampFeatureItem;
  postcardFormat: KrampFeatureItem;
  singleSession: KrampFeatureItem;
  festiveSynth: KrampFeatureItem;
}

export interface KrampLinksDict {
  itch: string;
  patreon: string;
  drivethru: string;
  discord: string;
}

export interface KrampDict {
  meta: KrampMetaDict;
  hero: KrampHeroDict;
  buttons: KrampButtonsDict;
  sections: KrampSectionsDict;
  about: KrampAboutDict;
  soundtrack: KrampSoundtrackDict;
  tables: KrampTablesDict;
  postcard: KrampPostcardDict;
  backToProjects: string;
  features: KrampFeaturesDict;
  links: KrampLinksDict;
}

// === LOST MARK DICTIONARY ===

export interface LostMarkMetaDict {
  title: string;
  description: string;
}

export interface LostMarkHeroDict {
  interactiveNote: string;
  description: string;
}

export interface LostMarkStatsDict {
  system: string;
  players: string;
  duration: string;
  pages: string;
}

export interface LostMarkButtonsDict {
  itch: string;
  drivethru: string;
  patreon: string;
  roll20: string;
  rpgbook?: string;
  terminal: string;
  timer: string;
  moreProjects: string;
  listenStreaming: string;
  viewLicense: string;
}

export interface LostMarkNavDict {
  about: string;
  features: string;
  expansion: string;
  foundry: string;
  roll20: string;
  tools: string;
  soundtrack: string;
}

export interface LostMarkSectionsDict {
  about: string;
  features: string;
  expansion: string;
  foundry: string;
  roll20: string;
  tools: string;
  soundtrack: string;
  cta: string;
}

export interface LostMarkCtaDict {
  description: string;
}

export interface LostMarkFeature {
  title: string;
  description: string;
}

export interface LostMarkExpansionItem {
  title: string;
  description: string;
}

export interface LostMarkExpansionDict {
  description: string;
  badge: string;
  label: string;
  russianNote?: string;
  russianLink?: string;
  russianUrl?: string;
  englishOnlyNote?: string;
  list: LostMarkExpansionItem[];
}

export interface LostMarkAboutDict {
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
}

export interface LostMarkCreditsDict {
  title: string;
  writtenBy: string;
  layoutBy: string;
  artBy: string;
  musicBy: string;
  codingBy: string;
}

export interface LostMarkWarningDict {
  title: string;
  content: string;
}

export interface LostMarkFoundryDict {
  description: string;
}

export interface LostMarkRoll20Dict {
  description: string;
  englishOnly?: string;
  features: string[];
}

export interface LostMarkToolItem {
  title: string;
  badge: string;
  description: string;
}

export interface LostMarkToolsDict {
  terminal: LostMarkToolItem;
  timer: LostMarkToolItem;
}

export interface LostMarkSoundtrackDict {
  streamingTitle: string;
  streamingDesc: string;
  youtubeTitle: string;
  youtubeDesc: string;
  playerTitle: string;
  playerDesc: string;
}

export interface LostMarkDict {
  meta: LostMarkMetaDict;
  hero: LostMarkHeroDict;
  stats: LostMarkStatsDict;
  buttons: LostMarkButtonsDict;
  nav: LostMarkNavDict;
  sections: LostMarkSectionsDict;
  cta: LostMarkCtaDict;
  featuresList: LostMarkFeature[];
  expansion: LostMarkExpansionDict;
  about: LostMarkAboutDict;
  credits: LostMarkCreditsDict;
  warning: LostMarkWarningDict;
  foundry: LostMarkFoundryDict;
  roll20: LostMarkRoll20Dict;
  tools: LostMarkToolsDict;
  soundtrack: LostMarkSoundtrackDict;
}

// === TERMINAL DICTIONARY ===

export interface TerminalInterfaceDict {
  system_navigation: string;
  data_display: string;
}

export interface TerminalMenuDict {
  logs: string;
  silk_logs: string;
  life_support: string;
  crew_manifest: string;
  cryo_protocols: string;
  corrupted: string;
}

export interface TerminalStatusDict {
  normal: string;
  warning: string;
  error: string;
  critical: string;
  offline: string;
  online: string;
  connection_lost: string;
  deceased: string;
}

export interface TerminalManifestDict {
  role: string;
  name: string;
  status: string;
  timer: string;
  engineer_history: string;
  non_living: string;
  crew_complement: string;
  vessel: string;
}

export interface TerminalLogsDict {
  system_logs: string;
  silk_star_logs: string;
  entry: string;
}

export interface TerminalLifeSupportDict {
  header: string;
  legend: {
    no_connection: string;
    critical_error: string;
    error: string;
  };
}

export interface TerminalCryoDict {
  header: string;
}

export interface TerminalMessagesDict {
  terminal_ready: string;
  access_denied: string;
  corrupted_data: string;
  rest_corrupted: string;
}

export interface TerminalDict {
  interface: TerminalInterfaceDict;
  menu: TerminalMenuDict;
  status: TerminalStatusDict;
  manifest: TerminalManifestDict;
  logs: TerminalLogsDict;
  life_support: TerminalLifeSupportDict;
  cryo: TerminalCryoDict;
  messages: TerminalMessagesDict;
}

// === NEWSLETTER DICTIONARY ===

export interface NewsletterSubscribeDict {
  title: string;
  description: string;
  name: string;
  email: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  submit: string;
  subscribing: string;
  success: string;
  error: string;
  privacy: string;
  manageInfo: string;
  metaTitle: string;
  metaDescription: string;
}

export interface NewsletterCompactDict {
  emailPlaceholder: string;
  submit: string;
  subscribing: string;
  success: string;
}

export interface NewsletterFooterDict {
  title: string;
  description: string;
  subscribe: string;
}

export interface NewsletterManageDict {
  title: string;
  description: string;
  email: string;
  emailPlaceholder: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  backToHome: string;
  info: string;
  metaTitle: string;
  metaDescription: string;
}

export interface NewsletterDict {
  subscribe: NewsletterSubscribeDict;
  compact: NewsletterCompactDict;
  footer: NewsletterFooterDict;
  manage: NewsletterManageDict;
}

// === MASTER DICTIONARY TYPE ===

export interface Dictionary {
  common: CommonDict;
  home: HomeDict;
  kramp: KrampDict;
  'lost-mark': LostMarkDict;
  terminal: TerminalDict;
  newsletter: NewsletterDict;
}

// === UTILITY TYPES ===

/**
 * Извлекает тип словаря по namespace
 * @example
 * type NavDictType = GetDictionary<'common'>['nav']
 */
export type GetDictionary<T extends DictionaryNamespace> = Dictionary[T];

/**
 * Извлекает конкретный ключ из словаря
 * @example
 * type NavType = GetDictionaryKey<'common', 'nav'>
 */
export type GetDictionaryKey<
  T extends DictionaryNamespace,
  K extends keyof GetDictionary<T>
> = GetDictionary<T>[K];
