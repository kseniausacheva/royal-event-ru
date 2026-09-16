import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { programs, programsFaq, programsHow } from '../content/la-royal-event';

const Programs = () => {
  const lp = useLocalizedPath();

  const faq = programsFaq.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <div className="min-h-screen bg-royal-night text-royal-sand font-manrope">
      <SEO
        title="Программы в Египте для компаний — тимбилдинг и корпоратив"
        description="Десять авторских программ в Гизе, Каире, Шарме и на Синае: квесты, иммерсивные ужины, экспедиции. Тимбилдинг в Египте и корпоратив в Египте для групп от 20 до 100 человек."
        keywords="тимбилдинг в Египте, корпоратив в Египте, квест на пирамидах, квест в Каире, иммерсивный ужин в Египте, La Royal Event"
        faq={faq}
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
            <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-5">La Royal Event · тимбилдинг в Египте</p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter mb-6 uppercase leading-[0.95]">
              Десять программ для компаний в Египте
            </h1>
            <div className="w-24 h-1.5 bg-royal-lilac mb-8" />
            <p className="max-w-2xl text-xl text-royal-sand-2 font-light leading-relaxed">
              Корпоратив в Египте — от квеста на плато Гиза до ужина внутри кинопремьеры 1959 года. У каждой программы своя глава одной истории. Ни одна не повторяет другую ни механикой, ни местом, ни финалом.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalog */}
      <section className="py-16 px-6 border-t border-royal-rule">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
            >
              <Link
                to={lp(`/programmy/${p.slug}`)}
                className="group flex flex-col h-full p-6 rounded-2xl bg-royal-card border border-royal-rule hover:border-royal-lilac-deep transition-all hover:-translate-y-0.5"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-3">{p.eyebrow} · {p.chapter}</p>
                <h3 className="text-xl font-display font-bold leading-tight mb-2">{p.name}</h3>
                <p className="text-royal-lime font-serif italic text-base leading-snug mb-3">{p.tagline}</p>
                <p className="text-sm text-royal-sand-2 leading-relaxed flex-grow">{p.short}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-royal-dim group-hover:text-royal-lilac transition-colors">
                  Подробно <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 border-t border-royal-rule">
        <div className="max-w-7xl mx-auto">
          <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Как это устроено</p>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-10">
            Всё, что вы спрашиваете в первом письме
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {programsHow.map((h) => (
              <div key={h.label} className="p-6 rounded-2xl border border-royal-rule bg-royal-card/50">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-2">{h.label}</p>
                <p className="text-sm text-royal-sand-2 leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 border-t border-royal-rule">
        <div className="max-w-4xl mx-auto">
          <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Частые вопросы</p>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-10">
            Семь ответов, которые снимают половину переписки
          </h2>
          <div className="divide-y divide-royal-rule">
            {programsFaq.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none flex items-start gap-3 font-bold text-royal-sand">
                  <span className="text-royal-lilac text-xs mt-1.5 transition-transform group-open:rotate-90">▸</span>
                  {f.q}
                </summary>
                <p className="mt-3 ml-6 text-sm text-royal-sand-2 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-royal-rule bg-[radial-gradient(70%_80%_at_25%_20%,rgba(139,95,214,0.2),transparent_50%)]">
        <div className="max-w-7xl mx-auto">
          <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Следующий шаг</p>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-6">
            Напишите дату, число гостей и отель
          </h2>
          <p className="max-w-2xl text-royal-sand-2 mb-8">
            Остальное спросим сами. Если хотите сначала попробовать — проведём для вашей команды принятия решения сорокапятиминутный прогон одной станции, без обязательств.
          </p>
          <Link
            to={lp('/contact')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-royal-lilac text-royal-night font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-royal-lilac-deep hover:text-white transition-colors"
          >
            Запросить предложение <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Programs;
