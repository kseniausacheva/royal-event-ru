/**
 * Разрез Великой пирамиды: какие коридоры и камеры открыты при стандартном
 * визите и что добавляет приватный доступ. Геометрия схематичная, не в масштабе.
 */
import { useLanguage } from '../LanguageContext';

const LILAC = 'var(--color-royal-lilac)';
const LIME = 'var(--color-royal-lime)';
const RULE = 'var(--color-royal-rule)';
const DIM = 'var(--color-royal-dim)';
const SAND = 'var(--color-royal-sand)';

// Узлы (viewBox 1000×600): E — вход, J — развилка, G1/G2 — Большая галерея,
// K — камера Царя, Q — камера Царицы, S — подземная камера.
const E = [850, 395];
const J = [775, 432];
const G1 = [640, 335];
const G2 = [565, 270];
const K = { x: 490, y: 238, w: 72, h: 34 };
const Q = { x: 478, y: 322, w: 60, h: 28 };
const S = { x: 430, y: 522, w: 84, h: 30 };

const path = (pts: number[][]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');

const Label = ({ x, y, children, anchor = 'start' }: { x: number; y: number; children: string; anchor?: 'start' | 'middle' | 'end' }) => (
  <text x={x} y={y} fill={SAND} fontSize="15" fontFamily="var(--font-manrope)" fontWeight={600} textAnchor={anchor} letterSpacing="0.02em">
    {children}
  </text>
);

// Подписи схемы: названия камер и коридоров, легенда, title/desc для скринридеров.
// Русские строки — эталон; английские подставляются на EN-сайте.
const UI_RU = {
  title: 'Разрез Великой пирамиды: стандартный и приватный маршруты',
  desc: 'Стандартный визит: вход, восходящий коридор, Большая галерея, камера Царя. Приватный доступ добавляет камеру Царицы и подземную камеру по нисходящему коридору.',
  kingsChamber: 'Камера Царя',
  queensChamber: 'Камера Царицы',
  subterranean: 'Подземная камера',
  entrance: 'Вход',
  grandGallery: 'Большая галерея',
  ascending: 'Восходящий коридор',
  descending: 'Нисходящий коридор',
  legendStandard: 'Стандартный визит: вход, галерея, камера Царя',
  legendPrivate: 'Приватный доступ: плюс камера Царицы и подземная камера',
  notToScale: 'Схема, не в масштабе',
} as const;

const UI_EN: Record<keyof typeof UI_RU, string> = {
  title: 'Cross-section of the Great Pyramid: standard and private routes',
  desc: "Standard visit: entrance, Ascending Passage, Grand Gallery, King's Chamber. Private access adds the Queen's Chamber and the Subterranean Chamber via the Descending Passage.",
  kingsChamber: "King's Chamber",
  queensChamber: "Queen's Chamber",
  subterranean: 'Subterranean Chamber',
  entrance: 'Entrance',
  grandGallery: 'Grand Gallery',
  ascending: 'Ascending Passage',
  descending: 'Descending Passage',
  legendStandard: "Standard visit: entrance, gallery, King's Chamber",
  legendPrivate: "Private access: plus the Queen's Chamber and the Subterranean Chamber",
  notToScale: 'Diagram, not to scale',
};

const UI = { ru: UI_RU, en: UI_EN };

const PyramidDiagram = ({ className = '' }: { className?: string }) => {
  const { language } = useLanguage();
  const u = UI[language];
  return (
  <figure className={className}>
    <svg viewBox="0 0 1000 600" role="img" aria-labelledby="pyr-title pyr-desc" className="w-full h-auto">
      <title id="pyr-title">{u.title}</title>
      <desc id="pyr-desc">{u.desc}</desc>

      {/* Пирамида и земля */}
      <path d="M60 470 L500 60 L940 470 Z" fill="rgba(198,164,245,0.05)" stroke={RULE} strokeWidth="2" />
      <line x1="0" y1="470" x2="1000" y2="470" stroke={RULE} strokeWidth="2" />
      <rect x="0" y="470" width="1000" height="130" fill="rgba(240,234,224,0.03)" />

      {/* Коридоры — подложка */}
      <path d={path([E, J, [560, 522], [514, 537]])} stroke={RULE} strokeWidth="14" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <path d={path([J, G1, G2])} stroke={RULE} strokeWidth="14" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <path d={path([G1, [Q.x + Q.w, Q.y + Q.h / 2]])} stroke={RULE} strokeWidth="12" fill="none" strokeLinecap="round" />

      {/* Стандартный маршрут */}
      <path d={path([E, J, G1, G2, [K.x + K.w, K.y + K.h / 2]])} stroke={LILAC} strokeWidth="6" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {/* Приватный доступ — добавка */}
      <path d={path([G1, [Q.x + Q.w, Q.y + Q.h / 2]])} stroke={LIME} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d={path([J, [560, 522], [S.x + S.w, S.y + S.h / 2]])} stroke={LIME} strokeWidth="6" fill="none" strokeLinejoin="round" strokeLinecap="round" />

      {/* Камеры */}
      <rect x={K.x} y={K.y} width={K.w} height={K.h} rx="4" fill="var(--color-royal-card)" stroke={LILAC} strokeWidth="3" />
      <rect x={Q.x} y={Q.y} width={Q.w} height={Q.h} rx="4" fill="var(--color-royal-card)" stroke={LIME} strokeWidth="3" />
      <rect x={S.x} y={S.y} width={S.w} height={S.h} rx="4" fill="var(--color-royal-card)" stroke={LIME} strokeWidth="3" />
      <circle cx={E[0]} cy={E[1]} r="7" fill={LILAC} />

      {/* Подписи */}
      <Label x={K.x + K.w / 2} y={K.y - 12} anchor="middle">{u.kingsChamber}</Label>
      <Label x={Q.x - 12} y={Q.y + Q.h / 2 + 5} anchor="end">{u.queensChamber}</Label>
      <Label x={S.x - 12} y={S.y + S.h / 2 + 5} anchor="end">{u.subterranean}</Label>
      <Label x={E[0] + 14} y={E[1] - 10}>{u.entrance}</Label>
      <Label x={G2[0] + 62} y={G2[1] - 2}>{u.grandGallery}</Label>
      <Label x={J[0] + 40} y={J[1] + 20}>{u.ascending}</Label>
      <Label x={640} y={512}>{u.descending}</Label>
    </svg>
    <figcaption className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs">
      <span className="inline-flex items-center gap-2"><span className="w-6 h-1.5 rounded-full bg-royal-lilac" />{u.legendStandard}</span>
      <span className="inline-flex items-center gap-2"><span className="w-6 h-1.5 rounded-full bg-royal-lime" />{u.legendPrivate}</span>
      <span className="text-royal-dim">{u.notToScale}</span>
    </figcaption>
  </figure>
  );
};

export default PyramidDiagram;
