import sanitizeHtmlLib from 'sanitize-html';

const ALLOWED_OPTIONS: sanitizeHtmlLib.IOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br', 'span', 'p'],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    span: ['class'],
  },
};

/**
 * Sanitizes HTML content from i18n dictionaries and user-controlled data
 * before rendering with dangerouslySetInnerHTML.
 * Works on both server (Node.js) and client.
 * Markdown output from remark-html is considered safe and doesn't need this.
 */
export function sanitizeHtml(dirty: string): string {
  return sanitizeHtmlLib(dirty, ALLOWED_OPTIONS);
}
