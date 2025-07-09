"use client";

import Link from "next/link";
import SocialLinks from "./SocialLinks";
import FinalEditable from "./FinalEditable";
import { useContent } from "@/hooks/useContent";

export default function Footer() {
  const { content } = useContent('site-content.json');

  return (
    <footer className="bg-black py-12 border-t border-red-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4 font-mono">
              <FinalEditable trigger="click" 
                value={content?.footer?.studio_name || "FABLES MONSTER"}
                path="footer.studio_name"
                tag="span"
                className="inline-block"
              />
            </h3>
            <p className="text-gray-300 font-mono">
              <FinalEditable trigger="click" 
                value={content?.footer?.studio_description || "Independent tabletop RPG content creation studio"}
                path="footer.studio_description"
                tag="span"
                multiline={true}
                className="inline-block"
              />
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-mono">
              <FinalEditable trigger="click" 
                value={content?.footer?.projects_title || "PROJECTS"}
                path="footer.projects_title"
                tag="span"
                className="inline-block"
              />
            </h4>
            <ul className="space-y-2 text-gray-300 font-mono">
              <li>
                <Link href="/lost-mark" className="hover:text-red-400 transition-colors">
                  <FinalEditable trigger="click" 
                    value={content?.lost_mark?.title || "The Lost Mark"}
                    path="lost_mark.title"
                    tag="span"
                    className="inline-block"
                  />
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
            <h4 className="text-lg font-bold text-white mb-4 font-mono">
              <FinalEditable trigger="click" 
                value={content?.footer?.links_title || "LINKS"}
                path="footer.links_title"
                tag="span"
                className="inline-block"
              />
            </h4>
            <ul className="space-y-2 text-gray-300 font-mono">
              <li>
                <Link href="/about" className="hover:text-red-400 transition-colors">
                  <FinalEditable trigger="click" 
                    value={content?.navigation?.about || "About"}
                    path="navigation.about"
                    tag="span"
                    className="inline-block"
                  />
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-red-400 transition-colors">
                  <FinalEditable trigger="click" 
                    value={content?.navigation?.projects || "Projects"}
                    path="navigation.projects"
                    tag="span"
                    className="inline-block"
                  />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-400 transition-colors">
                  <FinalEditable trigger="click" 
                    value={content?.navigation?.contact || "Contact"}
                    path="navigation.contact"
                    tag="span"
                    className="inline-block"
                  />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-mono">
              <FinalEditable trigger="click" 
                value={content?.footer?.follow_us_title || "FOLLOW US"}
                path="footer.follow_us_title"
                tag="span"
                className="inline-block"
              />
            </h4>
            <SocialLinks showLabels={false} className="justify-start" />
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-red-700 text-center">
          <p className="text-gray-300 font-mono">
            <FinalEditable trigger="click" 
              value={content?.footer?.copyright || "© 2025 Fables Monster Studio. All rights reserved."}
              path="footer.copyright"
              tag="span"
              className="inline-block"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
