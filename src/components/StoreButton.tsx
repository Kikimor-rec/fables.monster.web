type Store = 'itch' | 'drivethrurpg' | 'patreon' | 'boosty' | 'vk' | 'roll20' | 'rpgbook';

interface StoreButtonProps {
  store: Store;
  href: string;
  price?: string;
  className?: string;
  label?: string;
}

const storeConfig: Record<Store, { label: string; icon: string; color: string }> = {
  itch: {
    label: 'Itch.io',
    icon: '/logos/itchio-textless-white.svg',
    color: 'hover:bg-[#fa5c5c]',
  },
  drivethrurpg: {
    label: 'DriveThruRPG',
    icon: '/logos/drivethrurpg-icon.png',
    color: 'hover:bg-[#e40000]',
  },
  roll20: {
    label: 'Roll20',
    icon: '/logos/roll20-icon.png',
    color: 'hover:bg-[#ce0f0f]',
  },
  rpgbook: {
    label: 'RPGBook.ru',
    icon: '/logos/rpgbook-icon.png',
    color: 'hover:bg-[#8b5cf6]',
  },
  patreon: {
    label: 'Patreon',
    icon: '/logos/patreon-symbol-white.png',
    color: 'hover:bg-[#FF424D]',
  },
  boosty: {
    label: 'Boosty',
    icon: '/logos/boosty-logo.svg',
    color: 'hover:bg-[#f48420]',
  },
  vk: {
    label: 'VK',
    icon: '/logos/vk-logo.svg',
    color: 'hover:bg-[#0077FF]',
  }
};

export default function StoreButton({ store, href, price, className = '', label }: StoreButtonProps) {
  const config = storeConfig[store];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-2 px-4 py-2 
        bg-gray-900 border border-gray-700 text-white 
        font-orbitron text-sm font-bold tracking-wide
        transition-all duration-300
        ${config.color} hover:border-transparent hover:scale-105
        ${className}
      `}
    >
      {/* We can use a generic icon or text if image is missing, but for now let's assume images exist or fallback */}
      <span className="uppercase">{label || config.label}</span>
      {price && (
        <span className="text-xs sm:text-sm whitespace-nowrap ml-1 opacity-80">({price})</span>
      )}
    </a>
  );
}
