"use client";

import { CryoProtocol } from "./types";

interface CryoBayProps {
  activation: CryoProtocol;
  header: string;
}

export default function CryoBay({ activation, header }: CryoBayProps) {
  const statuses = [
    "demolished", // 1 — демонтирована
    "red",   // 2
    "red",   // 3
    "red",   // 4
    "yellow",// 5
    "red",   // 6
    "empty", // 7
    "yellow",// 8
    "empty", // 9
    "empty", // 10
    "empty", // 11
    "empty", // 12
    "yellow",// 13
    "empty", // 14
    "empty", // 15
    "empty", // 16
    "empty", // 17
    "empty"  // 18
  ];

  const getColor = (s: string) => {
    switch (s) {
      case "red":
        return "bg-red-600";
      case "yellow":
        return "bg-yellow-600";
      case "demolished":
        return "bg-gray-500 text-gray-200"; // новый цвет для демонтированной капсулы
      default:
        return "";
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-green-300 font-bold mb-3 sm:mb-4 text-sm sm:text-base">
        {header}
      </h3>
      <div className="grid grid-cols-9 gap-2">
        {statuses.map((s, i) => (
          <div
            key={i}
            className={`h-6 border border-green-600 rounded flex items-center justify-center text-xs font-mono ${getColor(
              s
            )}`}
          >
            {i + 1}
          </div>
        ))}
      </div>
      {/* Легенда статусов капсул */}
      <div className="flex flex-wrap gap-4 items-center mt-3 mb-2 text-xs sm:text-sm font-mono">
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 rounded bg-gray-500 border border-green-600 align-middle"></span>
          <span>no connection</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 rounded bg-red-600 border border-green-600 align-middle"></span>
          <span>critical error</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 rounded bg-yellow-600 border border-green-600 align-middle"></span>
          <span>error</span>
        </div>
      </div>
      <div className="border border-green-600 p-2 sm:p-3 bg-green-900 bg-opacity-20 rounded">
        <div className="text-green-400 mb-2 text-xs sm:text-sm font-mono font-bold">
          {activation.title}
        </div>
        <div className="text-green-300 text-xs sm:text-sm font-mono whitespace-pre-line">
          {activation.authorization}
          {"\n\n"}
          {activation.content}
        </div>
      </div>
    </div>
  );
}
