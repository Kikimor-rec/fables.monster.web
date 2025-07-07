import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function About() {
  const team = [
    {
      name: "Stepan Kulikov",
      role: "Writer & Game Designer",
      description: "Lead writer and narrative designer, crafting compelling stories and game mechanics",
      avatar: "✍️"
    },
    {
      name: "Tatiana Bond",
      role: "Layout Designer",
      description: "Creates beautiful and functional layout designs for our publications",
      avatar: "📐"
    },
    {
      name: "Zlata (jamakuci) Ignatova",
      role: "Artist",
      description: "Visual artist bringing our worlds to life with stunning illustrations",
      avatar: "🎨"
    },
    {
      name: "Stanislav DariDai",
      role: "Composer",
      description: "Creates atmospheric music and sound design for our projects",
      avatar: "🎵"
    },
    {
      name: "Allecks",
      role: "Developer",
      description: "Handles coding, web development, and technical implementation",
      avatar: "💻"
    }
  ];

  const values = [
    {
      title: "Quality First",
      description: "We don't rush releases, preferring to create products we can be proud of",
      icon: "⭐"
    },
    {
      title: "Community Matters",
      description: "We listen to our players and create games together with the community",
      icon: "🤝"
    },
    {
      title: "Innovation in Tradition",
      description: "We respect classic genres but aren't afraid to experiment",
      icon: "🚀"
    },
    {
      title: "Accessible to All",
      description: "Our games should be understandable to newcomers but deep for experts",
      icon: "🌍"
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "Studio Foundation",
      description: "A team of enthusiasts united to create unique tabletop RPG experiences"
    },
    {
      year: "2023",
      title: "First Project",
      description: "Started development of Lost Mark and formed our creative vision"
    },
    {
      year: "2024",
      title: "Team Growth",
      description: "Expanded our team with talented artists, writers, and developers"
    },
    {
      year: "2025",
      title: "Lost Mark Release",
      description: "Successfully released our flagship cosmic horror adventure"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 border-b border-red-700">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-mono tracking-wider">
            ABOUT THE STUDIO
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono">
            We are a dedicated team of creators passionate about crafting immersive tabletop RPG experiences that challenge players and explore the darker corners of imagination.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 font-mono">
                OUR MISSION
              </h2>
              <p className="text-lg text-gray-300 mb-6 font-mono">
                We believe that tabletop RPGs are more than just entertainment - they are a medium for 
                storytelling, human connection, and exploring the depths of imagination.
              </p>
              <p className="text-lg text-gray-300 font-mono">
                Our goal is to create experiences that challenge conventional thinking, 
                explore complex themes, and provide players with unforgettable journeys into darkness and wonder.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🎭</div>
              <div className="text-white font-mono font-bold text-xl border-2 border-red-700 p-6 bg-red-950/20">
                &ldquo;EVERY STORY DESERVES TO BE TOLD&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-mono">
            OUR VALUES
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-gray-900 border border-red-700 p-6 text-center hover:bg-red-950/20 transition-colors"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 font-mono">
                  {value.title}
                </h3>
                <p className="text-gray-300 font-mono text-sm">
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
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-mono">
            THE TEAM
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="bg-black border border-red-700 p-6 text-center hover:border-red-500 transition-colors"
              >
                <div className="text-4xl mb-4">{member.avatar}</div>
                <h3 className="text-lg font-bold text-white mb-2 font-mono">
                  {member.name}
                </h3>
                <p className="text-red-400 mb-3 font-mono font-bold text-sm">
                  {member.role}
                </p>
                <p className="text-gray-300 text-xs font-mono">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-mono">
            OUR JOURNEY
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-6 border-l-2 border-red-700 pl-6 pb-8"
              >
                <div className="bg-red-700 text-white font-bold px-4 py-2 rounded font-mono">
                  {milestone.year}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 font-mono">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-300 font-mono">
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
          <h2 className="text-4xl font-bold text-white mb-6 font-mono">
            JOIN OUR JOURNEY
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-mono">
            Want to be part of our story? Whether you&apos;re a player, creator, or fellow developer, 
            we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-red-700 hover:bg-red-600 text-white px-8 py-4 text-lg font-mono font-bold transition-colors border border-red-600"
            >
              GET IN TOUCH
            </Link>
            <Link
              href="/projects"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-mono font-bold transition-colors"
            >
              VIEW PROJECTS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
