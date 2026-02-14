import type { ExpeditionFeature, ExpeditionStat } from "@/components/expedition-418/types";
import type { Expedition418Dict } from "@/types/i18n";

export const getExpeditionStats = (dict: Expedition418Dict): ExpeditionStat[] => [
  { label: dict.stats.labels.system, value: dict.stats.values.system },
  { label: dict.stats.labels.players, value: dict.stats.values.players },
  { label: dict.stats.labels.duration, value: dict.stats.values.duration },
  { label: dict.stats.labels.format, value: dict.stats.values.format },
];

export const getExpeditionFeatures = (dict: Expedition418Dict): ExpeditionFeature[] => {
  const icons = {
    robot: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="4" width="14" height="12" rx="2" />
        <circle cx="9" cy="9" r="1" fill="currentColor" />
        <circle cx="15" cy="9" r="1" fill="currentColor" />
        <path d="M9 13h6" />
        <path d="M8 16v4M16 16v4" />
        <path d="M12 2v2" />
      </svg>
    ),
    extraction: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v10M12 12l4-4M12 12l-4-4" />
        <path d="M3 15v4a2 2 0 002 2h14a2 2 0 002-2v-4" />
        <path d="M7 15h10" />
      </svg>
    ),
    campaign: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <path d="M8 7h8M8 11h8M8 15h4" />
      </svg>
    ),
    chaos: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l2 2" />
        <path d="M8.5 8.5l1 1M14.5 8.5l-1 1" />
        <path d="M9 16c.5-.5 1.5-1 3-1s2.5.5 3 1" />
      </svg>
    ),
  };

  return [
    {
      title: dict.features.buildBot.title,
      description: dict.features.buildBot.description,
      icon: icons.robot,
    },
    {
      title: dict.features.missions.title,
      description: dict.features.missions.description,
      icon: icons.extraction,
    },
    {
      title: dict.features.personalityModules.title,
      description: dict.features.personalityModules.description,
      icon: icons.campaign,
    },
    {
      title: dict.features.synchronization.title,
      description: dict.features.synchronization.description,
      icon: icons.chaos,
    },
  ];
};
