"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicMusicPlayer = dynamic(
  () => import("./MusicPlayer"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-black border border-red-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white font-mono">🎵 LOST MARK SOUNDTRACK</h3>
          <div className="animate-pulse bg-red-700 h-10 w-24 rounded"></div>
        </div>
        <div className="text-gray-400 font-mono text-sm">Loading music player...</div>
      </div>
    )
  }
);

export default function LazyMusicPlayer() {
  const [shouldLoad, setShouldLoad] = useState(false);

  if (!shouldLoad) {
    return (
      <div className="bg-black border border-red-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white font-mono">🎵 LOST MARK SOUNDTRACK</h3>
          <button
            onClick={() => setShouldLoad(true)}
            className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 font-mono font-bold transition-colors border border-red-600"
          >
            LOAD PLAYER
          </button>
        </div>
        <div className="text-gray-400 font-mono text-sm">
          Click to load the interactive music player with 9 original tracks
        </div>
      </div>
    );
  }

  return <DynamicMusicPlayer />;
}
