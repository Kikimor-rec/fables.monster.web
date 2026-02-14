import 'server-only';
import { fallbackLng } from '@/i18n/settings';
import type {
  Language,
  DictionaryNamespace,
  GetDictionary,
  CommonDict,
  HomeDict,
  KrampDict,
  LostMarkDict,
  LostMarkLicenseDict,
  Expedition418Dict,
  OldWorldNeonDict,
  TerminalDict,
  NewsletterDict,
  PrivacyDict,
} from '@/types/i18n';

type DictionaryLoader<T> = () => Promise<T>;

interface DictionaryLoaders {
  common: DictionaryLoader<CommonDict>;
  home: DictionaryLoader<HomeDict>;
  'lost-mark': DictionaryLoader<LostMarkDict>;
  'lost-mark-license': DictionaryLoader<LostMarkLicenseDict>;
  'expedition-418': DictionaryLoader<Expedition418Dict>;
  'old-world-neon': DictionaryLoader<OldWorldNeonDict>;
  kramp: DictionaryLoader<KrampDict>;
  terminal: DictionaryLoader<TerminalDict>;
  newsletter: DictionaryLoader<NewsletterDict>;
  privacy: DictionaryLoader<PrivacyDict>;
}

type Dictionaries = Record<Language, DictionaryLoaders>;

const dictionaries: Dictionaries = {
  en: {
    common: () => import('@/locales/en/common.json').then((module) => module.default as CommonDict),
    home: () => import('@/locales/en/home.json').then((module) => module.default as HomeDict),
    'lost-mark': () => import('@/locales/en/lost-mark.json').then((module) => module.default as LostMarkDict),
    'lost-mark-license': () => import('@/locales/en/lost-mark-license.json').then((module) => module.default as LostMarkLicenseDict),
    'expedition-418': () => import('@/locales/en/expedition-418.json').then((module) => module.default as Expedition418Dict),
    'old-world-neon': () => import('@/locales/en/old-world-neon.json').then((module) => module.default as OldWorldNeonDict),
    kramp: () => import('@/locales/en/kramp.json').then((module) => module.default as KrampDict),
    terminal: () => import('@/locales/en/terminal.json').then((module) => module.default as TerminalDict),
    newsletter: () => import('@/locales/en/newsletter.json').then((module) => module.default as NewsletterDict),
    privacy: () => import('@/locales/en/privacy.json').then((module) => module.default as PrivacyDict),
  },
  ru: {
    common: () => import('@/locales/ru/common.json').then((module) => module.default as CommonDict),
    home: () => import('@/locales/ru/home.json').then((module) => module.default as HomeDict),
    'lost-mark': () => import('@/locales/ru/lost-mark.json').then((module) => module.default as LostMarkDict),
    'lost-mark-license': () => import('@/locales/ru/lost-mark-license.json').then((module) => module.default as LostMarkLicenseDict),
    'expedition-418': () => import('@/locales/ru/expedition-418.json').then((module) => module.default as Expedition418Dict),
    'old-world-neon': () => import('@/locales/ru/old-world-neon.json').then((module) => module.default as OldWorldNeonDict),
    kramp: () => import('@/locales/ru/kramp.json').then((module) => module.default as KrampDict),
    terminal: () => import('@/locales/ru/terminal.json').then((module) => module.default as TerminalDict),
    newsletter: () => import('@/locales/ru/newsletter.json').then((module) => module.default as NewsletterDict),
    privacy: () => import('@/locales/ru/privacy.json').then((module) => module.default as PrivacyDict),
  },
};

/**
 * Загружает словарь для указанного языка и namespace
 * @param locale - Язык (en, ru)
 * @param namespace - Namespace словаря (common, home, kramp, lost-mark, terminal)
 * @returns Типизированный словарь
 */
export async function getDictionary<T extends DictionaryNamespace>(
  locale: string,
  namespace: T
): Promise<GetDictionary<T>> {
  const lang = (dictionaries[locale as Language] ? locale : fallbackLng) as Language;
  const loader = dictionaries[lang][namespace];

  if (!loader) {
    throw new Error(`Dictionary loader not found: ${lang}/${namespace}`);
  }

  try {
    return await loader() as GetDictionary<T>;
  } catch (error) {
    console.error(`Failed to load dictionary: ${lang}/${namespace}`, error);
    throw error;
  }
}

/**
 * Получает вложенное значение из объекта по ключу с точечной нотацией
 * @example getNestedValue(dict, 'nav.home') -> dict.nav.home
 */
const getNestedValue = (obj: Record<string, unknown>, key: string): unknown => {
  return key.split('.').reduce<unknown>((o, k) => {
    if (o && typeof o === 'object' && k in (o as Record<string, unknown>)) {
      return (o as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj);
};

/**
 * Создает функцию-переводчик для указанного языка и namespace
 * Автоматически использует fallback на английский язык
 * @param lang - Язык
 * @param namespace - Namespace словаря
 * @returns Функция для получения переводов
 */
export async function createTranslator(lang: string, namespace: DictionaryNamespace) {
  const dict = await getDictionary(lang, namespace);
  const enDict = lang !== fallbackLng ? await getDictionary(fallbackLng, namespace) : {};

  return (key: string): unknown => {
    const value = getNestedValue(dict as unknown as Record<string, unknown>, key);
    if (value !== undefined) return value;

    const fallbackValue = getNestedValue(enDict as unknown as Record<string, unknown>, key);
    return fallbackValue !== undefined ? fallbackValue : key;
  };
}
