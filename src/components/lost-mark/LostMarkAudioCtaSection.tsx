import Link from "next/link";
import StoreButton from "@/components/StoreButton";
import LazyMusicPlayer from "@/components/LazyMusicPlayer";
import type { LostMarkDictionary } from "@/components/lost-mark/types";

interface LostMarkAudioCtaSectionProps {
  lang: string;
  dict: LostMarkDictionary;
}

export default function LostMarkAudioCtaSection({ lang, dict }: LostMarkAudioCtaSectionProps) {
  return (
    <>
      <section id="soundtrack" className="py-20 border-t border-red-700 bg-gray-900 scroll-mt-36">
        <div className="fm-shell">
          <h2 className="text-4xl font-bold text-white mb-12 text-center font-orbitron flex items-center justify-center gap-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <span>{dict.sections?.soundtrack || "ATMOSPHERIC SOUNDTRACK"}</span>
          </h2>

          <div className="py-6 mb-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4 font-orbitron">
              {dict.soundtrack?.streamingTitle || "Use your favorite streaming service"}
            </h3>
            <p className="text-gray-300 font-orbitron mb-6 max-w-2xl mx-auto">
              {dict.soundtrack?.streamingDesc ||
                "Access the full soundtrack on any platform you prefer for convenient listening during your game sessions."}
            </p>
            <a
              href="https://distrokid.com/hyperfollow/fablesmonsters/lost-mark-original-soundtrack"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-700 hover:bg-red-600 text-white font-orbitron font-bold py-3 px-6 rounded border-2 border-red-600 transition-colors mb-3"
            >
              {dict.buttons?.listenStreaming || "Listen on streaming services"}
            </a>
          </div>

          <div className="mb-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 text-center font-orbitron">
              {dict.soundtrack?.youtubeTitle || "YouTube playlist"}
            </h3>
            <p className="text-gray-300 font-orbitron mb-6 max-w-2xl mx-auto text-center">
              {dict.soundtrack?.youtubeDesc || "Watch and listen to the complete soundtrack on YouTube with our dedicated playlist."}
            </p>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/videoseries?si=enlxSeQmCInMMZ95&list=PLO8bKMtLeNZT3DrnjgMhfhDl18NJbaFHl"
              title={dict.soundtrack?.youtubeIframeTitle || "Lost Mark soundtrack playlist"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full aspect-video"
            />
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 text-center font-orbitron">
              {dict.soundtrack?.playerTitle || "Website player"}
            </h3>
            <p className="text-gray-300 font-orbitron mb-6 max-w-2xl mx-auto text-center">
              {dict.soundtrack?.playerDesc ||
                "Use our embedded player to enjoy the full soundtrack directly on our website with all 11 tracks."}
            </p>
            <LazyMusicPlayer />
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-red-700 text-center">
        <div className="fm-shell">
          <h2 className="text-4xl font-bold text-white mb-6 font-orbitron">
            {dict.sections?.cta || "READY TO EXPLORE THE LOST MARK?"}
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-orbitron">
            {dict.cta?.description ||
              "Download now and begin your descent into sci-fi horror. Available on multiple platforms."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <StoreButton
              store="itch"
              href="https://fablesmonster.itch.io/lost-mark"
              price="Free or PWYW"
              label={dict.buttons?.itch}
            />
            <StoreButton
              store="drivethrurpg"
              href="https://www.drivethrurpg.com/en/product/530242?affiliate_id=2863466"
              price="Free or PWYW"
              label={dict.buttons?.drivethru}
            />
            <Link
              href={`/${lang}/projects`}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-orbitron font-bold transition-colors"
            >
              {dict.buttons?.moreProjects || "MORE PROJECTS"}
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-red-700/50">
            <Link
              href={`/${lang}/lost-mark/license`}
              className="text-gray-400 hover:text-red-400 font-orbitron text-sm underline transition-colors"
            >
              {dict.cta?.licensePrefix || "PROTOCOL"}: {dict.buttons?.viewLicense || "View license information (CC BY-NC-SA 4.0)"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
