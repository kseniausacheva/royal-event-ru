import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Пререндер — настоящий SSG (prerenderToNodeStream + StaticRouter,
// см. src/entry-server.tsx и scripts/prerender.mjs), поэтому серверная разметка
// совпадает с клиентской узел-в-узел и hydrateRoot переиспользует готовый DOM
// вместо перерисовки с нуля. Раньше тут был Puppeteer-слепок: он склеивал
// соседние текстовые узлы ({a} {b} в JSX), React кидал #418 и рендерил заново —
// из-за этого LCP на мобильных считался по второй отрисовке (~8-9 c).
// Дерево ниже (StrictMode → HelmetProvider → App) обязано совпадать с entry-server.
const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

if (container.hasChildNodes()) {
  // Страница пришла из SSG — гидратируем готовую разметку.
  hydrateRoot(container, app);
} else {
  // Dev-сервер и SPA-фолбэк (маршруты без пререндера) отдают пустой #root.
  createRoot(container).render(app);
}
