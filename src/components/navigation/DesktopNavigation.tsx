"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { SiteNavItem } from '@/lib/site-navigation';

type DesktopNavigationProps = {
  items: SiteNavItem[];
  lang: string;
};

export default function DesktopNavigation({ items, lang }: DesktopNavigationProps) {
  const pathname = usePathname();
  const root = `/${lang}`;

  const isActive = (item: SiteNavItem) => {
    if (!pathname) {
      return false;
    }

    if (item.exact || item.href === root) {
      return pathname === item.href;
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <ul className="flex items-center gap-1 list-none p-0 m-0">
      {items.map((item) => {
        const active = isActive(item);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`nav-link px-3 py-2 font-orbitron text-xs font-bold uppercase tracking-[0.14em] transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
                active ? 'nav-link-active text-red-300' : 'text-zinc-100 hover:text-red-300'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
