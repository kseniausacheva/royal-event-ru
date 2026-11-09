import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import SEO from '../components/SEO';
import PyramidDiagram from '../components/PyramidDiagram';
import { useLanguage } from '../LanguageContext';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { useLaRoyalContent } from '../content/useLaRoyalContent';

// Подписи страницы DMC: SEO, герой, ярлыки секций, CTA.
// Русские строки — эталон; английские подставляются на EN-сайте.
const UI_RU = {
  seoTitle: 'DMC в Египте: принимающая компания для мероприятий',
  seoDescription: 'DMC-компания в Египте: команда в Каире и Шарм-эль-Шейхе, прямые контракты с отелями и судовладельцами, пермиты, приватный доступ к пирамидам Гизы.',
  seoKeywords: 'DMC Египет, DMC Egypt, приватный доступ к пирамидам, VIP Гиза, ground handling Египет, La Royal Event',
  backHome: 'Назад на главную',
  heroEyebrow: 'DMC Египет',
  heroTitle: 'Команда на месте — от аэропорта до последнего трансфера',
  servicesLabel: 'Что входит в DMC',
  exclusiveEyebrow: 'Эксклюзив',
  privateTitle: 'Приватный доступ к пирамидам Гизы',
  privateLead: 'Плато Гизы — только для вашей группы. Без других туристов. Камеры, закрытые для публики, открываются специально для вас.',
  standardEntry: 'Стандартный вход',
  privateEntry: 'Приватный доступ · La Royal Event',
  whatLabel: 'Что вы получаете',
  formatLabel: 'Формат',
  diagramLabel: 'Куда вы попадёте внутри Великой пирамиды',
  includedLabel: 'Включено',
  notIncludedLabel: 'Не включено',
  ctaEyebrow: 'Следующий шаг',
  ctaTitle: 'Расскажите о вашей группе',
  ctaLead: 'Даты, число гостей, что уже есть в программе. Вернёмся с предложением в тот же день.',
  ctaButton: 'Запросить предложение',
} as const;

const UI_EN: Record<keyof typeof UI_RU, string> = {
  seoTitle: 'DMC in Egypt: Ground Handling Partner for Corporate Events',
  seoDescription: 'DMC in Egypt: teams in Cairo and Sharm El Sheikh, direct contracts with hotels and ship owners, permits, and private access to the Pyramids of Giza.',
  seoKeywords: 'DMC Egypt, destination management company Egypt, private access to the pyramids, VIP Giza, ground handling Egypt, La Royal Event',
  backHome: 'Back to home',
  heroEyebrow: 'DMC Egypt',
  heroTitle: 'A team on the ground, from the airport to the last transfer',
  servicesLabel: 'What DMC Covers',
  exclusiveEyebrow: 'Exclusive',
  privateTitle: 'Private Access to the Pyramids of Giza',
  privateLead: 'The Giza Plateau for your group alone. No other visitors. Chambers closed to the public open just for you.',
  standardEntry: 'Standard Entry',
  privateEntry: 'Private Access · La Royal Event',
  whatLabel: 'What You Get',
  formatLabel: 'Format',
  diagramLabel: 'Where You Go Inside the Great Pyramid',
  includedLabel: 'Included',
  notIncludedLabel: 'Not Included',
  ctaEyebrow: 'Next Step',
  ctaTitle: 'Tell Us About Your Group',
  ctaLead: 'Dates, headcount, what is already on the program. We come back with a proposal the same day.',
  ctaButton: 'Request a Proposal',
};

const UI = { ru: UI_RU, en: UI_EN };

const AccessRow: React.FC<{ ok: boolean; label: string }> = ({ ok, label }) => (
  <div className="flex items-center gap-3 text-sm py-1.5">
    {ok
      ? <Check className="w-4 h-4 text-emerald-400 shrink-0" />
      : <X className="w-4 h-4 text-red-400 shrink-0" />}
    <span className={ok ? 'text-royal-sand' : 'text-royal-dim'}>{label}</span>
  </div>
);

