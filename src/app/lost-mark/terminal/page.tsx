"use client";

import { useState, useEffect } from 'react';

export default function LostMarkTerminal() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('default');
  const [glitch, setGlitch] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [corruptedAttempts, setCorruptedAttempts] = useState(0);
  const [showCorruptedMessage, setShowCorruptedMessage] = useState(false);
  const [typingText, setTypingText] = useState('');

  // Данные терминала
  const shipLogs = [
    {
      id: 'log1',
      timestamp: '2534.245.14:32:07',
      type: 'system',
      message: 'NAVIGATION SYSTEM ONLINE',
      details: 'Primary navigation systems functioning normally. All sensors operational.'
    },
    {
      id: 'log2',
      timestamp: '2534.245.14:33:15',
      type: 'warning',
      message: 'PROXIMITY ALERT - UNKNOWN VESSEL',
      details: 'Unidentified ship detected at coordinates 127.45.89. Configuration unknown. Attempting communication...'
    },
    {
      id: 'log3',
      timestamp: '2534.245.14:33:47',
      type: 'error',
      message: 'COMMUNICATION FAILURE',
      details: 'Unable to establish contact with unknown vessel. Recommend evasive maneuvers.'
    }
  ];

  const silkStarLogs = [
    {
      id: 'silk1',
      entry: '3528',
      content: 'Company denied request for additional fuel. Forced to recalculate route through unstable sector. The onboard Android is undergoing maintenance. So the jump will have to be controlled manually.'
    },
    {
      id: 'silk2', 
      entry: '3529',
      content: 'Entering hyperspace. Seven hours to jump exit.'
    },
    {
      id: 'silk3',
      entry: '3530', 
      content: 'Severe hull vibrations. Navigation systems malfunctioning. I\'m picking up a beacon bearing'
    },
    {
      id: 'silk4',
      entry: '3531',
      content: 'That can\'t be right. I don\'t...'
    }
  ];

  const cryoProtocol = `ACTIVATE_CRYO.PROTOCOL
<< AUTHORIZATION ACCEPTED >>

To sleep is to serve.
To serve is to become.
To become is to dissolve.
To dissolve is to rise.

:: CRYO_CYCLE: INITIATING ::`;

  const lifeSupportData = [
    {
      id: 'life1',
      name: 'ATMOSPHERIC_PROCESSOR_A1',
      status: '[NOMINAL]',
      description: 'Oxygen levels stable - 21.3%'
    },
    {
      id: 'life2',
      name: 'LIFE_SUPPORT_SECTOR_7',
      status: '[CRITICAL]',
      description: 'Multiple system failures detected'
    },
    {
      id: 'life3',
      name: 'EMERGENCY_BACKUP_SYS',
      status: '[OFFLINE]',
      description: 'Manual activation required'
    }
  ];

  const asciiEye = `
     ████████████████
   ██████████████████████
  ████████████████████████
 ██████████████████████████
██████████      ██████████████
████████  ██████  ████████████
████████████████████████████
██████████████████████████
 ██████████████████████████
  ████████████████████████
   ██████████████████████
     ████████████████
  `;

  // Эффект загрузки
  useEffect(() => {
    const bootSequence = [
      "INITIALIZING SILK STAR TERMINAL...",
      "LOADING CORE SYSTEMS...",
      "ACCESSING NAVIGATION DATABASE...",
      "ESTABLISHING SECURE CONNECTION...",
      "TERMINAL READY"
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
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Случайные глитчи
  useEffect(() => {
    if (!isLoading) {
      const glitchInterval = setInterval(() => {
        if (Math.random() < 0.1) {
          setGlitch(true);
          setTimeout(() => setGlitch(false), 200);
        }
      }, 5000);

      return () => clearInterval(glitchInterval);
    }
  }, [isLoading]);

  // Анимация появления текста "I CAN SEE YOU"
  useEffect(() => {
    if (showCorruptedMessage) {
      const message = "I CAN SEE YOU";
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex <= message.length) {
          setTypingText(message.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }
  }, [showCorruptedMessage]);

  const handleMenuClick = (menuType: string) => {
    setCurrentView(menuType);
    triggerGlitch();
  };

  const triggerGlitch = () => {
    if (Math.random() < 0.2) {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 300);
    }
  };

  const corruptText = (text: string, level = 0.1) => {
    const glitchChars = ['█', '▓', '▒', '░', '?', '#', '@', '%', '¿', '¡'];
    
    return text.split('').map((char: string) => {
      if (Math.random() < level) {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      return char;
    }).join('');
  };

  const handleCorruptedDataClear = () => {
    const newAttempts = corruptedAttempts + 1;
    setCorruptedAttempts(newAttempts);
    
    if (newAttempts >= 3) {
      setShowCorruptedMessage(true);
    } else {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 500);
    }
  };

  const renderContent = () => {
    switch(currentView) {
      case 'logs':
        return (
          <div className="space-y-4">
            <h3 className="text-green-300 font-bold mb-4">SYSTEM LOGS</h3>
            {shipLogs.map((log) => (
              <div key={log.id} className="border border-green-600 p-3 bg-green-900 bg-opacity-20">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-green-400">[{log.timestamp}]</span>
                  <span className={log.type === 'error' ? 'text-red-400' : log.type === 'warning' ? 'text-yellow-400' : 'text-green-400'}>
                    {log.type.toUpperCase()}
                  </span>
                </div>
                <div className="text-green-300 font-bold">{log.message}</div>
                <div className="text-green-500 text-sm mt-1">{log.details}</div>
              </div>
            ))}
          </div>
        );

      case 'silk-logs':
        return (
          <div className="space-y-4">
            <h3 className="text-green-300 font-bold mb-4">SILK STAR FLIGHT LOG</h3>
            {silkStarLogs.map((log) => (
              <div key={log.id} className="border border-green-600 p-3 bg-green-900 bg-opacity-20">
                <div className="text-green-400 text-sm mb-2">LOG ENTRY {log.entry}:</div>
                <div className="text-green-300">{corruptText(log.content, log.entry === '3531' ? 0.3 : 0.05)}</div>
              </div>
            ))}
          </div>
        );

      case 'footage':
        return (
          <div className="space-y-4">
            <h3 className="text-green-300 font-bold mb-4">LIFE SUPPORT SYSTEMS</h3>
            {lifeSupportData.map((system) => (
              <div key={system.id} className="border border-green-600 p-3 bg-green-900 bg-opacity-20">
                <div className="flex justify-between mb-2">
                  <span className="text-green-400">{system.name}</span>
                  <span className={system.status.includes('CRITICAL') ? 'text-red-400' : system.status.includes('OFFLINE') ? 'text-yellow-400' : 'text-green-400'}>
                    {system.status}
                  </span>
                </div>
                <div className="text-green-500 text-sm">{corruptText(system.description, 0.1)}</div>
                <div className="mt-2 text-center">
                  <div className="text-green-400 font-mono text-xs">
                    ████ ██ ██████ ████<br/>
                    ██ ████ ██ ████ ██<br/>
                    ████ ██ ████ ██████<br/>
                    [SYSTEM MONITORING]
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'cryo':
        return (
          <div className="space-y-4">
            <h3 className="text-green-300 font-bold mb-4">CRYOCAPSULE PROTOCOLS</h3>
            <div className="border border-green-600 p-4 bg-green-900 bg-opacity-20">
              <pre className="text-green-400 whitespace-pre-wrap font-mono text-sm">
                {cryoProtocol}
              </pre>
            </div>
            <div className="mt-4 text-red-400 text-center animate-pulse">
              WARNING: UNAUTHORIZED ACCESS TO CRYO SYSTEMS
            </div>
          </div>
        );

      case 'manifest':
        return (
          <div className="space-y-4">
            <h3 className="text-green-300 font-bold mb-4">CREW MANIFEST</h3>
            <div className="border border-green-600 p-3 bg-green-900 bg-opacity-20">
              <div className="text-green-400 mb-2">VESSEL: SILK STAR</div>
              <div className="text-green-400 mb-2">CREW COMPLEMENT: 12</div>
              <div className="text-green-300 mt-4">
                CAPTAIN: {corruptText('[REDACTED]', 0.8)}<br/>
                FIRST OFFICER: CONNECTION LOST...<br/>
                ENGINEER: CONNECTION LOST...<br/>
                MEDIC: CONNECTION LOST...<br/>
                <span className="text-red-400">[COMMUNICATION TERMINATED]</span>
              </div>
            </div>
          </div>
        );

      case 'corrupted':
        return (
          <div className="space-y-4">
            <h3 className="text-red-400 font-bold mb-4">[CORRUPTED DATA]</h3>
            <div className="border border-red-600 p-3 bg-red-900 bg-opacity-20">
              {!showCorruptedMessage ? (
                <>
                  <div className="text-red-400 animate-pulse mb-4">
                    {corruptText('ERROR: DATA INTEGRITY COMPROMISED', 0.5)}<br/>
                    {corruptText('UNKNOWN ENTITIES DETECTED', 0.4)}<br/>
                    {corruptText('CREW STATUS: UNKNOWN', 0.6)}<br/>
                    {corruptText('RECOMMEND IMMEDIATE EVACUATION', 0.3)}
                  </div>
                  <button
                    onClick={handleCorruptedDataClear}
                    className="w-full bg-red-900 hover:bg-red-800 text-red-300 p-2 border border-red-600 transition-colors"
                  >
                    [ATTEMPT DATA RECOVERY]
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <pre className="text-red-400 font-mono text-sm mb-4 animate-pulse">
                    {asciiEye}
                  </pre>
                  <div className="text-red-400 text-2xl font-bold animate-pulse">
                    {typingText}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-2 text-sm">
            <p className="text-green-500">SELECT A MENU OPTION TO VIEW DATA</p>
            <div className="mt-4 p-4 bg-green-900 bg-opacity-20 border border-green-600">
              <p className="text-green-400">SYSTEM STATUS: OPERATIONAL</p>
              <p className="text-yellow-400">WARNING: MULTIPLE SYSTEM ANOMALIES DETECTED</p>
              <p className="text-red-400">ERROR: UNABLE TO LOCATE PRIMARY CREW</p>
            </div>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center crt-terminal">
        <div className="text-center">
          <div className="mb-8">
            <pre className="text-green-400 font-mono text-sm animate-pulse">
              {`
███████╗██╗██╗     ██╗  ██╗    ███████╗████████╗ █████╗ ██████╗ 
██╔════╝██║██║     ██║ ██╔╝    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗
███████╗██║██║     █████╔╝     ███████╗   ██║   ███████║██████╔╝
╚════██║██║██║     ██╔═██╗     ╚════██║   ██║   ██╔══██║██╔══██╗
███████║██║███████╗██║  ██╗    ███████║   ██║   ██║  ██║██║  ██║
╚══════╝╚═╝╚══════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
              `}
            </pre>
          </div>
          <div className="text-green-300 text-xl mb-4">
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
    <div className={`h-screen bg-black text-green-400 font-mono overflow-hidden relative crt-terminal ${glitch ? 'animate-pulse' : ''}`}>
      {/* Glitch Effect */}
      {glitch && (
        <div className="fixed inset-0 z-20 bg-red-500 opacity-20 animate-ping"></div>
      )}

      <div className="h-full p-4 relative z-0">
        <div className="bg-black p-4 md:p-8 rounded-lg border-2 border-green-400 shadow-lg shadow-green-400/50 h-full">
          
          {/* Main Terminal Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 h-full">
            
            {/* Navigation Panel */}
            <div className="border border-green-400 p-4 flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-green-300">SYSTEM NAVIGATION</h2>
              <div className="space-y-2 flex-1">
                <button 
                  onClick={() => handleMenuClick('logs')}
                  className={`block w-full text-left p-2 hover:bg-green-900 border border-green-600 transition-colors ${currentView === 'logs' ? 'bg-green-900' : ''}`}
                >
                  [1] SHIP LOGS
                </button>
                <button 
                  onClick={() => handleMenuClick('silk-logs')}
                  className={`block w-full text-left p-2 hover:bg-green-900 border border-green-600 transition-colors ${currentView === 'silk-logs' ? 'bg-green-900' : ''}`}
                >
                  [2] SILK STAR LOGS
                </button>
                <button 
                  onClick={() => handleMenuClick('footage')}
                  className={`block w-full text-left p-2 hover:bg-green-900 border border-green-600 transition-colors ${currentView === 'footage' ? 'bg-green-900' : ''}`}
                >
                  [3] LIFE SUPPORT
                </button>
                <button 
                  onClick={() => handleMenuClick('manifest')}
                  className={`block w-full text-left p-2 hover:bg-green-900 border border-green-600 transition-colors ${currentView === 'manifest' ? 'bg-green-900' : ''}`}
                >
                  [4] CREW MANIFEST
                </button>
                <button 
                  onClick={() => handleMenuClick('cryo')}
                  className={`block w-full text-left p-2 hover:bg-green-900 border border-green-600 transition-colors ${currentView === 'cryo' ? 'bg-green-900' : ''}`}
                >
                  [5] CRYO PROTOCOLS
                </button>
                <button 
                  onClick={() => handleMenuClick('corrupted')}
                  className={`block w-full text-left p-2 hover:bg-green-900 border border-red-600 text-red-400 transition-colors ${currentView === 'corrupted' ? 'bg-red-900' : ''}`}
                >
                  [6] [CORRUPTED DATA]
                </button>
              </div>
            </div>

            {/* Display Panel */}
            <div className="border border-green-400 p-4 overflow-y-auto flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-green-300">DATA DISPLAY</h2>
              <div className="flex-1 overflow-y-auto">
                {renderContent()}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
