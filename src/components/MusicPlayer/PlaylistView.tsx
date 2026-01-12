/**
 * Отображает список треков с возможностью выбора и предзагрузки
 */

import { memo } from 'react';
import type { Track, PrefetchState } from './types';

interface PlaylistViewProps {
  tracks: Track[];
  currentTrack: number;
  prefetch: Record<number, PrefetchState>;
  onTrackClick: (index: number) => void;
  onPrefetch: (index: number) => void;
}

function getPrefetchStatus(prefetch: PrefetchState | undefined): string {
  if (!prefetch) return '⬇️';
  if (prefetch.done) return '✅';
  return `🔄 ${prefetch.progress.toFixed(0)}%`;
}

export const PlaylistView = memo(function PlaylistView({
  tracks,
  currentTrack,
  prefetch,
  onTrackClick,
  onPrefetch,
}: PlaylistViewProps) {
  return (
    <div className="border-t border-red-700 pt-4">
      <h4 className="text-lg font-bold text-white mb-4 font-nunito text-center">
        PLAYLIST
      </h4>
      <div className="grid gap-2 max-h-64 overflow-y-auto">
        {tracks.map((track, index) => {
          const prefetchState = prefetch[index];
          const status = getPrefetchStatus(prefetchState);
          const isCurrent = index === currentTrack;

          return (
            <div
              key={index}
              className={`flex items-center justify-between p-3 border transition-colors font-nunito ${
                isCurrent
                  ? 'border-red-700 bg-red-700/20 text-white'
                  : 'border-gray-700 text-gray-300 hover:border-red-700 hover:bg-red-700/10'
              }`}
            >
              <button
                onClick={() => onTrackClick(index)}
                className="flex-1 text-left"
                aria-label={`${isCurrent ? 'Currently playing: ' : 'Play '}${track.title}`}
              >
                {track.title}
              </button>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <button
                  onClick={() => onPrefetch(index)}
                  disabled={prefetchState?.done}
                  className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  title={prefetchState?.done ? 'Already prefetched' : 'Prefetch track'}
                  aria-label={`Prefetch ${track.title}`}
                >
                  {status}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
