import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarDays, Check, MapPin, Ticket } from 'lucide-react';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import { useLanguage } from '../LanguageContext';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { concerts } from '../content/la-royal-event';
import { SITE_URL } from '../site-config';

/**
 * Раздел «Билеты на концерты».
 * Данные события — в src/content/la-royal-event.ts (экспорт concerts), там же обе локали.
 * Цены не публикуем: стоимость фиксируется при подтверждении брони.
 */
const Tickets = () => {
  const { language } = useLanguage();
  const lp = useLocalizedPath();
  const ru = language === 'ru';
  const event = concerts[0];
  const c = ru ? event.ru : event.en;

  // Schema.org MusicEvent — поисковики показывают дату, площадку и ссылку на бронь.
  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: `${event.artist} — ${c.venue}`,
    startDate: event.dateISO,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    performer: { '@type': 'MusicGroup', name: event.artist },
    superEvent: { '@type': 'Festival', name: event.tour },
    location: {
      '@type': 'Place',
      name: c.venue,
      address: { '@type': 'PostalAddress', addressLocality: ru ? 'Гиза' : 'Giza', addressCountry: 'EG' },
    },
    image: `${SITE_URL}${event.ogImage || '/og-image.png'}`,
    description: c.teaser,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/${language}/tickets/`,
      availability: 'https://schema.org/PreOrder',
      validFrom: event.salesStartISO,
      seller: { '@type': 'Organization', name: 'La Royal Event' },
    },
  };

  // Бронь идёт через нашу форму внизу страницы, а не через сторонний сервис
  const book = (
    <a
      href="#booking"
      className="inline-flex items-center gap-3 px-8 py-4 bg-royal-lilac text-royal-night font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-royal-lilac-deep hover:text-white transition-colors"
    >
      {ru ? 'Забронировать' : 'Book now'} <ArrowRight className="w-4 h-4" />
    </a>
  );

  return (
    <div className="min-h-screen bg-royal-night text-royal-sand font-manrope">
      <SEO
        title={ru ? 'Билеты на концерт Шакиры у пирамид Гизы' : 'Shakira at the Pyramids of Giza: Tickets'}
        description={
          ru
            ? 'Шакира у пирамид Гизы 28 ноября 2027. Бронируем VIP-билеты в лаунжи категорий А и Б, трансфер, отель и программу в Каире. Старт продаж — 1 октября 2026.'
            : 'Shakira at the Pyramids of Giza on 28 November 2027. VIP tickets in lounge categories A and B, transfers, hotels and a programme in Cairo. Sale opens 1 October 2026.'
        }
        keywords={
          ru
            ? 'билеты на Шакиру, концерт Шакиры в Египте, Шакира пирамиды Гизы, VIP билеты на концерт, Shakira Giza, концерт у пирамид, La Royal Event'
            : 'Shakira tickets, Shakira Giza concert, concert at the pyramids, VIP lounge tickets Egypt, Shakira Egypt 2027, La Royal Event'
        }
        image={event.ogImage}
        jsonLd={eventJsonLd}
      />

      {/* Афиша события */}
      {event.image && (
        <section className="pt-28 sm:pt-32 px-6">
          <div className="max-w-7xl mx-auto">
            <img
              src={event.image.src}
              alt={event.image.alt}
              width={1600}
              height={551}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full rounded-2xl sm:rounded-3xl border border-royal-rule"
            />
          </div>
        </section>
      )}

      {/* Hero */}
      <section className={`${event.image ? 'pt-12 pb-16' : 'pt-40 pb-20'} px-6 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(60%_60%_at_80%_20%,rgba(139,95,214,0.28),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <Link to={lp('/')} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-royal-dim hover:text-royal-lilac transition-colors">
              <ArrowLeft className="w-3 h-3" /> {ru ? 'Назад на главную' : 'Back to home'}
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-5">{ru ? 'Билеты на концерты' : 'Concert tickets'}</p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter mb-6 uppercase leading-[0.95]">
              {ru ? 'Шакира у пирамид Гизы' : 'Shakira at the Pyramids of Giza'}
            </h1>
            <div className="w-24 h-1.5 bg-royal-lilac mb-8" />
            <p className="max-w-2xl text-xl text-royal-sand-2 font-light leading-relaxed mb-10">{c.lead}</p>

            <div className="flex flex-wrap items-center gap-4">
              {book}
              <Link to={lp('/contact')} className="inline-flex items-center gap-3 px-8 py-4 border border-royal-rule rounded-xl text-sm font-bold uppercase tracking-widest text-royal-sand-2 hover:border-royal-lilac-deep hover:text-royal-lilac transition-colors">
                {ru ? 'Задать вопрос' : 'Ask a question'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Карточка события */}
      <section className="px-6 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-royal-card border border-royal-rule p-7 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-3 flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5" /> {ru ? 'Дата' : 'Date'}
              </p>
              <p className="text-2xl font-display font-bold">{c.dateLabel}</p>
              <p className="text-sm text-royal-lime mt-2">{c.salesLabel}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-3 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> {ru ? 'Площадка' : 'Venue'}
              </p>
              <p className="text-2xl font-display font-bold">{c.venue}</p>
              <p className="text-sm text-royal-sand-2 mt-2">{c.city}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-3 flex items-center gap-2">
                <Ticket className="w-3.5 h-3.5" /> {ru ? 'Тур' : 'Tour'}
              </p>
              <p className="text-2xl font-display font-bold">{event.artist}</p>
              <p className="text-sm text-royal-sand-2 mt-2">{event.tour}</p>
            </div>
          </div>
        </div>
      </section>

      {/* О площадке */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">{ru ? 'О площадке' : 'The venue'}</p>
            <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-8">
              {ru ? 'Сцена, за которой стоит чудо света' : 'A stage with a wonder of the world behind it'}
            </h2>
            <div className="space-y-5">
              {c.about.map((p, i) => (
                <p key={i} className={i === 0 ? 'text-lg text-royal-sand leading-relaxed' : 'text-royal-sand-2 leading-relaxed'}>{p}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {c.categories.map((cat) => (
              <div key={cat.name} className="p-6 rounded-2xl bg-royal-card border border-royal-rule">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-2">{cat.name}</p>
                <p className="text-sm text-royal-sand-2 leading-relaxed">{cat.text}</p>
              </div>
            ))}
            <div className="p-6 rounded-2xl border border-royal-rule">
              <p className="text-sm text-royal-sand-2 leading-relaxed">
                {ru
                  ? 'Общие сектора продаются у официальных операторов. Через нас — VIP-лаунжи категорий А и Б и вся поездка вокруг концерта.'
                  : 'General sectors are sold by the official operators. Through us: VIP lounges in categories A and B, plus the trip around the show.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Что берём на себя */}
      <section className="py-16 px-6 border-t border-royal-rule bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">{ru ? 'Услуга' : 'Service'}</p>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-10">{c.vipTitle}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.vip.map((v) => (
              <li key={v} className="flex gap-3 p-5 rounded-xl bg-royal-card border border-royal-rule text-sm text-royal-sand">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-royal-lime" />
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Как забронировать */}
      <section className="py-16 px-6 border-t border-royal-rule">
        <div className="max-w-7xl mx-auto">
          <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">{ru ? 'Порядок' : 'Process'}</p>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-10">{c.stepsTitle}</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.steps.map((s, i) => (
              <li key={s} className="p-6 rounded-2xl border border-royal-rule">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-dim mb-3">{ru ? 'Шаг' : 'Step'} {i + 1}</p>
                <p className="text-sm text-royal-sand-2 leading-relaxed">{s}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 p-7 rounded-2xl bg-royal-card border border-royal-rule">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-4">{ru ? 'Примечание' : 'Please note'}</p>
            <ul className="space-y-2.5">
              {c.notes.map((n) => (
                <li key={n} className="text-sm text-royal-sand-2 leading-relaxed">— {n}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Заявка на бронирование — наша форма, без сторонних сервисов */}
      <section id="booking" className="py-20 px-6 border-t border-royal-rule bg-[radial-gradient(70%_80%_at_25%_20%,rgba(139,95,214,0.2),transparent_50%)] scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">{ru ? 'Бронирование' : 'Booking'}</p>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-6">
            {ru ? 'Оставьте заявку на билеты' : 'Request your tickets'}
          </h2>
          <p className="max-w-2xl text-royal-sand-2 mb-10">
            {ru
              ? 'Напишите число гостей и категорию лаунжа — подтвердим наличие мест и пришлём условия. В поле сообщения укажите «Шакира, 28 ноября» и нужную категорию: А или Б.'
              : 'Tell us the number of guests and the lounge category. We confirm availability and send the terms. In the message field, write “Shakira, 28 November” and the category you want: A or B.'}
          </p>
          <ContactForm />
          <div className="mt-10">
            <Link to={lp('/dmc')} className="inline-flex items-center gap-3 px-8 py-4 border border-royal-rule rounded-xl text-sm font-bold uppercase tracking-widest text-royal-sand-2 hover:border-royal-lilac-deep hover:text-royal-lilac transition-colors">
              {ru ? 'Что мы делаем в Египте' : 'What we do in Egypt'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Tickets;
