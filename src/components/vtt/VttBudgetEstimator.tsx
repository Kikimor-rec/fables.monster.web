"use client";

import { useMemo, useState } from 'react';
import {
  calculateVttEstimate,
  formatBudgetRange,
  formatSupportAddon,
  vttEstimateInterpretations,
  type VttComplexity,
  type VttEstimateResult,
  type VttEstimatorAnswers,
  type VttLocale,
  type VttMaterialState,
  type VttPlatform,
  type VttPostReleaseSupport,
  type VttProjectSize,
  type VttServiceType,
} from '@/data/vttPricing';
import { trackEvent } from '@/lib/analytics';
import {
  VTT_ESTIMATE_EVENT,
  VTT_ESTIMATE_STORAGE_KEY,
  type VttEstimateLeadData,
} from './vttEstimateBridge';

export interface VttEstimatorContent {
  title: string;
  intro: string;
  launchButton: string;
  resultTitle: string;
  resultCta: string;
  disclaimer: string;
  backButton: string;
  restartButton: string;
  stepLabel: string;
}

type StepId =
  | 'serviceType'
  | 'platform'
  | 'projectSize'
  | 'complexity'
  | 'materialState'
  | 'postReleaseSupport';

interface WizardStep {
  id: StepId;
  label: string;
}

interface Option<T extends string = string> {
  key: T;
  label: string;
  hint?: string;
}

const baseSteps: StepId[] = [
  'serviceType',
  'platform',
  'projectSize',
  'complexity',
  'materialState',
  'postReleaseSupport',
];

const labels = {
  en: {
    steps: {
      serviceType: 'What do you need?',
      platform: 'Which platform?',
      projectSize: 'What is the project size?',
      complexity: 'What level of implementation do you need?',
      materialState: 'What is the state of your materials?',
      postReleaseSupport: 'Do you need support after release?',
    },
    supportNote: 'Support add-on',
    serviceType: {
      content_adaptation: 'Adapt content to an existing system',
      new_system: 'Create a new system',
      support: 'Support and updates',
    },
    platform: {
      foundry: 'Foundry VTT',
      roll20: 'Roll20',
      both: 'Both platforms',
    },
    sizes: {
      content: {
        small: 'Small module / one-shot',
        medium: 'Full adventure',
        large: 'Large release / campaign',
        unsure: 'Not sure yet',
      },
      system: {
        mvp: 'Basic system / MVP',
        roll20Mvp: 'Roll20 character sheet',
        foundryMvp: 'Foundry system MVP',
        bothMvp: 'Multi-platform MVP',
        production: 'Custom system production',
        unsure: 'Not sure yet',
      },
      support: {
        one_time: 'One-time fixes',
        basic_support: 'Basic care',
        standard_support: 'Standard support',
        publisher_support: 'Publisher support',
      },
    },
    complexity: {
      no_automation: 'No, just clean structure',
      basic_automation: 'Basic automation',
      advanced_automation: 'Advanced automation',
      compatibility_only: 'Compatibility and bugfixes only',
      fixes_plus_improvements: 'Bugfixes and small improvements',
      release_support: 'Active release support',
    },
    materialState: {
      ready: 'Everything is ready and well-structured',
      partial: 'We have a PDF and some assets',
      in_progress: 'Materials are still in progress',
      messy: 'We need help assembling and organizing everything',
    },
    postReleaseSupport: {
      none: 'No',
      basic: 'Basic support',
      ongoing: 'Ongoing support',
    },
  },
  ru: {
    steps: {
      serviceType: 'Что нужно сделать?',
      platform: 'Какая платформа?',
      projectSize: 'Какой размер проекта?',
      complexity: 'Какой уровень реализации нужен?',
      materialState: 'В каком состоянии материалы?',
      postReleaseSupport: 'Нужна поддержка после релиза?',
    },
    supportNote: 'Поддержка',
    serviceType: {
      content_adaptation: 'Адаптировать контент под существующую систему',
      new_system: 'Создать новую систему',
      support: 'Поддержка и обновления',
    },
    platform: {
      foundry: 'Foundry VTT',
      roll20: 'Roll20',
      both: 'Обе платформы',
    },
    sizes: {
      content: {
        small: 'Малый модуль / ваншот',
        medium: 'Полноценное приключение',
        large: 'Крупный релиз / кампания',
        unsure: 'Пока не знаю',
      },
      system: {
        mvp: 'Базовая система / MVP',
        roll20Mvp: 'Лист персонажа Roll20',
        foundryMvp: 'Foundry system MVP',
        bothMvp: 'MVP для двух платформ',
        production: 'Custom system production',
        unsure: 'Пока не знаю',
      },
      support: {
        one_time: 'Разовые исправления',
        basic_support: 'Basic care',
        standard_support: 'Standard support',
        publisher_support: 'Publisher support',
      },
    },
    complexity: {
      no_automation: 'Без автоматизации, чистая структура',
      basic_automation: 'Базовая автоматизация',
      advanced_automation: 'Продвинутая автоматизация',
      compatibility_only: 'Только совместимость и багфиксы',
      fixes_plus_improvements: 'Багфиксы и небольшие улучшения',
      release_support: 'Активное сопровождение релиза',
    },
    materialState: {
      ready: 'Всё готово и хорошо структурировано',
      partial: 'Есть PDF и часть ассетов',
      in_progress: 'Материалы ещё в работе',
      messy: 'Нужно помочь собрать и организовать материалы',
    },
    postReleaseSupport: {
      none: 'Нет',
      basic: 'Базовая поддержка',
      ongoing: 'Регулярная поддержка',
    },
  },
} as const;

