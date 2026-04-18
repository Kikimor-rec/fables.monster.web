export type VttServiceType = 'content_adaptation' | 'new_system' | 'support';
export type VttPlatform = 'foundry' | 'roll20' | 'both';
export type VttProjectSize =
  | 'small'
  | 'medium'
  | 'large'
  | 'unsure'
  | 'mvp'
  | 'production'
  | 'one_time'
  | 'basic_support'
  | 'standard_support'
  | 'publisher_support';
export type VttComplexity =
  | 'no_automation'
  | 'basic_automation'
  | 'advanced_automation'
  | 'compatibility_only'
  | 'fixes_plus_improvements'
  | 'release_support';
export type VttMaterialState = 'ready' | 'partial' | 'in_progress' | 'messy';
export type VttPostReleaseSupport = 'none' | 'basic' | 'ongoing';
export type VttLocale = 'en' | 'ru';

export interface VttEstimatorAnswers {
  serviceType: VttServiceType;
  platform: VttPlatform;
  projectSize: VttProjectSize;
  complexity: VttComplexity;
  materialState: VttMaterialState;
  postReleaseSupport?: VttPostReleaseSupport;
}

export interface VttEstimateResult {
  min: number;
  max: number | null;
  recurring: boolean;
  includedHours?: number;
  supportAddon?: {
    monthlyFrom: number;
    includedHours?: number;
  };
  resultKey:
    | 'content_small'
    | 'content_medium'
    | 'content_large'
    | 'system_roll20_sheet'
    | 'system_foundry_mvp'
    | 'system_production'
    | 'support_one_time'
    | 'support_basic'
    | 'support_standard'
    | 'support_publisher';
}

interface BudgetRange {
  min: number;
  max: number | null;
  recurring?: boolean;
  includedHours?: number;
}

interface MultiplierRange {
  min: number;
  max: number;
}

export const vttPricing = {
  publicPackages: {
    content_adaptation: {
      small: { startMin: 750, startMax: 900 },
      medium: { startMin: 2000, startMax: 2400 },
      large: { startMin: 5000, startMax: 5500 },
    },
    new_system: {
      roll20_sheet: { startMin: 2500, startMax: 3000 },
      foundry_mvp: { startMin: 4500, startMax: 5000 },
      production: { startMin: 10000, startMax: 12000 },
    },
    support: {
      basic: { monthlyFrom: 200, includedHours: 4 },
      standard: { monthlyFrom: 550, includedHours: 10 },
      publisher: { monthlyFrom: 950, includedHours: 20 },
    },
  },
  estimatorBaseline: {
    content_adaptation: {
      small: { min: 750, max: 1500 },
      medium: { min: 2000, max: 4000 },
      large: { min: 5000, max: null },
    },
    new_system: {
      roll20_sheet: { min: 2500, max: 5000 },
      foundry_mvp: { min: 4500, max: 9000 },
      production: { min: 10000, max: null },
    },
    support: {
      one_time: { min: 150, max: 500, recurring: false },
      basic: { min: 200, max: null, recurring: true, includedHours: 4 },
      standard: { min: 550, max: null, recurring: true, includedHours: 10 },
      publisher: { min: 950, max: null, recurring: true, includedHours: 20 },
    },
  },
  multipliers: {
    platform: {
      foundry: 1,
      roll20: 1,
      both: 1.65,
    },
    complexity: {
      no_automation: { min: 1, max: 1 },
      basic_automation: { min: 1.1, max: 1.15 },
      advanced_automation: { min: 1.2, max: 1.35 },
      compatibility_only: { min: 1, max: 1 },
      fixes_plus_improvements: { min: 1.1, max: 1.2 },
      release_support: { min: 1.2, max: 1.35 },
    },
    material_state: {
      ready: { min: 1, max: 1 },
      partial: { min: 1, max: 1 },
      in_progress: { min: 1.1, max: 1.2 },
      messy: { min: 1.15, max: 1.25 },
    },
  },
  postReleaseSupportAddons: {
    none: null,
    basic: { monthlyFrom: 200, includedHours: 4 },
    ongoing: { monthlyFrom: 550, includedHours: 10 },
  },
} as const;

