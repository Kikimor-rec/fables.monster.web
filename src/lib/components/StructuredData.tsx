'use client'

import Script from 'next/script'

interface Product {
  name: string
  description: string
  price?: string
  image?: string
  url: string
}

interface StructuredDataProps {
  type: 'organization' | 'product' | 'website'
  product?: Product
}

export default function StructuredData({ type, product }: StructuredDataProps) {
  const getOrganizationData = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fables Monster Studio",
    "description": "Independent tabletop RPG content creation studio specializing in horror, sci-fi, and supernatural adventures",
    "url": "https://fables.monster",
    "logo": "https://fables.monster/logos/fables-monster-logo.png",
    "sameAs": [
      "https://discord.gg/eAwK9DfKf4",
      "https://patreon.com/fables-monster",
      "https://fables-monster.itch.io",
      "https://drivethrurpg.com/browse/pub/22950/Fables-Monster-Studio"
    ],
    "founder": {
      "@type": "Person",
      "name": "Fables Monster Studio Team"
    },
    "foundingDate": "2023",
    "industry": "Gaming",
    "keywords": ["tabletop RPG", "horror games", "Mothership RPG", "indie games", "adventure modules"]
  })

  const getProductData = () => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product?.name,
    "description": product?.description,
    "image": product?.image,
    "url": product?.url,
    "brand": {
      "@type": "Brand",
      "name": "Fables Monster Studio"
    },
    "category": "Tabletop Role-Playing Game",
    "keywords": ["RPG", "tabletop game", "adventure module", "horror RPG"],
    "offers": product?.price ? {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    } : undefined
  })

  const getWebsiteData = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Fables Monster Studio",
    "url": "https://fables.monster",
    "description": "Independent tabletop RPG content creation studio specializing in horror, sci-fi, and supernatural adventures for tabletop RPGs like Mothership",
    "publisher": {
      "@type": "Organization",
      "name": "Fables Monster Studio"
    },
    "inLanguage": ["en", "ru"]
  })

  const getData = () => {
    switch (type) {
      case 'organization':
        return getOrganizationData()
      case 'product':
        return getProductData()
      case 'website':
        return getWebsiteData()
      default:
        return getOrganizationData()
    }
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getData()),
      }}
    />
  )
}
