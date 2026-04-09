import MagneticButton from "@/components/MagneticButton";

type Store = 'itch' | 'drivethrurpg' | 'patreon' | 'boosty' | 'vk' | 'roll20' | 'rpgbook';

interface StoreButtonProps {
  store: Store;
  href: string;
  price?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
}

const storeConfig: Record<Store, { label: string; color: string }> = {
  itch: {
    label: 'Itch.io',
    color: 'hover:bg-[#fa5c5c]',
  },
  drivethrurpg: {
    label: 'DriveThruRPG',
    color: 'hover:bg-[#e40000]',
  },
  roll20: {
    label: 'Roll20',
    color: 'hover:bg-[#ce0f0f]',
  },
  rpgbook: {
    label: 'RPGBook.ru',
    color: 'hover:bg-[#8b5cf6]',
  },
  patreon: {
    label: 'Patreon',
    color: 'hover:bg-[#FF424D]',
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
          <span className="uppercase">{label || config.label}</span>
          {price && (
            <span className="text-xs sm:text-sm whitespace-nowrap ml-1 opacity-80">({price})</span>
          )}
        </span>
      </div>
    );
  }

  return (
    <MagneticButton className={className}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          inline-flex items-center gap-2 px-4 py-2 w-full justify-center
          bg-gray-900 border border-gray-700 text-white
          font-orbitron text-sm font-bold tracking-wide
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black
          ${config.color} hover:border-transparent hover:scale-105
        `}
      >
        <span className="uppercase">{label || config.label}</span>
        {price && (
          <span className="text-xs sm:text-sm whitespace-nowrap ml-1 opacity-80">({price})</span>
        )}
      </a>
    </MagneticButton>
  );
}
