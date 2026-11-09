import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { blogArticles } from './blog-articles.mjs';
import {
  articleSlug,
  findArticleBySlug,
  findLegacyEnArticle,
  legacyEnRedirects,
  localizePath,
  LEGACY_EN_IDS,
} from './blog-slugs.mjs';
import { buildVercelRedirects, applyHtaccess } from '../../scripts/sync-blog-redirects.mjs';

const ROOT = path.resolve(__dirname, '../..');

describe('blog slugs', () => {
  it('every article has a unique, URL-safe English slug without Cyrillic', () => {
    const slugs = blogArticles.map((a) => articleSlug(a, 'en'));
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('an English slug never equals another article\'s Russian id', () => {
    for (const a of blogArticles) {
      const en = articleSlug(a, 'en');
      const clash = blogArticles.find((b) => b !== a && b.id === en);
      expect(clash, `${a.id} → ${en}`).toBeUndefined();
    }
  });

  it('Russian slug is always the id', () => {
    for (const a of blogArticles) expect(articleSlug(a, 'ru')).toBe(a.id);
  });

  it('looks articles up by the slug of the given language', () => {
    expect(findArticleBySlug('dmc-v-egipte', 'ru')?.id).toBe('dmc-v-egipte');
    expect(findArticleBySlug('dmc-in-egypt', 'en')?.id).toBe('dmc-v-egipte');
    expect(findArticleBySlug('dmc-v-egipte', 'en')).toBeUndefined();
    expect(findArticleBySlug('trends-2026', 'en')?.id).toBe('trends-2026');
  });

  it('legacy list only names existing articles', () => {
    const ids = new Set(blogArticles.map((a) => a.id));
    for (const id of LEGACY_EN_IDS) expect(ids.has(id), id).toBe(true);
  });

  it('finds a legacy English address only when the slug really changed', () => {
    expect(findLegacyEnArticle('dmc-v-egipte')?.id).toBe('dmc-v-egipte');
    expect(findLegacyEnArticle('trends-2026')).toBeNull();
    expect(findLegacyEnArticle('dmc-in-egypt')).toBeNull();
    expect(findLegacyEnArticle('no-such-article')).toBeNull();
  });

  it('redirects old English addresses to the new ones, with trailing slashes', () => {
    const r = legacyEnRedirects();
    expect(r).toContainEqual({ from: '/en/blog/dmc-v-egipte/', to: '/en/blog/dmc-in-egypt/' });
    expect(r.find((x) => x.from === '/en/blog/trends-2026/')).toBeUndefined();
    for (const { from, to } of r) {
      expect(from).not.toBe(to);
      expect(findArticleBySlug(to.split('/')[3], 'en')).toBeDefined();
    }
  });
});

describe('localizePath', () => {
  it('translates blog article slugs between languages', () => {
    expect(localizePath('/ru/blog/dmc-v-egipte', 'en')).toBe('/en/blog/dmc-in-egypt');
    expect(localizePath('/ru/blog/dmc-v-egipte/', 'en')).toBe('/en/blog/dmc-in-egypt/');
    expect(localizePath('/en/blog/dmc-in-egypt', 'ru')).toBe('/ru/blog/dmc-v-egipte');
    expect(localizePath('/en/blog/dmc-in-egypt/', 'ru')).toBe('/ru/blog/dmc-v-egipte/');
  });

  it('maps a legacy English address to the Russian article', () => {
    expect(localizePath('/en/blog/dmc-v-egipte', 'ru')).toBe('/ru/blog/dmc-v-egipte');
    expect(localizePath('/en/blog/dmc-v-egipte', 'en')).toBe('/en/blog/dmc-in-egypt');
  });

  it('keeps unchanged slugs and non-blog paths', () => {
    expect(localizePath('/ru/blog/trends-2026', 'en')).toBe('/en/blog/trends-2026');
    expect(localizePath('/ru/dmc', 'en')).toBe('/en/dmc');
    expect(localizePath('/en/programmy/kod-piramid/', 'ru')).toBe('/ru/programmy/kod-piramid/');
    expect(localizePath('/ru', 'en')).toBe('/en');
    expect(localizePath('/ru/', 'en')).toBe('/en/');
    expect(localizePath('/en/blog', 'ru')).toBe('/ru/blog');
    expect(localizePath('/ru/blog/unknown-article', 'en')).toBe('/en/blog/unknown-article');
  });

  it('does not treat a path that merely starts with the language letters as prefixed', () => {
    expect(localizePath('/russia', 'en')).toBe('/en/russia');
  });
});

describe('redirect files stay in sync with the slugs', () => {
  it('vercel.json has exactly the generated blog redirects', () => {
    const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf-8'));
    expect(vercel.redirects).toEqual(buildVercelRedirects(vercel.redirects));
    const blog = vercel.redirects.filter((r: { source: string }) => r.source.startsWith('/en/blog/'));
    expect(blog).toHaveLength(legacyEnRedirects().length);
  });

  it('public/.htaccess has exactly the generated blog redirects', () => {
    const ht = fs.readFileSync(path.join(ROOT, 'public', '.htaccess'), 'utf-8');
    expect(applyHtaccess(ht)).toBe(ht);
    // Редиректы должны стоять до отдачи реальных файлов
    expect(ht.indexOf('# BEGIN blog-en-redirects')).toBeLessThan(ht.indexOf('RewriteCond %{REQUEST_FILENAME} -f'));
  });
});
