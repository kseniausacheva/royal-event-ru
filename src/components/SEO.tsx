import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../LanguageContext';
import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  name: string;
  /** Absolute URL OR a path relative to the canonical host (we'll prefix it for you) */
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  noindex?: boolean;
  /** Optional JSON-LD structured data object (or array) to inject in addition to the global Organization schema */
  jsonLd?: object | object[];
  /** Optional breadcrumbs trail. If omitted, we auto-generate from the URL pathname. Pass `false` to disable. */
  breadcrumbs?: BreadcrumbItem[] | false;
  /** Optional FAQ list. When provided, emits FAQPage JSON-LD (Яндекс показывает FAQ-блок в выдаче). */
  faq?: FAQItem[];
}

/**
 * Map of URL segments → human-readable label per language.
 * Used to auto-generate breadcrumbs for top-level pages.
 * Pages with dynamic params (e.g. /portfolio/:id) should pass `breadcrumbs` prop directly.
 */
const BREADCRUMB_LABELS: Record<string, { ru: string; en: string }> = {
  about: { ru: 'О компании', en: 'About' },
  services: { ru: 'Услуги', en: 'Services' },
  portfolio: { ru: 'Кейсы', en: 'Portfolio' },
  delegations: { ru: 'Делегации', en: 'Delegations' },
  egypt: { ru: 'Египет', en: 'Egypt' },
  programmy: { ru: 'Программы', en: 'Programs' },
  cruises: { ru: 'Круизы по Нилу', en: 'Nile Cruises' },
  dmc: { ru: 'DMC Египет', en: 'DMC Egypt' },
  russia: { ru: 'Россия', en: 'Russia' },
  blog: { ru: 'Блог', en: 'Blog' },
  contact: { ru: 'Контакты', en: 'Contact' },
  privacy: { ru: 'Политика конфиденциальности', en: 'Privacy Policy' },
  offer: { ru: 'Договор оферты', en: 'Public Offer' },
  'mailing-consent': { ru: 'Согласие на рассылку', en: 'Mailing Consent' },
  'data-consent': { ru: 'Согласие на обработку данных', en: 'Data Processing Consent' },
};

/**
 * Primary site URLs.
 * The .ru host is the canonical home for Russian content.
 * The .com host is the canonical home for English content.
 * We point cross-domain hreflang accordingly so Yandex/Google don't see duplicate content.
 */
import { RU_SITE_URL, COM_SITE_URL, SITE_NAME, withHost } from '../site-config';
const DEFAULT_OG_IMAGE = '/og-image.png';

const RU_DEFAULT_DESCRIPTION =
  'La Royal Event — MICE-агентство и DMC полного цикла: организация корпоративных мероприятий, конференций, тимбилдингов и инсентив-туров в Египте и на Ближнем Востоке. 20+ лет опыта, собственное производство, прямые контракты с топ-отелями.';

const EN_DEFAULT_DESCRIPTION =
  'La Royal Event — Full-cycle MICE & DMC agency: corporate events, conferences, team building and incentive tours in Egypt and the Middle East. 20+ years of experience, in-house production, direct contracts with top hotels.';

const RU_DEFAULT_KEYWORDS = [
  'MICE',
  'MICE агентство',
  'MICE агентство Москва',
  'организация мероприятий',
  'организация корпоративных мероприятий',
  'корпоративы за рубежом',
  'event агентство',
  'ивент агентство Москва',
  'конференции',
  'организация конференций',
  'тимбилдинг',
  'тимбилдинг Египет',
  'инсентив туры',
  'incentive туры',
  'корпоративы в Египте',
  'мероприятия в Шарм-эль-Шейхе',
  'организация мероприятий в Москве',
  'делегации',
  'сопровождение делегаций',
  'арабские делегации',
  'DMC агентство',
  'DMC Египет',
  'квест на пирамидах',
  'круиз по Нилу',
  'приватный доступ к пирамидам',
  'La Royal Event',
  'Royal Event Group',
].join(', ');

