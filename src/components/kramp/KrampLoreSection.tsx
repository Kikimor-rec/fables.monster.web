import Image from "next/image";
import type { KrampDictionary, KrampFeature } from "@/components/kramp/types";

interface KrampLoreSectionProps {
  contentTitle: string;
  dict: KrampDictionary;
  features: KrampFeature[];
}

export default function KrampLoreSection({ contentTitle, dict, features }: KrampLoreSectionProps) {
  return (
    <section id="about" className="py-20 relative z-10 bg-gray-950 scroll-mt-36">
      <div className="fm-shell max-w-6xl">
        <div className="bg-gray-900/50 border border-red-700/50 p-8 mb-12 hud-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <svg className="w-12 h-12 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 4v4h2v-4h-2zm0 6v2h2v-2h-2z" />
            </svg>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-6 font-orbitron text-glow">
                {dict.sections?.description || contentTitle || "St.N KRAMP - Holiday Audit in Deep Space"}
              </h2>
              <div className="text-lg text-gray-300 font-rajdhani leading-relaxed space-y-4">
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      dict.about?.paragraph1 ||
                      "It's a story about control, hypocrisy, punishment, and bad gifts. It shifts between humor and horror, absurdity and paranoia.",
                  }}
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      dict.about?.paragraph2 ||
                      "The station's AI, St. N-KRAMP, has been rebranded for the holidays and is assessing the crew's moral climate.",
                  }}
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      dict.about?.paragraph3 ||
                      "Chain-rattling alerts, sealed bulkheads, and festive dread tighten with each passing minute.",
                  }}
                />
              </div>
            </div>
            <div className="relative w-48 h-48 flex-shrink-0 hidden md:block">
              <Image
                src="/images/kramp/big kramp.webp"
                alt="St.N KRAMP"
                fill
                className="object-contain filter invert drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]"
              />
            </div>
          </div>
        </div>

        <div id="features" className="grid md:grid-cols-2 gap-8 mb-12 scroll-mt-36">
          {features.map((feature) => (
            <div key={feature.name} className="bg-gray-900/30 border border-green-700/30 p-6 hud-border hover:bg-green-900/10 transition-colors group">
              <div className="text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-xl font-bold text-green-400 mb-3 font-orbitron group-hover:text-glow-cyan">{feature.name}</h3>
              <p className="text-gray-300 font-rajdhani">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
