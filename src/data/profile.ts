export interface ProfileData {
  name: string;
  title: string;
  description: string;
  mobileDescription: string;
  avatar: string;
  location: string;
  email: string;
  linkedin?: string;
  github?: string;
  blog?: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  description?: string;
}

export interface ExperienceItem {
  slug: string;
  title?: string;
  company: string;
  period: string;
  description?: string;
  roles?: {
    slug: string;
    title: string;
    period: string;
    description: string;
  }[];
}

export interface Publication {
  title: string;
  venue: string;
  year: string;
  authors: string;
  link?: string;
}

export interface Award {
  title: string;
  organization: string;
  year: string;
  description?: string;
}

export interface Strength {
  title: string;
  description: string;
}

export interface Interest {
  title: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface HeroMetric {
  slug: string;
  value: string;
  company: string;
}

export interface PersonalLink {
  title: string;
  url: string;
  description: string;
}

export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  tags: string[];
  slug: string;
  url?: string;
  githubUrl?: string;
}

export const profileData: ProfileData = {
  name: "이규락",
  title: "Software Engineer |\nBackend Development",
  description: "끊임없이 노력하는 소프트웨어 엔지니어로, 고객의 요구를 듣고 비즈니스 목표와 운영 안정성을 함께 고려해 제품을 개선하는 개발에 강점을 보유하고 있습니다.\n\n의료 AI 제품을 고객사 환경에 안정적으로 적용하기 위해 ETL 처리 시간을 86% 단축하고, Adapter Pattern으로 다수 병원 스키마를 추상화하며 Forward Deployment 관점의 현장 연동과 운영 대응을 경험했습니다. 사이드 프로젝트에서는 AI Agent 팀을 구성해 개발 생산성과 아이디어 다각화 및 고도화를 시도하여, AX Engineering 역량을 확장하고 있습니다.",
  mobileDescription: "끊임없이 노력하는 소프트웨어 엔지니어로,\n고객의 요구를 듣고 비즈니스 목표와\n운영 안정성을 함께 고려해 제품을 개선하는\n개발에 강점을 보유하고 있습니다.\n\n의료 AI 제품을 고객사 환경에 안정적으로 적용하기 위해\nETL 처리 시간을 86% 단축하고,\nAdapter Pattern으로 다수 병원 스키마를 추상화하며\nForward Deployment 관점의 현장 연동과\n운영 대응을 경험했습니다.\n\n사이드 프로젝트에서는 AI Agent 팀을 구성해\n개발 생산성과 아이디어 다각화 및 고도화를 시도하여,\nAX Engineering 역량을 확장하고 있습니다.",
  avatar: "/profile.jpeg",
  location: "서울특별시",
  email: "dev@devgyurak.com",
  linkedin: "https://linkedin.com/in/devgyurak",
  github: "https://github.com/devgyurak",
  blog: "https://velog.io/@devgyurak"
};

export const education: EducationItem[] = [
  {
    degree: "임베디드소프트웨어학과",
    school: "대구소프트웨어마이스터고등학교",
    period: "2019.03 - 2022.02",
    description: "졸업"
  }
];

export const experience: ExperienceItem[] = [
  {
    slug: "aitrics-2026",
    title: "Backend Engineer",
    company: "AITRICS",
    period: "2026.09 - Present",
    description: "• Go 레거시 시스템을 Python으로 전환\n\n• 보안 강화를 위해 암호화 방식을 AES-128-CBC에서 AES-256-CBC로 전환\n\n• Python 모노레포 의존성 관리를 위한 uv workspace 도입 주도\n\n• 운영팀과의 협업을 위한 Jira 프로세스 수립 주도\n\n• 보안과 제품 성능을 고려한 개발을 위해 AI Agentic Workflow(Skill, Rule 등) 구축"
  },
  {
    slug: "nrise-backend",
    title: "Backend Engineer",
    company: "NRISE",
    period: "2026.03 - 2026.09",
    description: "• Django 레거시 시스템을 Spring Boot 기반 구조로 전환\n\n• 매출 향상을 위한 재화 가격 A/B 테스트 실행\n\n• AI(LLM)를 활용한 유저 자동 매칭 서비스 개발\n\n• A/B 테스트 배정 편향을 줄이기 위한 hash·salt 기반 버킷팅 공통 모듈 개발\n\n• WebRTC 기반 실시간 통신 기능 PoC 진행"
  },
  {
    slug: "aitrics",
    company: "AITRICS",
    period: "2023.08 - 2026.02",
    roles: [
      {
        slug: "aitrics-be",
        title: "Backend Engineer",
        period: "2025.01 - 2026.02",
        description: "• 의료 AI 제품의 백엔드 기능 개발 및 운영\n\n• 고객사 수요가 높은 스코어 전송 기능을 위한 신규 프레임워크 개발\n\n• 제품 요구사항에 맞춘 API 및 데이터 처리 로직 유지보수\n\n• 구성원의 원활한 커뮤니케이션을 위한 Slack 메신저 워크플로우 TFT 참여"
      },
      {
        slug: "aitrics-fde",
        title: "Forward Deployed Engineer",
        period: "2023.08 - 2024.12",
        description: "• EMR ETL 파이프라인 성능 최적화 (15분 → 2분, -86%)\n\n• 멀티 병원 스키마 Adapter Layer 추상화로 신규 연동 리드타임 단축\n\n• 고객사 전산실과의 원활한 협업을 위한 워크플로우 개선 및 현장 대응"
      }
    ]
  },
  {
    slug: "8percent-backend",
    title: "Backend Engineer",
    company: "8percent",
    period: "2023.01 - 2023.06",
    description: "• 검색 API 성능 최적화 (8초 → ~1초, 비용 절감)\n\n• 채권 공지 발송 안정화 (공지 누락률 1/10 감소)\n\n• 이벤트 처리 아키텍처 고도화 및 확장성 확보"
  },
  {
    slug: "qualson-backend",
    title: "Backend Engineer",
    company: "Qualson",
    period: "2021.07 - 2023.01",
    description: "• Spring → Django 마이그레이션 및 API 표준화\n\n• 대규모 데이터 마이그레이션 (400만 건, 3초 처리)\n\n• 쿠폰 자동 알림 시스템 구축 (Webhook + Braze)"
  }
];

