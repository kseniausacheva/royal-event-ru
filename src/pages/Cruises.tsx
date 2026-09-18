import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import SEO from '../components/SEO';
import { PhotoSet, ZoomImage } from '../components/PhotoLightbox';
import CruiseRouteMap from '../components/CruiseRouteMap';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { cruises, fleet, cruiseSights, dahabiyas } from '../content/la-royal-event';

import { SITE_URL } from '../site-config';

const Cruises = () => {
  const lp = useLocalizedPath();

  return (
    <div className="min-h-screen bg-royal-night text-royal-sand font-manrope">
      <SEO
        title="Круизы по Нилу для корпоративных групп"
        description="Корпоративные круизы Луксор–Асуан на Le Fayan Suites и Soleil, приватный чартер Lumière, дахабии Nour El Nil, круизы из Каира. Прямые контракты, полный фрахт."
        keywords="круиз по Нилу, круиз Луксор Асуан, Le Fayan Suites, Soleil Nile cruise, Lumière, дахабия, Nour El Nil, Dendera, корпоративный круиз, фрахт судна Нил, Дендера, круиз из Каира, La Royal Event"
        image={`${SITE_URL}/cruises/fayan-ship.webp`}
      />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(60%_60%_at_80%_20%,rgba(139,95,214,0.28),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <Link to={lp('/')} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-royal-dim hover:text-royal-lilac transition-colors">
              <ArrowLeft className="w-3 h-3" /> Назад на главную
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-5">Круизы по Нилу</p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter mb-6 uppercase leading-[0.95]">
              От Каира до Асуана — по воде, на которой построена вся история
            </h1>
            <div className="w-24 h-1.5 bg-royal-lilac mb-8" />
            <p className="max-w-2xl text-xl text-royal-sand-2 font-light leading-relaxed">
              Организуем круизы для корпоративных групп и частных путешественников: 5-звёздочные суда на 37 и 53 каюты, приватный чартер на 20 гостей, парусные дахабии Nour El Nil на 16–24 гостя, длинные круизы из Каира. Прямые контракты с судовладельцами — без посредников и наценок.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Флот */}
      <section className="py-16 px-6 border-t border-royal-rule">
        <div className="max-w-7xl mx-auto">
          <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Флот</p>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-12">Три судна, с которыми мы работаем напрямую</h2>

          <div className="space-y-16">
            {fleet.map((ship, i) => {
              const heroAlt = `${ship.name} — судно на Ниле`;
              return (
                <PhotoSet key={ship.slug} photos={[{ src: ship.hero, alt: heroAlt }, ...ship.gallery]}>
                  {(open) => (
                    <motion.article
                      id={ship.slug}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.5 }}
                      className="rounded-3xl bg-royal-card border border-royal-rule overflow-hidden"
                    >
                      <div className={`grid grid-cols-1 lg:grid-cols-5 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                        <div className="lg:col-span-3 relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
                          <ZoomImage
                            src={ship.hero}
                            alt={heroAlt}
                            onOpen={() => open(0)}
                            loading={i === 0 ? 'eager' : 'lazy'}
                            className="absolute inset-0 w-full h-full"
                            imgClassName="object-cover"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-royal-night/70 via-transparent to-transparent" />
                          <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                            <h3 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight text-white drop-shadow">{ship.name}</h3>
                            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-royal-night/70 border border-white/15 text-royal-lime">{ship.capacity}</span>
                          </div>
                        </div>

                        <div className="lg:col-span-2 p-7 sm:p-9 flex flex-col">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-4">{ship.kicker}</p>
                          <p className="text-royal-sand-2 leading-relaxed mb-6">{ship.text}</p>
                          <ul className="space-y-2.5 mb-6">
                            {ship.facts.map((f) => (
                              <li key={f} className="flex gap-3 text-sm text-royal-sand">
                                <Check className="w-4 h-4 mt-0.5 shrink-0 text-royal-lime" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-royal-dim leading-relaxed mt-auto">{ship.routes}</p>
                        </div>
                      </div>

                      <div className="px-7 sm:px-9 pb-8 pt-2 border-t border-royal-rule">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
                          {ship.gallery.map((g, gi) => (
                            <ZoomImage
                              key={g.src}
                              src={g.src}
                              alt={g.alt}
                              onOpen={() => open(gi + 1)}
                              className="w-full aspect-[4/3] rounded-xl border border-royal-rule"
                              imgClassName="object-cover"
                            />
                          ))}
                        </div>
                        <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-royal-dim">
                          На борту: {ship.onboard.join(' · ')}
                        </p>
                      </div>
                    </motion.article>
                  )}
                </PhotoSet>
              );
            })}
          </div>
        </div>
      </section>

      {/* Дахабии */}
      <section id="dahabiya" className="py-16 px-6 border-t border-royal-rule bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Дахабии</p>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-8">Под парусом: Эсна → Асуан за шесть дней</h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
            <div className="lg:col-span-7 space-y-4">
              {dahabiyas.intro.map((t, i) => (
                <p key={i} className={i === 0 ? 'text-lg text-royal-sand leading-relaxed' : 'text-royal-sand-2 leading-relaxed'}>{t}</p>
              ))}
            </div>
            <div className="lg:col-span-5 space-y-3">
              {dahabiyas.cabinTypes.map((c) => (
                <div key={c.name} className="p-4 rounded-xl bg-royal-card border border-royal-rule">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-1">{c.name}</p>
                  <p className="text-sm text-royal-sand-2">{c.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start mb-12">
            {dahabiyas.boats.map((b) => {
              const gallery = b.gallery ?? [];
              const photos = [...(b.hero ? [b.hero] : []), ...gallery];
              const galleryOffset = b.hero ? 1 : 0;
              return (
                <PhotoSet key={b.name} photos={photos}>
                  {(open) => (
                    <div className="rounded-2xl bg-royal-card border border-royal-rule overflow-hidden flex flex-col">
                      {b.hero && (
                        <ZoomImage
                          src={b.hero.src}
                          alt={b.hero.alt}
                          onOpen={() => open(0)}
                          className="w-full aspect-[4/3] border-b border-royal-rule"
                          imgClassName="object-cover"
                        />
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-lg font-display font-bold mb-1">{b.name}</h3>
                        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-royal-lime mb-3">{b.facts}</p>
                        <p className="text-sm text-royal-sand-2 leading-relaxed">{b.note}</p>
                        {gallery.length > 0 && (
                          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-royal-rule">
                            {gallery.map((g, gi) => (
                              <ZoomImage
                                key={g.src}
                                src={g.src}
                                alt={g.alt}
                                onOpen={() => open(galleryOffset + gi)}
                                className="w-full aspect-[4/3] rounded-lg border border-royal-rule"
                                imgClassName="object-cover"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </PhotoSet>
              );
            })}
          </div>

          {dahabiyas.gallery.length > 0 && (
            <PhotoSet photos={dahabiyas.gallery}>
              {(open) => (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
                  {dahabiyas.gallery.map((g, gi) => (
                    <ZoomImage
                      key={g.src}
                      src={g.src}
                      alt={g.alt}
                      onOpen={() => open(gi)}
                      className="w-full aspect-[4/3] rounded-xl border border-royal-rule"
                      imgClassName="object-cover"
                    />
                  ))}
                </div>
              )}
            </PhotoSet>
          )}

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-4">Шесть дней по реке</p>
          <CruiseRouteMap
            days={dahabiyas.days}
            routeLabel="Эсна → Асуан"
            routeMeta="5 ночей · 6 дней · 250 км"
          />
        </div>
      </section>

      {/* Форматы */}
      <section className="py-16 px-6 border-t border-royal-rule">
        <div className="max-w-7xl mx-auto">
          <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Форматы</p>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-10">Как это может быть устроено</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {cruises.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * i }}
                className="p-7 rounded-2xl bg-royal-card border border-royal-rule"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lime mb-2">{c.route}</p>
                <h3 className="text-2xl font-display font-bold mb-3">{c.name}</h3>
                <p className="text-sm text-royal-sand-2 leading-relaxed mb-4">{c.text}</p>
                <div className="flex flex-wrap gap-2">
                  {c.chips.map((ch) => (
                    <span key={ch} className="text-[11px] px-3 py-1 rounded-full border border-royal-rule text-royal-sand-2">{ch}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Что смотрим */}
      <section className="py-16 px-6 border-t border-royal-rule bg-white/[0.02]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Маршрут</p>
            <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-6">Что увидит группа между Луксором и Асуаном</h2>
            <p className="text-royal-sand-2 leading-relaxed">
              Программа на берегу входит в стоимость: гид-египтолог на русском, входные билеты, трансферы к храмам. Вечером — ужин и программа на борту. Порядок остановок зависит от направления и числа ночей.
            </p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cruiseSights.map((s) => (
              <li key={s} className="flex gap-3 p-4 rounded-xl bg-royal-card border border-royal-rule text-sm">
                <span className="text-royal-lilac-deep">→</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-royal-rule bg-[radial-gradient(70%_80%_at_25%_20%,rgba(139,95,214,0.2),transparent_50%)]">
        <div className="max-w-7xl mx-auto">
          <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Следующий шаг</p>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-6">Напишите даты и число гостей</h2>
          <p className="max-w-2xl text-royal-sand-2 mb-8">Подберём судно, категории кают и маршрут под вашу группу. Возможен полный фрахт.</p>
          <Link to={lp('/contact')} className="inline-flex items-center gap-3 px-8 py-4 bg-royal-lilac text-royal-night font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-royal-lilac-deep hover:text-white transition-colors">
            Запросить предложение <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Cruises;
