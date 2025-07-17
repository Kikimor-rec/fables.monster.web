"use client";

import { useEffect, useState } from "react";

interface Sensor {
  id: string;
  name: string;
  unit: string;
  min: number;
  max: number;
  warnLow: number;
  warnHigh: number;
  errorLow: number;
  errorHigh: number;
}

const sensors: Sensor[] = [
  {
    id: "oxygen",
    name: "Oxygen",
    unit: "%",
    min: 19,
    max: 23,
    warnLow: 20,
    warnHigh: 22,
    errorLow: 18,
    errorHigh: 24,
  },
  {
    id: "pressure",
    name: "Pressure",
    unit: "kPa",
    min: 95,
    max: 105,
    warnLow: 97,
    warnHigh: 103,
    errorLow: 90,
    errorHigh: 110,
  },
  {
    id: "water",
    name: "Water",
    unit: "L",
    min: 80,
    max: 120,
    warnLow: 90,
    warnHigh: 110,
    errorLow: 70,
    errorHigh: 130,
  },
  {
    id: "co2",
    name: "CO₂",
    unit: "ppm",
    min: 350,
    max: 800,
    warnLow: 400,
    warnHigh: 700,
    errorLow: 200,
    errorHigh: 1200,
  },
];

function getCatastrophicValue(sensor: Sensor, prev: number): number {
  // 60% — резкий скачок (ошибка), 20% — warning, 20% — норма
  const r = Math.random();
  if (r < 0.6) {
    // Катастрофический скачок: сильно за пределы error
    if (Math.random() < 0.5) {
      return sensor.errorLow - Math.random() * 30 - 5; // ниже error
    } else {
      return sensor.errorHigh + Math.random() * 30 + 5; // выше error
    }
  } else if (r < 0.8) {
    // warning зона, но ближе к границам
    if (Math.random() < 0.5) {
      return Math.random() * (sensor.warnLow - sensor.errorLow) + sensor.errorLow;
    } else {
      return Math.random() * (sensor.errorHigh - sensor.warnHigh) + sensor.warnHigh;
    }
  } else {
    // норма, но с небольшим шумом
    return (
      Math.random() * (sensor.max - sensor.min) + sensor.min + (Math.random() - 0.5) * 2
    );
  }
}

function getStatus(sensor: Sensor, value: number): "ok" | "warn" | "error" {
  if (value < sensor.errorLow || value > sensor.errorHigh) return "error";
  if (value < sensor.warnLow || value > sensor.warnHigh) return "warn";
  return "ok";
}

function getColor(status: "ok" | "warn" | "error"): string {
  switch (status) {
    case "ok":
      return "bg-green-700 border-green-400 text-green-200";
    case "warn":
      return "bg-yellow-700 border-yellow-400 text-yellow-200";
    case "error":
      return "bg-red-700 border-red-400 text-red-200 animate-pulse";
  }
}

export default function LifeSupportPanel() {
  const [values, setValues] = useState<number[]>(() => sensors.map(s => getCatastrophicValue(s, 0)));

  useEffect(() => {
    const interval = setInterval(() => {
      setValues(prev => sensors.map((s, i) => getCatastrophicValue(s, prev[i])));
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-green-300 font-bold mb-3 sm:mb-4 text-sm sm:text-base">
        LIFE SUPPORT
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sensors.map((sensor, i) => {
          const value = values[i];
          const status = getStatus(sensor, value);
          return (
            <div
              key={sensor.id}
              className={`border rounded p-3 flex flex-col items-start font-mono text-xs sm:text-sm ${getColor(status)}`}
            >
              <span className="font-bold mb-1">{sensor.name}</span>
              <span>
                {value.toFixed(1)} {sensor.unit}
              </span>
              <span className="mt-1">
                {status === "ok" && "NORMAL"}
                {status === "warn" && "WARNING"}
                {status === "error" && "ERROR"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
} 