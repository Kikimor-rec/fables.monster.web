import type { Metadata } from "next";

export const BASE_URL = "https://fables.monster";
const DEFAULT_IMAGE = "/logos/logo-white-new.svg";

interface MetaDataProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  publishedAt?: string;
  modifiedAt?: string;
}

export function createMetadata({
  title,
  description,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
  publishedAt,
  modifiedAt,
}: MetaDataProps): Metadata {
  const url = `${BASE_URL}${path}`;
  const pathWithoutLang = path.replace(/^\/(en|ru)/, '');
  
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'en': `${BASE_URL}/en${pathWithoutLang}`,
        'ru': `${BASE_URL}/ru${pathWithoutLang}`,
        'x-default': `${BASE_URL}/en${pathWithoutLang}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Fables Monster Studio",
      locale: "en_US",
      type,
      images: [image],
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(modifiedAt && { modifiedTime: modifiedAt }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@fablesmonster",
      images: [image],
    },
    robots: { 
      index: true, 
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      }
    },
  };
}
