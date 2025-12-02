"use client";

import { useState, useRef, useCallback } from "react";

interface SFXTrack {
  id: string;
  name: string;
  nameRu: string;
  src: string;
  icon: "jingle" | "glitch" | "announcement";
}

const sfxTracks: SFXTrack[] = [
  {
    id: "jingle-normal-1",
    name: "PA Jingle",
    nameRu: "Джингл объявления",
    src: "/music/krampsfx/attention-jingle-1.mp3",
    icon: "jingle",
  },
  {
    id: "jingle-normal-2",
    name: "PA Jingle Alt",
    nameRu: "Джингл объявления 2",
    src: "/music/krampsfx/attention-jingle-2.mp3",
    icon: "jingle",
  },
  {
    id: "jingle-glitch-1",
    name: "Corrupted Jingle",
    nameRu: "Искажённый джингл",
    src: "/music/krampsfx/attention-glitch-1.mp3",
    icon: "glitch",
  },
  {
    id: "jingle-glitch-2",
    name: "Corrupted Jingle Alt",
    nameRu: "Искажённый джингл 2",
    src: "/music/krampsfx/attention-glitch-2.mp3",
    icon: "glitch",
  },
];

interface KrampSFXPanelProps {
  lang?: string;
}

export default function KrampSFXPanel({ lang = "en" }: KrampSFXPanelProps) {
  const [volume, setVolume] = useState(0.7);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  const getAudioRef = useCallback((id: string, src: string) => {
    if (!audioRefs.current.has(id)) {
      const audio = new Audio(src);
      audio.volume = volume;
      audio.addEventListener("ended", () => setPlayingId(null));
      audioRefs.current.set(id, audio);
    }
    return audioRefs.current.get(id)!;
  }, [volume]);

  const playSound = useCallback((track: SFXTrack) => {
    // Stop any currently playing sound
    if (playingId) {
      const currentAudio = audioRefs.current.get(playingId);
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    }

    const audio = getAudioRef(track.id, track.src);
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch(console.error);
    setPlayingId(track.id);
  }, [playingId, volume, getAudioRef]);

  const stopSound = useCallback(() => {
    if (playingId) {
      const audio = audioRefs.current.get(playingId);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setPlayingId(null);
    }
  }, [playingId]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    audioRefs.current.forEach((audio) => {
      audio.volume = newVolume;
    });
  }, []);

  const getIcon = (iconType: SFXTrack["icon"]) => {
    switch (iconType) {
      case "jingle":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        );
      case "glitch":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
    }
  };

  const isRu = lang === "ru";

  return (
    <div className="bg-gray-950 border border-green-900 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-green-400 font-orbitron text-sm uppercase tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          {isRu ? "SFX Панель" : "SFX Panel"}
        </h3>
        
        {/* Stop button */}
        {playingId && (
          <button
            onClick={stopSound}
            className="text-red-400 hover:text-red-300 transition-colors"
            title={isRu ? "Остановить" : "Stop"}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="1" />
            </svg>
          </button>
        )}
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-green-900/50">
        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0-12L8 10H4v4h4l4 4" />
        </svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="flex-1 h-2 bg-green-900/50 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:bg-green-500
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:hover:bg-green-400
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:bg-green-500
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:border-0"
        />
        <span className="text-green-600 text-xs font-mono w-10 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>

      {/* SFX Buttons Grid */}
      <div className="grid grid-cols-2 gap-2">
        {sfxTracks.map((track) => {
          const isPlaying = playingId === track.id;
          const isGlitch = track.icon === "glitch";
          
          return (
            <button
              key={track.id}
              onClick={() => playSound(track)}
              className={`
                relative p-3 rounded border transition-all duration-200
                flex items-center gap-2 text-left
                ${isPlaying
                  ? isGlitch
                    ? "bg-red-900/30 border-red-500 text-red-400"
                    : "bg-green-900/30 border-green-500 text-green-400"
                  : isGlitch
                    ? "bg-red-950/20 border-red-900/50 text-red-500 hover:bg-red-900/20 hover:border-red-700"
                    : "bg-green-950/20 border-green-900/50 text-green-500 hover:bg-green-900/20 hover:border-green-700"
                }
              `}
            >
              {/* Playing indicator */}
              {isPlaying && (
                <span className={`absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse ${isGlitch ? "bg-red-500" : "bg-green-500"}`} />
              )}
              
              <span className={isGlitch ? "text-red-600" : "text-green-600"}>
                {getIcon(track.icon)}
              </span>
              
              <span className="text-xs font-rajdhani truncate">
                {isRu ? track.nameRu : track.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Hint */}
      <p className="text-green-700 text-xs mt-3 text-center font-rajdhani">
        {isRu 
          ? "Джинглы для объявлений по громкой связи" 
          : "PA announcement jingles for your game"}
      </p>
    </div>
  );
}
