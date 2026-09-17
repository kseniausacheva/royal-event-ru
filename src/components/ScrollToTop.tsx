import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Прокрутка наверх при переходе по ссылке.
 *
 * React Router сам позицию не сбрасывает: без этого посетитель, ушедший со
 * страницы по ссылке из футера, попадал на новую страницу сразу в её конец.
 *
 * Навигацию «назад/вперёд» (POP) не трогаем — там браузер возвращает прежнюю
 * позицию сам, и это ожидаемое поведение. Ссылку с якорем (#id) ведём к блоку.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (navigationType === 'POP') return;

    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, navigationType]);

  return null;
};

export default ScrollToTop;
