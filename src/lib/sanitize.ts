import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitizes HTML content from i18n dictionaries and user-controlled data
 * before rendering with dangerouslySetInnerHTML.
 * Markdown output from remark-html is considered safe and doesn't need this.
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'span', 'p'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  });
}
