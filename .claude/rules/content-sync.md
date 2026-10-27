---
paths:
  - "src/data/profile.ts"
  - "src/hooks/useLanguage.tsx"
  - "src/components/HeroSection.tsx"
  - "src/components/ExperienceSection.tsx"
  - "src/components/ProjectsSection.tsx"
  - "src/components/SkillsSection.tsx"
---

# 콘텐츠 동기화 규칙

화면 문구는 `profile.ts`(원본 데이터)와 `useLanguage.tsx`(실제 렌더링 문구) 두 곳에 있습니다. 어느 한쪽만 고치면 언어 전환 시 내용이 달라집니다.

## 실제 렌더링 출처

| 영역 | 화면에 보이는 값 | 함께 맞출 값 |
| --- | --- | --- |
| 히어로 소개 | `hero.description`, `hero.mobileDescription` (ko/en) | `profileData.description`, `mobileDescription` |
| 경력 설명 | `exp.<key>.desc` (ExperienceSection `getDescription`의 slug 분기) | `experience[].description`, `roles[].description` |
| 프로젝트 제목/설명 | `proj.<slug>.title`, `proj.<slug>.desc` (ProjectsSection의 slug 분기) | `blogPosts[].title`, `excerpt` |
| 회사명, 기간, 직함, 태그, 스킬 카테고리 | `profile.ts` 값 그대로 (번역 없음) | - |

## 규칙

- `ko` 번역 값은 `profile.ts`의 한국어 원문과 글자 단위로 같게 유지합니다.
- `en` 번역은 `ko`와 의미가 어긋나지 않게 함께 수정합니다. 수치, 화살표(`→`), 단위는 그대로 옮깁니다.
- 새 번역 키는 `ko`, `en` 양쪽에 같은 이름으로 추가합니다.
- slug 분기에 `case`가 없으면 `default`로 빠져 한국어 원문이 영어 화면에도 노출됩니다. 새 slug를 추가하면 반드시 분기도 추가합니다.
- 줄바꿈은 `\n`, 문단 구분은 `\n\n`, 경력 항목은 `• ` 접두어를 사용합니다.
- 확인되지 않은 경력, 수치, 링크, 기술을 추가하지 않습니다. 기존 수치 성과를 약화하거나 지우지 않습니다.
