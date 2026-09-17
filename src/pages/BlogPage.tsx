import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowLeft, ChevronRight, ArrowRight, Quote, AlertCircle, Info, CheckCircle2, Send, XCircle } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import ArticleShare from '../components/ArticleShare';
import NewsletterForm from '../components/NewsletterForm';
import { useLanguage } from '../LanguageContext';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import SEO from '../components/SEO';

/**
 * ISO publication dates per article (Schema.org требует ISO-8601).
 * Берём из единого источника src/content/blog-articles.mjs — datePublished
 * там обязательное поле, поэтому добавление новой статьи автоматически добавит дату сюда.
 */
import { blogArticles } from '../content/blog-articles.mjs';
const ARTICLE_DATES_ISO: Record<string, string> = Object.fromEntries(
  blogArticles.map((a: any) => [a.id, a.datePublished]),
);

import { RU_SITE_URL as SITE_URL_RU, COM_SITE_URL as SITE_URL_EN } from '../site-config';

/** Статья с необязательным блоком ссылок на разделы сайта (перелинковка). */
type ArticleWithLinks = { links?: { path: string; label: string }[] };

/**
 * Типы блоков для богатого контента статей.
 * Если article.content — строка, то это legacy формат (рендерим через splitLegacyContent).
 * Если article.content — массив, то это новый формат с богатой разметкой.
 */
type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string; level?: 2 | 3 }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'stat'; number: string; label: string; source?: string }
  | { type: 'image'; url: string; alt: string; caption?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'divider' }
  | { type: 'callout'; title?: string; text: string; variant?: 'info' | 'warning' | 'success' }
  | { type: 'video'; url: string; title: string; caption?: string }
  | { type: 'table'; headers: string[]; rows: string[][]; caption?: string }
  | { type: 'diagram'; svg: string; title: string; caption?: string }
  | {
      type: 'comparison';
      title?: string;
      left: { title: string; items: string[] };
      right: { title: string; items: string[] };
    };

/**
 * Конвертирует URL видео в embed-формат.
 * Поддерживает YouTube (youtube.com/watch?v=, youtu.be/), RuTube, Vimeo,
 * локальные MP4 (отдаются через <video>), и произвольные iframe-URL.
 */
const getVideoEmbed = (url: string): { kind: 'iframe' | 'video'; src: string } => {
  // Локальный .mp4 / .webm / .mov → <video>
  if (/\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url)) {
    return { kind: 'video', src: url };
  }
  // YouTube
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  if (yt) return { kind: 'iframe', src: `https://www.youtube.com/embed/${yt[1]}` };
  // RuTube
  const rt = url.match(/rutube\.ru\/video\/([a-f0-9]+)/);
  if (rt) return { kind: 'iframe', src: `https://rutube.ru/play/embed/${rt[1]}` };
  // Vimeo
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return { kind: 'iframe', src: `https://player.vimeo.com/video/${vm[1]}` };
  // Fallback — используем URL как есть в iframe
  return { kind: 'iframe', src: url };
};

/**
 * Рендерит один блок богатого контента. Для magazine-style оформления статьи.
 */
