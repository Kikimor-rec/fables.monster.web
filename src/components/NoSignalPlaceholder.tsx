import React from 'react';

interface NoSignalProps {
    className?: string;
    text?: string;
}

export default function NoSignalPlaceholder({ className = "", text = "NO SIGNAL" }: NoSignalProps) {
    return (
        <div className={`relative overflow-hidden bg-black flex items-center justify-center ${className}`}>
            {/* Static Noise Background */}
            <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none" />

            {/* Glitch Text */}
            <div className="relative z-10 text-center">
                <div className="text-4xl md:text-6xl font-bold font-mono text-red-500 tracking-widest animate-pulse relative">
                    <span className="absolute top-0 left-0 -ml-1 text-cyan-500 opacity-70 animate-glitch-1">{text}</span>
                    <span className="absolute top-0 left-0 ml-1 text-yellow-500 opacity-70 animate-glitch-2">{text}</span>
                    <span className="relative">{text}</span>
                </div>
                <div className="mt-2 text-xs text-gray-500 font-mono">CONNECTION LOST</div>
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,black_100%)] pointer-events-none" />
        </div>
    );
}
