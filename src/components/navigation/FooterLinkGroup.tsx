import Link from 'next/link';
import type { SiteNavItem } from '@/lib/site-navigation';

type FooterLinkGroupProps = {
  title: string;
  ariaLabel: string;
  links: SiteNavItem[];
};

export default function FooterLinkGroup({ title, ariaLabel, links }: FooterLinkGroupProps) {
  return (
    <nav aria-label={ariaLabel}>
      <h3 className="mb-4 font-orbitron text-sm font-bold uppercase tracking-[0.16em] text-white">
        {title}
      </h3>
      <ul className="space-y-2 font-nunito text-sm text-zinc-300">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex items-center gap-2 transition-colors hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <span className="h-px w-3 bg-red-800/80" aria-hidden="true" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
