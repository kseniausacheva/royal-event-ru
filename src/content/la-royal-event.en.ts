// Английская версия контента La Royal Event — собирается из модулей ./en/*.
// Экспортирует ровно те же имена, что ../la-royal-event.ts: хук useLaRoyalContent
// проверяет это типом (typeof ru), так что пропущенный экспорт не соберётся.
import type { Program } from './la-royal-event';
import { programsA } from './en/programs-a';
import { programsB } from './en/programs-b';
import { programsC } from './en/programs-c';

export type { Program, Photo, CruiseDay, Ship, Dahabiya, Concert } from './la-royal-event';
export const programs: Program[] = [...programsA, ...programsB, ...programsC];
export { programsFaq, programsHow } from './en/programs-extra';
export { cruises, cruiseSights, fleet } from './en/cruises';
export { dahabiyas } from './en/dahabiyas';
export { dmc, privateAccess } from './en/dmc';
// Концерты уже двуязычны внутри (поля ru / en) — один источник для обоих языков.
export { concerts } from './la-royal-event';
