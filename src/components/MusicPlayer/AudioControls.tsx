/**
 * Кнопки управления аудио плеером
 */

import { memo } from 'react';

interface AudioControlsProps {
  isPlaying: boolean;
  isLoading: boolean;
  loop: boolean;
  volume: number;
  onTogglePlay: () => void;
  onToggleLoop: () => void;
  onVolumeChange: (volume: number) => void;
}

export const AudioControls = memo(function AudioControls({
  isPlaying,
  isLoading,
  loop,
  volume,
  onTogglePlay,
  onToggleLoop,
  onVolumeChange,
}: AudioControlsProps) {
  return (
    <>
      {/* Play/Pause and Loop buttons */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={onTogglePlay}
          className="bg-red-700 hover:bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-nunito font-bold transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isLoading ? (
            <svg
              className="w-5 h-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
          ) : isPlaying ? (
            '⏸'
          ) : (
            '▶'
          )}
        </button>

        <button
          onClick={onToggleLoop}
          className={`border-2 text-white w-12 h-12 rounded-full flex items-center justify-center font-nunito transition-colors ${
            loop
              ? 'border-red-700 bg-red-700'
              : 'border-gray-600 hover:border-red-700'
          }`}
          aria-label={loop ? 'Disable loop' : 'Enable loop'}
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M17 1l4 4-4 4" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <path d="M7 23l-4-4 4-4" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
        </button>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="text-center mb-4 text-gray-400 font-nunito text-sm animate-pulse">
          Buffering…
        </div>
      )}

      {/* Volume control */}
      <div className="mb-6">
        <div className="flex items-center gap-4 justify-center">
          <svg
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            aria-label="Volume"
          />
          <span className="text-gray-400 font-nunito text-sm">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </>
  );
});
