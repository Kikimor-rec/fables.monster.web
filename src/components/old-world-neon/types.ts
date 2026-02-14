import type { OldWorldNeonDict } from "@/types/i18n";

export interface NeonStatusTag {
  label: string;
  classes: string;
}

export interface NeonHeroCopy {
  classified: string;
  oldWorld: string;
  neon: string;
  system: string;
  accessLines: {
    first: string;
    second: string;
    third: string;
  };
  restrictedTitle: string;
}

export type NeonDict = OldWorldNeonDict;
