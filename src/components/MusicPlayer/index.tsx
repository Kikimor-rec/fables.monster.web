/**
 * Главный компонент Music Player
 * Модульная структура для лучшей поддерживаемости
 */

'use client';

import { TrackInfo } from './TrackInfo';
import { ProgressBar } from './ProgressBar';
import { AudioControls } from './AudioControls';
import { PlaylistView } from './PlaylistView';
import { useAudioPlayer } from './useAudioPlayer';
import type { Track } from './types';

interface MusicPlayerProps {
  tracks: Track[];
  basePath?: string;
  initialVolume?: number;
  className?: string;
}

export default function MusicPlayer({
  tracks,
  basePath = '/music/lostmarkmusic',
  initialVolume = 0.7,
  className = '',
}: MusicPlayerProps) {
  const player = useAudioPlayer({ tracks, basePath, initialVolume });

  return (
    <section className={`py-20 bg-gray-900 border-t border-red-700 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <h2 className="text-4xl font-bold text-white mb-12 text-center font-nunito flex items-center justify-center gap-3">
          <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          <span>ATMOSPHERIC SOUNDTRACK</span>
        </h2>

        <div className="bg-black border border-red-700 p-6 max-w-4xl mx-auto">
          {/* Hidden audio element */}
          <audio ref={player.audioRef} preload="none" />

          {/* Track info */}
          <TrackInfo
            track={tracks[player.currentTrack]}
            currentIndex={player.currentTrack}
            totalTracks={tracks.length}
          />

          {/* Progress bar */}
          <ProgressBar
            currentTime={player.currentTime}
            duration={player.duration}
            buffered={player.buffered}
            onSeek={player.seek}
          />

          {/* Audio controls */}
          <AudioControls
            isPlaying={player.isPlaying}
            isLoading={player.isLoading}
            loop={player.loop}
            volume={player.volume}
            onTogglePlay={player.togglePlay}
            onToggleLoop={() => player.setLoop(!player.loop)}
            onVolumeChange={player.setVolume}
          />

          {/* Playlist */}
          <PlaylistView
            tracks={tracks}
            currentTrack={player.currentTrack}
            prefetch={player.prefetch}
            onTrackClick={player.handleTrackClick}
            onPrefetch={player.prefetchTrack}
          />
        </div>

        {/* Footer message */}
        <div className="text-center mt-8">
          <p className="text-gray-400 font-nunito text-sm">
            🎧 Use this audio to immerse your game.
          </p>
        </div>
      </div>
    </section>
  );
}

// Re-export types for convenience
export type { Track } from './types';
