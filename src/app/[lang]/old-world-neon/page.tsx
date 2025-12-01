import { Metadata } from 'next';
import Link from 'next/link';
import Image from "next/image";
import { getContent, getFrontmatterString } from '@/lib/content';
import { getDictionary } from '@/lib/i18n';
import EncryptedText from "@/components/EncryptedText";
import NoSignalPlaceholder from "@/components/NoSignalPlaceholder";
import Navigation from "@/components/Navigation";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const content = await getContent('projects', 'old-world-neon', lang);
    const title = content ? getFrontmatterString(content.frontmatter, 'title') : '';
    const description = content ? getFrontmatterString(content.frontmatter, 'description') : '';

    return {
        title: `${title || 'OLD WORLD NEON'} | Fables Monster Studio`,
        description: description || 'A classified cyberpunk RPG project shrouded in mystery.',
        alternates: {
            canonical: `https://fables.monster/${lang}/old-world-neon`,
            languages: {
                'en': 'https://fables.monster/en/old-world-neon',
                'ru': 'https://fables.monster/ru/old-world-neon',
            },
        },
    };
}

interface NavDict {
    home?: string;
    projects?: string;
    lostMark?: string;
    timer?: string;
    about?: string;
    contact?: string;
}

interface StayConnectedDict {
    label?: string;
    title?: string;
    titleHighlight?: string;
    description?: string;
    discord?: string;
    allProjects?: string;
}

interface HomeDict {
    stayConnected?: StayConnectedDict;
}

interface CommonDict {
    nav?: NavDict;
}

export default async function ProjectNeonPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const content = await getContent('projects', 'old-world-neon', lang);
    const dict = await getDictionary(lang, 'common') as CommonDict;
    const homeDict = await getDictionary(lang, 'home') as HomeDict;

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            <Navigation lang={lang} dict={dict.nav || {}} />
            
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
                        src={content ? getFrontmatterString(content.frontmatter, 'image') || '/images/old-world-neon-hero.png' : '/images/old-world-neon-hero.png'}
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
                        {(['CYBERPUNK', 'CLASSIFIED', '???']).map((tag: string, i: number) => (
                             <span key={i} className={`px-4 py-2 bg-${i === 0 ? 'cyan' : i === 1 ? 'magenta' : 'yellow'}-900/50 text-${i === 0 ? 'cyan' : i === 1 ? 'magenta' : 'yellow'}-400 border border-${i === 0 ? 'cyan' : i === 1 ? 'magenta' : 'yellow'}-500 font-mono text-sm`}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Encrypted Message */}
                    <div className="max-w-3xl mx-auto mb-8 hud-border p-6 bg-black/80">
                        <p className="text-cyan-300 font-mono text-sm sm:text-base leading-relaxed mb-4">
                            &gt; ACCESSING ENCRYPTED DATA STREAM...<br />
                            &gt; SECURITY CLEARANCE: INSUFFICIENT<br />
                            &gt; ACCESS DENIED
                        </p>
                        <div className="text-gray-300 font-rajdhani text-base sm:text-lg">
                            <EncryptedText text={content ? getFrontmatterString(content.frontmatter, 'tagline') || 'Rain-slicked neon streets hide corporate secrets. Those who ask too many questions tend to disappear into the digital void.' : 'Rain-slicked neon streets hide corporate secrets. Those who ask too many questions tend to disappear into the digital void.'} />
                        </div>
                         <div className="mt-4 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content?.contentHtml || '' }} />
                    </div>

                    {/* Coming Soon Notice */}
                    <div className="bg-magenta-900/20 border-2 border-magenta-500 p-6 max-w-2xl mx-auto">
                        <div className="text-magenta-400 font-orbitron text-xl mb-2 flex items-center gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 4v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
                            </svg>
                            <span>INFORMATION RESTRICTED</span>
                        </div>
                        <div className="text-gray-300 font-rajdhani">
                            <EncryptedText text={content ? getFrontmatterString(content.frontmatter, 'description') || "More details will be revealed when the time is right. Follow our channels for updates." : "More details will be revealed when the time is right. Follow our channels for updates."} />
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
                                <NoSignalPlaceholder 
                                    className="w-full h-full"
                                    text="CLASSIFIED"
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
                            <svg className="w-10 h-10 text-cyan-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M3 21h18M3 7v14M21 7v14M6 7V3h12v4M9 14h6M9 10h6" />
                                <rect x="6" y="7" width="12" height="14" rx="1" />
                            </svg>
                            <h3 className="text-xl font-bold text-white mb-3 font-orbitron"><EncryptedText text="URBAN SPRAWL" /></h3>
                            <div className="text-gray-300 font-rajdhani">
                                <EncryptedText text="Navigate a city where every street corner hides danger and opportunity in equal measure." />
                            </div>
                        </div>
                        <div className="bg-black/60 border border-magenta-700 p-6 backdrop-blur-sm">
                            <svg className="w-10 h-10 text-magenta-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="4" y="4" width="16" height="16" rx="2" />
                                <path d="M9 9h6v6H9z" />
                                <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
                            </svg>
                            <h3 className="text-xl font-bold text-white mb-3 font-orbitron"><EncryptedText text="DIGITAL WARFARE" /></h3>
                            <div className="text-gray-300 font-rajdhani">
                                <EncryptedText text="Hack systems, steal data, and erase your tracks before the corps trace you back." />
                            </div>
                        </div>
                        <div className="bg-black/60 border border-yellow-700 p-6 backdrop-blur-sm">
                            <svg className="w-10 h-10 text-yellow-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
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
                        <div className="text-cyan-400 font-mono text-sm mb-2 tracking-[0.3em]">{homeDict.stayConnected?.label || 'STATUS UPDATE'}</div>
                        <h2 className="text-4xl font-bold text-white mb-6 font-orbitron">
                            {homeDict.stayConnected?.title || 'STAY'} <span className="text-magenta-400">{homeDict.stayConnected?.titleHighlight || 'CONNECTED'}</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 font-rajdhani">
                            {homeDict.stayConnected?.description || 'More intel will be declassified soon. Join our network to receive updates when the data drops.'}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://discord.gg/qJS4h5usxe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 text-lg font-orbitron font-bold transition-all border border-cyan-500 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                        >
                            {homeDict.stayConnected?.discord || 'JOIN DISCORD'}
                        </a>
                        <Link
                            href={`/${lang}/projects`}
                            className="bg-transparent border-2 border-magenta-500 text-magenta-400 hover:bg-magenta-500 hover:text-black px-8 py-4 text-lg font-orbitron font-bold transition-all"
                        >
                            {homeDict.stayConnected?.allProjects || 'ALL PROJECTS'}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
