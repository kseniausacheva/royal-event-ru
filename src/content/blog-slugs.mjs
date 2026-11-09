/**
 * Адреса статей блога на двух языках.
 *
 * RU-адрес статьи — /ru/blog/{id}. EN-адрес — /en/blog/{en.slug}, а если
 * en.slug не задан — /en/blog/{id}. Английский слаг нужен для SEO на .com:
 * адрес на английском читается поисковиком как часть заголовка.
 *
 * Модуль на чистом JS: его импортируют и React-код, и скрипты сборки
 * (prerender, sitemap, синхронизация редиректов).
 */
import { blogArticles } from './blog-articles.mjs';

/** @typedef {'ru' | 'en'} Lang */

/** Слаг статьи для языка. */
export function articleSlug(article, lang) {
  return lang === 'en' ? article.en?.slug || article.id : article.id;
}

/** Статья по слагу из адреса. Для EN — только по английскому слагу. */
export function findArticleBySlug(slug, lang) {
  return blogArticles.find((a) => articleSlug(a, lang) === slug);
}

/**
 * Статьи, у которых до 9 ноября 2026 английская версия жила по адресу
 * /en/blog/{id}. Для них старый адрес отдаёт 301 на новый (vercel.json и
 * public/.htaccess, см. scripts/sync-blog-redirects.mjs). Список заморожен:
 * у новых статей старого адреса не было, редирект им не нужен.
 */
export const LEGACY_EN_IDS = [
  'konferenciya-v-egipte',
  'gala-uzhin-v-egipte',
  'mice4u-2026-egipet-mice-dmc',
  'shakira-piramidy-gizy-bilety',
  'dmc-v-egipte',
  'organizaciya-meropriyatiya-za-granicej-s-dmc',
  'insentiv-tur-v-egipet',
  'timbilding-v-egipte',
  'korporativnyj-kruiz-po-nilu',
  'organizaciya-konferencii-za-rubezhom',
  'insentiv-tur-dlya-sotrudnikov',
  'novogodnij-korporativ-za-granicej',
  'skolko-stoit-korporativ-za-rubezhom',
  'korporativ-v-egipte-ceny-2026',
  'kak-vybrat-mice-agentstvo',
  'gde-provesti-korporativ-v-oae-dubai',
  'kak-vybrat-vedushchego-dlya-korporativa',
  '6-trendov-v-b2b-pr-na-2026-god',
  'gde-provesti-korporativ-v-sharm-el-sheikh',
  'kak-podgotovit-programmu-protokolnogo-meropriyatiya',
  'gde-provesti-korporativ-v-egipte',
  'biznes-retraity-dlya-kompanij-formaty-celi',
  'top-8-tendencii-kejteringa-2026',
  'podvodnye-kamni-konferencii-za-rubezhom',
  'trends-2026',
  'coffee-break-organization',
  'egypt-events',
  'team-building-culture',
];

/**
 * Статья по старому EN-адресу /en/blog/{id}, если у неё теперь другой
 * английский слаг. Иначе null.
 */
export function findLegacyEnArticle(slug) {
  if (!LEGACY_EN_IDS.includes(slug)) return null;
  const article = blogArticles.find((a) => a.id === slug);
  if (!article || articleSlug(article, 'en') === slug) return null;
  return article;
}

/** 301-редиректы со старых EN-адресов на новые: [{ from, to }], оба со слэшем. */
export function legacyEnRedirects() {
  return LEGACY_EN_IDS.map((id) => findLegacyEnArticle(id))
    .filter(Boolean)
    .map((a) => ({ from: `/en/blog/${a.id}/`, to: `/en/blog/${articleSlug(a, 'en')}/` }));
}

/**
 * Тот же адрес на другом языке: /ru/x → /en/x, с учётом слагов статей блога.
 * Путь без языкового префикса возвращается с префиксом целевого языка.
 */
export function localizePath(pathname, toLang) {
  const m = pathname.match(/^\/(ru|en)(?=\/|$)(.*)$/);
  const fromLang = m ? m[1] : null;
  let rest = m ? m[2] : pathname;
  const blog = rest.match(/^\/blog\/([^/]+)(\/?)$/);
  if (blog && fromLang) {
    const article =
      findArticleBySlug(blog[1], fromLang) || (fromLang === 'en' ? findLegacyEnArticle(blog[1]) : null);
    if (article) rest = `/blog/${articleSlug(article, toLang)}${blog[2]}`;
  }
  return `/${toLang}${rest}`;
}
