"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "REACTOR CORE ............ ONLINE",
  "NAVIGATION ARRAY ........ SYNCED",
  "LIFE SUPPORT ............ NOMINAL",
  "COMM RELAY .............. SCANNING",
  "HULL INTEGRITY .......... 97.3%",
  "CREW MANIFEST ........... LOADED",
  "CARGO BAY ............... SEALED",
  "FTL DRIVE ............... STANDBY",
  "SENSOR GRID ............. ACTIVE",
  "WEAPONS ARRAY ........... LOCKED",
  "AI SUBSYSTEM ............ WARNING",
  "DISTRESS BEACON ......... DISABLED",
  "CRYO PODS STATUS ........ NOMINAL",
  "FUEL CELLS .............. 82.1%",
  "EXTERNAL TEMP ........... -271.3°C",
];

export default function BootSequence() {
  const [visible, setVisible] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const dismiss = useCallback(() => {
    setDone(true);
    sessionStorage.setItem("fm_booted", "1");
  }, []);

  useEffect(() => {
    // Skip if already booted this session
    if (sessionStorage.getItem("fm_booted")) return;
    // Skip for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("fm_booted", "1");
      return;
    }

    setVisible(true);
    // Prevent body scroll during boot
    document.body.style.overflow = "hidden";

    // Shuffle and pick 8 lines
    const shuffled = [...BOOT_LINES].sort(() => Math.random() - 0.5).slice(0, 8);
    let i = 0;
    const interval = setInterval(() => {
      if (i < shuffled.length) {
        setLines((prev) => [...prev, shuffled[i]]);
        setProgress(((i + 1) / shuffled.length) * 100);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(dismiss, 600);
      }
    }, 250);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [dismiss]);

  useEffect(() => {
    if (!visible) return;
    const handleSkip = () => dismiss();
    window.addEventListener("click", handleSkip);
    window.addEventListener("keydown", handleSkip);
    return () => {
      window.removeEventListener("click", handleSkip);
      window.removeEventListener("keydown", handleSkip);
    };
  }, [visible, dismiss]);

  // Restore scroll on done
  useEffect(() => {
    if (done) {
      document.body.style.overflow = "";
    }
  }, [done]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "hue-rotate(90deg)", scale: 0.98 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black"
        >
          {/* Scanline overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
            }}
          />

          <div className="relative max-w-lg w-full px-6">
            <div className="text-cyan-400 font-mono text-xs mb-6 tracking-[0.2em] animate-pulse">
              SYSTEM INITIALIZING...
            </div>

            {/* Boot log */}
            <div className="space-y-1 mb-8 min-h-[220px]">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-green-400/80 font-mono text-[11px] tracking-wider"
                >
                  <span className="text-green-600 mr-2">&gt;</span>
                  {line}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="h-[2px] bg-zinc-800 w-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 via-red-500 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  boxShadow: "0 0 10px rgba(255,31,31,0.5), 0 0 20px rgba(0,240,255,0.3)",
                }}
              />
            </div>

            <div className="mt-4 text-zinc-600 font-mono text-[10px] tracking-widest text-center">
              CLICK OR PRESS ANY KEY TO SKIP
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
