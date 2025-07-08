interface StoreButtonProps {
  store: "itch" | "drivethrurpg" | "patreon";
  href: string;
  price?: string;
  className?: string;
}

export default function StoreButton({ store, href, price, className = "" }: StoreButtonProps) {
  const storeConfig = {
    itch: {
      name: "Itch.io",
      bgColor: "bg-red-600 hover:bg-red-500",
      emoji: "🎮"
    },
    drivethrurpg: {
      name: "DriveThruRPG",
      bgColor: "bg-blue-600 hover:bg-blue-500",
      emoji: "📚"
    },
    patreon: {
      name: "Patreon",
      bgColor: "bg-orange-600 hover:bg-orange-500",
      emoji: "🎨"
    }
  };

  const config = storeConfig[store];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 ${config.bgColor} text-white font-mono font-bold transition-colors border-2 border-transparent hover:border-white/20 text-sm sm:text-base ${className}`}
    >
      <span className="text-lg sm:text-xl">{config.emoji}</span>
      <span className="truncate">{config.name}</span>
      {price && (
        <span className="text-xs sm:text-sm whitespace-nowrap">({price})</span>
      )}
    </a>
  );
}
