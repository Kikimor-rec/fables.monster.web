import { describe, it, expect } from 'vitest';
import {
  toAbsoluteUrl,
  getOpenGraphLocale,
  getLocalizedAlternates,
  buildSocialMetadata,
} from '../metadata';

describe('metadata utilities', () => {
  describe('toAbsoluteUrl', () => {
    it('returns absolute URL unchanged', () => {
      expect(toAbsoluteUrl('https://example.com/page')).toBe('https://example.com/page');
      expect(toAbsoluteUrl('http://example.com/page')).toBe('http://example.com/page');
    });

    it('prepends site URL for relative paths with leading slash', () => {
      expect(toAbsoluteUrl('/en/about')).toBe('https://fables.monster/en/about');
    });

    it('prepends site URL for relative paths without leading slash', () => {
      expect(toAbsoluteUrl('en/about')).toBe('https://fables.monster/en/about');
    });
  });

  describe('getOpenGraphLocale', () => {
    it('returns ru_RU for Russian', () => {
      expect(getOpenGraphLocale('ru')).toBe('ru_RU');
    });

    it('returns en_US for English and other languages', () => {
      expect(getOpenGraphLocale('en')).toBe('en_US');
      expect(getOpenGraphLocale('fr')).toBe('en_US');
    });
  });

  describe('getLocalizedAlternates', () => {
    it('generates canonical and language alternates for root path', () => {
      const result = getLocalizedAlternates('en', '/');
      expect(result.canonical).toBe('https://fables.monster/en');
      expect(result.languages).toEqual({
        en: 'https://fables.monster/en',
        ru: 'https://fables.monster/ru',
      });
    });

    it('generates alternates for nested paths', () => {
      const result = getLocalizedAlternates('ru', '/projects');
      expect(result.canonical).toBe('https://fables.monster/ru/projects');
      expect(result.languages).toEqual({
        en: 'https://fables.monster/en/projects',
        ru: 'https://fables.monster/ru/projects',
      });
    });

    it('handles empty path', () => {
      const result = getLocalizedAlternates('en', '');
      expect(result.canonical).toBe('https://fables.monster/en');
    });
  });

  describe('buildSocialMetadata', () => {
    it('builds complete social metadata', () => {
      const result = buildSocialMetadata({
        lang: 'en',
        title: 'Test Title',
        description: 'Test description',
        path: '/about',
      });

      expect(result.openGraph).toBeDefined();
      expect(result.openGraph?.title).toBe('Test Title');
      expect(result.openGraph?.description).toBe('Test description');
      expect(result.openGraph?.locale).toBe('en_US');
      expect(result.openGraph?.siteName).toBe('Fables Monster Studio');
      expect((result.twitter as Record<string, unknown>)?.card).toBe('summary_large_image');
      expect(result.alternates?.canonical).toBe('https://fables.monster/en/about');
    });

    it('includes x-default when flag is set', () => {
      const result = buildSocialMetadata({
        lang: 'ru',
        title: 'Test',
        description: 'Test',
        includeXDefault: true,
      });

      const languages = result.alternates?.languages as Record<string, string>;
      expect(languages?.['x-default']).toBe('https://fables.monster/en');
    });

    it('uses default OG image path when not specified', () => {
      const result = buildSocialMetadata({
        lang: 'en',
        title: 'Test',
        description: 'Test',
        path: '/projects',
      });

      const images = result.openGraph?.images;
      expect(images).toBeDefined();
      if (Array.isArray(images) && images.length > 0) {
        expect((images[0] as Record<string, unknown>).url).toContain('opengraph-image');
      }
    });

    it('uses custom image path', () => {
      const result = buildSocialMetadata({
        lang: 'en',
        title: 'Test',
        description: 'Test',
        imagePath: '/images/custom.png',
      });

      const images = result.openGraph?.images;
      if (Array.isArray(images) && images.length > 0) {
        expect((images[0] as Record<string, unknown>).url).toBe('https://fables.monster/images/custom.png');
      }
    });
  });
});
