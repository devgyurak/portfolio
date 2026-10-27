---
name: add-portfolio-project
description: 포트폴리오 Projects 섹션에 새 사이드 프로젝트 카드를 추가하거나 기존 프로젝트의 slug, 설명, 링크, 태그를 수정할 때 사용합니다. profile.ts의 blogPosts, useLanguage.tsx의 proj.<slug> 번역 키, ProjectsSection의 slug 분기를 함께 연결합니다. 경력이나 기술 스택 수정에는 사용하지 않습니다.
---

# 프로젝트 카드 추가/수정

프로젝트 카드는 세 곳이 함께 맞아야 정상 렌더링됩니다. 하나라도 빠지면 영어 화면에서 한국어 원문이 그대로 노출됩니다.

## 0. 필요한 정보 확인

아래 정보가 사용자에게서 확인되지 않았다면 임의로 만들지 말고 먼저 질문합니다.

- 프로젝트명(한국어/영어), 기간(`YYYY-MM ~ Present` 형식, 기존 항목 참고)
- 해결한 문제, 구조적 판단, 성과(수치가 있으면 수치 그대로)
- 사용 기술(태그), 서비스 URL(있을 때만), GitHub URL

## 1. `src/data/profile.ts`의 `blogPosts`에 항목 추가

```ts
{
  title: "<한국어 원문 제목>",
  date: "2025-10 ~ Present",
  excerpt: "<무엇을 위한 서비스인지 한 문장>\n\n<기술적 판단과 성과>",
  image: "https://via.placeholder.com/400x200",
  tags: ["Kotlin", "Spring Boot"],
  slug: "<kebab-or-lowercase-slug>",
  url: "https://...",        // 서비스 URL이 있을 때만. 있으면 카드 전체가 클릭 가능해짐
  githubUrl: "https://github.com/..."
}
```

- `slug`는 기존 항목과 겹치지 않는 소문자 식별자로 정합니다. 번역 키에 그대로 쓰입니다.
- 배열 순서가 화면 노출 순서입니다. 사용자가 순서를 지정하지 않으면 최신/대표 프로젝트를 위쪽에 둡니다.
- `excerpt`는 기술 나열이 아니라 "문제 → 구조적 판단 → 결과" 순서로, 백엔드 역량이 드러나게 작성합니다.

## 2. `src/hooks/useLanguage.tsx`에 번역 키 추가

`ko`, `en` 두 블록 모두에 같은 키를 추가합니다.

- `proj.<slug>.title`
- `proj.<slug>.desc`

`ko`의 `desc`는 `profile.ts`의 `excerpt`와 같은 문장으로 맞추고, `en`은 의미가 어긋나지 않게 번역합니다. 마지막 항목 뒤 쉼표 유무를 기존 스타일에 맞춥니다.

## 3. `src/components/ProjectsSection.tsx`의 분기 추가

`getTitle`, `getDescription`의 `switch (post.slug)`에 각각 `case '<slug>':`를 추가합니다. 기존 `case` 형식을 그대로 따릅니다.

## 4. slug 변경 시

slug를 바꿨다면 `profile.ts`, `useLanguage.tsx`(ko/en), `ProjectsSection.tsx`(두 switch)에서 이전 slug가 남아 있지 않은지 검색합니다.

```bash
grep -rn "<old-slug>" src/
```

## 5. 검증

`verify-portfolio` 스킬의 절차로 테스트와 빌드를 실행하고, 모바일 폭에서 태그 줄바꿈과 GitHub 버튼 오버플로우가 없는지 확인합니다.
