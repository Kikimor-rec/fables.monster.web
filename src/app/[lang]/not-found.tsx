"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import FadeIn from "@/components/FadeIn";
import commonEn from '@/locales/en/common.json';
import commonRu from '@/locales/ru/common.json';
import type { CommonDict, Language } from '@/types/i18n';

const dictionaries: Record<Language, CommonDict> = {
    en: commonEn as CommonDict,
    ru: commonRu as CommonDict,
};

// Konami code sequence
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

export default function NotFound() {
    const params = useParams();
    const lang = (params?.lang as string) === 'ru' ? 'ru' : 'en';
    const commonDict = dictionaries[lang];
    const t = commonDict.notFound;
    const nav = commonDict.nav;
    const [descriptionPrefix, descriptionTail = ''] = t.description.split('{bureaucracy}');
    const [descriptionMiddle, descriptionSuffix = ''] = descriptionTail.split('{neon}');
    
    const [terminalLine, setTerminalLine] = useState(0);
    const [glitchActive, setGlitchActive] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    // New interactive states
    const [konamiProgress, setKonamiProgress] = useState(0);
    const [konamiActivated, setKonamiActivated] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [secretMessage, setSecretMessage] = useState<string | null>(null);
    const [terminalInput, setTerminalInput] = useState('');
    const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
    const [showTerminal, setShowTerminal] = useState(false);
    const [radarAngle, setRadarAngle] = useState(0);
    const [radarTarget, setRadarTarget] = useState<{x: number, y: number, visible: boolean}>({ x: 0, y: 0, visible: false });
    
    // Terminal animation
    useEffect(() => {
        const interval = setInterval(() => {
            setTerminalLine((prev) => (prev + 1) % t.terminalLines.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [t.terminalLines.length]);
    
    // Random glitch effect
    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 150);
        }, 3000 + Math.random() * 2000);
        return () => clearInterval(glitchInterval);
    }, []);
    
    // Mouse tracking for parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    
    // Radar animation
    useEffect(() => {
        const radarInterval = setInterval(() => {
            setRadarAngle((prev) => (prev + 3) % 360);
        }, 50);
        return () => clearInterval(radarInterval);
    }, []);
    
    // Radar target blip
    useEffect(() => {
        const targetInterval = setInterval(() => {
            // Show target when radar sweep passes ~120 degrees
            if (radarAngle > 115 && radarAngle < 125) {
                setRadarTarget({ x: 30, y: -25, visible: true });
                setTimeout(() => setRadarTarget(prev => ({ ...prev, visible: false })), 1500);
            }
        }, 100);
        return () => clearInterval(targetInterval);
    }, [radarAngle]);
    
    // Konami code listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === KONAMI_CODE[konamiProgress]) {
                const newProgress = konamiProgress + 1;
                setKonamiProgress(newProgress);
                if (newProgress === KONAMI_CODE.length) {
                    setKonamiActivated(true);
                    setSecretMessage(t.markMessage);
                    setTimeout(() => {
                        setSecretMessage(null);
                        setKonamiActivated(false);
                    }, 5000);
                    setKonamiProgress(0);
                }
            } else {
                setKonamiProgress(0);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [konamiProgress, t.markMessage]);
    
    // Handle 404 clicks
    const handle404Click = useCallback(() => {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        if (newCount >= 7) {
            setSecretMessage(t.clickSecretMessage);
            setClickCount(0);
            setTimeout(() => setSecretMessage(null), 4000);
        } else if (newCount === 4) {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 500);
        }
    }, [clickCount, t.clickSecretMessage]);
    
    // Handle terminal command
    const handleTerminalCommand = useCallback((cmd: string) => {
        const command = cmd.toLowerCase().trim();
        let response: string[] = [];
        
        switch(command) {
            case 'help':
                response = t.helpCommands;
                break;
            case 'mark':
                response = [`> ${t.markMessage}`];
                setGlitchActive(true);
                setTimeout(() => setGlitchActive(false), 1000);
                break;
            case 'kramp':
                response = [`> ${t.krampMessage}`];
                break;
            case 'ascend':
                response = [`> ${t.ascendMessage}`];
                break;
            case 'home':
                window.location.href = `/${lang}`;
                return;
            case '':
                return;
            default:
                response = [t.commandNotRecognized.replace('{command}', command)];
        }
        
        setTerminalHistory(prev => [...prev.slice(-8), `$ ${cmd}`, ...response]);
        setTerminalInput('');
    }, [t, lang]);
    
    // Toggle terminal with backtick
    useEffect(() => {
        const handleToggle = (e: KeyboardEvent) => {
            if (e.key === '`' || e.key === 'ё') {
                e.preventDefault();
                setShowTerminal(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleToggle);
        return () => window.removeEventListener('keydown', handleToggle);
    }, []);

    return (
        <div className={`min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden pt-20 ${konamiActivated ? 'animate-pulse' : ''}`}>
            {/* Secret message overlay */}
            {secretMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/90 border-2 border-red-500 px-8 py-6 animate-pulse">
                        <p className="text-red-500 font-mono text-xl text-center animate-glitch">
                            {secretMessage}
                        </p>
                    </div>
                </div>
            )}
            
            {/* Hidden terminal overlay */}
            {showTerminal && (
                <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 border-t border-green-500 p-4 font-mono text-sm">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-green-400 mb-2">
                            {terminalHistory.map((line, i) => (
                                <div key={i} className="opacity-80">{line}</div>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-green-400">
                            <span>$</span>
                            <input
                                type="text"
                                value={terminalInput}
                                onChange={(e) => setTerminalInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleTerminalCommand(terminalInput);
                                    }
                                }}
                                className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
                                autoFocus
                                placeholder={t.terminalPlaceholder}
                            />
                        </div>
                        <div className="text-gray-600 text-xs mt-2">
                            {t.closeTerminalHint}
                        </div>
                    </div>
                </div>
            )}
            
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-10">
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                        transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
                    }}
                />
            </div>
            
            {/* Radar Scanner - positioned in top right */}
            <div className="absolute top-8 right-8 w-32 h-32 md:w-48 md:h-48 opacity-60 hover:opacity-100 transition-opacity">
                <div className="relative w-full h-full">
                    {/* Radar background */}
                    <div className="absolute inset-0 rounded-full border border-green-500/50 bg-black/80">
                        {/* Radar circles */}
                        <div className="absolute inset-4 rounded-full border border-green-500/30" />
                        <div className="absolute inset-8 rounded-full border border-green-500/20" />
                        <div className="absolute inset-12 md:inset-16 rounded-full border border-green-500/10" />
                        
                        {/* Cross lines */}
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-green-500/20" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-500/20" />
                        
                        {/* Sweep line */}
                        <div 
                            className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left"
                            style={{
                                background: 'linear-gradient(90deg, rgba(34, 197, 94, 0.8), transparent)',
                                transform: `rotate(${radarAngle}deg)`
                            }}
                        />
                        
                        {/* Sweep trail */}
                        <div 
                            className="absolute top-1/2 left-1/2 w-1/2 h-1/2 origin-left"
                            style={{
                                background: `conic-gradient(from ${radarAngle - 30}deg, transparent 0deg, rgba(34, 197, 94, 0.2) 20deg, transparent 30deg)`,
                                transform: 'translate(-50%, -50%)',
                                borderRadius: '50%',
                                width: '100%',
                                height: '100%'
                            }}
                        />
                        
                        {/* 404 Target blip */}
                        {radarTarget.visible && (
                            <div 
                                className="absolute w-3 h-3 bg-red-500 rounded-full animate-ping"
                                style={{
                                    top: `calc(50% + ${radarTarget.y}%)`,
                                    left: `calc(50% + ${radarTarget.x}%)`
                                }}
                            />
                        )}
                        
                        {/* Center dot */}
                        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    
                    {/* Radar label */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-green-500 font-mono text-xs whitespace-nowrap">
                        {t.radarScanning}... <span className="text-red-500">404</span>
                    </div>
                </div>
            </div>
            
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-red-500 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                            opacity: Math.random() * 0.5 + 0.2
                        }}
                    />
                ))}
            </div>

            {/* Scanlines Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-scanlines" />
            
            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-radial-vignette" />

            <div 
                className="max-w-4xl mx-auto px-4 text-center relative z-10"
                style={{
                    transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
                }}
            >
                <FadeIn>
                    <div className="mb-8 relative">
                        {/* Glowing background */}
                        <div className="absolute -inset-4 bg-red-500/20 blur-3xl rounded-full animate-pulse" />
                        
                        {/* 404 Number with glitch effect - CLICKABLE */}
                        <h1 
                            className={`text-9xl md:text-[12rem] font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-black mb-4 relative z-10 select-none cursor-pointer hover:scale-105 transition-transform ${glitchActive ? 'animate-glitch' : ''}`}
                            style={{
                                textShadow: glitchActive 
                                    ? '2px 0 cyan, -2px 0 red' 
                                    : '0 0 20px rgba(255,0,0,0.5)'
                            }}
                            onClick={handle404Click}
                            title={t.clickMeTitle}
                        >
                            404
                        </h1>
                        
                        {/* Click counter hint */}
                        {clickCount > 0 && clickCount < 7 && (
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-red-500/50 font-mono text-xs">
                                {'•'.repeat(clickCount)}{'○'.repeat(7 - clickCount)}
                            </div>
                        )}
                        
                        {/* Title with glitch */}
                        <div 
                            className={`text-2xl md:text-4xl font-orbitron text-red-400 mb-6 tracking-widest uppercase ${glitchActive ? 'translate-x-1' : ''}`}
                            style={{ transition: 'transform 0.1s' }}
                        >
                            {t.title}
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="bg-gray-900/80 border border-red-700/50 p-8 mb-8 backdrop-blur-sm relative overflow-hidden group hover:border-red-500 transition-colors duration-500">
                        {/* Scanline animation */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50 animate-scanline" />
                        
                        {/* Corner decorations */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-red-500" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-red-500" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-red-500" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-red-500" />

                        {/* Terminal output */}
                        <div className="text-green-400 font-mono text-sm mb-4 flex items-center justify-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                            <span className="min-w-[280px]">{t.terminalLines[terminalLine]}</span>
                        </div>

                        <h2 className="text-xl md:text-3xl font-rajdhani text-white mb-4 font-bold">
                            {t.heading}
                        </h2>

                        <p className="text-red-400/80 font-mono text-xs uppercase tracking-wider mb-4">
                            {t.diagnostic}
                        </p>

                        <p className="text-gray-300 font-rajdhani mb-6 text-lg leading-relaxed">
                            {descriptionPrefix}
                            <span className="text-red-400">{t.bureaucracy}</span>
                            {descriptionMiddle}
                            <span className="text-cyan-400">{t.neon}</span>
                            {descriptionSuffix}
                        </p>

                        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                            {t.errorCode}
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.4}>
                    <div className="flex flex-col gap-4">
                        {/* Primary navigation buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href={`/${lang}`}
                                className="group relative px-8 py-4 bg-red-900/30 border-2 border-red-600 text-red-100 font-orbitron font-bold overflow-hidden hover:bg-red-900/60 transition-all duration-300 hover:scale-105 hover:border-red-400 min-w-[200px] text-center"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <span className="animate-pulse">&lt;&lt;</span> {t.evac}
                                </span>
                                <div className="absolute inset-0 bg-red-600/10 transform -skew-x-12 group-hover:skew-x-12 transition-transform duration-500" />
                                <div className="absolute bottom-0 left-0 w-0 h-1 bg-red-500 group-hover:w-full transition-all duration-300" />
                            </Link>

                            <Link
                                href={`/${lang}/projects`}
                                className="group relative px-8 py-4 bg-gray-900/50 border-2 border-gray-500 text-gray-200 font-orbitron font-bold overflow-hidden hover:border-white hover:text-white transition-all duration-300 hover:scale-105 min-w-[200px] text-center"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {t.archives} <span>&gt;&gt;</span>
                                </span>
                                <div className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-300" />
                            </Link>
                        </div>
                        
                        {/* Secondary navigation */}
                        <div className="flex flex-wrap gap-3 justify-center items-center mt-2">
                            <Link
                                href={`/${lang}`}
                                className="px-4 py-2 text-gray-400 hover:text-white font-mono text-sm border border-gray-700 hover:border-gray-400 transition-all"
                            >
                                [{nav.home}]
                            </Link>
                            <Link
                                href={`/${lang}/projects`}
                                className="px-4 py-2 text-gray-400 hover:text-white font-mono text-sm border border-gray-700 hover:border-gray-400 transition-all"
                            >
                                [{nav.projects}]
                            </Link>
                            <Link
                                href={`/${lang}/contact`}
                                className="px-4 py-2 text-gray-400 hover:text-white font-mono text-sm border border-gray-700 hover:border-gray-400 transition-all"
                            >
                                [{nav.contact}]
                            </Link>
                        </div>
                    </div>
                </FadeIn>

                {/* Konami code hint - shows when user starts entering */}
                {konamiProgress > 0 && konamiProgress < KONAMI_CODE.length && (
                    <div className="fixed bottom-4 left-4 text-green-500/50 font-mono text-xs">
                        SEQUENCE: {konamiProgress}/{KONAMI_CODE.length}
                    </div>
                )}
                
                {/* Terminal hint */}
                <FadeIn delay={0.6}>
                    <div className="mt-8 text-gray-600 font-mono text-xs text-center">
                        <span className="opacity-50">{t.terminalHint}</span>
                    </div>
                </FadeIn>
            </div>
            
            {/* CSS for additional animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .bg-scanlines {
                    background: repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(0, 0, 0, 0.3) 2px,
                        rgba(0, 0, 0, 0.3) 4px
                    );
                }
                .bg-radial-vignette {
                    background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%);
                }
                @keyframes glitch {
                    0% { transform: translate(0); filter: hue-rotate(0deg); }
                    10% { transform: translate(-5px, 5px); filter: hue-rotate(90deg); }
                    20% { transform: translate(-5px, -5px); }
                    30% { transform: translate(5px, 5px); filter: hue-rotate(180deg); }
                    40% { transform: translate(5px, -5px); }
                    50% { transform: translate(-5px, 5px); filter: hue-rotate(270deg); }
                    60% { transform: translate(-5px, -5px); }
                    70% { transform: translate(5px, 5px); filter: hue-rotate(360deg); }
                    80% { transform: translate(5px, -5px); }
                    90% { transform: translate(-5px, 5px); }
                    100% { transform: translate(0); filter: hue-rotate(0deg); }
                }
                .animate-glitch {
                    animation: glitch 0.3s linear;
                }
                @keyframes radarSweep {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes targetBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
            `}</style>
        </div>
    );
}
