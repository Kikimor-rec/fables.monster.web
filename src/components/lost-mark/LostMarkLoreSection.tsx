import type { ReactNode } from "react";
import OptimizedImage from "@/components/OptimizedImage";
import type { LostMarkDictionary } from "@/components/lost-mark/types";

interface FeatureItem {
  title: string;
  description: string;
  icon: ReactNode;
}

interface LostMarkLoreSectionProps {
  dict: LostMarkDictionary;
  features: FeatureItem[];
}

export default function LostMarkLoreSection({ dict, features }: LostMarkLoreSectionProps) {
  return (
    <>
      <section id="about" className="py-10 sm:py-16 md:py-20 bg-gray-900 border-t border-red-700 scroll-mt-36">
        <div className="fm-shell">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 font-orbitron">
                {dict.sections?.about || "ABOUT THE ADVENTURE"}
              </h2>
              <p
                className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 font-orbitron"
                dangerouslySetInnerHTML={{
                  __html:
                    dict.about?.paragraph1 ||
                    "After making the final jump, the players' ship finds themselves in the proximity of a compact but active black hole. There are no jump cores left. All they observe is a very old hyper beacon, a cloud of debris, and the Ship of the Lost - a giant drifting structure assembled from dozens of other ships.",
                }}
              />
              <p
                className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 font-orbitron"
                dangerouslySetInnerHTML={{
                  __html:
                    dict.about?.paragraph2 ||
                    "On board lives and rots Mark Opollo, a pilot who was fused to the ship during a crash 217 years ago. His surviving companions have become a cult. His flesh is metal. His mind is a net.",
                }}
              />
              <p
                className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 font-orbitron"
                dangerouslySetInnerHTML={{
                  __html:
                    dict.about?.paragraph3 ||
                    "Deep within the ship lies a cryopod containing a child, the final element for Mark's Ascension. Mark plans to transfer his consciousness into the child or someone more convenient and finally leave this place. Players will have to choose whether to stop it or allow it to happen.",
                }}
              />

              <div className="bg-black border border-red-700 p-4 sm:p-6 mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-4 font-orbitron">
                  {dict.credits?.title || "CREDITS"}
                </h3>
                <div className="space-y-2 text-xs sm:text-sm font-orbitron">
                  <div className="flex justify-between">
                    <span className="text-gray-300">{dict.credits?.writtenBy || "Written by:"}</span>
                    <span className="text-white">Stepan Kulikov</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">{dict.credits?.layoutBy || "Layout by:"}</span>
                    <span className="text-white">Tatiana Bond</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">{dict.credits?.artBy || "Art by:"}</span>
                    <span className="text-white">Zlata Ignatova</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">{dict.credits?.musicBy || "Music by:"}</span>
                    <span className="text-white">Stanislav DariDai</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">{dict.credits?.codingBy || "Coding by:"}</span>
                    <span className="text-white">Allecks</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center w-full">
              <div className="bg-black border-2 border-red-700 shadow-lg mb-4 w-full aspect-[3/2] mx-auto overflow-hidden">
                <OptimizedImage
                  src="/images/lost-mark/ship_lm.webp"
                  alt="The Lost Mark spaceship drifting in deep space"
                  width={600}
                  height={400}
                  quality={85}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full max-w-full sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] bg-red-950/20 border-2 border-red-700 p-4 sm:p-6">
                <div className="text-white font-orbitron font-bold text-lg sm:text-xl mb-2 text-center flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 4v4h2v-4h-2zm0 6v2h2v-2h-2z" />
                  </svg>
                  <span>{dict.warning?.title || "WARNING"}</span>
                </div>
                <div className="text-gray-300 font-orbitron text-xs sm:text-sm text-center">
                  {dict.warning?.content ||
                    "This adventure contains sci-fi horror themes, body horror, and psychological stress. Player discretion advised."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 border-t border-red-700 scroll-mt-36">
        <div className="fm-shell">
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-orbitron">
            {dict.sections?.features || "KEY FEATURES"}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-gray-900 border border-red-700 p-6 hover:bg-red-950/20 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="text-red-400 flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 font-orbitron">{feature.title}</h3>
                    <p className="text-gray-300 font-orbitron">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
