import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface SectionTitleProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  subtitle?: string;
}

const TitleContainer = styled.div`
  margin-bottom: 3rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 2rem;
  }
`;

const MainTitle = styled.h2<{ $isDarkMode: boolean }>`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  text-align: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;


export const SectionTitle: React.FC<SectionTitleProps> = ({ 
  children, 
  isDarkMode 
}) => {
  return (
    <TitleContainer>
      <MainTitle $isDarkMode={isDarkMode}>{children}</MainTitle>
    </TitleContainer>
  );
};