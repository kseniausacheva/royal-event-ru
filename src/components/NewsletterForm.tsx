import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface NewsletterFormProps {
  /** Опционально: где разместили форму (для трекинга в email). По умолчанию — 'blog' */
  source?: string;
}

/**
 * Форма подписки на рассылку Royal Event Group.
 * Отправляет email на subscribe.php (reg.ru) — далее на baxgat@yandex.ru приходит уведомление.
 * Стиль соответствует тёмной теме сайта с royal-pink акцентом.
 */
const NewsletterForm: React.FC<NewsletterFormProps> = ({ source = 'blog' }) => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    // На reg.ru используем PHP-эндпойнт; на Vercel/dev — пока тот же,
    // но можно добавить /api/subscribe.ts по аналогии с /api/contact.ts
    const isRu = typeof window !== 'undefined' && window.location.hostname.endsWith('.ru');
    const endpoint = isRu ? '/subscribe.php' : '/subscribe.php';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMsg(data.error || (language === 'ru' ? 'Ошибка отправки' : 'Submission failed'));
      }
    } catch {
      setStatus('error');
      setErrorMsg(language === 'ru' ? 'Ошибка сети. Попробуйте позже.' : 'Network error. Try again later.');
    }
  };

  if (status === 'success') {
    return (
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="my-12 p-8 md:p-12 bg-royal-pink/10 border border-royal-pink/30 rounded-3xl text-center text-white"
      >
        <div className="w-16 h-16 rounded-full bg-royal-pink/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-royal-pink" />
        </div>
        <h3 className="font-display font-bold text-2xl md:text-3xl mb-3 uppercase tracking-tight">
          {language === 'ru' ? 'Готово!' : 'Done!'}
        </h3>
        <p className="text-white/60 font-serif text-base md:text-lg">
          {language === 'ru'
            ? 'Вы подписаны на рассылку Royal Event Group. Новые статьи и кейсы будут приходить на ваш email.'
            : "You're subscribed to Royal Event Group newsletter. New articles and cases will arrive in your inbox."}
        </p>
      </motion.section>
    );
  }

  return (
    <section className="my-12 p-8 md:p-12 bg-gradient-to-br from-royal-pink/15 via-royal-pink/5 to-transparent border border-royal-pink/20 rounded-3xl text-white">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Mail className="w-6 h-6 text-royal-pink" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-royal-pink">
              {language === 'ru' ? 'Рассылка' : 'Newsletter'}
            </span>
          </div>
          <h3 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tight mb-2 leading-tight">
            {language === 'ru' ? 'Будьте в курсе индустрии' : 'Stay on top of the industry'}
          </h3>
          <p className="text-white/60 font-serif text-base md:text-lg">
            {language === 'ru'
              ? 'Раз в неделю — новые статьи о MICE-индустрии, кейсы и инсайты. Без спама.'
              : 'Weekly — new articles on MICE industry, cases and insights. No spam.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full md:w-auto">
          <div className="flex flex-col sm:flex-row gap-3 md:min-w-[400px]">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'ru' ? 'Ваш email' : 'Your email'}
              className="flex-1 px-5 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-royal-pink transition-colors"
              disabled={status === 'sending'}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-6 py-4 bg-royal-pink text-white font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-royal-pink/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === 'sending' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {language === 'ru' ? 'Подписаться' : 'Subscribe'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
          {status === 'error' && (
            <p className="mt-3 text-sm text-red-400">{errorMsg}</p>
          )}
          <p className="mt-3 text-xs text-white/30">
            {language === 'ru'
              ? 'Нажимая «Подписаться», вы соглашаетесь на обработку email для отправки рассылки.'
              : 'By clicking "Subscribe" you agree to email processing for newsletter delivery.'}
          </p>
        </form>
      </div>
    </section>
  );
};

export default NewsletterForm;
