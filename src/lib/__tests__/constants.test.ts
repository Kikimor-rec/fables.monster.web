import { describe, it, expect } from 'vitest';
import {
  LOST_MARK_TRACKS,
  MUSIC_BASE_PATH,
  getTrackUrl,
  API_ENDPOINTS,
  RATE_LIMITS,
  EXTERNAL_LINKS,
  SITE_CONFIG,
  STORAGE_KEYS,
  ANIMATION_DURATION,
  BREAKPOINTS,
} from '../constants';

describe('constants', () => {
  describe('LOST_MARK_TRACKS', () => {
    it('has 11 tracks', () => {
      expect(LOST_MARK_TRACKS).toHaveLength(11);
    });

    it('all tracks have required fields', () => {
      for (const track of LOST_MARK_TRACKS) {
        expect(track.filename).toBeTruthy();
        expect(track.title).toBeTruthy();
        expect(track.filename).toMatch(/\.mp3$/);
      }
    });

    it('tracks have unique filenames', () => {
      const filenames = LOST_MARK_TRACKS.map(t => t.filename);
      expect(new Set(filenames).size).toBe(filenames.length);
    });
  });

  describe('getTrackUrl', () => {
    it('returns full path for a track', () => {
      const url = getTrackUrl('test.mp3');
      expect(url).toBe(`${MUSIC_BASE_PATH}/test.mp3`);
    });
  });

  describe('API_ENDPOINTS', () => {
    it('has contact endpoint', () => {
      expect(API_ENDPOINTS.contact).toBe('/api/contact');
    });

    it('has devContent endpoint', () => {
      expect(API_ENDPOINTS.devContent).toBe('/api/dev/content');
    });
  });

  describe('RATE_LIMITS', () => {
    it('has sensible contact rate limit', () => {
      expect(RATE_LIMITS.contact.maxRequests).toBeGreaterThan(0);
      expect(RATE_LIMITS.contact.windowMs).toBeGreaterThan(0);
    });
  });

  describe('EXTERNAL_LINKS', () => {
    it('all links are valid URLs', () => {
      for (const [, url] of Object.entries(EXTERNAL_LINKS)) {
        expect(url).toMatch(/^https:\/\//);
      }
    });

    it('has required social links', () => {
      expect(EXTERNAL_LINKS.discord).toBeDefined();
      expect(EXTERNAL_LINKS.patreon).toBeDefined();
      expect(EXTERNAL_LINKS.itch).toBeDefined();
      expect(EXTERNAL_LINKS.github).toBeDefined();
    });
  });

  describe('SITE_CONFIG', () => {
    it('has valid site URL', () => {
      expect(SITE_CONFIG.url).toMatch(/^https:\/\//);
    });

    it('has required fields', () => {
      expect(SITE_CONFIG.name).toBeTruthy();
      expect(SITE_CONFIG.description).toBeTruthy();
      expect(SITE_CONFIG.ogImage).toBeTruthy();
      expect(SITE_CONFIG.twitter).toMatch(/^@/);
    });
  });

  describe('STORAGE_KEYS', () => {
    it('has unique storage keys', () => {
      const keys = Object.values(STORAGE_KEYS);
      expect(new Set(keys).size).toBe(keys.length);
    });
  });

  describe('ANIMATION_DURATION', () => {
    it('fast < normal < slow', () => {
      expect(ANIMATION_DURATION.fast).toBeLessThan(ANIMATION_DURATION.normal);
      expect(ANIMATION_DURATION.normal).toBeLessThan(ANIMATION_DURATION.slow);
    });
  });

  describe('BREAKPOINTS', () => {
    it('breakpoints are in ascending order', () => {
      expect(BREAKPOINTS.sm).toBeLessThan(BREAKPOINTS.md);
      expect(BREAKPOINTS.md).toBeLessThan(BREAKPOINTS.lg);
      expect(BREAKPOINTS.lg).toBeLessThan(BREAKPOINTS.xl);
      expect(BREAKPOINTS.xl).toBeLessThan(BREAKPOINTS['2xl']);
    });
  });
});
