import { Metadata } from 'next';
import Link from 'next/link';
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import OptimizedImage from "@/components/OptimizedImage";
import CompactTeamMember from "@/components/CompactTeamMember";
import StayConnectedSection from "@/components/StayConnectedSection";
import { teamMembers } from "@/data/team";
import { getDictionary } from '@/lib/i18n';
import { getAllProjects, getFrontmatterString, getFrontmatterObject } from '@/lib/content';










export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang, 'home');

    return {
        title: dict.meta?.title || 'Fables Monster Studio - Independent Tabletop RPG Creators',
        description: dict.meta?.description || 'Create unforgettable tabletop RPG experiences with Fables Monster Studio.',
        keywords: dict.meta?.keywords,
        alternates: {
            canonical: `https://fables.monster/${lang}`,
            languages: {
                'en': 'https://fables.monster/en',
                'ru': 'https://fables.monster/ru',
                'x-default': 'https://fables.monster/en',
            },
        },
        openGraph: {
            title: dict.meta?.ogTitle || dict.meta?.title || 'Fables Monster Studio - Independent Tabletop RPG Creators',
            description: dict.meta?.ogDescription || dict.meta?.description || 'Create unforgettable tabletop RPG experiences.',
            url: `https://fables.monster/${lang}`,
            siteName: 'Fables Monster Studio',
            locale: lang === 'ru' ? 'ru_RU' : 'en_US',
            type: 'website',
            images: ['/logos/fm-logo-sqare.png'],
        },
    };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang, 'home');
    
    // Get localized projects from markdown files
    const allProjects = await getAllProjects(lang);
    
    // Sort projects: released first, then in-development, then coming-soon
    const statusOrder: Record<string, number> = {
        "released": 1,
        "Released": 1,
        "Вышло": 1,
        "coming-soon": 2,
        "Coming Soon": 2,
        "Скоро": 2,
        "in-development": 3,
        "In Development": 3,
        "В разработке": 3,
    };
    
    const sortedProjects = [...allProjects].sort((a, b) => {
        const statusA = getFrontmatterString(a.frontmatter, 'status') || 'in-development';
        const statusB = getFrontmatterString(b.frontmatter, 'status') || 'in-development';
        const orderA = statusOrder[statusA] || 99;
        const orderB = statusOrder[statusB] || 99;
        return orderA - orderB;
    });

    const normalizeStatus = (status: string) => status.toLowerCase().trim();
    const releasedStatuses = new Set(['released', 'вышло']);
    const inDevStatuses = new Set(['in-development', 'in development', 'в разработке']);

    const releasedCount = allProjects.filter((project) => {
        const status = normalizeStatus(getFrontmatterString(project.frontmatter, 'status') || '');
        return releasedStatuses.has(status);
    }).length;

    const inDevCount = allProjects.filter((project) => {
        const status = normalizeStatus(getFrontmatterString(project.frontmatter, 'status') || '');
        return inDevStatuses.has(status);
    }).length;

    const heroStatusBadges = dict.hero?.statusBadges || ['SYSTEM READY', 'SECURE CHANNEL', 'NEW DROPS'];

    const telemetry = [
        { label: dict.telemetry?.modules || 'MODULES', value: String(allProjects.length) },
        { label: dict.telemetry?.available || 'AVAILABLE', value: String(releasedCount) },
        { label: dict.telemetry?.inDevelopment || 'IN DEVELOPMENT', value: String(inDevCount) },
        { label: dict.telemetry?.locales || 'LOCALES', value: dict.telemetry?.localesValue || 'EN / RU' },
    ];

    const marqueePhrases = dict.hero?.marqueePhrases || ['SCI-FI HORROR', 'MOTHERSHIP READY', 'HANDCRAFTED MODULES', 'ATMOSPHERIC TOOLS', 'COMMUNITY FIRST'];

    return (
        <div className="bg-black">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 motion-safe:animate-pulse [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-red-950/20"></div>
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
                    <FadeIn delay={0.2}>
                        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                            {heroStatusBadges.map((badge) => (
                                <span
                                    key={badge}
                                    className="border border-cyan-900/70 bg-black/60 px-3 py-1 text-[11px] font-mono tracking-[0.22em] text-cyan-400"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-col items-center justify-center mb-6 group">
                            <div className="relative">
                                <Image
                                    src="/logos/mascot_white.PNG"
                                    alt={dict.hero?.logoAlt || 'Fables Monster Mascot'}
                                    width={320}
                                    height={320}
                                    className="w-[320px] max-w-full mb-4 mt-16 sm:mt-0 relative z-10 logo-glitch"
                                    priority
                                />
                            </div>
                            <h1 className="fm-display-title font-bold text-white font-orbitron tracking-wider text-glow-lg glitch-text" data-text={dict.hero?.title || ''}>
                                {dict.hero?.title}
                            </h1>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <p className="fm-lead text-cyan-400 mb-8 max-w-3xl mx-auto font-rajdhani tracking-widest uppercase border-b border-cyan-900/50 pb-4 inline-block">
                            {dict.hero?.subtitle}
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.6}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href={`/${lang}/projects`}
                                className="w-full sm:w-auto bg-red-700 hover:bg-red-600 text-white px-8 py-4 text-lg font-orbitron font-bold transition-all border border-red-500 hover:box-glow clip-path-slant"
                            >
                                {dict.hero?.ctaProjects}
                            </Link>
                            <Link
                                href={`/${lang}/lost-mark`}
                                className="w-full sm:w-auto bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 px-8 py-4 text-lg font-orbitron font-bold transition-all hover:text-white hover:box-glow-cyan"
                            >
                                {dict.hero?.ctaLostMark}
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <section className="border-y border-red-900/30 bg-black/70 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {telemetry.map((item) => (
                        <div key={item.label} className="border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-center">
                            <div className="text-[11px] text-zinc-500 font-mono tracking-[0.22em] mb-1">{item.label}</div>
                            <div className="font-orbitron text-lg sm:text-xl text-white">{item.value}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="overflow-hidden border-y-2 border-black bg-red-600 text-black -skew-y-1">
                <div className="py-3">
                    <div className="fm-marquee-track flex min-w-max items-center gap-6 sm:gap-8 whitespace-nowrap px-4 sm:px-6">
                        {[...marqueePhrases, ...marqueePhrases].map((phrase, index) => (
                            <span key={`${phrase}-${index}`} className="font-orbitron font-black text-sm sm:text-base md:text-lg tracking-[0.16em] uppercase">
                                {phrase}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Preview Section */}
            <section className="py-24 bg-black relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-end mb-12 border-b border-red-900/30 pb-4">
                        <div>
                            <h2 className="fm-section-title font-bold text-white font-orbitron mb-2">
                                <span className="text-red-600">{dict.latestProjects?.title}</span> {dict.latestProjects?.projects}
                            </h2>
                            <div className="h-1 w-24 bg-red-600"></div>
                        </div>
                        <Link
                            href={`/${lang}/projects`}
                            className="hidden sm:block text-cyan-400 hover:text-white font-rajdhani tracking-wider transition-colors"
                        >
                            {dict.latestProjects?.viewAll}
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedProjects.slice(0, 3).map((project, index) => {
                            const title = getFrontmatterString(project.frontmatter, 'title');
                            const tagline = getFrontmatterString(project.frontmatter, 'tagline');
                            const image = getFrontmatterString(project.frontmatter, 'image') || '/images/placeholder.webp';
                            const type = getFrontmatterString(project.frontmatter, 'type') || getFrontmatterString(project.frontmatter, 'system') || dict.latestProjects?.defaultType || 'Adventure';
                            const status = getFrontmatterString(project.frontmatter, 'status') || 'in-development';
                            const platforms = getFrontmatterObject<Record<string, string>>(project.frontmatter, 'platforms');
                            
                            // Normalize status for comparison
                            const isReleased = ['released', 'Released', 'Вышло'].includes(status);
                            const isInDev = ['in-development', 'In Development', 'В разработке'].includes(status);
                            
                            return (
                                <FadeIn key={project.slug} delay={index * 0.1}>
                                    <Link href={`/${lang}/${project.slug}`} className="group block h-full">
                                        <div className="bg-gray-900 border border-gray-800 hover:border-red-600 transition-all duration-300 h-full flex flex-col relative overflow-hidden group-hover:box-glow">
                                            <div className="relative h-64 overflow-hidden">
                                                <OptimizedImage
                                                    src={image}
                                                    alt={title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                                
                                                {/* Status Badge */}
                                                <div className="absolute top-4 right-4 z-10">
                                                    <span className={`px-3 py-1 text-xs font-orbitron font-bold border ${
                                                        isReleased ? 'bg-green-900/50 text-green-400 border-green-500' :
                                                        isInDev ? 'bg-yellow-900/50 text-yellow-400 border-yellow-500' :
                                                        'bg-blue-900/50 text-blue-400 border-blue-500'
                                                    }`}>
                                                        {isReleased ? (dict.status?.released || 'RELEASED') :
                                                            isInDev ? (dict.status?.inDev || 'IN DEV') :
                                                            (dict.status?.comingSoon || 'COMING SOON')}
                                                    </span>
                                                </div>

                                                <div className="absolute bottom-4 left-4 right-4 z-10">
                                                    <span className="text-xs font-bold text-red-500 font-orbitron tracking-widest mb-1 block">
                                                        {type.toUpperCase()}
                                                    </span>
                                                    <h3 className="text-xl font-bold text-white font-orbitron group-hover:text-red-400 transition-colors">
                                                        {title}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="p-6 flex-grow flex flex-col">
                                                <p className="text-gray-400 font-rajdhani mb-4 line-clamp-3 flex-grow">
                                                    {tagline}
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-auto">
                                                    {platforms && Object.entries(platforms).map(([key, url]) => (
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
                            );
                        })}
                    </div>

                    <div className="mt-12 text-center sm:hidden">
                        <Link
                            href={`/${lang}/projects`}
                            className="inline-block bg-transparent border border-red-600 text-red-500 px-8 py-3 font-orbitron font-bold hover:bg-red-900/20 transition-colors"
                        >
                            {dict.latestProjects?.viewAll || 'VIEW ALL PROJECTS →'}
                        </Link>
                    </div>
                </div>
            </section>

            {/* KRAMP.EXE Special Section */}
            <section className="py-24 bg-red-950/10 border-y border-red-900/30 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 mix-blend-overlay [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:8px_8px]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block bg-red-600 text-black font-bold px-2 py-1 mb-4 font-mono text-sm">
                                {dict.kramp?.badge || 'FEATURED RELEASE'}
                            </div>
                            <h2 className="fm-section-title font-bold text-white font-orbitron mb-6 glitch-text" data-text="HOLIDAY AUDIT">
                                {dict.kramp?.title || 'HOLIDAY AUDIT:'} <span className="text-red-500">{dict.kramp?.subtitle || 'KRAMP.EXE'}</span>
                            </h2>
                            <p className="fm-lead text-gray-300 font-rajdhani mb-8">
                                {dict.kramp?.description || 'A holiday horror one-shot for Mothership RPG 1e. Survive the corporate holiday party where the audit is mandatory and failure is terminal.'}
                            </p>
                            <div className="flex gap-4">
                                <Link
                                    href={`/${lang}/holiday-audit-kramp`}
                                    className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 font-orbitron font-bold transition-all hover:box-glow"
                                >
                                    {dict.kramp?.cta || 'ACCESS TERMINAL'}
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 motion-safe:animate-pulse"></div>
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
                            <h2 className="fm-section-title font-bold text-white font-orbitron mb-6">
                                {dict.about?.titlePrefix ? `${dict.about.titlePrefix} ` : ''}<span className="text-cyan-500">{dict.about?.title || 'CREW'}</span>
                            </h2>
                            <p className="text-lg text-gray-300 font-rajdhani mb-6">
                                {dict.about?.description || 'We are a collective of designers, writers, and artists dedicated to creating immersive, high-quality tabletop RPG content. Our mission is to bring fresh nightmares and wonders to your gaming table.'}
                            </p>
                            <Link
                                href={`/${lang}/about`}
                                className="text-cyan-400 hover:text-white font-rajdhani font-bold text-lg tracking-wider transition-colors border-b-2 border-cyan-500/30 hover:border-cyan-400 pb-1"
                            >
                                {dict.about?.cta || 'MEET THE TEAM →'}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stay Connected Section */}
            <StayConnectedSection
                lang={lang}
                dict={dict.stayConnected}
            />
        </div>
    );
}
