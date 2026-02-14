import EncryptedText from "@/components/EncryptedText";
import NoSignalPlaceholder from "@/components/NoSignalPlaceholder";
import type { NeonDict } from "@/components/old-world-neon/types";

interface NeonTeaserSectionProps {
  dict: NeonDict;
}

export default function NeonTeaserSection({ dict }: NeonTeaserSectionProps) {
  return (
    <section id="teaser" className="py-20 bg-black/90 border-t border-cyan-700/30 relative z-10 scroll-mt-36">
      <div className="fm-shell">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="fm-section-title font-bold text-white mb-6 font-orbitron">
              <span className="text-cyan-400">
                <EncryptedText text={dict.teaser.titleLead} />
              </span>{" "}
              <EncryptedText text={dict.teaser.titleTail} />
            </h2>
            <div className="text-lg text-gray-300 mb-6 font-rajdhani">
              <EncryptedText text={dict.teaser.paragraph1} />
            </div>
            <div className="text-lg text-gray-300 mb-6 font-rajdhani">
              <EncryptedText text={dict.teaser.paragraph2} />
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-black border border-cyan-700 text-cyan-400 font-mono text-sm">
                <EncryptedText text={dict.teaser.tags.corporateEspionage} />
              </div>
              <div className="px-4 py-2 bg-black border border-fuchsia-700 text-fuchsia-400 font-mono text-sm">
                <EncryptedText text={dict.teaser.tags.digitalShadows} />
              </div>
              <div className="px-4 py-2 bg-black border border-yellow-700 text-yellow-400 font-mono text-sm">
                <EncryptedText text={dict.teaser.tags.neonDarkness} />
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square relative border-2 border-cyan-500 shadow-[0_0_30px_rgba(0,255,255,0.3)] overflow-hidden">
              <NoSignalPlaceholder className="w-full h-full" text={dict.teaser.signalText} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-20" />
              <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-20">
                <div className="text-cyan-400 font-mono text-xs tracking-widest">{dict.teaser.locationLabel}</div>
                <div className="text-white font-orbitron">{dict.teaser.locationValue}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
