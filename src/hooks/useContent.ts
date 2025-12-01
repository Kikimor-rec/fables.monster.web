import { useState, useEffect } from 'react';

interface ContentData {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function useContent(file: string, lang: string = 'en') {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const filename = lang === 'en' ? file : file.replace('.json', `.${lang}.json`);
        const response = await fetch(`/content/${filename}`);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        }
      } catch (error) {
        console.error('Failed to load content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [file, lang]);

  return { content, loading };
}
