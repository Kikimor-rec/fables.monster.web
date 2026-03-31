import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTimer } from '../useTimer';

// Mock logger
vi.mock('@/lib/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock constants
vi.mock('@/lib/constants', () => ({
  STORAGE_KEYS: {
    timerState: 'timerState',
  },
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock AudioContext
const mockAudioContext = {
  createOscillator: () => ({
    type: '',
    frequency: { setValueAtTime: vi.fn() },
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  }),
  destination: {},
  currentTime: 0,
};
Object.defineProperty(window, 'AudioContext', {
  value: vi.fn(() => mockAudioContext),
});

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useTimer());

    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isPaused).toBe(false);
    expect(result.current.totalSeconds).toBe(0);
    expect(result.current.currentSeconds).toBe(0);
  });

  it('sets hours, minutes, and seconds', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.setHours(1);
      result.current.setMinutes(30);
      result.current.setSeconds(45);
    });

    expect(result.current.hours).toBe(1);
    expect(result.current.minutes).toBe(30);
    expect(result.current.seconds).toBe(45);
  });

  it('sets timer with total seconds', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.setMinutes(5);
    });

    act(() => {
      result.current.setTimer();
    });

    expect(result.current.totalSeconds).toBe(300);
    expect(result.current.currentSeconds).toBe(300);
    expect(result.current.isRunning).toBe(false);
  });

  it('starts and runs timer', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.setSeconds(10);
    });
    act(() => {
      result.current.setTimer();
    });
    act(() => {
      result.current.startTimer();
    });

    expect(result.current.isRunning).toBe(true);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.currentSeconds).toBe(7);
  });

  it('pauses and resumes timer', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.setSeconds(30);
    });
    act(() => {
      result.current.setTimer();
    });
    act(() => {
      result.current.startTimer();
    });
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    act(() => {
      result.current.pauseTimer();
    });
    expect(result.current.isPaused).toBe(true);
    const pausedAt = result.current.currentSeconds;

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    // Should not have changed while paused
    expect(result.current.currentSeconds).toBe(pausedAt);

    act(() => {
      result.current.resumeTimer();
    });
    expect(result.current.isPaused).toBe(false);
  });

  it('resets timer to total seconds', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.setSeconds(30);
    });
    act(() => {
      result.current.setTimer();
    });
    act(() => {
      result.current.startTimer();
    });
    act(() => {
      vi.advanceTimersByTime(10000);
    });

    act(() => {
      result.current.resetTimer();
    });

    expect(result.current.currentSeconds).toBe(30);
    expect(result.current.isRunning).toBe(false);
  });

  it('clears timer completely', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.setMinutes(5);
    });
    act(() => {
      result.current.setTimer();
    });
    act(() => {
      result.current.clearTimer();
    });

    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
    expect(result.current.totalSeconds).toBe(0);
    expect(result.current.currentSeconds).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  describe('formatTime', () => {
    it('formats zero seconds', () => {
      const { result } = renderHook(() => useTimer());
      expect(result.current.formatTime(0)).toBe('00:00:00');
    });

    it('formats seconds only', () => {
      const { result } = renderHook(() => useTimer());
      expect(result.current.formatTime(45)).toBe('00:00:45');
    });

    it('formats minutes and seconds', () => {
      const { result } = renderHook(() => useTimer());
      expect(result.current.formatTime(125)).toBe('00:02:05');
    });

    it('formats hours, minutes, seconds', () => {
      const { result } = renderHook(() => useTimer());
      expect(result.current.formatTime(3661)).toBe('01:01:01');
    });
  });

  describe('getProgress', () => {
    it('returns 0 when no timer set', () => {
      const { result } = renderHook(() => useTimer());
      expect(result.current.getProgress()).toBe(0);
    });

    it('returns correct progress percentage', () => {
      const { result } = renderHook(() => useTimer());

      act(() => {
        result.current.setSeconds(10);
      });
      act(() => {
        result.current.setTimer();
      });
      act(() => {
        result.current.startTimer();
      });
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(result.current.getProgress()).toBe(50);
    });
  });

  it('persists state to localStorage', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.setMinutes(10);
    });

    expect(localStorageMock.setItem).toHaveBeenCalled();
    const savedData = JSON.parse(localStorageMock.setItem.mock.calls.at(-1)?.[1] || '{}');
    expect(savedData.minutes).toBe(10);
  });
});
