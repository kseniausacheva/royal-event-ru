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
 * Светлая карточка с розовым акцентом — рассчитана на белый фон тела статьи.
 * Отправляет email на subscribe.php (reg.ru) — далее на baxgat@yandex.ru приходит уведомление.
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

    // На reg.ru используем PHP-эндпойнт.
    const endpoint = '/subscribe.php';

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
        className="my-12 p-8 md:p-10 bg-emerald-50 border border-emerald-200 rounded-3xl text-center"
      >
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-7 h-7 text-emerald-600" />
        </div>
        <h3 className="font-display font-bold text-2xl text-gray-900 mb-2 uppercase tracking-tight">
          {language === 'ru' ? 'Готово!' : 'Done!'}
        </h3>
        <p className="text-gray-600 font-serif text-base md:text-lg max-w-xl mx-auto">
          {language === 'ru'
            ? 'Вы подписаны на рассылку Royal Event Group. Новые статьи и кейсы будут приходить на ваш email.'
            : "You're subscribed to Royal Event Group newsletter. New articles and cases will arrive in your inbox."}
        </p>
      </motion.section>
    );
  }

  return (
    <section className="my-12 p-8 md:p-12 bg-gradient-to-br from-pink-50 via-pink-50/60 to-white border border-royal-pink/15 rounded-3xl shadow-sm">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2.5 mb-5 px-4 py-1.5 bg-white border border-royal-pink/20 rounded-full">
          <Mail className="w-4 h-4 text-royal-pink" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-royal-pink">
            {language === 'ru' ? 'Рассылка' : 'Newsletter'}
          </span>
        </div>
        <h3 className="font-display font-bold text-3xl md:text-4xl text-gray-900 uppercase tracking-tight mb-3 leading-tight">
          {language === 'ru' ? 'Будьте в курсе индустрии' : 'Stay on top of the industry'}
        </h3>
        <p className="text-gray-600 font-serif text-base md:text-lg mb-8 max-w-lg mx-auto">
          {language === 'ru'
            ? 'Раз в неделю — новые статьи о MICE-индустрии, кейсы и инсайты. Без спама.'
            : 'Weekly — new articles on MICE industry, cases and insights. No spam.'}
        </p>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === 'ru' ? 'Ваш email' : 'Your email'}
              className="flex-1 px-5 py-3.5 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-royal-pink transition-colors"
              disabled={status === 'sending'}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-7 py-3.5 bg-royal-pink text-white font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-royal-pink/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
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
            <p className="mt-3 text-sm text-red-600 text-left">{errorMsg}</p>
          )}
          <p className="mt-4 text-xs text-gray-500 text-center">
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
