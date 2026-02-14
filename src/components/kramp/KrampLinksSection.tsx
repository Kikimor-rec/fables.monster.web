import Image from "next/image";
import type { KrampDictionary, KrampLink } from "@/components/kramp/types";

interface KrampLinksSectionProps {
  dict: KrampDictionary;
  links: KrampLink[];
}

export default function KrampLinksSection({ dict, links }: KrampLinksSectionProps) {
  return (
    <section id="links" className="py-20 relative z-10 bg-black scroll-mt-36">
      <div className="fm-shell max-w-6xl">
        <div className="bg-gray-900/50 border border-red-700/50 p-8 hud-border">
          <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-8 font-orbitron text-center text-glow">
            {dict.sections?.stayInLoop || "Stay in the Loop"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {links.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gray-800/50 border border-gray-700 hover:border-green-500 transition-all duration-300 hover:box-glow-cyan group"
              >
                <div className="w-8 h-8 flex-shrink-0">
                  <Image
                    src={link.icon}
                    alt={link.platform}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain filter brightness-0 invert group-hover:drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]"
                  />
                </div>
                <div>
                  <div className="font-bold text-green-400 font-orbitron group-hover:text-green-300">{link.platform}</div>
                  <div className="text-sm text-gray-400 font-rajdhani group-hover:text-gray-200">{link.description}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
