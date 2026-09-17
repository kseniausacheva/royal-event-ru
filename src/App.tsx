import { useState, useEffect, lazy, Suspense } from 'react';
// Version: 1.0.3 - Lazy loaded routes
import { BrowserRouter, HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';

// VITE_PREVIEW=1 — сборка превью для статического хостинга без серверного роутинга
// (артефакт claude.ai): навигация через #, обычная сборка не затрагивается.
const Router = import.meta.env.VITE_PREVIEW ? HashRouter : BrowserRouter;
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Home from './pages/Home';
import Destination from './pages/Destination';
import CookieBanner from './components/CookieBanner';
import Footer from './components/Footer';
import { LanguageProvider, useLanguage } from './LanguageContext';

// Lazy-loaded pages — split into separate chunks
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const Delegations = lazy(() => import('./pages/Delegations'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const MailingConsent = lazy(() => import('./pages/MailingConsent'));
const DataConsent = lazy(() => import('./pages/DataConsent'));
const Offer = lazy(() => import('./pages/Offer'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Programs = lazy(() => import('./pages/Programs'));
const ProgramDetail = lazy(() => import('./pages/ProgramDetail'));
const Cruises = lazy(() => import('./pages/Cruises'));
const DMC = lazy(() => import('./pages/DMC'));
const Tickets = lazy(() => import('./pages/Tickets'));

const PageLoader = () => (
  <div className="min-h-screen bg-royal-black flex items-center justify-center">
    <div className="w-12 h-12 border-2 border-royal-pink border-t-transparent rounded-full animate-spin" />
  </div>
);

const Egypt = () => {
  const { t } = useLanguage();
  return (
    <Destination
      name={t.destinations.egypt.name}
      image="https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&q=80&w=1000"
      tagline={t.destinations.egypt.tagline}
      description={t.destinations.egypt.description}
      seo={t.destinations.egypt.seo}
    />
  );
};

const Russia = () => {
  const { t } = useLanguage();
  return (
    <Destination
      name={t.destinations.russia.name}
      image="https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&q=80&w=1000"
      tagline={t.destinations.russia.tagline}
      description={t.destinations.russia.description}
      seo={t.destinations.russia.seo}
    />
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const langPrefix = `/${language}`;

  const navLinks = [
    { name: t.nav.home, path: `${langPrefix}` },
    { name: t.nav.tickets, path: `${langPrefix}/tickets` },
    { name: t.nav.programs, path: `${langPrefix}/programmy` },
    { name: t.nav.cruises, path: `${langPrefix}/cruises` },
    { name: t.nav.dmc, path: `${langPrefix}/dmc` },
    { name: t.nav.services, path: `${langPrefix}/services` },
    { name: t.nav.portfolio, path: `${langPrefix}/portfolio` },
    { name: t.nav.delegations, path: `${langPrefix}/delegations` },
    { name: t.nav.about, path: `${langPrefix}/about` },
    { name: t.nav.blog, path: `${langPrefix}/blog` },
    { name: t.nav.contact, path: `${langPrefix}/contact` },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-royal-black/90 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to={langPrefix} className="group">
          <img src="/logo-horizontal.png" alt="La Royal Event — MICE и DMC в Египте" width="1400" height="197" className="h-7 sm:h-8 xl:h-9 w-auto shrink-0 group-hover:opacity-80 transition-opacity" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10 ml-6">
          <div className="flex gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[10px] font-bold uppercase tracking-[0.18em] whitespace-nowrap transition-all hover:text-royal-pink ${location.pathname === link.path ? 'text-royal-pink' : 'text-white/60'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-3 border-l border-white/10 pl-6 xl:pl-10">
            <button
              onClick={() => setLanguage('ru')}
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${language === 'ru' ? 'text-royal-pink' : 'text-white/40 hover:text-white'}`}
            >
              RU
            </button>
            <span className="text-white/10">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${language === 'en' ? 'text-royal-pink' : 'text-white/40 hover:text-white'}`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen
            ? (language === 'ru' ? 'Закрыть меню' : 'Close menu')
            : (language === 'ru' ? 'Открыть меню' : 'Open menu')}
          aria-expanded={isOpen}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-royal-black border-b border-white/10 p-6 lg:hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-display font-bold uppercase tracking-tight text-white hover:text-royal-pink"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex gap-4 pt-4 border-t border-white/10">
                <button onClick={() => { setLanguage('ru'); setIsOpen(false); }} className={`text-sm font-bold ${language === 'ru' ? 'text-royal-pink' : 'text-white/40'}`}>RU</button>
                <button onClick={() => { setLanguage('en'); setIsOpen(false); }} className={`text-sm font-bold ${language === 'en' ? 'text-royal-pink' : 'text-white/40'}`}>EN</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Redirect root to /ru */}
      <Route path="/" element={<Navigate to="/ru" replace />} />

      {/* Russian routes */}
      <Route path="/ru" element={<Home />} />
      <Route path="/ru/about" element={<About />} />
      <Route path="/ru/services" element={<Services />} />
      <Route path="/ru/portfolio" element={<Portfolio />} />
      <Route path="/ru/portfolio/:id" element={<CaseStudy />} />
      <Route path="/ru/egypt" element={<Egypt />} />
      <Route path="/ru/programmy" element={<Programs />} />
      <Route path="/ru/programmy/:slug" element={<ProgramDetail />} />
      <Route path="/ru/cruises" element={<Cruises />} />
      <Route path="/ru/dmc" element={<DMC />} />
      <Route path="/ru/tickets" element={<Tickets />} />
      <Route path="/ru/russia" element={<Russia />} />
      <Route path="/ru/delegations" element={<Delegations />} />
      <Route path="/ru/blog" element={<BlogPage />} />
      <Route path="/ru/blog/:id" element={<BlogPage />} />
      <Route path="/ru/contact" element={<Contact />} />
      <Route path="/ru/privacy" element={<PrivacyPolicy />} />
      <Route path="/ru/mailing-consent" element={<MailingConsent />} />
      <Route path="/ru/data-consent" element={<DataConsent />} />
      <Route path="/ru/offer" element={<Offer />} />

      {/* English routes */}
      <Route path="/en" element={<Home />} />
      <Route path="/en/about" element={<About />} />
      <Route path="/en/services" element={<Services />} />
      <Route path="/en/portfolio" element={<Portfolio />} />
      <Route path="/en/portfolio/:id" element={<CaseStudy />} />
      <Route path="/en/egypt" element={<Egypt />} />
      <Route path="/en/programmy" element={<Programs />} />
      <Route path="/en/programmy/:slug" element={<ProgramDetail />} />
      <Route path="/en/cruises" element={<Cruises />} />
      <Route path="/en/dmc" element={<DMC />} />
      <Route path="/en/tickets" element={<Tickets />} />
      <Route path="/en/russia" element={<Russia />} />
      <Route path="/en/delegations" element={<Delegations />} />
      <Route path="/en/blog" element={<BlogPage />} />
      <Route path="/en/blog/:id" element={<BlogPage />} />
      <Route path="/en/contact" element={<Contact />} />
      <Route path="/en/privacy" element={<PrivacyPolicy />} />
      <Route path="/en/mailing-consent" element={<MailingConsent />} />
      <Route path="/en/data-consent" element={<DataConsent />} />
      <Route path="/en/offer" element={<Offer />} />

      {/* 404. Catch-all тоже рендерит NotFound, а не Navigate на главную:
          Apache отдаёт /404.html на любом несуществующем пути (ErrorDocument),
          и клиентский рендер обязан совпасть с этой разметкой — иначе #418
          при гидратации и странный автопереброс посетителя с опечатанного URL */}
      <Route path="/ru/*" element={<NotFound />} />
      <Route path="/en/*" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
  );
};

// Экспортируется отдельно от роутера: клиент оборачивает в BrowserRouter (ниже),
// а SSG-рендер (src/entry-server.tsx) — в StaticRouter с URL страницы.
export const AppContent = () => {
  return (
    <LanguageProvider>
      <Navbar />
      <div className="min-h-screen flex flex-col relative">
        <div className="flex-grow">
          <AppRoutes />
        </div>
        <Footer />
      </div>
      <CookieBanner />
    </LanguageProvider>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
