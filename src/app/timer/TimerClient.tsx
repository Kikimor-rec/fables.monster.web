"use client";

import { useState, useEffect, useRef } from 'react';

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

  // Эффект загрузки
  useEffect(() => {
    const bootSequence = [
      "INITIALIZING TIMER SYSTEM...",
      "LOADING CHRONOMETER PROTOCOLS...",
      "CALIBRATING TIME CIRCUITS...",
      "ESTABLISHING TEMPORAL SYNC...",
      "TIMER READY"
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
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Случайные глитчи
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

  // Таймер
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
      case "RUNNING": return "text-green-400";
      case "PAUSED": return "text-yellow-400";
      case "COMPLETED": return "text-red-400";
      case "READY": return "text-blue-400";
      default: return "text-green-500";
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
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center crt-terminal">
        <div className="text-center px-2">
          <div className="mb-8">
            <pre className="text-green-400 font-mono text-xs sm:text-sm animate-pulse overflow-x-auto max-w-full">
              {`
████████╗██╗███╗   ███╗███████╗██████╗ 
╚══██╔══╝██║████╗ ████║██╔════╝██╔══██╗
   ██║   ██║██╔████╔██║█████╗  ██████╔╝
   ██║   ██║██║╚██╔╝██║██╔══╝  ██╔══██╗
   ██║   ██║██║ ╚═╝ ██║███████╗██║  ██║
   ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝
              `}
            </pre>
          </div>
          <div className="text-green-300 text-lg sm:text-xl mb-4">
            {loadingText}
          </div>
          <div className="text-green-500">
            <span className="animate-pulse">█</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black text-green-400 font-mono relative crt-terminal ${glitch ? 'animate-pulse' : ''}`}>
      {/* Glitch Effect */}
      {glitch && (
        <div className="fixed inset-0 z-20 bg-green-500 opacity-10 animate-ping"></div>
      )}

      {/* Главный контейнер */}
      <div className="relative z-0">
        
        {/* Секция настроек таймера - полный экран */}
        <section className="min-h-screen flex items-center justify-center px-1 py-2 sm:px-4 sm:py-6 md:px-6 md:py-8">
          <div className="bg-black p-3 sm:p-6 md:p-8 lg:p-12 rounded-lg border-2 border-green-400 shadow-lg shadow-green-400/50 w-full max-w-4xl">
            
            {/* Заголовок секции настроек */}
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-300 mb-4">
                TIMER CONFIGURATION
              </h1>
              <div className={`text-sm sm:text-base font-mono ${getStatusColor()}`}>
                STATUS: {getTimerStatus()}
              </div>
            </div>

            {/* Панель управления - центрированная */}
            <div className="max-w-2xl mx-auto">
              
              {/* Установка времени */}
              <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
                <div className="text-center">
                  <div className="text-green-500 mb-4 text-lg font-mono">SET DURATION</div>
                  <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
                    <div className="flex items-center">
                      <div className="flex flex-col items-center">
                        <label className="text-sm text-green-600 mb-1 sm:mb-2">HOURS</label>
                        <input
                          type="number"
                          min="0"
                          max="23"
                          value={hours}
                          onChange={(e) => setHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                          className="w-16 sm:w-20 md:w-24 bg-black border-2 border-green-600 text-green-400 text-center py-2 sm:py-3 text-base sm:text-lg font-mono focus:border-green-300 focus:outline-none rounded"
                          disabled={isRunning}
                        />
                      </div>
                      <div className="text-green-400 text-xl sm:text-2xl md:text-3xl font-bold px-1 sm:px-2">:</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex flex-col items-center">
                        <label className="text-sm text-green-600 mb-1 sm:mb-2">MINUTES</label>
                        <input
                          type="number"
                          min="0"
                          max="59"
                          value={minutes}
                          onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                          className="w-16 sm:w-20 md:w-24 bg-black border-2 border-green-600 text-green-400 text-center py-2 sm:py-3 text-base sm:text-lg font-mono focus:border-green-300 focus:outline-none rounded"
                          disabled={isRunning}
                        />
                      </div>
                      <div className="text-green-400 text-xl sm:text-2xl md:text-3xl font-bold px-1 sm:px-2">:</div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <label className="text-sm text-green-600 mb-1 sm:mb-2">SECONDS</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={seconds}
                        onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                        className="w-16 sm:w-20 md:w-24 bg-black border-2 border-green-600 text-green-400 text-center py-2 sm:py-3 text-base sm:text-lg font-mono focus:border-green-300 focus:outline-none rounded"
                        disabled={isRunning}
                      />
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2 sm:gap-4 mb-4">
                {[5, 10, 30].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => applyPreset(m)}
                    disabled={isRunning}
                    className="px-3 py-2 bg-green-800 text-white border-2 border-green-600 rounded text-sm sm:text-base hover:bg-green-700 disabled:bg-gray-700"
                  >
                    {m} MIN
                  </button>
                ))}
              </div>

              <button
                onClick={setTimer}
                disabled={isRunning || (hours === 0 && minutes === 0 && seconds === 0)}
                className="w-full bg-green-700 text-white py-4 sm:py-5 text-lg sm:text-xl border-2 border-green-600 hover:bg-green-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:border-gray-600 transition-colors font-mono rounded"
              >
                  [SET TIMER]
                </button>
              </div>

              {/* Кнопки управления */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
                <button
                  onClick={startTimer}
                  disabled={currentSeconds === 0 || (isRunning && !isPaused)}
                  className="bg-blue-700 text-white py-4 sm:py-5 text-base sm:text-lg border-2 border-blue-600 hover:bg-blue-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:border-gray-600 transition-colors font-mono rounded"
                >
                  {isRunning && !isPaused ? "[RUNNING]" : "[START]"}
                </button>
                
                {isPaused ? (
                  <button
                    onClick={resumeTimer}
                    className="bg-yellow-700 text-white py-4 sm:py-5 text-base sm:text-lg border-2 border-yellow-600 hover:bg-yellow-600 transition-colors font-mono rounded"
                  >
                    [RESUME]
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    disabled={!isRunning}
                    className="bg-yellow-700 text-white py-4 sm:py-5 text-base sm:text-lg border-2 border-yellow-600 hover:bg-yellow-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:border-gray-600 transition-colors font-mono rounded"
                  >
                    [PAUSE]
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <button
                  onClick={resetTimer}
                  disabled={totalSeconds === 0}
                  className="bg-orange-700 text-white py-4 sm:py-5 text-base sm:text-lg border-2 border-orange-600 hover:bg-orange-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:border-gray-600 transition-colors font-mono rounded"
                >
                  [RESET]
                </button>
                
                <button
                  onClick={clearTimer}
                  className="bg-red-700 text-white py-4 sm:py-5 text-base sm:text-lg border-2 border-red-600 hover:bg-red-600 transition-colors font-mono rounded"
                >
                  [CLEAR]
                </button>
              </div>
            </div>

            {/* Индикатор прокрутки */}
            <div className="text-center mt-8 sm:mt-12">
              <div className="text-green-500 text-sm font-mono mb-2">SCROLL DOWN FOR DISPLAY</div>
              <div className="animate-bounce">
                <div className="text-green-400 text-2xl">▼</div>
              </div>
            </div>
          </div>
        </section>

        {/* Секция дисплея таймера - полный экран */}
        <section className="min-h-screen flex items-center justify-center px-1 py-2 sm:px-4 sm:py-6 md:px-6 md:py-8">
          <div className="bg-black p-3 sm:p-6 md:p-8 lg:p-12 rounded-lg border-2 border-green-400 shadow-lg shadow-green-400/50 w-full max-w-4xl">
            
            {/* Заголовок секции дисплея */}
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-300 mb-4">
                CHRONOMETER DISPLAY
              </h1>
              <div className={`text-sm sm:text-base font-mono ${getStatusColor()}`}>
                STATUS: {getTimerStatus()}
              </div>
            </div>
            
            {/* Дисплей таймера - центрированный */}
            <div className="flex flex-col justify-center items-center space-y-8 sm:space-y-12">
              <div className="text-center">
                <div className="text-green-500 mb-4 text-lg sm:text-xl font-mono">REMAINING TIME</div>
                <div className={`text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-mono ${currentSeconds === 0 && totalSeconds > 0 ? 'text-red-400 animate-pulse' : getStatusColor()}`}>
                  {formatTime(currentSeconds)}
                </div>
              </div>

              {/* Прогресс бар */}
              {totalSeconds > 0 && (
                <div className="w-full max-w-2xl">
                  <div className="text-green-500 mb-4 text-lg font-mono text-center">PROGRESS</div>
                  <div className="w-full bg-gray-700 border-2 border-green-600 h-6 sm:h-8 rounded">
                    <div 
                      className="bg-green-500 h-full transition-all duration-1000 rounded"
                      style={{ width: `${getProgress()}%` }}
                    ></div>
                  </div>
                  <div className="text-center mt-4 text-lg sm:text-xl font-mono text-green-400">
                    {getProgress().toFixed(1)}%
                  </div>
                </div>
              )}

              {/* Информация о таймере */}
              <div className="text-center space-y-2 text-base sm:text-lg font-mono">
                {totalSeconds > 0 && (
                  <div className="text-green-500">
                    INITIAL: {formatTime(totalSeconds)}
                  </div>
                )}
                {currentSeconds === 0 && totalSeconds > 0 && (
                  <div className="text-red-400 animate-pulse font-bold text-xl sm:text-2xl">
                    ⚠ TIMER COMPLETED ⚠
                  </div>
                )}
              </div>
            </div>

            {/* Индикатор прокрутки вверх */}
            <div className="text-center mt-8 sm:mt-12">
              <div className="text-green-500 text-sm font-mono mb-2">SCROLL UP FOR CONTROLS</div>
              <div className="animate-bounce">
                <div className="text-green-400 text-2xl">▲</div>
              </div>
            </div>
          </div>
        </section>

        {/* Статусная строка - фиксированная внизу */}
        <div className="fixed bottom-0 left-0 right-0 p-2 sm:p-3 bg-green-900 bg-opacity-90 border-t-2 border-green-600 backdrop-blur-sm z-30">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm font-mono space-y-1 sm:space-y-0 max-w-7xl mx-auto px-2">
            <div className="text-green-400">
              CHRONOMETER SYSTEM v2.1.0
            </div>
            <div className={`${getStatusColor()}`}>
              {getTimerStatus()} | {formatTime(currentSeconds)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
