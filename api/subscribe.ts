import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createTransport, escapeHtml, RECIPIENT, stamp } from './_mail';

/** POST /api/subscribe — подписка на рассылку (Vercel, .com). На .ru — public/subscribe.php. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { email, source } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return res.status(400).json({ error: 'Укажите корректный email' });
  }
  const mail = createTransport();
  if (!mail) {
    console.error('EMAIL_PASS is not configured');
    return res.status(500).json({ error: 'Сервер не настроен. Обратитесь к администратору.' });
  }
  try {
    await mail.transporter.sendMail({
      from: `"La Royal Event — Сайт" <${mail.user}>`,
      to: RECIPIENT,
      replyTo: String(email),
      subject: `Новая подписка на рассылку: ${email}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#1a1a1a;border-bottom:2px solid #c6a4f5;padding-bottom:10px">Новая подписка на рассылку</h2>
        <p><b>Email:</b> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><b>Откуда:</b> ${escapeHtml(source || 'сайт')}</p>
        <p style="margin-top:20px;font-size:12px;color:#999">Отправлено с сайта royaleventandmice.com • ${stamp()}</p>
      </div>`,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Ошибка отправки. Попробуйте позже.' });
  }
}
