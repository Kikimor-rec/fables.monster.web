export interface Project {
    id: string;
    slug: string;
    title: {
        en: string;
        ru: string;
    };
    system: string;
    tagline: {
        en: string;
        ru: string;
    };
    description: {
        en: string;
        ru: string;
    };
    status: "released" | "in-development" | "coming-soon";
    type: "Adventure" | "Soundtrack" | "Tool" | "VTT Module" | "One-Shot";
    image: string;
    imageAlt: string;
    featured?: boolean;
    tags?: string[];
    platforms?: {
        en: {
            itch?: string;
            driveThru?: string;
            foundry?: string;
            roll20?: string;
            patreon?: string;
        };
        ru: {
            itch?: string;
            driveThru?: string;
            foundry?: string;
            roll20?: string;
            patreon?: string;
            boosty?: string;
            vk?: string;
        };
    };
    fullDescription?: {
        en: string;
        ru: string;
    };
    features?: {
        title: {
            en: string;
            ru: string;
        };
        description: {
            en: string;
            ru: string;
        };
        icon?: string;
    }[];
    gallery?: {
        src: string;
        alt: string;
    }[];
}

export const projects: Project[] = [
    {
        id: "lost-mark",
        slug: "lost-mark",
        title: {
            en: "THE LOST MARK",
            ru: "ПОТЕРЯННАЯ МЕТКА"
        },
        system: "Mothership 1E",
        tagline: {
            en: "A Sci-Fi horror one-shot where your crew faces impossible choices among the wrecks and cults of deep space.",
            ru: "Научно-фантастический хоррор ваншот, где вашей команде предстоит сделать невозможный выбор среди обломков и культов глубокого космоса."
        },
        description: {
            en: "A Sci-Fi horror one-shot for Mothership RPG where your crew faces impossible choices and eldritch truths among the wrecks and cults of deep space.",
            ru: "Научно-фантастический хоррор ваншот для Mothership RPG, где вашей команде предстоит столкнуться с невозможным выбором и древними истинами среди обломков и культов глубокого космоса."
        },
        status: "released",
        type: "One-Shot",
        image: "/images/lost-mark/lm_promo_1.webp",
        imageAlt: "The Lost Mark - Sci-Fi Horror One-Shot",
        featured: true,
        tags: ["MOTHERSHIP", "SCI-FI HORROR", "INVESTIGATION"],
        platforms: {
            en: {
                itch: "https://fables-monster-studio.itch.io/the-lost-mark",
                driveThru: "#",
                foundry: "#",
            },
            ru: {
                itch: "https://fables-monster-studio.itch.io/the-lost-mark",
                driveThru: "#",
                foundry: "#",
                boosty: "https://boosty.to/fablesmonster",
            }
        },
    },
    {
        id: "hellish-bureaucracy",
        slug: "hellish-bureaucracy",
        title: {
            en: "HELLISH BUREAUCRACY",
            ru: "АДСКАЯ БЮРОКРАТИЯ"
        },
        system: "Mothership 1E",
        tagline: {
            en: "Navigate the worst nightmare: infinite paperwork in hell.",
            ru: "Пройдите через худший кошмар: бесконечную бумажную работу в аду."
        },
        description: {
            en: "A bureaucratic horror adventure where forms and red tape become deadly.",
            ru: "Бюрократическое хоррор-приключение, где формы и красная лента становятся смертельными."
        },
        status: "in-development",
        type: "Adventure",
        image: "/images/hellish-bureaucracy/monster.webp",
        imageAlt: "Hellish Bureaucracy - Dark Comedy Horror",
        tags: ["MOTHERSHIP", "DARK COMEDY", "HORROR"],
    },
    {
        id: "old-world-neon",
        slug: "old-world-neon",
        title: {
            en: "OLD WORLD NEON",
            ru: "OLD WORLD NEON"
        },
        system: "???",
        tagline: {
            en: "A classified cyberpunk operation. Details remain encrypted.",
            ru: "Засекреченная киберпанк операция. Детали зашифрованы."
        },
        description: {
            en: "Highly classified project. Information restricted. Access denied.",
            ru: "Совершенно секретный проект. Информация ограничена. Доступ запрещен."
        },
        status: "in-development",
        type: "Adventure",
        image: "/images/project-neon/preview.webp",
        imageAlt: "Old World Neon - Classified Cyberpunk Operation",
        tags: ["CYBERPUNK", "CLASSIFIED", "???"],
    },
    {
        id: "holiday-audit-kramp",
        slug: "holiday-audit-kramp",
        title: {
            en: "HOLIDAY AUDIT: KRAMP.EXE",
            ru: "ПРАЗДНИЧНЫЙ АУДИТ: KRAMP.EXE"
        },
        system: "Mothership 1E",
        tagline: {
            en: "A festive horror one-shot for your holiday table.",
            ru: "Праздничный хоррор ваншот для вашего новогоднего стола."
        },
        description: {
            en: "Christmas Eve gone catastrophically wrong in deep space. Can you cleanse your record before the system wipes you?",
            ru: "Рождество в глубоком космосе пошло катастрофически не так. Сможете ли вы очистить свое досье до того, как система сотрет вас?"
        },
        status: "coming-soon",
        type: "One-Shot",
        image: "/images/kramp/promo.webp",
        imageAlt: "Holiday Audit: Kramp.exe - Festive Horror One-Shot",
        tags: ["MOTHERSHIP", "ONE-SHOT", "HOLIDAY"],
    },
];

// Helper to get featured project
export const getFeaturedProject = (): Project | undefined => {
    return projects.find((p) => p.featured);
};

// Helper to get projects by status
export const getProjectsByStatus = (status: Project["status"]): Project[] => {
    return projects.filter((p) => p.status === status);
};

// Helper to get all released projects
export const getReleasedProjects = (): Project[] => {
    return getProjectsByStatus("released");
};

// Helper to sort projects by status priority
// Order: released -> coming-soon -> in-development
export const sortProjectsByStatus = (projects: Project[]): Project[] => {
    const statusOrder: Record<Project["status"], number> = {
        "released": 1,
        "coming-soon": 2,
        "in-development": 3,
    };
    
    return [...projects].sort((a, b) => {
        const orderA = statusOrder[a.status];
        const orderB = statusOrder[b.status];
        
        // If same status, maintain original order (or sort by featured)
        if (orderA === orderB) {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
        }
        
        return orderA - orderB;
    });
};

// Helper to get localized project data
export const getLocalizedProject = (project: Project, locale: 'en' | 'ru') => {
    return {
        ...project,
        title: project.title[locale],
        tagline: project.tagline[locale],
        description: project.description[locale],
        platforms: project.platforms?.[locale],
        fullDescription: project.fullDescription?.[locale],
        features: project.features?.map(f => ({
            ...f,
            title: f.title[locale],
            description: f.description[locale]
        }))
    };
};
