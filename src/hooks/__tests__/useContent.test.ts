import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useContent } from '../useContent';

// Mock logger
vi.mock('@/lib/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('useContent', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('loads content successfully', async () => {
    const mockData = { title: 'Test', body: 'Content' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useContent('test.json', 'en'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.content).toEqual(mockData);
    expect(result.current.error).toBeNull();
    expect(mockFetch).toHaveBeenCalledWith('/content/test.json');
  });

  it('uses language suffix for non-English', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    renderHook(() => useContent('test.json', 'ru'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/content/test.ru.json');
    });
  });

  it('handles fetch error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const { result } = renderHook(() => useContent('missing.json'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.content).toBeNull();
  });

  it('handles network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useContent('test.json'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error?.message).toBe('Network error');
    expect(result.current.content).toBeNull();
  });

  it('refetches content', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ version: 1 }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ version: 2 }),
      });

    const { result } = renderHook(() => useContent('test.json'));

    await waitFor(() => {
      expect(result.current.content).toEqual({ version: 1 });
    });

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.content).toEqual({ version: 2 });
  });
});
