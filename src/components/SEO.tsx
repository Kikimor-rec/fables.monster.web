"use client";

import { DefaultSeo, NextSeo, ArticleJsonLd, DefaultSeoProps } from 'next-seo';

const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | Fables Monster Studio',
  defaultTitle: 'Fables Monster Studio – Immersive TTRPG Adventures',
  description:
    'Independent studio creating original TTRPG adventures such as Lost Mark, Cemetery of Broken Ships and Hellish Bureaucracy.',
  canonical: 'https://fables.monster',
  openGraph: {
    type: 'website',
    url: 'https://fables.monster',
    siteName: 'Fables Monster Studio',
    images: [
      {
        url: 'https://fables.monster/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Fables Monster Logo',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
    site: '@fablesmonster',
  },
};

export const DefaultSEO = () => <DefaultSeo {...defaultSEO} />;

interface PageSEOProps {
  title: string;
  description: string;
  canonical: string;
}

export const PageSEO = ({ title, description, canonical }: PageSEOProps) => (
  <NextSeo title={title} description={description} canonical={canonical} />
);

interface AdventureProps {
  name: string;
  description: string;
  url: string;
  date: string;
  genre: string;
}

export const AdventureJSON = ({ name, description, url, date, genre }: AdventureProps) => (
  <ArticleJsonLd
    type="Game"
    url={url}
    title={name}
    images={[`${url}/cover.webp`]}
    datePublished={date}
    authorName="Stepan Kulikov"
    publisherName="Fables Monster Studio"
    description={description}
    genre={genre}
  />
);
