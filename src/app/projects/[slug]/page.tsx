import { projects, getLocalizedProject } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from 'next/link';
import StoreButton from "@/components/StoreButton";
import { Metadata } from "next";

// Force static generation for all known projects
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    const typedLocale = locale as 'en' | 'ru';
    const localized = getLocalizedProject(project, typedLocale);

    return {
        title: `${localized.title} | Fables Monster Studio`,
        description: localized.tagline,
        openGraph: {
            title: localized.title,
            description: localized.tagline,
            images: [project.image],
        },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    const typedLocale = locale as 'en' | 'ru';
    const localized = getLocalizedProject(project, typedLocale);

    return (
        <main className="min-h-screen bg-black text-gray-200 pt-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <div className="inline-block bg-red-900/30 border border-red-500/50 px-4 py-1 rounded mb-6 backdrop-blur-sm">
                        <span className="text-red-400 font-orbitron tracking-widest text-sm">
                            {project.system}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-orbitron tracking-wider text-shadow-lg">
                        {localized.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto font-rajdhani font-medium leading-relaxed">
                        {localized.tagline}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        {localized.platforms?.itch && (
                            <StoreButton store="itch" href={localized.platforms.itch} />
                        )}
                        {localized.platforms?.driveThru && (
                            <StoreButton store="drivethrurpg" href={localized.platforms.driveThru} />
                        )}
                        {localized.platforms?.patreon && (
                            <StoreButton store="patreon" href={localized.platforms.patreon} />
                        )}
                        {localized.platforms && 'boosty' in localized.platforms && localized.platforms.boosty && (
                            <StoreButton store="boosty" href={localized.platforms.boosty} />
                        )}
                        {localized.platforms && 'vk' in localized.platforms && localized.platforms.vk && (
                            <StoreButton store="vk" href={localized.platforms.vk} />
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 border-t border-red-900/30">
                <div className="max-w-4xl mx-auto px-6">

                    {/* Status & Type */}
                    <div className="flex justify-center gap-4 mb-12">
                        <div className="bg-gray-900 border border-gray-800 px-6 py-3 rounded text-center">
                            <div className="text-xs text-gray-500 font-orbitron mb-1">STATUS</div>
                            <div className={`font-bold font-orbitron ${project.status === 'released' ? 'text-green-400' :
                                project.status === 'in-development' ? 'text-yellow-400' : 'text-blue-400'
                                }`}>
                                {project.status.toUpperCase().replace('-', ' ')}
                            </div>
                        </div>
                        <div className="bg-gray-900 border border-gray-800 px-6 py-3 rounded text-center">
                            <div className="text-xs text-gray-500 font-orbitron mb-1">TYPE</div>
                            <div className="font-bold text-white font-orbitron">
                                {project.type.toUpperCase()}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="prose prose-invert prose-lg max-w-none mb-16 font-rajdhani">
                        <h2 className="text-3xl font-bold text-white mb-6 font-orbitron border-l-4 border-red-600 pl-4">
                            OVERVIEW
                        </h2>
                        <div className="whitespace-pre-wrap text-gray-300 leading-relaxed text-lg">
                            {localized.fullDescription || localized.description}
                        </div>
                    </div>

                    {/* Features */}
                    {localized.features && localized.features.length > 0 && (
                        <div className="mb-20">
                            <h2 className="text-3xl font-bold text-white mb-10 font-orbitron text-center">
                                KEY FEATURES
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {localized.features.map((feature, index) => (
                                    <div key={index} className="bg-gray-900/50 border border-gray-800 p-6 hover:border-red-900/50 transition-colors">
                                        {feature.icon && (
                                            <div className="text-3xl mb-4">{feature.icon}</div>
                                        )}
                                        <h3 className="text-xl font-bold text-white mb-2 font-orbitron">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-400 font-rajdhani">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Gallery */}
                    {project.gallery && project.gallery.length > 0 && (
                        <div className="mb-20">
                            <h2 className="text-3xl font-bold text-white mb-10 font-orbitron text-center">
                                GALLERY
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {project.gallery.map((item, index) => (
                                    <div key={index} className="relative aspect-video overflow-hidden border border-gray-800 rounded group">
                                        <Image
                                            src={item.src}
                                            alt={item.alt}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 bg-red-950/10 border-t border-red-900/30 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white mb-6 font-orbitron">
                        READY TO DIVE IN?
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/projects"
                            className="bg-transparent border border-white text-white hover:bg-white hover:text-black px-8 py-3 font-orbitron font-bold transition-colors"
                        >
                            BACK TO PROJECTS
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
