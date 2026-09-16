import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { cruises } from '../content/la-royal-event';

const Cruises = () => {
  const lp = useLocalizedPath();

  return (
    <div className="min-h-screen bg-royal-night text-royal-sand font-manrope">
      <SEO
        title="Круизы по Нилу для корпоративных групп — Луксор, Асуан, Каир, Дендера"
        description="Классические 5★ круизы Луксор–Асуан, камерные дахабии, длинные круизы из Каира через Дендеру и Абидос, вечерние круизы по Каиру. Корпоративный фрахт, прямые контракты с судовладельцами."
        keywords="круиз по Нилу, круиз Луксор Асуан, дахабия, корпоративный круиз, Дендера, круиз из Каира, La Royal Event"
      />

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
              Организуем круизы для корпоративных групп и частных путешественников: классические 5-звёздочные суда, камерные дахабии, длинные круизы из Каира. Прямые контракты с судовладельцами, корпоративный фрахт.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-royal-rule">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {cruises.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i }}
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
      </section>

      <section className="py-20 px-6 border-t border-royal-rule bg-[radial-gradient(70%_80%_at_25%_20%,rgba(139,95,214,0.2),transparent_50%)]">
        <div className="max-w-7xl mx-auto">
          <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Следующий шаг</p>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-6">Напишите даты и число гостей</h2>
          <p className="max-w-2xl text-royal-sand-2 mb-8">Подберём судно, каюты и маршрут под вашу группу. Возможен полный фрахт.</p>
          <Link to={lp('/contact')} className="inline-flex items-center gap-3 px-8 py-4 bg-royal-lilac text-royal-night font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-royal-lilac-deep hover:text-white transition-colors">
            Запросить предложение <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Cruises;
