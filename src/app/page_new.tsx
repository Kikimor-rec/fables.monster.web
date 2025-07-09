"use client";

import Link from "next/link";
import CompactTeamMember from "@/components/CompactTeamMember";
import FadeIn from "@/components/FadeIn";
import OptimizedImage from "@/components/OptimizedImage";
import FinalEditable from "@/components/FinalEditable";
import { useContent } from "@/hooks/useContent";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export default function Home() {
  const { content, loading } = useContent('site-content.json');

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  
  const teamMembers: TeamMember[] = content?.team?.members || [
    {
      name: "Stepan Kulikov",
      role: "Writer & Game Designer",
      image: "stepan-kulikov.webp"
    },
    {
      name: "Tatiana Bond", 
      role: "Layout Designer",
      image: "tanka-bond.webp"
    },
    {
      name: "Zlata Ignatova",
      role: "Artist",
      image: "zlata.webp"
    },
    {
      name: "Stanislav DariDai",
      role: "Music Composer", 
      image: "stanislav-darida.webp"
    },
    {
      name: "Allecks",
      role: "Developer",
      image: "alleks.webp"
    }
  ];
  
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <FadeIn delay={0.2}>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-6 font-mono tracking-wider">
              <FinalEditable trigger="click" 
                value={content?.hero?.title || "FABLES MONSTER"}
                path="hero.title"
                tag="span"
                className="inline-block"
              />
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-mono">
              <FinalEditable trigger="click" 
                value={content?.hero?.subtitle || "Independent tabletop RPG content creation studio"}
                path="hero.subtitle"
                tag="span"
                multiline={true}
                className="inline-block"
              />
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/projects"
                className="w-full sm:w-auto bg-red-700 hover:bg-red-600 text-white px-6 sm:px-8 py-4 text-base sm:text-lg font-mono font-bold transition-colors border border-red-600 text-center"
              >
                <FinalEditable trigger="click" 
                  value={content?.common?.view_projects || "VIEW PROJECTS"}
                  path="common.view_projects"
                  tag="span"
                  className="inline-block"
                />
              </Link>
              <Link
                href="/lost-mark"
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-6 sm:px-8 py-4 text-base sm:text-lg font-mono font-bold transition-colors text-center"
              >
                <FinalEditable trigger="click" 
                  value={content?.common?.lost_mark_button || "LOST MARK"}
                  path="common.lost_mark_button"
                  tag="span"
                  className="inline-block"
                />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <FadeIn>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-mono">
                  <FinalEditable trigger="click" 
                    value={content?.about?.title || "ABOUT THE STUDIO"}
                    path="about.title"
                    tag="span"
                    className="inline-block"
                  />
                </h2>
                <p className="text-base sm:text-lg text-gray-300 mb-6 font-mono">
                  <FinalEditable trigger="click" 
                    value={content?.about?.description1 || "We are a team of enthusiasts dedicated to creating immersive tabletop RPG adventures and digital experiences. Our mission is to craft projects that leave a lasting impact on players."}
                    path="about.description1"
                    tag="span"
                    multiline={true}
                    className="inline-block"
                  />
                </p>
                <p className="text-base sm:text-lg text-gray-300 mb-8 font-mono">
                  <FinalEditable trigger="click" 
                    value={content?.about?.description2 || "From Sci-Fi horror to fantasy adventures, we explore various forms of interactive entertainment, creating unique experiences for every player."}
                    path="about.description2"
                    tag="span"
                    multiline={true}
                    className="inline-block"
                  />
                </p>
                <Link
                  href="/about"
                  className="inline-block bg-red-700 hover:bg-red-600 text-white px-4 sm:px-6 py-3 font-mono font-bold transition-colors border border-red-600 text-sm sm:text-base"
                >
                  <FinalEditable trigger="click" 
                    value={content?.common?.learn_more || "MORE ABOUT US"}
                    path="common.learn_more"
                    tag="span"
                    className="inline-block"
                  />
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <div className="bg-gradient-to-br from-red-800 to-red-900 p-6 sm:p-8 border border-red-700">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-4 font-mono">⚡</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 font-mono">
                    <FinalEditable trigger="click" 
                      value={content?.about?.philosophy_title || "OUR PHILOSOPHY"}
                      path="about.philosophy_title"
                      tag="span"
                      className="inline-block"
                    />
                  </h3>
                  <p className="text-red-100 font-mono text-sm sm:text-base">
                    <FinalEditable trigger="click" 
                      value={content?.about?.philosophy || "Every game is a story, every story is a world, every world is an opportunity for players to become heroes of their own adventure."}
                      path="about.philosophy"
                      tag="span"
                      multiline={true}
                      className="inline-block"
                    />
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-12 sm:py-20 bg-black border-t border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-mono">
                <FinalEditable trigger="click" 
                  value={content?.projects?.featured_title || "FIRST PROJECT"}
                  path="projects.featured_title"
                  tag="span"
                  className="inline-block"
                />
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 font-mono">
                <FinalEditable trigger="click" 
                  value={content?.projects?.featured_subtitle || "Our pride and most ambitious project"}
                  path="projects.featured_subtitle"
                  tag="span"
                  className="inline-block"
                />
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="bg-gray-900 border border-red-700 p-4 sm:p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-mono">
                    <FinalEditable trigger="click" 
                      value={content?.lost_mark?.title || "THE LOST MARK"}
                      path="lost_mark.title"
                      tag="span"
                      className="inline-block"
                    />
                  </h3>
                  <p className="text-base sm:text-lg text-gray-300 mb-6 font-mono">
                    <FinalEditable trigger="click" 
                      value={content?.lost_mark?.description || "A Sci-Fi horror adventure for Mothership RPG where your crew faces impossible choices and eldritch truths among the wrecks and cults of deep space."}
                      path="lost_mark.description"
                      tag="span"
                      multiline={true}
                      className="inline-block"
                    />
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-red-700 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-mono border border-red-600">
                      <FinalEditable trigger="click" 
                        value={content?.tags?.mothership || "MOTHERSHIP"}
                        path="tags.mothership"
                        tag="span"
                        className="inline-block"
                      />
                    </span>
                    <span className="bg-red-700 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-mono border border-red-600">
                      <FinalEditable trigger="click" 
                        value={content?.tags?.sci_fi_horror || "SCI-FI HORROR"}
                        path="tags.sci_fi_horror"
                        tag="span"
                        className="inline-block"
                      />
                    </span>
                    <span className="bg-red-700 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-mono border border-red-600">
                      <FinalEditable trigger="click" 
                        value={content?.tags?.investigation || "INVESTIGATION"}
                        path="tags.investigation"
                        tag="span"
                        className="inline-block"
                      />
                    </span>
                  </div>
                  <Link
                    href="/lost-mark"
                    className="inline-block bg-red-700 hover:bg-red-600 text-white px-6 sm:px-8 py-3 font-mono font-bold transition-colors border border-red-600 text-sm sm:text-base"
                  >
                    <FinalEditable trigger="click" 
                      value={content?.common?.learn_more_project || "LEARN MORE"}
                      path="common.learn_more_project"
                      tag="span"
                      className="inline-block"
                    />
                  </Link>
                </div>
                <div className="relative h-48 sm:h-64 md:h-80 bg-gray-800 border border-red-700 overflow-hidden">
                  <OptimizedImage
                    src="/images/lost-mark/lm_promo_1.webp"
                    alt="Lost Mark"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="opacity-80"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white font-mono font-bold text-sm sm:text-base">
                    <FinalEditable trigger="click" 
                      value={content?.image_labels?.lost_mark_promo || "THE LOST MARK"}
                      path="image_labels.lost_mark_promo"
                      tag="span"
                      className="inline-block"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-20 bg-gray-900 border-t border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 text-center font-mono">
              <FinalEditable trigger="click" 
                value={content?.team?.title || "THE TEAM"}
                path="team.title"
                tag="span"
                className="inline-block"
              />
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 max-w-5xl mx-auto">
              {teamMembers.map((member: TeamMember, index: number) => (
                <CompactTeamMember key={index} member={member} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-20 bg-red-900 border-t border-red-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-mono">
              <FinalEditable trigger="click" 
                value={content?.common?.ready_to_explore || "READY TO EXPLORE OUR WORLDS?"}
                path="common.ready_to_explore"
                tag="span"
                className="inline-block"
              />
            </h2>
            <p className="text-lg sm:text-xl text-red-100 mb-8 font-mono">
              <FinalEditable trigger="click" 
                value={content?.common?.follow_projects || "Follow our projects and become part of the Fables Monster community"}
                path="common.follow_projects"
                tag="span"
                multiline={true}
                className="inline-block"
              />
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/projects"
                className="w-full sm:w-auto bg-white text-red-900 px-6 sm:px-8 py-4 text-base sm:text-lg font-mono font-bold hover:bg-gray-200 transition-colors text-center"
              >
                <FinalEditable trigger="click" 
                  value={content?.common?.all_projects || "ALL PROJECTS"}
                  path="common.all_projects"
                  tag="span"
                  className="inline-block"
                />
              </Link>
              <a
                href="https://discord.gg/qJS4h5usxe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-900 px-6 sm:px-8 py-4 text-base sm:text-lg font-mono font-bold transition-colors text-center"
              >
                <FinalEditable trigger="click" 
                  value={content?.common?.join_discord || "JOIN DISCORD"}
                  path="common.join_discord"
                  tag="span"
                  className="inline-block"
                />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
