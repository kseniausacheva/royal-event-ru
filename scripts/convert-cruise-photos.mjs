/**
 * Конвертирует фото судов в webp для public/cruises/ (sharp уже в devDependencies).
 *
 *   node scripts/convert-cruise-photos.mjs "<папка с фото>" --list
 *       посмотреть, что лежит в папке (и в подпапках): размеры, вес, читается ли файл
 *
 *   node scripts/convert-cruise-photos.mjs "<папка с фото>" --prefix dendera
 *       сконвертировать всё из папки в public/cruises/dendera-01.webp, dendera-02.webp…
 *
 *   node scripts/convert-cruise-photos.mjs "<папка>" --prefix dendera --only "Dendera/,IMG_4512"
 *       взять только файлы, в пути которых есть одна из подстрок (через запятую)
 *
 * Опции:
 *   --prefix <имя>   префикс имён файлов (обязателен, кроме --list)
 *   --out <папка>    куда класть, по умолчанию public/cruises
 *   --max <px>       длинная сторона, по умолчанию 1600 (маленькие не увеличиваются)
 *   --quality <n>    качество webp, по умолчанию 82
 *   --keep-names     вместо номеров — латинизированное имя исходника: dendera-<имя>.webp
 *   --dry-run        показать план, ничего не писать
 *
 * Поворот по EXIF применяется, метаданные (EXIF, GPS, дата съёмки) вырезаются.
 * HEIC с айфона sharp из npm не декодирует (лицензия HEVC) — такие файлы
 * пропускаются с пометкой; их надо сначала сохранить как JPG.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.heic', '.heif', '.avif']);

// ── Аргументы ────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const WITH_VALUE = new Set(['prefix', 'out', 'max', 'quality', 'only']);
const opts = {};
const positional = [];
for (let i = 0; i < argv.length; i += 1) {
  const a = argv[i];
  if (!a.startsWith('--')) positional.push(a);
  else if (WITH_VALUE.has(a.slice(2))) opts[a.slice(2)] = argv[++i];
  else opts[a.slice(2)] = true;
}
const flag = (name) => opts[name] === true;
const opt = (name, def) => (opts[name] !== undefined && opts[name] !== true ? opts[name] : def);

const srcDir = positional[0];
const listOnly = flag('list');
const dryRun = flag('dry-run');
const keepNames = flag('keep-names');
const prefix = opt('prefix');
const outDir = path.resolve(ROOT, opt('out', 'public/cruises'));
const maxSide = Number(opt('max', 1600));
const quality = Number(opt('quality', 82));
const only = opt('only', '').split(',').map((s) => s.trim()).filter(Boolean);

if (!srcDir) fail('Укажите папку с фото: node scripts/convert-cruise-photos.mjs "<папка>" --list');
if (!listOnly && !prefix) fail('Нужен --prefix <имя> (например --prefix dendera) или --list');
if (prefix && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(prefix)) fail('--prefix: только латиница, цифры и дефис, например nour-el-nil');

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

// ── Файлы ────────────────────────────────────────────────────────────
async function walk(dir, base = dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full, base)));
    else if (EXT.has(path.extname(e.name).toLowerCase())) out.push({ full, rel: path.relative(base, full).split(path.sep).join('/') });
  }
  return out.sort((a, b) => a.rel.localeCompare(b.rel, 'ru', { numeric: true }));
}

async function probe(file) {
  const { size } = await fs.stat(file.full);
  try {
    const m = await sharp(file.full).metadata();
    // orientation 5–8 — кадр повёрнут на 90°, ширина и высота меняются местами
    const swap = (m.orientation ?? 1) >= 5;
    return { ...file, size, w: swap ? m.height : m.width, h: swap ? m.width : m.height, ok: true };
  } catch (err) {
    return { ...file, size, ok: false, error: /heif|heic|hevc/i.test(String(err)) ? 'HEIC — сохранить как JPG' : String(err.message ?? err).split('\n')[0] };
  }
}

const TRANSLIT = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya' };
const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[а-яё]/g, (c) => TRANSLIT[c] ?? '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const kb = (n) => `${Math.round(n / 1024)} КБ`;

// ── Главное ──────────────────────────────────────────────────────────
const src = path.resolve(srcDir);
let files = await walk(src);
if (only.length) files = files.filter((f) => only.some((s) => f.rel.includes(s)));
if (!files.length) fail(`В ${src} нет фото (${[...EXT].join(', ')})${only.length ? ` с подстроками ${only.join(', ')}` : ''}`);

const probed = [];
for (const f of files) probed.push(await probe(f));

if (listOnly) {
  console.log(`${src}: ${probed.length} файл(ов)\n`);
  for (const p of probed) console.log(p.ok ? `${p.rel}\t${p.w}×${p.h}\t${kb(p.size)}` : `${p.rel}\t— не читается: ${p.error}`);
  const bad = probed.filter((p) => !p.ok).length;
  if (bad) console.log(`\nНе читается: ${bad}`);
  process.exit(0);
}

if (!dryRun) await fs.mkdir(outDir, { recursive: true });
let n = 0;
const used = new Set();
for (const p of probed) {
  if (!p.ok) {
    console.log(`пропуск  ${p.rel} — ${p.error}`);
    continue;
  }
  n += 1;
  let name = keepNames ? slug(path.basename(p.rel, path.extname(p.rel))) : String(n).padStart(2, '0');
  if (!name) name = String(n).padStart(2, '0');
  while (used.has(name)) name = `${name}-${n}`;
  used.add(name);
  const outFile = path.join(outDir, `${prefix}-${name}.webp`);
  const relOut = path.relative(ROOT, outFile).split(path.sep).join('/');
  if (dryRun) {
    console.log(`${p.rel}  →  ${relOut}  (${p.w}×${p.h})`);
    continue;
  }
  const info = await sharp(p.full)
    .rotate()
    .resize({ width: maxSide, height: maxSide, fit: 'inside', withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toFile(outFile);
  console.log(`${p.rel}  →  ${relOut}  ${info.width}×${info.height}  ${kb(info.size)}`);
}
console.log(`\nГотово: ${n} из ${probed.length}${dryRun ? ' (dry-run, файлы не записаны)' : ` → ${path.relative(ROOT, outDir)}`}`);
