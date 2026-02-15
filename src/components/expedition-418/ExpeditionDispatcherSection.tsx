import type { Expedition418Dict } from "@/types/i18n";

interface ExpeditionDispatcherSectionProps {
  dict: Expedition418Dict;
}

export default function ExpeditionDispatcherSection({ dict }: ExpeditionDispatcherSectionProps) {
  return (
    <section id="dispatcher" className="scroll-mt-36 border-t border-[#ff683d]/40 bg-[#02071d] py-16">
      <div className="fm-shell max-w-6xl">
        <blockquote className="border border-[#bcd6bb]/60 bg-[#0d142b] px-6 py-8 shadow-[8px_8px_0_0_rgba(247,136,64,0.45)] md:px-8">
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#ff9a73] [font-family:var(--font-exp-ui)]">Incoming transmission</p>
          <p className="text-xl leading-relaxed text-[#d2e2d1] md:text-2xl [font-family:var(--font-exp-body)]">"{dict.dispatcher.quote}"</p>
          <footer className="mt-5 border-t border-[#2f3f58] pt-4 text-xs uppercase tracking-[0.18em] text-[#f78840] [font-family:var(--font-exp-ui)]">- {dict.dispatcher.author}</footer>
        </blockquote>
      </div>
    </section>
  );
}
