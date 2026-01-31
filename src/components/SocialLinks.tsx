import Image from "next/image";

interface SocialLinksProps {
  className?: string;
  showLabels?: boolean;
}

export default function SocialLinks({ className = "", showLabels = true }: SocialLinksProps) {
  const links = [
    {
      href: "https://discord.gg/eAwK9DfKf4",
      icon: "/logos/Discord-Symbol-White.svg",
      label: "Discord",
      description: "Join our community"
    },
    {
      href: "https://fablesmonster.itch.io/",
      icon: "/itchio-logo-textless-white.svg",
      label: "Itch.io",
      description: "Get our games"
    },
    {
      href: "https://patreon.com/FablesMonster?fables.monster",
      icon: "/logos/PATREON_SYMBOL_1_WHITE_RGB.svg",
      label: "Patreon",
      description: "Support us"
    },
    {
      href: "https://www.drivethrurpg.com/en/publisher/30815/fables-monster?affiliate_id=2863466",
      icon: "/logos/dtrpg-logo-small.png",
      label: "DriveThruRPG",
      description: "RPG collection"
    },
        {
      href: "https://www.youtube.com/@fables.monster",
      icon: "/logos/yt_icon_mono_dark.png",
      label: "YouTube",
      description: "Watch our videos"
    },
    {
      href: "mailto:info@fables.monster",
      icon: "/logos/mail-512.png",
      label: "Email",
      description: "Contact us"
    }
  ];

  return (
    <div className={`flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 max-w-full ${className}`}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith('mailto:') ? undefined : "_blank"}
          rel={link.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
          className="text-gray-300 hover:text-red-400 transition-colors text-center flex-shrink-0 min-w-0 max-w-[80px] sm:max-w-[100px]"
        >
          <div className="mb-1 sm:mb-2 flex justify-center items-center h-8 sm:h-10 md:h-12">
            {link.icon.startsWith('/') ? (
              <Image
                src={link.icon}
                alt={link.label}
                width={0}
                height={0}
                sizes="100vw"
                className={`hover:opacity-80 transition-opacity h-6 sm:h-8 w-auto ${link.label !== 'YouTube' ? 'filter brightness-0 invert' : ''}`}
              />
            ) : (
              <div className="text-xl sm:text-2xl md:text-3xl">{link.icon}</div>
            )}
          </div>
          {showLabels && (
            <div className="font-nunito text-[10px] sm:text-xs leading-tight text-center break-words px-1">
              {link.label}
            </div>
          )}
        </a>
      ))}
    </div>
  );
}
