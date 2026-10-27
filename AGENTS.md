# AGENTS.md

## 프로젝트 개요
- 이 저장소는 개인 포트폴리오 사이트입니다.
- 기술 시연용 애플리케이션이 아니라, 포트폴리오 주인의 경험과 강점을 명확하게 전달하는 것이 우선입니다.
- 작업 시 우선순위는 다음과 같습니다: 콘텐츠 정확성, 가독성, 반응형 안정성, 다크/라이트 테마 일관성, 기존 디자인 톤 유지.

## 포트폴리오 주인 프로필
- 포트폴리오 주인은 4년차 백엔드 엔지니어입니다.
- 핵심 강점은 RDBMS 성능 최적화, 안정적인 데이터 파이프라인 운영, 유지보수 가능한 코드 구조 설계입니다.
- 실무에서 ETL 처리 시간 단축, 멀티 스키마 추상화, 검색/API 성능 개선, 운영 안정화 경험을 보유하고 있습니다.
- 사이드 프로젝트에서는 로컬 LLM 서빙, AI 활용 자동화, Clean Architecture 적용, 서비스 운영 경험을 보여주고 있습니다.
- 이 사이트의 모든 문구와 구성은 백엔드 엔지니어로서의 강점이 더 선명하게 드러나는 방향을 우선해야 합니다.

## 주요 기술 스택
- 언어: Python, Kotlin
- 프레임워크: Django, FastAPI, Spring Boot
- 데이터베이스: MySQL, PostgreSQL, Redis
- 인프라 및 운영: Docker, Linux, Nginx
- 설계 키워드: Clean Architecture, Adapter Pattern, 데이터 파이프라인, 성능 최적화
- 관심사: AI 활용 자동화, 협업툴 연동, 운영 효율화

## 프로젝트 스택
- React
- TypeScript
- styled-components
- Create React App

## 주요 파일
- `src/data/profile.ts`: 프로필, 경력, 프로젝트, 기술 스택, 링크 데이터
- `src/hooks/useLanguage.tsx`: 한국어/영어 사용자 노출 문구
- `src/components/Header.tsx`: 상단 내비게이션, 테마 토글, 언어 선택 진입점
- `src/components/HeroSection.tsx`: 첫 화면 소개 영역
- `src/components/ExperienceSection.tsx`: 경력 섹션
- `src/components/ProjectsSection.tsx`: 프로젝트 섹션
- `src/components/SkillsSection.tsx`: 기술 스택 섹션
- `src/styles/theme.ts`: 색상, 간격, 반응형 기준 등 디자인 토큰
- `src/styles/GlobalStyles.ts`: 전역 스타일
- `public/icons/*`: 스킬 및 링크 아이콘

## 작업 원칙
- 작은 변경을 우선합니다. 단순 콘텐츠 수정에 과한 리팩터링이나 구조 변경을 하지 않습니다.
- 기존 디자인 언어를 유지합니다. 이 사이트는 이미 정해진 미감과 레이아웃이 있으므로, 새 UI를 추가할 때도 같은 톤을 따릅니다.
- 새 라이브러리는 정말 필요한 경우에만 추가합니다.
- 포트폴리오 사이트의 목적과 무관한 기능은 추가하지 않습니다.
- 불필요한 추상화, 범용 헬퍼, 과한 상태 관리는 지양합니다.
- 스타일 수정 시 가능하면 기존 `theme` 토큰과 `styled-components` 패턴을 재사용합니다.

## 콘텐츠 수정 규칙
- 경력, 프로젝트, 자기소개 문구는 단순 나열보다 문제 해결 맥락과 성과가 드러나야 합니다.
- 수치가 포함된 성과 표현은 임의로 약화하거나 삭제하지 않습니다.
- 백엔드 엔지니어 포지셔닝이 흐려지지 않도록, 소개 문구는 서버 개발, 데이터 처리, 성능 개선, 운영 경험 중심으로 유지합니다.
- 새 프로젝트를 추가할 때는 사용 기술만 적지 말고, 무엇을 해결했고 어떤 구조적 판단을 했는지 드러나게 작성합니다.
- 한국어와 영어 문구는 의미가 어긋나지 않게 함께 관리합니다.

