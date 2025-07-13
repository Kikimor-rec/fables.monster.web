import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-mono font-bold text-red-500 mb-4">
              404
            </h1>
            <div className="text-2xl md:text-3xl font-mono text-red-400 mb-6">
              ERROR: PAGE NOT FOUND
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <div className="bg-gray-900 border border-red-700 p-8 mb-8">
            <div className="text-green-400 font-mono text-sm mb-4">
              &gt; SYSTEM MESSAGE:
            </div>
            <h2 className="text-xl md:text-2xl font-mono text-white mb-4">
              Looks like this page got lost in the space void...
            </h2>
            <p className="text-gray-300 font-mono mb-6">
              Even our best monster hunters couldn't track it down. 
              Maybe it was consumed by an eldritch horror, or perhaps 
              it's hiding in another dimension entirely.
            </p>
            <p className="text-gray-400 font-mono text-sm">
              Don't worry, we've seen worse things in our adventures.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-red-700 hover:bg-red-600 text-white px-8 py-4 font-mono font-bold transition-colors border border-red-600 text-center"
            >
              RETURN TO BASE
            </Link>
            <Link
              href="/projects"
              className="bg-transparent border-2 border-red-700 text-red-400 hover:bg-red-700 hover:text-white px-8 py-4 font-mono font-bold transition-colors text-center"
            >
              EXPLORE PROJECTS
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="mt-12 text-gray-500 font-mono text-sm">
            <p>Lost? Need help? Contact us at info@fables.monster</p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
