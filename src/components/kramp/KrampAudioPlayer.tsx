"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Track {
  title: string;
  filename: string;
}

interface KrampAudioPlayerProps {
  lang: string;
}

const DEFAULT_TRACKS: Track[] = [
  { title: "Every Day Is Christmas", filename: "2-every-day-is-christmas.mp3" },
  { title: "I Can Smell Yours Sins", filename: "3-i-can-smell-yours-sins.mp3" },
];

export default function KrampAudioPlayer({ lang }: KrampAudioPlayerProps) {
  const isRu = lang === "ru";
  const [tracks, setTracks] = useState<Track[]>(DEFAULT_TRACKS);
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
    if (process.env.NODE_ENV !== "development") return;

    const loadTracks = async () => {
      try {
        const response = await fetch("/api/dev/kramp-tracks");
        if (!response.ok) return;

        const data = await response.json();
        if (Array.isArray(data.tracks) && data.tracks.length > 0) {
          setTracks(data.tracks);
        }
      } catch {
        setTracks(DEFAULT_TRACKS);
      }
    };

    loadTracks();
  }, []);

  const playTrack = useCallback(async (index: number = currentTrack) => {
    const audio = audioRef.current;
    const track = tracks[index];
    if (!audio || !track) return;

    if (index !== currentTrack) {
      setCurrentTrack(index);
    }

    const src = `/music/krampmusic/${track.filename}`;
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (loop) {
        audio.currentTime = 0;
        audio.play().catch(console.error);
        return;
      }

      if (currentTrack < tracks.length - 1) {
        playTrack(currentTrack + 1);
        return;
      }

      if (loopAll) {
        playTrack(0);
        return;
      }

      setIsPlaying(false);
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
  }, [currentTrack, loop, loopAll, playTrack, tracks.length]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    playTrack();
  };

  const toggleLoop = () => {
    if (!loop && !loopAll) {
      setLoop(true);
    } else if (loop) {
      setLoop(false);
      setLoopAll(true);
    } else {
      setLoopAll(false);
    }
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    audio.currentTime = percent * duration;
  };

  const handlePrev = () => {
    if (currentTrack <= 0) return;
    const previousTrack = currentTrack - 1;
    setCurrentTrack(previousTrack);
    if (isPlaying) {
      playTrack(previousTrack);
    }
  };

  const handleNext = () => {
    if (currentTrack >= tracks.length - 1) return;
    const nextTrack = currentTrack + 1;
    setCurrentTrack(nextTrack);
    if (isPlaying) {
      playTrack(nextTrack);
    }
  };

  if (tracks.length === 0) {
    return (
      <div className="bg-black/90 border border-red-700/50 rounded-lg p-6">
        <div className="text-center">
          <div className="text-red-500 font-orbitron mb-2">! {isRu ? "НЕТ ТРЕКОВ" : "NO TRACKS"}</div>
          <p className="text-gray-400 font-mono text-sm">
            {isRu
              ? "Добавьте аудио файлы в папку public/music/krampmusic/"
              : "Add audio files to public/music/krampmusic/"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/90 border border-red-700/50 rounded-lg overflow-hidden">
      <audio ref={audioRef} preload="none" />

      <div className="bg-gradient-to-r from-red-900/50 to-green-900/30 px-4 py-3 border-b border-red-700/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className={`w-3 h-3 rounded-full ${isPlaying ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-green-400 font-mono text-sm">
            kramp@station:~/audio-player$ {isRu ? "саундтрек" : "soundtrack"}
          </span>
        </div>
      </div>

      <div className="px-6 py-4 bg-gradient-to-b from-red-900/20 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-red-900/30 border border-red-600/50 rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-xs text-red-500 font-mono mb-1">
              {isRu ? "СЕЙЧАС ИГРАЕТ" : "NOW PLAYING"}
            </div>
            <div className="text-white font-orbitron text-lg truncate">
              {tracks[currentTrack]?.title || "Unknown Track"}
            </div>
            <div className="text-gray-500 font-mono text-xs">
              KRAMP.EXE OST - {isRu ? "Трек" : "Track"} {currentTrack + 1}/{tracks.length}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-2">
        <div className="h-2 bg-gray-800 rounded-full cursor-pointer group" onClick={handleSeek}>
          <div
            className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full relative group-hover:from-red-500 group-hover:to-red-400 transition-colors"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 font-mono mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="px-6 py-4 flex items-center justify-center gap-3">
        <button
          onClick={toggleLoop}
          className={`p-2 transition-colors ${
            loop ? "text-red-400" : loopAll ? "text-green-400" : "text-gray-500 hover:text-white"
          }`}
          title={loop ? (isRu ? "Повтор трека" : "Repeat track") : loopAll ? (isRu ? "Повтор всех" : "Repeat all") : (isRu ? "Без повтора" : "No repeat")}
          type="button"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill={loop || loopAll ? "currentColor" : "none"} stroke={loop || loopAll ? "none" : "currentColor"} strokeWidth="2" aria-hidden="true">
            <path d="M17 17H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
            <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7z" />
          </svg>
        </button>

        <button
          onClick={handlePrev}
          disabled={currentTrack === 0}
          className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label={isRu ? "Предыдущий трек" : "Previous track"}
          type="button"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>

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
          aria-label={isPlaying ? (isRu ? "Пауза" : "Pause") : (isRu ? "Играть" : "Play")}
          type="button"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={handleNext}
          disabled={currentTrack >= tracks.length - 1}
          className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label={isRu ? "Следующий трек" : "Next track"}
          type="button"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>

      <div className="px-6 py-2 flex items-center gap-3">
        <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
        </svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => setVolume(parseFloat(event.target.value))}
          aria-label={isRu ? "Громкость" : "Volume"}
          className="flex-1 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <span className="text-xs text-gray-500 font-mono w-8">{Math.round(volume * 100)}%</span>
      </div>

      {(loop || loopAll) && (
        <div className="px-6 py-1 text-center">
          <span className={`text-xs font-mono ${loop ? "text-red-400" : "text-green-400"}`}>
            {loop ? (isRu ? "Повтор трека" : "Repeat track") : (isRu ? "Повтор плейлиста" : "Repeat playlist")}
          </span>
        </div>
      )}

      <div className="border-t border-red-700/30">
        <div className="px-4 py-2 bg-gray-900/30 text-xs font-mono text-gray-500 flex items-center justify-between">
          <span>PLAYLIST</span>
          <span>{tracks.length} {isRu ? "треков" : "tracks"}</span>
        </div>
        <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-700 scrollbar-track-black">
          {tracks.map((track, index) => (
            <button
              key={track.filename}
              onClick={() => playTrack(index)}
              className={`w-full px-4 py-3 flex items-center gap-3 transition-colors text-left ${
                currentTrack === index
                  ? "bg-red-900/30 text-white"
                  : "hover:bg-gray-900/50 text-gray-400 hover:text-white"
              }`}
              type="button"
            >
              <span className="w-6 h-6 flex items-center justify-center text-xs font-mono">
                {currentTrack === index && isPlaying ? (
                  <span className="text-red-500 animate-pulse">&gt;</span>
                ) : (
                  <span className="text-gray-600">{String(index + 1).padStart(2, "0")}</span>
                )}
              </span>
              <span className="flex-1 truncate font-rajdhani">{track.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-2 bg-gray-900/50 border-t border-red-700/30 flex items-center justify-between text-xs font-mono text-gray-500">
        <span>KRAMP.EXE AUDIO MODULE</span>
        <span className="text-red-600">{isRu ? "ОНЛАЙН" : "ONLINE"}</span>
      </div>
    </div>
  );
}
