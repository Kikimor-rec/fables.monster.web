export interface AdventureJsonProps {
  name: string;
  description: string;
  url: string;
  date: string;
  genre: string;
}

export function AdventureJson({ name, description, url, date, genre }: AdventureJsonProps) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url,
    datePublished: date,
    genre,
    author: 'Fables Monster Studio',
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
