"use client";

import Link from 'next/link';
import FadeIn from "@/components/FadeIn";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
            {/* Background Stars/Dust */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-3/4 left-3/4 w-3 h-3 bg-red-500 rounded-full animate-pulse delay-75"></div>
                <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <FadeIn>
                    <div className="mb-8 relative">
                        <div className="absolute -inset-4 bg-red-500/20 blur-3xl rounded-full animate-pulse"></div>
                        <h1 className="text-9xl md:text-[12rem] font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-black mb-4 relative z-10">
                            404
                        </h1>
                        <div className="text-2xl md:text-4xl font-orbitron text-red-400 mb-6 tracking-widest uppercase glitch-text">
                            Signal Lost
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="bg-gray-900/80 border border-red-700/50 p-8 mb-8 backdrop-blur-sm relative overflow-hidden group hover:border-red-500 transition-colors duration-500">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50 animate-scanline"></div>

                        <div className="text-green-400 font-mono text-sm mb-4 flex items-center justify-center gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                            &gt; SYSTEM DIAGNOSTIC: CRITICAL FAILURE
                        </div>

                        <h2 className="text-xl md:text-3xl font-rajdhani text-white mb-4 font-bold">
                            The Void Has Consumed This Page
                        </h2>

                        <p className="text-gray-300 font-rajdhani mb-6 text-lg leading-relaxed">
                            You've ventured too far into the unknown. The coordinates you're looking for
                            have been redacted by the <span className="text-red-400">Hellish Bureaucracy</span> or
                            lost in the <span className="text-cyan-400">Neon Rain</span>.
                        </p>

                        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                            Error Code: ID-10-T // Sector: UNKNOWN
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.4}>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link
                            href="/"
                            className="group relative px-8 py-4 bg-red-900/20 border border-red-700 text-red-100 font-orbitron font-bold overflow-hidden hover:bg-red-900/40 transition-all duration-300"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <span>&lt;&lt;</span> EMERGENCY EVAC
                            </span>
                            <div className="absolute inset-0 bg-red-600/10 transform -skew-x-12 group-hover:skew-x-12 transition-transform duration-500"></div>
                        </Link>

                        <Link
                            href="/projects"
                            className="group relative px-8 py-4 bg-transparent border border-gray-600 text-gray-300 font-orbitron font-bold overflow-hidden hover:border-white hover:text-white transition-all duration-300"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                SEARCH ARCHIVES <span>&gt;&gt;</span>
                            </span>
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
