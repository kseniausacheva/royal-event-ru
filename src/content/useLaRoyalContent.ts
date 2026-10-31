import { useLanguage } from '../LanguageContext';
import * as ru from './la-royal-event';
import * as en from './la-royal-event.en';

/**
 * Контент новых разделов (программы, круизы, DMC) на языке текущей страницы.
 * RU и EN — два модуля одной формы; типом `typeof ru` TypeScript гарантирует,
 * что в английском есть каждый экспорт русского.
 */
export type LaRoyalContent = typeof ru;
const EN: LaRoyalContent = en;

export const useLaRoyalContent = (): LaRoyalContent => (useLanguage().language === 'ru' ? ru : EN);
