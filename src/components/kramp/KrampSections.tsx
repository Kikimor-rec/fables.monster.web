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

          {/* Streaming Links */}
          <div className="max-w-4xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://distrokid.com/hyperfollow/fablesmonsters/krampexe-adventure-original-soundtrack"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-orbitron font-bold text-sm transition-all hover:scale-105 border border-green-400/50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              {isRu ? 'Слушать на стримингах' : 'Listen on Streaming'}
            </a>
          </div>

          {/* YouTube Playlist */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full border-2 border-green-700"
                src="https://www.youtube.com/embed/videoseries?si=s3IbEbXQn5QJdmn_&list=OLAK5uy_mfiw1Lfbxyo1Oi7zQ21a1uxb0m7voC4AM"
                title={isRu ? "KRAMP.EXE Саундтрек на YouTube" : "KRAMP.EXE Soundtrack on YouTube"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <p className="text-center text-green-600 text-sm mt-2 font-mono">
              {isRu ? '▲ ПОЛНЫЙ ПЛЕЙЛИСТ НА YOUTUBE ▲' : '▲ FULL PLAYLIST ON YOUTUBE ▲'}
            </p>
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
