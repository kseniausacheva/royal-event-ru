import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CruiseDay } from '../content/la-royal-event';

/**
 * Интерактивная карта маршрута дахабии Эсна → Асуан.
 *
 * Справа — стилизованное русло Нила с шестью стоянками, слева — кадр и текст
 * выбранного дня. Клик по названию на карте (или стрелки под фото) меняет пару
 * «фото + текст». Пройденный участок реки подсвечивается.
 */

type Node = { x: number; y: number; side: 'left' | 'right' };

/** Координаты стоянок в системе viewBox 400×560: Эсна сверху, Асуан снизу. */
const NODES: Node[] = [
  { x: 206, y: 46, side: 'right' },
  { x: 176, y: 134, side: 'left' },
  { x: 192, y: 244, side: 'right' },
  { x: 218, y: 330, side: 'left' },
  { x: 228, y: 412, side: 'right' },
  { x: 240, y: 494, side: 'left' },
];

/** Участки русла между соседними стоянками — подсвечиваются по мере продвижения. */
const SEGMENTS = [
  'M 206 46 C 208 78, 182 102, 176 134',
  'M 176 134 C 170 170, 184 208, 192 244',
  'M 192 244 C 198 278, 206 302, 218 330',
  'M 218 330 C 226 354, 224 386, 228 412',
  'M 228 412 C 232 444, 232 470, 240 494',
];

const VIEW_W = 400;
const VIEW_H = 560;

type Props = {
  days: CruiseDay[];
  /** Подпись маршрута под картой, например «Эсна → Асуан». */
  routeLabel: string;
  /** Вторая строка подписи: ночи, дни, километры. */
  routeMeta: string;
};

const CruiseRouteMap = ({ days, routeLabel, routeMeta }: Props) => {
  const [active, setActive] = useState(0);
  const day = days[active];
  const last = days.length - 1;

  const go = (next: number) => setActive(Math.min(Math.max(next, 0), last));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-6 lg:gap-0 rounded-3xl overflow-hidden border border-royal-rule bg-royal-card">
      {/* Кадр дня */}
      <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[560px] flex flex-col">
        {day.image ? (
          <img
            src={day.image.src}
            alt={day.image.alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(80%_70%_at_30%_20%,rgba(139,95,214,0.35),transparent_65%),radial-gradient(70%_60%_at_80%_90%,rgba(197,224,82,0.14),transparent_60%)] bg-royal-night"
          >
            <span className="absolute right-6 bottom-4 text-[22vw] lg:text-[13rem] leading-none font-display font-black text-white/[0.05] select-none">
              {active + 1}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-royal-night/95 via-royal-night/70 to-royal-night/10" />
        <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-royal-night via-royal-night/60 to-transparent" />

        <div className="relative z-10 p-6 sm:p-8 max-w-md">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-royal-lime mb-2">{day.day}</p>
          <h3 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight mb-3">{day.place}</h3>
          <p className="text-sm sm:text-[15px] text-royal-sand-2 leading-relaxed">{day.text}</p>
        </div>

        {/* Стрелки */}
        <div className="relative z-10 mt-auto flex items-center justify-between gap-3 p-4 sm:p-6">
          <button
            type="button"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="Предыдущий день маршрута"
            className="shrink-0 w-10 h-10 rounded-full border border-white/20 bg-royal-night/60 backdrop-blur flex items-center justify-center text-royal-sand hover:border-royal-lilac hover:text-royal-lilac transition-colors disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:text-royal-sand"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === last}
            aria-label="Следующий день маршрута"
            className="min-w-0 flex items-center gap-3 text-right text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-royal-sand hover:text-royal-lilac transition-colors disabled:opacity-30 disabled:hover:text-royal-sand"
          >
            <span className="truncate">
              {active === last ? `${day.day}: ${day.place}` : `${days[active + 1].day}: ${days[active + 1].place}`}
            </span>
            <ChevronRight className="w-5 h-5 shrink-0" />
          </button>
        </div>
      </div>

      {/* Карта маршрута */}
      <div className="relative bg-royal-night/60 border-t lg:border-t-0 lg:border-l border-royal-rule p-6 sm:p-8">
        <div className="relative mx-auto w-full max-w-[420px] aspect-[400/560]">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            {SEGMENTS.map((d, i) => (
              <path
                key={d}
                d={d}
                fill="none"
                strokeWidth={i < active ? 2.4 : 1.6}
                strokeLinecap="round"
                className={i < active ? 'stroke-royal-lilac' : 'stroke-royal-sand-2/35'}
              />
            ))}

            {NODES.map((n, i) => (
              <g key={`${n.x}-${n.y}`}>
                <line
                  x1={n.x + (n.side === 'right' ? 8 : -8)}
                  y1={n.y}
                  x2={n.x + (n.side === 'right' ? 26 : -26)}
                  y2={n.y}
                  strokeWidth="1.2"
                  className={i === active ? 'stroke-royal-lilac' : 'stroke-royal-sand-2/35'}
                />
                {i === active && <circle cx={n.x} cy={n.y} r="10" className="fill-royal-lilac/25" />}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={i === active ? 5.5 : 4}
                  className={i <= active ? 'fill-royal-lilac' : 'fill-royal-sand-2/50'}
                />
              </g>
            ))}
          </svg>

          {days.map((d, i) => {
            const n = NODES[i] ?? NODES[NODES.length - 1];
            const isRight = n.side === 'right';
            const xPercent = (n.x / VIEW_W) * 100;
            // Свободное место от точки до края карты: подпись в него и вписываем.
            const room = `${(isRight ? 100 - xPercent : xPercent) - 8}%`;
            return (
              <button
                key={d.day}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${d.day}: ${d.place}`}
                aria-current={i === active ? 'true' : undefined}
                style={{
                  left: `${xPercent}%`,
                  top: `${(n.y / VIEW_H) * 100}%`,
                  transform: isRight ? 'translate(8%, -50%)' : 'translate(-100%, -50%)',
                  maxWidth: room,
                  paddingLeft: isRight ? '8%' : undefined,
                  paddingRight: isRight ? undefined : '8%',
                }}
                className={`absolute py-1 leading-tight transition-colors ${isRight ? 'text-left' : 'text-right'} ${
                  i === active ? 'text-royal-sand' : 'text-royal-dim hover:text-royal-sand-2'
                }`}
              >
                <span className="block text-[9px] font-bold uppercase tracking-[0.18em] opacity-70">{d.day}</span>
                <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.06em]">{d.place}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 lg:mt-10 text-center lg:text-right">
          <p className="text-xl sm:text-3xl font-display font-black uppercase tracking-tight text-royal-sand-2">{routeLabel}</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-royal-dim mt-1">{routeMeta}</p>
        </div>
      </div>
    </div>
  );
};

export default CruiseRouteMap;
