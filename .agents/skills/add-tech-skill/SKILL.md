---
name: add-tech-skill
description: 포트폴리오 Skills 섹션에 기술 스택을 추가, 삭제, 재분류하거나 아이콘을 교체할 때 사용합니다. profile.ts의 skills 카테고리, SkillsSection의 iconMap, public/icons의 SVG 파일 존재 여부를 함께 확인합니다. 프로젝트 태그만 바꾸는 경우에는 add-portfolio-project를 사용합니다.
---

# 기술 스택 추가/수정

## 0. 추가 여부 판단

사용자가 실제로 사용한 기술인지 확인되지 않았다면 추가하지 않습니다. 이 사이트는 백엔드 포지셔닝이 우선이므로, 프론트엔드 도구처럼 포지셔닝을 흐리는 항목은 추가 전에 사용자에게 확인합니다.

## 1. `src/data/profile.ts`의 `skills` 수정

기존 카테고리(`Programming Languages`, `Frameworks`, `Databases`, `DevOps & Tools`, `Architecture`, `AI`)에 먼저 넣을 수 있는지 봅니다. 카테고리명은 번역 없이 그대로 노출되므로 영어로 씁니다. 새 카테고리는 그리드 균형(`minmax(300px, 1fr)`)을 고려해 꼭 필요할 때만 추가합니다.

## 2. 아이콘 파일 준비 (`public/icons/`)

- 파일명은 소문자, 공백/기호 제거: `Spring Boot` → `springboot.svg`, `Pub/Sub` → `pubsub.svg`
- 단색 SVG를 사용합니다. 다크 모드에서 `filter: invert(1)`로 반전되므로 컬러 로고는 반전 후 색이 깨집니다.
- 아이콘 출처가 확인되지 않으면 파일을 임의로 만들지 말고 사용자에게 요청합니다.

```bash
ls public/icons/
```

## 3. `src/components/SkillsSection.tsx`의 `iconMap`에 매핑 추가

```ts
'<profile.ts에 적은 이름과 정확히 같은 문자열>': '/icons/<file>.svg',
```

키가 `profile.ts`의 문자열과 한 글자라도 다르면 아이콘 없이 렌더링됩니다.

## 4. 연동 확인

- 같은 기술이 프로젝트 `tags`에 쓰이는 경우 표기를 통일합니다(예: `Spring Boot`).
- `AGENTS.md`의 "주요 기술 스택" 목록과 어긋나면 함께 갱신할지 사용자에게 확인합니다.

## 5. 검증

`verify-portfolio` 스킬의 절차를 따르고, 다크/라이트 모드 모두에서 아이콘이 보이는지 확인합니다.
