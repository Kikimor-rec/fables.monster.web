import { useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';

/**
 * Тип для значений в контенте
 * Убираем any в пользу строгой типизации
 */
type ContentValue = string | number | boolean | null | ContentValue[] | { [key: string]: ContentValue };

export interface ContentData {
  [key: string]: ContentValue;
}

export interface UseContentReturn {
  content: ContentData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Хук для загрузки контента из JSON файлов
 * @param file - Имя файла
 * @param lang - Язык (по умолчанию 'en')
 * @returns Объект с content, loading, error и функцией refetch
 *
 * @example
 * const { content, loading, error, refetch } = useContent('project.json', 'ru');
 *
 * if (loading) return <Loading />;
 * if (error) return <Error error={error} onRetry={refetch} />;
 * return <Content data={content} />;
 */
export function useContent(file: string, lang: string = 'en'): UseContentReturn {
  const [state, setState] = useState<{
    content: ContentData | null;
    loading: boolean;
    error: Error | null;
  }>({
    content: null,
    loading: true,
    error: null,
  });

  const loadContent = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const filename = lang === 'en' ? file : file.replace('.json', `.${lang}.json`);
      const response = await fetch(`/content/${filename}`);

      if (!response.ok) {
        throw new Error(
          `Failed to load content: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setState({ content: data, loading: false, error: null });

      logger.debug('Content loaded successfully', { file, lang });
    } catch (error) {
      const errorObj = error instanceof Error
        ? error
        : new Error('Unknown error occurred while loading content');

      setState({ content: null, loading: false, error: errorObj });

      logger.error('Failed to load content', {
        file,
        lang,
        error: errorObj.message,
      });
    }
  }, [file, lang]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return {
    ...state,
    refetch: loadContent,
  };
}
