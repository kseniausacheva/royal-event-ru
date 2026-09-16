import React, { useState } from 'react';
import { Send, MessageCircle, Link2, Check } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface ArticleShareProps {
  /** Заголовок статьи — используется в тексте шеринга */
  title: string;
  /** Опционально: текст-вставка (например цитата) для шеринга вместо общего */
  shareText?: string;
}

// MAX-профиль La Royal Event (тот же URL, что в Footer.tsx).
// MAX (Mail.ru мессенджер) не имеет публичного share-API, поэтому кнопка
// открывает чат с La Royal Event — пользователь может написать нам напрямую.
const MAX_PROFILE_URL =
  'https://max.ru/u/f9LHodD0cOI6NopEpkHgITsu_AIEFyrbBPaFkURFR2kn3i3inUUuT4dKLgQ';

/**
 * VK SVG-иконка (lucide не содержит VK).
 */
const VkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M14.85 18.5h1.34c.4 0 .53-.18.53-.4 0-.97-1.4-2.42-2.55-3.56-.86-.85-1.24-1.16-1.24-1.4 0-.34.1-.5.65-1.13 1.7-1.96 3-3.46 3-4.27 0-.27-.16-.4-.45-.4h-1.78c-.4 0-.55.17-.71.4-1.43 2.05-2.27 3.27-2.86 3.27-.27 0-.36-.18-.36-.6V8.18c0-.55-.16-.79-.62-.79H7.66c-.34 0-.55.21-.55.4 0 .51.78.63.78 2.06v1.55c0 .54-.1.62-.32.62-.5 0-1.7-1.4-2.85-3.5-.27-.5-.42-.73-.83-.73H2.11c-.4 0-.62.17-.62.4 0 .57 1.55 3.85 4.42 6.5 1.92 1.78 4.06 2.7 5.85 2.7 1.08 0 1.21-.22 1.21-.66v-1.5c0-.51.11-.62.45-.62.25 0 .68.13 1.68 1.09 1.14 1.1 1.33 1.6 1.97 1.6h.78z" />
  </svg>
);

/**
 * Share-блок в конце статьи. Telegram / WhatsApp / VK / Copy link.
 * Стиль соответствует тёмной теме сайта с royal-pink акцентом при наведении.
 */
const ArticleShare: React.FC<ArticleShareProps> = ({ title, shareText }) => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  // URL и текст для шеринга. window.location доступен только после маунта,
  // но т.к. компонент в любом случае рендерится в браузере (или Puppeteer),
  // используем безопасный fallback для prerender-фазы.
  const getUrl = () => (typeof window !== 'undefined' ? window.location.href : '');
  const text = shareText || title;

  const openShare = (url: string) => {
    if (typeof window === 'undefined') return;
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleTelegram = () => {
    const url = getUrl();
    openShare(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
  };

  const handleMax = async () => {
    // MAX не имеет share-URL API → копируем ссылку в буфер и открываем MAX-чат.
    // Пользователь вставит ссылку в чат сам.
    if (typeof window === 'undefined') return;
    const url = getUrl();
    try {
      await navigator.clipboard.writeText(url + '\n\n' + text);
    } catch {
      // если буфер недоступен (старый браузер) — просто откроем MAX
    }
    window.open(MAX_PROFILE_URL, '_blank', 'noopener,noreferrer');
  };

  const handleVk = () => {
    const url = getUrl();
    openShare(
      `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(text)}`,
    );
  };

  const handleCopy = async () => {
    const url = getUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select + execCommand для старых браузеров
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // ignore
      } finally {
        document.body.removeChild(input);
      }
    }
  };

  // Цвета каждой соцсети при hover — узнаваемые brand colors
  const buttonBase =
    'group relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl bg-royal-black text-white border border-white/10 transition-all duration-300 hover:border-transparent hover:scale-105';

  return (
    <section className="my-12 p-8 md:p-10 bg-royal-black rounded-3xl text-white">
      <h3 className="text-center font-display font-bold text-2xl md:text-3xl mb-2 uppercase tracking-tight">
        {language === 'ru' ? 'Понравилась статья?' : 'Liked this article?'}
      </h3>
      <p className="text-center text-white/50 text-sm md:text-base mb-8 font-serif italic">
        {language === 'ru'
          ? 'Расскажите коллегам — им полезно, нам приятно :)'
          : 'Share with colleagues — useful for them, nice for us :)'}
      </p>

      <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
        {/* Telegram */}
        <button
          onClick={handleTelegram}
          aria-label="Поделиться в Telegram"
          className={`${buttonBase} hover:bg-[#0088cc]`}
        >
          <Send className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2} />
        </button>

        {/* MAX (мессенджер Mail.ru) — открывает чат с La Royal Event */}
        <button
          onClick={handleMax}
          aria-label={language === 'ru' ? 'Написать нам в MAX' : 'Message us on MAX'}
          title={
            language === 'ru'
              ? 'Скопирует ссылку и откроет MAX-чат с нами'
              : 'Will copy the link and open MAX chat with us'
          }
          className={`${buttonBase} hover:bg-[#1A8FFF]`}
        >
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2} />
        </button>

        {/* VK */}
        <button
          onClick={handleVk}
          aria-label="Поделиться в VK"
          className={`${buttonBase} hover:bg-[#4A76A8]`}
        >
          <VkIcon />
        </button>

        {/* Copy link */}
        <button
          onClick={handleCopy}
          aria-label={language === 'ru' ? 'Скопировать ссылку' : 'Copy link'}
          className={`${buttonBase} hover:bg-royal-pink relative`}
        >
          {copied ? (
            <Check className="w-6 h-6 md:w-7 md:h-7 text-emerald-400" strokeWidth={2.5} />
          ) : (
            <Link2 className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2} />
          )}
          {copied && (
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-emerald-400 font-bold whitespace-nowrap">
              {language === 'ru' ? 'Скопировано' : 'Copied'}
            </span>
          )}
        </button>
      </div>
    </section>
  );
};

export default ArticleShare;
