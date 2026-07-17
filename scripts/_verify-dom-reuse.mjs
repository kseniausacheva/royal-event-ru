// Доказательство переиспользования DOM при гидратации:
// метим серверный h1 атрибутом ДО исполнения любого JS страницы (document_start
// + MutationObserver ловит узел в момент парсинга). Если hydrateRoot переиспользовал
// разметку — метка остаётся; если React перерисовал с нуля — узел новый, метки нет.
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });

const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text().slice(0, 160)}`);
});
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + String(e).slice(0, 160)));

await page.evaluateOnNewDocument(() => {
  const mark = () => {
    const h1 = document.querySelector('h1');
    if (h1 && !h1.hasAttribute('data-ssg-marker')) {
      h1.setAttribute('data-ssg-marker', 'server-node');
      window.__markedAt = document.readyState; // 'loading' = до выполнения бандла
    }
  };
  // На document_start documentElement ещё null — наблюдаем сам document
  new MutationObserver(mark).observe(document, { childList: true, subtree: true });
  mark();
});

const results = {};
for (const path of ['/ru/', '/ru/about/', '/ru/blog/trends-2026/']) {
  await page.goto('http://localhost:4174' + path, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500)); // дать гидратации и анимациям завершиться
  results[path] = await page.evaluate(() => ({
    markedAt: window.__markedAt,
    markerSurvived: !!document.querySelector('h1[data-ssg-marker]'),
    h1Visible: (() => {
      const h1 = document.querySelector('h1');
      if (!h1) return false;
      const s = getComputedStyle(h1.querySelector('span') || h1);
      return s.opacity !== '0' && h1.textContent.trim().length > 0;
    })(),
  }));
}

// SPA-навигация: клик по ссылке в навбаре должен сменить URL без перезагрузки
await page.goto('http://localhost:4174/ru/', { waitUntil: 'networkidle2' });
await new Promise((r) => setTimeout(r, 2000));
await page.evaluate(() => {
  const a = [...document.querySelectorAll('nav a')].find((x) => x.getAttribute('href') === '/ru/services');
  a?.click();
});
await new Promise((r) => setTimeout(r, 1500));
results.navUrl = page.url();
results.navH1 = await page.$eval('h1', (el) => el.textContent.slice(0, 40)).catch(() => 'NONE');
results.консоль = errors.slice(0, 10);

console.log(JSON.stringify(results, null, 1));
await browser.close();
