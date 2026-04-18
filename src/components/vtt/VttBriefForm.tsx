"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import StructuredInquiryForm, {
  type InquiryField,
  type InquiryHiddenField,
} from '@/components/StructuredInquiryForm';
import { trackEvent } from '@/lib/analytics';
import {
  VTT_ESTIMATE_EVENT,
  VTT_ESTIMATE_STORAGE_KEY,
  type VttEstimateLeadData,
} from './vttEstimateBridge';

interface VttFormContent {
  title: string;
  context: string;
  subject: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  fields: InquiryField[];
}

const hiddenLabels = {
  en: {
    service_type: 'Service type',
    platform: 'Platform',
    project_size: 'Project size',
    automation_level: 'Implementation level',
    material_state: 'Material state',
    post_release_support: 'Post-release support',
    estimated_range: 'Displayed budget range',
    support_note: 'Support note',
    support_hours: 'Included support hours',
    estimateSummary: 'Estimator result',
  },
  ru: {
    service_type: 'Тип услуги',
    platform: 'Платформа',
    project_size: 'Размер проекта',
    automation_level: 'Уровень реализации',
    material_state: 'Состояние материалов',
    post_release_support: 'Поддержка после релиза',
    estimated_range: 'Показанный диапазон бюджета',
    support_note: 'Примечание о поддержке',
    support_hours: 'Включённые часы поддержки',
    estimateSummary: 'Результат estimator',
  },
} as const;

function readStoredEstimate(): VttEstimateLeadData | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.sessionStorage.getItem(VTT_ESTIMATE_STORAGE_KEY);
    return stored ? JSON.parse(stored) as VttEstimateLeadData : null;
  } catch {
    return null;
  }
}

function buildHiddenFields(estimate: VttEstimateLeadData | null, lang: string): InquiryHiddenField[] {
  if (!estimate) return [];

  const locale = lang === 'ru' ? 'ru' : 'en';
  const labels = hiddenLabels[locale];

  return [
    { name: 'service_type', label: labels.service_type, value: estimate.service_type_label || estimate.service_type },
    { name: 'platform', label: labels.platform, value: estimate.platform_label || estimate.platform },
    { name: 'project_size', label: labels.project_size, value: estimate.project_size_label || estimate.project_size },
    { name: 'automation_level', label: labels.automation_level, value: estimate.automation_level_label || estimate.automation_level },
    { name: 'material_state', label: labels.material_state, value: estimate.material_state_label || estimate.material_state },
    { name: 'post_release_support', label: labels.post_release_support, value: estimate.post_release_support_label },
    { name: 'estimated_range', label: labels.estimated_range, value: estimate.estimated_range },
    { name: 'support_note', label: labels.support_note, value: estimate.support_note },
    { name: 'support_hours', label: labels.support_hours, value: estimate.support_hours },
  ];
}

export default function VttBriefForm({
  lang,
  stepLabel,
  cta,
  ctaPrimary,
  ctaSecondary,
  ctaVariant,
  futurePackages,
  form,
}: {
  lang: string;
  stepLabel: string;
  cta: {
    title: string;
    text: string;
  };
  ctaPrimary: string;
  ctaSecondary: string;
  ctaVariant?: string;
  futurePackages?: string[];
  form: VttFormContent;
}) {
  const [estimate, setEstimate] = useState<VttEstimateLeadData | null>(null);
  const locale = lang === 'ru' ? 'ru' : 'en';

  useEffect(() => {
    setEstimate(readStoredEstimate());

    const handleEstimate = (event: Event) => {
      const detail = (event as CustomEvent<VttEstimateLeadData>).detail;
      setEstimate(detail);
    };

    window.addEventListener(VTT_ESTIMATE_EVENT, handleEstimate);
    return () => window.removeEventListener(VTT_ESTIMATE_EVENT, handleEstimate);
  }, []);

  const hiddenFields = useMemo(() => buildHiddenFields(estimate, lang), [estimate, lang]);

  return (
    <section id="vtt-brief" className="fm-section fm-section-bordered scroll-mt-28">
      <div className="fm-shell grid lg:grid-cols-[0.86fr_1.14fr] gap-6 lg:gap-8 items-start">
        <FadeIn>
          <div className="fm-panel h-full" data-cta-variant={ctaVariant || 'default'}>
            <p className="fm-page-kicker mb-4">{stepLabel} / BRIEF</p>
            <h2 className="text-3xl md:text-4xl font-orbitron text-white mb-4">{cta.title}</h2>
            <p className="font-rajdhani text-zinc-300 text-lg leading-relaxed mb-6">{cta.text}</p>

            {estimate && (
              <div className="mb-6 border border-cyan-900/55 bg-cyan-950/15 p-4">
                <p className="font-orbitron text-xs uppercase tracking-[0.18em] text-cyan-300">
                  {hiddenLabels[locale].estimateSummary}
                </p>
                <p className="mt-2 font-rajdhani text-xl text-white">{estimate.estimated_range}</p>
                {estimate.support_note && (
                  <p className="mt-1 font-rajdhani text-sm text-cyan-100">{estimate.support_note}</p>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href="#vtt-brief-form" className="inline-flex justify-center bg-red-700 hover:bg-red-600 text-white px-5 py-3 font-orbitron font-bold transition-colors border border-red-500">
                {ctaPrimary}
              </a>
              <Link href={`/${lang}/contact`} className="inline-flex justify-center border border-cyan-700/70 text-cyan-300 hover:text-white hover:border-cyan-400 px-5 py-3 font-orbitron font-bold transition-colors">
                {ctaSecondary}
              </Link>
            </div>

            {futurePackages && futurePackages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {futurePackages.map((packageName) => (
                  <span key={packageName} className="fm-chip">
                    {packageName}
                  </span>
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div id="vtt-brief-form">
            <StructuredInquiryForm
              title={form.title}
              context={form.context}
              subject={form.subject}
              fields={form.fields}
              hiddenFields={hiddenFields}
              submitLabel={form.submit}
              sendingLabel={form.sending}
              successMessage={form.success}
              errorMessage={form.error}
              onSubmitSuccess={() => trackEvent('calculator_lead_submitted', {
                service_type: estimate?.service_type,
                platform: estimate?.platform,
                estimated_range: estimate?.estimated_range,
              })}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
