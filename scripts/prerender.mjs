/**
 * Post-build SSG-пререндер (настоящий, без браузера).
 *
 * Как работает:
 *   1. `vite build` собирает клиент в dist/ (+ .vite/manifest.json).
 *   2. `vite build --ssr src/entry-server.tsx` собирает серверный бандл в dist-ssr/.
 *   3. Этот скрипт для каждого маршрута вызывает render() из SSR-бандла
 *      (prerenderToNodeStream + StaticRouter — дожидается lazy-чанков),
 *      подставляет разметку в <div id="root"> и заменяет SEO-блок шаблона
 *      (между <!-- seo:default:start --> и <!-- seo:default:end --> в index.html)
 *      на вывод react-helmet-async конкретной страницы.
 *
 * Чем это лучше старого Puppeteer-слепка: разметка совпадает с клиентским
 * рендером узел-в-узел, поэтому hydrateRoot в src/main.tsx переиспользует DOM
 * (слепок склеивал текстовые узлы → React #418 → полная перерисовка → LCP 8-9 c
 * на мобильных). Плюс не нужен Chromium в CI и рендер занимает секунды.
 *
 * Маршруты рендерятся со слэшем на конце: Apache на reg.ru 301-ит /ru → /ru/,
 * значит в браузере location.pathname всегда слэшный. Рендерим так же, чтобы
 * серверная разметка (например, активный пункт навбара, сравнивающий pathname)
 * совпала с клиентской при гидратации.
 *
 * Запускается автоматически через `npm run build` (postbuild-hook в package.json).
 */
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { blogArticles } from '../src/content/blog-articles.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const DIST_SSR = path.join(ROOT, 'dist-ssr');

// Цель сборки: `--target com` (Vercel, www.royaleventandmice.com) или ru (reg.ru, по умолчанию).
// На .ru пререндерим только /ru/* (EN там не индексируется — canonical на .com),
// на .com — и /ru/*, и /en/*.
const TARGET = process.argv.includes('--target') ? process.argv[process.argv.indexOf('--target') + 1] : 'ru';
if (!['ru', 'com'].includes(TARGET)) throw new Error(`Неизвестная цель сборки: ${TARGET}`);
const HOST_RU = 'https://royaleventandmice.ru';
const HOST_COM = 'https://www.royaleventandmice.com';

/**
 * Статичные маршруты сайта (русская локаль; английские зеркала строятся из них ниже).
 * EN-страницы пререндерятся на обеих целях: на .ru их canonical указывает на .com,
 * но краулер получает готовую разметку, а не SPA-фолбэк с русским head.
 * module — исходник lazy-страницы для <link rel="modulepreload"> (по манифесту
 * Vite); null у страниц, которые лежат в основном бандле (Home, Destination).
 */
const STATIC_ROUTES = [
  { route: '/ru', module: null },
  { route: '/ru/about', module: 'src/pages/About.tsx' },
  { route: '/ru/services', module: 'src/pages/Services.tsx' },
  { route: '/ru/portfolio', module: 'src/pages/Portfolio.tsx' },
  { route: '/ru/portfolio/carlsberg', module: 'src/pages/CaseStudy.tsx' },
  { route: '/ru/portfolio/nl-international', module: 'src/pages/CaseStudy.tsx' },
  { route: '/ru/portfolio/ewa-product', module: 'src/pages/CaseStudy.tsx' },
  { route: '/ru/portfolio/afa-agricultural', module: 'src/pages/CaseStudy.tsx' },
  { route: '/ru/portfolio/world-stars', module: 'src/pages/CaseStudy.tsx' },
  { route: '/ru/portfolio/bedouin-dinner', module: 'src/pages/CaseStudy.tsx' },
  { route: '/ru/egypt', module: null },
  { route: '/ru/russia', module: null },
  // La Royal Event: программы, круизы, DMC. Слаги программ — из src/content/la-royal-event.ts
  { route: '/ru/programmy', module: 'src/pages/Programs.tsx' },
  { route: '/ru/programmy/kod-piramid', module: 'src/pages/ProgramDetail.tsx' },
  { route: '/ru/programmy/poslednyaya-stranica', module: 'src/pages/ProgramDetail.tsx' },
  { route: '/ru/programmy/chetyre-ruki', module: 'src/pages/ProgramDetail.tsx' },
  { route: '/ru/programmy/posledniy-kadr', module: 'src/pages/ProgramDetail.tsx' },
  { route: '/ru/programmy/ladya', module: 'src/pages/ProgramDetail.tsx' },
  { route: '/ru/programmy/put-k-zvezdam', module: 'src/pages/ProgramDetail.tsx' },
  { route: '/ru/programmy/zapis-arheologa', module: 'src/pages/ProgramDetail.tsx' },
  { route: '/ru/programmy/muzey-ozhivaet', module: 'src/pages/ProgramDetail.tsx' },
  { route: '/ru/programmy/sokrovishcha-ra', module: 'src/pages/ProgramDetail.tsx' },
  { route: '/ru/programmy/faraon', module: 'src/pages/ProgramDetail.tsx' },
  { route: '/ru/cruises', module: 'src/pages/Cruises.tsx' },
  { route: '/ru/dmc', module: 'src/pages/DMC.tsx' },
  { route: '/ru/tickets', module: 'src/pages/Tickets.tsx' },
  { route: '/ru/delegations', module: 'src/pages/Delegations.tsx' },
  { route: '/ru/blog', module: 'src/pages/BlogPage.tsx' },
  { route: '/ru/contact', module: 'src/pages/Contact.tsx' },
  { route: '/ru/privacy', module: 'src/pages/PrivacyPolicy.tsx' },
  { route: '/ru/offer', module: 'src/pages/Offer.tsx' },
  { route: '/ru/data-consent', module: 'src/pages/DataConsent.tsx' },
  { route: '/ru/mailing-consent', module: 'src/pages/MailingConsent.tsx' },
];

