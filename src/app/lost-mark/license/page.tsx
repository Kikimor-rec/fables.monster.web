import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const dynamic = 'error';

export default function LostMarkLicense() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <FadeIn>
          <div className="mb-8">
            <Link
              href="/lost-mark"
              className="text-red-400 hover:text-red-300 font-mono text-sm transition-colors"
            >
              ← Back to Lost Mark
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-gray-900 border border-red-700 p-8 mb-8">
            <h1 className="text-3xl md:text-4xl font-mono font-bold text-red-400 mb-2">
              LOST MARK LICENSE
            </h1>
            <div className="text-xl font-mono text-gray-300 mb-6">
              (2025)
            </div>
            <div className="text-gray-400 font-mono">
              By Fables Monster — <a href="https://fables.monster" className="text-red-400 hover:underline">https://fables.monster</a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="bg-gray-900 border border-red-700 p-8 mb-8">
            <h2 className="text-xl font-mono font-bold text-white mb-4">
              License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
            </h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-mono font-bold text-green-400 mb-3">
                You are free to:
              </h3>
              <ul className="space-y-2 text-gray-300 font-mono">
                <li>• Use this adventure, its illustrations, and music in personal games, streams, and videos (including monetized platforms like YouTube or Twitch);</li>
                <li>• Share it freely for non-commercial use;</li>
                <li>• Remix, transform, and build upon the material;</li>
                <li>• Translate the text or make fan versions, as long as you credit us.</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-mono font-bold text-yellow-400 mb-3">
                Under the following terms:
              </h3>
              <ul className="space-y-2 text-gray-300 font-mono">
                <li>
                  <strong className="text-white">Attribution</strong> — You must give appropriate credit. Please list the creators of text, art, and music where applicable.
                </li>
                <li>
                  <strong className="text-white">NonCommercial</strong> — You may not use the material for commercial purposes without permission.
                </li>
                <li>
                  <strong className="text-white">ShareAlike</strong> — If you remix, adapt, or build upon the material, you must license your modified content under the same terms.
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-mono font-bold text-blue-400 mb-3">
                Suggested attribution:
              </h3>
              <div className="bg-black border border-gray-600 p-4 font-mono text-gray-300 text-sm">
                   <div>• Original product by Fables Monster</div>
                <div>• Written by Stepan Kulikov</div>
                <div>• Illustrations by Zlata Ignatova</div>
                <div>• Music by Stanislav DariDa</div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="bg-gray-900 border border-red-700 p-8 mb-8">
            <h3 className="text-lg font-mono font-bold text-red-400 mb-3">
              Contact for commercial inquiries or special permissions:
            </h3>
            <div className="text-gray-300 font-mono mb-4">
              → <a href="mailto:info@fables.monster" className="text-red-400 hover:underline">info@fables.monster</a>
            </div>
            
            <div className="text-sm text-gray-400 font-mono">
              License details: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://creativecommons.org/licenses/by-nc-sa/4.0/</a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lost-mark"
              className="bg-red-700 hover:bg-red-600 text-white px-8 py-4 font-mono font-bold transition-colors border border-red-600 text-center"
            >
              BACK TO LOST MARK
            </Link>
            <Link
              href="/projects"
              className="bg-transparent border-2 border-red-700 text-red-400 hover:bg-red-700 hover:text-white px-8 py-4 font-mono font-bold transition-colors text-center"
            >
              VIEW ALL PROJECTS
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
