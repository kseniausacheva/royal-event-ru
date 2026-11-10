import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

/**
 * Функции Vercel в api/ исполняются как ES-модули Node ("type": "module"):
 * относительный импорт без расширения падает с ERR_MODULE_NOT_FOUND на каждом
 * запросе. Так с 16.09 по 10.11.2026 на .com не работали форма заявки и подписка,
 * а vitest это не ловил — он резолвит импорты сам.
 */
describe('api/ relative imports', () => {
  const dir = path.resolve(__dirname, '../../api');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.ts') && !f.endsWith('.d.ts'));

  it.each(files)('%s imports local modules with a .js extension', (file) => {
    const src = fs.readFileSync(path.join(dir, file), 'utf-8');
    const relative = [...src.matchAll(/from\s+['"](\.{1,2}\/[^'"]+)['"]/g)].map((m) => m[1]);
    for (const spec of relative) expect(spec, `${file}: ${spec}`).toMatch(/\.js$/);
  });
});