const DMC = () => {
  const { dmc, privateAccess } = useLaRoyalContent();
  const lp = useLocalizedPath();
  const { language } = useLanguage();
  const u = UI[language];

  return (
    <div className="min-h-screen bg-royal-night text-royal-sand font-manrope">
      <SEO
        title={u.seoTitle}
        description={u.seoDescription}
        keywords={u.seoKeywords}
      />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(60%_60%_at_80%_20%,rgba(139,95,214,0.28),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <Link to={lp('/')} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-royal-dim hover:text-royal-lilac transition-colors">
              <ArrowLeft className="w-3 h-3" /> {u.backHome}
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-5">{u.heroEyebrow}</p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter mb-6 uppercase leading-[0.95]">
              {u.heroTitle}
            </h1>
            <div className="w-24 h-1.5 bg-royal-lilac mb-8" />
          </motion.div>
        </div>
      </section>

      {/* DMC content */}
      <section className="py-16 px-6 border-t border-royal-rule">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7 space-y-5">
            {dmc.intro.map((para, i) => (
              <p key={i} className={i === 0 ? 'text-lg text-royal-sand leading-relaxed' : 'text-royal-sand-2 leading-relaxed'}>{para}</p>
            ))}
          </div>
          <aside className="lg:col-span-5 lg:border-l lg:border-royal-rule lg:pl-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-4">{u.servicesLabel}</p>
            <ul>
              {dmc.services.map((s, i) => (
                <li key={i} className="relative py-2.5 pl-6 border-b border-royal-rule text-sm text-royal-sand-2">
                  <span className="absolute left-0 top-2.5 text-royal-lilac-deep">→</span>
                  {s}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Private access */}
      <section id="private-access" className="py-20 px-6 border-t border-royal-rule relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_70%_30%,rgba(207,230,79,0.06),transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">{u.exclusiveEyebrow}</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tighter mb-4">
            {u.privateTitle}
          </h2>
          <p className="max-w-2xl text-lg text-royal-sand-2 mb-10">
            {u.privateLead}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="p-6 rounded-2xl border border-royal-rule bg-royal-card">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-dim mb-3">{u.standardEntry}</p>
              {privateAccess.standard.map((r) => <AccessRow key={r.label} ok={r.ok} label={r.label} />)}
              <p className="text-xs text-royal-dim mt-4 pt-3 border-t border-royal-rule">{privateAccess.standardNote}</p>
            </div>
            <div className="p-6 rounded-2xl border border-royal-lilac/35 bg-gradient-to-b from-royal-lilac-deep/10 to-royal-lilac-deep/[0.03]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-3">{u.privateEntry}</p>
              {privateAccess.private.map((r) => <AccessRow key={r.label} ok={r.ok} label={r.label} />)}
              <p className="text-xs text-royal-lilac mt-4 pt-3 border-t border-royal-lilac/20">{privateAccess.privateNote}</p>
            </div>
          </div>

          <div className="p-7 rounded-2xl border border-royal-rule bg-royal-card grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-2">{u.whatLabel}</p>
              <p className="text-sm text-royal-sand-2 leading-relaxed">{privateAccess.what}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-2">{u.formatLabel}</p>
              <p className="text-sm text-royal-sand-2 leading-relaxed">{privateAccess.format}</p>
            </div>
          </div>

          {/* Схема пирамиды */}
          <div className="p-7 rounded-2xl border border-royal-rule bg-royal-card mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-4">{u.diagramLabel}</p>
            <PyramidDiagram className="max-w-4xl" />
          </div>

          {/* Два формата дня */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {privateAccess.slots.map((slot) => (
              <div key={slot.name} className="p-7 rounded-2xl border border-royal-rule bg-royal-card">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lime mb-1">{slot.when}</p>
                <h3 className="text-xl font-display font-bold mb-4">{slot.name}</h3>
                <ol className="space-y-2.5">
                  {slot.steps.map((st, i) => (
                    <li key={st} className="flex gap-3 text-sm text-royal-sand-2">
                      <span className="shrink-0 w-5 h-5 rounded-full border border-royal-rule text-[10px] font-bold flex items-center justify-center text-royal-lilac">{i + 1}</span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="p-7 rounded-2xl border border-royal-rule bg-royal-card grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-lilac mb-3">{u.includedLabel}</p>
              <ul className="space-y-1.5">
                {privateAccess.included.map((x) => <li key={x} className="flex gap-2 text-sm text-royal-sand-2"><Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />{x}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-dim mb-3">{u.notIncludedLabel}</p>
              <ul className="space-y-1.5">
                {privateAccess.notIncluded.map((x) => <li key={x} className="flex gap-2 text-sm text-royal-dim"><X className="w-4 h-4 mt-0.5 shrink-0" />{x}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-royal-rule bg-[radial-gradient(70%_80%_at_25%_20%,rgba(139,95,214,0.2),transparent_50%)]">
        <div className="max-w-7xl mx-auto">
          <p className="text-royal-lime text-[10px] font-bold uppercase tracking-[0.25em] mb-4">{u.ctaEyebrow}</p>
          <h2 className="text-2xl sm:text-4xl font-display font-black uppercase tracking-tighter mb-6">{u.ctaTitle}</h2>
          <p className="max-w-2xl text-royal-sand-2 mb-8">{u.ctaLead}</p>
          <Link to={lp('/contact')} className="inline-flex items-center gap-3 px-8 py-4 bg-royal-lilac text-royal-night font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-royal-lilac-deep hover:text-white transition-colors">
            {u.ctaButton} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DMC;
