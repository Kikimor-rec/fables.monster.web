import { useState, useEffect } from 'react';

interface ContentData {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function useContent(file: string) {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`/content/${file}`);
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
  }, [file]);

  return { content, loading };
}