export const vttEstimateInterpretations: Record<VttEstimateResult['resultKey'], Record<VttLocale, string>> = {
  content_small: {
    en: 'Suitable for a small module, quickstart, or one-shot with basic structure, scenes, journals, and game-ready content assembly.',
    ru: 'Подходит для небольшого модуля, quickstart или ваншота с базовой структурой, сценами, журналами и сборкой игрового контента.',
  },
  content_medium: {
    en: 'Suitable for a full adventure or mid-size release with multiple maps, journals, NPCs, items, and structured navigation.',
    ru: 'Подходит для полноценного приключения или среднего релиза с несколькими картами, журналами, NPC, предметами и навигацией.',
  },
  content_large: {
    en: 'Suitable for a large release, campaign, or complex adaptation with a high content volume and production assembly.',
    ru: 'Подходит для крупного релиза, кампании или сложной адаптации с большим объёмом контента и production-сборкой.',
  },
  system_roll20_sheet: {
    en: 'Suitable for a Roll20 character sheet with the core fields, rolls, and a practical structure for play.',
    ru: 'Подходит для листа персонажа Roll20 с основными полями, бросками и рабочей структурой для игры.',
  },
  system_foundry_mvp: {
    en: 'Suitable for a basic Foundry system with sheets, entities, key logic, and an initial working structure.',
    ru: 'Подходит для базовой Foundry-системы с листами, сущностями, ключевой логикой и первой рабочей структурой.',
  },
  system_production: {
    en: 'Suitable for a full production system with automation, advanced UX, documentation, and release preparation.',
    ru: 'Подходит для полноценной production-системы с автоматизацией, UX, документацией и подготовкой к релизу.',
  },
  support_one_time: {
    en: 'Suitable for one-time fixes, compatibility work, and focused technical corrections.',
    ru: 'Подходит для разовых исправлений, проверки совместимости и точечных технических задач.',
  },
  support_basic: {
    en: 'Suitable for basic care, small fixes, questions, and light maintenance.',
    ru: 'Подходит для базового сопровождения, небольших исправлений, вопросов и лёгкой поддержки.',
  },
  support_standard: {
    en: 'Suitable for regular maintenance, compatibility checks, planned fixes, and small improvements.',
    ru: 'Подходит для регулярного сопровождения, проверки совместимости, плановых исправлений и небольших улучшений.',
  },
  support_publisher: {
    en: 'Suitable for priority support, release patches, regression checks, and active post-release maintenance.',
    ru: 'Подходит для приоритетной поддержки, релизных патчей, регрессионных проверок и активного сопровождения.',
  },
};

function roundFriendly(value: number): number {
  if (value < 2000) {
    return Math.round(value / 50) * 50;
  }

  if (value <= 10000) {
    return Math.round(value / 100) * 100;
  }

  return Math.round(value / 500) * 500;
}

function applyMultiplier(range: BudgetRange, multiplier: MultiplierRange): BudgetRange {
  return {
    ...range,
    min: range.min * multiplier.min,
    max: range.max === null ? null : range.max * multiplier.max,
  };
}

function resolveContentSize(projectSize: VttProjectSize): 'small' | 'medium' | 'large' {
  if (projectSize === 'small' || projectSize === 'medium' || projectSize === 'large') {
    return projectSize;
  }

  return 'medium';
}

function resolveSystemBaseline(
  platform: VttPlatform,
  projectSize: VttProjectSize,
): {
  baselineKey: keyof typeof vttPricing.estimatorBaseline.new_system;
  resultKey: Extract<VttEstimateResult['resultKey'], 'system_roll20_sheet' | 'system_foundry_mvp' | 'system_production'>;
} {
  if (projectSize === 'production') {
    return { baselineKey: 'production', resultKey: 'system_production' };
  }

  if (platform === 'roll20') {
    return { baselineKey: 'roll20_sheet', resultKey: 'system_roll20_sheet' };
  }

  return { baselineKey: 'foundry_mvp', resultKey: 'system_foundry_mvp' };
}

function resolveSupportBaseline(projectSize: VttProjectSize): {
  baselineKey: keyof typeof vttPricing.estimatorBaseline.support;
  resultKey: Extract<
    VttEstimateResult['resultKey'],
    'support_one_time' | 'support_basic' | 'support_standard' | 'support_publisher'
  >;
} {
  switch (projectSize) {
    case 'one_time':
      return { baselineKey: 'one_time', resultKey: 'support_one_time' };
    case 'publisher_support':
      return { baselineKey: 'publisher', resultKey: 'support_publisher' };
    case 'standard_support':
      return { baselineKey: 'standard', resultKey: 'support_standard' };
    case 'basic_support':
      return { baselineKey: 'basic', resultKey: 'support_basic' };
    default:
      return { baselineKey: 'standard', resultKey: 'support_standard' };
  }
}

