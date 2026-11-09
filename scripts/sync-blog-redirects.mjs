/**
 * 301-редиректы со старых английских адресов статей (/en/blog/{id}/) на новые
 * (/en/blog/{en.slug}/). Пишет их в два места:
 *
 *   - vercel.json → "redirects" (www.royaleventandmice.com);
 *   - public/.htaccess → блок между маркерами BEGIN/END blog-en-redirects
 *     (royaleventandmice.ru тоже отдаёт /en/* с canonical на .com).
 *
 * Список берётся из src/content/blog-slugs.mjs (legacyEnRedirects). Запуск:
 *   node scripts/sync-blog-redirects.mjs          — обновить файлы
 *   node scripts/sync-blog-redirects.mjs --check  — только проверить (exit 1, если расходятся)
 * То же проверяет тест src/content/blog-slugs.test.ts.
 */
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { legacyEnRedirects } from '../src/content/blog-slugs.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VERCEL_JSON = path.join(ROOT, 'vercel.json');
const HTACCESS = path.join(ROOT, 'public', '.htaccess');

export const HTACCESS_BEGIN = '# BEGIN blog-en-redirects';
export const HTACCESS_END = '# END blog-en-redirects';
const BLOG_SOURCE_RE = /^\/en\/blog\//;

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Редиректы для vercel.json: старые блог-правила заменяются, остальные сохраняются. */
export function buildVercelRedirects(existing = []) {
  const kept = existing.filter((r) => !BLOG_SOURCE_RE.test(r.source));
  const blog = legacyEnRedirects().map(({ from, to }) => ({
    // Без конечного слэша: Vercel (trailingSlash: true) сравнивает source
    // с путём без слэша, так что правило ловит и /x, и /x/.
    source: from.replace(/\/$/, ''),
    destination: to,
    statusCode: 301,
  }));
  return [...kept, ...blog];
}

/** Блок правил для .htaccess (без маркеров). */
export function buildHtaccessRules() {
  return legacyEnRedirects()
    .map(({ from, to }) => `RewriteRule ^${escapeRegex(from.slice(1, -1))}/?$ ${to} [R=301,L]`)
    .join('\n');
}

/** .htaccess с обновлённым блоком редиректов. Блок обязан уже стоять в файле. */
export function applyHtaccess(text) {
  const start = text.indexOf(HTACCESS_BEGIN);
  const end = text.indexOf(HTACCESS_END);
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`В public/.htaccess нет маркеров «${HTACCESS_BEGIN}» / «${HTACCESS_END}»`);
  }
  const before = text.slice(0, start + HTACCESS_BEGIN.length);
  const after = text.slice(end);
  return `${before}\n${buildHtaccessRules()}\n${after}`;
}

async function run() {
  const check = process.argv.includes('--check');

  const vercelRaw = await fs.readFile(VERCEL_JSON, 'utf-8');
  const vercel = JSON.parse(vercelRaw);
  vercel.redirects = buildVercelRedirects(vercel.redirects);
  const vercelNext = `${JSON.stringify(vercel, null, 2)}\n`;

  const htRaw = await fs.readFile(HTACCESS, 'utf-8');
  const htNext = applyHtaccess(htRaw);

  const stale = [];
  if (vercelNext !== vercelRaw) stale.push('vercel.json');
  if (htNext !== htRaw) stale.push('public/.htaccess');

  if (check) {
    if (stale.length) {
      console.error(`❌ Редиректы блога устарели в: ${stale.join(', ')}. Запусти node scripts/sync-blog-redirects.mjs`);
      process.exit(1);
    }
    console.log('✅ Редиректы блога в порядке');
    return;
  }
  if (stale.includes('vercel.json')) await fs.writeFile(VERCEL_JSON, vercelNext, 'utf-8');
  if (stale.includes('public/.htaccess')) await fs.writeFile(HTACCESS, htNext, 'utf-8');
  console.log(`✅ ${legacyEnRedirects().length} редиректов; обновлено: ${stale.join(', ') || 'ничего'}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run().catch((err) => {
    console.error('❌ sync-blog-redirects failed:', err);
    process.exit(1);
  });
}
