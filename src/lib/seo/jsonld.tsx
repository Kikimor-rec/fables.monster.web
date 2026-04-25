interface JsonLdProps {
  id: string;
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface CollectionListItem {
  name: string;
  path: string;
}

interface CreativeWorkOptions {
  name: string;
  description: string;
  path: string;
  lang: string;
  imagePath?: string;
  genre?: string;
  datePublished?: string;
  keywords?: string[];
}

interface ProductOptions extends CreativeWorkOptions {
  category?: string;
  offerUrls?: string[];
}

const SITE_URL = "https://fables.monster";

function toAbsoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  if (pathOrUrl.startsWith("/")) {
    return `${SITE_URL}${pathOrUrl}`;
  }

  return `${SITE_URL}/${pathOrUrl}`;
}

export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fables Monster Studio",
    url: SITE_URL,
    logo: `${SITE_URL}/logos/fm-logo-sqare.png`,
    description:
      "Independent tabletop RPG content creation studio specializing in horror, sci-fi, and supernatural adventures.",
    sameAs: [
      "https://discord.gg/uw2uvny7n6",
      "https://www.patreon.com/FablesMonster",
      "https://fablesmonster.itch.io",
      "https://legacy.drivethrurpg.com/browse/pub/30815/FablesMonster",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${SITE_URL}/contact`,
    },
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fables Monster Studio",
    url: SITE_URL,
    inLanguage: ["en", "ru"],
    publisher: {
      "@type": "Organization",
      name: "Fables Monster Studio",
      url: SITE_URL,
    },
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

export function buildCollectionPageJsonLd(options: {
  name: string;
  description: string;
  path: string;
  items: CollectionListItem[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: options.name,
    description: options.description,
    url: toAbsoluteUrl(options.path),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: options.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: toAbsoluteUrl(item.path),
      })),
    },
  };
}

export function buildCreativeWorkJsonLd(options: CreativeWorkOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: options.name,
    description: options.description,
    url: toAbsoluteUrl(options.path),
    image: options.imagePath ? toAbsoluteUrl(options.imagePath) : undefined,
    author: {
      "@type": "Organization",
      name: "Fables Monster Studio",
    },
    publisher: {
      "@type": "Organization",
      name: "Fables Monster Studio",
      url: SITE_URL,
    },
    genre: options.genre,
    datePublished: options.datePublished,
    keywords: options.keywords,
    inLanguage: options.lang,
  };
}

export function buildProductJsonLd(options: ProductOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: options.name,
    description: options.description,
    image: options.imagePath ? toAbsoluteUrl(options.imagePath) : undefined,
    url: toAbsoluteUrl(options.path),
    category: options.category || "Tabletop Role-Playing Game Adventure",
    brand: {
      "@type": "Brand",
      name: "Fables Monster Studio",
    },
    inLanguage: options.lang,
    offers:
      options.offerUrls && options.offerUrls.length > 0
        ? options.offerUrls.map((offerUrl) => ({
            "@type": "Offer",
            url: toAbsoluteUrl(offerUrl),
            availability: "https://schema.org/InStock",
          }))
        : undefined,
    isRelatedTo: {
      "@type": "CreativeWork",
      genre: options.genre,
    },
    keywords: options.keywords,
  };
}
