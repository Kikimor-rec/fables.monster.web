import EncryptedText from "@/components/EncryptedText";
import type { NeonDict } from "@/components/old-world-neon/types";

interface NeonFeaturesSectionProps {
  dict: NeonDict;
}

export default function NeonFeaturesSection({ dict }: NeonFeaturesSectionProps) {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-black to-cyan-950/10 border-t border-fuchsia-700/30 relative z-10 scroll-mt-36">
      <div className="fm-shell">
        <h2 className="fm-section-title font-bold text-white mb-12 text-center font-orbitron">
          <span className="text-fuchsia-400">{dict.features.titlePrefix}</span> {dict.features.title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-black/60 border border-cyan-700 p-6 backdrop-blur-sm">
            <svg className="w-10 h-10 text-cyan-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 21h18M3 7v14M21 7v14M6 7V3h12v4M9 14h6M9 10h6" />
              <rect x="6" y="7" width="12" height="14" rx="1" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-3 font-orbitron">
              <EncryptedText text={dict.features.urbanSprawl.title} />
            </h3>
            <div className="text-gray-300 font-rajdhani">
              <EncryptedText text={dict.features.urbanSprawl.description} />
            </div>
          </div>

          <div className="bg-black/60 border border-fuchsia-700 p-6 backdrop-blur-sm">
            <svg className="w-10 h-10 text-fuchsia-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M9 9h6v6H9z" />
              <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-3 font-orbitron">
              <EncryptedText text={dict.features.digitalWarfare.title} />
            </h3>
            <div className="text-gray-300 font-rajdhani">
              <EncryptedText text={dict.features.digitalWarfare.description} />
            </div>
          </div>

          <div className="bg-black/60 border border-yellow-700 p-6 backdrop-blur-sm">
            <svg className="w-10 h-10 text-yellow-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-3 font-orbitron">
              <EncryptedText text={dict.features.highStakesHeists.title} />
            </h3>
            <div className="text-gray-300 font-rajdhani">
              <EncryptedText text={dict.features.highStakesHeists.description} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
