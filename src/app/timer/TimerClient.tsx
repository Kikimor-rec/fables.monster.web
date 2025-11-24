"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function TimerClient() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const playBeep = () => {
    try {
      const AudioClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioClass();
      const oscillator = ctx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(1000, ctx.currentTime);
      oscillator.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.2);
    } catch {
      // ignore failures
    }
  };

  // Load saved state
  useEffect(() => {
    try {
      const saved = localStorage.getItem('timerState');
      if (saved) {
        const data = JSON.parse(saved);
        setHours(data.hours || 0);
        setMinutes(data.minutes || 0);
        setSeconds(data.seconds || 0);
        setTotalSeconds(data.totalSeconds || 0);

        let remaining = data.currentSeconds || 0;
        if (data.isRunning && !data.isPaused) {
          const diff = Math.floor((Date.now() - (data.lastUpdate || 0)) / 1000);
          remaining = Math.max(0, remaining - diff);
        }
        setCurrentSeconds(remaining);
        setIsRunning(data.isRunning && remaining > 0);
        setIsPaused(data.isPaused);

        if (remaining === 0 && data.currentSeconds > 0) {
          playBeep();
        }
      }
    } catch {
      // ignore corrupt data
    }
  }, []);

  // Boot sequence effect
  useEffect(() => {
    const bootSequence = [
      "INITIALIZING SYSTEM...",
      "LOADING PROTOCOLS...",
      "CALIBRATING...",
      "SYNCING...",
      "READY"
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < bootSequence.length) {
        setLoadingText(bootSequence[index]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 1000);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  // Random glitch effect
  useEffect(() => {
    if (!isLoading) {
      const glitchInterval = setInterval(() => {
        if (Math.random() < 0.05) {
          setGlitch(true);
          setTimeout(() => setGlitch(false), 150);
        }
      }, 8000);

      return () => clearInterval(glitchInterval);
    }
  }, [isLoading]);

  // Timer logic
  useEffect(() => {
    if (isRunning && !isPaused && currentSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsPaused(false);
            triggerGlitch();
            playBeep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, currentSeconds]);

  const triggerGlitch = () => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 300);
  };


  const setTimer = () => {
    const total = hours * 3600 + minutes * 60 + seconds;
    if (total > 0) {
      setTotalSeconds(total);
      setCurrentSeconds(total);
      setIsRunning(false);
      setIsPaused(false);
      triggerGlitch();
    }
  };

  const startTimer = () => {
    if (currentSeconds > 0) {
      setIsRunning(true);
      setIsPaused(false);
      triggerGlitch();
    }
  };

  const pauseTimer = () => {
    if (isRunning) {
      setIsPaused(true);
      triggerGlitch();
    }
  };

  const resumeTimer = () => {
    if (isPaused) {
      setIsPaused(false);
      triggerGlitch();
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentSeconds(totalSeconds);
    triggerGlitch();
  };

  const clearTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentSeconds(0);
    setTotalSeconds(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    triggerGlitch();
  };

  const applyPreset = (mins: number) => {
    const totalMins = hours * 60 + minutes + mins;
    setHours(Math.floor(totalMins / 60));
    setMinutes(totalMins % 60);
    triggerGlitch();
  };

  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (totalSeconds === 0) return 0;
    return ((totalSeconds - currentSeconds) / totalSeconds) * 100;
  };

  const getTimerStatus = () => {
    if (currentSeconds === 0 && totalSeconds > 0) return "COMPLETED";
    if (isRunning && !isPaused) return "RUNNING";
    if (isPaused) return "PAUSED";
    if (currentSeconds > 0) return "READY";
    return "STANDBY";
  };

  const getStatusColor = () => {
    const status = getTimerStatus();
    switch (status) {
      case "RUNNING": return "text-cyan-400";
      case "PAUSED": return "text-yellow-400";
      case "COMPLETED": return "text-red-500";
      case "READY": return "text-white";
      default: return "text-gray-400";
    }
  };

  // Persist state
  useEffect(() => {
    const data = {
      hours,
      minutes,
      seconds,
      totalSeconds,
      currentSeconds,
      isRunning,
      isPaused,
      lastUpdate: Date.now(),
    };
    try {
      localStorage.setItem('timerState', JSON.stringify(data));
    } catch {
      // ignore write errors
    }
  }, [hours, minutes, seconds, totalSeconds, currentSeconds, isRunning, isPaused]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-cyan-400 font-orbitron flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10"></div>
        <div className="text-center px-4 relative z-10">
          <div className="mb-8">
            <div className="text-cyan-500 font-mono text-xs sm:text-sm animate-pulse tracking-widest">
              SYSTEM BOOT SEQUENCE
            </div>
          </div>
          <div className="text-white text-xl sm:text-2xl mb-4 font-bold tracking-wider">
            {loadingText}
          </div>
          <div className="w-48 h-1 bg-gray-800 mx-auto rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 animate-progress-indeterminate"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black text-gray-300 font-rajdhani relative overflow-hidden ${glitch ? 'glitch-effect' : ''}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.png')] opacity-5 pointer-events-none"></div>

      {/* Glitch Overlay */}
      {glitch && (
        <div className="fixed inset-0 z-50 bg-cyan-500/10 pointer-events-none mix-blend-overlay"></div>
      )}

      {/* Navigation Link */}
      <div className="absolute top-4 left-4 z-50">
        <Link href="/" className="text-xs font-orbitron text-gray-500 hover:text-cyan-400 transition-colors border border-gray-800 hover:border-cyan-500 px-3 py-1">
          &lt; RETURN TO BASE
        </Link>
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Settings Section */}
        <section className="flex-1 flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-4xl bg-gray-900/50 border border-cyan-900/50 backdrop-blur-sm p-6 sm:p-10 relative">
            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500"></div>

            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 font-orbitron tracking-wider text-glow-cyan">
                CHRONOMETER
              </h1>
              <div className={`text-sm font-mono tracking-widest ${getStatusColor()}`}>
                STATUS: {getTimerStatus()}
              </div>
            </div>

            {/* Controls Panel */}
            <div className="max-w-2xl mx-auto">

              {/* Time Input */}
              <div className="mb-10">
                <div className="text-center mb-6">
                  <div className="text-cyan-500 text-xs font-orbitron tracking-widest mb-4">SET DURATION</div>
                  <div className="flex flex-wrap justify-center items-end gap-4">

                    {/* Hours */}
                    <div className="flex flex-col items-center">
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={hours}
                        onChange={(e) => setHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                        className="w-20 sm:w-24 bg-black/50 border border-gray-700 text-white text-center py-3 text-2xl sm:text-3xl font-orbitron focus:border-cyan-500 focus:outline-none transition-colors"
                        disabled={isRunning}
                      />
                      <label className="text-xs text-gray-500 mt-2 font-mono">HRS</label>
                    </div>

                    <div className="text-gray-600 text-3xl font-orbitron pb-8">:</div>

                    {/* Minutes */}
                    <div className="flex flex-col items-center">
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={minutes}
                        onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                        className="w-20 sm:w-24 bg-black/50 border border-gray-700 text-white text-center py-3 text-2xl sm:text-3xl font-orbitron focus:border-cyan-500 focus:outline-none transition-colors"
                        disabled={isRunning}
                      />
                      <label className="text-xs text-gray-500 mt-2 font-mono">MIN</label>
                    </div>

                    <div className="text-gray-600 text-3xl font-orbitron pb-8">:</div>

                    {/* Seconds */}
                    <div className="flex flex-col items-center">
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={seconds}
                        onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                        className="w-20 sm:w-24 bg-black/50 border border-gray-700 text-white text-center py-3 text-2xl sm:text-3xl font-orbitron focus:border-cyan-500 focus:outline-none transition-colors"
                        disabled={isRunning}
                      />
                      <label className="text-xs text-gray-500 mt-2 font-mono">SEC</label>
                    </div>
                  </div>
                </div>

                {/* Presets */}
                <div className="flex justify-center gap-3 mb-6">
                  {[5, 10, 30].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => applyPreset(m)}
                      disabled={isRunning}
                      className="px-4 py-2 bg-gray-900 border border-gray-700 text-gray-300 font-orbitron text-sm hover:border-cyan-500 hover:text-cyan-400 disabled:opacity-50 transition-all"
                    >
                      +{m}M
                    </button>
                  ))}
                </div>

                <button
                  onClick={setTimer}
                  disabled={isRunning || (hours === 0 && minutes === 0 && seconds === 0)}
                  className="w-full bg-cyan-900/20 text-cyan-400 py-4 text-lg font-orbitron font-bold border border-cyan-500/50 hover:bg-cyan-500 hover:text-black disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-cyan-400 transition-all tracking-widest"
                >
                  INITIALIZE TIMER
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button
                  onClick={startTimer}
                  disabled={currentSeconds === 0 || (isRunning && !isPaused)}
                  className="bg-gray-900 text-white py-4 text-lg font-orbitron border border-gray-600 hover:border-green-500 hover:text-green-400 disabled:opacity-50 transition-all"
                >
                  {isRunning && !isPaused ? "RUNNING..." : "START"}
                </button>

                {isPaused ? (
                  <button
                    onClick={resumeTimer}
                    className="bg-gray-900 text-yellow-400 py-4 text-lg font-orbitron border border-yellow-600 hover:bg-yellow-900/20 transition-all"
                  >
                    RESUME
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    disabled={!isRunning}
                    className="bg-gray-900 text-white py-4 text-lg font-orbitron border border-gray-600 hover:border-yellow-500 hover:text-yellow-400 disabled:opacity-50 transition-all"
                  >
                    PAUSE
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={resetTimer}
                  disabled={totalSeconds === 0}
                  className="bg-gray-900 text-gray-400 py-3 text-sm font-orbitron border border-gray-700 hover:border-white hover:text-white disabled:opacity-50 transition-all"
                >
                  RESET
                </button>

                <button
                  onClick={clearTimer}
                  className="bg-gray-900 text-red-400 py-3 text-sm font-orbitron border border-red-900/50 hover:border-red-500 hover:bg-red-900/20 transition-all"
                >
                  CLEAR SYSTEM
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Display Section */}
        <section className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-black/50 border-t border-gray-900">
          <div className="w-full max-w-4xl text-center">
            <div className="mb-8">
              <div className="text-gray-600 text-xs font-orbitron tracking-[0.5em] mb-2">REMAINING TIME</div>
              <div className={`text-6xl sm:text-7xl md:text-9xl font-bold font-orbitron tracking-wider ${currentSeconds === 0 && totalSeconds > 0 ? 'text-red-500 animate-pulse text-glow-red' :
                isRunning ? 'text-white text-glow-white' :
                  'text-gray-500'
                }`}>
                {formatTime(currentSeconds)}
              </div>
            </div>

            {/* Progress Bar */}
            {totalSeconds > 0 && (
              <div className="max-w-2xl mx-auto px-4">
                <div className="w-full bg-gray-900 border border-gray-800 h-2 mb-2">
                  <div
                    className={`h-full transition-all duration-1000 ${currentSeconds === 0 ? 'bg-red-500' : 'bg-cyan-500'
                      }`}
                    style={{ width: `${getProgress()}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs font-mono text-gray-600">
                  <span>0%</span>
                  <span>{getProgress().toFixed(0)}%</span>
                  <span>100%</span>
                </div>
              </div>
            )}

            {/* Completion Message */}
            {currentSeconds === 0 && totalSeconds > 0 && (
              <div className="mt-8">
                <div className="inline-block border-2 border-red-500 text-red-500 px-6 py-2 font-orbitron font-bold tracking-widest animate-pulse">
                  SEQUENCE COMPLETE
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

