import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from './hooks/useTheme';
import { LanguageProvider } from './hooks/useLanguage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import styled from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';

const AppContainer = styled.div<{ $isDarkMode: boolean }>`
  background: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.background : theme.colors.light.background};
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden !important;
  position: relative;
  transition: background-color 0.3s ease, color 0.3s ease;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: ${({ $isDarkMode }) => $isDarkMode
      ? `
        linear-gradient(90deg, transparent 49px, rgba(255, 255, 255, 0.08) 50px, transparent 51px),
        linear-gradient(0deg, transparent 49px, rgba(255, 255, 255, 0.08) 50px, transparent 51px),
        radial-gradient(circle at 25px 25px, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
      `
      : `
        linear-gradient(90deg, transparent 59px, rgba(59, 130, 246, 0.08) 60px, transparent 61px),
        linear-gradient(0deg, transparent 59px, rgba(59, 130, 246, 0.08) 60px, transparent 61px),
        radial-gradient(circle at 30px 30px, rgba(16, 185, 129, 0.1) 0.5px, transparent 0.5px)
      `
    };
    background-size: ${({ $isDarkMode }) => $isDarkMode ? '50px 50px, 50px 50px, 50px 50px' : '60px 60px, 60px 60px, 60px 60px'};
    pointer-events: none;
    z-index: 0;
    animation: ${({ $isDarkMode }) => $isDarkMode ? 'gridDrift 30s linear infinite' : 'lightGridFloat 40s ease-in-out infinite'};
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @keyframes backgroundPulse {
    0%, 100% { 
      opacity: 1; 
      transform: scale(1);
    }
    50% { 
      opacity: 0.7; 
      transform: scale(1.02);
    }
  }

  @keyframes gridDrift {
    0% { 
      transform: translate(0, 0);
    }
    25% { 
      transform: translate(-5px, -5px);
    }
    50% { 
      transform: translate(5px, -5px);
    }
    75% { 
      transform: translate(-5px, 5px);
    }
    100% { 
      transform: translate(0, 0);
    }
  }

  @keyframes lightBackgroundShift {
    0%, 100% { 
      opacity: 1; 
      transform: translateX(0);
    }
    33% { 
      opacity: 0.8; 
      transform: translateX(10px);
    }
    66% { 
      opacity: 0.9; 
      transform: translateX(-10px);
    }
  }

  @keyframes lightGridFloat {
    0%, 100% { 
      transform: translate(0, 0);
    }
    50% { 
      transform: translate(-2px, -2px);
    }
  }
`;

const MainContent = styled.main`
  width: 100%;
  overflow-x: hidden !important;
`;

const Section = styled.section<{ $isDarkMode: boolean }>`
  padding: 5rem 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: hidden !important;
  background: transparent;
  
  &:first-child {
    padding-top: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 3rem 0;
    
    &:first-child {
      padding-top: 0;
    }
  }
`;

function AppContent() {
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <GlobalStyles />
      <Header />
      <AppContainer $isDarkMode={isDarkMode}>
        <MainContent>
          <HeroSection />
          <Section $isDarkMode={isDarkMode}>
            <ExperienceSection />
          </Section>
          <Section $isDarkMode={isDarkMode}>
            <ProjectsSection />
          </Section>
          <Section $isDarkMode={isDarkMode}>
            <SkillsSection />
          </Section>
        </MainContent>
        <Footer />
      </AppContainer>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;