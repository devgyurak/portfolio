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
    'lang.english': 'English',
    
    // Experience
    'exp.aitrics.desc': '• EMR ETL 파이프라인 성능 최적화 (15분 → 2분, -86%)\n\n• 멀티 병원 스키마 Adapter Layer 추상화로 신규 연동 리드타임 단축\n\n• Slack 워크플로우 표준화로 협업 비용 절감',
    'exp.8percent.desc': '• 검색 API 성능 최적화 (8초 → ~1초, 비용 절감)\n\n• 채권 공지 발송 안정화 (공지 누락률 1/10 감소)\n\n• 이벤트 처리 아키텍처 고도화 및 확장성 확보',
    'exp.qualson.desc': '• Spring → Django 마이그레이션 및 API 표준화\n\n• 대규모 데이터 마이그레이션 (400만 건, 3초 처리)\n\n• 쿠폰 자동 알림 시스템 구축 (Webhook + Braze)',
    
    // Projects
    'proj.jurot.title': '주로',
    'proj.jurot.desc': "'미래를 보는데 돈은 필요 없다'라는 신념하에 시작한 프로젝트로, LLM을 활용해 사주, 타로 등 각종 운세를 무료로 제공하는 서비스입니다.\n\nKotlin/Spring Boot, MySQL, Redis 등의 기술 사용 및 Clean Architecture 적용으로 유지보수성을 확보했습니다.",
    'proj.myunsejujeom.title': '면세점주',
    'proj.myunsejujeom.desc': '숭실대학교 대학 축제 야간주점에서 온라인 주문/결제 시스템을 활용할 수 없는 문제를 개선하기 위해 시작한 프로젝트입니다.\n\nPython/Django, MySQL, Nginx 등의 기술 사용 및 Clean Architecture 적용으로 유지보수성을 확보했습니다.'
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
    'lang.english': 'English',
    
    // Experience
    'exp.aitrics.desc': '• Optimized EMR ETL pipeline performance (15min → 2min, -86%)\n\n• Abstracted multi-hospital schema with Adapter Layer to reduce new integration lead time\n\n• Standardized Slack workflows to reduce collaboration costs',
    'exp.8percent.desc': '• Optimized search API performance (8s → ~1s, cost reduction)\n\n• Stabilized bond notification delivery (notification miss rate reduced by 1/10)\n\n• Enhanced event processing architecture and secured scalability',
    'exp.qualson.desc': '• Migrated from Spring to Django and standardized APIs\n\n• Large-scale data migration (4M records, 3-second processing)\n\n• Built automated coupon notification system (Webhook + Braze)',
    
    // Projects
    'proj.jurot.title': 'Jurot',
    'proj.jurot.desc': 'A project started with the belief that "money is not needed to see the future", providing various fortune-telling services such as Saju and Tarot for free using LLM.\n\nUsed technologies including Kotlin/Spring Boot, MySQL, Redis and applied Clean Architecture to ensure maintainability.',
    'proj.myunsejujeom.title': 'Myunsejeomju',
    'proj.myunsejujeom.desc': 'A project started to improve the problem of not being able to use online ordering/payment systems at Soongsil University festival night bar.\n\nUsed technologies including Python/Django, MySQL, Nginx and applied Clean Architecture to ensure maintainability.'
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