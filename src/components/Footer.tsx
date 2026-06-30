import Link from 'next/link';
import Image from 'next/image';
import SocialLinks from './SocialLinks';
import NewsletterForm from './NewsletterForm';
import FooterLinkGroup from './navigation/FooterLinkGroup';
import DossierLabel from './navigation/DossierLabel';
import HeaderCta from './navigation/HeaderCta';
import { getFooterLinkGroups, getHeaderCta, type SiteNavItem } from '@/lib/site-navigation';
import { FooterDict, NewsletterDict } from '@/types/i18n';

interface FooterProps {
  lang: string;
  dict: FooterDict;
  newsletterDict?: NewsletterDict;
  featuredWorkLinks?: SiteNavItem[];
}

export default function Footer({ lang, dict, newsletterDict, featuredWorkLinks }: FooterProps) {
  const linkGroups = getFooterLinkGroups(lang, dict, featuredWorkLinks);
  const cta = getHeaderCta(lang, { getUpdates: dict.getUpdates || newsletterDict?.footer.subscribe });

  return (
    <footer role="contentinfo" className="border-t border-red-950 bg-black py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr_1fr]">
          <section aria-label="Fables Monster Studio" className="max-w-sm">
            <Link
              href={`/${lang}`}
              className="mb-5 inline-block focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label={dict.homeAriaLabel || 'Fables Monster - Home'}
            >
              <Image
                src="/logos/fm-logo-sqare.png"
                alt=""
                width={112}
                height={112}
                className="w-24 max-w-full sm:w-28"
                aria-hidden="true"
              />
              <span className="sr-only">Fables Monster Studio</span>
            </Link>
            <DossierLabel>{dict.brandLabel || 'Independent dossier'}</DossierLabel>
            <p className="mt-4 font-nunito text-sm leading-relaxed text-zinc-300">
              {dict.tagline || 'Independent tabletop RPG content creation studio'}
            </p>
            <HeaderCta item={cta} className="mt-5" />
          </section>

          <div className="grid gap-8 sm:grid-cols-3">
            {linkGroups.map((group) => (
              <FooterLinkGroup
                key={group.title}
                title={group.title}
                ariaLabel={group.ariaLabel}
                links={group.links}
              />
            ))}
          </div>

          <section aria-label={dict.connect || 'Connect'}>
            <h3 className="mb-4 font-orbitron text-sm font-bold uppercase tracking-[0.16em] text-white">
              {dict.connect || 'CONNECT'}
            </h3>
            <p className="mb-4 font-nunito text-sm leading-relaxed text-zinc-300">
              {newsletterDict?.footer.description || 'Get updates on new releases and studio transmissions.'}
            </p>
            <NewsletterForm
              dict={{
                emailPlaceholder: newsletterDict?.compact.emailPlaceholder || 'your@email.com',
                submit: newsletterDict?.compact.submit || newsletterDict?.footer.subscribe || 'SUBSCRIBE',
                subscribing: newsletterDict?.compact.subscribing || '...',
                success: newsletterDict?.compact.success || 'Success! Check your email to confirm.',
              }}
              lang={lang}
              compact={true}
            />
            <Link
              href={`/${lang}/newsletter/subscribe`}
              className="mt-3 inline-block font-nunito text-sm text-zinc-400 transition-colors hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {newsletterDict?.footer.learnMore || dict.newsletter || 'Newsletter ->'}
            </Link>
            <div className="mt-5">
              <SocialLinks showLabels={false} className="justify-start gap-3" />
            </div>
          </section>
        </div>

        <div className="mt-12 border-t border-zinc-900 pt-8 text-center font-nunito text-sm text-zinc-500">
          <p>
            {(dict.copyright || '(c) {year} Fables Monster Studio. All rights reserved.').replace(
              '{year}',
              new Date().getFullYear().toString(),
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
