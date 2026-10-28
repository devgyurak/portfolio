import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { theme } from '../styles/theme';
import { Container, Grid, SectionShell, displayType, reveal } from '../styles/layout';
import { SectionTitle } from './SectionTitle';
import { skills } from '../data/profile';

const SkillsTable = styled.div`
  margin: 0;
`;

const SkillRow = styled(Grid)<{ $isDarkMode: boolean }>`
  ${reveal}
  align-items: baseline;
  row-gap: 0.75rem;
  padding: 1.5rem 0;
  border-top: 1px solid ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};

  &:first-child {
    border-top: none;
    padding-top: 0;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.25rem 0;
  }
`;

const RowIndex = styled.span<{ $isDarkMode: boolean }>`
  grid-column: 1 / 3;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.textMuted : theme.colors.light.textMuted};

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

const CategoryTitle = styled.h3<{ $isDarkMode: boolean }>`
  grid-column: 3 / 6;
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-column: 3 / 7;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-column: 1 / -1;
    font-size: 0.8125rem;
    color: ${({ $isDarkMode }) =>
      $isDarkMode ? theme.colors.dark.textMuted : theme.colors.light.textMuted};
  }
`;

const SkillsGrid = styled.div`
  grid-column: 6 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2.25rem;
  margin: 0;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-column: 7 / -1;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-column: 1 / -1;
    gap: 0.5rem 1.5rem;
  }
`;

const SkillTag = styled.span<{ $isDarkMode: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  ${displayType}
  font-size: clamp(1.375rem, 2vw, 1.875rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
`;

const SkillIcon = styled.img<{ $isDarkMode: boolean }>`
  width: 0.75em;
  height: 0.75em;
  flex-shrink: 0;
  filter: ${({ $isDarkMode }) => $isDarkMode ? 'invert(1)' : 'none'};
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
    'Clean Architecture': '/icons/cleanarchitecture.svg',
    'Pub/Sub': '/icons/pubsub.svg',
    'vLLM': '/icons/vllm.svg'
  };
  
  return iconMap[skillName] || null;
};

export const SkillsSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <SectionShell id="skills">
      <Container>
        <SectionTitle 
          isDarkMode={isDarkMode}
          index="03"
        >
          {t('section.skills')}
        </SectionTitle>

        <SkillsTable>
          {skills.map((category, index) => (
            <SkillRow key={category.category} $isDarkMode={isDarkMode} data-reveal>
              <RowIndex $isDarkMode={isDarkMode}>03.{index + 1}</RowIndex>
              <CategoryTitle $isDarkMode={isDarkMode}>
                {category.category}
              </CategoryTitle>
              <SkillsGrid>
                {category.skills.map((skill) => {
                  const iconPath = getSkillIcon(skill);
                  return (
                    <SkillTag key={skill} $isDarkMode={isDarkMode}>
                      {iconPath && <SkillIcon src={iconPath} alt="" $isDarkMode={isDarkMode} />}
                      {skill}
                    </SkillTag>
                  );
                })}
              </SkillsGrid>
            </SkillRow>
          ))}
        </SkillsTable>
      </Container>
    </SectionShell>
  );
};
