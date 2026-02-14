import Image from "next/image";
import EncryptedText from "@/components/EncryptedText";
import type { NeonHeroCopy, NeonStatusTag } from "@/components/old-world-neon/types";

interface NeonHeroSectionProps {
  imageSrc: string;
  tagline: string;
  description: string;
  contentHtml: string;
  statusTags: NeonStatusTag[];
  copy: NeonHeroCopy;
}

export default function NeonHeroSection({ imageSrc, tagline, description, contentHtml, statusTags, copy }: NeonHeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/10 to-fuchsia-950/10" />

      <div className="absolute inset-0 opacity-30">
        <Image src={imageSrc} alt="OLD WORLD NEON" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      </div>

      <div className="relative z-10 fm-shell max-w-5xl text-center">
        <div className="mb-8">
          <div className="text-cyan-400 font-mono text-sm mb-2 tracking-[0.5em]">{copy.classified}</div>
          <h1 className="fm-display-title font-bold text-white mb-4 font-orbitron tracking-wider relative">
            <span className="text-glow-cyan">{copy.oldWorld}</span>
            <br />
            <span className="text-glow-magenta glitch-text" data-text={copy.neon}>
              {copy.neon}
            </span>
          </h1>
          <div className="text-fuchsia-400 font-mono text-sm tracking-[0.5em]">{copy.system}</div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {statusTags.map((tag) => (
            <span key={tag.label} className={`px-4 py-2 border font-mono text-sm ${tag.classes}`}>
              {tag.label}
            </span>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mb-8 hud-border p-6 bg-black/80">
          <p className="text-cyan-300 font-mono text-sm sm:text-base leading-relaxed mb-4">
            {copy.accessLines.first}
            <br />
            {copy.accessLines.second}
            <br />
            {copy.accessLines.third}
          </p>
          <div className="text-gray-300 font-rajdhani text-base sm:text-lg">
            <EncryptedText text={tagline} />
          </div>
          <div className="mt-4 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>

        <div className="bg-fuchsia-900/20 border-2 border-fuchsia-500 p-6 max-w-2xl mx-auto">
          <div className="text-fuchsia-400 font-orbitron text-xl mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 4v4h2v-4h-2zm0 6v2h2v-2h-2z" />
            </svg>
            <span>{copy.restrictedTitle}</span>
          </div>
          <div className="text-gray-300 font-rajdhani">
            <EncryptedText text={description} />
          </div>
        </div>
      </div>
    </section>
  );
}
