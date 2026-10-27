---
paths:
  - "src/components/**/*.tsx"
  - "src/styles/**/*.ts"
  - "src/index.css"
---

# 스타일 규칙

## 토큰과 패턴

- 색상, 간격, 반경, 브레이크포인트, 폰트는 `src/styles/theme.ts`의 `theme` 토큰을 사용합니다. 새 색상 값이 필요하면 하드코딩 대신 `theme.colors.light`와 `theme.colors.dark`에 같은 이름으로 함께 추가합니다.
- 테마 분기는 styled-components transient prop `$isDarkMode`로 처리합니다. (`$isVisible`, `$clickable`처럼 DOM으로 전달되지 않는 props는 `$` 접두어 사용)
- 인라인 `style` 속성은 사용하지 않습니다.

## 반응형

- 미디어 쿼리는 `@media (max-width: ${theme.breakpoints.mobile})`(768px), `${theme.breakpoints.tablet}`(1024px) 형식을 사용합니다.
- 섹션 컨테이너는 `max-width: 1200px`, 좌우 패딩 `2rem` → 태블릿 `1.5rem` → 모바일 `1rem` 리듬을 유지합니다.
- 긴 한국어 문장에는 `word-break: keep-all; overflow-wrap: break-word;`를 유지해 모바일 오버플로우를 막습니다.

## 카드 UI

카드(경력, 프로젝트, 스킬)는 같은 시각 패턴을 공유합니다. 새 카드를 만들거나 수정할 때 아래를 맞춥니다.

- 테두리: `1px solid` + `theme.colors.{dark|light}.border`, 반경 `theme.radius.lg`
- 배경: 다크 `transparent`, 라이트 `theme.colors.light.surface`
- 그림자: 다크 `none`, 라이트 `0 1px 3px ${theme.colors.light.shadow}`
- 호버: 다크는 `accent` 테두리, 라이트는 `text` 테두리 + `shadowMd` 그림자

## 아이콘

- `public/icons/`의 단색 SVG를 사용하고, 다크 모드에서는 `filter: invert(1)`로 반전합니다. 컬러 아이콘은 반전 시 색이 깨지므로 사용하지 않습니다.

## 완료 조건

스타일 변경 후 모바일/데스크톱 폭과 다크/라이트 모드를 모두 확인했는지, 확인하지 못했다면 그 사실을 보고합니다.