function getVisibleSteps(serviceType?: VttServiceType): StepId[] {
  if (serviceType === 'support') {
    return baseSteps.filter((step) => step !== 'postReleaseSupport');
  }

  return baseSteps;
}

function getSystemMvpLabel(platform: VttPlatform | undefined, locale: VttLocale) {
  if (platform === 'roll20') return labels[locale].sizes.system.roll20Mvp;
  if (platform === 'both') return labels[locale].sizes.system.bothMvp;
  return labels[locale].sizes.system.foundryMvp;
}

function getOptions(stepId: StepId, answers: Partial<VttEstimatorAnswers>, locale: VttLocale): Option[] {
  const copy = labels[locale];

  switch (stepId) {
    case 'serviceType':
      return [
        { key: 'content_adaptation', label: copy.serviceType.content_adaptation },
        { key: 'new_system', label: copy.serviceType.new_system },
        { key: 'support', label: copy.serviceType.support },
      ];
    case 'platform':
      return [
        { key: 'foundry', label: copy.platform.foundry },
        { key: 'roll20', label: copy.platform.roll20 },
        { key: 'both', label: copy.platform.both },
      ];
    case 'projectSize':
      if (answers.serviceType === 'new_system') {
        return [
          { key: 'mvp', label: getSystemMvpLabel(answers.platform, locale) },
          { key: 'production', label: copy.sizes.system.production },
          { key: 'unsure', label: copy.sizes.system.unsure },
        ];
      }

      if (answers.serviceType === 'support') {
        return [
          { key: 'one_time', label: copy.sizes.support.one_time },
          { key: 'basic_support', label: copy.sizes.support.basic_support },
          { key: 'standard_support', label: copy.sizes.support.standard_support },
          { key: 'publisher_support', label: copy.sizes.support.publisher_support },
        ];
      }

      return [
        { key: 'small', label: copy.sizes.content.small },
        { key: 'medium', label: copy.sizes.content.medium },
        { key: 'large', label: copy.sizes.content.large },
        { key: 'unsure', label: copy.sizes.content.unsure },
      ];
    case 'complexity':
      if (answers.serviceType === 'support') {
        return [
          { key: 'compatibility_only', label: copy.complexity.compatibility_only },
          { key: 'fixes_plus_improvements', label: copy.complexity.fixes_plus_improvements },
          { key: 'release_support', label: copy.complexity.release_support },
        ];
      }

      return [
        { key: 'no_automation', label: copy.complexity.no_automation },
        { key: 'basic_automation', label: copy.complexity.basic_automation },
        { key: 'advanced_automation', label: copy.complexity.advanced_automation },
      ];
    case 'materialState':
      return [
        { key: 'ready', label: copy.materialState.ready },
        { key: 'partial', label: copy.materialState.partial },
        { key: 'in_progress', label: copy.materialState.in_progress },
        { key: 'messy', label: copy.materialState.messy },
      ];
    case 'postReleaseSupport':
      return [
        { key: 'none', label: copy.postReleaseSupport.none },
        { key: 'basic', label: copy.postReleaseSupport.basic },
        { key: 'ongoing', label: copy.postReleaseSupport.ongoing },
      ];
    default:
      return [];
  }
}

function getStepValue(stepId: StepId, answers: Partial<VttEstimatorAnswers>) {
  switch (stepId) {
    case 'serviceType':
      return answers.serviceType;
    case 'platform':
      return answers.platform;
    case 'projectSize':
      return answers.projectSize;
    case 'complexity':
      return answers.complexity;
    case 'materialState':
      return answers.materialState;
    case 'postReleaseSupport':
      return answers.postReleaseSupport;
    default:
      return undefined;
  }
}

