"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { LOST_MARK_TRACKS } from "@/lib/constants";

const DynamicMusicPlayer = dynamic(
  () => import("./MusicPlayer"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-black border border-red-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <span>LOST MARK SOUNDTRACK</span>
          </h3>
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
          <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <span>LOST MARK SOUNDTRACK</span>
          </h3>
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

  return <DynamicMusicPlayer tracks={[...LOST_MARK_TRACKS]} />;
}
