---
name: update-experience
description: 포트폴리오 Work Experience 섹션의 경력 항목을 추가, 수정, 정리할 때 사용합니다. 회사 이동, 직무 변경, 성과 문구 수정, 한 회사 안의 roles 분리 등을 다루며 profile.ts의 experience, useLanguage.tsx의 exp.* 번역 키, ExperienceSection의 slug 분기를 함께 맞춥니다. 프로젝트나 기술 스택 수정에는 사용하지 않습니다.
---

# 경력 항목 추가/수정

## 0. 필요한 정보 확인

회사명, 직함, 기간, 주요 성과가 확인되지 않았다면 임의로 작성하지 말고 먼저 질문합니다. 이미 있는 수치(예: `15분 → 2분, -86%`, `8초 → ~1초`)는 약화하거나 삭제하지 않습니다.

## 1. 데이터 구조 선택 (`src/data/profile.ts`의 `experience`)

- 한 회사에서 한 직무: `slug`, `title`, `company`, `period`, `description`
- 한 회사에서 여러 직무: `slug`, `company`, `period`, `roles[]`(각 role에 `slug`, `title`, `period`, `description`)

배열은 최신 경력이 위로 오도록 유지합니다. 재직 중이면 기간 끝을 `Present`로 씁니다.

`description`은 `• 항목\n\n• 항목` 형식을 유지하고, 각 항목은 "무엇을 개선했고 결과가 어땠는지"가 드러나게 씁니다.

## 2. 번역 키 추가 (`src/hooks/useLanguage.tsx`)

`ko`, `en` 두 블록에 `exp.<camelCaseKey>.desc`를 추가합니다. 기존 키 예시:

| slug | 번역 키 |
| --- | --- |
| `nrise-backend` | `exp.nrise.desc` |
| `aitrics-be` | `exp.aitricsBe.desc` |
| `aitrics-fde` | `exp.aitricsFde.desc` |
| `8percent-backend` | `exp.8percent.desc` |
| `qualson-backend` | `exp.qualson.desc` |

slug와 키 이름은 기계적으로 변환되지 않으므로, 새 키는 위 패턴에 맞춰 짓고 3단계에서 직접 연결합니다. `ko` 문구는 `profile.ts`의 `description`과 동일하게 맞춥니다.

## 3. 분기 연결 (`src/components/ExperienceSection.tsx`)

`getDescription`의 `switch (slug)`에 `case '<slug>': return t('exp.<key>.desc');`를 추가합니다. `roles`를 쓰는 경우 회사 `slug`가 아니라 각 role의 `slug`로 분기합니다.

## 4. 소개 문구 영향 확인

연차나 대표 성과가 바뀌는 변경이면 히어로 소개(`hero.description`, `hero.mobileDescription`의 ko/en)와 `profileData.description`, `mobileDescription`도 함께 갱신할지 사용자에게 확인합니다. 한국어 `mobileDescription`은 모바일 줄바꿈을 위해 `\n`이 수동으로 들어가 있으므로 줄 길이를 기존과 비슷하게 맞춥니다. 영어 `hero.mobileDescription`은 문장 중간에 `\n`을 넣지 않고 문단 구분(`\n\n`)만 둡니다. 영어는 줄 길이가 화면 폭을 넘기 쉬워, 수동 줄바꿈이 자동 줄바꿈과 겹치면 짧은 줄이 생깁니다.

## 5. 검증

`verify-portfolio` 스킬의 절차를 따릅니다. 특히 `ExperienceGrid`의 `min-height`가 있으므로 항목 수가 바뀌면 모바일에서 레이아웃이 비거나 겹치지 않는지 확인합니다.
