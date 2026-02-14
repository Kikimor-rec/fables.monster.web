"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { KrampDictionary } from "./types";

interface Track {
  title: string;
  filename: string;
}

interface KrampAudioPlayerProps {
  labels?: KrampDictionary["soundtrack"];
}

export default function KrampAudioPlayer({ labels }: KrampAudioPlayerProps) {
  const player = labels?.player;

  const [tracks, setTracks] = useState<Track[]>([]);
  const [tracksLoaded, setTracksLoaded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(false);
  const [loopAll, setLoopAll] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const response = await fetch('/api/dev/kramp-tracks');
        if (response.ok) {
          const data = await response.json();
          setTracks(data.tracks);
        }
      } catch {
        setTracks([
          { title: "Festive Synthwave", filename: "festive-synthwave.mp3" },
          { title: "Holiday Horror", filename: "holiday-horror.mp3" },
        ]);
      }
      setTracksLoaded(true);
    };
    loadTracks();
  }, []);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (loop) {
        // Повторяем текущий трек
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else if (currentTrack < tracks.length - 1) {
        const nextIndex = currentTrack + 1;
        setCurrentTrack(nextIndex);
        const nextSrc = `/music/krampmusic/${tracks[nextIndex]?.filename}`;
        if (audio && nextSrc) {
          audio.src = nextSrc;
          audio.load();
          audio.play().catch(console.error);
        }
      } else if (loopAll) {
        // Повторяем весь плейлист с начала
        setCurrentTrack(0);
        const nextSrc = `/music/krampmusic/${tracks[0]?.filename}`;
        if (audio && nextSrc) {
          audio.src = nextSrc;
          audio.load();
          audio.play().catch(console.error);
        }
      } else {
        setIsPlaying(false);
      }
    };
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [currentTrack, tracks, loop, loopAll]);

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playTrack = useCallback(async (index: number = currentTrack) => {
    const audio = audioRef.current;
    if (!audio || tracks.length === 0) return;

    if (index !== currentTrack) {
      setCurrentTrack(index);
    }

    const src = `/music/krampmusic/${tracks[index].filename}`;
    if (audio.src !== window.location.origin + src) {
      audio.src = src;
      audio.load();
    }

    setIsLoading(true);
    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Failed to play:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentTrack, tracks]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      playTrack();
    }
  };

  const toggleLoop = () => {
    if (!loop && !loopAll) {
      setLoop(true); // Loop one
    } else if (loop) {
      setLoop(false);
      setLoopAll(true); // Loop all
    } else {
      setLoopAll(false); // No loop
    }
  };

  const formatTime = (time: number) => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * duration;
  };

  const handlePrev = () => {
    if (currentTrack > 0) {
      setCurrentTrack(prev => prev - 1);
      if (isPlaying) {
        setTimeout(() => playTrack(currentTrack - 1), 100);
      }
    }
  };

  const handleNext = () => {
    if (currentTrack < tracks.length - 1) {
      setCurrentTrack(prev => prev + 1);
      if (isPlaying) {
        setTimeout(() => playTrack(currentTrack + 1), 100);
      }
    }
  };

  if (!tracksLoaded) {
    return (
      <div className="bg-black/90 border border-red-700/50 rounded-lg p-6">
        <div className="flex items-center justify-center gap-3">
          <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-red-400 font-mono">{player?.loading || "Loading..."}</span>
        </div>
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div className="bg-black/90 border border-red-700/50 rounded-lg p-6">
        <div className="text-center">
          <div className="text-red-500 font-orbitron mb-2">⚠ {player?.noTracks || "NO TRACKS"}</div>
          <p className="text-gray-400 font-mono text-sm">
            {player?.noTracksHint || "Add audio files to public/music/krampmusic/"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/90 border border-red-700/50 rounded-lg overflow-hidden">
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="metadata" />

      {/* Header */}
      <div className="bg-gradient-to-r from-red-900/50 to-green-900/30 px-4 py-3 border-b border-red-700/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className={`w-3 h-3 rounded-full ${isPlaying ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-green-400 font-mono text-sm">
            kramp@station:~/audio-player$ {player?.terminalCommand || "soundtrack"}
          </span>
        </div>
      </div>

      {/* Current Track Display */}
      <div className="px-6 py-4 bg-gradient-to-b from-red-900/20 to-transparent">
        <div className="flex items-center gap-4">
          {/* Album Art Placeholder */}
          <div className="w-16 h-16 bg-red-900/30 border border-red-600/50 rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-xs text-red-500 font-mono mb-1">
              {player?.nowPlaying || "NOW PLAYING"}
            </div>
            <div className="text-white font-orbitron text-lg truncate">
              {tracks[currentTrack]?.title || player?.unknownTrack || "Unknown Track"}
            </div>
            <div className="text-gray-500 font-mono text-xs">
              KRAMP.EXE OST • {player?.trackLabel || "Track"} {currentTrack + 1}/{tracks.length}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-2">
        <div 
          className="h-2 bg-gray-800 rounded-full cursor-pointer group"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full relative group-hover:from-red-500 group-hover:to-red-400 transition-colors"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"></div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 font-mono mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 flex items-center justify-center gap-3">
        {/* Loop Button */}
        <button
          onClick={toggleLoop}
          className={`p-2 transition-colors ${
            loop 
              ? "text-red-400" 
              : loopAll 
                ? "text-green-400" 
                : "text-gray-500 hover:text-white"
          }`}
          title={loop ? (player?.repeatTrack || "Repeat track") : loopAll ? (player?.repeatAll || "Repeat all") : (player?.noRepeat || "No repeat")}
        >
          {loop ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 17H7v-3l-4 4 4 4v-3h12v-6h-2v4zm2-10h-2V4h2v3zM7 7h10v3l4-4-4-4v3H5v6h2V7zm4 5h2v4h-2v-4z"/>
            </svg>
          ) : loopAll ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 17H7v-3l-4 4 4 4v-3h12v-6h-2v4zm2-10V4h-2v3H7V4l-4 4 4 4v-3h10v3h2V7z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 17H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7z"/>
            </svg>
          )}
        </button>

        {/* Previous */}
        <button
          onClick={handlePrev}
          disabled={currentTrack === 0}
          className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
            isLoading 
              ? "bg-yellow-900/50 text-yellow-400 border-2 border-yellow-600"
              : isPlaying
                ? "bg-red-600 text-white hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                : "bg-red-900/50 text-red-400 border-2 border-red-600 hover:bg-red-800/50 hover:text-white"
          }`}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          ) : isPlaying ? (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={currentTrack >= tracks.length - 1}
          className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
      </div>

      {/* Volume Control */}
      <div className="px-6 py-2 flex items-center gap-3">
        <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
        </svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="flex-1 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <span className="text-xs text-gray-500 font-mono w-8">{Math.round(volume * 100)}%</span>
      </div>

      {/* Loop Status */}
      {(loop || loopAll) && (
        <div className="px-6 py-1 text-center">
          <span className={`text-xs font-mono ${loop ? "text-red-400" : "text-green-400"}`}>
            {loop 
              ? (player?.loopTrackStatus || "🔂 Repeat track")
              : (player?.loopPlaylistStatus || "🔁 Repeat playlist")
            }
          </span>
        </div>
      )}

      {/* Track List */}
      <div className="border-t border-red-700/30">
        <div className="px-4 py-2 bg-gray-900/30 text-xs font-mono text-gray-500 flex items-center justify-between">
          <span>📁 {player?.playlist || "PLAYLIST"}</span>
          <span>{tracks.length} {player?.tracks || "tracks"}</span>
        </div>
        <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-700 scrollbar-track-black">
          {tracks.map((track, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentTrack(index);
                playTrack(index);
              }}
              className={`w-full px-4 py-3 flex items-center gap-3 transition-colors text-left ${
                currentTrack === index 
                  ? "bg-red-900/30 text-white"
                  : "hover:bg-gray-900/50 text-gray-400 hover:text-white"
              }`}
            >
              <span className="w-6 h-6 flex items-center justify-center text-xs font-mono">
                {currentTrack === index && isPlaying ? (
                  <span className="text-red-500 animate-pulse">▶</span>
                ) : (
                  <span className="text-gray-600">{String(index + 1).padStart(2, '0')}</span>
                )}
              </span>
              <span className="flex-1 truncate font-rajdhani">{track.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-900/50 border-t border-red-700/30 flex items-center justify-between text-xs font-mono text-gray-500">
        <span>KRAMP.EXE AUDIO MODULE</span>
        <span className="text-red-600">{player?.online || "ONLINE"}</span>
      </div>
    </div>
  );
}
