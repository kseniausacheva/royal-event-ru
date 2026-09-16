import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createTransport, escapeHtml, RECIPIENT, stamp } from './_mail';

/** POST /api/contact — форма заявки (Vercel, .com). На .ru ту же роль играет public/contact.php. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { name, email, phone, messenger, message, mailingConsent } = req.body || {};
  if (!name || !email || !phone || !messenger || !message) {
    return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
  }
  const mail = createTransport();
  if (!mail) {
    console.error('EMAIL_PASS is not configured');
    return res.status(500).json({ error: 'Сервер не настроен. Обратитесь к администратору.' });
  }
  const row = (label: string, value: string, alt = false) =>
    `<tr${alt ? ' style="background:#f9f9f9"' : ''}><td style="padding:10px;font-weight:bold;color:#555;width:150px">${label}</td><td style="padding:10px;color:#1a1a1a">${value}</td></tr>`;
  try {
    await mail.transporter.sendMail({
      from: `"La Royal Event — Сайт" <${mail.user}>`,
      to: RECIPIENT,
      replyTo: email,
      subject: `Новая заявка с сайта от ${name}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#1a1a1a;border-bottom:2px solid #c6a4f5;padding-bottom:10px">Новая заявка с сайта</h2>
        <table style="width:100%;border-collapse:collapse;margin-top:20px">
          ${row('Имя:', escapeHtml(name))}
          ${row('Email:', `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`, true)}
          ${row('Телефон:', escapeHtml(phone))}
          ${row('Мессенджер:', escapeHtml(messenger), true)}
          ${row('Сообщение:', escapeHtml(message).replace(/\n/g, '<br>'))}
          ${row('Согласие на рассылку:', mailingConsent ? 'Да' : 'Нет', true)}
        </table>
        <p style="margin-top:20px;font-size:12px;color:#999">Отправлено с сайта royaleventandmice.com • ${stamp()}</p>
      </div>`,
    });
    return res.status(200).json({ success: true, message: 'Заявка отправлена успешно' });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Ошибка отправки. Попробуйте позже.' });
  }
}
