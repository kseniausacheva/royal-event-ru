// Временная проверка гидратации: консоль без ошибок, контент на месте,
// интерактив живой (модалка видео, навигация). node scripts/_verify-hydration.mjs
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });

const consoleMsgs = [];
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') consoleMsgs.push(`${m.type()}: ${m.text().slice(0, 200)}`);
});
page.on('pageerror', (e) => consoleMsgs.push('PAGEERROR: ' + String(e).slice(0, 200)));

await page.goto('http://localhost:4174/ru/', { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

const checks = {};
checks.h1 = await page.$eval('h1', (el) => el.textContent.slice(0, 60));
checks.героКартинка = await page.$eval('img[src*="hero-bg"]', (el) => el.complete && el.naturalWidth > 0);
checks.секцийНаСтранице = await page.$$eval('section, [class*="py-"]', (els) => els.length > 5);

// Интерактив: клик по featured-видео должен открыть модалку
await page.evaluate(() => document.querySelector('video')?.closest('[class*="cursor-pointer"]')?.scrollIntoView({ block: 'center' }));
await new Promise((r) => setTimeout(r, 1200));
await page.evaluate(() => document.querySelector('video')?.closest('[class*="cursor-pointer"]')?.click());
await new Promise((r) => setTimeout(r, 800));
checks.модалкаОткрылась = await page.evaluate(() => !!document.querySelector('.fixed.inset-0 video[controls]'));
await page.keyboard.press('Escape');

// Навигация на внутреннюю страницу
await page.click('a[href*="/ru/services"]').catch(() => {});
await new Promise((r) => setTimeout(r, 1500));
checks.урлПослеНавигации = page.url();

// Гидратация на странице блога (другой роут)
await page.goto('http://localhost:4174/ru/blog/trends-2026/', { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));
checks.блогЗаголовок = await page.$eval('h1', (el) => el.textContent.slice(0, 50));

console.log(JSON.stringify({ checks, консоль: consoleMsgs.slice(0, 12) }, null, 1));
await browser.close();
