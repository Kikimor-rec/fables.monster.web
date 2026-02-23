/**
 * Централизованные типы для i18n словарей
 * Единый источник истины для всех переводов
 */

// Поддерживаемые языки
export type Language = 'en' | 'ru';

// Словари для каждой секции
export type DictionaryNamespace =
  | 'common'
  | 'home'
  | 'kramp'
  | 'lost-mark'
  | 'lost-mark-license'
  | 'terminal'
  | 'newsletter'
  | 'privacy'
  | 'expedition-418'
  | 'old-world-neon';

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
  markMessage: string;
  krampMessage: string;
  ascendMessage: string;
  clickSecretMessage: string;
  commandNotRecognized: string;
  terminalPlaceholder: string;
  closeTerminalHint: string;
  clickMeTitle: string;
  terminalHint: string;
  helpCommands: string[];
  radarScanning: string;
}

export interface TimerDict {
  title: string;
  meta?: {
    title: string;
    description: string;
  };
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
  skipToContent?: string;
  homeAriaLabel?: string;
  mainNavigation?: string;
  languageSelection?: string;
  openMenu?: string;
  closeMenu?: string;
  mainMenu?: string;
  mobileNavigation?: string;
}

export interface FooterDict {
  tagline: string;
  projects: string;
  links: string;
  about: string;
  contact: string;
  social: string;
  allProjects?: string;
  privacy?: string;
  homeAriaLabel?: string;
  projectsAriaLabel?: string;
  linksAriaLabel?: string;
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
  metaDescription?: string;
  heroKicker?: string;
  rosterKicker?: string;
  rosterTitle?: string;
  rosterDescription?: string;
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
  heroKicker?: string;
  heroDescription?: string;
  channelsLabel?: string;
  channelAction?: string;
  directChannelLabel?: string;
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
  subscribe?: string;
  patreon: string;
}

export interface ProjectsTelemetryDict {
  total?: string;
  released?: string;
  inDevelopment?: string;
  comingSoon?: string;
}

export interface ProjectDetailLabelsDict {
  itch?: string;
  drivethru?: string;
  roll20?: string;
}

