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
import { useScrollReveal } from './hooks/useScrollReveal';

const AppContainer = styled.div<{ $isDarkMode: boolean }>`
  background: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.background : theme.colors.light.background};
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  min-height: 100vh;
  width: 100%;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

function AppContent() {
  const { isDarkMode } = useTheme();
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <GlobalStyles />
      <Header />
      <AppContainer $isDarkMode={isDarkMode}>
        <main>
          <HeroSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
        </main>
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
