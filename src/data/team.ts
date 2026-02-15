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
        role: "Founder, Narrative Designer & Producer",
        bio: "Keeps the stories weird, the deadlines (mostly) real, and the studio moving forward.",
        image: "stepan-kulikov.webp"
    },
    {
        name: "Tatiana Bond",
        role: "Graphic & Layout Designer",
        bio: "Turns raw text and art into publications that look and read well.",
        image: "tanka-bond.webp"
    },
    {
        name: "Zlata (jamakuci) Ignatova",
        role: "Concept Artist/Illustrator",
        bio: "Draws the creatures, locations, and everything in between.",
        image: "zlata.webp",
        link: "https://taplink.cc/jamakuci"
    },
    {
        name: "Stanislav DariDai",
        role: "Composer",
        bio: "Writes the music. Sets the mood. Makes you check your headphones twice.",
        image: "stanislav-darida.webp",
        link: "https://linktr.ee/stanislavdaridai"
    },
    {
        name: "Allecks",
        role: "Developer",
        bio: "Builds the website, the VTT modules, and whatever else needs code.",
        image: "alleks.webp"
    },
    {
        name: "Dan Tarkov",
        role: "Game Designer",
        bio: "Designs game mechanics and breaks them until they work.",
        image: ""
    }
];
