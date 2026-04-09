"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface TimelineEntry {
  time: string;
  text: string;
}

interface CareerTwilightTimelineProps {
  dict: {
    timeline: {
      title: string;
      caseFile: string;
      warning: string;
      confirmButton: string;
      accessGranted: string;
      entries: TimelineEntry[];
    };
  };
}

export default function CareerTwilightTimeline({ dict }: CareerTwilightTimelineProps) {
  const [accessGranted, setAccessGranted] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showAccessText, setShowAccessText] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleAccess = useCallback(() => {
    setAccessGranted(true);
    setShowAccessText(true);
  }, []);

  useEffect(() => {
    if (!showAccessText) return;

    const accessTimer = setTimeout(() => {
      setVisibleLines(1);
    }, 1200);

    return () => clearTimeout(accessTimer);
  }, [showAccessText]);

  useEffect(() => {
    if (visibleLines === 0 || visibleLines > dict.timeline.entries.length) return;

    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
      // Auto-scroll terminal
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [visibleLines, dict.timeline.entries.length]);

  return (
    <section className="py-16 md:py-24 border-b border-cyan-500/20">
      <div className="max-w-3xl mx-auto px-4">
        {/* Terminal frame */}
        <div className="ct-terminal">
          {/* Terminal header bar */}
          <div className="ct-terminal-header">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <span className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="font-mono text-xs text-cyan-400/60 tracking-wider">
              {dict.timeline.caseFile}
            </span>
          </div>

          {/* Terminal body */}
          <div className="ct-terminal-body" ref={terminalRef}>
            {/* Restricted header */}
            <div className="mb-6">
              <p className="text-red-400 font-mono text-sm font-bold flex items-center gap-2">
                <span>⛔</span> {dict.timeline.title}
              </p>
              <p className="text-gray-500 font-mono text-xs mt-2 leading-relaxed">
                {dict.timeline.warning}
              </p>
            </div>

            {!accessGranted ? (
              <button
                onClick={handleAccess}
                className="ct-terminal-button"
              >
                <span className="ct-terminal-button-icon">▶</span>
                {dict.timeline.confirmButton}
              </button>
            ) : (
              <div className="space-y-1">
                {showAccessText && (
                  <p className="text-green-400 font-mono text-xs mb-4 ct-line-appear">
                    &gt; {dict.timeline.accessGranted}
                  </p>
                )}

                {dict.timeline.entries.slice(0, visibleLines).map((entry, i) => (
                  <div
                    key={i}
                    className="ct-timeline-entry ct-line-appear"
                  >
                    <span className="ct-timeline-time">{entry.time}</span>
                    <span className="ct-timeline-text">{entry.text}</span>
                  </div>
                ))}

                {/* Blinking cursor */}
                {visibleLines <= dict.timeline.entries.length && (
                  <span className="inline-block w-2 h-4 bg-cyan-400 ct-cursor-blink ml-1 mt-2" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
