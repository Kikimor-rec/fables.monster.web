import Image from "next/image";
import type { KrampDictionary } from "@/components/kramp/types";

interface KrampPostcardSectionProps {
  dict: KrampDictionary;
}

export default function KrampPostcardSection({ dict }: KrampPostcardSectionProps) {
  return (
    <section id="postcard" className="py-20 relative z-10 bg-gradient-to-b from-black via-red-950/10 to-black scroll-mt-36">
      <div className="fm-shell max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-orbitron text-glow">
            {dict.sections?.postcard || "POSTCARD FORMAT"}
          </h2>
          <p className="text-gray-400 font-rajdhani text-lg">
            {dict.postcard?.description || "Unfold the horror. Perfect for stockings or last-minute gifts."}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 animate-pulse" />
          <div className="relative bg-gray-900/50 border-2 border-red-700/50 p-4 md:p-8 hud-border">
            <Image
              src="/images/kramp/promo.webp"
              alt="KRAMP.EXE postcard format preview"
              width={1200}
              height={800}
              className="w-full h-auto border border-red-500/30 shadow-2xl shadow-red-900/50"
              priority
            />
            <div className="mt-4 text-center text-sm text-gray-500 font-mono">
              {dict.postcard?.unfold || "// UNFOLD_AT_TABLE.EXE"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
