import Link from 'next/link';
import type { SiteNavItem } from '@/lib/site-navigation';

type HeaderCtaProps = {
  item: SiteNavItem;
  className?: string;
  onClick?: () => void;
};

export default function HeaderCta({ item, className = '', onClick }: HeaderCtaProps) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`inline-flex items-center justify-center border border-red-500/70 bg-red-950/35 px-4 py-2 font-orbitron text-xs font-bold uppercase tracking-[0.16em] text-red-100 transition-colors hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
    >
      {item.label}
    </Link>
  );
}
