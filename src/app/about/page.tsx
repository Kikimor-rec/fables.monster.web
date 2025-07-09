"use client";

import Link from "next/link";
import TeamMember from "@/components/TeamMember";
import FinalEditable from "@/components/FinalEditable";
import { useContent } from "@/hooks/useContent";

export default function About() {
  const { content, loading } = useContent('site-content.json');

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">{content?.common?.loading || "Loading..."}</div>
      </div>
    );
  }
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
      image: "stanislav-darida.webp"
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
      year: "2025",
      title: "Studio Foundation",
      description: "A team of enthusiasts united to create unique tabletop RPG experiences"
    },
    {
      year: "2025",
      title: "First Project",
      description: "Started development of Lost Mark and formed our creative vision"
    },
    {
      year: "2025",
      title: "Team Growth",
      description: "Expanded our team with talented artists, writers, and developers"
    },
    {
      year: "2025",
      title: "Lost Mark Release",
      description: "Successfully released our First Sci-Fi horror scenario"
    }
  ];

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="pt-32 pb-20 border-b border-red-700">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-mono tracking-wider">
            <FinalEditable trigger="click" 
              value={content?.about?.title || "ABOUT THE STUDIO"}
              path="about.title"
              tag="span"
              className="inline-block"
            />
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono">
            <FinalEditable trigger="click" 
              value={content?.about?.description || "We believe that the Warden, Dungeon Master, or Host (whatever you call them) should have the tools to run games and the ability to quickly start everything they need. And we want to make not just adventures, but ready-made tools that can reduce the time it takes to prepare for a game."}
              path="about.description"
              tag="span"
              multiline={true}
              className="inline-block"
            />
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 font-mono">
                <FinalEditable trigger="click" 
                  value={content?.about?.mission?.title || "OUR MISSION"}
                  path="about.mission.title"
                  tag="span"
                  className="inline-block"
                />
              </h2>
              <p className="text-lg text-gray-300 mb-6 font-mono">
                <FinalEditable trigger="click" 
                  value={content?.about?.mission?.description || "We believe that tabletop RPGs are more than just entertainment - they are a medium for storytelling, human connection, and exploring the depths of imagination."}
                  path="about.mission.description"
                  tag="span"
                  multiline={true}
                  className="inline-block"
                />
              </p>
              <p className="text-lg text-gray-300 font-mono">
                <FinalEditable trigger="click" 
                  value={content?.about?.mission?.goal || "Our goal is to create experiences that challenge conventional thinking, explore complex themes, and provide players with unforgettable journeys into darkness and wonder."}
                  path="about.mission.goal"
                  tag="span"
                  multiline={true}
                  className="inline-block"
                />
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🎭</div>
              <div className="text-white font-mono font-bold text-xl border-2 border-red-700 p-6 bg-red-950/20">
                <FinalEditable trigger="click" 
                  value={content?.about?.motto || "&ldquo;EVERY STORY DESERVES TO BE TOLD&rdquo;"}
                  path="about.motto"
                  tag="span"
                  className="inline-block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-mono">
            <FinalEditable trigger="click" 
              value={content?.about?.values_title || "OUR VALUES"}
              path="about.values_title"
              tag="span"
              className="inline-block"
            />
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-gray-900 border border-red-700 p-6 text-center hover:bg-red-950/20 transition-colors"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 font-mono">
                  <FinalEditable trigger="click" 
                    value={content?.about?.values?.[index]?.title || value.title}
                    path={`about.values.${index}.title`}
                    tag="span"
                    className="inline-block"
                  />
                </h3>
                <p className="text-gray-300 font-mono text-sm">
                  <FinalEditable trigger="click" 
                    value={content?.about?.values?.[index]?.description || value.description}
                    path={`about.values.${index}.description`}
                    tag="span"
                    multiline={true}
                    className="inline-block"
                  />
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
            <FinalEditable trigger="click" 
              value={content?.team?.title || "THE TEAM"}
              path="team.title"
              tag="span"
              className="inline-block"
            />
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
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-mono">
            <FinalEditable trigger="click" 
              value={content?.about?.journey_title || "OUR JOURNEY"}
              path="about.journey_title"
              tag="span"
              className="inline-block"
            />
          </h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-6 border-l-2 border-red-700 pl-6 pb-8"
              >
                <div className="bg-red-700 text-white font-bold px-4 py-2 rounded font-mono">
                  <FinalEditable trigger="click" 
                    value={content?.about?.milestones?.[index]?.year || milestone.year}
                    path={`about.milestones.${index}.year`}
                    tag="span"
                    className="inline-block"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 font-mono">
                    <FinalEditable trigger="click" 
                      value={content?.about?.milestones?.[index]?.title || milestone.title}
                      path={`about.milestones.${index}.title`}
                      tag="span"
                      className="inline-block"
                    />
                  </h3>
                  <p className="text-gray-300 font-mono">
                    <FinalEditable trigger="click" 
                      value={content?.about?.milestones?.[index]?.description || milestone.description}
                      path={`about.milestones.${index}.description`}
                      tag="span"
                      multiline={true}
                      className="inline-block"
                    />
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
            <FinalEditable trigger="click" 
              value={content?.about?.cta_title || "JOIN OUR JOURNEY"}
              path="about.cta_title"
              tag="span"
              className="inline-block"
            />
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-mono">
            <FinalEditable trigger="click" 
              value={content?.about?.cta_description || "Want to be part of our story? Whether you're a player, creator, or fellow developer, we'd love to hear from you."}
              path="about.cta_description"
              tag="span"
              multiline={true}
              className="inline-block"
            />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-red-700 hover:bg-red-600 text-white px-8 py-4 text-lg font-mono font-bold transition-colors border border-red-600"
            >
              <FinalEditable trigger="click" 
                value={content?.common?.get_in_touch || "GET IN TOUCH"}
                path="common.get_in_touch"
                tag="span"
                className="inline-block"
              />
            </Link>
            <Link
              href="/projects"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-mono font-bold transition-colors"
            >
              <FinalEditable trigger="click" 
                value={content?.common?.view_projects || "VIEW PROJECTS"}
                path="common.view_projects"
                tag="span"
                className="inline-block"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
