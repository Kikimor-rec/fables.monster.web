/**
 * Прогресс-бар с отображением времени и буферизации
 */

import { memo } from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  buffered: number;
  onSeek: (percent: number) => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const ProgressBar = memo(function ProgressBar({
  currentTime,
  duration,
  buffered,
  onSeek,
}: ProgressBarProps) {
  const playedPercent = duration ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(Number(e.target.value));
  };

  return (
    <div className="mb-6">
      {/* Time display */}
      <div className="flex justify-between text-gray-400 font-nunito text-sm mb-2">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Progress bars */}
      <div className="relative h-2 bg-gray-700 rounded-lg">
        {/* Buffered progress */}
        <div
          style={{ width: `${buffered}%` }}
          className="absolute left-0 top-0 h-full bg-gray-500 rounded-lg transition-all"
        />

        {/* Played progress */}
        <div
          style={{ width: `${playedPercent}%` }}
          className="absolute left-0 top-0 h-full bg-red-700 rounded-lg transition-all"
        />

        {/* Seek slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={playedPercent}
          onChange={handleSeek}
          className="absolute w-full h-2 opacity-0 cursor-pointer"
          aria-label="Seek"
        />
      </div>
    </div>
  );
});