export function calculateVttEstimate(answers: VttEstimatorAnswers): VttEstimateResult {
  if (answers.serviceType === 'support') {
    const { baselineKey, resultKey } = resolveSupportBaseline(answers.projectSize);
    let range: BudgetRange = vttPricing.estimatorBaseline.support[baselineKey];

    if (baselineKey === 'one_time') {
      range = applyMultiplier(range, vttPricing.multipliers.complexity[answers.complexity]);
    }

    return {
      min: roundFriendly(range.min),
      max: range.max === null ? null : roundFriendly(range.max),
      recurring: Boolean(range.recurring),
      includedHours: range.includedHours,
      resultKey,
    };
  }

  if (answers.serviceType === 'new_system') {
    const { baselineKey, resultKey } = resolveSystemBaseline(answers.platform, answers.projectSize);
    let range: BudgetRange = vttPricing.estimatorBaseline.new_system[baselineKey];

    range = applyMultiplier(range, { min: vttPricing.multipliers.platform[answers.platform], max: vttPricing.multipliers.platform[answers.platform] });
    range = applyMultiplier(range, vttPricing.multipliers.complexity[answers.complexity]);
    range = applyMultiplier(range, vttPricing.multipliers.material_state[answers.materialState]);

    const supportAddon = answers.postReleaseSupport && answers.postReleaseSupport !== 'none'
      ? vttPricing.postReleaseSupportAddons[answers.postReleaseSupport]
      : undefined;

    return {
      min: roundFriendly(range.min),
      max: range.max === null ? null : roundFriendly(range.max),
      recurring: false,
      supportAddon: supportAddon || undefined,
      resultKey,
    };
  }

  const contentSize = resolveContentSize(answers.projectSize);
  let range: BudgetRange = vttPricing.estimatorBaseline.content_adaptation[contentSize];

  range = applyMultiplier(range, { min: vttPricing.multipliers.platform[answers.platform], max: vttPricing.multipliers.platform[answers.platform] });
  range = applyMultiplier(range, vttPricing.multipliers.complexity[answers.complexity]);
  range = applyMultiplier(range, vttPricing.multipliers.material_state[answers.materialState]);

  const supportAddon = answers.postReleaseSupport && answers.postReleaseSupport !== 'none'
    ? vttPricing.postReleaseSupportAddons[answers.postReleaseSupport]
    : undefined;

  const resultKey = contentSize === 'small'
    ? 'content_small'
    : contentSize === 'large'
      ? 'content_large'
      : 'content_medium';

  return {
    min: roundFriendly(range.min),
    max: range.max === null ? null : roundFriendly(range.max),
    recurring: false,
    supportAddon: supportAddon || undefined,
    resultKey,
  };
}

function formatNumber(value: number, locale: VttLocale): string {
  const separator = locale === 'ru' ? ' ' : ',';
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function formatCurrency(value: number, locale: VttLocale): string {
  return `€${formatNumber(value, locale)}`;
}

export function formatPublicStartRange(min: number, max: number, locale: VttLocale): string {
  const prefix = locale === 'ru' ? 'стартовый ориентир' : 'starting range';
  return `${prefix} ${formatCurrency(min, locale)}–${formatNumber(max, locale)}`;
}

export function formatMonthlySupport(from: number, includedHours: number, locale: VttLocale): string {
  return locale === 'ru'
    ? `от ${formatCurrency(from, locale)}/мес, до ${includedHours} часов`
    : `from ${formatCurrency(from, locale)}/month, up to ${includedHours} hours`;
}

export function formatBudgetRange(result: VttEstimateResult, locale: VttLocale): string {
  if (result.recurring) {
    return formatMonthlySupport(result.min, result.includedHours || 0, locale);
  }

  if (result.max === null) {
    return locale === 'ru'
      ? `от ${formatCurrency(result.min, locale)}`
      : `from ${formatCurrency(result.min, locale)}`;
  }

  return `${formatCurrency(result.min, locale)}–${formatNumber(result.max, locale)}`;
}

export function formatSupportAddon(
  addon: VttEstimateResult['supportAddon'],
  locale: VttLocale,
): string | undefined {
  if (!addon) return undefined;

  return locale === 'ru'
    ? `+ от ${formatCurrency(addon.monthlyFrom, locale)}/мес${addon.includedHours ? `, до ${addon.includedHours} часов` : ''}`
    : `+ from ${formatCurrency(addon.monthlyFrom, locale)}/month${addon.includedHours ? `, up to ${addon.includedHours} hours` : ''}`;
}