function isComplete(answers: Partial<VttEstimatorAnswers>): answers is VttEstimatorAnswers {
  if (!answers.serviceType || !answers.platform || !answers.projectSize || !answers.complexity || !answers.materialState) {
    return false;
  }

  return answers.serviceType === 'support' || Boolean(answers.postReleaseSupport);
}

function getOptionLabel(stepId: StepId, value: string | undefined, answers: Partial<VttEstimatorAnswers>, locale: VttLocale) {
  if (!value) return '';
  return getOptions(stepId, answers, locale).find((option) => option.key === value)?.label || value;
}

function buildLeadData(
  answers: VttEstimatorAnswers,
  result: VttEstimateResult,
  locale: VttLocale,
): VttEstimateLeadData {
  const estimatedRange = formatBudgetRange(result, locale);
  const supportNote = formatSupportAddon(result.supportAddon, locale);

  return {
    service_type: answers.serviceType,
    service_type_label: getOptionLabel('serviceType', answers.serviceType, answers, locale),
    platform: answers.platform,
    platform_label: getOptionLabel('platform', answers.platform, answers, locale),
    project_size: answers.projectSize,
    project_size_label: getOptionLabel('projectSize', answers.projectSize, answers, locale),
    automation_level: answers.complexity,
    automation_level_label: getOptionLabel('complexity', answers.complexity, answers, locale),
    material_state: answers.materialState,
    material_state_label: getOptionLabel('materialState', answers.materialState, answers, locale),
    post_release_support: answers.postReleaseSupport,
    post_release_support_label: getOptionLabel('postReleaseSupport', answers.postReleaseSupport, answers, locale),
    estimated_range: estimatedRange,
    support_note: supportNote,
    support_hours: result.includedHours ? String(result.includedHours) : undefined,
  };
}

function publishEstimate(data: VttEstimateLeadData) {
  if (typeof window === 'undefined') return;

  window.sessionStorage.setItem(VTT_ESTIMATE_STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent<VttEstimateLeadData>(VTT_ESTIMATE_EVENT, { detail: data }));
}

function updateAnswers(
  answers: Partial<VttEstimatorAnswers>,
  stepId: StepId,
  value: string,
): Partial<VttEstimatorAnswers> {
  if (stepId === 'serviceType') {
    return { serviceType: value as VttServiceType };
  }

  if (stepId === 'platform') {
    return {
      ...answers,
      platform: value as VttPlatform,
      projectSize: answers.serviceType === 'new_system' ? undefined : answers.projectSize,
    };
  }

  if (stepId === 'projectSize') {
    return { ...answers, projectSize: value as VttProjectSize };
  }

  if (stepId === 'complexity') {
    return { ...answers, complexity: value as VttComplexity };
  }

  if (stepId === 'materialState') {
    return { ...answers, materialState: value as VttMaterialState };
  }

  return { ...answers, postReleaseSupport: value as VttPostReleaseSupport };
}