## 데이터 및 번역 동기화 규칙
- 프로필, 경력, 프로젝트, 기술 스택의 원본 데이터는 우선 `src/data/profile.ts`에서 확인합니다.
- 실제 화면 문구는 `src/hooks/useLanguage.tsx`에도 별도로 존재할 수 있으므로, 사용자 노출 텍스트를 수정할 때는 두 파일을 함께 확인합니다.
- 경력 설명은 `ExperienceSection`의 `getDescription`에서 경력(또는 `roles`)의 `slug` 기준으로 `exp.*.desc` 번역 키를 선택하므로, 경력 항목을 추가하거나 `slug`가 바뀌면 관련 번역 키와 `switch` 분기도 함께 수정합니다.
- 히어로 소개 문구는 `profileData.description`이 아니라 `hero.description`, `hero.mobileDescription` 번역 키로 렌더링되므로, 소개 문구 수정 시 `profile.ts`와 두 언어의 번역 키를 모두 맞춥니다.
- 프로젝트 설명은 `ProjectsSection`에서 `slug` 기준으로 번역 키를 선택하므로, 프로젝트를 추가하거나 `slug`를 변경하면 번역 키와 분기 로직을 같이 수정합니다.
- 기술 스택을 추가할 때는 `src/data/profile.ts`뿐 아니라 `SkillsSection`의 아이콘 매핑과 `public/icons` 파일 존재 여부도 함께 확인합니다.

## UI 및 스타일 규칙
- 모든 시각 변경은 데스크톱과 모바일에서 모두 자연스러워야 합니다.
- 다크 모드와 라이트 모드 모두에서 대비와 가독성을 유지해야 합니다.
- 헤더, 히어로, 경력, 프로젝트, 기술 스택 섹션 간 간격과 리듬을 해치지 않습니다.
- 카드형 UI의 테두리, 그림자, 호버 효과는 기존 패턴과 맞춰 일관되게 유지합니다.
- 인라인 스타일이나 임시 하드코딩보다 기존 스타일 구조 안에서 해결하는 편을 우선합니다.

## 작업 시 체크리스트
- 문구 수정이 `src/data/profile.ts`와 `src/hooks/useLanguage.tsx` 사이에서 불일치하지 않는지 확인합니다.
- 새 스킬 추가 시 아이콘 매핑이 있는지 확인합니다.
- 새 프로젝트 추가 시 `slug`, 외부 링크, 번역 키, 카드 렌더링이 모두 연결되는지 확인합니다.
- 레이아웃 변경 시 모바일 화면 폭에서 줄바꿈이나 오버플로우가 없는지 확인합니다.
- 테마 관련 수정 시 다크 모드와 라이트 모드를 모두 확인합니다.

## 에이전트 설정 구조
- 이 파일(`AGENTS.md`)이 Codex와 Claude Code가 공유하는 단일 지침 원본입니다. `CLAUDE.md`는 이 파일을 import만 하므로, 공통 지침은 이 파일에만 작성합니다.
- 스킬 원본은 `.agents/skills/<name>/SKILL.md`에 두고, `.claude/skills/<name>`은 이를 가리키는 심볼릭 링크로 유지합니다. 스킬 frontmatter는 두 도구가 공통으로 인식하는 `name`, `description`만 사용합니다.
  - `add-portfolio-project`: 새 사이드 프로젝트 카드 추가
  - `update-experience`: 경력 항목 추가 및 수정
  - `add-tech-skill`: 기술 스택 및 아이콘 추가
  - `verify-portfolio`: 문구 동기화, 테스트, 빌드, 반응형/테마 점검
- 파일별 세부 규칙은 `.claude/rules/`에 있습니다. Claude Code는 경로에 맞춰 자동으로 불러오며, Codex는 아래 파일을 수정하기 전에 해당 규칙 파일을 직접 읽습니다.
  - `src/data/profile.ts`, `src/hooks/useLanguage.tsx`, 섹션 컴포넌트 문구 → `.claude/rules/content-sync.md`
  - `src/components/**`, `src/styles/**` 스타일 → `.claude/rules/styling.md`
- 명령 실행 정책은 Codex `.codex/rules/portfolio.rules`, Claude Code `.claude/settings.json`에 같은 의미로 정의합니다. 한쪽을 바꾸면 다른 쪽도 함께 바꿉니다.

## 검증
- 가능하면 `npm test -- --watchAll=false`를 실행합니다.
- 가능하면 `npm run build`를 실행합니다.
- 로컬 환경에 Node 또는 npm이 없어 검증할 수 없는 경우, 검증 미실행 사실을 명확히 남깁니다.

## 금지 사항
- 포트폴리오 성격과 무관한 대규모 구조 변경
- 기존 사용자 노출 문구와 불일치하는 임의의 프로필 재작성
- 확인되지 않은 경력, 수치, 링크, 기술 스택 추가
- 반응형이나 테마 확인 없이 끝내는 스타일 수정
- 단순 수정에 비해 과도한 추상화 또는 라이브러리 추가

## 기대하는 변경 방향
- 새 기능을 많이 추가하는 것보다, 현재 포트폴리오의 전달력과 완성도를 높이는 변경이 더 바람직합니다.
- 변경은 항상 포트폴리오 주인의 강점인 백엔드 개발 역량, 성능 개선 경험, 설계 역량, 운영 경험이 더 잘 보이게 만드는 방향이어야 합니다.
