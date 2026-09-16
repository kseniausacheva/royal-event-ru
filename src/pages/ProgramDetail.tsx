import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { SITE_URL } from '../site-config';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { programs } from '../content/la-royal-event';

const Dots = ({ n, warm = false }: { n: number; warm?: boolean }) => (
  <span className="inline-flex gap-1">
    {[0, 1, 2, 3, 4].map((i) => (
      <i
        key={i}
        className={`block w-[7px] h-[7px] rounded-full ${i < n ? (warm ? 'bg-royal-rose' : 'bg-royal-lilac') : 'bg-royal-rule'}`}
      />
    ))}
  </span>
);

const Label = ({ children }: { children: ReactNode }) => (
  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lime mb-1.5">{children}</p>
);

const ProgramDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const lp = useLocalizedPath();

  const idx = programs.findIndex((p) => p.slug === slug);
  if (idx === -1) return <Navigate to={lp('/programmy')} replace />;

  const p = programs[idx];
  const prev = idx > 0 ? programs[idx - 1] : null;
  const next = idx < programs.length - 1 ? programs[idx + 1] : null;

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: p.name,
    description: p.seoDesc,
    provider: { '@type': 'Organization', name: 'La Royal Event' },
    areaServed: { '@type': 'Country', name: 'Egypt' },
    serviceType: 'Corporate team building program',
  };

  return (
    <div className="min-h-screen bg-royal-night text-royal-sand font-manrope">
      <SEO
        title={p.seoTitle.replace(' — La Royal Event', '')}
        description={p.seoDesc}
        image={p.image ? `${SITE_URL}${p.image}` : undefined}
        keywords={`${p.keyword}, тимбилдинг в Египте, корпоратив в Египте, La Royal Event`}
        jsonLd={serviceJsonLd}
        breadcrumbs={[
          { name: 'Главная', url: lp('/') },
          { name: 'Программы', url: lp('/programmy') },
          { name: p.name, url: lp(`/programmy/${p.slug}`) },
        ]}
      />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 relative overflow-hidden">
        {p.image && (
          <>
            <img src={p.image} alt="" aria-hidden="true" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-b from-royal-night/40 via-royal-night/70 to-royal-night" />
          </>
        )}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(60%_60%_at_80%_20%,rgba(139,95,214,0.28),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <Link to={lp('/programmy')} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-royal-dim hover:text-royal-lilac transition-colors">
              <ArrowLeft className="w-3 h-3" /> Все программы
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-5">{p.eyebrow}</p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tighter mb-6 leading-[0.95]">
              {p.h1}
            </h1>
            <p className="max-w-xl text-xl md:text-2xl text-royal-lime font-serif italic leading-snug">{p.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 border-t border-royal-rule">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14">

          {/* Main */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-6">О программе</h2>
              <div className="space-y-4 text-royal-sand-2 leading-relaxed">
                {p.text.map((para, i) => (
                  <p key={i} className={i === 0 ? 'text-lg text-royal-sand' : ''}>{para}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-6">Что вы делаете</h2>
              <ul className="border-t border-royal-rule">
                {p.doing.map((d, i) => (
                  <li key={i} className="relative py-3 pl-7 border-b border-royal-rule text-sm text-royal-sand-2 leading-relaxed">
                    <span className="absolute left-0 top-3 text-royal-lilac-deep font-mono text-sm">→</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-royal-lilac/25 bg-gradient-to-b from-royal-lilac-deep/15 to-royal-lilac-deep/5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-2">Финал</p>
              <p className="text-royal-sand leading-relaxed">{p.finale}</p>
            </div>
          </div>

          {/* Aside */}
          <aside className="lg:col-span-5 lg:border-l lg:border-royal-rule lg:pl-10 space-y-7 text-sm">
            <div>
              <Label>Где и сколько</Label>
              <p className="text-royal-sand-2">{p.where}</p>
            </div>
            <div>
              <Label>Для кого</Label>
              <p className="text-royal-sand-2">{p.forWhom}</p>
            </div>
            <div>
              <Label>Нагрузка</Label>
              <div className="flex items-center gap-3 text-royal-sand-2 mb-1.5">Активность <Dots n={p.activity} /></div>
              <div className="flex items-center gap-3 text-royal-sand-2">Напряжение <Dots n={p.tension} warm /></div>
            </div>
            <div>
              <Label>Что входит</Label>
              <ul className="list-disc list-inside text-royal-sand-2 space-y-1">
                {p.includes.map((inc, i) => <li key={i}>{inc}</li>)}
              </ul>
            </div>
            <div>
              <Label>Что останется</Label>
              <p className="text-royal-sand-2">{p.remains}</p>
            </div>
            <div>
              <Label>Готовим за</Label>
              <p className="text-royal-sand-2">{p.prep}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Neighbors */}
      <section className="py-12 px-6 border-t border-royal-rule">
        <div className="max-w-7xl mx-auto">
          <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Смотрите также</p>
          <div className="flex flex-wrap gap-3">
            <Link to={lp('/programmy')} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-royal-rule text-sm text-royal-sand-2 hover:border-royal-lilac-deep hover:text-royal-lilac transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Все программы
            </Link>
            {prev && (
              <Link to={lp(`/programmy/${prev.slug}`)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-royal-rule text-sm text-royal-sand-2 hover:border-royal-lilac-deep hover:text-royal-lilac transition-colors">
                {prev.name}
              </Link>
            )}
            {next && (
              <Link to={lp(`/programmy/${next.slug}`)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-royal-rule text-sm text-royal-sand-2 hover:border-royal-lilac-deep hover:text-royal-lilac transition-colors">
                {next.name} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-royal-rule bg-[radial-gradient(70%_80%_at_25%_20%,rgba(139,95,214,0.2),transparent_50%)]">
        <div className="max-w-7xl mx-auto">
          <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Следующий шаг</p>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-6">Напишите дату, число гостей и отель</h2>
          <p className="max-w-2xl text-royal-sand-2 mb-8">Остальное спросим сами. Если хотите сначала попробовать — проведём для вашей команды принятия решения сорокапятиминутный прогон одной станции, без обязательств.</p>
          <Link to={lp('/contact')} className="inline-flex items-center gap-3 px-8 py-4 bg-royal-lilac text-royal-night font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-royal-lilac-deep hover:text-white transition-colors">
            Запросить предложение <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="py-8 px-6 text-xs text-royal-dim">
        <p className="max-w-3xl mx-auto">{p.disclaimer}</p>
      </footer>
    </div>
  );
};

export default ProgramDetail;
