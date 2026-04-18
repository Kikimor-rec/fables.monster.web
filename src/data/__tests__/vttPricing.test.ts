import { describe, expect, it } from 'vitest';
import {
  calculateVttEstimate,
  formatBudgetRange,
  formatMonthlySupport,
  formatPublicStartRange,
  formatSupportAddon,
} from '../vttPricing';

describe('vttPricing', () => {
  it('formats public start ranges for RU and EN', () => {
    expect(formatPublicStartRange(750, 900, 'ru')).toBe('стартовый ориентир €750–900');
    expect(formatPublicStartRange(2000, 2400, 'en')).toBe('starting range €2,000–2,400');
  });

  it('estimates a small content adaptation', () => {
    const result = calculateVttEstimate({
      serviceType: 'content_adaptation',
      platform: 'foundry',
      projectSize: 'small',
      complexity: 'no_automation',
      materialState: 'ready',
      postReleaseSupport: 'none',
    });

    expect(result.resultKey).toBe('content_small');
    expect(formatBudgetRange(result, 'ru')).toBe('€750–1 500');
  });

  it('estimates a medium content adaptation', () => {
    const result = calculateVttEstimate({
      serviceType: 'content_adaptation',
      platform: 'roll20',
      projectSize: 'medium',
      complexity: 'no_automation',
      materialState: 'partial',
      postReleaseSupport: 'none',
    });

    expect(result.resultKey).toBe('content_medium');
    expect(formatBudgetRange(result, 'en')).toBe('€2,000–4,000');
  });

  it('applies both-platform multiplier and friendly rounding', () => {
    const result = calculateVttEstimate({
      serviceType: 'content_adaptation',
      platform: 'both',
      projectSize: 'medium',
      complexity: 'basic_automation',
      materialState: 'partial',
      postReleaseSupport: 'none',
    });

    expect(formatBudgetRange(result, 'en')).toBe('€3,600–7,600');
  });

  it('keeps large content adaptation open-ended', () => {
    const result = calculateVttEstimate({
      serviceType: 'content_adaptation',
      platform: 'foundry',
      projectSize: 'large',
      complexity: 'advanced_automation',
      materialState: 'messy',
      postReleaseSupport: 'none',
    });

    expect(result.resultKey).toBe('content_large');
    expect(formatBudgetRange(result, 'ru')).toBe('от €6 900');
  });

  it('maps Roll20 MVP system work to character sheet pricing', () => {
    const result = calculateVttEstimate({
      serviceType: 'new_system',
      platform: 'roll20',
      projectSize: 'mvp',
      complexity: 'no_automation',
      materialState: 'ready',
      postReleaseSupport: 'none',
    });

    expect(result.resultKey).toBe('system_roll20_sheet');
    expect(formatBudgetRange(result, 'en')).toBe('€2,500–5,000');
  });

  it('maps Foundry MVP system work to Foundry system pricing', () => {
    const result = calculateVttEstimate({
      serviceType: 'new_system',
      platform: 'foundry',
      projectSize: 'mvp',
      complexity: 'no_automation',
      materialState: 'ready',
      postReleaseSupport: 'none',
    });

    expect(result.resultKey).toBe('system_foundry_mvp');
    expect(formatBudgetRange(result, 'ru')).toBe('€4 500–9 000');
  });

  it('keeps production system pricing open-ended', () => {
    const result = calculateVttEstimate({
      serviceType: 'new_system',
      platform: 'foundry',
      projectSize: 'production',
      complexity: 'basic_automation',
      materialState: 'in_progress',
      postReleaseSupport: 'none',
    });

    expect(result.resultKey).toBe('system_production');
    expect(formatBudgetRange(result, 'en')).toBe('from €12,000');
  });

  it('formats monthly support with included hours', () => {
    const result = calculateVttEstimate({
      serviceType: 'support',
      platform: 'foundry',
      projectSize: 'standard_support',
      complexity: 'fixes_plus_improvements',
      materialState: 'partial',
    });

    expect(result.resultKey).toBe('support_standard');
    expect(formatBudgetRange(result, 'ru')).toBe('от €550/мес, до 10 часов');
    expect(formatMonthlySupport(950, 20, 'en')).toBe('from €950/month, up to 20 hours');
  });

  it('applies complexity to one-time support fixes', () => {
    const result = calculateVttEstimate({
      serviceType: 'support',
      platform: 'roll20',
      projectSize: 'one_time',
      complexity: 'release_support',
      materialState: 'partial',
    });

    expect(result.resultKey).toBe('support_one_time');
    expect(formatBudgetRange(result, 'en')).toBe('€200–700');
  });

  it('adds post-release support notes to project estimates', () => {
    const result = calculateVttEstimate({
      serviceType: 'content_adaptation',
      platform: 'foundry',
      projectSize: 'small',
      complexity: 'no_automation',
      materialState: 'ready',
      postReleaseSupport: 'basic',
    });

    expect(formatSupportAddon(result.supportAddon, 'ru')).toBe('+ от €200/мес, до 4 часов');
  });
});
