export interface Project {
    id: string;
    slug: string;
    title: string;
    system: string;
    tagline: string;
    description: string;
    status: "released" | "in-development" | "coming-soon";
    type: "Adventure" | "Soundtrack" | "Tool" | "VTT Module" | "One-Shot";
    image: string;
    imageAlt: string;
    featured?: boolean;
    tags?: string[];
    platforms?: {
        itch?: string;
        driveThru?: string;
        foundry?: string;
        roll20?: string;
        patreon?: string;
    };
    fullDescription?: string;
    features?: {
        title: string;
        description: string;
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
        title: "THE LOST MARK",
        system: "Mothership 1E",
        tagline: "A Sci-Fi horror one-shot where your crew faces impossible choices among the wrecks and cults of deep space.",
        description: "A Sci-Fi horror one-shot for Mothership RPG where your crew faces impossible choices and eldritch truths among the wrecks and cults of deep space.",
        status: "released",
        type: "One-Shot",
        image: "/images/lost-mark/lm_promo_1.webp",
        imageAlt: "The Lost Mark - Sci-Fi Horror One-Shot",
        featured: true,
        tags: ["MOTHERSHIP", "SCI-FI HORROR", "INVESTIGATION"],
        platforms: {
            itch: "https://fables-monster-studio.itch.io/the-lost-mark",
            driveThru: "https://www.drivethrurpg.com/en/product/530242",
            roll20: "https://marketplace.roll20.net/browse/module/39314/lost-mark-sci-fi-horror-one-shot-for-mothership",
            foundry: "#",
        },
    },
    {
        id: "hellish-bureaucracy",
        slug: "hellish-bureaucracy",
        title: "HELLISH BUREAUCRACY",
        system: "Mothership 1E",
        tagline: "The worst nightmare: infinite paperwork in Hell.",
        description: "A dark comedy horror adventure where infernal red tape is literally deadly.",
        status: "in-development",
        type: "Adventure",
        image: "/images/hellish-bureaucracy/monster.webp",
        imageAlt: "Hellish Bureaucracy - Dark Comedy Horror",
        tags: ["MOTHERSHIP", "DARK COMEDY", "HORROR"],
    },
    {
        id: "old-world-neon",
        slug: "old-world-neon",
        title: "OLD WORLD NEON",
        system: "???",
        tagline: "A classified cyberpunk operation. Details remain encrypted.",
        description: "Highly classified project. Information restricted. Access denied.",
        status: "in-development",
        type: "Adventure",
        image: "/images/old-world-neon/preview.webp",
        imageAlt: "Old World Neon - Classified Cyberpunk Operation",
        tags: ["CYBERPUNK", "CLASSIFIED", "???"],
    },
    {
        id: "holiday-audit-kramp",
        slug: "holiday-audit-kramp",
        title: "HOLIDAY AUDIT: KRAMP.EXE",
        system: "Mothership 1E",
        tagline: "A festive horror one-shot for your holiday table.",
        description: "Christmas Eve gone catastrophically wrong in deep space. Can you cleanse your record before the system wipes you?",
        status: "released",
        type: "One-Shot",
        image: "/images/kramp/promo.webp",
        imageAlt: "Holiday Audit: Kramp.exe - Festive Horror One-Shot",
        tags: ["MOTHERSHIP", "ONE-SHOT", "HOLIDAY"],
        platforms: {
            itch: "https://fablesmonster.itch.io/krampexe-mothership-1e",
            driveThru: "https://www.drivethrurpg.com/en/product/547046/kramp-exe-christmas-special-edition-for-mothership-1e?affiliate_id=2863466",
            patreon: "https://www.patreon.com/posts/kramp-exe-for-1e-144275102",
        },
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