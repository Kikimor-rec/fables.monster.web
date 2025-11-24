import { Metadata } from 'next';
import Link from 'next/link';
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import OptimizedImage from "@/components/OptimizedImage";
import CompactTeamMember from "@/components/CompactTeamMember";
import { projects, sortProjectsByStatus } from "@/data/projects";
import { teamMembers } from "@/data/team";

export const metadata: Metadata = {
    title: 'Fables Monster Studio - Independent Tabletop RPG Creators',
    description: 'Create unforgettable tabletop RPG experiences with Fables Monster Studio. Specializing in horror, sci-fi, and supernatural adventures for Mothership RPG, D&D, and more.',
    keywords: 'tabletop RPG, horror RPG, Mothership RPG, indie games, D&D adventures, cosmic horror, sci-fi RPG, supernatural adventures',
};

export default async function Home() {
    const sortedProjects = sortProjectsByStatus(projects);

    return (
        <div className="bg-black">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.png')] opacity-20 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-red-950/20"></div>
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
                    <FadeIn delay={0.2}>
                        <div className="flex flex-col items-center justify-center mb-6 group">
                            <div className="relative">
                                <Image
                                    src="/logos/mascot_white.PNG"
                                    alt="Fables Monster Mascot"
                                    width={320}
                                    height={320}
                                    className="w-[320px] max-w-full mb-4 mt-16 sm:mt-0 relative z-10 logo-glitch"
                                    priority
                                />
                            </div>
                            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white font-orbitron tracking-wider text-glow-lg glitch-text" data-text="FABLES MONSTER">
                                FABLES MONSTER
                            </h1>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <p className="text-lg sm:text-xl md:text-2xl text-cyan-400 mb-8 max-w-3xl mx-auto font-rajdhani tracking-widest uppercase border-b border-cyan-900/50 pb-4 inline-block">
                            Independent tabletop RPG content creation studio
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.6}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/projects"
                                className="w-full sm:w-auto bg-red-700 hover:bg-red-600 text-white px-8 py-4 text-lg font-orbitron font-bold transition-all border border-red-500 hover:box-glow clip-path-slant"
                                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                            >
                                VIEW PROJECTS
                            </Link>
                            <Link
                                href="/lost-mark"
                                className="w-full sm:w-auto bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 px-8 py-4 text-lg font-orbitron font-bold transition-all hover:text-white hover:box-glow-cyan"
                                style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                            >
                                LOST MARK
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Projects Preview Section */}
            <section className="py-24 bg-black relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-end mb-12 border-b border-red-900/30 pb-4">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white font-orbitron mb-2">
                                <span className="text-red-600">LATEST</span> PROJECTS
                            </h2>
                            <div className="h-1 w-24 bg-red-600"></div>
                        </div>
                        <Link
                            href="/projects"
                            className="hidden sm:block text-cyan-400 hover:text-white font-rajdhani tracking-wider transition-colors"
                        >
                            VIEW ALL PROJECTS →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedProjects.slice(0, 3).map((project, index) => (
                            <FadeIn key={project.id} delay={index * 0.1}>
                                <Link href={`/${project.slug}`} className="group block h-full">
                                    <div className="bg-gray-900 border border-gray-800 hover:border-red-600 transition-all duration-300 h-full flex flex-col relative overflow-hidden group-hover:box-glow">
                                        <div className="relative h-64 overflow-hidden">
                                            <OptimizedImage
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                            
                                            {/* Status Badge */}
                                            <div className="absolute top-4 right-4 z-10">
                                                <span className={`px-3 py-1 text-xs font-orbitron font-bold border ${
                                                    project.status === 'released' ? 'bg-green-900/50 text-green-400 border-green-500' :
                                                    project.status === 'in-development' ? 'bg-yellow-900/50 text-yellow-400 border-yellow-500' :
                                                    'bg-blue-900/50 text-blue-400 border-blue-500'
                                                }`}>
                                                    {project.status === 'released' ? 'RELEASED' :
                                                        project.status === 'in-development' ? 'IN DEV' :
                                                        'COMING SOON'}
                                                </span>
                                            </div>

                                            <div className="absolute bottom-4 left-4 right-4 z-10">
                                                <span className="text-xs font-bold text-red-500 font-orbitron tracking-widest mb-1 block">
                                                    {project.type.toUpperCase()}
                                                </span>
                                                <h3 className="text-xl font-bold text-white font-orbitron group-hover:text-red-400 transition-colors">
                                                    {project.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-grow flex flex-col">
                                            <p className="text-gray-400 font-rajdhani mb-4 line-clamp-3 flex-grow">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                {project.platforms && typeof project.platforms === 'object' && !Array.isArray(project.platforms) && Object.entries(project.platforms).map(([key, url]) => (
                                                    url && (
                                                        <span key={key} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded font-mono border border-gray-700">
                                                            {key}
                                                        </span>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </FadeIn>
                        ))}
                    </div>

                    <div className="mt-12 text-center sm:hidden">
                        <Link
                            href="/projects"
                            className="inline-block bg-transparent border border-red-600 text-red-500 px-8 py-3 font-orbitron font-bold hover:bg-red-900/20 transition-colors"
                        >
                            VIEW ALL PROJECTS
                        </Link>
                    </div>
                </div>
            </section>

            {/* KRAMP.EXE Special Section */}
            <section className="py-24 bg-red-950/10 border-y border-red-900/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block bg-red-600 text-black font-bold px-2 py-1 mb-4 font-mono text-sm">
                                FEATURED RELEASE
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-white font-orbitron mb-6 glitch-text" data-text="HOLIDAY AUDIT">
                                HOLIDAY AUDIT: <span className="text-red-500">KRAMP.EXE</span>
                            </h2>
                            <p className="text-xl text-gray-300 font-rajdhani mb-8">
                                A holiday horror one-shot for Mothership RPG 1e. Survive the corporate holiday party where the audit is mandatory and failure is terminal.
                            </p>
                            <div className="flex gap-4">
                                <Link
                                    href="/holiday-audit-kramp"
                                    className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 font-orbitron font-bold transition-all hover:box-glow"
                                >
                                    ACCESS TERMINAL
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 animate-pulse"></div>
                            <OptimizedImage
                                src="/images/kramp/promo.webp"
                                alt="KRAMP.EXE Promo"
                                width={600}
                                height={400}
                                className="relative z-10 border-2 border-red-500/50 shadow-2xl shadow-red-900/50"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Preview */}
            <section className="py-24 bg-black relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                {teamMembers.map((member) => (
                                    <CompactTeamMember key={member.name} member={member} />
                                ))}
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-4xl md:text-5xl font-bold text-white font-orbitron mb-6">
                                THE <span className="text-cyan-500">CREW</span>
                            </h2>
                            <p className="text-lg text-gray-300 font-rajdhani mb-6">
                                We are a collective of designers, writers, and artists dedicated to creating immersive, high-quality tabletop RPG content. Our mission is to bring fresh nightmares and wonders to your gaming table.
                            </p>
                            <Link
                                href="/about"
                                className="text-cyan-400 hover:text-white font-rajdhani font-bold text-lg tracking-wider transition-colors border-b-2 border-cyan-500/30 hover:border-cyan-400 pb-1"
                            >
                                MEET THE TEAM →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