// Автогенерация маршрутов для каждой статьи блога
const BLOG_ROUTES = blogArticles.map((a) => ({
  route: `/ru/blog/${a.id}`,
  module: 'src/pages/BlogPage.tsx',
}));

const RU_ROUTES = [...STATIC_ROUTES, ...BLOG_ROUTES];
const EN_ROUTES = RU_ROUTES.map((r) => ({ ...r, route: r.route.replace(/^\/ru/, '/en') }));
const ROUTES = [...RU_ROUTES, ...EN_ROUTES];

const SEO_BLOCK_RE = /<!-- seo:default:start[\s\S]*?<!-- seo:default:end -->/;
const ROOT_DIV = '<div id="root"></div>';

/** Строит <link rel="modulepreload"> + css-линки для lazy-чанка страницы. */
function buildPreloads(manifest, moduleId) {
  if (!moduleId || !manifest?.[moduleId]) return '';
  const entry = manifest[moduleId];
  const tags = [`<link rel="modulepreload" crossorigin href="/${entry.file}" />`];
  for (const css of entry.css || []) {
    tags.push(`<link rel="stylesheet" href="/${css}" />`);
  }
  return `\n    ${tags.join('\n    ')}`;
}

/** Проверки, без которых страницу нельзя выпускать на прод. Бросают при провале. */
function assertPage(route, html) {
  const fail = (msg) => {
    throw new Error(`Sanity-провал на ${route}: ${msg}`);
  };
  const canonicals = html.match(/rel="canonical"/g) || [];
  if (canonicals.length !== 1) fail(`canonical встречается ${canonicals.length} раз(а), должен ровно 1`);
  const href = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
  if (!href) fail('canonical без href');
  if (!href.endsWith('/')) fail(`canonical без конечного слэша: ${href}`);
  const expectedHost = route.startsWith('/en') ? HOST_COM : HOST_RU;
  if (!href.startsWith(expectedHost)) fail(`canonical не на ${expectedHost}: ${href}`);
  if (!/property="og:url"/.test(html)) fail('нет og:url');
  if (!/<h1/.test(html)) fail('в разметке нет <h1> — страница отрендерилась пустой?');
  const rootIdx = html.indexOf('<div id="root">');
  if (rootIdx === -1) fail('нет <div id="root">');
  if (html.length - rootIdx < 3000) fail('подозрительно мало разметки внутри #root');
  // Незавершённая Suspense-граница = в статике виден фолбэк-спиннер,
  // а контент спрятан в <div hidden> до выполнения JS. Для SEO это провал.
  if (html.includes('<!--$?-->')) fail('незавершённая Suspense-граница (спиннер вместо контента)');
}

