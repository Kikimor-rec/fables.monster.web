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
  TerminalDict,
  NewsletterDict,
} from '@/types/i18n';

type DictionaryLoader<T> = () => Promise<T>;

interface DictionaryLoaders {
  common: DictionaryLoader<CommonDict>;
  home: DictionaryLoader<HomeDict>;
  'lost-mark': DictionaryLoader<LostMarkDict>;
  kramp: DictionaryLoader<KrampDict>;
  terminal: DictionaryLoader<TerminalDict>;
  newsletter: DictionaryLoader<NewsletterDict>;
}

type Dictionaries = Record<Language, DictionaryLoaders>;

const dictionaries: Dictionaries = {
  en: {
    common: () => import('@/locales/en/common.json').then((module) => module.default as CommonDict),
    home: () => import('@/locales/en/home.json').then((module) => module.default as HomeDict),
    'lost-mark': () => import('@/locales/en/lost-mark.json').then((module) => module.default as LostMarkDict),
    kramp: () => import('@/locales/en/kramp.json').then((module) => module.default as KrampDict),
    terminal: () => import('@/locales/en/terminal.json').then((module) => module.default as TerminalDict),
    newsletter: () => import('@/locales/en/newsletter.json').then((module) => module.default as NewsletterDict),
  },
  ru: {
    common: () => import('@/locales/ru/common.json').then((module) => module.default as CommonDict),
    home: () => import('@/locales/ru/home.json').then((module) => module.default as HomeDict),
    'lost-mark': () => import('@/locales/ru/lost-mark.json').then((module) => module.default as LostMarkDict),
    kramp: () => import('@/locales/ru/kramp.json').then((module) => module.default as KrampDict),
    terminal: () => import('@/locales/ru/terminal.json').then((module) => module.default as TerminalDict),
    newsletter: () => import('@/locales/ru/newsletter.json').then((module) => module.default as NewsletterDict),
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
