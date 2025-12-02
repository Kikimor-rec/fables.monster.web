"use client";

import KrampTerminalTables from "./KrampTerminalTables";
import KrampAudioPlayer from "./KrampAudioPlayer";
import KrampSFXPanel from "./KrampSFXPanel";

interface KrampSectionsProps {
  lang: string;
  dict: {
    sections?: Record<string, string>;
    soundtrack?: { description?: string };
    tables?: { description?: string };
    sfx?: { description?: string };
  };
}

export default function KrampSections({ lang, dict }: KrampSectionsProps) {
  const isRu = lang === "ru";
  
  return (
    <>
      {/* Audio Soundtrack Section */}
      <section id="soundtrack" className="py-20 relative z-10 bg-gradient-to-b from-black via-green-950/10 to-black scroll-mt-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-orbitron text-glow">
              {dict.sections?.soundtrack || 'SOUNDTRACK'}
            </h2>
            <p className="text-gray-400 font-rajdhani text-lg">
              {dict.soundtrack?.description || (isRu 
                ? 'Праздничный синтвейв для глубокого погружения в праздничный хоррор.'
                : 'Festive synthwave for deeper immersion into holiday horror.'
              )}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {/* Main Audio Player */}
            <div className="md:col-span-2">
              <KrampAudioPlayer lang={lang} />
            </div>
            
            {/* SFX Panel */}
            <div className="md:col-span-1">
              <KrampSFXPanel lang={lang} />
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider opacity-50">
        <div className="divider-lights">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`divider-light ${['red', 'green', 'blue', 'yellow'][i % 4]}`}></div>
          ))}
        </div>
      </div>

      {/* Random Tables Section */}
      <section id="tables" className="py-20 relative z-10 bg-black scroll-mt-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-4 font-orbitron text-glow">
              {dict.sections?.tables || 'RANDOM TABLES'}
            </h2>
            <p className="text-gray-400 font-rajdhani text-lg">
              {dict.tables?.description || (isRu 
                ? 'Бросьте кубики, чтобы разнообразить вашу игру.'
                : 'Roll the dice to spark your imagination during the game.'
              )}
            </p>
          </div>
          
          <KrampTerminalTables lang={lang} />
        </div>
      </section>
    </>
  );
}
