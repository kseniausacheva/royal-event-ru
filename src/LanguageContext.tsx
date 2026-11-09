import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { translations } from './translations';
import { localizePath } from './content/blog-slugs.mjs';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.ru;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine language from URL
  const getLangFromPath = (pathname: string): Language => {
    if (pathname.startsWith('/en')) return 'en';
    return 'ru';
  };

  // Язык берём прямо из адреса, а не из state, обновляемого в эффекте: иначе
  // первый рендер после смены адреса шёл со старым языком (например, /ru/blog/{id}
  // рендерился как EN-страница и уводил по редиректу старого EN-адреса обратно).
  const language: Language = getLangFromPath(location.pathname);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Redirect root "/" to "/ru"
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/ru', { replace: true });
    }
  }, [location.pathname, navigate]);

  const setLanguage = (lang: Language) => {
    // localizePath знает слаги статей: /ru/blog/{id} ↔ /en/blog/{en.slug}
    navigate(localizePath(location.pathname, lang));
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Язык без требования провайдера: для мелких общих компонентов (лайтбокс),
 * которые рендерятся и в тестах без LanguageProvider. Вне провайдера — 'ru'.
 */
export const useLanguageOrRu = (): Language => useContext(LanguageContext)?.language ?? 'ru';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
