import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// ВНИМАНИЕ: hydrateRoot тут НЕ работает (проверено 07-2026). Пререндер — это
// слепок DOM: соседние текстовые узлы ({a} {b} в JSX) в нём склеены в один,
// а гидратация требует точных границ узлов → React выбрасывает #418 и всё
// равно перерисовывает с нуля. Чтобы гидратация стала возможной, пререндер
// нужно переводить на настоящий SSG (renderToString) — отдельная задача.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
