import type { ExpeditionFeature } from "@/components/expedition-418/types";

interface ExpeditionFeaturesSectionProps {
  title: string;
  features: ExpeditionFeature[];
}

export default function ExpeditionFeaturesSection({ title, features }: ExpeditionFeaturesSectionProps) {
  return (
    <section id="features" className="py-20 border-t border-cyan-900/30 scroll-mt-36">
      <div className="fm-shell">
        <h2 className="text-4xl font-bold text-white mb-12 text-center font-orbitron glitch-text" data-text={title}>
          {title}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-gray-900 border border-cyan-800 p-6 hover:bg-cyan-950/20 hover:border-cyan-600 transition-colors group">
              <div className="flex items-start space-x-4">
                <div className="text-cyan-400 flex-shrink-0 group-hover:animate-pulse">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 font-orbitron group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                  <p className="text-gray-300 font-rajdhani">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
