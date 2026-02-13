/**
 * Централизованные константы проекта
 * Убирает хардкод из компонентов
 */

// === MUSIC TRACKS ===

export interface Track {
  filename: string;
  title: string;
}

export const LOST_MARK_TRACKS: readonly Track[] = [
  { filename: '01_whispers_in_the_fog.mp3', title: 'Whispers in the Fog' },
  { filename: '02_the_marked_path.mp3', title: 'The Marked Path' },
  { filename: '03_drifting_vessels.mp3', title: 'Drifting Vessels' },
  { filename: '04_echoes_of_the_past.mp3', title: 'Echoes of the Past' },
  { filename: '05_corrupted_memories.mp3', title: 'Corrupted Memories' },
  { filename: '06_the_flesh_network.mp3', title: 'The Flesh Network' },
  { filename: '07_mark_opollo.mp3', title: 'Mark Opollo' },
  { filename: '08_the_child.mp3', title: 'The Child' },
  { filename: '09_ascension.mp3', title: 'Ascension' },
  { filename: '10_final_transmission.mp3', title: 'Final Transmission' },
  { filename: '11_the_lost_mark.mp3', title: 'The Lost Mark' },
] as const;

export const MUSIC_BASE_PATH = '/music/lostmarkmusic';

/**
 * Получает полный URL для трека
 */
export function getTrackUrl(filename: string): string {
  return `${MUSIC_BASE_PATH}/${filename}`;
}

// === API ENDPOINTS ===

export const API_ENDPOINTS = {
  contact: '/api/contact',
  devContent: '/api/dev/content',
} as const;

// === RATE LIMITING ===

export const RATE_LIMITS = {
  contact: {
    maxRequests: 5,
    windowMs: 60000, // 1 minute
  },
} as const;

// === EXTERNAL LINKS ===

export const EXTERNAL_LINKS = {
  discord: 'https://discord.gg/eAwK9DfKf4',
  patreon: 'https://patreon.com/fablesmonster',
  itch: 'https://fablesmonster.itch.io',
  driveThru: 'https://drivethrurpg.com/browse/pub/22136/Fables-Monster-Studio',
  github: 'https://github.com/fablesmonster',
  youtube: 'https://youtube.com/@fablesmonster',
} as const;

// === SEO ===

export const SITE_CONFIG = {
  name: 'Fables Monster Studio',
  description: 'Independent tabletop RPG content creation studio',
  url: 'https://fables.monster',
  ogImage: '/logos/fm-logo-sqare.png',
  twitter: '@fablesmonster',
} as const;

// === LOCALSTORAGE KEYS ===

export const STORAGE_KEYS = {
  timerState: 'timerState',
  terminalHistory: 'terminalHistory',
  userPreferences: 'userPreferences',
  audioVolume: 'audioVolume',
} as const;

// === ANIMATION DURATIONS (ms) ===

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// === BREAKPOINTS ===

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
