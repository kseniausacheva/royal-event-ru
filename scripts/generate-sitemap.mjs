/**
 * Pre-build генератор public/sitemap.xml.
 *
 * Запускается ДО vite build (через npm pre-hook), чтобы свежий sitemap
 * с актуальными блог-постами попал в dist/.
 *
 * Логика:
 *   1. Берёт статичный список URL (главная, услуги, кейсы, страны, юридические и т.д.)
 *      из STATIC_ENTRIES ниже.
 *   2. Берёт блог-посты из src/content/blog-articles.mjs и добавляет каждый
 *      как <url> с lastmod = datePublished.
 *   3. Сохраняет в public/sitemap.xml.
 *
 * При добавлении новой блог-статьи: правишь только src/content/blog-articles.mjs.
 * sitemap.xml перегенерируется автоматически при следующем `npm run build`.
 */
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { execSync } from 'child_process';
import { blogArticles } from '../src/content/blog-articles.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITEMAP_PATH = path.join(ROOT, 'public', 'sitemap.xml');

const HOST_RU = 'https://royaleventandmice.ru';
const HOST_COM = 'https://www.royaleventandmice.com';

// `--target com`: карта для www.royaleventandmice.com — основные локи /en/*, hreflang ru → .ru.
const TARGET = process.argv.includes('--target') ? process.argv[process.argv.indexOf('--target') + 1] : 'ru';
const HOST = TARGET === 'com' ? HOST_COM : HOST_RU;
const toTargetPath = (loc) => (TARGET === 'com' ? loc.replace(/^\/ru/, '/en') : loc);

