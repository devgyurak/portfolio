# Portfolio

개인 포트폴리오 사이트입니다.

이 프로젝트는 백엔드 엔지니어로서의 경험, 성과, 기술 스택을 명확하게 전달하는 데 초점을 둡니다. 기능 확장보다 콘텐츠 정확성, 가독성, 반응형 안정성, 다크/라이트 테마 일관성을 우선합니다.

## 기술 스택

- React
- TypeScript
- styled-components
- Create React App

## 주요 특징

- 한국어/영어 전환 지원
- 다크 모드/라이트 모드 지원
- 경력, 프로젝트, 기술 스택 중심의 포트폴리오 구성
- Docker 기반 실행 및 배포 구성

## 주요 파일

- `src/data/profile.ts`: 프로필, 경력, 프로젝트, 기술 스택, 링크 데이터
- `src/hooks/useLanguage.tsx`: 한국어/영어 사용자 노출 문구
- `src/hooks/useTheme.tsx`: 테마 상태 관리
- `src/components/Header.tsx`: 상단 내비게이션, 언어 전환, 테마 토글
- `src/components/HeroSection.tsx`: 첫 화면 소개
- `src/components/ExperienceSection.tsx`: 경력 섹션
- `src/components/ProjectsSection.tsx`: 프로젝트 섹션
- `src/components/SkillsSection.tsx`: 기술 스택 섹션
- `src/styles/theme.ts`: 디자인 토큰
- `public/icons/*`: 기술 스택 및 링크 아이콘

## 로컬 실행

사전 요구사항:

- Node.js 18 이상 권장
- npm

설치 및 실행:

```bash
npm install
npm start
```

기본 개발 서버는 `http://localhost:3000`에서 확인할 수 있습니다.

## 검증

테스트 실행:

```bash
npm test -- --watchAll=false
```

프로덕션 빌드:

```bash
npm run build
```

## Docker

프로덕션 이미지 실행:

```bash
docker compose up portfolio-frontend
```

개발용 컨테이너 실행:

```bash
docker compose --profile dev up portfolio-dev
```

## 작업 원칙

- 포트폴리오의 핵심 메시지는 백엔드 엔지니어링 역량이어야 합니다.
- 경력과 프로젝트 문구는 문제 해결 맥락과 성과를 유지해야 합니다.
- 사용자 노출 문구를 수정할 때는 `src/data/profile.ts`와 `src/hooks/useLanguage.tsx`를 함께 확인해야 합니다.
- 디자인 변경 시 모바일과 다크/라이트 테마를 함께 점검해야 합니다.
- 작은 변경을 우선하며, 불필요한 추상화나 라이브러리 추가를 지양합니다.

## 배포

- `Dockerfile`은 프로덕션 빌드를 생성한 뒤 `serve`로 정적 파일을 제공합니다.
- `.github/workflows/build_and_push_dockerhub.yml`은 태그 푸시 시 Docker 이미지를 빌드하고 Docker Hub로 배포합니다.

세부 작업 원칙은 `AGENTS.md`를 참고하세요.
