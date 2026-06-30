"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { switchLanguagePath } from '@/lib/site-navigation';
import type { Language, NavDict } from '@/types/i18n';

type LanguageSwitchProps = {
  lang: string;
  dict?: Partial<NavDict>;
  className?: string;
  onNavigate?: () => void;
};

const languages: Language[] = ['en', 'ru'];

export default function LanguageSwitch({
  lang,
  dict,
  className = '',
  onNavigate,
}: LanguageSwitchProps) {
  const pathname = usePathname();

  return (
    <div
      className={`flex items-center gap-2 font-orbitron text-xs font-bold uppercase tracking-[0.14em] ${className}`}
      role="group"
      aria-label={dict?.languageSelection || 'Language selection'}
    >
      {languages.map((language, index) => (
        <span key={language} className="contents">
          {index > 0 && (
            <span className="text-zinc-700" aria-hidden="true">
              /
            </span>
          )}
          <Link
            href={switchLanguagePath(pathname, language)}
            className={`transition-colors ${
              lang === language ? 'text-red-300' : 'text-zinc-500 hover:text-white'
            }`}
            aria-label={language === 'en' ? 'English' : 'Русский'}
            aria-current={lang === language ? 'true' : undefined}
            hrefLang={language}
            onClick={onNavigate}
          >
            {language.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