// lastmod статичных страниц — дата последнего коммита (а не каждой сборки:
// иначе все страницы выглядят «обновлёнными» при любом деплое). Без git — сегодня.
const TODAY = (() => {
  try {
    return execSync('git log -1 --format=%cs', { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || new Date().toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
})();

/**
 * @typedef {Object} SitemapEntry
 * @property {string} loc — путь от корня (/ru/about), без хоста
 * @property {string} [lastmod] — ISO date, по умолчанию TODAY
 * @property {string} [changefreq] — daily/weekly/monthly/yearly
 * @property {string} [priority] — 0.0 to 1.0
 * @property {boolean} [hreflang] — добавить ли cross-domain hreflang на .com
 * @property {Array<{loc: string, title: string, caption?: string}>} [images]
 */

/** @type {SitemapEntry[]} */
const STATIC_ENTRIES = [
  {
    loc: '/ru',
    changefreq: 'weekly',
    priority: '1.0',
    hreflang: true,
    images: [
      { loc: '/logo-la-royal-event.png', title: 'La Royal Event — MICE-агентство полного цикла' },
      { loc: '/carlsberg-0.JPG', title: 'Конференция Carlsberg на 1000 человек в Domina Coral Bay', caption: 'Грандиозная конференция Carlsberg в Шарм-эль-Шейхе от La Royal Event' },
      { loc: '/nl-7.jpg', title: 'Корпоративное мероприятие NL International на 7 дней', caption: 'Семидневный корпоративный выезд NL International в отеле Park Regency' },
      { loc: '/ewa-14.jpg', title: 'Корпоратив EWA product в Rixos Seagate, Шарм-эль-Шейх' },
    ],
  },
  {
    loc: '/ru/about',
    changefreq: 'monthly',
    priority: '0.9',
    hreflang: true,
    images: [
      { loc: '/ksenia-usacheva.jpg', title: 'Ксения Усачева — CEO и основатель La Royal Event' },
      { loc: '/ekaterina-gaiduk.jpg', title: 'Екатерина Гайдук — CEO и партнёр La Royal Event' },
      { loc: '/team-full-1.jpg', title: 'Команда La Royal Event — MICE-агентство' },
      { loc: '/team-full-2.jpg', title: 'Команда La Royal Event в работе на мероприятии' },
    ],
  },
  { loc: '/ru/services', changefreq: 'monthly', priority: '0.9', hreflang: true },
  { loc: '/ru/portfolio', changefreq: 'weekly', priority: '0.9', hreflang: true },

  // Кейсы портфолио (статика — их немного, добавляем вручную)
  {
    loc: '/ru/portfolio/carlsberg',
    changefreq: 'monthly',
    priority: '0.7',
    images: Array.from({ length: 13 }, (_, i) => ({
      loc: `/carlsberg-${i}.JPG`,
      title: `Carlsberg — фото ${i + 1} с мероприятия`,
    })),
  },
  {
    loc: '/ru/portfolio/nl-international',
    changefreq: 'monthly',
    priority: '0.7',
    images: [
      { loc: '/nl-7.jpg', title: 'NL International — корпоративное мероприятие на 7 дней' },
      { loc: '/nl-2.jpg', title: 'NL International — фото с мероприятия' },
      { loc: '/nl-10.jpg', title: 'NL International — гала-ужин и шоу-программа' },
    ],
  },
  {
    loc: '/ru/portfolio/ewa-product',
    changefreq: 'monthly',
    priority: '0.7',
    images: [
      { loc: '/ewa-14.jpg', title: 'EWA product — 5-дневный корпоратив в Шарм-эль-Шейхе' },
      { loc: '/ewa-5.jpg', title: 'EWA product — фото с мероприятия' },
    ],
  },
  {
    loc: '/ru/portfolio/afa-agricultural',
    changefreq: 'monthly',
    priority: '0.7',
    images: [
      { loc: '/afa-0.JPG', title: 'AFA — сельскохозяйственная конференция в Grand Rotana' },
      { loc: '/afa-1.JPG', title: 'AFA — фото с конференции' },
    ],
  },
  {
    loc: '/ru/portfolio/world-stars',
    changefreq: 'monthly',
    priority: '0.7',
    images: [{ loc: '/ws-3.jpeg', title: 'Мировые звёзды — букинг и организация концертов' }],
  },
  {
    loc: '/ru/portfolio/bedouin-dinner',
    changefreq: 'monthly',
    priority: '0.7',
    images: [
      { loc: '/bd-1.jpg', title: 'VIP Бедуинский ужин в Four Seasons' },
      { loc: '/bd-2.jpg', title: 'Бедуинский ужин — атмосфера и декор' },
    ],
  },

  { loc: '/ru/egypt', changefreq: 'monthly', priority: '0.8', hreflang: true },
  { loc: '/ru/russia', changefreq: 'monthly', priority: '0.8', hreflang: true },
  // La Royal Event: программы, круизы, DMC. Слаги программ — из src/content/la-royal-event.ts
  { loc: '/ru/programmy', changefreq: 'monthly', priority: '0.9', hreflang: true },
  { loc: '/ru/programmy/kod-piramid', changefreq: 'monthly', priority: '0.8', hreflang: true },
  { loc: '/ru/programmy/poslednyaya-stranica', changefreq: 'monthly', priority: '0.8', hreflang: true },
  { loc: '/ru/programmy/chetyre-ruki', changefreq: 'monthly', priority: '0.8', hreflang: true },
  { loc: '/ru/programmy/posledniy-kadr', changefreq: 'monthly', priority: '0.8', hreflang: true },
  { loc: '/ru/programmy/ladya', changefreq: 'monthly', priority: '0.8', hreflang: true },
  { loc: '/ru/programmy/put-k-zvezdam', changefreq: 'monthly', priority: '0.8', hreflang: true },
  { loc: '/ru/programmy/zapis-arheologa', changefreq: 'monthly', priority: '0.8', hreflang: true },
  { loc: '/ru/programmy/muzey-ozhivaet', changefreq: 'monthly', priority: '0.8', hreflang: true },
  { loc: '/ru/programmy/sokrovishcha-ra', changefreq: 'monthly', priority: '0.8', hreflang: true },
  { loc: '/ru/programmy/faraon', changefreq: 'monthly', priority: '0.8', hreflang: true },
  { loc: '/ru/cruises', changefreq: 'monthly', priority: '0.9', hreflang: true },
  { loc: '/ru/dmc', changefreq: 'monthly', priority: '0.9', hreflang: true },
  { loc: '/ru/tickets', changefreq: 'weekly', priority: '0.9', hreflang: true },
  { loc: '/ru/delegations', changefreq: 'monthly', priority: '0.8', hreflang: true },
  { loc: '/ru/blog', changefreq: 'weekly', priority: '0.7', hreflang: true },
  { loc: '/ru/contact', changefreq: 'monthly', priority: '0.7', hreflang: true },
  { loc: '/ru/privacy', changefreq: 'yearly', priority: '0.3' },
  { loc: '/ru/offer', changefreq: 'yearly', priority: '0.3' },
  { loc: '/ru/data-consent', changefreq: 'yearly', priority: '0.3' },
  { loc: '/ru/mailing-consent', changefreq: 'yearly', priority: '0.3' },
];

// Динамические записи для блог-постов — генерируем из единого источника
/** @type {SitemapEntry[]} */
const BLOG_ENTRIES = blogArticles.map((article) => ({
  loc: `/ru/blog/${article.id}`,
  lastmod: article.datePublished,
  changefreq: 'monthly',
  priority: '0.6',
  images: article.image.startsWith('http')
    ? [] // внешние картинки (Unsplash и т.п.) Яндекс индексирует сам
    : [{ loc: article.image, title: article.ru.title }],
}));

/** Экранирование XML спецсимволов в текстовых полях. */
function xmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * URL страницы на .ru — всегда со слэшем на конце.
 * Apache отдаёт пререндеренные страницы как папки (/ru/blog/index.html) и
 * 301-ит адреса без слэша. В sitemap должны быть конечные 200-адреса,
 * иначе каждый URL из карты встречает краулер редиректом.
 */
function ruUrl(loc) {
  return `${HOST_RU}${loc.endsWith('/') ? loc : `${loc}/`}`;
}
function enUrl(loc) {
  const p = loc.replace(/^\/ru/, '/en');
  return `${HOST_COM}${p.endsWith('/') ? p : `${p}/`}`;
}
/** Основной URL записи для текущей цели сборки. */
function primaryUrl(loc) {
  return TARGET === 'com' ? enUrl(loc) : ruUrl(loc);
}

/** Сгенерировать один <url> блок. */
function renderEntry(entry) {
  const lines = [];
  lines.push('  <url>');
  lines.push(`    <loc>${primaryUrl(entry.loc)}</loc>`);
  lines.push(`    <lastmod>${entry.lastmod || TODAY}</lastmod>`);
  if (entry.changefreq) lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
  if (entry.priority) lines.push(`    <priority>${entry.priority}</priority>`);

  // У каждой страницы есть зеркало на другом языке: RU на .ru, EN на .com
  // (cross-domain hreflang), все адреса со слэшем на конце. x-default — русская версия.
  lines.push(`    <xhtml:link rel="alternate" hreflang="ru" href="${ruUrl(entry.loc)}" />`);
  lines.push(`    <xhtml:link rel="alternate" hreflang="en" href="${enUrl(entry.loc)}" />`);
  lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${ruUrl(entry.loc)}" />`);

  if (entry.images && entry.images.length > 0) {
    for (const img of entry.images) {
      const imageLoc = img.loc.startsWith('http') ? img.loc : `${HOST}${img.loc}`;
      lines.push('    <image:image>');
      lines.push(`      <image:loc>${xmlEscape(imageLoc)}</image:loc>`);
      lines.push(`      <image:title>${xmlEscape(img.title)}</image:title>`);
      if (img.caption) lines.push(`      <image:caption>${xmlEscape(img.caption)}</image:caption>`);
      lines.push('    </image:image>');
    }
  }

  lines.push('  </url>');
  return lines.join('\n');
}

async function run() {
  const allEntries = [...STATIC_ENTRIES, ...BLOG_ENTRIES];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!-- Auto-generated by scripts/generate-sitemap.mjs — НЕ редактируй вручную. -->',
    '<!-- Для добавления блог-поста правь src/content/blog-articles.mjs. -->',
    '<!-- Для добавления других страниц правь STATIC_ENTRIES в этом же скрипте. -->',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...allEntries.map(renderEntry),
    '</urlset>',
    '',
  ].join('\n');

  await fs.writeFile(SITEMAP_PATH, xml, 'utf-8');
  console.log(`✅ sitemap.xml generated: ${allEntries.length} URLs (${STATIC_ENTRIES.length} static + ${BLOG_ENTRIES.length} blog)`);
}

run().catch((err) => {
  console.error('❌ generate-sitemap failed:', err);
  process.exit(1);
});