async function run() {
  console.log('\n🔧 SSG-prerender', ROUTES.length, 'routes...\n');
  const start = Date.now();

  let template;
  try {
    template = await fs.readFile(path.join(DIST, 'index.html'), 'utf-8');
  } catch {
    console.error('❌ dist/index.html не найден. Запустите `npm run build` сначала.');
    process.exit(1);
  }
  if (!SEO_BLOCK_RE.test(template)) {
    console.error('❌ В dist/index.html нет маркеров <!-- seo:default:start/end -->.');
    process.exit(1);
  }
  if (!template.includes(ROOT_DIV)) {
    console.error('❌ В dist/index.html нет пустого <div id="root"></div>.');
    process.exit(1);
  }

  let render;
  try {
    ({ render } = await import(pathToUrl(path.join(DIST_SSR, 'entry-server.js'))));
  } catch (e) {
    console.error('❌ Не найден SSR-бандл dist-ssr/entry-server.js. Запустите `npm run build` (он соберёт его перед пререндером).');
    throw e;
  }

  // Манифест клиентской сборки — для modulepreload lazy-чанков страниц
  let manifest = null;
  try {
    manifest = JSON.parse(await fs.readFile(path.join(DIST, '.vite', 'manifest.json'), 'utf-8'));
  } catch {
    console.warn('⚠️ dist/.vite/manifest.json не найден — страницы будут без modulepreload lazy-чанков.');
  }

  /** Рендерит url и собирает готовый HTML страницы из шаблона. */
  async function buildPage(url, module) {
    const { html: appHtml, helmet } = await render(url);

    let page = template;

    // <html lang="…"> — из helmet (данные + data-rh, чтобы клиентский helmet взял тег под управление)
    const htmlAttrs = helmet.htmlAttributes.toString();
    if (htmlAttrs) page = page.replace(/<html[^>]*>/, `<html ${htmlAttrs}>`);

    // SEO-блок шаблона → head конкретной страницы
    const head = [
      '<!-- ssg:head -->',
      helmet.title.toString(),
      helmet.meta.toString(),
      helmet.link.toString(),
      helmet.script.toString(),
    ]
      .filter(Boolean)
      .join('\n    ');
    // Функция-замена и split/join ниже — чтобы «$&»-подобные последовательности
    // в контенте не трактовались String.replace как спецсимволы подстановки
    page = page.replace(SEO_BLOCK_RE, () => head);

    // JSON-LD WebSite в шаблоне (вне SEO-блока) — язык по маршруту
    if (url.startsWith('/en')) page = page.replace('"inLanguage": "ru-RU"', '"inLanguage": "en-US"');

    // Разметка приложения
    page = page.split(ROOT_DIV).join(`<div id="root">${appHtml}</div>`);

    // Прелоад lazy-чанка страницы — чтобы гидратация её Suspense-границы
    // не ждала каскад «главный бандл → потом запрос чанка»
    const preloads = buildPreloads(manifest, module);
    if (preloads) page = page.replace('</head>', `${preloads}\n  </head>`);

    // Метка пререндера (помогает в дебаге выдачи)
    page = page.replace(/<head>/, '<head><!-- prerendered-ssg ' + new Date().toISOString() + ' -->');

    return page;
  }

  for (const { route, module } of ROUTES) {
    // Рендерим слэшный URL (см. шапку файла), пишем в dist/<route>/index.html
    const url = route.endsWith('/') ? route : `${route}/`;
    const page = await buildPage(url, module);

    assertPage(route, page);

    const targetDir = path.join(DIST, route);
    await fs.mkdir(targetDir, { recursive: true });
    const targetFile = path.join(targetDir, 'index.html');
    await fs.writeFile(targetFile, page, 'utf-8');
    console.log('  ✓', url, '→', path.relative(ROOT, targetFile));
  }

  // Настоящая страница 404: Apache отдаёт её через ErrorDocument 404 /404.html
  // (см. public/.htaccess) с честным HTTP-статусом на любом несуществующем пути.
  // Рендерим NotFound по заведомо несуществующему ru-адресу. Страница noindex.
  const page404 = await buildPage('/ru/404/', 'src/pages/NotFound.tsx');
  assertPage('/404.html', page404);
  await fs.writeFile(path.join(DIST, '404.html'), page404, 'utf-8');
  console.log('  ✓ /404.html (ErrorDocument для Apache)');

  // Манифест в проде не нужен — не тащим его по FTP
  await fs.rm(path.join(DIST, '.vite'), { recursive: true, force: true });

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    if (TARGET === 'com') {
    // На Vercel PHP не исполняется, а .htaccess не нужен — убираем, чтобы не отдавать исходники.
    for (const f of ['contact.php', 'subscribe.php', '.htaccess', 'mail-config.php']) {
      await fs.rm(path.join(DIST, f), { force: true });
    }
    await fs.writeFile(path.join(DIST, 'robots.txt'), [
      '# robots.txt для www.royaleventandmice.com',
      'User-agent: *',
      'Allow: /',
      'Disallow: /api/',
      'Disallow: /*?*utm_',
      'Disallow: /*?*gclid',
      'Disallow: /*?*fbclid',
      '',
      `Sitemap: ${HOST_COM}/sitemap.xml`,
      '',
    ].join('\n'));
    console.log('  ✓ com: удалены PHP/.htaccess, записан robots.txt');
  }
  console.log(`\n✅ SSG-prerendered ${ROUTES.length} routes + 404.html in ${elapsed}s\n`);
}

/** Windows-совместимый file:// URL для динамического import() */
function pathToUrl(p) {
  return new URL(`file:///${p.replace(/\\/g, '/')}`).href;
}

run().catch((err) => {
  console.error('\n❌ Prerender failed:');
  console.error(err);
  process.exit(1);
});
