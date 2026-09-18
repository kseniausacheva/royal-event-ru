import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CruiseRouteMap from './CruiseRouteMap';
import type { CruiseDay } from '../content/la-royal-event';

const days: CruiseDay[] = [
  { day: 'День 1', place: 'Эсна', text: 'Посадка и храм Хнума.' },
  { day: 'День 2', place: 'Эдфу', text: 'Храм Гора на конных экипажах.' },
  {
    day: 'День 3',
    place: 'Просто Нил',
    text: 'Идём под парусом весь день.',
    image: { src: '/cruises/day-3.webp', alt: 'Дахабия под парусом' },
  },
];

const setup = () => render(<CruiseRouteMap days={days} routeLabel="Эсна → Асуан" routeMeta="6 дней" />);

describe('CruiseRouteMap', () => {
  it('открывается на первом дне', () => {
    setup();
    expect(screen.getByRole('heading', { name: 'Эсна' })).toBeInTheDocument();
    expect(screen.getByText('Посадка и храм Хнума.')).toBeInTheDocument();
  });

  it('по клику на точку маршрута меняет кадр и текст', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: 'День 3: Просто Нил' }));

    expect(screen.getByRole('heading', { name: 'Просто Нил' })).toBeInTheDocument();
    expect(screen.getByText('Идём под парусом весь день.')).toBeInTheDocument();
    expect(screen.getByAltText('Дахабия под парусом')).toHaveAttribute('src', '/cruises/day-3.webp');
  });

  it('стрелка ведёт к следующему дню, в начале маршрута «назад» недоступно', () => {
    setup();
    expect(screen.getByRole('button', { name: 'Предыдущий день маршрута' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Следующий день маршрута' }));
    expect(screen.getByRole('heading', { name: 'Эдфу' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Предыдущий день маршрута' })).toBeEnabled();
  });

  it('день без фотографии рисует заставку вместо битой картинки', () => {
    setup();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
