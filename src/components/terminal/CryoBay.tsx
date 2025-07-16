"use client";

import { CryoProtocol } from "./types";

interface CryoBayProps {
  activation: CryoProtocol;
  header: string;
}

export default function CryoBay({ activation, header }: CryoBayProps) {
  const statuses = [
    "red",
    "red",
    "red",
    "yellow",
    "yellow",
    "yellow",
    "yellow",
    "green",
    ...Array(10).fill("empty"),
  ];

  const getColor = (s: string) => {
    switch (s) {
      case "red":
        return "bg-red-600";
      case "yellow":
        return "bg-yellow-600";
      case "green":
        return "bg-green-600";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-green-300 font-bold mb-3 sm:mb-4 text-sm sm:text-base">
        {header}
      </h3>
      <div className="grid grid-cols-6 gap-2">
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
