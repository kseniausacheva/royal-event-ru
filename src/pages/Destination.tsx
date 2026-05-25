import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useLocalizedPath } from '../hooks/useLocalizedPath';
import { MapPin, Star, Users, Briefcase, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

interface DestinationProps {
  name: string;
  image: string;
  tagline: string;
  description: string;
  seo?: {
    title: string;
    description: string;
  };
}

const Destination: React.FC<DestinationProps> = ({ name, image, tagline, description, seo }) => {
  const { t, language } = useLanguage();
  const lp = useLocalizedPath();

  const stats = [
    { icon: Briefcase, label: t.destinations.stats.events, value: '500+' },
    { icon: Users, label: t.destinations.stats.guests, value: '50k+' },
    { icon: Star, label: t.destinations.stats.rating, value: '4.9/5' },
    { icon: MapPin, label: t.destinations.stats.venues, value: '100+' }
  ];

  return (
    <div className="min-h-screen bg-royal-black text-white pt-32 px-6">
      <SEO 
        title={seo?.title || name} 
        description={seo?.description || description} 
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <span className="text-royal-pink font-bold text-xs uppercase tracking-[0.4em] mb-4 block">
            {tagline}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none break-words">
            {name}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
          <div className="aspect-[16/10] rounded-[40px] overflow-hidden border border-white/10">
            <img
              src={image}
              alt={language === 'ru' ? `MICE-мероприятия в ${name} — Royal Event Group` : `MICE events in ${name} — Royal Event Group`}
              loading="lazy"
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-2xl text-white/60 font-light leading-relaxed mb-12">
              {description}
            </p>
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10">
                  <stat.icon className="w-8 h-8 text-royal-pink mb-4" />
                  <div className="text-3xl font-display font-bold uppercase mb-1">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related links — внутренняя перелинковка для SEO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          <Link
            to={lp('/services')}
            className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-royal-pink/50 hover:bg-white/[0.07] transition-all"
          >
            <ArrowRight className="w-5 h-5 text-royal-pink mb-3 group-hover:translate-x-1 transition-transform" />
            <h3 className="text-xl font-display font-bold uppercase mb-2 group-hover:text-royal-pink transition-colors">
              {language === 'ru' ? 'Услуги агентства' : 'Agency Services'}
            </h3>
            <p className="text-sm text-white/40">
              {language === 'ru'
                ? 'Конференции, тимбилдинги, инсентив-туры и делегации'
                : 'Conferences, team building, incentive tours and delegations'}
            </p>
          </Link>
          <Link
            to={lp('/portfolio')}
            className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-royal-pink/50 hover:bg-white/[0.07] transition-all"
          >
            <ArrowRight className="w-5 h-5 text-royal-pink mb-3 group-hover:translate-x-1 transition-transform" />
            <h3 className="text-xl font-display font-bold uppercase mb-2 group-hover:text-royal-pink transition-colors">
              {language === 'ru' ? `Наши кейсы` : 'Our Cases'}
            </h3>
            <p className="text-sm text-white/40">
              {language === 'ru'
                ? `Реальные проекты Royal Event Group — Carlsberg, NL International, AFA`
                : 'Real Royal Event Group projects — Carlsberg, NL International, AFA'}
            </p>
          </Link>
          <Link
            to={lp('/contact')}
            className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-royal-pink/50 hover:bg-white/[0.07] transition-all"
          >
            <ArrowRight className="w-5 h-5 text-royal-pink mb-3 group-hover:translate-x-1 transition-transform" />
            <h3 className="text-xl font-display font-bold uppercase mb-2 group-hover:text-royal-pink transition-colors">
              {language === 'ru' ? 'Связаться с нами' : 'Get in touch'}
            </h3>
            <p className="text-sm text-white/40">
              {language === 'ru'
                ? `Узнайте стоимость организации мероприятия в ${name}`
                : `Get a quote for an event in ${name}`}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Destination;
