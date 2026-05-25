import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../LanguageContext';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  noindex?: boolean;
  /** Optional JSON-LD structured data object (or array) to inject in addition to the global Organization schema */
  jsonLd?: object | object[];
}

/**
 * Primary site URLs.
 * The .ru host is the canonical home for Russian content.
 * The .com host is the canonical home for English content.
 * We point cross-domain hreflang accordingly so Yandex/Google don't see duplicate content.
 */
const RU_SITE_URL = 'https://royaleventandmice.ru';
const COM_SITE_URL = 'https://www.royaleventandmice.com';
const SITE_NAME = 'Royal Event Group';
const DEFAULT_OG_IMAGE = '/logo.png';

const RU_DEFAULT_DESCRIPTION =
  'Royal Event Group — MICE-агентство полного цикла: организация корпоративных мероприятий, конференций, тимбилдингов и инсентив-туров в Египте, ОАЭ, России и на Ближнем Востоке. 20+ лет опыта, собственное производство, прямые контракты с топ-отелями.';

const EN_DEFAULT_DESCRIPTION =
  'Royal Event Group — Full-cycle MICE agency: corporate events, conferences, team building and incentive tours in Egypt, UAE, Russia and the Middle East. 20+ years of experience, in-house production, direct contracts with top hotels.';

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
  'тимбилдинг ОАЭ',
  'тимбилдинг Египет',
  'инсентив туры',
  'incentive туры',
  'корпоративы в Египте',
  'корпоративы в ОАЭ',
  'корпоративы в Дубае',
  'мероприятия в Шарм-эль-Шейхе',
  'мероприятия в Дубае',
  'мероприятия в Абу-Даби',
  'организация мероприятий в Москве',
  'делегации',
  'сопровождение делегаций',
  'арабские делегации',
  'DMC агентство',
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
  'events in UAE',
  'events in Dubai',
  'events in Sharm El Sheikh',
  'events in Abu Dhabi',
  'events in Moscow',
  'Arabic delegations',
  'DMC agency',
  'Royal Event Group',
].join(', ');

const SEO: React.FC<SEOProps> = ({ title, description, keywords, image, noindex, jsonLd }) => {
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

  const canonicalUrl = `${canonicalHost}${location.pathname}`;
  const altLang = language === 'ru' ? 'en' : 'ru';
  const altPath = location.pathname.replace(`/${language}`, `/${altLang}`);
  const altUrl = `${alternateHost}${altPath}`;
  const xDefaultUrl = `${RU_SITE_URL}${location.pathname.replace(/^\/(ru|en)/, '/ru')}`;

  // JSON-LD: Organization schema. Yandex parses Schema.org markup and shows it in SERP.
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    legalName: 'Royal Event Group',
    url: RU_SITE_URL,
    logo: `${RU_SITE_URL}/logo.png`,
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
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      availableLanguage: ['Russian', 'English', 'Arabic'],
    },
  };

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
