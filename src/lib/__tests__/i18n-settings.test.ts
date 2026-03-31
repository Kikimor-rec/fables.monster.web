import { describe, it, expect } from 'vitest';
import { fallbackLng, languages, defaultNS, getOptions } from '../../i18n/settings';

describe('i18n settings', () => {
  it('has English as fallback language', () => {
    expect(fallbackLng).toBe('en');
  });

  it('supports English and Russian', () => {
    expect(languages).toContain('en');
    expect(languages).toContain('ru');
    expect(languages).toHaveLength(2);
  });

  it('has common as default namespace', () => {
    expect(defaultNS).toBe('common');
  });

  describe('getOptions', () => {
    it('returns default options', () => {
      const opts = getOptions();
      expect(opts.lng).toBe('en');
      expect(opts.ns).toBe('common');
      expect(opts.fallbackLng).toBe('en');
      expect(opts.supportedLngs).toEqual(languages);
    });

    it('accepts custom language', () => {
      const opts = getOptions('ru');
      expect(opts.lng).toBe('ru');
    });

    it('accepts custom namespace', () => {
      const opts = getOptions('en', 'home');
      expect(opts.ns).toBe('home');
    });
  });
});
