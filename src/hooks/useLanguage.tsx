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
    'hero.location': '서울특별시',
    'hero.email': 'Email',
    'hero.linkedin': 'View Profile',
    'hero.github': 'View Projects',
    'hero.resume': 'Download PDF',
    'hero.intro': '소개',
    'hero.metrics': '주요 성과',

    // Metrics
    'metric.etl': 'EMR ETL 처리 시간 단축 (15분 → 2분)',
    'metric.search': '검색 API 응답 시간 최적화',
    'metric.migration': '400만 건 데이터 마이그레이션 (3초 처리)',
    'metric.notice': '채권 공지 누락률 감소',

    // Sections
    'section.experience': 'Work Experience',
    'section.projects': 'Projects',
    'section.skills': 'Skills',
    
    // Projects
    'projects.viewGithub': 'View on GitHub',
    
    // Footer
    'footer.rights': '이규락. All rights reserved.',
    'footer.top': '맨 위로',
    
    // Languages
    'lang.korean': '한국어',
    'lang.english': 'English',
    
    // Experience
    'exp.aitrics2026.desc': '• Go 레거시 시스템을 Python으로 전환\n\n• 보안 강화를 위해 암호화 방식을 AES-128-CBC에서 AES-256-CBC로 전환\n\n• Python 모노레포 의존성 관리를 위한 uv workspace 도입 주도\n\n• 운영팀과의 협업을 위한 Jira 프로세스 수립 주도\n\n• 보안과 제품 성능을 고려한 개발을 위해 AI Agentic Workflow(Skill, Rule 등) 구축',
    'exp.nrise.desc': '• Django 레거시 시스템을 Spring Boot 기반 구조로 전환\n\n• 매출 향상을 위한 재화 가격 A/B 테스트 실행\n\n• AI(LLM)를 활용한 유저 자동 매칭 서비스 개발\n\n• A/B 테스트 배정 편향을 줄이기 위한 hash·salt 기반 버킷팅 공통 모듈 개발\n\n• WebRTC 기반 실시간 통신 기능 PoC 진행',
    'exp.aitricsFde.desc': '• EMR ETL 파이프라인 성능 최적화 (15분 → 2분, -86%)\n\n• 멀티 병원 스키마 Adapter Layer 추상화로 신규 연동 리드타임 단축\n\n• 고객사 전산실과의 원활한 협업을 위한 워크플로우 개선 및 현장 대응',
    'exp.aitricsBe.desc': '• 의료 AI 제품의 백엔드 기능 개발 및 운영\n\n• 고객사 수요가 높은 스코어 전송 기능을 위한 신규 프레임워크 개발\n\n• 제품 요구사항에 맞춘 API 및 데이터 처리 로직 유지보수\n\n• 구성원의 원활한 커뮤니케이션을 위한 Slack 메신저 워크플로우 TFT 참여',
    'exp.8percent.desc': '• 검색 API 성능 최적화 (8초 → ~1초, 비용 절감)\n\n• 채권 공지 발송 안정화 (공지 누락률 1/10 감소)\n\n• 이벤트 처리 아키텍처 고도화 및 확장성 확보',
    'exp.qualson.desc': '• Spring → Django 마이그레이션 및 API 표준화\n\n• 대규모 데이터 마이그레이션 (400만 건, 3초 처리)\n\n• 쿠폰 자동 알림 시스템 구축 (Webhook + Braze)',
    
    // Projects
    'proj.pykorail.title': 'pykorail',
    'proj.pykorail.desc': '코레일톡 앱 API를 감싼 비공식 Python SDK입니다. 열차 조회부터 예매·결제·환불·예약대기·취소표 감시까지 코드 몇 줄로 다룰 수 있고, PyPI로 배포하고 있습니다.\n\n동기 Korail과 비동기 AsyncKorail이 같은 리소스와 시그니처를 공유하도록 설계했고, 환승 예매는 두 구간을 하나의 예약번호로 묶어 한 구간만 잡히는 부분 예약이 생기지 않게 했습니다. 코레일 서버가 TLS 지문을 확인하기 때문에 curl_cffi를 기본 HTTP 클라이언트로 쓰고, 역 이름 오타나 지난 시각 같은 잘못된 요청은 서버로 보내기 전에 막습니다.',
    'proj.mysql-gcm.title': 'mysql-gcm',
    'proj.mysql-gcm.desc': 'MySQL 8.0 이상에 인증 암호화(AES-GCM)를 서버 컴포넌트로 추가하는 오픈소스입니다. 암호화한 한국어 컬럼에서도 부분 일치 검색(LIKE)을 하기 위해 만들었습니다.\n\n복호화 결과를 utf8mb4 문자열로 돌려줘 암호화된 컬럼의 LIKE 검색이 MySQL 콜레이션 그대로 서버 안에서 실행되고, 조인·UNIQUE용 결정적 암호화와 기존 CBC 데이터 이관을 위한 이중 읽기를 지원합니다. 30만 행 서버 측 LIKE 필터링에서 p95가 AES_DECRYPT 대비 0.75~0.96배였고, NIST 테스트 벡터와 6,493개 단위 테스트, MySQL 8.0·8.4·9.x 통합 테스트로 동작을 검증했습니다.',
    'proj.syncintosh.title': 'syncintosh',
    'proj.syncintosh.desc': '여러 대의 Mac에서 쉘·IDE·Docker 같은 개발 환경 설정을 맞춰주는 CLI입니다. 현재 초기 단계로 개발하고 있습니다.\n\n설정은 종단간 암호화된 git 저장소로 동기화해 서버에는 파일 내용뿐 아니라 경로와 디렉터리 구조까지 암호문으로만 남고, 충돌은 파일 형식을 이해하는 3-way merge와 선택적인 LLM 보조로 해결하도록 설계했습니다. 지금은 충돌 해결의 기반이 되는 키 단위 병합 엔진을 구현하고 있습니다.',
    'proj.hipchapedia.title': '힙챠피디아',
    'proj.hipchapedia.desc': '다양한 음악 장르의 가사 의미와 맥락을 AI로 분석해주는 서비스입니다.\n\nKotlin과 Spring Boot 기반 서비스에 Clean Architecture를 적용해 구조적 유지보수성을 확보했고, Python과 Redis로 곡 제목 기반 가사 검색 모듈을 개발하며 Pub/Sub 아키텍처로 검색 처리 흐름을 설계했습니다.'
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
    'hero.location': 'Seoul, Korea',
    'hero.email': 'Email',
    'hero.linkedin': 'View Profile',
    'hero.github': 'View Projects',
    'hero.resume': 'Download PDF',
    'hero.intro': 'About',
    'hero.metrics': 'Key results',

    // Metrics
    'metric.etl': 'EMR ETL processing time cut (15min → 2min)',
    'metric.search': 'Search API response time optimized',
    'metric.migration': '4M-record data migration (3-second processing)',
    'metric.notice': 'Bond notification miss rate reduced',

    // Sections
    'section.experience': 'Work Experience',
    'section.projects': 'Projects', 
    'section.skills': 'Skills',
    
    // Projects
    'projects.viewGithub': 'View on GitHub',
    
    // Footer
    'footer.rights': 'Gyurak Lee. All rights reserved.',
    'footer.top': 'Back to top',
    
    // Languages
    'lang.korean': '한국어',
    'lang.english': 'English',
    
    // Experience
    'exp.aitrics2026.desc': '• Migrated a Go legacy system to Python\n\n• Upgraded encryption from AES-128-CBC to AES-256-CBC to strengthen security\n\n• Led the adoption of uv workspace to manage dependencies in a Python monorepo\n\n• Led the setup of a Jira process for collaboration with the operations team\n\n• Built an AI agentic workflow (skills, rules, etc.) for development that accounts for security and product performance',
    'exp.nrise.desc': '• Migrated a Django legacy system to a Spring Boot-based architecture\n\n• Ran A/B tests on in-app pricing to improve revenue\n\n• Built an AI (LLM)-powered user auto-matching service\n\n• Built a shared hash- and salt-based bucketing module to reduce assignment bias in A/B tests\n\n• Ran a proof of concept for WebRTC-based real-time communication',
    'exp.aitricsFde.desc': '• Optimized EMR ETL pipeline performance (15min → 2min, -86%)\n\n• Abstracted multi-hospital schema with Adapter Layer to reduce new integration lead time\n\n• Improved workflows and handled on-site issues to enable smoother collaboration with client IT teams',
    'exp.aitricsBe.desc': '• Developed and operated backend features for an AI healthcare product\n\n• Built a new framework for score delivery features with strong client demand\n\n• Maintained API and data processing logic based on evolving product requirements\n\n• Participated in a Slack messenger workflow TFT to improve internal communication',
    'exp.8percent.desc': '• Optimized search API performance (8s → ~1s, cost reduction)\n\n• Stabilized bond notification delivery (notification miss rate reduced by 1/10)\n\n• Enhanced event processing architecture and secured scalability',
    'exp.qualson.desc': '• Migrated from Spring to Django and standardized APIs\n\n• Large-scale data migration (4M records, 3-second processing)\n\n• Built automated coupon notification system (Webhook + Braze)',
    
    // Projects
    'proj.pykorail.title': 'pykorail',
    'proj.pykorail.desc': 'An unofficial Python SDK wrapping the Korail Talk app API. Train search, booking, payment, refunds, waitlists, and watching for cancelled tickets take only a few lines of code, and it is published on PyPI.\n\nThe synchronous Korail and asynchronous AsyncKorail clients share the same resources and signatures, and transfer bookings bind both legs under a single reservation number so a booking with only one leg secured never happens. Because Korail checks TLS fingerprints, curl_cffi is the default HTTP client, and invalid requests such as misspelled station names or past departure times are rejected before they reach the server.',
    'proj.mysql-gcm.title': 'mysql-gcm',
    'proj.mysql-gcm.desc': 'An open-source MySQL server component that adds authenticated AES-GCM encryption to MySQL 8.0 and later, built so that encrypted Korean columns can still be searched with partial matches (LIKE).\n\nDecrypted values come back as utf8mb4 strings, so LIKE on an encrypted column runs inside the server with MySQL\'s own collation. It also offers deterministic encryption for joins and UNIQUE, plus dual-read of legacy CBC data for migration. Server-side LIKE filtering over 300,000 rows measured a p95 of 0.75–0.96× AES_DECRYPT, and behavior is verified with NIST test vectors, 6,493 unit cases, and integration tests on MySQL 8.0, 8.4, and 9.x.',
    'proj.syncintosh.title': 'syncintosh',
    'proj.syncintosh.desc': 'A CLI that keeps developer-environment settings such as shell, IDE, and Docker in step across multiple Macs. It is currently in an early stage.\n\nSettings sync through an end-to-end encrypted git repository, so the server only ever sees ciphertext: not just file contents but paths and directory structure too. Conflicts are designed to be resolved with a format-aware 3-way merge plus optional LLM assistance. The current work is the key-level merge engine the conflict resolver is built on.',
    'proj.hipchapedia.title': 'Hipchapedia',
    'proj.hipchapedia.desc': 'A service that uses AI to analyze the meaning and context of lyrics across various music genres.\n\nIt applies Clean Architecture on a Kotlin and Spring Boot stack for long-term maintainability, and includes a Python and Redis-based lyric search module by song title designed with a Pub/Sub architecture.'
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
