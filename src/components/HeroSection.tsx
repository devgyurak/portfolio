import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { theme } from '../styles/theme';
import { profileData } from '../data/profile';
import { TypewriterText } from './TypewriterText';

const HeroContainer = styled.section<{ $isDarkMode: boolean }>`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 150px;
  background: transparent;
  position: relative;

  @media (max-width: 770px) {
    min-height: calc(100vh - 80px);
    padding-top: 100px;
    padding-bottom: 2rem;
    align-items: flex-start;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  margin: 0 auto;
  overflow: visible;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const Header = styled.header`
  margin-bottom: 4rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-bottom: 3rem;
  }
`;

const Name = styled.h1<{ $isDarkMode: boolean }>`
  font-size: clamp(4rem, 8vw, 7rem);
  font-weight: 700;
  line-height: 1.0;
  margin: 0 0 1rem 0;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  letter-spacing: -0.04em;
  padding-bottom: 0.1em;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: clamp(4.5rem, 15vw, 6rem);
  }
`;

const Title = styled.h2<{ $isDarkMode: boolean }>`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 400;
  line-height: 1.4;
  margin: 0 0 2rem 0;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary};
  white-space: pre-line;
  position: relative;
  overflow: visible;
  padding-bottom: 0.2em;
`;

const Description = styled.div<{ $isDarkMode: boolean }>`
  font-size: 1.125rem;
  line-height: 1.6;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary};
  margin-bottom: 3rem;
  max-width: 700px;
  white-space: pre-line;
  word-break: keep-all;
  overflow-wrap: break-word;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 2rem;
    line-height: 1.5;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 4rem;
  padding-top: 4px;
  overflow: visible;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 3rem;
    padding-top: 4px;
  }
`;

const ContactCard = styled.a<{ $isDarkMode: boolean }>`
  display: block;
  padding: 1.5rem;
  border: 1px solid ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};
  border-radius: ${theme.radius.lg};
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${({ $isDarkMode }) => 
    $isDarkMode ? 'transparent' : theme.colors.light.surface};
  box-shadow: ${({ $isDarkMode }) => 
    $isDarkMode ? 'none' : `0 1px 3px ${theme.colors.light.shadow}`};
  will-change: transform, border-color, box-shadow;
  
  &:hover {
    border-color: ${({ $isDarkMode }) => 
      $isDarkMode ? theme.colors.dark.accent : theme.colors.light.text};
    box-shadow: ${({ $isDarkMode }) => 
      $isDarkMode 
        ? '0 4px 12px rgba(255, 255, 255, 0.05)' 
        : `0 4px 12px ${theme.colors.light.shadowMd}, 0 0 0 1px ${theme.colors.light.text}20`};
    transform: translateY(-2px);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const ContactLabel = styled.div<{ $isDarkMode: boolean }>`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.textMuted : theme.colors.light.textMuted};
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ContactValue = styled.div<{ $isDarkMode: boolean }>`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  word-break: break-all;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9375rem;
  }
`;

const IconWrapper = styled.div<{ $isDarkMode: boolean }>`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  filter: ${({ $isDarkMode }) => $isDarkMode ? 'invert(1) brightness(1)' : 'none'} !important;
  -webkit-filter: ${({ $isDarkMode }) => $isDarkMode ? 'invert(1) brightness(1)' : 'none'} !important;
  
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const StatusIndicator = styled.div<{ $isDarkMode: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary};
  margin-top: 1rem;
  font-family: ${theme.fonts.mono};
  
  &::before {
    content: '●';
    color: #22c55e;
    font-size: 0.75rem;
    animation: status-pulse 2s infinite;
  }
  
  @keyframes status-pulse {
    0%, 100% { 
      opacity: 1; 
      transform: scale(1);
    }
    50% { 
      opacity: 0.6;
      transform: scale(0.95);
    }
  }
`;

export const HeroSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { language, t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getDescription = () => {
    if (isMobile) {
      return t('hero.mobileDescription');
    }
    return t('hero.description');
  };

  const getName = () => {
    return language === 'ko' ? '이규락' : 'Gyurak Lee';
  };

  return (
    <HeroContainer id="home" $isDarkMode={isDarkMode}>
      <ContentWrapper>
        <Header>
          <Name $isDarkMode={isDarkMode}>{getName()}</Name>
          <Title $isDarkMode={isDarkMode}>
            <TypewriterText 
              texts={[
                'Software Engineer',
                'Backend Engineer',
                'Forward Deployment Engineer',
                'AX Engineer',
              ]}
              speed={100}
              deleteSpeed={50}
              pauseDuration={2000}
              isDarkMode={isDarkMode}
            />
          </Title>
          <Description $isDarkMode={isDarkMode}>
            {getDescription()}
          </Description>
          <StatusIndicator $isDarkMode={isDarkMode}>
            {t('hero.status')}
          </StatusIndicator>
        </Header>

        <ContactGrid>
          <ContactCard 
            href={`mailto:${profileData.email}`}
            $isDarkMode={isDarkMode}
          >
            <ContactLabel $isDarkMode={isDarkMode}>{t('hero.email')}</ContactLabel>
            <ContactValue $isDarkMode={isDarkMode}>
              <IconWrapper $isDarkMode={isDarkMode}>
                <img src="/icons/email.svg" alt="Email" />
              </IconWrapper>
              {profileData.email}
            </ContactValue>
          </ContactCard>

          {profileData.linkedin && (
            <ContactCard 
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              $isDarkMode={isDarkMode}
            >
              <ContactLabel $isDarkMode={isDarkMode}>LinkedIn</ContactLabel>
              <ContactValue $isDarkMode={isDarkMode}>
                <IconWrapper $isDarkMode={isDarkMode}>
                  <img src="/icons/linkedin.svg" alt="LinkedIn" />
                </IconWrapper>
                {t('hero.linkedin')}
              </ContactValue>
            </ContactCard>
          )}

          {profileData.github && (
            <ContactCard 
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              $isDarkMode={isDarkMode}
            >
              <ContactLabel $isDarkMode={isDarkMode}>GitHub</ContactLabel>
              <ContactValue $isDarkMode={isDarkMode}>
                <IconWrapper $isDarkMode={isDarkMode}>
                  <img src="/icons/github.svg" alt="GitHub" />
                </IconWrapper>
                {t('hero.github')}
              </ContactValue>
            </ContactCard>
          )}

          <ContactCard 
            href="https://cdn.devgyurak.com/resume_leegyurak.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="resume_leegyurak.pdf"
            $isDarkMode={isDarkMode}
          >
            <ContactLabel $isDarkMode={isDarkMode}>Resume</ContactLabel>
            <ContactValue $isDarkMode={isDarkMode}>
              <IconWrapper $isDarkMode={isDarkMode}>
                <img src="/icons/resume.svg" alt="Resume" />
              </IconWrapper>
              {t('hero.resume')}
            </ContactValue>
          </ContactCard>

        </ContactGrid>
      </ContentWrapper>
    </HeroContainer>
  );
};
