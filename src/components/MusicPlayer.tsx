"use client";

import { useState, useRef, useEffect } from "react";

interface Track {
  title: string;
  filename: string;
}

export default function MusicPlayer() {
  const tracks: Track[] = [
    { title: "In a Deep Space", filename: "1-In-a-deep-space.mp3" },
    { title: "Arrival at the Black Hole", filename: "2-arrival-at-the-black-hole.mp3" },
    { title: "Welcome to Silk Star", filename: "1_2-Welcome-to-Silk-Star.mp3" },
    { title: "Breath of Black Hole", filename: "2_-Breath-of-black-hole.mp3" },
    { title: "Radiation Wave", filename: "3_-Radiation-wave.mp3" },
    { title: "Keep Silence", filename: "4_-Keep-Silence.mp3" },
    { title: "Pray to Mark", filename: "5_-Pray-to-Mark.mp3" },
    { title: "I Can't Breathe", filename: "6_-I-can't-breath.mp3" },
    { title: "Afterword", filename: "10_-Afterword.mp3" }
  ];

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [loop, setLoop] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (loop) {
        audio.currentTime = 0;
        audio.play();
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [loop]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = loop;
    }
  }, [volume, loop]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const selectTrack = (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTrack(index);
    setIsPlaying(false);
    audio.load();
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = (Number(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <section className="py-20 bg-gray-900 border-t border-red-700">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-12 text-center font-mono">
          🎵 ATMOSPHERIC SOUNDTRACK
        </h2>
        
        <div className="bg-black border border-red-700 p-6 max-w-4xl mx-auto">
          {/* Audio Element */}
          <audio
            ref={audioRef}
            src={`/music/lostmarkmusic/${tracks[currentTrack].filename}`}
            preload="metadata"
          />
          
          {/* Current Track Display */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2 font-mono">
              {tracks[currentTrack].title}
            </h3>
            <div className="text-gray-400 font-mono text-sm">
              Track {currentTrack + 1} of {tracks.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-gray-400 font-mono text-sm mb-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={togglePlay}
              className="bg-red-700 hover:bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold transition-colors"
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            
            <button
              onClick={() => setLoop(!loop)}
              className={`border-2 text-white w-12 h-12 rounded-full flex items-center justify-center font-mono transition-colors ${
                loop ? 'border-red-700 bg-red-700' : 'border-gray-600 hover:border-red-700'
              }`}
            >
              🔁
            </button>
          </div>

          {/* Volume Control */}
          <div className="mb-6">
            <div className="flex items-center gap-4 justify-center">
              <span className="text-gray-400 font-mono text-sm">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-gray-400 font-mono text-sm">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>

          {/* Track List */}
          <div className="border-t border-red-700 pt-4">
            <h4 className="text-lg font-bold text-white mb-4 font-mono text-center">
              PLAYLIST
            </h4>
            <div className="grid gap-2 max-h-64 overflow-y-auto">
              {tracks.map((track, index) => (
                <button
                  key={index}
                  onClick={() => selectTrack(index)}
                  className={`text-left p-3 border transition-colors font-mono ${
                    index === currentTrack
                      ? 'border-red-700 bg-red-700/20 text-white'
                      : 'border-gray-700 text-gray-300 hover:border-red-700 hover:bg-red-700/10'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{track.title}</span>
                    <span className="text-sm text-gray-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400 font-mono text-sm">
            🎧 Use headphones for the best atmospheric experience
          </p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #dc2626;
          cursor: pointer;
          border-radius: 50%;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #dc2626;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }
      `}</style>
    </section>
  );
}
