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
    'hero.description': '4년 경력의 소프트웨어 엔지니어로, 고객의 요구를 듣고 비즈니스 목표와 운영 안정성을 함께 고려해 제품을 개선하는 개발에 강점을 보유하고 있습니다.\n\n의료 AI 제품을 고객사 환경에 안정적으로 적용하기 위해 ETL 처리 시간을 86% 단축하고, Adapter Pattern으로 다수 병원 스키마를 추상화하며 Forward Deployment 관점의 현장 연동과 운영 대응을 경험했습니다. 사이드 프로젝트에서는 AI Agent 팀을 구성해 개발 생산성과 아이디어 다각화 및 고도화를 시도하여, AX Engineering 역량을 확장하고 있습니다.',
    'hero.mobileDescription': '4년 경력의 소프트웨어 엔지니어로,\n고객의 요구를 듣고 비즈니스 목표와\n운영 안정성을 함께 고려해 제품을 개선하는\n개발에 강점을 보유하고 있습니다.\n\n의료 AI 제품을 고객사 환경에 안정적으로 적용하기 위해\nETL 처리 시간을 86% 단축하고,\nAdapter Pattern으로 다수 병원 스키마를 추상화하며\nForward Deployment 관점의 현장 연동과\n운영 대응을 경험했습니다.\n\n사이드 프로젝트에서는 AI Agent 팀을 구성해\n개발 생산성과 아이디어 다각화 및 고도화를 시도하여,\nAX Engineering 역량을 확장하고 있습니다.',
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
    'exp.nrise.desc': '• Django 레거시 시스템을 Spring Boot 기반 구조로 전환\n\n• 매출 향상을 위한 재화 가격 A/B 테스트 실행\n\n• AI(LLM)를 활용한 유저 자동 매칭 서비스 개발',
    'exp.aitricsFde.desc': '• EMR ETL 파이프라인 성능 최적화 (15분 → 2분, -86%)\n\n• 멀티 병원 스키마 Adapter Layer 추상화로 신규 연동 리드타임 단축\n\n• 고객사 전산실과의 원활한 협업을 위한 워크플로우 개선 및 현장 대응',
    'exp.aitricsBe.desc': '• 의료 AI 제품의 백엔드 기능 개발 및 운영\n\n• 고객사 수요가 높은 스코어 전송 기능을 위한 신규 프레임워크 개발\n\n• 제품 요구사항에 맞춘 API 및 데이터 처리 로직 유지보수\n\n• 구성원의 원활한 커뮤니케이션을 위한 Slack 메신저 워크플로우 TFT 참여',
    'exp.8percent.desc': '• 검색 API 성능 최적화 (8초 → ~1초, 비용 절감)\n\n• 채권 공지 발송 안정화 (공지 누락률 1/10 감소)\n\n• 이벤트 처리 아키텍처 고도화 및 확장성 확보',
    'exp.qualson.desc': '• Spring → Django 마이그레이션 및 API 표준화\n\n• 대규모 데이터 마이그레이션 (400만 건, 3초 처리)\n\n• 쿠폰 자동 알림 시스템 구축 (Webhook + Braze)',
    
    // Projects
    'proj.taree.title': '타리',
    'proj.taree.desc': '무료로 타로를 볼 수 있도록 설계한 서비스입니다.\n\nvLLM 기반 로컬 모델 서빙과 Colab 환경에서의 오픈소스 모델 파인튜닝을 적용해 응답 품질을 높였고, AI Agent Team을 운영하며 개발 생산성과 아이디어 고도화를 AX Engineering 방식으로 실험했습니다.',
    'proj.hipchapedia.title': '힙챠피디아',
    'proj.hipchapedia.desc': '다양한 음악 장르의 가사 의미와 맥락을 AI로 분석해주는 서비스입니다.\n\nKotlin과 Spring Boot 기반 서비스에 Clean Architecture를 적용해 구조적 유지보수성을 확보했고, Python과 Redis로 곡 제목 기반 가사 검색 모듈을 개발하며 Pub/Sub 아키텍처로 검색 처리 흐름을 설계했습니다.',
    'proj.myunsejujeom.title': '면세점주',
    'proj.myunsejujeom.desc': '숭실대학교 대학 축제 야간주점에서 온라인 주문과 결제를 활용하기 어려운 현장을 개선하기 위해 만든 서비스입니다.\n\nPython과 Django 기반으로 주문 흐름을 빠르게 구현하고, MySQL, Nginx, Clean Architecture를 적용해 행사 운영에 필요한 안정성과 유지보수성을 확보했습니다.'
  },
  en: {
    // Navigation
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    
    // Hero Section
    'hero.title': 'Software Engineer |\nBackend Development',
    'hero.description': 'With 4 years of experience as a software engineer, I excel at improving products by listening to customer needs while balancing business goals and operational stability.\n\nTo deploy an AI healthcare product reliably in client environments, I reduced ETL processing time by 86% and abstracted multiple hospital schemas with the Adapter Pattern, gaining hands-on experience in field integration and operational response from a Forward Deployment perspective. In side projects, I formed an AI Agent team to explore ways to improve development productivity and diversify and refine ideas, expanding my AX Engineering capabilities.',
    'hero.mobileDescription': 'With 4 years of experience as a software engineer,\nI excel at improving products by listening to customer needs\nwhile balancing business goals and operational stability.\n\nTo deploy an AI healthcare product reliably\nin client environments, I reduced ETL processing time by 86%\nand abstracted multiple hospital schemas with the Adapter Pattern,\ngaining hands-on experience in field integration\nand operational response from a Forward Deployment perspective.\n\nIn side projects, I formed an AI Agent team\nto explore ways to improve development productivity\nand diversify and refine ideas,\nexpanding my AX Engineering capabilities.',
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
    'exp.nrise.desc': '• Migrated a Django legacy system to a Spring Boot-based architecture\n\n• Ran A/B tests on in-app pricing to improve revenue\n\n• Built an AI (LLM)-powered user auto-matching service',
    'exp.aitricsFde.desc': '• Optimized EMR ETL pipeline performance (15min → 2min, -86%)\n\n• Abstracted multi-hospital schema with Adapter Layer to reduce new integration lead time\n\n• Improved workflows and handled on-site issues to enable smoother collaboration with client IT teams',
    'exp.aitricsBe.desc': '• Developed and operated backend features for an AI healthcare product\n\n• Built a new framework for score delivery features with strong client demand\n\n• Maintained API and data processing logic based on evolving product requirements\n\n• Participated in a Slack messenger workflow TFT to improve internal communication',
    'exp.8percent.desc': '• Optimized search API performance (8s → ~1s, cost reduction)\n\n• Stabilized bond notification delivery (notification miss rate reduced by 1/10)\n\n• Enhanced event processing architecture and secured scalability',
    'exp.qualson.desc': '• Migrated from Spring to Django and standardized APIs\n\n• Large-scale data migration (4M records, 3-second processing)\n\n• Built automated coupon notification system (Webhook + Braze)',
    
    // Projects
    'proj.taree.title': 'Taree',
    'proj.taree.desc': 'A service designed to provide free tarot readings.\n\nIt improves response quality through vLLM-based local model serving and open-source model fine-tuning in Colab, while an AI Agent Team was organized to experiment with AX Engineering around development productivity and idea refinement.',
    'proj.hipchapedia.title': 'Hipchapedia',
    'proj.hipchapedia.desc': 'A service that uses AI to analyze the meaning and context of lyrics across various music genres.\n\nIt applies Clean Architecture on a Kotlin and Spring Boot stack for long-term maintainability, and includes a Python and Redis-based lyric search module by song title designed with a Pub/Sub architecture.',
    'proj.myunsejujeom.title': 'Myunsejeomju',
    'proj.myunsejujeom.desc': 'A service built to improve on-site operations at a university festival night bar where standard online ordering and payment flows were difficult to use.\n\nIt quickly implemented the ordering flow with Python and Django, while applying MySQL, Nginx, and Clean Architecture to secure the stability and maintainability needed for event operations.'
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
