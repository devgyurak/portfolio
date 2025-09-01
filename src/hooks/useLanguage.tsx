import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ko: {
    // Navigation
    'nav.experience': 'Experience',
    'nav.projects': 'Projects', 
    'nav.skills': 'Skills',
    
    // Hero Section
    'hero.title': 'Software Engineer |\nBackend Development',
    'hero.description': '4년 경력의 백엔드 엔지니어로, RDBMS 성능 최적화와 안정적인 데이터 파이프라인 운영에 강점을 보유하고 있습니다.\n\nETL 처리 시간을 86% 단축하고, Adapter Pattern으로 다수 스키마를 추상화한 경험이 있습니다. 사이드 프로젝트에서는 로컬 LLM 서빙과 Clean Architecture를 실서비스에 적용하며 빠른 학습력을 입증했습니다.',
    'hero.mobileDescription': '4년 경력의 백엔드 엔지니어로, RDBMS 성능 최적화와\n안정적인 데이터 파이프라인 운영에 강점을 보유하고 있습니다.\n\nETL 처리 시간을 86% 단축하고,\nAdapter Pattern으로 다수 스키마를 추상화한 경험이 있습니다.\n사이드 프로젝트에서는 로컬 LLM 서빙과\nClean Architecture를 실서비스에 적용하며\n빠른 학습력을 입증했습니다.',
    'hero.status': 'Available for work',
    'hero.email': 'Email',
    'hero.linkedin': 'View Profile',
    'hero.github': 'View Projects',
    'hero.resume': 'Download PDF',
    
    // Sections
    'section.experience': 'Work Experience',
    'section.projects': 'Projects',
    'section.skills': 'Skills',
    
    // Projects
    'projects.viewGithub': 'View on GitHub',
    
    // Footer
    'footer.rights': '이규락. All rights reserved.',
    
    // Languages
    'lang.korean': '한국어',
    'lang.english': 'English'
  },
  en: {
    // Navigation
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    
    // Hero Section
    'hero.title': 'Software Engineer |\nBackend Development',
    'hero.description': 'A backend engineer with 4 years of experience, specializing in RDBMS performance optimization and stable data pipeline operations.\n\nReduced ETL processing time by 86% and abstracted multiple schemas using the Adapter Pattern. Demonstrated rapid learning ability by applying local LLM serving and Clean Architecture to production services in side projects.',
    'hero.mobileDescription': 'A backend engineer with 4 years of experience,\nspecializing in RDBMS performance optimization\nand stable data pipeline operations.\n\nReduced ETL processing time by 86% and\nabstracted multiple schemas using the Adapter Pattern.\nDemonstrated rapid learning ability by applying\nlocal LLM serving and Clean Architecture to\nproduction services in side projects.',
    'hero.status': 'Available for work',
    'hero.email': 'Email',
    'hero.linkedin': 'View Profile', 
    'hero.github': 'View Projects',
    'hero.resume': 'Download PDF',
    
    // Sections
    'section.experience': 'Work Experience',
    'section.projects': 'Projects', 
    'section.skills': 'Skills',
    
    // Projects
    'projects.viewGithub': 'View on GitHub',
    
    // Footer
    'footer.rights': 'Gyurak Lee. All rights reserved.',
    
    // Languages
    'lang.korean': '한국어',
    'lang.english': 'English'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ko');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language') as Language;
    if (savedLanguage && (savedLanguage === 'ko' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};