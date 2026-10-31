// Английский контент La Royal Event. Структура и типы — те же, что в ../la-royal-event.ts (RU):
// слаги, пути к фото и порядок элементов должны совпадать один в один.
import type * as RU from '../la-royal-event';
import { dmc as ruDmc, privateAccess as ruPA } from '../la-royal-event';

/** ЗАГЛУШКА: пока RU. */
export const dmc: typeof RU.dmc = ruDmc;
export const privateAccess: typeof RU.privateAccess = ruPA;
