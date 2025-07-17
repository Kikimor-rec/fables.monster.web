"use client";

import { useState, useEffect, useRef } from 'react';
import ResponsiveAscii from '@/components/ResponsiveAscii';
import { useContent } from '@/hooks/useContent';
import LogViewer from '@/components/terminal/LogViewer';
import ManifestViewer from '@/components/terminal/ManifestViewer';
import CryoBay from '@/components/terminal/CryoBay';
import {
  CrewManifest,
  CryoProtocol,
  LifeSupportSystem,
  ShipLog,
  SilkStarLog,
} from '@/components/terminal/types';
import LifeSupportPanel from '@/components/terminal/LifeSupportPanel';
import { FC } from 'react';

export default function LostMarkTerminal() {
  const { content, loading } = useContent('terminal-content.json');
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('default');
  const [glitch, setGlitch] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [corruptedAttempts, setCorruptedAttempts] = useState(0);
  const [showCorruptedMessage, setShowCorruptedMessage] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [shipLogs, setShipLogs] = useState<ShipLog[]>([]);
  const [silkLogs, setSilkLogs] = useState<SilkStarLog[]>([]);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  // ASCII Art для глаза
  const asciiEye = `
                          ...',;;:cccccccc:;,..
                      ..,;:cccc::::ccccclloooolc;'.
                   .',;:::;;;;:loodxk0kkxxkxxdocccc;;'..
                 .,;;;,,;:coxldKNWWWMMMMWNNWWNNKkdolcccc:,.
              .',;;,',;lxo:...dXWMMMMMMMMNkloOXNNNX0koc:coo;.
           ..,;:;,,,:ldl'   .kWMMMWXXNWMMMMXd..':d0XWWN0d:;lkd,
         ..,;;,,'':loc.     lKMMMNl. .c0KNWNK:  ..';lx00X0l,cxo,.
       ..''....'cooc.       c0NMMX;   .l0XWN0;       ,ddx00occl:.
     ..'..  .':odc.         .x0KKKkolcld000xc.       .cxxxkkdl:,..
   ..''..   ;dxolc;'         .lxx000kkxx00kc.      .;looolllol:'..
  ..'..    .':lloolc:,..       'lxkkkkk0kd,   ..':clc:::;,,;:;,'..
  ......   ....',;;;:ccc::;;,''',:loddol:,,;:clllolc:;;,'........
      .     ....'''',,,;;:cccccclllloooollllccc:c:::;,'..
              .......'',,,,,,,,;;::::ccccc::::;;;,,''...
                ...............''',,,;;;,,''''''......
                     ............................
  `;

  // Эффект загрузки
  useEffect(() => {
    const bootSequence = content?.interface?.loading_messages || [
      "INITIALIZING SILK STAR TERMINAL...",
      "LOADING CORE SYSTEMS...",
      "ACCESSING NAVIGATION DATABASE...",
      "ESTABLISHING SECURE CONNECTION...",
      "TERMINAL READY"
    ];

    if (!clickAudioRef.current) {
      clickAudioRef.current = new Audio("/sfx/beep.mp3");
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < bootSequence.length) {
        setLoadingText(bootSequence[index]);
        clickAudioRef.current?.play().catch(() => {});
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [content]);

  // Append new logs when content changes
  useEffect(() => {
    if (content?.ship_logs) {
      setShipLogs(prev => [
        ...prev,
        ...(content.ship_logs as ShipLog[]).filter(l => !prev.some(p => p.id === l.id))
      ]);
    }

    if (content?.silk_star_logs) {
      setSilkLogs(prev => [
        ...prev,
        ...(content.silk_star_logs as SilkStarLog[]).filter(l => !prev.some(p => p.id === l.id))
      ]);
    }
  }, [content]);

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

  /** Handle selecting a menu item */
  const handleMenuClick = (menuType: string) => {
    setCurrentView(menuType);
    triggerGlitch();
    clickAudioRef.current?.play().catch(() => {});
  };

  /** Random glitch flash when switching views */
  const triggerGlitch = () => {
    if (Math.random() < 0.2) {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 300);
    }
  };

  /** Simple text corruption effect */
  const corruptText = (text: string, level = 0.1) => {
    const glitchChars = ['█', '▓', '▒', '░', '?', '#', '@', '%', '¿', '¡'];
    
    return text.split('').map((char: string) => {
      if (Math.random() < level) {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      return char;
    }).join('');
  };

  /** Attempt to clear corrupted data */
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

  // Новый компонент для Ship Logs
  const ShipLogsSection: FC<{header: string, logs: ShipLog[]}> = ({header, logs}) => (
    <LogViewer header={header} logs={logs} />
  );

  // Новый компонент для Silk Star Logs
  const SilkLogsSection: FC<{header: string, logs: SilkStarLog[], corruptText: (t:string,l?:number)=>string}> = ({header, logs, corruptText}) => (
    <LogViewer header={header} logs={logs} corruptText={corruptText} />
  );

  // Новый компонент для Life Support (использует LifeSupportPanel)
  const LifeSupportSection: FC = () => (
    <LifeSupportPanel />
  );

  // Новый компонент для Crew Manifest
  const CrewManifestSection: FC<{manifest: CrewManifest, vesselName: string, crewComplement: string, corruptedLabel: string}> = ({manifest, vesselName, crewComplement, corruptedLabel}) => (
    <ManifestViewer
      manifest={manifest}
      vesselName={vesselName}
      crewComplement={crewComplement}
      corruptedLabel={corruptedLabel}
    />
  );

  // Новый компонент для Cryo Bay
  const CryoBaySection: FC<{header: string, activation: CryoProtocol}> = ({header, activation}) => (
    <CryoBay header={header} activation={activation} />
  );

  // Новый компонент для Corrupted Data (оставим как есть, но вынесем в функцию)
  const CorruptedSection: FC<{content: any, showCorruptedMessage: boolean, typingText: string, handleCorruptedDataClear: () => void, asciiEye: string}> = ({content, showCorruptedMessage, typingText, handleCorruptedDataClear, asciiEye}) => (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-red-400 font-bold mb-3 sm:mb-4 text-sm sm:text-base">
        {content?.interface?.sections?.corrupted_data || "[CORRUPTED DATA]"}
      </h3>
      {!showCorruptedMessage ? (
        <>
          <div className="text-green-300 text-xs sm:text-sm font-mono whitespace-pre-wrap break-words mb-3 sm:mb-4">
            {content?.corrupted_black_hole}
          </div>
          <div className="text-red-400 mb-3 sm:mb-4 text-xs sm:text-sm font-mono">
            {content?.interface?.status_messages?.clearance_required || 'SECURITY CLEARANCE REQUIRED'}
          </div>
          <button
            onClick={handleCorruptedDataClear}
            className="bg-red-700 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm border border-red-600 hover:bg-red-600 transition-colors font-mono"
          >
            [ATTEMPT DATA RECOVERY]
          </button>
        </>
      ) : (
        <div className="text-center space-y-3">
          <div className="w-full overflow-x-auto">
            <ResponsiveAscii
              ascii={asciiEye}
              className="text-red-400 font-mono animate-pulse mb-3 sm:mb-4"
            />
          </div>
          <div className="text-red-400 text-lg sm:text-xl md:text-2xl font-bold animate-pulse font-mono">
            {typingText}
          </div>
          <div className="text-green-300 text-xs sm:text-sm font-mono whitespace-pre-wrap break-words">
            {content?.corrupted_black_hole}
          </div>
        </div>
      )}
    </div>
  );

  // Обновлённая функция renderContent
  const renderContent = () => {
    const lifeSupportData = (content?.life_support || []) as LifeSupportSystem[];
    const crewManifest = (content?.crew_manifest || {}) as CrewManifest;

    switch(currentView) {
      case 'logs':
        return <ShipLogsSection header={content?.interface?.sections?.system_logs || 'SYSTEM LOGS'} logs={shipLogs} />;
      case 'silk-logs':
        return <SilkLogsSection header={content?.interface?.sections?.silk_star_logs || 'SILK STAR FLIGHT LOG'} logs={silkLogs} corruptText={corruptText} />;
      case 'footage':
        return <LifeSupportSection />;
      case 'manifest':
        return <CrewManifestSection
          manifest={crewManifest}
          vesselName={content?.interface?.status_messages?.vessel_name || 'VESSEL: SILK STAR'}
          crewComplement={content?.interface?.status_messages?.crew_complement || 'CREW COMPLEMENT: 12'}
          corruptedLabel={content?.interface?.status_messages?.data_corrupted || '[REST OF DATA CORRUPTED]'}
        />;
      case 'cryo':
        return <CryoBaySection header={content?.interface?.sections?.cryo_protocols || 'CRYO BAY'} activation={(content?.cryo_protocol || {}) as CryoProtocol} />;
      case 'corrupted':
        return <CorruptedSection content={content} showCorruptedMessage={showCorruptedMessage} typingText={typingText} handleCorruptedDataClear={handleCorruptedDataClear} asciiEye={asciiEye} />;
      default:
        return (
          <div className="space-y-3 sm:space-y-4">
            <p className="text-green-500 text-xs sm:text-sm font-mono">
              {content?.interface?.status_messages?.select_option || "SELECT A MENU OPTION TO VIEW DATA"}
            </p>
            <div className="mt-3 sm:mt-4 p-2 sm:p-3 md:p-4 bg-green-900 bg-opacity-20 border border-green-600 rounded space-y-2 sm:space-y-3">
              <p className="text-green-400 text-xs sm:text-sm font-mono">
                {content?.interface?.status_messages?.system_operational || "SYSTEM STATUS: OPERATIONAL"}
              </p>
              <p className="text-yellow-400 text-xs sm:text-sm font-mono">
                {content?.interface?.status_messages?.anomalies_detected || "WARNING: MULTIPLE SYSTEM ANOMALIES DETECTED"}
              </p>
              <p className="text-red-400 text-xs sm:text-sm font-mono">
                {content?.interface?.status_messages?.crew_missing || "ERROR: UNABLE TO LOCATE PRIMARY CREW"}
              </p>
            </div>
          </div>
        );
    }
  };

  // Обработка загрузки
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-400 font-mono">LOADING TERMINAL...</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center crt-terminal">
        <div className="text-center">
          <div className="mb-8 mx-auto max-w-full overflow-x-auto" style={{maxWidth: 600}}>
            <ResponsiveAscii
              ascii={`
███████╗██╗██╗     ██╗  ██╗    ███████╗████████╗ █████╗ ██████╗
██╔════╝██║██║     ██║ ██╔╝    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗
███████╗██║██║     █████╔╝     ███████╗   ██║   ███████║██████╔╝
╚════██║██║██║     ██╔═██╗     ╚════██║   ██║   ██╔══██║██╔══██╗
███████║██║███████╗██║  ██╗    ███████║   ██║   ██║  ██║██║  ██║
╚══════╝╚═╝╚══════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
              `}
              className="text-green-400 font-mono animate-pulse"
            />
          </div>
          <div>
            <div
              className="text-green-300 text-lg sm:text-xl mb-4"
              style={{ minHeight: '2.5em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {loadingText}
            </div>
            <div className="text-green-500">
              <span className="animate-pulse">█</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // основной return для остальных состояний
  return (
    <div className={`min-h-screen bg-black text-green-400 font-mono relative crt-terminal ${glitch ? 'animate-pulse' : ''}`}>
      {/* Glitch Effect */}
      {glitch && (
        <div className="fixed inset-0 z-20 bg-red-500 opacity-20 animate-ping"></div>
      )}
      <audio ref={clickAudioRef} src="/sfx/beep.mp3" className="hidden" />

      {/* Главный контейнер с отступами от header/footer */}
      <div className="px-2 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 relative z-0">
        <div className="bg-black p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg border-2 border-green-400 shadow-lg shadow-green-400/50 min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-12rem)]">
          {/* Мобильно-адаптивная сетка */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 h-full">
            {/* Панель навигации */}
            <div className="border border-green-400 p-2 sm:p-3 md:p-4 flex flex-col order-2 lg:order-1">
              <h2 className="text-sm sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 text-green-300">
                {content?.interface?.system_navigation || "SYSTEM NAVIGATION"}
              </h2>
              <div className="space-y-1 sm:space-y-2 flex-1">
                <button 
                  onClick={() => handleMenuClick('logs')}
                  className={`block w-full text-left p-2 sm:p-3 text-xs sm:text-sm md:text-base hover:bg-green-900 border border-green-600 transition-colors ${currentView === 'logs' ? 'bg-green-900' : ''}`}
                >
                  {content?.interface?.menu_items?.logs || "[1] SHIP LOGS"}
                </button>
                <button 
                  onClick={() => handleMenuClick('silk-logs')}
                  className={`block w-full text-left p-2 sm:p-3 text-xs sm:text-sm md:text-base hover:bg-green-900 border border-green-600 transition-colors ${currentView === 'silk-logs' ? 'bg-green-900' : ''}`}
                >
                  {content?.interface?.menu_items?.silk_logs || "[2] SILK STAR LOGS"}
                </button>
                <button 
                  onClick={() => handleMenuClick('footage')}
                  className={`block w-full text-left p-2 sm:p-3 text-xs sm:text-sm md:text-base hover:bg-green-900 border border-green-600 transition-colors ${currentView === 'footage' ? 'bg-green-900' : ''}`}
                >
                  {content?.interface?.menu_items?.life_support || "[3] LIFE SUPPORT"}
                </button>
                <button 
                  onClick={() => handleMenuClick('manifest')}
                  className={`block w-full text-left p-2 sm:p-3 text-xs sm:text-sm md:text-base hover:bg-green-900 border border-green-600 transition-colors ${currentView === 'manifest' ? 'bg-green-900' : ''}`}
                >
                  {content?.interface?.menu_items?.crew_manifest || "[4] CREW MANIFEST"}
                </button>
                <button 
                  onClick={() => handleMenuClick('cryo')}
                  className={`block w-full text-left p-2 sm:p-3 text-xs sm:text-sm md:text-base hover:bg-green-900 border border-green-600 transition-colors ${currentView === 'cryo' ? 'bg-green-900' : ''}`}
                >
                  {content?.interface?.menu_items?.cryo_protocols || "[5] CRYO BAY"}
                </button>
                <button 
                  onClick={() => handleMenuClick('corrupted')}
                  className={`block w-full text-left p-2 text-xs sm:text-sm hover:bg-green-900 border border-red-600 text-red-400 transition-colors ${currentView === 'corrupted' ? 'bg-red-900' : ''}`}
                >
                  {content?.interface?.menu_items?.corrupted_data || "[6] [CORRUPTED DATA]"}
                </button>
              </div>
            </div>

            {/* Панель отображения данных */}
            <div className="border border-green-400 p-2 sm:p-3 md:p-4 overflow-y-auto flex flex-col order-1 lg:order-2 min-h-[60vh] sm:min-h-[50vh] lg:min-h-full">
              <h2 className="text-sm sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 text-green-300">
                {content?.interface?.data_display || "DATA DISPLAY"}
              </h2>
              <div className="flex-1 overflow-y-auto text-xs sm:text-sm md:text-base leading-relaxed">
                {renderContent()}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