const EN_DEFAULT_KEYWORDS = [
  'MICE',
  'MICE agency',
  'event organization',
  'corporate events',
  'corporate event agency',
  'conferences',
  'team building',
  'incentive tours',
  'events in Egypt',
  'events in Sharm El Sheikh',
  'events in Moscow',
  'Arabic delegations',
  'DMC agency',
  'DMC Egypt',
  'Nile cruise',
  'private pyramid access',
  'La Royal Event',
  'Royal Event Group',
].join(', ');

const SEO: React.FC<SEOProps> = ({ title, description, keywords, image, noindex, jsonLd, breadcrumbs, faq }) => {
  const { language } = useLanguage();
  const location = useLocation();

  // Pick the canonical host based on language.
  // RU pages live on .ru, EN pages live on .com — even when accessed from the other host
  // this tells search engines who is authoritative for each language.
  const canonicalHost = language === 'ru' ? RU_SITE_URL : COM_SITE_URL;
  const alternateHost = language === 'ru' ? COM_SITE_URL : RU_SITE_URL;

  const defaultDescription = language === 'ru' ? RU_DEFAULT_DESCRIPTION : EN_DEFAULT_DESCRIPTION;
  const defaultKeywords = language === 'ru' ? RU_DEFAULT_KEYWORDS : EN_DEFAULT_KEYWORDS;

  const seoTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — MICE-агентство полного цикла`;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image
    ? (image.startsWith('http') ? image : `${canonicalHost}${image}`)
    : `${canonicalHost}${DEFAULT_OG_IMAGE}`;

  // Canonical/og:url — всегда со слэшем на конце (см. site-config.withHost):
  // Apache на reg.ru и Vercel (trailingSlash) 301/308-ят адреса без слэша.

  const canonicalUrl = withHost(canonicalHost, location.pathname);
  const altLang = language === 'ru' ? 'en' : 'ru';
  const altPath = location.pathname.replace(`/${language}`, `/${altLang}`);
  const altUrl = withHost(alternateHost, altPath);
  const xDefaultUrl = withHost(RU_SITE_URL, location.pathname.replace(/^\/(ru|en)/, '/ru'));

  // Build breadcrumbs: explicit prop wins, `false` disables, otherwise auto-generate from URL.
  const homeLabel = language === 'ru' ? 'Главная' : 'Home';
  const autoBreadcrumbs: BreadcrumbItem[] = (() => {
    if (breadcrumbs === false) return [];
    if (Array.isArray(breadcrumbs)) return breadcrumbs;

    // Auto: parse pathname like /ru/services/foo → [Home, Services, foo]
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length <= 1) return []; // home page — no crumbs

    const items: BreadcrumbItem[] = [
      { name: homeLabel, url: withHost(canonicalHost, `/${language}`) },
    ];

    // Skip segments[0] which is the language prefix ('ru' or 'en')
    for (let i = 1; i < segments.length; i++) {
      const seg = segments[i];
      const label = BREADCRUMB_LABELS[seg]?.[language] || seg;
      const url = withHost(canonicalHost, `/${segments.slice(0, i + 1).join('/')}`);
      items.push({ name: label, url });
    }
    return items;
  })();

  // BreadcrumbList JSON-LD (Яндекс показывает хлебные крошки в выдаче вместо URL → выше CTR)
  const breadcrumbsJsonLd =
    autoBreadcrumbs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: autoBreadcrumbs.map((b, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: b.name,
            item: b.url.startsWith('http') ? b.url : `${canonicalHost}${b.url}`,
          })),
        }
      : null;

  // FAQPage JSON-LD (Яндекс рисует свёрнутый FAQ-блок прямо в результатах поиска)
  const faqJsonLd =
    faq && faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  // JSON-LD: Organization schema. Yandex parses Schema.org markup and shows it in SERP.
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    legalName: 'Royal Event Group',
    url: RU_SITE_URL,
    logo: `${RU_SITE_URL}/logo-la-royal-event.png`,
    description: RU_DEFAULT_DESCRIPTION,
    foundingDate: '2004',
    sameAs: [
      COM_SITE_URL,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Genina City Mall, office 3090',
      addressLocality: 'Sharm El Sheikh',
      postalCode: '19090',
      addressCountry: 'EG',
    },
    areaServed: [
      { '@type': 'Country', name: 'Russia' },
      { '@type': 'Country', name: 'Egypt' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: ['Russian', 'English', 'Arabic'],
    },
  };

  // Direct DOM head updater — fallback на случай если react-helmet-async не отработает
  // (есть известная проблема несовместимости react-helmet-async@2 с React 19 в headless-browsers,
  // включая Puppeteer для prerender). Это гарантирует, что title/meta/canonical/JSON-LD будут в HEAD.
  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.title = seoTitle;
    document.documentElement.lang = language;

    // Утилита: создать или обновить meta-тег по селектору
    const upsertMeta = (selector: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
        // помечаем как добавленные нами, чтобы потом убрать
        el.setAttribute('data-seo', 'true');
        document.head.appendChild(el);
      } else {
        if ('content' in attrs) el.setAttribute('content', attrs.content);
      }
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: seoDescription });
    upsertMeta('meta[name="keywords"]', { name: 'keywords', content: seoKeywords });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: seoTitle });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: seoDescription });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: seoImage });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seoTitle });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seoDescription });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: seoImage });
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    });

    // Canonical link
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Удаляем старые JSON-LD блоки, добавленные нашим компонентом
    document.head.querySelectorAll('script[type="application/ld+json"][data-seo="true"]').forEach((el) => el.remove());

    // Добавляем новые JSON-LD блоки (Organization + breadcrumbs + faq + custom jsonLd)
    const ldBlocks: object[] = [organizationJsonLd];
    if (breadcrumbsJsonLd) ldBlocks.push(breadcrumbsJsonLd);
    if (faqJsonLd) ldBlocks.push(faqJsonLd);
    if (jsonLd) {
      if (Array.isArray(jsonLd)) ldBlocks.push(...jsonLd);
      else ldBlocks.push(jsonLd);
    }
    for (const block of ldBlocks) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'true');
      script.textContent = JSON.stringify(block);
      document.head.appendChild(script);
    }
  }, [seoTitle, seoDescription, seoKeywords, canonicalUrl, seoImage, language, noindex, breadcrumbsJsonLd, faqJsonLd, jsonLd]);

  return (
    <Helmet>
      <html lang={language} />
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={SITE_NAME} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />}
      {!noindex && <meta name="yandex" content="index, follow" />}
      {!noindex && <meta name="googlebot" content="index, follow" />}

      {/* Canonical + cross-domain hreflang.
          For RU pages canonical points to .ru, for EN pages to .com */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="ru" href={language === 'ru' ? canonicalUrl : altUrl} />
      <link rel="alternate" hrefLang="en" href={language === 'en' ? canonicalUrl : altUrl} />
      <link rel="alternate" hrefLang="x-default" href={xDefaultUrl} />

      {/* Geo (Russian audience). Yandex respects geo meta for regional ranking. */}
      <meta name="geo.region" content="RU-MOW" />
      <meta name="geo.placename" content="Moscow" />
      <meta name="geo.position" content="55.755826;37.617300" />
      <meta name="ICBM" content="55.755826, 37.617300" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:alt" content={SITE_NAME} />
      <meta property="og:locale" content={language === 'ru' ? 'ru_RU' : 'en_US'} />
      <meta property="og:locale:alternate" content={language === 'ru' ? 'en_US' : 'ru_RU'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* JSON-LD: Organization */}
      <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>

      {/* JSON-LD: BreadcrumbList (auto-generated unless disabled) */}
      {breadcrumbsJsonLd && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbsJsonLd)}</script>
      )}

      {/* JSON-LD: FAQPage (only when `faq` prop is provided) */}
      {faqJsonLd && (
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      )}

      {/* Optional per-page JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
