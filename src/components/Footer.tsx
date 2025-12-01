"use client";

import Link from 'next/link';
import SocialLinks from "./SocialLinks";
import Image from "next/image";

interface FooterDict {
  tagline?: string;
  projects?: string;
  links?: string;
  social?: string;
  copyright?: string;
  about?: string;
  contact?: string;
}

interface FooterProps {
  lang: string;
  dict: FooterDict;
}

export default function Footer({ lang, dict }: FooterProps) {
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
                <Link href={`/${lang}/hellish-bureaucracy`} className="hover:text-red-400 transition-colors">
                  Hellish Bureaucracy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-nunito">
              {dict?.links || "LINKS"}
            </h4>
            <ul className="space-y-2 text-gray-300 font-nunito">
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
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-nunito">
              {dict?.social || "SOCIAL"}
            </h4>
            <SocialLinks showLabels={false} className="justify-start" />
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 font-nunito">
          <p>{(dict?.copyright || "© {year} Fables Monster Studio. All rights reserved.").replace('{year}', new Date().getFullYear().toString())}</p>
        </div>
      </div>
    </footer>
  );
}