// 히어로 성과 지표: experience 설명에 있는 수치만 사용합니다. 라벨은 metric.<slug> 번역 키로 렌더링됩니다.
export const heroMetrics: HeroMetric[] = [
  { slug: "etl", value: "-86%", company: "AITRICS" },
  { slug: "search", value: "8s → ~1s", company: "8percent" },
  { slug: "migration", value: "4M · 3s", company: "Qualson" },
  { slug: "notice", value: "1/10", company: "8percent" }
];

export const publications: Publication[] = [];

export const awards: Award[] = [];

export const strengths: Strength[] = [
  {
    title: "RDBMS 성능 개선",
    description: "MySQL, PostgreSQL, Oracle등을\n사용하였습니다.\n\n이 경험으로 DB의 데이터량,\n제품의 쿼리 패턴 및 테이블 구조를\n능숙히 파악해\n적절한 쿼리 튜닝 및\n인덱스 설계를 진행할 수 있습니다."
  },
  {
    title: "유연한 코드 구조 설계",
    description: "개발은 혼자서 하는 것이 아닌\n여럿이서 함께 하는 경우,\n기획이 추가 혹은 변경되는 경우가\n많습니다.\n\n이에 기능의 추가 및 변경,\n다른 개발자가 쉽게 읽고\n유지보수할 수 있는 코드에 대해\n공부 및 작성하고 있습니다."
  },
  {
    title: "조직 문화 개선",
    description: "조직의 비즈니스 목표를\n빠르고 정확하게 달성하기 위해서는\n투명화된 소통, 정보의 일원화 및\n커뮤니케이션 비용 축소가 필수입니다.\n\n이에 협업을 위한 다양한 시도를\n도입하고 조직에 효과적인\n방법을 찾고 있습니다."
  }
];

export const interests: Interest[] = [
  {
    title: "신규 기술 학습",
    description: "조직의 비즈니스 목표를 이루기 위해서는\n상황에 맞는 기술을\n적재적소에 활용할 수 있어야 한다고\n생각합니다.\n\n이에 스스로 새로운 기술들을 학습하며\n목표에 맞춘 효율적인 기술을\n선택할 수 있도록 노력합니다."
  },
  {
    title: "AI 및 협업툴 활용 자동화",
    description: "조직의 구성원들이 본업에 집중하기 위해\n문서화등의 반복 작업을\nAI(LLM)와 협업툴\n(Jira, Notion, Slack)을 이용해\n자동화하는 것에 관심이 있습니다."
  }
];

export const skills: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: ["Python", "Kotlin"]
  },
  {
    category: "Frameworks",
    skills: ["Django", "FastAPI", "Spring Boot"]
  },
  {
    category: "Databases",
    skills: ["MySQL", "PostgreSQL", "Redis"]
  },
  {
    category: "DevOps & Tools",
    skills: ["Docker", "Linux", "Nginx"]
  },
  {
    category: "Architecture",
    skills: ["Clean Architecture", "Pub/Sub"]
  },
  {
    category: "AI",
    skills: ["vLLM", "AX Engineering"]
  }
];

