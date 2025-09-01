import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { theme } from '../styles/theme';
import SimpleDropdown from './SimpleDropdown';

const HeaderContainer = styled.header<{ $isDarkMode: boolean }>`
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  max-width: 100vw !important;
  z-index: 1000 !important;
  background: ${({ $isDarkMode }) => 
    $isDarkMode ? 'rgba(0, 0, 0, 0.95)' : 'rgba(250, 250, 250, 0.95)'} !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  border-bottom: 1px solid ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border} !important;
  transition: all 0.3s ease !important;
  box-shadow: ${({ $isDarkMode }) => 
    $isDarkMode 
      ? '0 1px 0 rgba(255, 255, 255, 0.1)' 
      : '0 1px 0 rgba(255, 255, 255, 0.8), 0 1px 3px rgba(0, 0, 0, 0.05)'} !important;
  overflow: visible !important;
  box-sizing: border-box !important;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  overflow: visible !important;
  box-sizing: border-box;
  position: relative;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 1.25rem 1.5rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const Logo = styled.div<{ $isDarkMode: boolean }>`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  cursor: pointer;
  transition: opacity ${theme.animations.normal};
  letter-spacing: -0.02em;

  &:hover {
    opacity: 0.7;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-left: auto;
  margin-right: 3rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: 2rem;
    margin-right: 2rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

const NavLink = styled.a<{ $isDarkMode: boolean }>`
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: color ${theme.animations.normal};
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover {
    color: ${({ $isDarkMode }) => 
      $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1rem;
    text-transform: none;
    letter-spacing: 0;
  }
`;


const ThemeToggle = styled.button<{ $isDarkMode: boolean }>`
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all ${theme.animations.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  filter: ${({ $isDarkMode }) => $isDarkMode ? 'invert(1) brightness(1)' : 'none'} !important;
  -webkit-filter: ${({ $isDarkMode }) => $isDarkMode ? 'invert(1) brightness(1)' : 'none'} !important;

  &:hover {
    opacity: 0.7;
  }
  
  img {
    width: 24px;
    height: 24px;
    display: block;
  }
`;




const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: visible !important;
  flex-shrink: 0;
  position: relative;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 0.5rem;
  }
`;

export const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <HeaderContainer $isDarkMode={isDarkMode}>
      <Nav>
        <Logo $isDarkMode={isDarkMode} onClick={() => scrollToSection('home')}>
          Devgyurak
        </Logo>
        
        <NavLinks>
          <NavLink 
            href="#experience" 
            $isDarkMode={isDarkMode}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('experience');
            }}
          >
            {t('nav.experience')}
          </NavLink>
          <NavLink 
            href="#projects" 
            $isDarkMode={isDarkMode}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}
          >
            {t('nav.projects')}
          </NavLink>
          <NavLink 
            href="#skills" 
            $isDarkMode={isDarkMode}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('skills');
            }}
          >
            {t('nav.skills')}
          </NavLink>
        </NavLinks>

        <RightSection>
          <SimpleDropdown />
          <ThemeToggle 
            $isDarkMode={isDarkMode}
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            <img src="/icons/darkmode.svg" alt="Toggle theme" />
          </ThemeToggle>
        </RightSection>
      </Nav>
    </HeaderContainer>
  );
};