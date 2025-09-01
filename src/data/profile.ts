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
  title: string;
  company: string;
  period: string;
  description: string;
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
  description: "4년 경력의 백엔드 엔지니어로, RDBMS 성능 최적화와 안정적인 데이터 파이프라인 운영에 강점을 보유하고 있습니다.\n\nETL 처리 시간을 86% 단축하고, Adapter Pattern으로 다수 스키마를 추상화한 경험이 있습니다. 사이드 프로젝트에서는 로컬 LLM 서빙과 Clean Architecture를 실서비스에 적용하며 빠른 학습력을 입증했습니다.",
  mobileDescription: "4년 경력의 백엔드 엔지니어로, RDBMS 성능 최적화와\n안정적인 데이터 파이프라인 운영에 강점을 보유하고 있습니다.\n\nETL 처리 시간을 86% 단축하고,\nAdapter Pattern으로 다수 스키마를 추상화한 경험이 있습니다.\n사이드 프로젝트에서는 로컬 LLM 서빙과\nClean Architecture를 실서비스에 적용하며\n빠른 학습력을 입증했습니다.",
  avatar: "/profile.jpeg",
  location: "서울특별시",
  email: "dev@devgyurak.com",
  linkedin: "https://linkedin.com/in/devgyurak",
  github: "https://github.com/leegyurak",
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
    title: "Software Engineer",
    company: "AITRICS",
    period: "2023.08 - Present",
    description: "• EMR ETL 파이프라인 성능 최적화 (15분 → 2분, -86%)\n\n• 멀티 병원 스키마 Adapter Layer 추상화로 신규 연동 리드타임 단축\n\n• Slack 워크플로우 표준화로 협업 비용 절감"
  },
  {
    title: "Backend Developer",
    company: "8percent",
    period: "2023.01 - 2023.06",
    description: "• 검색 API 성능 최적화 (8초 → ~1초, 비용 절감)\n\n• 채권 공지 발송 안정화 (공지 누락률 1/10 감소)\n\n• 이벤트 처리 아키텍처 고도화 및 확장성 확보"
  },
  {
    title: "Backend Developer",
    company: "Qualson",
    period: "2021.07 - 2023.01",
    description: "• Spring → Django 마이그레이션 및 API 표준화\n\n• 대규모 데이터 마이그레이션 (400만 건, 3초 처리)\n\n• 쿠폰 자동 알림 시스템 구축 (Webhook + Braze)"
  }
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
    skills: ["Clean Architecture"]
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
    url: "https://github.com/leegyurak",
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
    title: "주로",
    date: "2025-08 ~ Present",
    excerpt: "'미래를 보는데 돈은 필요 없다'라는 신념하에 시작한 프로젝트로, LLM을 활용해 사주, 타로 등 각종 운세를 무료로 제공하는 서비스입니다.\n\nKotlin/Spring Boot, MySQL, Redis 등의 기술 사용 및 Clean Architecture 적용으로 유지보수성을 확보했습니다.",
    image: "https://via.placeholder.com/400x200",
    tags: ["Kotlin", "Spring Boot", "MySQL", "Redis", "Nginx", "Clean Architecture", "mlx_lm"],
    slug: "jurot",
    url: "https://jurot.site",
    githubUrl: "https://github.com/leegyurak/jurot"
  },
  {
    title: "면세점주",
    date: "2025-07 ~ Present",
    excerpt: "숭실대학교 대학 축제 야간주점에서 온라인 주문/결제 시스템을 활용할 수 없는 문제를 개선하기 위해 시작한 프로젝트입니다.\n\nPython/Django, MySQL, Nginx 등의 기술 사용 및 Clean Architecture 적용으로 유지보수성을 확보했습니다.",
    image: "https://via.placeholder.com/400x200",
    tags: ["Python", "Django", "MySQL", "Nginx", "Clean Architecture"],
    slug: "myunsejujeom",
    url: "https://myunsejeomju.shop",
    githubUrl: "https://github.com/leegyurak/myunsejeomju"
  }
];