"use client";

import { useState, useEffect } from 'react';

export default function LostMarkTerminal() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('default');
  const [glitch, setGlitch] = useState(false);
  const [corruptedAttempts, setCorruptedAttempts] = useState(0);
  const [showHorrorMessage, setShowHorrorMessage] = useState(false);
  const [horrorTextLines, setHorrorTextLines] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Данные терминала - обновлены для 2534 года и SILK STAR
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
      id: 'ls1',
      system: 'ATMOSPHERIC_PROCESSOR_01',
      status: '[NOMINAL]',
      description: 'Oxygen levels: 21.2% - Within normal parameters'
    },
    {
      id: 'ls2',
      system: 'ATMOSPHERIC_PROCESSOR_02',
      status: '[WARNING]',
      description: 'Oxygen levels: 18.7% - Below recommended threshold'
    },
    {
      id: 'ls3',
      system: 'GRAVITY_GENERATOR_MAIN',
      status: '[OFFLINE]',
      description: 'Main gravity generator not responding - backup systems active'
    },
    {
      id: 'ls4',
      system: 'WATER_RECYCLING_UNIT',
      status: '[CONTAMINATED]',
      description: 'Unknown biological matter detected in water supply'
    }
  ];

  const crewManifest = [
    {
      name: 'CAPTAIN',
      status: '[REDACTED]',
      details: '████████████'
    },
    {
      name: 'FIRST OFFICER - Maria Santos',
      status: 'COMMUNICATION LOST',
      details: 'Last contact: 2534.245.12:45:32'
    },
    {
      name: 'ENGINEER - Jin Wu', 
      status: 'COMMUNICATION LOST',
      details: 'Last contact: 2534.245.13:12:07'
    },
    {
      name: 'MEDIC - Dr. Alex Rivera',
      status: 'COMMUNICATION LOST', 
      details: 'Last contact: 2534.245.13:45:15'
    },
    {
      name: 'REMAINING CREW',
      status: 'COMMUNICATION LOST',
      details: 'All personnel unaccounted for'
    }
  ];

  // ASCII загрузочный экран
  const loadingAscii = `
    ███████╗██╗██╗     ██╗  ██╗    ███████╗████████╗ █████╗ ██████╗ 
    ██╔════╝██║██║     ██║ ██╔╝    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗
    ███████╗██║██║     █████╔╝     ███████╗   ██║   ███████║██████╔╝
    ╚════██║██║██║     ██╔═██╗     ╚════██║   ██║   ██╔══██║██╔══██╗
    ███████║██║███████╗██║  ██╗    ███████║   ██║   ██║  ██║██║  ██║
    ╚══════╝╚═╝╚══════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
                                                                      
                      TERMINAL ACCESS SYSTEM v2.7.3
                     ================================
  `;

  // Имитация загрузки
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            setIsLoading(false);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Случайные глитчи
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.15) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 300);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  const handleMenuClick = (menuType: string) => {
    setCurrentView(menuType);
    triggerGlitch();
  };

  const triggerGlitch = () => {
    if (Math.random() < 0.3) {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }
  };

  const handleCorruptedDataClear = () => {
    const newAttempts = corruptedAttempts + 1;
    setCorruptedAttempts(newAttempts);
    
    if (newAttempts >= 3) {
      setShowHorrorMessage(true);
      setGlitch(true);
      setTimeout(() => setGlitch(false), 1000);
      
      // Анимация появления текста построчно
      const eyeArt = [
        "    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄",
        "  ▄▀░░░░░░░░░░░░░░░▀▄",
        " ▄▀░░░░░░░░░░░░░░░░░░▀▄",
        "█░░░░░░░▄▄▄▄▄▄▄░░░░░░░█",
        "█░░░░▄▀█▀▀▀▀▀▀▀█▀▄░░░░█",
        "█░░░▄▀░█░░░░░░░█░▀▄░░░█",
        "█░░░█░░█░░░█░░░█░░█░░░█",
        "█░░░█░░█░░░█░░░█░░█░░░█",
        "█░░░▀▄░█░░░░░░░█░▄▀░░░█",
        "█░░░░▀▄█▄▄▄▄▄▄▄█▄▀░░░░█",
        "█░░░░░░▀▀▀▀▀▀▀▀▀░░░░░░█",
        " ▀▄░░░░░░░░░░░░░░░░░░▄▀",
        "  ▀▄░░░░░░░░░░░░░░░░▄▀",
        "    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀",
        "",
        "I CAN SEE YOU"
      ];
      
      setHorrorTextLines([]);
      
      eyeArt.forEach((line, index) => {
        setTimeout(() => {
          setHorrorTextLines(prev => [...prev, line]);
        }, index * 150);
      });
    } else {
      triggerGlitch();
    }
  };

  const corruptText = (text: string, level: number = 0.1) => {
    const glitchChars = ['█', '▓', '▒', '░', '?', '#', '@', '%', '¿', '¡', '∩', '⌐'];
    
    return text.split('').map((char) => {
      if (Math.random() < level) {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      return char;
    }).join('');
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

      case 'life-support':
        return (
          <div className="space-y-4">
            <h3 className="text-green-300 font-bold mb-4">LIFE SUPPORT SYSTEMS</h3>
            {lifeSupportData.map((system) => (
              <div key={system.id} className="border border-green-600 p-3 bg-green-900 bg-opacity-20">
                <div className="flex justify-between mb-2">
                  <span className="text-green-400">{system.system}</span>
                  <span className={
                    system.status.includes('NOMINAL') ? 'text-green-400' :
                    system.status.includes('WARNING') ? 'text-yellow-400' :
                    'text-red-400'
                  }>{system.status}</span>
                </div>
                <div className="text-green-500 text-sm">{system.description}</div>
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
              <div className="text-green-400 mb-4">CREW COMPLEMENT: 12</div>
              {crewManifest.map((member, index) => (
                <div key={index} className="mb-3 pb-2 border-b border-green-700">
                  <div className="flex justify-between">
                    <span className="text-green-300">{member.name}</span>
                    <span className={member.status.includes('REDACTED') ? 'text-red-400' : 'text-yellow-400'}>
                      {member.status}
                    </span>
                  </div>
                  <div className="text-green-500 text-sm mt-1">{member.details}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'corrupted':
        return (
          <div className="space-y-4">
            <h3 className="text-red-400 font-bold mb-4">[CORRUPTED DATA]</h3>
            <div className="border border-red-600 p-3 bg-red-900 bg-opacity-20">
              {showHorrorMessage ? (
                <div className="text-red-400 text-center font-mono">
                  <pre className="text-sm leading-tight">
                    {horrorTextLines.map((line, index) => (
                      <div key={index} className={index === horrorTextLines.length - 1 ? "text-2xl font-bold animate-pulse mt-4" : ""}>
                        {line}
                      </div>
                    ))}
                  </pre>
                </div>
              ) : (
                <>
                  <div className="text-red-400 animate-pulse mb-4">
                    {corruptText('ERROR: DATA INTEGRITY COMPROMISED', 0.5)}<br/>
                    {corruptText('UNKNOWN ENTITIES DETECTED', 0.4)}<br/>
                    {corruptText('CREW STATUS: UNKNOWN', 0.6)}<br/>
                    {corruptText('RECOMMEND IMMEDIATE EVACUATION', 0.3)}
                  </div>
                  <button 
                    onClick={handleCorruptedDataClear}
                    className="w-full bg-red-900 hover:bg-red-800 text-red-300 p-2 border border-red-400 transition-colors"
                  >
                    [ATTEMPT DATA RECOVERY]
                  </button>
                </>
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
      <div className="min-h-screen bg-black text-green-400 font-mono crt-terminal">
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <pre className="ascii-loading text-xs sm:text-sm text-center mb-8">
            {loadingAscii}
          </pre>
          <div className="text-center mb-8">
            <div className="text-green-300 mb-4">INITIALIZING TERMINAL...</div>
            <div className="w-64 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="text-green-500 text-sm mt-2">{Math.floor(loadingProgress)}%</div>
          </div>
          <div className="text-green-600 text-xs animate-pulse">
            Loading system modules...<br/>
            Checking data integrity...<br/>
            Establishing secure connection...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black text-green-400 font-mono crt-terminal terminal-text ${glitch ? 'terminal-glitch' : ''}`}>
      
      <div className="container mx-auto p-4 relative z-0">
        <div className="bg-black p-8 rounded-lg border-2 border-green-400 shadow-lg shadow-green-400/50">
          
          {/* Terminal Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2 text-green-300">
              SILK STAR TERMINAL ACCESS
            </h1>
            <p className="text-green-600">SECURE CONNECTION ESTABLISHED</p>
            <div className="mt-4 border-t border-green-400 pt-4">
              <p className="text-sm text-green-500">
                VESSEL: SILK STAR<br/>
                STATUS: [UNKNOWN]<br/>
                LOCATION: SECTOR 7-GAMMA
              </p>
            </div>
          </div>

          {/* Main Terminal Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[70vh]">
            
            {/* Navigation Panel */}
            <div className="border border-green-400 p-4">
              <h2 className="text-xl font-bold mb-4 text-green-300">SYSTEM NAVIGATION</h2>
              <div className="space-y-2">
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
                  onClick={() => handleMenuClick('life-support')}
                  className={`block w-full text-left p-2 hover:bg-green-900 border border-green-600 transition-colors ${currentView === 'life-support' ? 'bg-green-900' : ''}`}
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
            <div className="border border-green-400 p-4 overflow-y-auto max-h-[70vh]">
              <h2 className="text-xl font-bold mb-4 text-green-300">DATA DISPLAY</h2>
              {renderContent()}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
