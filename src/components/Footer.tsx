import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { theme } from '../styles/theme';

const FooterContainer = styled.footer<{ $isDarkMode: boolean }>`
  background: transparent;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary};
  padding: 4rem 2rem 2rem;
  margin-top: auto;
  border-top: 1px solid ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};
  display: flex;
  align-items: center;
  min-height: 200px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 3rem 1rem 2rem;
    min-height: 180px;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  font-size: 0.875rem;
  width: 100%;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 1.5rem;
  }
`;

const SocialLink = styled.a<{ $isDarkMode: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary};
  text-decoration: none;
  transition: color ${theme.animations.normal};
  font-weight: 500;
  font-size: 0.875rem;

  &:hover {
    color: ${({ $isDarkMode }) => 
      $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  }
`;

const FooterIcon = styled.div<{ $isDarkMode: boolean }>`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  filter: ${({ $isDarkMode }) => $isDarkMode ? 'invert(1) brightness(1)' : 'none'} !important;
  -webkit-filter: ${({ $isDarkMode }) => $isDarkMode ? 'invert(1) brightness(1)' : 'none'} !important;
  opacity: 0.7;
  transition: opacity ${theme.animations.normal};
  
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  
  ${SocialLink}:hover & {
    opacity: 1;
  }
`;

export const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <FooterContainer $isDarkMode={isDarkMode}>
      <FooterContent>
        <SocialLinks>
          <SocialLink href="https://github.com/leegyurak" target="_blank" rel="noopener noreferrer" $isDarkMode={isDarkMode}>
            <FooterIcon $isDarkMode={isDarkMode}>
              <img src="/icons/github.svg" alt="GitHub" />
            </FooterIcon>
            GitHub
          </SocialLink>
          <SocialLink href="https://velog.io/@devgyurak" target="_blank" rel="noopener noreferrer" $isDarkMode={isDarkMode}>
            <FooterIcon $isDarkMode={isDarkMode}>
              <img src="/icons/velog.svg" alt="Blog" />
            </FooterIcon>
            Blog
          </SocialLink>
          <SocialLink href="https://linkedin.com/in/devgyurak" target="_blank" rel="noopener noreferrer" $isDarkMode={isDarkMode}>
            <FooterIcon $isDarkMode={isDarkMode}>
              <img src="/icons/linkedin.svg" alt="LinkedIn" />
            </FooterIcon>
            LinkedIn
          </SocialLink>
        </SocialLinks>
        <p>© {new Date().getFullYear()} {t('footer.rights')}</p>
      </FooterContent>
    </FooterContainer>
  );
};