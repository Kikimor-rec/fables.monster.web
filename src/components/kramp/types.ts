import type { ReactNode } from "react";
import type { KrampDict } from "@/types/i18n";

export type KrampDictionary = KrampDict;

export interface KrampFeature {
  name: string;
  description: string;
  icon: ReactNode;
}

export interface KrampLink {
  platform: string;
  url: string;
  description: string;
  icon: string;
}