export const personalLinks: PersonalLink[] = [
  {
    title: "개인 개발 블로그",
    url: "https://velog.io/@devgyurak",
    description: "개발 경험과 기술적 인사이트를 공유하는 블로그입니다."
  },
  {
    title: "GitHub",
    url: "https://github.com/devgyurak",
    description: "개인 및 프로젝트 소스코드를 관리하는 깃허브입니다."
  },
  {
    title: "개인 포트폴리오",
    url: "https://devgyurak.com",
    description: "개인 포트폴리오 사이트입니다."
  }
];

export const blogPosts: BlogPost[] = [
  {
    title: "pykorail",
    date: "2026-09 ~ Present",
    excerpt: "코레일톡 앱 API를 감싼 비공식 Python SDK입니다. 열차 조회부터 예매·결제·환불·예약대기·취소표 감시까지 코드 몇 줄로 다룰 수 있고, PyPI로 배포하고 있습니다.\n\n동기 Korail과 비동기 AsyncKorail이 같은 리소스와 시그니처를 공유하도록 설계했고, 환승 예매는 두 구간을 하나의 예약번호로 묶어 한 구간만 잡히는 부분 예약이 생기지 않게 했습니다. 코레일 서버가 TLS 지문을 확인하기 때문에 curl_cffi를 기본 HTTP 클라이언트로 쓰고, 역 이름 오타나 지난 시각 같은 잘못된 요청은 서버로 보내기 전에 막습니다.",
    image: "https://via.placeholder.com/400x200",
    tags: ["Python", "SDK", "asyncio", "curl_cffi", "PyPI", "AX Engineering"],
    slug: "pykorail",
    url: "https://pykorail.devgyurak.com",
    githubUrl: "https://github.com/devgyurak/pykorail"
  },
  {
    title: "mysql-gcm",
    date: "2026-09 ~ Present",
    excerpt: "MySQL 8.0 이상에 인증 암호화(AES-GCM)를 서버 컴포넌트로 추가하는 오픈소스입니다. 암호화한 한국어 컬럼에서도 부분 일치 검색(LIKE)을 하기 위해 만들었습니다.\n\n복호화 결과를 utf8mb4 문자열로 돌려줘 암호화된 컬럼의 LIKE 검색이 MySQL 콜레이션 그대로 서버 안에서 실행되고, 조인·UNIQUE용 결정적 암호화와 기존 CBC 데이터 이관을 위한 이중 읽기를 지원합니다. 30만 행 서버 측 LIKE 필터링에서 p95가 AES_DECRYPT 대비 0.75~0.96배였고, NIST 테스트 벡터와 6,493개 단위 테스트, MySQL 8.0·8.4·9.x 통합 테스트로 동작을 검증했습니다.",
    image: "https://via.placeholder.com/400x200",
    tags: ["C++17", "MySQL", "OpenSSL", "AES-GCM", "AX Engineering"],
    slug: "mysql-gcm",
    url: "https://mysql-gcm.devgyurak.com",
    githubUrl: "https://github.com/devgyurak/mysql-gcm"
  },
  {
    title: "syncintosh",
    date: "2026-10 ~ Present",
    excerpt: "여러 대의 Mac에서 쉘·IDE·Docker 같은 개발 환경 설정을 맞춰주는 CLI입니다. 현재 초기 단계로 개발하고 있습니다.\n\n설정은 종단간 암호화된 git 저장소로 동기화해 서버에는 파일 내용뿐 아니라 경로와 디렉터리 구조까지 암호문으로만 남고, 충돌은 파일 형식을 이해하는 3-way merge와 선택적인 LLM 보조로 해결하도록 설계했습니다. 지금은 충돌 해결의 기반이 되는 키 단위 병합 엔진을 구현하고 있습니다.",
    image: "https://via.placeholder.com/400x200",
    tags: ["Python", "CLI", "E2E Encryption", "Git", "3-way Merge", "AX Engineering"],
    slug: "syncintosh",
    githubUrl: "https://github.com/devgyurak/syncintosh"
  },
  {
    title: "Hipchapedia",
    date: "2025-09 ~ Present",
    excerpt: "다양한 음악 장르의 가사 의미와 맥락을 AI로 분석해주는 서비스입니다.\n\nKotlin과 Spring Boot 기반 서비스에 Clean Architecture를 적용해 구조적 유지보수성을 확보했고, Python과 Redis로 곡 제목 기반 가사 검색 모듈을 개발하며 Pub/Sub 아키텍처로 검색 처리 흐름을 설계했습니다.",
    image: "https://via.placeholder.com/400x200",
    tags: ["Kotlin", "Spring Boot", "Python", "MySQL", "Redis", "Clean Architecture", "Pub/Sub", "AX Engineering"],
    slug: "hipchapedia",
    url: "https://hipchapedia.com",
    githubUrl: "https://github.com/devgyurak/hipchapedia"
  }
];
