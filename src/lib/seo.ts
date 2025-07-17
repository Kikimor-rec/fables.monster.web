import type { Metadata } from "next";

export const BASE_URL = "https://fables.monster";
const DEFAULT_IMAGE = "/logos/logo-white-new.svg";

export function createMetadata(
  title: string,
  description: string,
  path = "",
): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Fables Monster Studio",
      locale: "en_US",
      type: "website",
      images: [DEFAULT_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@fablesmonster",
      images: [DEFAULT_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}
