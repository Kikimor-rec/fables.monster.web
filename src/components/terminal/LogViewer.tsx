"use client";

import { ShipLog, SilkStarLog } from "./types";

/** Props for the generic log viewer */
export interface LogViewerProps {
  /** Array of logs to display */
  logs: Array<ShipLog | SilkStarLog>;
  /** Section header */
  header: string;
  /** Function to corrupt text for creepy effect (optional) */
  corruptText?: (text: string, level?: number) => string;
}

/** Helper to differentiate ship logs from Silk Star logs */
function isShipLog(log: ShipLog | SilkStarLog): log is ShipLog {
  return (log as ShipLog).timestamp !== undefined;
}

export default function LogViewer({ logs, header, corruptText }: LogViewerProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-green-300 font-bold mb-3 sm:mb-4 text-sm sm:text-base">
        {header}
      </h3>
      {/* Iterate over provided logs */}
      {logs.map((log) => (
        <div
          key={log.id}
          className="border border-green-600 p-2 sm:p-3 bg-green-900 bg-opacity-20 rounded"
        >
          {/* Ship logs have timestamp/type while Silk Star logs only have entry/content */}
          {isShipLog(log) ? (
            <>
              <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm mb-2 gap-1 sm:gap-0">
                <span className="text-green-400 break-all">[{log.timestamp}]</span>
                <span
                  className={
                    log.type === "error"
                      ? "text-red-400"
                      : log.type === "warning"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }
                >
                  {log.type.toUpperCase()}
                </span>
              </div>
              <div className="text-green-300 font-bold text-xs sm:text-sm md:text-base break-words">
                {log.message}
              </div>
              <div className="text-green-500 text-sm mt-1">{log.details}</div>
            </>
          ) : (
            <>
              {/* Silk Star logs only have entry/content */}
              <div className="text-green-400 text-xs sm:text-sm mb-2 font-mono">
                LOG ENTRY {(log as SilkStarLog).entry}:
              </div>
              <div className="text-green-300 text-xs sm:text-sm md:text-base leading-relaxed break-words">
                {corruptText ? corruptText((log as SilkStarLog).content, (log as SilkStarLog).entry === "3531" ? 0.3 : 0.05) : (log as SilkStarLog).content}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
