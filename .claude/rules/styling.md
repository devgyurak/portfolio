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

## 레이아웃: 12컬럼 그리드

- 디자인 방향은 Swiss Typographic(Vignelli/Pentagram)입니다. 카드, 그림자, 둥근 모서리 없이 그리드, 괘선, 타이포 크기 대비로 위계를 만듭니다.
- 섹션은 `src/styles/layout.ts`의 `SectionShell` > `Container` > `Grid`(12컬럼) 구조를 사용하고, 요소 배치는 `grid-column`으로 합니다. 기본 배치는 메타(기간·번호) `1 / 3`, 제목 `3 / 6~7`, 본문 `6~7 / -1`입니다.
- `Container`는 `theme.layout.maxWidth`(1320px), 좌우 패딩 `2.5rem` → 태블릿 `1.5rem` → 모바일 `1rem`입니다.
- 모바일(768px 이하)에서 `Grid`는 flex column으로 바뀌므로 `grid-column`을 따로 덮어쓸 필요가 없습니다. 대신 `Grid`를 확장한 컴포넌트에 `align-items: center`를 주면 모바일에서 가로 가운데 정렬이 되므로 모바일 값을 따로 지정합니다.
- 미디어 쿼리는 `@media (max-width: ${theme.breakpoints.mobile})`(768px), `${theme.breakpoints.tablet}`(1024px) 형식을 사용합니다.
- 긴 한국어 문장에는 `word-break: keep-all; overflow-wrap: break-word;`를 유지해 모바일 오버플로우를 막습니다.

## 괘선과 색

- 섹션 시작과 푸터는 `2px solid text`의 굵은 괘선, 헤더 하단은 `1px solid text`, 행 구분은 `1px solid border` 헤어라인을 씁니다. 히어로는 `min-height: 100svh`로 첫 화면을 채워, 다음 섹션의 괘선이 첫 화면에 보이지 않게 합니다.
- 색은 잉크(`text`), 종이(`background`), 시그널 레드(`accent`) 세 가지입니다. `accent`는 로고 심볼의 가로획 칸, 섹션 인덱스, 대표 성과 수치, 경력 문장의 성과 수치, 현재 재직 중 표시 점, 호버에만 씁니다. 히어로 상단 메타 줄은 `소개`(왼쪽)와 `주요 성과`(오른쪽) 라벨만 둡니다. 새로운 색상을 추가하지 않습니다.
- `theme.radius.*`는 0입니다. 그림자는 사용하지 않습니다.

## 타이포

- 본문은 `theme.fonts.body`(Pretendard)를 사용합니다. 대형 제목, 숫자, 회사·프로젝트명, 스킬명, 로고처럼 크게 보이는 글자는 `src/styles/layout.ts`의 `displayType`(Archivo 세미 컨덴스드, 한글은 Pretendard로 대체)을 적용합니다.
- 위계는 크기와 굵기 대비로 만듭니다. 대형 제목은 800 굵기, 음수 자간(-0.03em ~ -0.05em), `line-height` 0.82~1.05를 씁니다.
- 숫자는 전역 `tabular-nums`가 적용되어 있습니다.
- 모션은 최소한으로 합니다. 이름과 직함이 아래에서 올라오는 `rise`, 메뉴 패널 전개(위에서 펼쳐지는 `clip-path`와 항목이 순차로 올라오는 전환), 햄버거→X 전환, 스크롤 등장, 색상 호버만 사용합니다. 이징은 `theme.animations.easing`을 씁니다.
- 스크롤 등장: 섹션 제목은 2px 괘선(`::before`)이 왼쪽에서 그어진 뒤 번호와 제목이 올라오고, 경력·프로젝트·기술 행은 `layout.ts`의 `reveal`로 아래에서 떠오릅니다. 새 행에는 `${reveal}`과 `data-reveal` 속성을 함께 붙입니다. `useScrollReveal`(App에서 한 번 호출)이 화면에 들어온 요소에 `data-revealed`를 붙이고, 함께 들어온 요소는 90ms 간격으로 차례로 보여 줍니다. 모션 줄이기 설정이나 IntersectionObserver가 없는 환경에서는 바로 모두 보입니다. 히어로는 `rise`가 따로 있으므로 붙이지 않습니다.

## 헤더

- 헤더는 로고, 언어 토글, 테마 토글, 메뉴 버튼만 둡니다. 로고는 4×4 격자 G 심볼(`LogoMark`, 16px)과 `Devgyurak` 글자입니다. 심볼 도형은 `public/favicon.svg`와 같으므로 바꿀 때는 파비콘·앱 아이콘(`favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`)도 함께 다시 만듭니다. 메뉴 버튼은 두 줄 햄버거(`Burger`)이고 열리면 X로 바뀝니다. 섹션 바로가기는 메뉴 패널 안에 번호와 함께 큰 `displayType` 링크로 나열하고, 링크 클릭, 바깥 클릭, Esc로 닫습니다.

## 모바일 배치

- 히어로: 이름(25vw) → 직함 → 위치 → 성과 수치 → 소개 → 링크(2×2) 순서입니다. `Main`을 `display: contents`로 풀고 `order`로 성과 수치를 소개 앞에 둡니다.
- 경력: 회사명과 기간을 한 줄(좌우 끝)에 두고, 역할 목록은 아래 전체 폭으로 내립니다.
- 섹션 제목은 `3rem`으로 한 줄에 들어가게 합니다.
- 푸터: 링크 아이콘 → 구분선 → 맨 위로 순서로 한 줄, 그 아래 저작권 문구입니다.

## 아이콘

- 아이콘은 링크(연락처, GitHub, LinkedIn, 웹사이트, 이력서), 위치, 테마 토글, 화살표, 스킬에만 씁니다. 푸터 링크는 텍스트 없이 아이콘만 두고 `aria-label`과 `title`을 붙입니다. 섹션 제목, 성과 지표, 경력·프로젝트 본문에는 아이콘을 넣지 않습니다.
- UI 아이콘은 `react-icons/lu`(Lucide)를 `SvgIcon` 컴포넌트로 감싸 사용합니다. `currentColor`를 따르므로 테마별 반전이 필요 없습니다. TypeScript 4.9 타입 문제 때문에 Lucide 컴포넌트를 JSX로 직접 렌더링하지 않습니다.
- 스킬 아이콘은 `public/icons/`의 단색 SVG를 사용하고, 다크 모드에서는 `filter: invert(1)`로 반전합니다. 컬러 아이콘은 반전 시 색이 깨지므로 사용하지 않습니다.
- 아이콘은 라벨 옆 보조 신호로만 쓰고, 텍스트 없이 아이콘만 두는 경우(테마 토글, 메뉴 버튼 등)에는 `aria-label`을 붙입니다.

## 완료 조건

스타일 변경 후 모바일/데스크톱 폭과 다크/라이트 모드를 모두 확인했는지, 확인하지 못했다면 그 사실을 보고합니다.
