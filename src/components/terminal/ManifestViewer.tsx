"use client";

import { CrewManifest } from "./types";

/** Properties for the crew manifest viewer */
export interface ManifestViewerProps {
  /** Manifest data with crew list */
  manifest: CrewManifest;
  /** Name of the vessel displayed above the manifest */
  vesselName: string;
  /** Crew complement info */
  crewComplement: string;
  /** Message shown after the list */
  corruptedLabel: string;
}

export default function ManifestViewer({ manifest, vesselName, crewComplement, corruptedLabel }: ManifestViewerProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-green-300 font-bold mb-3 sm:mb-4 text-sm sm:text-base">
        CREW MANIFEST
      </h3>
      <div className="border border-green-600 p-2 sm:p-3 bg-green-900 bg-opacity-20 rounded">
        <div className="text-green-400 mb-2 text-xs sm:text-sm font-mono">{vesselName}</div>
        <div className="text-green-400 mb-3 sm:mb-4 text-xs sm:text-sm font-mono">{crewComplement}</div>
        <div className="space-y-1 sm:space-y-2">
          {/* List each crew member */}
          {manifest.crew?.map((member, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-green-300 text-xs sm:text-sm font-mono">{member.name}</span>
              <span className="text-green-500 text-xs sm:text-sm">{member.position}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 sm:mt-4 pt-2 border-t border-green-600">
          {/* Remaining data is corrupted */}
          <span className="text-red-400 text-xs sm:text-sm font-mono">{corruptedLabel}</span>
        </div>
      </div>
    </div>
  );
}