export default function VttBudgetEstimator({
  estimator,
  lang,
  sectionLabel = '03',
}: {
  estimator: VttEstimatorContent;
  lang: string;
  sectionLabel?: string;
}) {
  const locale: VttLocale = lang === 'ru' ? 'ru' : 'en';
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<VttEstimatorAnswers>>({});
  const [result, setResult] = useState<VttEstimateResult | null>(null);

  const steps = useMemo<WizardStep[]>(() => {
    return getVisibleSteps(answers.serviceType).map((id) => ({
      id,
      label: labels[locale].steps[id],
    }));
  }, [answers.serviceType, locale]);

  const safeIndex = Math.min(currentIndex, steps.length - 1);
  const currentStep = steps[safeIndex];
  const options = currentStep ? getOptions(currentStep.id, answers, locale) : [];
  const selectedValue = currentStep ? getStepValue(currentStep.id, answers) : undefined;

  const start = () => {
    setStarted(true);
    setResult(null);
    trackEvent('calculator_open');
  };

  const restart = () => {
    setAnswers({});
    setResult(null);
    setCurrentIndex(0);
    setStarted(true);
  };

  const goBack = () => {
    setResult(null);
    setCurrentIndex((index) => Math.max(0, index - 1));
  };

  const selectOption = (stepId: StepId, value: string) => {
    const nextAnswers = updateAnswers(answers, stepId, value);
    const nextSteps = getVisibleSteps(nextAnswers.serviceType);
    const nextIndex = Math.min(safeIndex + 1, nextSteps.length - 1);

    setAnswers(nextAnswers);
    setResult(null);
    trackEvent(`calculator_step_${safeIndex + 1}_complete`, {
      step: stepId,
      value,
      service_type: nextAnswers.serviceType,
    });

    if (safeIndex >= nextSteps.length - 1 && isComplete(nextAnswers)) {
      const estimate = calculateVttEstimate(nextAnswers);
      const leadData = buildLeadData(nextAnswers, estimate, locale);

      setResult(estimate);
      publishEstimate(leadData);
      trackEvent('calculator_result_shown', {
        service_type: nextAnswers.serviceType,
        platform: nextAnswers.platform,
        range_bucket: estimate.resultKey,
      });
      return;
    }

    setCurrentIndex(nextIndex);
  };

  const resultRange = result ? formatBudgetRange(result, locale) : '';
  const supportAddon = result ? formatSupportAddon(result.supportAddon, locale) : undefined;

  return (
    <section className="fm-section fm-section-bordered" id="vtt-estimator">
      <div className="fm-shell">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="fm-page-kicker mb-4">{sectionLabel} / ESTIMATOR</p>
            <h2 className="fm-section-title font-bold text-white font-orbitron">{estimator.title}</h2>
            <p className="mt-5 font-rajdhani text-xl leading-relaxed text-zinc-300">{estimator.intro}</p>

            {!started && (
              <button
                type="button"
                onClick={start}
                className="mt-8 inline-flex border border-red-500 bg-red-700 px-6 py-4 font-orbitron font-bold text-white transition-colors hover:bg-red-600"
              >
                {estimator.launchButton}
              </button>
            )}
          </div>

          <div className="border border-zinc-800 bg-black/85 p-5 sm:p-6">
            {!started && (
              <div className="min-h-[300px] border border-cyan-900/35 bg-cyan-950/10 p-6">
                <p className="font-orbitron text-sm uppercase tracking-[0.2em] text-cyan-300">Budget signal idle</p>
                <p className="mt-6 max-w-xl font-rajdhani text-lg leading-relaxed text-zinc-300">
                  {estimator.intro}
                </p>
              </div>
            )}

            {started && !result && currentStep && (
              <div>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <p className="font-orbitron text-xs uppercase tracking-[0.2em] text-cyan-300">
                    {estimator.stepLabel} {safeIndex + 1} / {steps.length}
                  </p>
                  <button
                    type="button"
                    onClick={restart}
                    className="font-orbitron text-xs uppercase tracking-[0.16em] text-zinc-500 transition-colors hover:text-zinc-200"
                  >
                    {estimator.restartButton}
                  </button>
                </div>

                <h3 className="mb-6 text-2xl font-orbitron text-white">{currentStep.label}</h3>

                <div className="grid gap-3">
                  {options.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => selectOption(currentStep.id, option.key)}
                      className={`border px-5 py-4 text-left transition-colors ${
                        selectedValue === option.key
                          ? 'border-red-500 bg-red-950/35 text-white'
                          : 'border-zinc-800 bg-zinc-950/70 text-zinc-200 hover:border-cyan-600 hover:bg-cyan-950/20'
                      }`}
                    >
                      <span className="block font-orbitron text-sm">{option.label}</span>
                      {option.hint && <span className="mt-1 block font-rajdhani text-sm text-zinc-400">{option.hint}</span>}
                    </button>
                  ))}
                </div>

                {safeIndex > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="mt-6 inline-flex border border-zinc-700 px-4 py-2 font-orbitron text-xs uppercase tracking-[0.16em] text-zinc-300 transition-colors hover:border-zinc-400 hover:text-white"
                  >
                    {estimator.backButton}
                  </button>
                )}
              </div>
            )}

            {started && result && (
              <div aria-live="polite" className="border border-red-900/55 bg-red-950/15 p-6">
                <p className="fm-page-kicker mb-4">{estimator.resultTitle}</p>
                <h3 className="mb-5 text-3xl font-orbitron text-white">{resultRange}</h3>
                <p className="font-rajdhani text-xl leading-relaxed text-zinc-200">
                  {vttEstimateInterpretations[result.resultKey][locale]}
                </p>
                {supportAddon && (
                  <p className="mt-4 inline-flex border border-cyan-800/60 bg-cyan-950/20 px-3 py-2 font-rajdhani text-cyan-100">
                    {labels[locale].supportNote}: {supportAddon}
                  </p>
                )}
                <p className="mt-6 border-t border-zinc-800 pt-5 font-rajdhani text-zinc-400">
                  {estimator.disclaimer}
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#vtt-brief-form"
                    className="inline-flex justify-center border border-red-500 bg-red-700 px-5 py-3 font-orbitron font-bold text-white transition-colors hover:bg-red-600"
                  >
                    {estimator.resultCta}
                  </a>
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex justify-center border border-zinc-700 px-5 py-3 font-orbitron font-bold text-zinc-300 transition-colors hover:border-zinc-400 hover:text-white"
                  >
                    {estimator.restartButton}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
