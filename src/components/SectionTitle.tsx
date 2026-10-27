import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Grid, displayType } from '../styles/layout';

interface SectionTitleProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  index?: string;
  subtitle?: string;
}

// 화면에 들어오면 2px 괘선이 왼쪽에서 그어지고, 이어서 번호와 제목이 올라옵니다.
const TitleContainer = styled(Grid)<{ $isDarkMode: boolean }>`
  position: relative;
  align-items: start;
  padding-top: 1.25rem;
  margin-bottom: 4rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ $isDarkMode }) =>
      $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
    transform-origin: left;
    transition: transform 1.1s ${theme.animations.easing};
  }

  > * {
    transition:
      opacity 0.9s ${theme.animations.easing} 0.2s,
      transform 0.9s ${theme.animations.easing} 0.2s;
  }

  &:not([data-revealed])::before {
    transform: scaleX(0);
  }

  &:not([data-revealed]) > * {
    opacity: 0;
    transform: translate3d(0, 1.5rem, 0);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-top: 1rem;
    margin-bottom: 2.5rem;
  }
`;

const Index = styled.span<{ $isDarkMode: boolean }>`
  grid-column: 1 / 3;
  padding-top: 0.625rem;
  ${displayType}
  font-size: 1rem;
  font-weight: 700;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.accent : theme.colors.light.accent};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-top: 0;
    margin-bottom: 0.75rem;
  }
`;

const MainTitle = styled.h2<{ $isDarkMode: boolean }>`
  grid-column: 3 / -1;
  ${displayType}
  font-size: clamp(3.25rem, 8.5vw, 8.5rem);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 0.88;
  margin: 0;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 3rem;
  }
`;

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  isDarkMode,
  index
}) => {
  return (
    <TitleContainer $isDarkMode={isDarkMode} data-reveal>
      <Index $isDarkMode={isDarkMode}>{index}</Index>
      <MainTitle $isDarkMode={isDarkMode}>{children}</MainTitle>
    </TitleContainer>
  );
};
