/**
 * Один репозиторий — два сайта. Цель сборки задаётся переменной VITE_SITE_TARGET
 * (.env → ru, .env.com → com; `vite build --mode com`). Всё, что зависит от домена,
 * берётся отсюда — в компонентах доменов быть не должно.
 */
export type SiteTarget = 'ru' | 'com';

export const SITE_TARGET: SiteTarget = import.meta.env.VITE_SITE_TARGET === 'com' ? 'com' : 'ru';

export const RU_SITE_URL = 'https://royaleventandmice.ru';
export const COM_SITE_URL = 'https://www.royaleventandmice.com';

/** Хост текущей сборки (для og:image и прочих абсолютных ссылок на свои файлы). */
export const SITE_URL = SITE_TARGET === 'com' ? COM_SITE_URL : RU_SITE_URL;

export const SITE_NAME = 'La Royal Event';

/**
 * Канонический URL: RU-страницы живут на .ru, EN — на .com, независимо от того,
 * с какого хоста открыта страница. Все адреса — со слэшем на конце: Apache на
 * reg.ru 301-ит без слэша, на Vercel включён trailingSlash.
 */
export const hostForLanguage = (lang: 'ru' | 'en') => (lang === 'ru' ? RU_SITE_URL : COM_SITE_URL);
export const withHost = (host: string, path: string) => (path.endsWith('/') ? `${host}${path}` : `${host}${path}/`);
