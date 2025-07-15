"use client";

import { CryoProtocol } from "./types";

/** Props for displaying cryocapsule protocols */
export interface CryoProtocolViewerProps {
  /** List of protocols to display */
  protocols: CryoProtocol[];
  /** Section header text */
  header: string;
}

export default function CryoProtocolViewer({ protocols, header }: CryoProtocolViewerProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-green-300 font-bold mb-3 sm:mb-4 text-sm sm:text-base">
        {header}
      </h3>
      {/* Render each protocol block */}
      {protocols.map((protocol, index) => (
        <div
          key={index}
          className="border border-green-600 p-2 sm:p-3 bg-green-900 bg-opacity-20 rounded"
        >
          <div className="text-green-400 mb-2 text-xs sm:text-sm font-mono font-bold">
            {protocol.title}
          </div>
          <div className="text-green-300 text-xs sm:text-sm leading-relaxed break-words">
            {protocol.description}
          </div>
        </div>
      ))}
    </div>
  );
}
