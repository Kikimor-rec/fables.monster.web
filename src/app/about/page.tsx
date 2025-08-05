import { Metadata } from 'next'
import Link from "next/link";
import TeamMember from "@/components/TeamMember";
// ...удалён импорт FinalEditable...

export const metadata: Metadata = {
  title: 'About | Fables Monster Studio',
  description: 'Meet the team behind Fables Monster Studio - talented creators crafting immersive tabletop RPG experiences, horror adventures, and sci-fi campaigns.',
  keywords: 'tabletop RPG team, game designers, RPG writers, horror game creators, Mothership RPG, indie game studio',
  openGraph: {
    title: 'About Fables Monster Studio - Meet Our Creative Team',
    description: 'Discover the passionate creators behind award-winning tabletop RPG content. From writers to artists, meet the team bringing nightmares to your gaming table.',
    url: 'https://fables.monster/about',
    siteName: 'Fables Monster Studio',
    images: [
      {
        url: 'https://fables.monster/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'Fables Monster Studio Team',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Fables Monster Studio - Meet Our Creative Team',
    description: 'Discover the passionate creators behind award-winning tabletop RPG content.',
    images: ['https://fables.monster/og-about.jpg'],
  },
  alternates: {
    canonical: 'https://fables.monster/about',
  },
}

export const dynamic = 'error';
// ...удалён импорт useContent...

export default function About() {
  const team = [
    {
      name: "Stepan Kulikov",
      role: "Writer & Game Designer",
      bio: "Lead writer and narrative designer, crafting compelling stories and game mechanics",
      image: "stepan-kulikov.webp"
    },
    {
      name: "Tatiana Bond",
      role: "Layout Designer",
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
    }
  ];

  const values = [
    {
      title: "Quality First",
      description: "We don't rush releases, preferring to create products we can be proud of",
      icon: "⭐"
    },
    {
      title: "Human Creativity",
      description: "We value human creativity and do not use AI-generated content",
      icon: "🤝"
    },
    {
      title: "All what you need",
      description: "We strive to prepare all the necessary materials so that you can focus on the story rather than resolving issues.",
      icon: "🌍"
    },
    {
      title: "Innovation in Tradition",
      description: "We respect classic genres but aren't afraid to experiment",
      icon: "🚀"
    }
  ];

  const milestones = [
    {
      year: "2025",
      title: "Studio Foundation",
      description: "A team of enthusiasts united to create unique tabletop RPG experiences"
    },
    {
      year: "2025",
      title: "First Project",
      description: "Started development of Lost Mark and formed our creative vision"
    },
  ];

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="pt-32 pb-20 border-b border-red-700">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-nunito tracking-wider">
            ABOUT THE STUDIO
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-nunito">
            We believe that the Warden, Dungeon Master, or Host (whatever you call them) should have the tools to run games and the ability to quickly start everything they need. And we want to make not just adventures, but ready-made tools that can reduce the time it takes to prepare for a game.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 font-nunito">
                OUR MISSION
              </h2>
              <p className="text-lg text-gray-300 mb-6 font-nunito">
                We believe that tabletop RPGs are more than just entertainment - they are a medium for storytelling, human connection, and exploring the depths of imagination.
              </p>
              <p className="text-lg text-gray-300 font-nunito">
                Our goal is to create experiences that challenge conventional thinking, explore complex themes, and provide players with unforgettable journeys into darkness and wonder.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🎭</div>
              <div className="text-white font-nunito font-bold text-xl border-2 border-red-700 p-6 bg-red-950/20">
                EVERY STORY DESERVES TO BE TOLD
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-nunito">
            OUR VALUES
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-gray-900 border border-red-700 p-6 text-center hover:bg-red-950/20 transition-colors"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 font-nunito">
                  {value.title}
                </h3>
                <p className="text-gray-300 font-nunito text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-nunito">
            THE TEAM
          </h2>
          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="w-full sm:w-auto">
                <TeamMember 
                  member={member}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-nunito">
            OUR JOURNEY
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-6 border-l-2 border-red-700 pl-6 pb-8"
              >
                <div className="bg-red-700 text-white font-bold px-4 py-2 rounded font-nunito">
                  {milestone.year}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 font-nunito">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-300 font-nunito">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-900 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-6 font-nunito">
            JOIN OUR JOURNEY
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-nunito">
            Want to be part of our story? Whether you're a player, creator, or fellow developer, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-red-700 hover:bg-red-600 text-white px-8 py-4 text-lg font-nunito font-bold transition-colors border border-red-600"
            >
              GET IN TOUCH
            </Link>
            <Link
              href="/projects"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-nunito font-bold transition-colors"
            >
              VIEW PROJECTS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
