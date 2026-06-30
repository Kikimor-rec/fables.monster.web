import Image from 'next/image';
import { getSocialLinks } from '@/lib/site-navigation';

interface SocialLinksProps {
  className?: string;
  showLabels?: boolean;
}

export default function SocialLinks({ className = '', showLabels = true }: SocialLinksProps) {
  const links = getSocialLinks();

  return (
    <div className={`flex max-w-full flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 ${className}`}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith('mailto:') ? undefined : '_blank'}
          rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          className="min-w-0 max-w-[80px] flex-shrink-0 text-center text-zinc-300 transition-colors hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 sm:max-w-[100px]"
        >
          <div className="mb-1 flex h-8 items-center justify-center sm:mb-2 sm:h-10 md:h-12">
            <Image
              src={link.icon}
              alt={link.label}
              width={0}
              height={0}
              sizes="100vw"
              className={`h-6 w-auto transition-opacity hover:opacity-80 sm:h-8 ${
                link.label !== 'YouTube' ? 'filter brightness-0 invert' : ''
              }`}
            />
          </div>
          {showLabels && (
            <div className="break-words px-1 text-center font-nunito text-[10px] leading-tight sm:text-xs">
              {link.label}
            </div>
          )}
        </a>
      ))}
    </div>
  );
}
