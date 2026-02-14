import type { Expedition418Dict } from "@/types/i18n";

interface ExpeditionDispatcherSectionProps {
  dict: Expedition418Dict;
}

export default function ExpeditionDispatcherSection({ dict }: ExpeditionDispatcherSectionProps) {
  return (
    <section id="dispatcher" className="py-14 border-t border-cyan-900/30 bg-black/70 scroll-mt-36">
      <div className="fm-shell max-w-4xl">
        <blockquote className="fm-panel border-cyan-900/70 bg-cyan-950/20 text-cyan-100">
          <p className="text-lg font-rajdhani leading-relaxed">"{dict.dispatcher.quote}"</p>
          <footer className="mt-4 text-sm font-orbitron tracking-[0.14em] text-cyan-300">- {dict.dispatcher.author}</footer>
        </blockquote>
      </div>
    </section>
  );
}
