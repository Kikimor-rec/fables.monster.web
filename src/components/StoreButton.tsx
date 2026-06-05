import MagneticButton from "@/components/MagneticButton";
import Image from "next/image";

type Store =
  | 'itch'
  | 'drivethrurpg'
  | 'patreon'
  | 'boosty'
  | 'vk'
  | 'roll20'
  | 'rpgbook'
  | 'foundryMarketplace'
  | 'rpgTraderCreator';

interface StoreButtonProps {
  store: Store;
  href: string;
  price?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
}

const storeConfig: Record<
  Store,
  { label: string; color: string; badge?: string; badgeAlt?: string; badgeWidth?: number; badgeHeight?: number }
> = {
  itch: {
    label: 'Itch.io',
    color: 'hover:bg-[#fa5c5c]',
    badge: '/itch.io-badge.svg',
    badgeAlt: 'Available on itch.io',
    badgeWidth: 148,
    badgeHeight: 46,
  },
  drivethrurpg: {
    label: 'DriveThruRPG',
    color: 'hover:bg-[#e40000]',
    badge: '/logos/drivethrurpg-badge-color.png',
    badgeAlt: 'Available on DriveThruRPG',
    badgeWidth: 500,
    badgeHeight: 85,
  },
  roll20: {
    label: 'Roll20 Marketplace',
    color: 'hover:bg-[#ce0f0f]',
    badge: '/logos/roll20-26.png',
    badgeAlt: 'Available on Roll20.net',
    badgeWidth: 825,
    badgeHeight: 240,
  },
  rpgbook: {
    label: 'RPGBook.ru',
    color: 'hover:bg-[#8b5cf6]',
  },
  foundryMarketplace: {
    label: 'Foundry VTT Marketplace',
    color: 'hover:bg-[#b7791f]',
    badge: '/logos/foundry-vtt-marketplace-buy-now-bw.webp',
    badgeAlt: 'Buy now on Foundry VTT Marketplace',
    badgeWidth: 500,
    badgeHeight: 148,
  },
  rpgTraderCreator: {
    label: 'RPG Trader',
    color: 'hover:bg-[#2563eb]',
    badge: '/logos/rpg-trader-product-badge-available-from.png',
    badgeAlt: 'Available from RPG Trader',
    badgeWidth: 1000,
    badgeHeight: 500,
  },
  patreon: {
    label: 'Patreon',
    color: 'hover:bg-[#FF424D]',
    badge: '/logos/patreon-badge-color.png',
    badgeAlt: 'Available on Patreon',
    badgeWidth: 650,
    badgeHeight: 132,
  },
  boosty: {
    label: 'Boosty',
    color: 'hover:bg-[#f48420]',
  },
  vk: {
    label: 'VK',
    color: 'hover:bg-[#0077FF]',
  }
};

export default function StoreButton({ store, href, price, className = '', label, disabled }: StoreButtonProps) {
  const config = storeConfig[store];
  const displayLabel = label || config.label;
  const badgeClassName =
    store === 'foundryMarketplace' ? 'h-11 w-auto contrast-125 sepia saturate-[4] hue-rotate-[350deg]' :
    store === 'roll20' ? 'h-10 w-auto' :
    store === 'rpgTraderCreator' ? 'h-11 w-auto' :
    store === 'patreon' ? 'h-9 w-auto' :
    'h-8 w-auto';

  if (disabled) {
    return (
      <div className={className}>
        <span
          className={`
            inline-flex items-center gap-2 px-4 py-2 w-full justify-center
            bg-gray-900/50 border border-gray-700/50 text-gray-500
            font-orbitron text-sm font-bold tracking-wide
            cursor-not-allowed select-none
          `}
          aria-disabled="true"
        >
          <span className="uppercase">{displayLabel}</span>
          {price && (
            <span className="text-xs sm:text-sm whitespace-nowrap ml-1 opacity-80">({price})</span>
          )}
        </span>
      </div>
    );
  }

  return (
    <MagneticButton className={`w-full ${className}`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          inline-flex h-16 items-center gap-2 px-4 py-2 w-full justify-center
          bg-[#111827] border border-cyan-500/25 text-white
          font-orbitron text-sm font-bold tracking-wide
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black
          ${config.color} hover:border-cyan-300/60 hover:scale-[1.02]
        `}
        aria-label={price ? `${displayLabel} (${price})` : displayLabel}
      >
        {config.badge ? (
          <Image
            src={config.badge}
            alt={config.badgeAlt || displayLabel}
            width={config.badgeWidth || 148}
            height={config.badgeHeight || 46}
            className={badgeClassName}
            unoptimized
          />
        ) : (
          <span className="uppercase">{displayLabel}</span>
        )}
        {price && (
          <span className="text-xs sm:text-sm whitespace-nowrap ml-1 opacity-80">({price})</span>
        )}
      </a>
    </MagneticButton>
  );
}
