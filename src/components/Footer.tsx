"use client";

import Link from 'next/link';
import SocialLinks from "./SocialLinks";
import Image from "next/image";
import NewsletterForm from "./NewsletterForm";
import { FooterDict, NewsletterDict } from '@/types/i18n';

interface FooterProps {
  lang: string;
  dict: FooterDict;
  newsletterDict?: NewsletterDict;
}

export default function Footer({ lang, dict, newsletterDict }: FooterProps) {
  return (
    <footer role="contentinfo" className="bg-black py-12 border-t border-red-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link href={`/${lang}`} className="inline-block mb-4" aria-label={dict.homeAriaLabel || 'Fables Monster - Home'}>
              <Image src="/logos/fm-logo-sqare.png" alt="" width={120} height={120} className="w-[120px] max-w-full" aria-hidden="true" />
              <span className="sr-only">Fables Monster Studio</span>
            </Link>
            <p className="text-gray-300 font-nunito">
              {dict?.tagline || "Independent tabletop RPG content creation studio"}
            </p>
          </div>

          {/* Projects Navigation */}
          <nav aria-label={dict.projectsAriaLabel || 'Projects'}>
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
                <Link href={`/${lang}/expedition-418`} className="hover:text-red-400 transition-colors">
                  Expedition-418
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/old-world-neon`} className="hover:text-red-400 transition-colors">
                  Old World Neon
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/projects`} className="hover:text-red-400 transition-colors text-gray-400">
                  {dict.allProjects || 'All projects →'}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Links and Social */}
          <div>
            <nav aria-label={dict.linksAriaLabel || 'Links'}>
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
                    {dict.privacy || 'Privacy'}
                  </Link>
                </li>
              </ul>
            </nav>
            <div>
              <h4 className="text-lg font-bold text-white mb-4 font-nunito">
                {dict?.social || "SOCIAL"}
              </h4>
              <SocialLinks showLabels={false} className="justify-start" />
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-nunito">
              {newsletterDict?.footer.title || 'NEWSLETTER'}
            </h4>
            <p className="text-gray-300 text-sm mb-4 font-nunito">
              {newsletterDict?.footer.description || 'Get updates on new releases'}
            </p>
            <NewsletterForm
              dict={{
                emailPlaceholder: newsletterDict?.compact.emailPlaceholder || 'your@email.com',
                submit: newsletterDict?.compact.submit || newsletterDict?.footer.subscribe || 'SUBSCRIBE',
                subscribing: newsletterDict?.compact.subscribing || '...',
                success: newsletterDict?.compact.success || 'Success! Check your email to confirm.',
              }}
              lang={lang}
              compact={true}
            />
            <Link
              href={`/${lang}/newsletter/subscribe`}
              className="inline-block mt-3 text-sm text-gray-400 hover:text-red-400 transition-colors font-nunito"
            >
              {newsletterDict?.footer.learnMore || 'Learn more →'}
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 font-nunito">
          <p>{(dict?.copyright || "© {year} Fables Monster Studio. All rights reserved.").replace('{year}', new Date().getFullYear().toString())}</p>
        </div>
      </div>
    </footer>
  );
}
