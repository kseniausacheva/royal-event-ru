import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PhotoSet, ZoomImage } from './PhotoLightbox';

const photos = [
  { src: '/a.webp', alt: 'Первое фото' },
  { src: '/b.webp', alt: 'Второе фото' },
];

const Demo = () => (
  <PhotoSet photos={photos}>
    {(open) => photos.map((p, i) => <ZoomImage key={p.src} src={p.src} alt={p.alt} onOpen={() => open(i)} />)}
  </PhotoSet>
);

describe('PhotoSet', () => {
  it('открывает фото по клику, листает стрелками и закрывается по Esc', () => {
    render(<Demo />);
    expect(screen.queryByRole('dialog')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Открыть фото: Второе фото' }));
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Второе фото');
    expect(screen.getByText('2 / 2')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Первое фото');

    fireEvent.click(screen.getByRole('button', { name: 'Предыдущее фото' }));
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Второе фото');

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('закрывается по клику на фон, но не по клику на само фото', () => {
    render(<Demo />);
    fireEvent.click(screen.getByRole('button', { name: 'Открыть фото: Первое фото' }));
    fireEvent.click(screen.getByRole('dialog').querySelector('img')!);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('dialog'));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
