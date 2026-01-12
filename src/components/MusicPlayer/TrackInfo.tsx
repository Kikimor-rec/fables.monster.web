/**
 * Отображает информацию о текущем треке
 */

import type { Track } from './types';

interface TrackInfoProps {
  track: Track;
  currentIndex: number;
  totalTracks: number;
}

export function TrackInfo({ track, currentIndex, totalTracks }: TrackInfoProps) {
  return (
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold text-white mb-2 font-nunito">
        {track.title}
      </h3>
      <div className="text-gray-400 font-nunito text-sm">
        Track {currentIndex + 1} of {totalTracks}
      </div>
    </div>
  );
}
