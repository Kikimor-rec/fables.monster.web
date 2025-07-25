"use client";

import Link from "next/link";
import SocialLinks from "./SocialLinks";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-red-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex flex-col items-start gap-2 mb-4">
              <Image src="/logos/fm-logo-sqare.png" alt="Fables Monster Logo" width={120} height={120} className="w-[120px] max-w-full" />
            </div>
            <p className="text-gray-300 font-nunito">
              Independent tabletop RPG content creation studio
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-nunito">
              PROJECTS
            </h4>
            <ul className="space-y-2 text-gray-300 font-nunito">
              <li>
                <Link href="/lost-mark" className="hover:text-red-400 transition-colors">
                  The Lost Mark
                </Link>
              </li>
              <li>
                <Link href="/cemetery-of-broken-ships" className="hover:text-red-400 transition-colors">
                  Cemetery of Broken Ships
                </Link>
              </li>
              <li>
                <Link href="/hellish-bureaucracy" className="hover:text-red-400 transition-colors">
                  Hellish Bureaucracy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-nunito">
              LINKS
            </h4>
            <ul className="space-y-2 text-gray-300 font-nunito">
              <li>
                <Link href="/about" className="hover:text-red-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-red-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-nunito">
              FOLLOW US
            </h4>
            <SocialLinks showLabels={false} className="justify-start" />
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-red-700 text-center">
          <p className="text-gray-300 font-nunito">
            © 2025 Fables Monster Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
