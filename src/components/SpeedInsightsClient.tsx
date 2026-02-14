"use client";

import dynamic from "next/dynamic";

const SpeedInsightsDynamic = dynamic(
  async () => {
    try {
      const mod = await import("@vercel/speed-insights/next");
      return mod.SpeedInsights;
    } catch {
      return () => null;
    }
  },
  { ssr: false }
);

export default function SpeedInsightsClient() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return <SpeedInsightsDynamic />;
}
