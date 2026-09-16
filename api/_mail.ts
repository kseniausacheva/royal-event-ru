import nodemailer from 'nodemailer';

/**
 * Общий SMTP-транспорт для serverless-функций Vercel (.com).
 * EMAIL_USER / EMAIL_PASS задаются в Vercel → Project → Settings → Environment Variables.
 */
export const RECIPIENT = 'baxgat@yandex.ru';

export function createTransport() {
  const user = process.env.EMAIL_USER || RECIPIENT;
  const pass = process.env.EMAIL_PASS;
  if (!pass) return null;
  return {
    user,
    transporter: nodemailer.createTransport({ host: 'smtp.yandex.ru', port: 465, secure: true, auth: { user, pass } }),
  };
}

export function escapeHtml(str: unknown): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const stamp = () => new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
