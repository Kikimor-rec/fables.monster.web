type VttPlaceholderVariant = "hero" | "systems" | "content" | "support";

interface VttPlaceholderVisualProps {
  variant?: VttPlaceholderVariant;
  className?: string;
}

const variantLabels: Record<VttPlaceholderVariant, string[]> = {
  hero: ["SCENE", "JOURNAL", "TOKENS", "HANDOUTS"],
  systems: ["SHEET", "ROLLS", "ITEMS", "DATA"],
  content: ["MAP", "NPC", "TABLES", "NOTES"],
  support: ["QA", "PATCH", "VERSION", "RELEASE"],
};

export default function VttPlaceholderVisual({ variant = "hero", className = "" }: VttPlaceholderVisualProps) {
  const labels = variantLabels[variant];
  const isHero = variant === "hero";

  return (
    <div
      className={`relative overflow-hidden border border-cyan-700/35 bg-black ${isHero ? "min-h-[340px] sm:min-h-[430px]" : "aspect-[4/3]"} ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(185,28,28,0.18),transparent_35%),linear-gradient(180deg,rgba(8,47,73,0.35),rgba(0,0,0,0.85))]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(34,211,238,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.14)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="absolute inset-4 sm:inset-6 grid grid-cols-[1fr_0.72fr] grid-rows-[0.7fr_1fr] gap-3">
        <div className="relative row-span-2 border border-red-500/35 bg-zinc-950/80 p-3 shadow-[0_0_30px_rgba(185,28,28,0.13)]">
          <div className="absolute inset-3 bg-[radial-gradient(circle_at_35%_35%,rgba(34,211,238,0.22),transparent_28%),linear-gradient(135deg,rgba(127,29,29,0.55),transparent_60%)]" />
          <div className="absolute left-5 top-5 right-5 h-8 border border-cyan-400/30 bg-black/55" />
          <div className="absolute left-5 right-5 bottom-5 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((item) => (
              <span key={item} className="h-10 border border-zinc-600/70 bg-black/65" />
            ))}
          </div>
        </div>

        <div className="border border-zinc-700 bg-zinc-950/80 p-3">
          <div className="mb-3 h-2 w-20 bg-cyan-400/60" />
          <div className="space-y-2">
            {[0, 1, 2, 3].map((item) => (
              <span key={item} className="block h-3 bg-zinc-700/70" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {labels.map((label, index) => (
            <div key={label} className="border border-zinc-700 bg-zinc-950/80 p-3">
              <div className={`mb-3 h-7 w-7 border ${index % 2 === 0 ? "border-red-400/60" : "border-cyan-400/60"}`} />
              <div className="font-orbitron text-[10px] tracking-[0.18em] text-zinc-300">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
