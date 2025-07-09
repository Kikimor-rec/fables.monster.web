import { useContent } from './useContent';

export function useEditableContent(file: string = 'site-content.json') {
  const { content, loading } = useContent(file);
  
  // Функция для получения значения по пути
  const getValue = (path: string, fallback: string = '') => {
    if (!content) return fallback;
    
    const pathParts = path.split('.');
    let current = content;
    
    for (const part of pathParts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return fallback;
      }
    }
    
    return typeof current === 'string' ? current : fallback;
  };

  return { content, loading, getValue };
}
