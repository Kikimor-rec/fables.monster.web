import {
  formatMonthlySupport,
  formatPublicStartRange,
  vttPricing,
  type VttLocale,
} from '@/data/vttPricing';

export interface VttPricingCardContent {
  id: string;
  priceKey: string;
  title: string;
  text: string;
}

export interface VttPricingGroupContent {
  id: string;
  title: string;
  cards: VttPricingCardContent[];
}

export interface VttPricingContent {
  title: string;
  intro: string;
  noteTitle: string;
  noteText: string;
  supportNote?: string;
  groups: VttPricingGroupContent[];
}

function resolvePriceLabel(priceKey: string, locale: VttLocale) {
  const [category, item] = priceKey.split('.');

  if (category === 'content_adaptation') {
    const price = vttPricing.publicPackages.content_adaptation[
      item as keyof typeof vttPricing.publicPackages.content_adaptation
    ];
    return price ? formatPublicStartRange(price.startMin, price.startMax, locale) : '';
  }

  if (category === 'new_system') {
    const price = vttPricing.publicPackages.new_system[
      item as keyof typeof vttPricing.publicPackages.new_system
    ];
    return price ? formatPublicStartRange(price.startMin, price.startMax, locale) : '';
  }

  if (category === 'support') {
    const price = vttPricing.publicPackages.support[
      item as keyof typeof vttPricing.publicPackages.support
    ];
    return price ? formatMonthlySupport(price.monthlyFrom, price.includedHours, locale) : '';
  }

  return '';
}

export default function VttPricingPackages({
  pricing,
  lang,
  sectionLabel = '02',
}: {
  pricing: VttPricingContent;
  lang: string;
  sectionLabel?: string;
}) {
  const locale: VttLocale = lang === 'ru' ? 'ru' : 'en';

  return (
    <section className="fm-section fm-section-bordered" id="vtt-pricing">
      <div className="fm-shell">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="fm-page-kicker mb-4">{sectionLabel} / BUDGET</p>
            <h2 className="fm-section-title font-bold text-white font-orbitron">{pricing.title}</h2>
          </div>
          <p className="border-l border-cyan-700/50 pl-6 font-rajdhani text-xl leading-relaxed text-zinc-300">
            {pricing.intro}
          </p>
        </div>

        <div className="grid gap-6">
          {pricing.groups.map((group, groupIndex) => (
            <article key={group.id} className="border border-zinc-800 bg-black/70">
              <div className="border-b border-zinc-800 px-5 py-4">
                <p className="text-[10px] font-orbitron uppercase tracking-[0.22em] text-cyan-300">
                  {String(groupIndex + 1).padStart(2, '0')} / {group.id.replace(/_/g, ' ')}
                </p>
                <h3 className="mt-2 text-2xl font-orbitron text-white">{group.title}</h3>
              </div>

              <div className="grid gap-4 p-4 lg:grid-cols-3">
                {group.cards.map((card) => (
                  <div key={card.id} className="flex h-full flex-col border border-zinc-800 bg-zinc-950/80 p-5">
                    <p className="mb-4 inline-flex w-fit border border-red-900/70 bg-red-950/20 px-3 py-1 font-orbitron text-xs uppercase tracking-[0.14em] text-red-100">
                      {resolvePriceLabel(card.priceKey, locale)}
                    </p>
                    <h4 className="mb-3 text-xl font-orbitron text-white">{card.title}</h4>
                    <p className="font-rajdhani text-zinc-300 leading-relaxed">{card.text}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 border border-cyan-900/45 bg-cyan-950/10 p-5 lg:grid-cols-[0.34fr_1fr]">
          <h3 className="font-orbitron text-lg text-white">{pricing.noteTitle}</h3>
          <div className="font-rajdhani text-zinc-300 leading-relaxed">
            <p>{pricing.noteText}</p>
            {pricing.supportNote && <p className="mt-3 text-cyan-100">{pricing.supportNote}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
