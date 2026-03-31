import { describe, it, expect, vi } from 'vitest';
import { getFrontmatterString, getFrontmatterObject } from '../content';

// Mock server-side dependencies
vi.mock('remark', () => ({
  remark: () => ({
    use: () => ({
      process: async (content: string) => ({ toString: () => `<p>${content}</p>` }),
    }),
  }),
}));
vi.mock('remark-html', () => ({ default: {} }));

describe('content utilities', () => {
  describe('getFrontmatterString', () => {
    it('returns string value', () => {
      const fm = { title: 'Hello', count: 42 };
      expect(getFrontmatterString(fm, 'title')).toBe('Hello');
    });

    it('returns empty string for non-string value', () => {
      const fm = { count: 42, obj: { a: 1 } };
      expect(getFrontmatterString(fm, 'count')).toBe('');
      expect(getFrontmatterString(fm, 'obj')).toBe('');
    });

    it('returns empty string for missing key', () => {
      const fm = { title: 'Hello' };
      expect(getFrontmatterString(fm, 'missing')).toBe('');
    });
  });

  describe('getFrontmatterObject', () => {
    it('returns object value', () => {
      const fm = { platforms: { itch: 'url', driveThru: 'url2' } };
      const result = getFrontmatterObject<Record<string, string>>(fm, 'platforms');
      expect(result).toEqual({ itch: 'url', driveThru: 'url2' });
    });

    it('returns undefined for non-object value', () => {
      const fm = { title: 'Hello', count: 42 };
      expect(getFrontmatterObject(fm, 'title')).toBeUndefined();
      expect(getFrontmatterObject(fm, 'count')).toBeUndefined();
    });

    it('returns undefined for array value', () => {
      const fm = { tags: ['a', 'b'] };
      expect(getFrontmatterObject(fm, 'tags')).toBeUndefined();
    });

    it('returns undefined for missing key', () => {
      const fm = { title: 'Hello' };
      expect(getFrontmatterObject(fm, 'missing')).toBeUndefined();
    });
  });
});
