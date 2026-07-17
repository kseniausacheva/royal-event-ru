import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import type { HelmetServerState } from 'react-helmet-async';
import { AppContent } from './App';

/**
 * SSG-рендер одного маршрута (вызывается из scripts/prerender.mjs после vite build).
 *
 * Почему prerenderToNodeStream, а не renderToString: страницы подключены через
 * React.lazy, а renderToString не умеет ждать динамические import'ы — вместо
 * контента он отдал бы Suspense-фолбэк (спиннер). prerenderToNodeStream — тот же
 * статический рендерер React 19, но он дожидается всех lazy-чанков и отдаёт
 * полную разметку, пригодную для hydrateRoot на клиенте.
 *
 * Дерево должно 1-в-1 совпадать с клиентским (src/main.tsx): StrictMode →
 * HelmetProvider → Router → AppContent. Иначе гидратация посыплется (#418).
 */
async function renderPass(url: string): Promise<{ html: string; helmet: HelmetServerState }> {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppContent />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
    {
      onError(error: unknown) {
        // Ошибка в рендере роута должна валить prerender, а не тихо отдавать
        // урезанный HTML — иначе на прод уедет пустая страница.
        throw error;
      },
      // У fizz-рендерера есть стриминговая эвристика: Suspense-границу больше
      // ~12 КБ он «выносит» из потока (фолбэк инлайн + контент в <div hidden>
      // + swap-скрипт), чтобы раньше отдать оболочку. Для SSG это вредно —
      // робот без JS видит спиннер. Задираем порог, чтобы завершённые границы
      // всегда инлайнились (наши страницы — десятки КБ).
      progressiveChunkSize: 64 * 1024 * 1024,
    },
  );

  const html = await new Promise<string>((resolve, reject) => {
    let out = '';
    prelude.on('data', (chunk: Buffer) => {
      out += chunk.toString('utf8');
    });
    prelude.on('end', () => resolve(out));
    prelude.on('error', reject);
  });

  return { html, helmet: helmetContext.helmet! };
}

/** Маркер незавершённой Suspense-границы в выводе fizz-рендерера */
const PENDING_BOUNDARY = '<!--$?-->';

export async function render(url: string): Promise<{ html: string; helmet: HelmetServerState }> {
  // React.lazy при первом рендере суспендится, и граница уходит в вывод
  // «стримингово»: видимый фолбэк-спиннер + контент в <div hidden> со
  // swap-скриптом. Для SSG это неприемлемо (робот без JS видит спиннер).
  // Но lazy кэширует загруженный модуль, поэтому повторный проход рендерит
  // страницу инлайн без pending-границ. До 3 проходов — на случай вложенных lazy.
  let result = await renderPass(url);
  for (let attempt = 0; attempt < 2 && result.html.includes(PENDING_BOUNDARY); attempt++) {
    result = await renderPass(url);
  }
  if (result.html.includes(PENDING_BOUNDARY)) {
    const at = result.html.indexOf(PENDING_BOUNDARY);
    const ctx = result.html.slice(Math.max(0, at - 150), at + 400);
    throw new Error(
      `SSG ${url}: Suspense-граница не завершилась за 3 прохода рендера.\nКонтекст: …${ctx}…`,
    );
  }
  return result;
}
