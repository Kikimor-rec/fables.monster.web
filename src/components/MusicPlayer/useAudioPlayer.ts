/**
 * Хук для управления аудио плеером
 * Извлекает всю логику из компонента для лучшей поддерживаемости
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';
import type { Track, UseAudioPlayerReturn, PrefetchState } from './types';

interface UseAudioPlayerProps {
  tracks: Track[];
  basePath: string;
  initialVolume?: number;
}

export function useAudioPlayer({
  tracks,
  basePath,
  initialVolume = 0.7,
}: UseAudioPlayerProps): UseAudioPlayerReturn {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolumeState] = useState(initialVolume);
  const [loop, setLoopState] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [prefetch, setPrefetch] = useState<Record<number, PrefetchState>>({});

  const audioRef = useRef<HTMLAudioElement>(null);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  // === Event handlers ===

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (loop) {
        audio.currentTime = 0;
        audio.play();
      } else {
        setIsPlaying(false);
      }
    };
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleProgress = () => {
      if (!audio.duration) return;
      const b = audio.buffered;
      if (!b.length) return;
      const end = b.end(b.length - 1);
      setBuffered(Math.min(100, (end / audio.duration) * 100));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('progress', handleProgress);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('progress', handleProgress);
    };
  }, [loop]);

  // === Volume and loop sync ===

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = loop;
    }
  }, [volume, loop]);

  // === Control functions ===

  const selectTrack = useCallback((index: number) => {
    setCurrentTrack(index);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setBuffered(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
      audioRef.current.load();
    }

    logger.debug('Track selected', { index, track: tracks[index].title });
  }, [tracks]);

  const playTrack = useCallback(async (index: number = currentTrack) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (index !== currentTrack) {
      setCurrentTrack(index);
    }

    const pre = prefetch[index];
    const src = pre?.done ? pre.url : `${basePath}/${tracks[index].filename}`;

    if (audio.src !== src) {
      audio.src = src;
      audio.load();
    }

    setIsLoading(true);
    try {
      await audio.play();
      setIsPlaying(true);
      logger.info('Track playing', { index, track: tracks[index].title });
    } catch (error) {
      logger.error('Failed to play track', { index, error });
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [currentTrack, prefetch, basePath, tracks]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      playTrack();
    }
  }, [isPlaying, playTrack]);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
  }, []);

  const setLoop = useCallback((newLoop: boolean) => {
    setLoopState(newLoop);
  }, []);

  const seek = useCallback((percent: number) => {
    if (!audioRef.current) return;
    const newTime = (percent / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  // === Click handling (single/double click) ===

  const handleTrackClick = useCallback((index: number) => {
    if (clickTimeout.current) {
      // Double click - play
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      playTrack(index);
    } else {
      // Single click - select
      clickTimeout.current = setTimeout(() => {
        selectTrack(index);
        clickTimeout.current = null;
      }, 250);
    }
  }, [playTrack, selectTrack]);

  // === Prefetch functionality ===

  const prefetchTrack = useCallback(async (index: number) => {
    if (prefetch[index]?.done) {
      logger.debug('Track already prefetched', { index });
      return;
    }

    try {
      const response = await fetch(`${basePath}/${tracks[index].filename}`);
      const contentLength = Number(response.headers.get('content-length')) || 0;
      const reader = response.body!.getReader();

      let received = 0;
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        received += value.length;

        const progress = contentLength ? (received / contentLength) * 100 : 0;
        setPrefetch((prev) => ({
          ...prev,
          [index]: {
            url: prev[index]?.url || '',
            progress,
            done: false,
          },
        }));
      }

      const blob = new Blob(chunks, { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);

      setPrefetch((prev) => ({
        ...prev,
        [index]: {
          url,
          progress: 100,
          done: true,
        },
      }));

      if (index === currentTrack) {
        setBuffered(100);
      }

      logger.info('Track prefetched', { index, track: tracks[index].title });
    } catch (error) {
      logger.error('Failed to prefetch track', { index, error });
    }
  }, [prefetch, basePath, tracks, currentTrack]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Revoke all blob URLs
      Object.values(prefetch).forEach((p) => {
        if (p.done && p.url.startsWith('blob:')) {
          URL.revokeObjectURL(p.url);
        }
      });
    };
  }, [prefetch]);

  return {
    currentTrack,
    isPlaying,
    isLoading,
    volume,
    loop,
    currentTime,
    duration,
    buffered,
    audioRef,
    prefetch,
    selectTrack,
    playTrack,
    togglePlay,
    setVolume,
    setLoop,
    seek,
    handleTrackClick,
    prefetchTrack,
  };
}
