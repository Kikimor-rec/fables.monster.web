import type { Metadata } from "next";

const SITE_URL = "https://fables.monster";

const normalizePath = (path: string) => {
  if (!path || path === "/") {
    return "";
  }

  return path.startsWith("/") ? path : `/${path}`;
};

const withLangPath = (lang: string, path: string) => `/${lang}${path}`;

export const getOpenGraphLocale = (lang: string) => (lang === "ru" ? "ru_RU" : "en_US");

export const toAbsoluteUrl = (value: string) => {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
};

export const getLocalizedAlternates = (lang: string, path: string): NonNullable<Metadata["alternates"]> => {
  const normalizedPath = normalizePath(path);

  return {
    canonical: `${SITE_URL}${withLangPath(lang, normalizedPath)}`,
    languages: {
      en: `${SITE_URL}${withLangPath("en", normalizedPath)}`,
      ru: `${SITE_URL}${withLangPath("ru", normalizedPath)}`,
    },
  };
};

interface SocialMetadataOptions {
  lang: string;
  title: string;
  description: string;
  path?: string;
  imagePath?: string;
  twitterImagePath?: string;
  imageAlt?: string;
  type?: "website" | "article";
  includeXDefault?: boolean;
}

export const buildSocialMetadata = ({
  lang,
  title,
  description,
  path = "",
  imagePath,
  twitterImagePath,
  imageAlt,
  type = "website",
  includeXDefault = false,
}: SocialMetadataOptions): Pick<Metadata, "alternates" | "openGraph" | "twitter"> => {
  const normalizedPath = normalizePath(path);
  const localizedPath = withLangPath(lang, normalizedPath);
  const resolvedImagePath = imagePath ?? `${localizedPath}/opengraph-image`;
  const imageUrl = toAbsoluteUrl(resolvedImagePath);
  const twitterImageUrl = toAbsoluteUrl(twitterImagePath ?? resolvedImagePath);
  const alternates = getLocalizedAlternates(lang, normalizedPath);

  if (includeXDefault && alternates.languages) {
    alternates.languages["x-default"] = `${SITE_URL}${withLangPath("en", normalizedPath)}`;
  }

  return {
    alternates,
    openGraph: {
      title,
      description,
      url: toAbsoluteUrl(localizedPath),
      siteName: "Fables Monster Studio",
      locale: getOpenGraphLocale(lang),
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImageUrl],
    },
  };
};
