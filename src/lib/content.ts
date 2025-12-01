import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { fallbackLng } from '@/i18n/settings';

const contentDirectory = path.join(process.cwd(), 'content');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FrontmatterValue = string | number | boolean | undefined | Record<string, any> | Array<any>;

export interface ContentData {
  slug: string;
  lang: string;
  frontmatter: Record<string, FrontmatterValue>;
  contentHtml: string;
}

// Helper to safely get string from frontmatter
export function getFrontmatterString(frontmatter: Record<string, FrontmatterValue>, key: string): string {
  const value = frontmatter[key];
  return typeof value === 'string' ? value : '';
}

// Helper to safely get object from frontmatter
export function getFrontmatterObject<T>(frontmatter: Record<string, FrontmatterValue>, key: string): T | undefined {
  const value = frontmatter[key];
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? value as T : undefined;
}

export async function getContent(
  type: 'projects' | 'pages',
  slug: string,
  lang: string
): Promise<ContentData | null> {
  const fullPath = path.join(contentDirectory, type, `${slug}.${lang}.md`);
  const fallbackPath = path.join(contentDirectory, type, `${slug}.${fallbackLng}.md`);

  let fileContents;
  let usedLang = lang;

  try {
    if (fs.existsSync(fullPath)) {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } else if (fs.existsSync(fallbackPath)) {
      fileContents = fs.readFileSync(fallbackPath, 'utf8');
      usedLang = fallbackLng;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error reading content file: ${fullPath}`, error);
    return null;
  }

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    lang: usedLang,
    frontmatter: matterResult.data,
    contentHtml,
  };
}

export async function getAllProjects(lang: string): Promise<ContentData[]> {
  const projectsDirectory = path.join(contentDirectory, 'projects');
  
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const slugs = new Set<string>();

  fileNames.forEach(fileName => {
    if (fileName.endsWith('.md')) {
      const slug = fileName.replace(/\.[a-z]{2}\.md$/, '');
      slugs.add(slug);
    }
  });

  const projects = await Promise.all(
    Array.from(slugs).map(async (slug) => {
      return await getContent('projects', slug, lang);
    })
  );

  return projects.filter((p): p is ContentData => p !== null);
}
