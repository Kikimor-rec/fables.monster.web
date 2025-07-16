"use client";

import { CrewManifest, CrewMember } from "./types";
import { useEffect, useState } from "react";

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

interface MemberRowProps {
  member: CrewMember;
}

function MemberRow({ member }: MemberRowProps) {
  const [time, setTime] = useState(member.timer);

  useEffect(() => {
    if (member.timer !== undefined) {
      const interval = setInterval(() => {
        setTime((t) => (t ?? 0) + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [member.timer]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
      <span className="text-green-300 text-xs sm:text-sm font-mono">
        {member.rank}{" "}
        <span className={member.strike ? "line-through" : ""}>{member.name}</span>
      </span>
      <span className="text-green-500 text-xs sm:text-sm font-mono">
        {member.status}
        {time !== undefined ? ` ${time}` : ""}
      </span>
    </div>
  );
}

interface EngineerRowProps {
  members: CrewMember[];
}

function EngineerRow({ members }: EngineerRowProps) {
  const active = members[members.length - 1];
  const previous = members.slice(0, -1);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
      <span className="text-green-300 text-xs sm:text-sm font-mono">ENGINEER</span>
      <span className="text-green-300 text-xs sm:text-sm font-mono">
        {previous.map((m, i) => (
          <span key={i} className="line-through mr-1">
            {m.name},{" "}
          </span>
        ))}
        <span>{active.name}</span>
      </span>
      <span className="text-green-500 text-xs sm:text-sm font-mono">{active.status}</span>
    </div>
  );
}

export default function ManifestViewer({ manifest, vesselName, crewComplement, corruptedLabel }: ManifestViewerProps) {
  const engineers = manifest.crew?.filter(m => m.rank === 'ENGINEER') ?? [];
  const firstEngineerIndex = manifest.crew?.findIndex(m => m.rank === 'ENGINEER') ?? -1;

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
          {manifest.crew?.map((member, index) => {
            if (member.rank === 'ENGINEER') {
              if (index === firstEngineerIndex) {
                return <EngineerRow key="engineers" members={engineers} />;
              }
              return null;
            }
            return <MemberRow key={index} member={member} />;
          })}
        </div>
        <div className="mt-3 sm:mt-4 pt-2 border-t border-green-600">
          {/* Remaining data is corrupted */}
          <span className="text-red-400 text-xs sm:text-sm font-mono">{corruptedLabel}</span>
        </div>
      </div>
    </div>
  );
}
