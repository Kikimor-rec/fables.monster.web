import Image from "next/image";

interface SocialLinksProps {
  className?: string;
  showLabels?: boolean;
}

export default function SocialLinks({ className = "", showLabels = true }: SocialLinksProps) {
  const links = [
    {
      href: "https://discord.gg/qJS4h5usxe",
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
      href: "https://www.drivethrurpg.com/en/publisher/30815/Stepan%20Kulikov",
      icon: "/logos/dtrpg-logo-small.png",
      label: "DriveThruRPG",
      description: "RPG collection"
    },
    {
      href: "mailto:info@fables.monster",
      icon: "📧",
      label: "Email",
      description: "Contact us"
    }
  ];

  return (
    <div className={`flex justify-center gap-6 ${className}`}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith('mailto:') ? undefined : "_blank"}
          rel={link.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
          className="text-gray-300 hover:text-red-400 transition-colors text-center"
        >
          <div className="mb-2 flex justify-center items-center" style={{ height: '48px' }}>
            {link.icon.startsWith('/') ? (
              <Image
                src={link.icon}
                alt={link.label}
                width={40}
                height={40}
                className="hover:opacity-80 transition-opacity filter brightness-0 invert"
              />
            ) : (
              <div className="text-3xl">{link.icon}</div>
            )}
          </div>
          {showLabels && (
            <div className="font-mono text-sm">{link.label}</div>
          )}
        </a>
      ))}
    </div>
  );
}
