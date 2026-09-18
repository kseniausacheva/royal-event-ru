import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fleet, dahabiyas, programs, type Photo } from './la-royal-event';

/**
 * Контент «Круизы» и «Программы»: все фото, на которые ссылаются данные,
 * лежат в public/, а alt-подписи заполнены и написаны по-русски.
 * Ловит опечатки в путях до того, как битая картинка уедет на оба сайта.
 * `npm test` запускается из корня проекта, поэтому public/ берём от cwd
 * (в jsdom import.meta.url — не file://, и fileURLToPath на нём падает).
 */
const PUBLIC = path.resolve(process.cwd(), 'public');

const photos: Photo[] = [
  ...fleet.flatMap((s) => [{ src: s.hero, alt: `${s.name} — судно на Ниле` }, ...s.gallery]),
  ...dahabiyas.boats.flatMap((b) => [...(b.hero ? [b.hero] : []), ...(b.gallery ?? [])]),
  ...dahabiyas.gallery,
  ...dahabiyas.days.flatMap((d) => (d.image ? [d.image] : [])),
  ...programs.flatMap((p) => p.gallery ?? []),
];

describe('фото круизов и программ', () => {
  it('каждый src начинается с / и файл есть в public/', () => {
    const missing = [...photos.map((p) => p.src), ...programs.map((p) => p.image).filter((s): s is string => !!s)]
      .filter((src) => !src.startsWith('/') || !existsSync(path.join(PUBLIC, src)));
    expect(missing).toEqual([]);
  });

  it('alt-подписи не пустые и на русском', () => {
    const bad = photos.filter((p) => !/[а-яё]/i.test(p.alt)).map((p) => `${p.src}: «${p.alt}»`);
    expect(bad).toEqual([]);
  });

  it('src в галереях не повторяются', () => {
    const seen = new Set<string>();
    const dup = photos.map((p) => p.src).filter((s) => (seen.has(s) ? true : (seen.add(s), false)));
    expect(dup).toEqual([]);
  });
});
