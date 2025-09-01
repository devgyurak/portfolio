import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { theme } from '../styles/theme';
import { SectionTitle } from './SectionTitle';
import { skills } from '../data/profile';

const SectionContainer = styled.section`
  padding: ${theme.spacing.xxxl} 0;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xxl} 1rem;
  }
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 3rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const SkillCategory = styled.div<{ $isDarkMode: boolean }>`
  border: 1px solid ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};
  border-radius: ${theme.radius.lg};
  padding: 2rem;
  transition: all ${theme.animations.normal};
  background: ${({ $isDarkMode }) => 
    $isDarkMode ? 'transparent' : theme.colors.light.surface};
  box-shadow: ${({ $isDarkMode }) => 
    $isDarkMode ? 'none' : `0 1px 3px ${theme.colors.light.shadow}`};

  &:hover {
    border-color: ${({ $isDarkMode }) => 
      $isDarkMode ? theme.colors.dark.accent : theme.colors.light.text};
    box-shadow: ${({ $isDarkMode }) => 
      $isDarkMode 
        ? 'none' 
        : `0 4px 12px ${theme.colors.light.shadowMd}, 0 0 0 1px ${theme.colors.light.text}15`};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const CategoryTitle = styled.h3<{ $isDarkMode: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  text-align: center;
  letter-spacing: 0.025em;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
`;

const SkillTag = styled.span<{ $isDarkMode: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};
  border-radius: ${theme.radius.full};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  transition: all ${theme.animations.normal};
  background: transparent;
  
  &:hover {
    border-color: ${({ $isDarkMode }) => 
      $isDarkMode ? theme.colors.dark.accent : theme.colors.light.accent};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
    gap: 0.375rem;
  }
`;

const SkillIcon = styled.div<{ $isDarkMode: boolean }>`
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
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 14px;
    height: 14px;
  }
`;



const getSkillIcon = (skillName: string): string | null => {
  const iconMap: Record<string, string> = {
    'Python': '/icons/python.svg',
    'Kotlin': '/icons/kotlin.svg',
    'Django': '/icons/django.svg',
    'FastAPI': '/icons/fastapi.svg',
    'Spring Boot': '/icons/springboot.svg',
    'MySQL': '/icons/mysql.svg',
    'PostgreSQL': '/icons/postgresql.svg',
    'Redis': '/icons/redis.svg',
    'Docker': '/icons/docker.svg',
    'Linux': '/icons/linux.svg',
    'Nginx': '/icons/nginx.svg',
    'Clean Architecture': '/icons/cleanarchitecture.svg'
  };
  
  return iconMap[skillName] || null;
};

export const SkillsSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <SectionContainer id="skills">
      <SectionTitle 
        isDarkMode={isDarkMode}
      >
        {t('section.skills')}
      </SectionTitle>

      <SkillsContainer>
        {skills.map((category, index) => (
          <SkillCategory key={index} $isDarkMode={isDarkMode}>
            <CategoryTitle $isDarkMode={isDarkMode}>
              {category.category}
            </CategoryTitle>
            <SkillsGrid>
              {category.skills.map((skill, skillIndex) => {
                const iconPath = getSkillIcon(skill);
                return (
                  <SkillTag key={skillIndex} $isDarkMode={isDarkMode}>
                    {iconPath && (
                      <SkillIcon $isDarkMode={isDarkMode}>
                        <img src={iconPath} alt={skill} />
                      </SkillIcon>
                    )}
                    {skill}
                  </SkillTag>
                );
              })}
            </SkillsGrid>
          </SkillCategory>
        ))}
      </SkillsContainer>
    </SectionContainer>
  );
};