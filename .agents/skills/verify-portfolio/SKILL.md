---
name: verify-portfolio
description: 포트폴리오 사이트 변경을 마무리하기 전에 검증할 때 사용합니다. profile.ts와 useLanguage.tsx의 ko/en 문구 동기화, 번역 키와 slug 분기 연결, 아이콘 매핑을 점검하고 npm test와 npm run build를 실행한 뒤 반응형과 다크/라이트 테마 확인 항목을 보고합니다.
---

# 포트폴리오 변경 검증

변경 범위에 해당하는 항목만 점검하되, 3단계(테스트/빌드)는 항상 시도합니다.

## 1. 문구 동기화 점검

- ko/en 키 집합이 같은지 확인합니다. 아래 명령의 두 결과가 같아야 합니다.

  ```bash
  diff \
    <(awk '/^  ko: \{/,/^  \},?$/' src/hooks/useLanguage.tsx | grep -o "^    '[^']*'" | sort) \
    <(awk '/^  en: \{/,/^  \},?$/' src/hooks/useLanguage.tsx | grep -o "^    '[^']*'" | sort) \
    && echo "ko/en keys match"
  ```

- 수정한 경력/프로젝트/소개 문구가 `profile.ts`와 `useLanguage.tsx`의 `ko` 값에서 같은지 확인합니다.
- 기존 수치 성과(`-86%`, `8초 → ~1초`, `400만 건` 등)가 의도치 않게 사라지지 않았는지 `git diff`로 확인합니다.

## 2. 연결 점검

- `blogPosts`의 모든 `slug`에 `proj.<slug>.title`, `proj.<slug>.desc` 키와 `ProjectsSection`의 `case`가 있는지
- `experience`의 모든 `slug`(roles 포함)에 `ExperienceSection.getDescription`의 `case`가 있는지
- `skills`의 모든 이름이 `SkillsSection`의 `iconMap`에 있고, 해당 파일이 `public/icons/`에 있는지

## 3. 테스트와 빌드

```bash
CI=true npm test -- --watchAll=false
npm run build
```

- `node_modules`가 없으면 `npm ci`가 필요하다고 보고하고, 사용자 확인 없이 의존성을 새로 추가하지 않습니다.
- Node/npm이 없거나 실패하면 실패 출력과 함께 검증 미실행/실패 사실을 그대로 보고합니다.
- `src/App.test.tsx`는 `Devgyurak`, `이규락`, `dev@devgyurak.com` 텍스트를 확인하므로 이 값이 바뀌면 테스트도 함께 수정합니다.

## 4. 시각 확인 항목

브라우저 확인이 가능하면 `npm start` 후 직접 확인하고, 불가능하면 아래 항목을 "미확인"으로 명시해 보고합니다.

- 모바일(768px 이하), 태블릿(1024px 이하), 데스크톱 폭에서 줄바꿈과 가로 오버플로우
- 다크/라이트 모드 각각의 텍스트 대비, 카드 테두리/호버, 아이콘 반전
- 한국어/영어 전환 시 긴 영어 문장으로 인한 레이아웃 깨짐

## 5. 보고 형식

점검 항목별로 통과/실패/미확인을 짧게 정리하고, 실패 항목은 파일 경로와 줄 번호를 함께 적습니다.
