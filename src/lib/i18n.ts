import 'server-only'
import { fallbackLng } from '@/i18n/settings';

type DictionaryLoader = () => Promise<Record<string, unknown>>;
type NamespaceLoaders = Record<string, DictionaryLoader>;
type Dictionaries = Record<string, NamespaceLoaders>;

const dictionaries: Dictionaries = {
  en: {
    common: () => import('@/locales/en/common.json').then((module) => module.default),
    home: () => import('@/locales/en/home.json').then((module) => module.default),
    'lost-mark': () => import('@/locales/en/lost-mark.json').then((module) => module.default),
    kramp: () => import('@/locales/en/kramp.json').then((module) => module.default),
    terminal: () => import('@/locales/en/terminal.json').then((module) => module.default),
  },
  ru: {
    common: () => import('@/locales/ru/common.json').then((module) => module.default),
    home: () => import('@/locales/ru/home.json').then((module) => module.default),
    'lost-mark': () => import('@/locales/ru/lost-mark.json').then((module) => module.default),
    kramp: () => import('@/locales/ru/kramp.json').then((module) => module.default),
    terminal: () => import('@/locales/ru/terminal.json').then((module) => module.default),
  },
};

export const getDictionary = async (locale: string, namespace: string) => {
  const lang = dictionaries[locale] ? locale : fallbackLng;
  const loader = dictionaries[lang][namespace];
  
  if (!loader) {
      return {};
  }
  
  try {
    return await loader();
  } catch (error) {
    console.error(`Failed to load dictionary: ${lang}/${namespace}`, error);
    return {};
  }
};

const getNestedValue = (obj: Record<string, unknown>, key: string): unknown => {
  return key.split('.').reduce<unknown>((o, k) => {
    if (o && typeof o === 'object' && k in (o as Record<string, unknown>)) {
      return (o as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj);
};

export async function createTranslator(lang: string, namespace: string) {
  const dict = await getDictionary(lang, namespace);
  const enDict = lang !== fallbackLng ? await getDictionary(fallbackLng, namespace) : {};

  return (key: string) => {
    const value = getNestedValue(dict, key);
    if (value) return value;
    
    const fallbackValue = getNestedValue(enDict, key);
    return fallbackValue || key;
  };
}
