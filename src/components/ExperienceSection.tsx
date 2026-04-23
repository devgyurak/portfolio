import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { theme } from '../styles/theme';
import { experience, ExperienceItem as ExperienceItemType } from '../data/profile';
import { SectionTitle } from './SectionTitle';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SectionContainer = styled.section`
  padding: ${theme.spacing.xxxl} 0;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 2rem;
  padding-right: 2rem;
  overflow: visible;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xxl} 1rem;
  }
`;

const ExperienceGrid = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 3rem;
  overflow: visible;
  min-height: 700px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 900px;
  }
`;

const ExperienceItem = styled.div<{ $isDarkMode: boolean; $isVisible: boolean }>`
  border: 1px solid ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};
  border-radius: ${theme.radius.lg};
  padding: 2rem;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${({ $isDarkMode }) => 
    $isDarkMode ? 'transparent' : theme.colors.light.surface};
  box-shadow: ${({ $isDarkMode }) => 
    $isDarkMode ? 'none' : `0 1px 3px ${theme.colors.light.shadow}`};
  overflow: visible;
  
  opacity: 0;
  transform: translate3d(0, 0, 0);
  will-change: ${({ $isVisible }) => $isVisible ? 'opacity' : 'auto'};
  animation: ${({ $isVisible }) => $isVisible ? 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'none'};
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &:hover {
    border-color: ${({ $isDarkMode }) => 
      $isDarkMode ? theme.colors.dark.accent : theme.colors.light.text};
    box-shadow: ${({ $isDarkMode }) => 
      $isDarkMode 
        ? 'none' 
        : `0 4px 12px ${theme.colors.light.shadowMd}, 0 0 0 1px ${theme.colors.light.text}15`};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 1.5rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const TitleGroup = styled.div`
  flex: 1;
  display: grid;
  gap: 2rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 1.35rem;
  }
`;

const HeaderMeta = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const JobTitle = styled.h3<{ $isDarkMode: boolean }>`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  line-height: 1.4;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const Company = styled.h4<{ $isDarkMode: boolean }>`
  font-size: 0.9375rem;
  font-weight: 600;
  margin: 0;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.875rem;
  }
`;

const Period = styled.div<{ $isDarkMode: boolean; $hideOnMobile?: boolean }>`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.textMuted : theme.colors.light.textMuted};
  text-align: right;
  white-space: nowrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    text-align: left;
    display: ${({ $hideOnMobile }) => ($hideOnMobile ? 'none' : 'block')};
  }
`;

const MobilePeriod = styled(Period)`
  display: none;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: block;
  }
`;

const Description = styled.div<{ $isDarkMode: boolean }>`
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary};
  line-height: 1.6;
  white-space: pre-line;
  font-size: 0.875rem;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8125rem;
    line-height: 1.5;
  }
`;

const RolesContainer = styled.div<{ $isDarkMode: boolean }>`
  display: grid;
  gap: 1.5rem;

  > * + * {
    padding-top: 1.5rem;
    border-top: 1px solid ${({ $isDarkMode }) =>
      $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};
  }
`;

const RoleItem = styled.div`
  display: grid;
  gap: 1rem;
`;

const RoleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const RoleTitle = styled.h4<{ $isDarkMode: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  line-height: 1.4;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9375rem;
  }
`;

const RolePeriod = styled.div<{ $isDarkMode: boolean }>`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) =>
    $isDarkMode ? theme.colors.dark.textMuted : theme.colors.light.textMuted};
  white-space: nowrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    white-space: normal;
  }
`;


const ExperienceCard: React.FC<{ item: ExperienceItemType; index: number; isDarkMode: boolean }> = ({ item, index, isDarkMode }) => {
  const { elementRef, isVisible } = useScrollAnimation({ delay: index * 200 });
  const { t } = useLanguage();
  
  const getDescription = (slug: string, fallback?: string) => {
    switch (slug) {
      case 'nrise-backend':
        return t('exp.nrise.desc');
      case 'aitrics-fde':
        return t('exp.aitricsFde.desc');
      case 'aitrics-be':
        return t('exp.aitricsBe.desc');
      case '8percent-backend':
        return t('exp.8percent.desc');
      case 'qualson-backend':
        return t('exp.qualson.desc');
      default:
        return fallback || '';
    }
  };

  const hasRoles = !!item.roles?.length;
  
  return (
    <ExperienceItem 
      ref={elementRef as any}
      $isDarkMode={isDarkMode}
      $isVisible={isVisible}
    >
      <ExperienceHeader>
        <TitleGroup>
          {hasRoles ? (
            <JobTitle $isDarkMode={isDarkMode}>{item.company}</JobTitle>
          ) : (
            <HeaderMeta>
              <JobTitle $isDarkMode={isDarkMode}>{item.company}</JobTitle>
              <MobilePeriod $isDarkMode={isDarkMode}>{item.period}</MobilePeriod>
            </HeaderMeta>
          )}
          {!hasRoles && item.title && <Company $isDarkMode={isDarkMode}>{item.title}</Company>}
        </TitleGroup>
        <Period $isDarkMode={isDarkMode} $hideOnMobile={!hasRoles}>{item.period}</Period>
      </ExperienceHeader>

      {hasRoles ? (
        <RolesContainer $isDarkMode={isDarkMode}>
          {item.roles?.map((role) => (
            <RoleItem key={role.slug}>
              <RoleHeader>
                <RoleTitle $isDarkMode={isDarkMode}>{role.title}</RoleTitle>
                <RolePeriod $isDarkMode={isDarkMode}>{role.period}</RolePeriod>
              </RoleHeader>
              <Description $isDarkMode={isDarkMode}>
                {getDescription(role.slug, role.description)}
              </Description>
            </RoleItem>
          ))}
        </RolesContainer>
      ) : (
        <Description $isDarkMode={isDarkMode}>{getDescription(item.slug, item.description)}</Description>
      )}
    </ExperienceItem>
  );
};

export const ExperienceSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <SectionContainer id="experience">
      <SectionTitle 
        isDarkMode={isDarkMode}
      >
        {t('section.experience')}
      </SectionTitle>
      <ExperienceGrid>
        {experience.map((item, index) => (
          <ExperienceCard 
            key={index}
            item={item}
            index={index}
            isDarkMode={isDarkMode}
          />
        ))}
      </ExperienceGrid>
    </SectionContainer>
  );
};
