"use client";

import { useState, useEffect } from 'react';

interface RadarScannerProps {
    radarScanningText: string;
}

export default function RadarScanner({ radarScanningText }: RadarScannerProps) {
    const [radarAngle, setRadarAngle] = useState(0);
    const [radarTarget, setRadarTarget] = useState({ x: 0, y: 0, visible: false });

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

    return (
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
                    {radarScanningText}... <span className="text-red-500">404</span>
                </div>
            </div>
        </div>
    );
}
