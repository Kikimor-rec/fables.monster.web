import type { Expedition418Dict } from "@/types/i18n";

interface ExpeditionAboutSectionProps {
  dict: Expedition418Dict;
}

export default function ExpeditionAboutSection({ dict }: ExpeditionAboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-gray-900 border-t border-cyan-900/30 scroll-mt-36">
      <div className="fm-shell max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-orbitron">{dict.about.aboutTitle}</h2>
        <p className="text-lg text-gray-300 mb-6 font-rajdhani">{dict.about.paragraph1}</p>
        <p className="text-lg text-gray-300 mb-6 font-rajdhani">{dict.about.paragraph2}</p>
        <p className="text-lg text-gray-300 mb-6 font-rajdhani">{dict.about.paragraph3}</p>
        <p className="text-lg text-gray-300 mb-6 font-rajdhani">{dict.about.paragraph4}</p>
        <p className="text-lg text-gray-300 mb-8 font-rajdhani">{dict.about.paragraph5}</p>
      </div>
    </section>
  );
}
