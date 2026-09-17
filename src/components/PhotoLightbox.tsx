import React, { useCallback, useEffect, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import type { Photo } from '../content/la-royal-event';

/**
 * Фото с увеличением: при наведении кадр мягко приближается и показывает
 * значок «развернуть», по клику открывается на весь экран (см. PhotoSet).
 * На телефонах наведения нет, там работает тап.
 */
type ZoomImageProps = {
  src: string;
  alt: string;
  onOpen: () => void;
  /** Классы кнопки-обёртки: размер, пропорции, скругление, рамка. */
  className?: string;
  /** Классы самой картинки, обычно object-cover. */
  imgClassName?: string;
  loading?: 'lazy' | 'eager';
};

export const ZoomImage: React.FC<ZoomImageProps> = ({ src, alt, onOpen, className = '', imgClassName = '', loading = 'lazy' }) => (
  <button
    type="button"
    onClick={onOpen}
    aria-label={`Открыть фото: ${alt}`}
    className={`group relative block overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-lilac ${className}`}
  >
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={`block w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 ${imgClassName}`}
    />
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-royal-night/0 transition-colors group-hover:bg-royal-night/15" />
    <span aria-hidden="true" className="pointer-events-none absolute right-2 top-2 rounded-full bg-royal-night/70 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100">
      <Maximize2 className="w-3.5 h-3.5" />
    </span>
  </button>
);

type PhotoSetProps = {
  photos: Photo[];
  /** Разметка миниатюр; open(i) открывает i-й кадр набора на весь экран. */
  children: (open: (index: number) => void) => ReactNode;
};

/**
 * Набор фото с общим полноэкранным просмотром: стрелки и ← → листают,
 * Esc, крестик и клик по фону закрывают. Пока просмотр закрыт, в DOM его нет,
 * поэтому пререндер (SSG) отдаёт только миниатюры.
 */
export const PhotoSet: React.FC<PhotoSetProps> = ({ photos, children }) => {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, close, step]);

  const photo = index === null ? null : photos[index];
  const navClass = 'absolute top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20';

  return (
    <>
      {children(setIndex)}
      {photo && index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
          onClick={close}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-royal-night/95 p-4 sm:p-8"
        >
          <button type="button" onClick={close} aria-label="Закрыть" className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20">
            <X className="w-5 h-5" />
          </button>
          {photos.length > 1 && (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Предыдущее фото" className={`${navClass} left-2 sm:left-4`}>
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Следующее фото" className={`${navClass} right-2 sm:right-4`}>
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[82vh] max-w-full rounded-xl object-contain shadow-2xl"
          />
          <p className="mt-4 max-w-2xl text-center text-sm text-royal-sand-2">
            {photo.alt}
            {photos.length > 1 && <span className="ml-3 text-royal-dim">{`${index + 1} / ${photos.length}`}</span>}
          </p>
        </div>
      )}
    </>
  );
};
