export interface TeamMember {
    name: string;
    role: string;
    image: string;
    bio?: string;
    link?: string;
    status?: string;
    portfolio?: string;
}

export const teamMembers: TeamMember[] = [
    {
        name: "Stepan Kulikov",
        role: "Writer & Game Designer",
        bio: "Lead writer and narrative designer, crafting compelling stories and game mechanics",
        image: "stepan-kulikov.webp"
    },
    {
        name: "Tatiana Bond",
        role: "Graphic & Layout Designer",
        bio: "Creates beautiful and functional layout designs for our publications",
        image: "tanka-bond.webp"
    },
    {
        name: "Zlata (jamakuci) Ignatova",
        role: "Artist",
        bio: "Visual artist bringing our worlds to life with stunning illustrations",
        image: "zlata.webp",
        link: "https://taplink.cc/jamakuci"
    },
    {
        name: "Stanislav DariDai",
        role: "Composer",
        bio: "Creates atmospheric music and sound design for our projects",
        image: "stanislav-darida.webp",
        link: "https://linktr.ee/stanislavdaridai"
    },
    {
        name: "Allecks",
        role: "Developer",
        bio: "Handles coding, web development, and technical implementation for VTT",
        image: "alleks.webp"
    },
    {
        name: "Dan Tarkov",
        role: "Game Designer",
        bio: "Game designer and creative mind behind new mechanics and adventures",
        image: ""
    }
];