const ArticleBlockRenderer: React.FC<{ block: ArticleBlock; idx: number }> = ({ block, idx }) => {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="font-serif text-lg md:text-xl leading-[1.8] text-gray-800 mb-7">
          {block.text}
        </p>
      );

    case 'heading': {
      const level = block.level || 2;
      const baseClass = 'font-display font-bold text-gray-900 mt-16 mb-6 leading-tight';
      if (level === 2) {
        return <h2 className={`${baseClass} text-3xl md:text-4xl`}>{block.text}</h2>;
      }
      return <h3 className={`${baseClass} text-2xl md:text-3xl`}>{block.text}</h3>;
    }

    case 'quote': {
      const handleShareQuote = () => {
        if (typeof window === 'undefined') return;
        const quoteText = `«${block.text}»${block.author ? ' — ' + block.author : ''}`;
        const url = window.location.href;
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(quoteText)}`,
          '_blank',
          'noopener,noreferrer,width=600,height=500',
        );
      };
      return (
        <figure className="my-14 relative pl-12 md:pl-16 group">
          <Quote
            className="absolute left-0 top-0 w-8 h-8 md:w-10 md:h-10 text-royal-pink opacity-80"
            strokeWidth={1.5}
          />
          <blockquote className="font-serif italic text-2xl md:text-3xl leading-relaxed text-gray-900">
            «{block.text}»
          </blockquote>
          <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
            {block.author ? (
              <figcaption className="text-sm uppercase tracking-[0.2em] text-gray-500 font-bold">
                — {block.author}
              </figcaption>
            ) : (
              <span />
            )}
            <button
              onClick={handleShareQuote}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-royal-pink transition-colors font-bold"
              aria-label="Поделиться цитатой в Telegram"
            >
              <Send className="w-3.5 h-3.5" />
              Поделиться цитатой
            </button>
          </div>
        </figure>
      );
    }

    case 'stat':
      return (
        <div className="my-14 py-14 px-8 md:px-12 bg-gradient-to-br from-royal-pink/8 via-royal-pink/4 to-transparent rounded-3xl text-center border border-royal-pink/15">
          <div className="font-display font-black text-6xl md:text-8xl text-royal-pink mb-4 leading-none">
            {block.number}
          </div>
          <div className="font-serif text-xl md:text-2xl text-gray-800 leading-snug max-w-2xl mx-auto">
            {block.label}
          </div>
          {block.source && (
            <div className="mt-6 text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">
              Источник: {block.source}
            </div>
          )}
        </div>
      );

    case 'image':
      return (
        <figure className="my-14 -mx-6 md:mx-0">
          <div className="overflow-hidden md:rounded-2xl">
            <img
              src={block.url}
              alt={block.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-4 text-sm md:text-base text-gray-500 text-center font-serif italic px-6">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag className={`my-8 space-y-3 ${block.ordered ? 'list-decimal pl-6' : 'pl-0'}`}>
          {block.items.map((item, i) => (
            <li
              key={i}
              className={`font-serif text-lg leading-relaxed text-gray-800 ${
                block.ordered ? 'pl-2' : 'flex gap-4'
              }`}
            >
              {!block.ordered && (
                <span className="text-royal-pink font-bold mt-1 flex-shrink-0" aria-hidden>—</span>
              )}
              <span className={block.ordered ? '' : 'flex-1'}>{item}</span>
            </li>
          ))}
        </Tag>
      );
    }

    case 'divider':
      return (
        <div className="my-16 flex justify-center" aria-hidden>
          <div className="flex gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-royal-pink/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-royal-pink/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-royal-pink/40" />
          </div>
        </div>
      );

    case 'callout': {
      const variantStyles: Record<string, { bg: string; border: string; icon: React.ReactNode; iconColor: string }> = {
        info: {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: <Info className="w-6 h-6" />,
          iconColor: 'text-blue-600',
        },
        warning: {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          icon: <AlertCircle className="w-6 h-6" />,
          iconColor: 'text-amber-600',
        },
        success: {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          icon: <CheckCircle2 className="w-6 h-6" />,
          iconColor: 'text-emerald-600',
        },
      };
      const style = variantStyles[block.variant || 'info'];
      return (
        <aside className={`my-10 p-6 md:p-8 ${style.bg} border ${style.border} rounded-2xl flex gap-4`}>
          <div className={`flex-shrink-0 ${style.iconColor} mt-1`}>{style.icon}</div>
          <div className="flex-1">
            {block.title && (
              <h4 className="font-display font-bold text-lg text-gray-900 mb-2">{block.title}</h4>
            )}
            <p className="font-serif text-base md:text-lg leading-relaxed text-gray-800">{block.text}</p>
          </div>
        </aside>
      );
    }

    case 'video': {
      const embed = getVideoEmbed(block.url);
      return (
        <figure className="my-12 -mx-6 md:mx-0">
          <div className="relative aspect-video md:rounded-2xl overflow-hidden bg-royal-black shadow-xl">
            {embed.kind === 'iframe' ? (
              <iframe
                src={embed.src}
                title={block.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : (
              <video
                src={embed.src}
                controls
                preload="metadata"
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <track kind="captions" />
              </video>
            )}
          </div>
          {block.caption && (
            <figcaption className="mt-4 text-sm md:text-base text-gray-500 text-center font-serif italic px-6">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case 'table':
      return (
        <figure className="my-12 -mx-6 md:mx-0">
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50">
                  {block.headers.map((h, i) => (
                    <th
                      key={i}
                      className="text-left font-display font-bold text-xs md:text-sm uppercase tracking-wider text-gray-900 py-4 px-5 border-b-2 border-gray-300"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-royal-pink/5 transition-colors">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`py-4 px-5 font-serif text-base text-gray-800 ${
                          j === 0 ? 'font-bold text-gray-900' : ''
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <figcaption className="mt-4 text-sm text-gray-500 text-center font-serif italic px-6">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'diagram':
      return (
        <figure className="my-12">
          <div
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 md:p-10 border border-gray-200 overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: block.svg }}
            role="img"
            aria-label={block.title}
          />
          {block.caption && (
            <figcaption className="mt-4 text-sm text-gray-500 text-center font-serif italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'comparison':
      return (
        <div className="my-12">
          {block.title && (
            <h3 className="font-display font-bold text-2xl md:text-3xl text-gray-900 mb-6 text-center uppercase tracking-tight">
              {block.title}
            </h3>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <h4 className="font-display font-bold text-base md:text-lg uppercase text-red-900 tracking-wide">
                  {block.left.title}
                </h4>
              </div>
              <ul className="space-y-3">
                {block.left.items.map((item, i) => (
                  <li key={i} className="font-serif text-base md:text-lg text-gray-800 flex gap-3 leading-snug">
                    <span className="text-red-400 flex-shrink-0 mt-1 font-bold" aria-hidden>
                      ×
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <h4 className="font-display font-bold text-base md:text-lg uppercase text-emerald-900 tracking-wide">
                  {block.right.title}
                </h4>
              </div>
              <ul className="space-y-3">
                {block.right.items.map((item, i) => (
                  <li key={i} className="font-serif text-base md:text-lg text-gray-800 flex gap-3 leading-snug">
                    <span className="text-emerald-500 flex-shrink-0 mt-1 font-bold" aria-hidden>
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

/**
 * Legacy-рендер для статей со строковым content (старые статьи).
 * Делит на параграфы по \n\n, строки вида "1. Заголовок" становятся h3.
 */
const renderLegacyContent = (content: string) =>
  content.split('\n\n').map((paragraph: string, idx: number) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return null;
    const isHeading = /^\d+\.\s/.test(trimmed) && trimmed.length < 120;
    if (isHeading) {
      return (
        <h3
          key={idx}
          className="font-display font-bold text-2xl md:text-3xl text-gray-900 mt-12 mb-5 leading-tight"
        >
          {trimmed}
        </h3>
      );
    }
    return (
      <p
        key={idx}
        className="font-serif text-lg md:text-xl leading-[1.8] text-gray-800 mb-6"
      >
        {trimmed}
      </p>
    );
  });

const BlogPage = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const lp = useLocalizedPath();
  const blogData = t.blogPage;

  // Single Article View
  if (id) {
    const article = blogData.articles.find((a: any) => a.id === id);

    if (!article) {
      return (
        <div className="pt-32 pb-20 text-center bg-royal-black min-h-screen">
          <SEO title={language === 'ru' ? 'Статья не найдена' : 'Article not found'} noindex />
          <h1 className="text-4xl font-display font-bold text-white mb-8">Article not found</h1>
          <Link to={lp('/blog')} className="text-royal-pink hover:underline">Back to Blog</Link>
        </div>
      );
    }

    const canonicalHost = language === 'ru' ? SITE_URL_RU : SITE_URL_EN;
    // Конечный адрес — со слэшем на обоих доменах (Apache 301-ит без него, на Vercel trailingSlash)
    const articleUrl = `${canonicalHost}/${language}/blog/${article.id}/`;
    const datePublished = ARTICLE_DATES_ISO[article.id];

    // Schema.org BlogPosting — Яндекс показывает дату публикации, автора и сниппет в выдаче.
    const articleJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      image: article.image.startsWith('http') ? article.image : `${canonicalHost}${article.image}`,
      ...(datePublished && {
        datePublished,
        dateModified: datePublished,
      }),
      author: {
        '@type': 'Organization',
        name: 'La Royal Event',
        url: `${canonicalHost}/`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'La Royal Event',
        logo: {
          '@type': 'ImageObject',
          url: `${canonicalHost}/logo-la-royal-event.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleUrl,
      },
      inLanguage: language === 'ru' ? 'ru-RU' : 'en-US',
      articleSection: article.category,
    };

    const isRichContent = Array.isArray(article.content);

    return (
      <div className="min-h-screen">
        <SEO
          title={article.title}
          description={article.excerpt}
          image={article.image}
          type="article"
          publishedTime={datePublished}
          breadcrumbs={[
            { name: language === 'ru' ? 'Главная' : 'Home', url: `/${language}` },
            { name: language === 'ru' ? 'Блог' : 'Blog', url: `/${language}/blog` },
            { name: article.title, url: `/${language}/blog/${article.id}` },
          ]}
          jsonLd={articleJsonLd}
        />

        {/* Dark hero with title, meta, hero image */}
        <header className="bg-royal-black text-white pt-32 pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to={lp('/blog')}
                className="inline-flex items-center gap-2 text-white/60 hover:text-royal-pink transition-colors mb-10 group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{blogData.backToBlog}</span>
              </Link>

              <div className="flex flex-wrap items-center gap-6 mb-8 text-white/40">
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-royal-pink" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{article.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-royal-pink" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{article.date}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-[1.05] tracking-tight">
                {article.title}
              </h1>

              <p className="font-serif text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl italic">
                {article.excerpt}
              </p>
            </motion.div>
          </div>

          {/* Hero image — bleeds slightly into white section below */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto px-6 mt-16"
          >
            <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </header>

        {/* White article body — magazine style for max readability */}
        <article className="bg-white text-gray-900 pt-20 pb-24">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {isRichContent ? (
                (article.content as ArticleBlock[]).map((block, idx) => (
                  <ArticleBlockRenderer key={idx} block={block} idx={idx} />
                ))
              ) : (
                renderLegacyContent(article.content as string)
              )}

              {/* Ссылки на разделы сайта: перелинковка из статьи в услуги */}
              {Array.isArray((article as ArticleWithLinks).links) && (article as ArticleWithLinks).links!.length > 0 && (
                <aside className="mt-16 pt-10 border-t border-gray-200">
                  <h2 className="font-display font-bold uppercase tracking-tight text-gray-900 text-xl mb-6">
                    {language === 'ru' ? 'Читайте на сайте' : 'More on the site'}
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(article as ArticleWithLinks).links!.map((l) => (
                      <li key={l.path}>
                        <Link
                          to={lp(l.path)}
                          className="group flex items-center justify-between gap-4 rounded-xl border border-gray-200 px-5 py-4 hover:border-royal-pink transition-colors"
                        >
                          <span className="font-serif text-lg leading-snug text-gray-800 group-hover:text-royal-pink transition-colors">{l.label}</span>
                          <ArrowRight className="w-4 h-4 shrink-0 text-gray-400 group-hover:text-royal-pink group-hover:translate-x-1 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}

              {/* Тонкий разделитель после контента */}
              <div className="mt-16 pt-10 border-t border-gray-200" />

              {/* Share-блок: TG/WhatsApp/VK/Copy */}
              <ArticleShare title={article.title} shareText={article.excerpt} />

              {/* Подписка на рассылку */}
              <NewsletterForm source={`blog/${article.id}`} />
            </motion.div>
          </div>
        </article>

        {/* Dark footer area — related articles, contact, services */}
        <div className="bg-royal-black text-white py-20">
          <div className="max-w-5xl mx-auto px-6">
            {/* Related Articles */}
            {blogData.articles.filter((a: any) => a.id !== article.id).length > 0 && (
              <section className="mb-20">
                <h3 className="text-xl font-display font-bold uppercase tracking-tight text-white mb-8">
                  {language === 'ru' ? 'Похожие статьи' : 'Related Articles'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Сначала статьи той же категории, свежие вперёд — раньше тут
                      всегда висели одни и те же первые две статьи файла */}
                  {(() => {
                    const others = blogData.articles
                      .filter((a: any) => a.id !== article.id)
                      .sort((a: any, b: any) =>
                        (ARTICLE_DATES_ISO[b.id] || '').localeCompare(ARTICLE_DATES_ISO[a.id] || ''));
                    return [
                      ...others.filter((a: any) => a.category === article.category),
                      ...others.filter((a: any) => a.category !== article.category),
                    ].slice(0, 3);
                  })()
                    .map((related: any) => (
                      <Link
                        key={related.id}
                        to={lp(`/blog/${related.id}`)}
                        className="group rounded-2xl overflow-hidden border border-white/10 hover:border-royal-pink/50 transition-all"
                      >
                        <div className="aspect-[16/9] overflow-hidden">
                          <img
                            src={related.image}
                            alt={related.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="p-6">
                          <div className="text-royal-pink text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                            {related.category}
                          </div>
                          <h4 className="font-display font-bold text-white text-lg leading-tight group-hover:text-royal-pink transition-colors">
                            {related.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                </div>
              </section>
            )}

            {/* Contact Form */}
            <section className="mb-16 bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10">
              <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tighter mb-2 text-center">
                {language === 'ru' ? 'Начнём мероприятие' : 'Let\'s Start Your Event'}
              </h2>
              <p className="text-white/40 text-sm text-center mb-8">
                {language === 'ru' ? 'Оставьте заявку — мы свяжемся с вами' : 'Submit a request — we\'ll get in touch'}
              </p>
              <ContactForm />
            </section>

            {/* Services List */}
            <section>
              <h3 className="text-xl font-display font-bold uppercase tracking-tight text-white mb-6">
                {language === 'ru' ? 'Наши услуги' : 'Our Services'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {t.servicesOverview.items.map((service: any, i: number) => (
                  <Link
                    key={i}
                    to={lp('/services')}
                    className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 hover:border-royal-pink/50 hover:bg-white/5 transition-all group"
                  >
                    <div className="flex-1">
                      <h4 className="font-display font-bold text-white uppercase text-sm tracking-tight">{service.title}</h4>
                      <p className="text-white/40 text-xs mt-1">{service.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-royal-pink transition-colors" />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  // Blog List View (unchanged — dark theme)
  return (
    <div className="pt-32 pb-20 bg-royal-black min-h-screen">
      <SEO title={blogData.title} description={blogData.subtitle} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-royal-pink text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">
              {blogData.title}
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              {blogData.subtitle}
            </h1>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.articles.map((article: any, index: number) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <Link to={lp(`/blog/${article.id}`)} className="block">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-royal-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-royal-pink text-white text-[8px] font-bold uppercase tracking-widest rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-white/40">
                  <div className="flex items-center gap-2">
                    <Calendar size={12} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">{article.date}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-royal-pink transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="inline-flex items-center gap-2 text-royal-pink text-[10px] font-bold uppercase tracking-widest group/btn">
                  {blogData.readMore}
                  <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
