import { getAllProjects, getContent, getFrontmatterString, getFrontmatterObject } from "@/lib/content";
import { notFound } from "next/navigation";
import Image from "next/image";
import StoreButton from "@/components/StoreButton";
import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import Navigation from "@/components/Navigation";

interface NavDict {
    home?: string;
    projects?: string;
    lostMark?: string;
    timer?: string;
    about?: string;
    contact?: string;
}

interface CommonDict {
    nav?: NavDict;
}

interface PlatformsType {
    itch?: string;
    driveThru?: string;
    roll20?: string;
    foundry?: string;
}

// Force static generation for all known projects
export async function generateStaticParams({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const projects = await getAllProjects(lang);
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ lang: string, slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const content = await getContent('projects', slug, lang);

    if (!content) {
        return {
            title: "Project Not Found",
        };
    }

    const title = getFrontmatterString(content.frontmatter, 'title');
    const tagline = getFrontmatterString(content.frontmatter, 'tagline');
    const image = getFrontmatterString(content.frontmatter, 'image');

    return {
        title: `${title} | Fables Monster Studio`,
        description: tagline || undefined,
        openGraph: {
            title: title || undefined,
            description: tagline || undefined,
            images: image ? [image] : undefined,
        },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
    const { lang, slug } = await params;
    const content = await getContent('projects', slug, lang);
    const dict = await getDictionary(lang, 'common') as CommonDict;

    if (!content) {
        notFound();
    }

    const contentTitle = getFrontmatterString(content.frontmatter, 'title');
    const contentImage = getFrontmatterString(content.frontmatter, 'image');
    const contentTagline = getFrontmatterString(content.frontmatter, 'tagline');
    const platforms = getFrontmatterObject<PlatformsType>(content.frontmatter, 'platforms');

    return (
        <main className="min-h-screen bg-black text-gray-200">
            <Navigation lang={lang} dict={dict.nav || {}} />
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={contentImage || '/images/placeholder.webp'}
                        alt={contentTitle}
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-orbitron tracking-wider text-glow">
                        {contentTitle}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 font-rajdhani max-w-2xl mx-auto">
                        {contentTagline}
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                        {platforms?.itch && (
                            <StoreButton 
                                store="itch" 
                                href={platforms.itch} 
                                label={lang === 'ru' ? "Купить на Itch.io" : "Get it on Itch.io"}
                            />
                        )}
                        {platforms?.driveThru && (
                            <StoreButton 
                                store="drivethrurpg" 
                                href={platforms.driveThru} 
                                label={lang === 'ru' ? "Купить на DriveThruRPG" : "Get it on DriveThruRPG"}
                            />
                        )}
                        {platforms?.roll20 && (
                            <StoreButton 
                                store="roll20" 
                                href={platforms.roll20} 
                                label={lang === 'ru' ? "Модуль для Roll20" : "Roll20 Module"}
                            />
                        )}
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto prose prose-invert prose-lg prose-red">
                    <div dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
                </div>
            </section>
        </main>
    );
}
