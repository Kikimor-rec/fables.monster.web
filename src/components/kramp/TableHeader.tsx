interface TableHeaderProps {
  title: string;
  dice: string;
  isExpanded: boolean;
  isRolling: boolean;
  onToggle: () => void;
  onRoll: () => void;
}

export default function TableHeader({
  title,
  dice,
  isExpanded,
  isRolling,
  onToggle,
  onRoll,
}: TableHeaderProps) {
  return (
    <div className="bg-green-900/50 border-b border-green-700 text-green-400 px-3 py-2 flex items-center justify-between">
      <h3 className="font-orbitron font-bold text-sm md:text-base tracking-wide">
        [{dice}] {title}
      </h3>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggle}
          className="px-2 py-1 text-xs font-mono bg-white/10 hover:bg-white/20 transition-colors"
        >
          {isExpanded ? "▼" : "▶"}
        </button>
        <button
          onClick={onRoll}
          disabled={isRolling}
          className={`px-3 py-1 font-orbitron font-bold text-xs transition-all ${
            isRolling
              ? "bg-yellow-500 text-black animate-pulse"
              : "bg-green-600 text-white hover:bg-green-500"
          }`}
        >
          {isRolling ? "..." : "🎲 ROLL"}
        </button>
      </div>
    </div>
  );
}
