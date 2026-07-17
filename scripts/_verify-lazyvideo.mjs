// Временная проверка LazyVideo: видео не грузятся при открытии,
// оживают при подскролле. Запуск: node scripts/_verify-lazyvideo.mjs
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });

let videoBytes = 0;
page.on('response', async (res) => {
  if (res.url().includes('/videos/')) {
    const len = Number(res.headers()['content-length'] || 0);
    videoBytes += len;
  }
});

await page.goto('http://localhost:4174/ru/', { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise((r) => setTimeout(r, 1500));

const atLoad = await page.$$eval('video', (vs) => vs.map((v) => (v.src ? 'LOADED' : 'lazy')));
const bytesAtLoad = videoBytes;

await page.evaluate(() => document.querySelector('video').scrollIntoView({ block: 'center' }));
await new Promise((r) => setTimeout(r, 3000));

const afterScroll = await page.$$eval('video', (vs) =>
  vs.map((v) => ({ src: v.src ? v.src.split('/').pop() : 'lazy', playing: !v.paused }))
);

console.log(JSON.stringify({
  при_загрузке: atLoad,
  видеобайт_при_загрузке: bytesAtLoad,
  после_скролла: afterScroll,
}, null, 1));

await browser.close();
