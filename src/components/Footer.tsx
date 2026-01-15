"use client";

import Link from 'next/link';
import SocialLinks from "./SocialLinks";
import Image from "next/image";
import NewsletterForm from "./NewsletterForm";
import { FooterDict, NewsletterFooterDict } from '@/types/i18n';

interface FooterProps {
  lang: string;
  dict: FooterDict;
  newsletterDict?: NewsletterFooterDict;
}

export default function Footer({ lang, dict, newsletterDict }: FooterProps) {
  return (
    <footer className="bg-black py-12 border-t border-red-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex flex-col items-start gap-2 mb-4">
              <Image src="/logos/fm-logo-sqare.png" alt="Fables Monster Logo" width={120} height={120} className="w-[120px] max-w-full" />
            </div>
            <p className="text-gray-300 font-nunito">
              {dict?.tagline || "Independent tabletop RPG content creation studio"}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-nunito">
              {dict?.projects || "PROJECTS"}
            </h4>
            <ul className="space-y-2 text-gray-300 font-nunito">
              <li>
                <Link href={`/${lang}/lost-mark`} className="hover:text-red-400 transition-colors">
                  The Lost Mark
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/holiday-audit-kramp`} className="hover:text-red-400 transition-colors">
                  Holiday Audit: Kramp.exe
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/hellish-bureaucracy`} className="hover:text-red-400 transition-colors">
                  Hellish Bureaucracy
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/old-world-neon`} className="hover:text-red-400 transition-colors">
                  Old World Neon
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-nunito">
              {dict?.links || "LINKS"}
            </h4>
            <ul className="space-y-2 text-gray-300 font-nunito mb-6">
              <li>
                <Link href={`/${lang}/about`} className="hover:text-red-400 transition-colors">
                  {dict?.about || "About"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="hover:text-red-400 transition-colors">
                  {dict?.contact || "Contact"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/privacy`} className="hover:text-red-400 transition-colors">
                  {lang === 'ru' ? 'Конфиденциальность' : 'Privacy'}
                </Link>
              </li>
            </ul>
            <h4 className="text-lg font-bold text-white mb-4 font-nunito">
              {dict?.social || "SOCIAL"}
            </h4>
            <SocialLinks showLabels={false} className="justify-start" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-nunito">
              {newsletterDict?.title || (lang === 'ru' ? 'РАССЫЛКА' : 'NEWSLETTER')}
            </h4>
            <p className="text-gray-300 text-sm mb-4 font-nunito">
              {newsletterDict?.description || (lang === 'ru' ? 'Получайте новости о релизах' : 'Get updates on new releases')}
            </p>
            <NewsletterForm
              dict={{
                emailPlaceholder: newsletterDict?.subscribe || (lang === 'ru' ? 'ваш@email.com' : 'your@email.com'),
                submit: newsletterDict?.subscribe || (lang === 'ru' ? 'ПОДПИСАТЬСЯ' : 'SUBSCRIBE'),
                subscribing: '...',
                success: lang === 'ru' ? 'Успешно! Проверьте почту.' : 'Success! Check your email.',
              }}
              lang={lang}
              compact={true}
            />
            <div className="mt-4 text-xs font-nunito space-y-2">
              <Link href={`/${lang}/newsletter/subscribe`} className="text-gray-500 hover:text-red-400 transition-colors block">
                {lang === 'ru' ? '→ Полная форма подписки' : '→ Full subscription form'}
              </Link>
              <Link href={`/${lang}/newsletter/manage`} className="text-gray-500 hover:text-red-400 transition-colors block">
                {lang === 'ru' ? '→ Запросить письмо управления' : '→ Request management email'}
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 font-nunito">
          <p>{(dict?.copyright || "© {year} Fables Monster Studio. All rights reserved.").replace('{year}', new Date().getFullYear().toString())}</p>
        </div>
      </div>
    </footer>
  );
}
