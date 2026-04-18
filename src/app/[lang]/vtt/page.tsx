import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import FadeIn from '@/components/FadeIn';
import type { InquiryField } from '@/components/StructuredInquiryForm';
import VttPlaceholderVisual from '@/components/VttPlaceholderVisual';
import VttBudgetEstimator, { type VttEstimatorContent } from '@/components/vtt/VttBudgetEstimator';
import VttBriefForm from '@/components/vtt/VttBriefForm';
import VttPricingPackages, { type VttPricingContent } from '@/components/vtt/VttPricingPackages';
import { getContent } from '@/lib/content';
import { buildSocialMetadata } from '@/lib/metadata';

export const revalidate = 3600;

interface VttTextBlock {
  title: string;
  text: string;
}

interface VttVisualItem {
  src: string;
  alt?: string;
  caption?: string;
}

interface VttDemoBlock extends VttTextBlock {
  embedUrl: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

interface VttHeroBlock extends VttTextBlock {
  kicker: string;
  button: string;
  visual?: string;
  visuals?: VttVisualItem[];
  demo?: VttDemoBlock;
}

interface VttDirection extends VttTextBlock {
  id: 'systems' | 'content' | 'support';
  visual?: string;
}

interface VttProductionLayer extends VttTextBlock {
  visual?: string;
}

interface VttCtaVariant {
  id: string;
  primary: string;
  secondary: string;
}

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

interface VttPageContent {
  meta?: {
    title?: string;
    description?: string;
  };
  hero: VttHeroBlock;
  overview: VttTextBlock;
  pricing?: VttPricingContent;
  estimator?: VttEstimatorContent;
  directionsTitle?: string;
  directions: VttDirection[];
  productionLayers?: VttProductionLayer[];
  result: VttTextBlock;
  materials: VttTextBlock;
  process: VttTextBlock;
  publishing: VttTextBlock;
  supportBlock: VttTextBlock;
  cta: VttTextBlock & {
    variant?: string;
    primary: string;
    secondary: string;
  };
  ctaVariants?: VttCtaVariant[];
  futurePackages?: string[];
  form: VttFormContent;
}

function LightboxImage({
  id,
  src,
  alt,
  caption,
  className = '',
  imageClassName = 'object-cover',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  unoptimized = false,
  openLabel,
  closeLabel,
}: {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
  openLabel: string;
  closeLabel: string;
}) {
  const targetId = `vtt-lightbox-${id}`;

  return (
    <>
      <a
        href={`#${targetId}`}
        className={`group relative block overflow-hidden bg-black ${className}`}
        aria-label={`${openLabel}: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={imageClassName}
          sizes={sizes}
          priority={priority}
          unoptimized={unoptimized}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute right-3 top-3 border border-white/20 bg-black/70 px-2 py-1 text-[9px] font-orbitron uppercase tracking-[0.18em] text-white opacity-0 transition-opacity group-hover:opacity-100">
          {openLabel}
        </span>
        {caption && (
          <span className="absolute bottom-3 left-3 border border-cyan-800/70 bg-black/75 px-3 py-1 text-[10px] font-orbitron uppercase tracking-[0.18em] text-cyan-200">
            {caption}
          </span>
        )}
      </a>

      <div
        id={targetId}
        className="fixed inset-0 z-[80] hidden items-center justify-center bg-black/92 p-4 target:flex sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={alt}
      >
        <a
          href="#vtt-lightbox-close"
          className="absolute inset-0"
          aria-label={closeLabel}
        />
        <a
          href="#vtt-lightbox-close"
          className="absolute right-4 top-4 z-10 border border-zinc-700 bg-black/80 px-4 py-2 font-orbitron text-xs uppercase tracking-[0.18em] text-white transition-colors hover:border-red-500 hover:text-red-200"
        >
          {closeLabel}
        </a>
        <div className="relative z-10 h-[82vh] w-full max-w-6xl border border-zinc-800 bg-black">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="100vw"
            unoptimized={unoptimized}
          />
          {caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/75 px-4 py-3 font-rajdhani text-sm text-zinc-200">
              {caption}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function VttScreenshotStack({
  title,
  fallbackSrc,
  visuals,
  openLabel,
  closeLabel,
}: {
  title: string;
  fallbackSrc?: string;
  visuals?: VttVisualItem[];
  openLabel: string;
  closeLabel: string;
}) {
  const items = visuals?.filter((item) => Boolean(item.src)) || [];
  const normalizedItems = items.length > 0
    ? items
    : fallbackSrc
      ? [{ src: fallbackSrc, alt: title }]
      : [];

  if (normalizedItems.length === 0) {
    return <VttPlaceholderVisual variant="hero" />;
  }

  const [mainVisual, ...secondaryVisuals] = normalizedItems;

  return (
    <div className="relative overflow-hidden border border-cyan-900/55 bg-zinc-950 p-3 shadow-[0_0_70px_rgba(8,47,73,0.28)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.14),transparent_30%),linear-gradient(135deg,rgba(127,29,29,0.22),transparent_42%)]" />
      <div className="relative grid gap-3">
        <div className="relative aspect-[16/10] overflow-hidden border border-zinc-800 bg-black">
          <LightboxImage
            id="hero-main"
            src={mainVisual.src}
            alt={mainVisual.alt || title}
            caption={mainVisual.caption}
            className="h-full w-full"
            imageClassName="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            openLabel={openLabel}
            closeLabel={closeLabel}
          />
        </div>

        {secondaryVisuals.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {secondaryVisuals.slice(0, 3).map((visual, index) => (
              <div key={visual.src} className="relative aspect-[4/3] overflow-hidden border border-zinc-800 bg-black">
                <LightboxImage
                  id={`hero-${index}`}
                  src={visual.src}
                  alt={visual.alt || title}
                  caption={visual.caption}
                  className="h-full w-full"
                  imageClassName="object-cover opacity-90"
                  sizes="(max-width: 1024px) 33vw, 180px"
                  openLabel={openLabel}
                  closeLabel={closeLabel}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MediaOrPlaceholder({
  src,
  alt,
  variant,
  className = '',
  openLabel,
  closeLabel,
}: {
  src?: string;
  alt: string;
  variant: 'hero' | 'systems' | 'content' | 'support';
  className?: string;
  openLabel: string;
  closeLabel: string;
}) {
  if (!src) {
    return <VttPlaceholderVisual variant={variant} className={className} />;
  }

  if (/\.(mp4|webm)$/i.test(src)) {
    return (
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className={`w-full bg-black object-cover ${variant === 'hero' ? 'min-h-[340px] sm:min-h-[430px]' : 'aspect-[4/3]'} ${className}`}
      />
    );
  }

  return (
    <LightboxImage
      id={`direction-${variant}`}
      src={src}
      alt={alt}
      className={`border border-cyan-700/35 ${variant === 'hero' ? 'min-h-[340px] sm:min-h-[430px]' : 'aspect-[4/3]'} ${className}`}
      imageClassName="object-cover"
      sizes={variant === 'hero' ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
      unoptimized={/\.gif$/i.test(src)}
      openLabel={openLabel}
      closeLabel={closeLabel}
    />
  );
}

function resolveCtaVariant(data: VttPageContent) {
  const requested = data.cta.variant;
  return data.ctaVariants?.find((variant) => variant.id === requested) || data.ctaVariants?.[0];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const content = await getContent('pages', 'vtt', lang);
  const data = content?.frontmatter as unknown as VttPageContent | undefined;

  const title = data?.meta?.title || 'VTT Modules for Foundry and Roll20';
  const description =
    data?.meta?.description ||
    'Fables.Monster creates Foundry VTT and Roll20 modules, custom systems, content conversions, and post-release support.';

  const social = buildSocialMetadata({
    lang,
    path: '/vtt',
    title,
    description,
    imagePath: `/${lang}/opengraph-image`,
  });

  return {
    title,
    description,
    ...social,
  };
}

export default async function VttServicePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const content = await getContent('pages', 'vtt', lang);

  if (!content) {
    notFound();
  }

  const data = content.frontmatter as unknown as VttPageContent;
  const ctaVariant = resolveCtaVariant(data);
  const ctaPrimary = ctaVariant?.primary || data.cta.primary;
  const ctaSecondary = ctaVariant?.secondary || data.cta.secondary;
  const hasDemo = Boolean(data.hero.demo?.embedUrl);
  const hasProductionLayers = Boolean(data.productionLayers?.length);
  const directionsIndex = 2;
  const productionIndex = directionsIndex + 1;
  const demoIndex = hasProductionLayers ? productionIndex + 1 : directionsIndex + 1;
  const detailStartIndex = hasDemo ? demoIndex + 1 : demoIndex;
  const releaseIndex = detailStartIndex + 3;
  const supportIndex = releaseIndex + 1;
  const pricingIndex = supportIndex + 1;
  const estimatorIndex = data.pricing ? pricingIndex + 1 : pricingIndex;
  const briefIndex = data.estimator ? estimatorIndex + 1 : estimatorIndex;
  const formatStep = (step: number) => String(step).padStart(2, '0');
  const lightboxLabels = lang === 'ru'
    ? { open: 'Открыть', close: 'Закрыть' }
    : { open: 'Open', close: 'Close' };

  return (
    <div className="fm-page">
      <section className="fm-page-hero">
        <div className="fm-shell grid lg:grid-cols-[0.82fr_1.18fr] gap-8 lg:gap-12 items-center">
          <FadeIn>
            <div>
              <p className="fm-page-kicker mb-5">{data.hero.kicker}</p>
              <h1 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] font-bold text-white font-orbitron tracking-[0.02em] mb-6">
                {data.hero.title}
              </h1>
              <p className="fm-page-subtitle !mx-0 mb-8">{data.hero.text}</p>
              <a href="#vtt-brief" className="inline-flex bg-red-700 hover:bg-red-600 text-white px-6 py-4 font-orbitron font-bold transition-colors border border-red-500">
                {data.hero.button}
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <VttScreenshotStack
              title={data.hero.title}
              fallbackSrc={data.hero.visual}
              visuals={data.hero.visuals}
              openLabel={lightboxLabels.open}
              closeLabel={lightboxLabels.close}
            />
          </FadeIn>
        </div>
      </section>

      <section className="fm-section fm-section-bordered">
        <div className="fm-shell grid lg:grid-cols-[0.78fr_1.22fr] gap-6 lg:gap-10 items-start">
          <FadeIn>
            <p className="fm-page-kicker mb-4">01 / SCOPE</p>
            <h2 className="fm-section-title font-bold text-white font-orbitron">{data.overview.title}</h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="text-zinc-300 font-rajdhani text-xl leading-relaxed border-l border-cyan-700/50 pl-6">
              {data.overview.text}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="fm-section fm-section-bordered">
        <div className="fm-shell">
          <div className="mb-10">
            <p className="fm-page-kicker mb-4">{formatStep(directionsIndex)} / DIRECTIONS</p>
            <h2 className="fm-section-title font-bold text-white font-orbitron">
              {data.directionsTitle || 'Foundry / Roll20 / Support'}
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {data.directions.map((direction, index) => (
              <FadeIn key={direction.id} delay={index * 0.08}>
                <article className="h-full border border-zinc-800 bg-black">
                  <MediaOrPlaceholder
                    src={direction.visual}
                    alt={direction.title}
                    variant={direction.id}
                    openLabel={lightboxLabels.open}
                    closeLabel={lightboxLabels.close}
                  />
                  <div className="p-6">
                    <p className="text-[10px] font-orbitron tracking-[0.22em] text-cyan-300 mb-3 uppercase">
                      0{index + 1}
                    </p>
                    <h3 className="text-2xl font-orbitron text-white mb-4">{direction.title}</h3>
                    <p className="font-rajdhani text-zinc-300 leading-relaxed">{direction.text}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {hasProductionLayers && (
        <section className="fm-section fm-section-bordered">
          <div className="fm-shell grid lg:grid-cols-2 gap-6 lg:gap-8">
            {data.productionLayers?.map((block, index) => (
              <FadeIn key={block.title} delay={index * 0.08}>
                <article className="h-full overflow-hidden border border-cyan-900/45 bg-black">
                  {block.visual && (
                    <LightboxImage
                      id={`production-${index}`}
                      src={block.visual}
                      alt={block.title}
                      className="aspect-[16/9] border-b border-cyan-900/45"
                      imageClassName="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      openLabel={lightboxLabels.open}
                      closeLabel={lightboxLabels.close}
                    />
                  )}
                  <div className="p-6">
                    <p className="fm-page-kicker mb-4">{formatStep(productionIndex)} / PRODUCTION LAYER</p>
                    <h2 className="text-3xl font-orbitron text-white mb-4">{block.title}</h2>
                    <p className="font-rajdhani text-zinc-300 text-lg leading-relaxed">{block.text}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {data.hero.demo && (
        <section className="fm-section fm-section-bordered">
          <div className="fm-shell grid lg:grid-cols-[1.16fr_0.84fr] gap-6 lg:gap-8 items-center">
            <FadeIn>
              <div className="relative aspect-video overflow-hidden border border-red-900/55 bg-black">
                <iframe
                  src={data.hero.demo.embedUrl}
                  title={data.hero.demo.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="fm-panel h-full">
                <p className="fm-page-kicker mb-4">{formatStep(demoIndex)} / DEMO</p>
                <h2 className="text-3xl font-orbitron text-white mb-4">{data.hero.demo.title}</h2>
                <p className="font-rajdhani text-zinc-300 text-lg leading-relaxed mb-6">
                  {data.hero.demo.text}
                </p>
                {data.hero.demo.sourceUrl && (
                  <a
                    href={data.hero.demo.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex border border-cyan-700/70 px-5 py-3 font-orbitron font-bold text-cyan-300 transition-colors hover:border-cyan-400 hover:text-white"
                  >
                    {data.hero.demo.sourceLabel || data.hero.demo.sourceUrl}
                  </a>
                )}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      <section className="fm-section fm-section-bordered">
        <div className="fm-shell grid md:grid-cols-3 gap-5">
          {[data.result, data.materials, data.process].map((block, index) => (
            <FadeIn key={block.title} delay={index * 0.08}>
              <article className="fm-panel h-full">
                <p className="fm-page-kicker mb-4">{formatStep(index + detailStartIndex)}</p>
                <h2 className="text-2xl font-orbitron text-white mb-4">{block.title}</h2>
                <p className="font-rajdhani text-zinc-300 leading-relaxed">{block.text}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="fm-section fm-section-bordered">
        <div className="fm-shell grid lg:grid-cols-2 gap-6 lg:gap-8">
          <FadeIn>
            <article className="fm-panel h-full border-cyan-900/50">
              <p className="fm-page-kicker mb-4">{formatStep(releaseIndex)} / RELEASE FLOW</p>
              <h2 className="text-3xl font-orbitron text-white mb-4">{data.publishing.title}</h2>
              <p className="font-rajdhani text-zinc-300 text-lg leading-relaxed">{data.publishing.text}</p>
            </article>
          </FadeIn>
          <FadeIn delay={0.1}>
            <article className="fm-panel h-full border-red-900/55">
              <p className="fm-page-kicker mb-4">{formatStep(supportIndex)} / SUPPORT</p>
              <h2 className="text-3xl font-orbitron text-white mb-4">{data.supportBlock.title}</h2>
              <p className="font-rajdhani text-zinc-300 text-lg leading-relaxed">{data.supportBlock.text}</p>
            </article>
          </FadeIn>
        </div>
      </section>

      {data.pricing && (
        <VttPricingPackages pricing={data.pricing} lang={lang} sectionLabel={formatStep(pricingIndex)} />
      )}

      {data.estimator && (
        <VttBudgetEstimator estimator={data.estimator} lang={lang} sectionLabel={formatStep(estimatorIndex)} />
      )}

      <VttBriefForm
        lang={lang}
        stepLabel={formatStep(briefIndex)}
        cta={data.cta}
        ctaPrimary={ctaPrimary}
        ctaSecondary={ctaSecondary}
        ctaVariant={ctaVariant?.id || data.cta.variant || 'default'}
        futurePackages={data.futurePackages}
        form={data.form}
      />
    </div>
  );
}
