import styled, { css } from 'styled-components';
import { theme } from './theme';

// 모든 섹션이 공유하는 12컬럼 그리드 컨테이너입니다.
export const Container = styled.div`
  width: 100%;
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.layout.padding};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.layout.paddingTablet};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.layout.paddingMobile};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: ${theme.layout.gutter};

  /* 모바일에서는 1열 흐름으로 전환해 데스크톱 grid-column 지정이 암묵 컬럼을 만들지 않게 합니다. */
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
  }
`;

export const SectionShell = styled.section`
  padding: 7rem 0 2rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 4.5rem 0 1rem;
  }
`;

// 스크롤로 화면에 들어올 때 아래에서 떠오릅니다. 요소에 `data-reveal`을 달면 useScrollReveal이 `data-revealed`를 붙입니다.
export const reveal = css`
  transition:
    opacity 0.9s ${theme.animations.easing},
    transform 0.9s ${theme.animations.easing};

  &:not([data-revealed]) {
    opacity: 0;
    transform: translate3d(0, 2rem, 0);
  }
`;

// 대형 제목·숫자용 타이포입니다. 영문/숫자는 Archivo 세미 컨덴스드, 한글은 Pretendard로 대체됩니다.
export const displayType = css`
  font-family: ${theme.fonts.display};
  font-stretch: 87.5%;
`;
