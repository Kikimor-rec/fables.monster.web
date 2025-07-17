"use client";

import { CrewManifest } from "./types";
import { useEffect, useRef, useState } from "react";

interface ManifestViewerProps {
  manifest: CrewManifest;
  vesselName: string;
  crewComplement: string;
  corruptedLabel: string;
}

// Engineer history: все уволены (OFFLINE, FIRED), кроме Illarion (ONLINE, без пометки)
const engineerHistory = [
  { name: "John Smith", status: "OFFLINE", note: "FIRED" },
  { name: "Emily Carter", status: "OFFLINE", note: "FIRED" },
  { name: "Michael Brown", status: "OFFLINE", note: "FIRED" },
  { name: "Illarion Vlasov", status: "ONLINE", note: "" },
];

export default function ManifestViewer({ manifest, vesselName, crewComplement, corruptedLabel }: Omit<ManifestViewerProps, 'corruptedLabel'> & { corruptedLabel?: string }) {
  // Найдём инженеров, андроида и остальных
  const engineers = manifest.crew?.filter(m => m.rank.toLowerCase().includes("engineer")) || [];
  const android = manifest.crew?.find(m => m.rank.toLowerCase().includes("android"));
  const others = manifest.crew?.filter(
    m => !m.rank.toLowerCase().includes("engineer") && !m.rank.toLowerCase().includes("android")
  ) || [];

  // Заменить имена остальных членов экипажа на английские (пример), капитан всегда первый
  const englishNames = [
    "Mark Opollo", // Captain
    "Sarah Johnson",
    "David Miller",
    "Jessica Lee",
    "Robert Wilson",
    "Linda Davis",
    "James Moore",
    "Barbara Taylor",
    "Christopher Harris",
    "Patricia Clark"
  ];
  const othersWithEnglishNames = others.map((member, idx) => ({
    ...member,
    name: englishNames[idx] || member.name
  }));

  // Динамическое количество экипажа с ошибкой (скачет от 2 до 14)
  const [glitchCrew, setGlitchCrew] = useState(crewComplement);
  useEffect(() => {
    const interval = setInterval(() => {
      const n = Math.floor(Math.random() * 13) + 2; // от 2 до 14
      setGlitchCrew(`${n} PERSONNEL`);
    }, 1200);
    return () => clearInterval(interval);
  }, [crewComplement]);

  // Таймер потери связи с андроидом (217 лет в секундах)
  const SECONDS_IN_YEAR = 365.25 * 24 * 60 * 60;
  const initialSeconds = Math.floor(217 * SECONDS_IN_YEAR);
  const [androidTimer, setAndroidTimer] = useState(initialSeconds);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (android) {
      timerRef.current = setInterval(() => {
        setAndroidTimer((s) => s + 1);
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [android]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <h3 className="text-green-300 font-bold mb-3 sm:mb-4 text-sm sm:text-base">
        CREW MANIFEST LOG
      </h3>
      <div className="border border-green-600 p-2 sm:p-3 bg-green-900 bg-opacity-20 rounded overflow-x-auto">
        <div className="text-green-400 mb-2 text-xs sm:text-sm font-mono">{vesselName}</div>
        <div className="text-green-400 mb-3 sm:mb-4 text-xs sm:text-sm font-mono">{glitchCrew}</div>
        {corruptedLabel && (
          <div className="mt-3 sm:mt-4 pt-2 border-t border-green-600">
            <span className="text-red-400 text-xs sm:text-sm font-mono">{corruptedLabel}</span>
          </div>
        )}
        {/* Основная таблица — обычные члены экипажа */}
        <table className="w-full text-xs sm:text-sm font-mono border-separate border-spacing-y-1 mb-6">
          <thead>
            <tr className="text-green-300">
              <th className="text-left">#</th>
              <th className="text-left">Role</th>
              <th className="text-left">Name</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {othersWithEnglishNames.map((member, idx) => (
              <tr key={member.name + idx} className="bg-green-950/30">
                <td>{idx + 1}</td>
                <td>{member.rank}</td>
                <td>{member.name}</td>
                <td>{member.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Секция инженеров */}
        <div className="mb-6">
          <div className="text-green-400 mb-2 text-xs sm:text-sm font-mono font-bold">ENGINEER HISTORY</div>
          <table className="w-full text-xs sm:text-sm font-mono border-separate border-spacing-y-1">
            <thead>
              <tr className="text-green-300">
                <th className="text-left">#</th>
                <th className="text-left">Role</th>
                <th className="text-left">Name</th>
                <th className="text-left">Status</th>
                <th className="text-left">Note</th>
              </tr>
            </thead>
            <tbody>
              {engineerHistory.map((eng, idx) => (
                <tr key={eng.name + idx} className="bg-green-950/60">
                  <td>{idx + 1}</td>
                  <td>{engineers[0]?.rank || "Engineer"}</td>
                  <td>{eng.name}</td>
                  <td>{eng.status}</td>
                  <td className={
                    eng.note === ""
                      ? ""
                      : "text-red-400"
                  }>{eng.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Секция андроида */}
        {android && (
          <div className="mb-6">
            <div className="text-green-400 mb-2 text-xs sm:text-sm font-mono font-bold">NON-LIVING PERSONNEL</div>
            <table className="w-full text-xs sm:text-sm font-mono border-separate border-spacing-y-1">
              <thead>
                <tr className="text-green-300">
                  <th className="text-left">Role</th>
                  <th className="text-left">Name</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Timer</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-950/80">
                  <td>{android.rank}</td>
                  <td>ALX-13</td>
                  <td>{android.status}</td>
                  <td className="text-blue-400">{androidTimer.toLocaleString()} s</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
