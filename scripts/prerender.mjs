/**
 * Post-build prerender:
 * Запускает headless Chromium через @prerenderer/prerenderer, открывает каждый
 * маршрут SPA-приложения и сохраняет получившийся HTML в `dist/<route>/index.html`.
 *
 * Это критично для SEO под Яндекс/Google: они видят готовый контент с заголовками,
 * мета-тегами и JSON-LD без необходимости выполнять JS.
 *
 * Запускается автоматически через `npm run build` (postbuild-hook в package.json).
 *
 * Если на машине нет Chromium — Puppeteer его скачает (~100 МБ) при первом запуске.
 */
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import Prerenderer from '@prerenderer/prerenderer';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

/**
 * Все маршруты сайта (только русская локаль — она основная для .ru-домена).
 * Английские роуты на этом домене не индексируются (canonical на .com).
 */
const ROUTES = [
  '/ru',
  '/ru/about',
  '/ru/services',
  '/ru/portfolio',
  '/ru/portfolio/carlsberg',
  '/ru/portfolio/nl-international',
  '/ru/portfolio/ewa-product',
  '/ru/portfolio/afa-agricultural',
  '/ru/portfolio/world-stars',
  '/ru/portfolio/bedouin-dinner',
  '/ru/egypt',
  '/ru/uae',
  '/ru/russia',
  '/ru/delegations',
  '/ru/blog',
  '/ru/blog/trends-2026',
  '/ru/blog/egypt-events',
  '/ru/blog/coffee-break-organization',
  '/ru/blog/team-building-culture',
  '/ru/contact',
  '/ru/privacy',
  '/ru/offer',
  '/ru/data-consent',
  '/ru/mailing-consent',
];

async function run() {
  console.log('\n🔧 Prerendering', ROUTES.length, 'routes...\n');
  const start = Date.now();

  // Проверяем, что dist/ существует (значит, build прошёл)
  try {
    await fs.access(DIST);
  } catch {
    console.error('❌ dist/ не найден. Запустите `npm run build` сначала.');
    process.exit(1);
  }

  const prerenderer = new Prerenderer({
    staticDir: DIST,
    indexPath: path.join(DIST, 'index.html'),
    renderer: new PuppeteerRenderer({
      renderAfterTime: 5000,
      headless: true,
      launchOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
      consoleHandler: (route, message) => {
        if (message.type() === 'error') {
          console.log(`[browser error on ${route}]`, message.text());
        }
      },
      async pageHandler(page, route) {
        page.on('pageerror', (err) => {
          console.log(`[pageerror on ${route}]`, err.message);
        });
      },
    }),
  });

  try {
    await prerenderer.initialize();
    const rendered = await prerenderer.renderRoutes(ROUTES);

    for (const r of rendered) {
      // Куда писать: для /ru → dist/ru/index.html, для /ru/about → dist/ru/about/index.html
      const targetDir = path.join(DIST, r.route);
      await fs.mkdir(targetDir, { recursive: true });
      const targetFile = path.join(targetDir, 'index.html');

      // Помечаем что HTML — пререндер (поможет в дебаге, если что-то странное в выдаче)
      const html = r.html.replace(
        /<head>/,
        '<head><!-- prerendered ' + new Date().toISOString() + ' -->',
      );

      await fs.writeFile(targetFile, html, 'utf-8');
      console.log('  ✓', r.route, '→', path.relative(ROOT, targetFile));
    }

    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\n✅ Prerendered ${rendered.length} routes in ${elapsed}s\n`);
  } finally {
    await prerenderer.destroy();
  }
}

run().catch((err) => {
  console.error('\n❌ Prerender failed:');
  console.error(err);
  process.exit(1);
});
