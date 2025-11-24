import { Metadata } from 'next';
import Link from 'next/link';
import Image from "next/image";
import { projects, getLocalizedProject } from "@/data/projects";
import EncryptedText from "@/components/EncryptedText";
import CSSGlitchImage from "@/components/CSSGlitchImage";

export const metadata: Metadata = {
    title: 'OLD WORLD NEON | Fables Monster Studio',
    description: 'A classified cyberpunk RPG project shrouded in mystery. Neon-soaked streets, corporate espionage, and digital shadows.',
    keywords: 'cyberpunk RPG, mystery project, neon punk, corp espionage, tabletop RPG',
};


export default async function ProjectNeonPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const typedLocale = locale as 'en' | 'ru';
    const project = projects.find(p => p.slug === 'old-world-neon');
    const localized = project ? getLocalizedProject(project, typedLocale) : null;

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Cyberpunk Grid Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0,255,255,0.05) 25%, rgba(0,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(0,255,255,0.05) 75%, rgba(0,255,255,0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0,255,255,0.05) 25%, rgba(0,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(0,255,255,0.05) 75%, rgba(0,255,255,0.05) 76%, transparent 77%, transparent)
          `,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/10 to-magenta-950/10" />

                {/* Glitch effect background */}
                <div className="absolute inset-0 opacity-30">
                    <Image
                        src={project?.image || '/images/old-world-neon-hero.png'}
                        alt="OLD WORLD NEON"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    {/* Glitch Title */}
                    <div className="mb-8">
                        <div className="text-cyan-400 font-mono text-sm mb-2 tracking-[0.5em]">CLASSIFIED</div>
                        <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold text-white mb-4 font-orbitron tracking-wider relative">
                            <span className="text-glow-cyan">OLD WORLD</span>
                            <br />
                            <span className="text-glow-magenta glitch-text" data-text="NEON">NEON</span>
                        </h1>
                        <div className="text-magenta-400 font-mono text-sm tracking-[0.5em]">SYSTEM ???</div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                        <span className="px-4 py-2 bg-cyan-900/50 text-cyan-400 border border-cyan-500 font-mono text-sm">
                            CYBERPUNK
                        </span>
                        <span className="px-4 py-2 bg-magenta-900/50 text-magenta-400 border border-magenta-500 font-mono text-sm">
                            CLASSIFIED
                        </span>
                        <span className="px-4 py-2 bg-yellow-900/50 text-yellow-400 border border-yellow-500 font-orbitron text-sm">
                            IN DEVELOPMENT
                        </span>
                    </div>

                    {/* Encrypted Message */}
                    <div className="max-w-3xl mx-auto mb-8 hud-border p-6 bg-black/80">
                        <p className="text-cyan-300 font-mono text-sm sm:text-base leading-relaxed mb-4">
                            &gt; ACCESSING ENCRYPTED DATA STREAM...<br />
                            &gt; SECURITY CLEARANCE: INSUFFICIENT<br />
                            &gt; ACCESS DENIED
                        </p>
                        <div className="text-gray-300 font-rajdhani text-base sm:text-lg">
                            <EncryptedText text={localized?.tagline || 'Rain-slicked neon streets hide corporate secrets. Those who ask too many questions tend to disappear into the digital void.'} />
                        </div>
                    </div>

                    {/* Coming Soon Notice */}
                    <div className="bg-magenta-900/20 border-2 border-magenta-500 p-6 max-w-2xl mx-auto">
                        <div className="text-magenta-400 font-orbitron text-xl mb-2">
                            ⚠ INFORMATION RESTRICTED
                        </div>
                        <div className="text-gray-300 font-rajdhani">
                            <EncryptedText text="More details will be revealed when the time is right. Follow our channels for updates." />
                        </div>
                    </div>
                </div>
            </section>

            {/* Teaser Section */}
            <section className="py-20 bg-black/90 border-t border-cyan-700/30 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6 font-orbitron">
                                <span className="text-cyan-400"><EncryptedText text="THE CITY" /></span> <EncryptedText text="THAT NEVER SLEEPS" />
                            </h2>
                            <div className="text-lg text-gray-300 mb-6 font-rajdhani">
                                <EncryptedText text="Neon signs flicker in the perpetual rain. Corporate towers pierce the smog-choked sky. In the shadows between the light, deals are made, lives are bought, and secrets are buried." />
                            </div>
                            <div className="text-lg text-gray-300 mb-6 font-rajdhani">
                                <EncryptedText text="You're just another piece on the board. But even pawns can topple kings... if they know which wires to cut." />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <div className="px-4 py-2 bg-black border border-cyan-700 text-cyan-400 font-mono text-sm">
                                    <EncryptedText text="CORPORATE ESPIONAGE" />
                                </div>
                                <div className="px-4 py-2 bg-black border border-magenta-700 text-magenta-400 font-mono text-sm">
                                    <EncryptedText text="DIGITAL SHADOWS" />
                                </div>
                                <div className="px-4 py-2 bg-black border border-yellow-700 text-yellow-400 font-mono text-sm">
                                    <EncryptedText text="NEON DARKNESS" />
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square relative border-2 border-cyan-500 shadow-[0_0_30px_rgba(0,255,255,0.3)] overflow-hidden">
                                <CSSGlitchImage
                                    src={localized?.image || '/images/old-world-neon-hero.png'}
                                    alt="OLD WORLD NEON Cityscape"
                                    width={600}
                                    height={600}
                                    theme="cyberpunk-intense"
                                    className="w-full h-full"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-20" />
                                <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-20">
                                    <div className="text-cyan-400 font-mono text-xs tracking-widest">LOCATION: CLASSIFIED</div>
                                    <div className="text-white font-orbitron">SECTOR 7 - NEON DISTRICT</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Tease */}
            <section className="py-20 bg-gradient-to-b from-black to-cyan-950/10 border-t border-magenta-700/30 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-white mb-12 text-center font-orbitron">
                        <span className="text-magenta-400">ENCRYPTED</span> FEATURES
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-black/60 border border-cyan-700 p-6 backdrop-blur-sm">
                            <div className="text-4xl mb-4">🌃</div>
                            <h3 className="text-xl font-bold text-white mb-3 font-orbitron"><EncryptedText text="URBAN SPRAWL" /></h3>
                            <div className="text-gray-300 font-rajdhani">
                                <EncryptedText text="Navigate a city where every street corner hides danger and opportunity in equal measure." />
                            </div>
                        </div>
                        <div className="bg-black/60 border border-magenta-700 p-6 backdrop-blur-sm">
                            <div className="text-4xl mb-4">💾</div>
                            <h3 className="text-xl font-bold text-white mb-3 font-orbitron"><EncryptedText text="DIGITAL WARFARE" /></h3>
                            <div className="text-gray-300 font-rajdhani">
                                <EncryptedText text="Hack systems, steal data, and erase your tracks before the corps trace you back." />
                            </div>
                        </div>
                        <div className="bg-black/60 border border-yellow-700 p-6 backdrop-blur-sm">
                            <div className="text-4xl mb-4">🔫</div>
                            <h3 className="text-xl font-bold text-white mb-3 font-orbitron"><EncryptedText text="HIGH-STAKES HEISTS" /></h3>
                            <div className="text-gray-300 font-rajdhani">
                                <EncryptedText text="Plan the job, assemble your crew, and pray your tech doesn't glitch at the worst moment." />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-black border-t border-cyan-700/30 relative z-10">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <div className="mb-8">
                        <div className="text-cyan-400 font-mono text-sm mb-2 tracking-[0.3em]">STATUS UPDATE</div>
                        <h2 className="text-4xl font-bold text-white mb-6 font-orbitron">
                            STAY <span className="text-magenta-400">CONNECTED</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 font-rajdhani">
                            More intel will be declassified soon. Join our network to receive updates when the data drops.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://discord.gg/qJS4h5usxe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 text-lg font-orbitron font-bold transition-all border border-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                        >
                            JOIN DISCORD
                        </a>
                        <Link
                            href="/projects"
                            className="bg-transparent border-2 border-magenta-500 text-magenta-400 hover:bg-magenta-500 hover:text-black px-8 py-4 text-lg font-orbitron font-bold transition-all"
                        >
                            ALL PROJECTS
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
