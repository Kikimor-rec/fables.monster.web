import Link from 'next/link';
import type { SiteNavItem } from '@/lib/site-navigation';

type CaseFileLinkProps = {
  item: SiteNavItem;
  onClick?: () => void;
  compact?: boolean;
};

export default function CaseFileLink({ item, onClick, compact = false }: CaseFileLinkProps) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`group block border border-red-950/70 bg-zinc-950/60 px-4 transition-colors hover:border-red-500/70 hover:bg-red-950/20 focus:outline-none focus:ring-2 focus:ring-red-500 ${
        compact ? 'py-3' : 'py-4'
      }`}
    >
      <span className="block font-orbitron text-sm font-bold uppercase text-white group-hover:text-red-300">
        {item.label}
      </span>
      {item.description && (
        <span className="mt-1 block text-xs leading-snug text-zinc-400">{item.description}</span>
      )}
    </Link>
  );
}
