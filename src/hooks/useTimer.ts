/**
 * Хук для управления таймером с persistence в localStorage
 * Извлекает логику из компонента для лучшей поддерживаемости
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { logger } from '@/lib/logger';
import { STORAGE_KEYS } from '@/lib/constants';

interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
  isRunning: boolean;
  isPaused: boolean;
  totalSeconds: number;
  currentSeconds: number;
}

interface UseTimerReturn extends TimerState {
  // Setters
  setHours: (hours: number) => void;
  setMinutes: (minutes: number) => void;
  setSeconds: (seconds: number) => void;

  // Actions
  setTimer: () => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  clearTimer: () => void;
  applyPreset: (minutes: number) => void;
  triggerGlitch: () => void;

  // Utilities
  formatTime: (totalSecs: number) => string;
  getProgress: () => number;
  playBeep: () => void;
}

export function useTimer(): UseTimerReturn {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const glitchCallbackRef = useRef<(() => void) | null>(null);

  // === Audio ===

  const playBeep = useCallback(() => {
    try {
      const AudioClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioClass();
      const oscillator = ctx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(1000, ctx.currentTime);
      oscillator.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.2);
    } catch (error) {
      logger.debug('Failed to play beep', { error });
    }
  }, []);

  // === Load saved state ===

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.timerState);
      if (!saved) return;

      const data: TimerState & { lastUpdate?: number } = JSON.parse(saved);

      setHours(data.hours || 0);
      setMinutes(data.minutes || 0);
      setSeconds(data.seconds || 0);
      setTotalSeconds(data.totalSeconds || 0);

      // Calculate remaining time if timer was running
      let remaining = data.currentSeconds || 0;
      if (data.isRunning && !data.isPaused) {
        const diff = Math.floor((Date.now() - (data.lastUpdate || 0)) / 1000);
        remaining = Math.max(0, remaining - diff);
      }

      setCurrentSeconds(remaining);
      setIsRunning(data.isRunning && remaining > 0);
      setIsPaused(data.isPaused);

      // Play beep if timer completed while away
      if (remaining === 0 && (data.currentSeconds || 0) > 0) {
        playBeep();
      }

      logger.debug('Timer state loaded from localStorage', { remaining });
    } catch (error) {
      logger.error('Failed to load timer state', { error });
    }
  }, [playBeep]);

  // === Persist state ===

  useEffect(() => {
    const data = {
      hours,
      minutes,
      seconds,
      totalSeconds,
      currentSeconds,
      isRunning,
      isPaused,
      lastUpdate: Date.now(),
    };

    try {
      localStorage.setItem(STORAGE_KEYS.timerState, JSON.stringify(data));
    } catch (error) {
      logger.error('Failed to save timer state', { error });
    }
  }, [hours, minutes, seconds, totalSeconds, currentSeconds, isRunning, isPaused]);

  // === Timer logic ===

  useEffect(() => {
    if (isRunning && !isPaused && currentSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsPaused(false);
            glitchCallbackRef.current?.();
            playBeep();
            logger.info('Timer completed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, currentSeconds, playBeep]);

  // === Actions ===

  const triggerGlitch = useCallback(() => {
    glitchCallbackRef.current?.();
  }, []);

  const setTimer = useCallback(() => {
    const total = hours * 3600 + minutes * 60 + seconds;
    if (total > 0) {
      setTotalSeconds(total);
      setCurrentSeconds(total);
      setIsRunning(false);
      setIsPaused(false);
      triggerGlitch();
      logger.info('Timer set', { total });
    }
  }, [hours, minutes, seconds, triggerGlitch]);

  const startTimer = useCallback(() => {
    if (currentSeconds > 0) {
      setIsRunning(true);
      setIsPaused(false);
      triggerGlitch();
      logger.info('Timer started');
    }
  }, [currentSeconds, triggerGlitch]);

  const pauseTimer = useCallback(() => {
    if (isRunning) {
      setIsPaused(true);
      triggerGlitch();
      logger.info('Timer paused');
    }
  }, [isRunning, triggerGlitch]);

  const resumeTimer = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);
      triggerGlitch();
      logger.info('Timer resumed');
    }
  }, [isPaused, triggerGlitch]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentSeconds(totalSeconds);
    triggerGlitch();
    logger.info('Timer reset');
  }, [totalSeconds, triggerGlitch]);

  const clearTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentSeconds(0);
    setTotalSeconds(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    triggerGlitch();
    logger.info('Timer cleared');
  }, [triggerGlitch]);

  const applyPreset = useCallback(
    (presetMinutes: number) => {
      const totalMins = hours * 60 + minutes + presetMinutes;
      setHours(Math.floor(totalMins / 60));
      setMinutes(totalMins % 60);
      triggerGlitch();
      logger.debug('Preset applied', { presetMinutes, totalMins });
    },
    [hours, minutes, triggerGlitch]
  );

  // === Utilities ===

  const formatTime = useCallback((totalSecs: number): string => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const getProgress = useCallback((): number => {
    if (totalSeconds === 0) return 0;
    return ((totalSeconds - currentSeconds) / totalSeconds) * 100;
  }, [totalSeconds, currentSeconds]);

  return {
    hours,
    minutes,
    seconds,
    isRunning,
    isPaused,
    totalSeconds,
    currentSeconds,
    setHours,
    setMinutes,
    setSeconds,
    setTimer,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    clearTimer,
    applyPreset,
    triggerGlitch,
    formatTime,
    getProgress,
    playBeep,
  };
}

/**
 * Хук для эффектов загрузки и глитча
 */
interface UseTimerEffectsProps {
  isLoading?: boolean;
  onGlitch?: () => void;
}

export function useTimerEffects({ isLoading, onGlitch }: UseTimerEffectsProps = {}) {
  const [glitch, setGlitch] = useState(false);

  // Glitch effect
  useEffect(() => {
    if (!isLoading) {
      const glitchInterval = setInterval(() => {
        if (Math.random() < 0.05) {
          setGlitch(true);
          setTimeout(() => setGlitch(false), 150);
        }
      }, 8000);

      return () => clearInterval(glitchInterval);
    }
  }, [isLoading]);

  const triggerManualGlitch = useCallback(() => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 300);
    onGlitch?.();
  }, [onGlitch]);

  return { glitch, triggerManualGlitch };
}