export interface ProjectDetailDict {
  kicker?: string;
  notFoundTitle?: string;
  labels?: ProjectDetailLabelsDict;
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

export interface HellishBureaucracyProjectDict {
  kicker?: string;
  inDevelopment?: string;
  defaultTagline?: string;
}

export interface ProjectsDict {
  status: ProjectStatusDict;
  featured: string;
  heroKicker?: string;
  telemetry?: ProjectsTelemetryDict;
  detail?: ProjectDetailDict;
  metaDescription?: string;
  description: string;
  joinCommunity: JoinCommunityDict;
  lostMark: LostMarkProjectDict;
  holidayAudit: HolidayAuditProjectDict;
  hellishBureaucracy?: HellishBureaucracyProjectDict;
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
  logoAlt?: string;
  title: string;
  subtitle: string;
  ctaProjects: string;
  ctaLostMark: string;
  statusBadges?: string[];
  marqueePhrases?: string[];
}

export interface HomeMetaDict {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
}

export interface HomeTelemetryDict {
  modules?: string;
  available?: string;
  inDevelopment?: string;
  locales?: string;
  localesValue?: string;
}

export interface LatestProjectsDict {
  title: string;
  projects: string;
  viewAll: string;
  defaultType?: string;
}

export interface KrampFeatureDict {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
}

export interface AboutSectionDict {
  titlePrefix?: string;
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
  newsletter: string;
  allProjects: string;
}

export interface HomeDict {
  meta: HomeMetaDict;
  hero: HeroDict;
  telemetry?: HomeTelemetryDict;
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
  kicker?: string;
  title: string;
  subtitle: string;
  tagline: string;
  englishVersionNote?: string;
  storeMode?: 'global' | 'rpgbook-only';
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
  listenStreaming?: string;
  youtubeIframeTitle?: string;
  youtubeFooter?: string;
  player?: {
    loading?: string;
    noTracks?: string;
    noTracksHint?: string;
    terminalCommand?: string;
    nowPlaying?: string;
    trackLabel?: string;
    unknownTrack?: string;
    repeatTrack?: string;
    repeatAll?: string;
    noRepeat?: string;
    loopTrackStatus?: string;
    loopPlaylistStatus?: string;
    playlist?: string;
    tracks?: string;
    online?: string;
  };
  sfx?: {
    panelTitle?: string;
    stop?: string;
    hint?: string;
    volumeLabel?: string;
    tracks?: {
      jingleNormal1?: string;
      jingleNormal2?: string;
      jingleGlitch1?: string;
      jingleGlitch2?: string;
    };
  };
}

export interface KrampTablesDict {
  description: string;
  headerNote?: string;
  footerStamp?: string;
  mechLabel?: string;
  npcTags?: {
    history?: string;
    helps?: string;
    hinders?: string;
  };
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
  kicker?: string;
  interactiveNote: string;
  description: string;
}

export interface LostMarkPricingDict {
  freeEnglish?: string;
  paidRussian?: string;
  russianIncludesAll?: string;
  baseModuleFree?: string;
  freeLabel?: string;
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
  licensePrefix?: string;
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
  supportNote?: string;
  videoTitle?: string;
}

export interface LostMarkRoll20BadgesDict {
  maps?: string;
  tokens?: string;
  handouts?: string;
  lighting?: string;
}

export interface LostMarkRoll20Dict {
  description: string;
  englishOnly?: string;
  badges?: LostMarkRoll20BadgesDict;
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
  youtubeIframeTitle?: string;
  playerTitle: string;
  playerDesc: string;
}

export interface LostMarkDict {
  meta: LostMarkMetaDict;
  hero: LostMarkHeroDict;
  stats: LostMarkStatsDict;
  pricing?: LostMarkPricingDict;
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

// === LOST MARK LICENSE DICTIONARY ===

export interface LostMarkLicenseMetaDict {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  imageAlt: string;
}

export interface LostMarkLicenseTermDict {
  term: string;
  description: string;
}

export interface LostMarkLicenseDict {
  meta: LostMarkLicenseMetaDict;
  backToProject: string;
  header: {
    title: string;
    year: string;
    byline: string;
  };
  licenseTitle: string;
  freeToUseTitle: string;
  freeToUseItems: string[];
  termsTitle: string;
  terms: LostMarkLicenseTermDict[];
  attributionTitle: string;
  attributionLines: string[];
  contactTitle: string;
  licenseDetailsLabel: string;
  actions: {
    backToProject: string;
    viewProjects: string;
  };
}

// === EXPEDITION-418 DICTIONARY ===

export interface Expedition418MetaDict {
  title: string;
  description: string;
}

export interface Expedition418GenreDict {
  label: string;
}

export interface Expedition418NavDict {
  intel: string;
  dispatcher: string;
  features: string;
  about: string;
  playtest: string;
}

export interface Expedition418HeroDict {
  title: string;
  subtitle: string;
  paragraph1: string;
  paragraph2: string;
  statusNote: string;
  projectCodeLabel: string;
  allProjects: string;
}

export interface Expedition418StatLabelsDict {
  system: string;
  players: string;
  duration: string;
  format: string;
}

export interface Expedition418StatValuesDict {
  system: string;
  players: string;
  duration: string;
  format: string;
}

export interface Expedition418IntelDict {
  imageAlt: string;
  feedCaption: string;
  whyTitle: string;
}

export interface Expedition418DispatcherDict {
  quote: string;
  author: string;
}

export interface Expedition418FeatureItemDict {
  title: string;
  description: string;
}

export interface Expedition418FeaturesDict {
  title: string;
  buildBot: Expedition418FeatureItemDict;
  missions: Expedition418FeatureItemDict;
  personalityModules: Expedition418FeatureItemDict;
  synchronization: Expedition418FeatureItemDict;
}

export interface Expedition418AboutDict {
  aboutTitle: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  paragraph4: string;
  paragraph5: string;
}

export interface Expedition418PlaytestDict {
  incoming: string;
  paragraph1: string;
  paragraph2: string;
  portal: {
    overline: string;
    title: string;
    description: string;
    button: string;
  };
  buttons: {
    discord: string;
    subscribe: string;
    patreon: string;
  };
}

export interface Expedition418Dict {
  meta: Expedition418MetaDict;
  genre: Expedition418GenreDict;
  nav: Expedition418NavDict;
  hero: Expedition418HeroDict;
  stats: {
    labels: Expedition418StatLabelsDict;
    values: Expedition418StatValuesDict;
  };
  intel: Expedition418IntelDict;
  dispatcher: Expedition418DispatcherDict;
  features: Expedition418FeaturesDict;
  about: Expedition418AboutDict;
  playtest: Expedition418PlaytestDict;
}

// === OLD WORLD NEON DICTIONARY ===

export interface OldWorldNeonMetaDict {
  title: string;
  description: string;
}

export interface OldWorldNeonNavDict {
  teaser: string;
  features: string;
}

export interface OldWorldNeonHeroDict {
  classified: string;
  oldWorld: string;
  neon: string;
  system: string;
  statusTags: {
    cyberpunk: string;
    classified: string;
    unknown: string;
  };
  accessLines: {
    first: string;
    second: string;
    third: string;
  };
  restrictedTitle: string;
  taglineFallback: string;
  descriptionFallback: string;
}

export interface OldWorldNeonTeaserDict {
  titleLead: string;
  titleTail: string;
  paragraph1: string;
  paragraph2: string;
  tags: {
    corporateEspionage: string;
    digitalShadows: string;
    neonDarkness: string;
  };
  locationLabel: string;
  locationValue: string;
  signalText: string;
}

export interface OldWorldNeonFeatureCardDict {
  title: string;
  description: string;
}

export interface OldWorldNeonFeaturesDict {
  titlePrefix: string;
  title: string;
  urbanSprawl: OldWorldNeonFeatureCardDict;
  digitalWarfare: OldWorldNeonFeatureCardDict;
  highStakesHeists: OldWorldNeonFeatureCardDict;
}

export interface OldWorldNeonDict {
  meta: OldWorldNeonMetaDict;
  nav: OldWorldNeonNavDict;
  hero: OldWorldNeonHeroDict;
  teaser: OldWorldNeonTeaserDict;
  features: OldWorldNeonFeaturesDict;
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
  meta?: {
    title: string;
    description: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    imageAlt?: string;
  };
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
  nameOptionalLabel?: string;
  email: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  submit: string;
  subscribing: string;
  success: string;
  error: string;
  privacy: string;
  backToHome?: string;
  benefitsTitle?: string;
  benefits?: {
    releases?: {
      emoji?: string;
      title?: string;
      description?: string;
    };
    exclusive?: {
      emoji?: string;
      title?: string;
      description?: string;
    };
    studioNews?: {
      emoji?: string;
      title?: string;
      description?: string;
    };
  };
  metaTitle: string;
  metaDescription: string;
}

export interface NewsletterUnsubscribeDict {
  title: string;
  description: string;
  email: string;
  emailPlaceholder: string;
  submit: string;
  unsubscribing: string;
  success: string;
  notFound: string;
  error: string;
  backToHome?: string;
  metaTitle: string;
  metaDescription: string;
}

export interface NewsletterConfirmationSuccessDict {
  heading: string;
  message: string;
  action: string;
}

export interface NewsletterConfirmationErrorDict {
  heading: string;
  message: string;
  action: string;
}

export interface NewsletterConfirmationDict {
  title: string;
  success: NewsletterConfirmationSuccessDict;
  error: NewsletterConfirmationErrorDict;
  pending?: {
    heading?: string;
    message?: string;
    hint?: string;
  };
  backToSubscribe?: string;
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
  learnMore?: string;
}

export interface NewsletterDict {
  subscribe: NewsletterSubscribeDict;
  unsubscribe: NewsletterUnsubscribeDict;
  confirmation: NewsletterConfirmationDict;
  compact: NewsletterCompactDict;
  footer: NewsletterFooterDict;
}

// === PRIVACY DICTIONARY ===

export interface PrivacySectionDict {
  title: string;
  content: string[];
}

export interface PrivacyDict {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: PrivacySectionDict[];
  backToHome: string;
}

// === MASTER DICTIONARY TYPE ===

export interface Dictionary {
  common: CommonDict;
  home: HomeDict;
  kramp: KrampDict;
  'lost-mark': LostMarkDict;
  'lost-mark-license': LostMarkLicenseDict;
  'expedition-418': Expedition418Dict;
  'old-world-neon': OldWorldNeonDict;
  terminal: TerminalDict;
  newsletter: NewsletterDict;
  privacy: PrivacyDict;
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
