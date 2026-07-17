import React, { useEffect, useRef, useState } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

/**
 * Видео, которое не начинает грузиться, пока блок не приблизится к вьюпорту.
 * До этого браузер показывает только poster — лёгкий jpg вместо мегабайтов mp4
 * (семь autoplay-роликов главной суммарно тянули ~31 МБ при каждом открытии).
 * Когда блок уходит из вьюпорта, ролик ставится на паузу — экономит CPU и батарею.
 */
const LazyVideo: React.FC<LazyVideoProps> = ({ src, ...rest }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Старые браузеры без IntersectionObserver — грузим сразу, как раньше
    if (!('IntersectionObserver' in window)) {
      setLoaded(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setLoaded(true);
            el.play?.().catch(() => {});
          } else {
            el.pause?.();
          }
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={loaded ? src : undefined}
      preload={loaded ? 'metadata' : 'none'}
      // Атрибут autoplay срабатывает не всегда, если src появился после маунта —
      // страхуемся явным play() как только данные готовы
      onLoadedData={
        rest.autoPlay ? (e) => { e.currentTarget.play().catch(() => {}); } : undefined
      }
      {...rest}
    />
  );
};

export default LazyVideo;
