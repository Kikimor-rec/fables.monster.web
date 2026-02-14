import type { ReactNode } from "react";

export interface ExpeditionStat {
  label: string;
  value: string;
}

export interface ExpeditionFeature {
  title: string;
  description: string;
  icon: ReactNode;
}
