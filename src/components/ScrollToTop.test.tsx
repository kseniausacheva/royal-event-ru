import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

/**
 * Регрессия: раньше переход по ссылке оставлял страницу на прежней прокрутке,
 * и посетитель из футера попадал в конец следующей страницы.
 */
const Harness = () => (
  <MemoryRouter initialEntries={['/ru']}>
    <ScrollToTop />
    <Link to="/ru/cruises">Круизы</Link>
    <Link to="/ru/cruises#dahabiya">Дахабии</Link>
    <Routes>
      <Route path="/ru" element={<p>Главная</p>} />
      <Route path="/ru/cruises" element={<p>Круизы</p>} />
    </Routes>
  </MemoryRouter>
);

describe('ScrollToTop', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
  });

  it('поднимает страницу наверх при переходе по ссылке', () => {
    render(<Harness />);
    (window.scrollTo as unknown as ReturnType<typeof vi.fn>).mockClear();

    fireEvent.click(screen.getByRole('link', { name: 'Круизы' }));

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('не трогает прокрутку при первом открытии страницы (POP)', () => {
    render(<Harness />);
    // При первом рендере навигация считается POP — браузер сам восстанавливает позицию
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('ведёт к блоку, если в ссылке есть якорь', () => {
    const target = document.createElement('div');
    target.id = 'dahabiya';
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    render(<Harness />);
    (window.scrollTo as unknown as ReturnType<typeof vi.fn>).mockClear();

    fireEvent.click(screen.getByRole('link', { name: 'Дахабии' }));

    expect(target.scrollIntoView).toHaveBeenCalled();
    expect(window.scrollTo).not.toHaveBeenCalled();
    target.remove();
  });
});
