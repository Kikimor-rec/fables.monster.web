/**
 * Типы для MusicPlayer компонента
 */

export interface Track {
  title: string;
  filename: string;
}

export interface PrefetchState {
  url: string;
  progress: number;
  done: boolean;
}

export interface AudioPlayerState {
  currentTrack: number;
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  loop: boolean;
  currentTime: number;
  duration: number;
  buffered: number;
}

export interface UseAudioPlayerReturn extends AudioPlayerState {
  audioRef: React.RefObject<HTMLAudioElement>;
  prefetch: Record<number, PrefetchState>;
  // Actions
  selectTrack: (index: number) => void;
  playTrack: (index?: number) => Promise<void>;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  setLoop: (loop: boolean) => void;
  seek: (percent: number) => void;
  handleTrackClick: (index: number) => void;
  prefetchTrack: (index: number) => Promise<void>;
}
