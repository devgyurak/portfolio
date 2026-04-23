import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { theme } from '../styles/theme';
import { blogPosts, BlogPost } from '../data/profile';
import { SectionTitle } from './SectionTitle';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

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

const ProjectsGrid = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 3rem;
  min-height: 600px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 800px;
  }
`;

const ProjectCard = styled.div<{ $isDarkMode: boolean; $isVisible?: boolean; $clickable?: boolean }>`
  border: 1px solid ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};
  border-radius: ${theme.radius.lg};
  padding: 2rem;
  transition: all ${theme.animations.normal};
  background: ${({ $isDarkMode }) => 
    $isDarkMode ? 'transparent' : theme.colors.light.surface};
  box-shadow: ${({ $isDarkMode }) => 
    $isDarkMode ? 'none' : `0 1px 3px ${theme.colors.light.shadow}`};
  cursor: ${({ $clickable }) => $clickable ? 'pointer' : 'default'};
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


const ProjectTitle = styled.h3<{ $isDarkMode: boolean }>`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  line-height: 1.4;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

const ProjectDate = styled.div<{ $isDarkMode: boolean }>`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.textMuted : theme.colors.light.textMuted};
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p<{ $isDarkMode: boolean }>`
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary};
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  font-size: 0.875rem;
  white-space: pre-line;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8125rem;
    line-height: 1.5;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span<{ $isDarkMode: boolean }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border: 1px solid ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};
  border-radius: ${theme.radius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.textSecondary : theme.colors.light.textSecondary};
  background: transparent;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
  }
`;

const ProjectActions = styled.div<{ $isDarkMode: boolean }>`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  padding-bottom: 0.5rem;
  border-top: 1px solid ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};
  overflow: visible;
`;

const ViewGithubButton = styled.a<{ $isDarkMode: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.border : theme.colors.light.border};
  border-radius: ${theme.radius.lg};
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $isDarkMode }) => 
    $isDarkMode ? theme.colors.dark.text : theme.colors.light.text};
  background: transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  font-family: ${theme.fonts.mono};

  &:hover {
    border-color: ${({ $isDarkMode }) => 
      $isDarkMode ? theme.colors.dark.accent : theme.colors.light.text};
    color: ${({ $isDarkMode }) => 
      $isDarkMode ? theme.colors.dark.accent : theme.colors.light.text};
    
    transform: translateX(2px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.8125rem;
    padding: 0.625rem 1.25rem;
  }
`;

const ButtonIcon = styled.div<{ $isDarkMode: boolean }>`
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

const ProjectCardComponent: React.FC<{ post: BlogPost; index: number; isDarkMode: boolean }> = ({ post, index, isDarkMode }) => {
  const { elementRef, isVisible } = useScrollAnimation({ delay: index * 150 });
  const { t } = useLanguage();
  
  const getTitle = () => {
    switch (post.slug) {
      case 'hipchapedia':
        return t('proj.hipchapedia.title');
      case 'taree':
        return t('proj.taree.title');
      case 'myunsejujeom':
        return t('proj.myunsejujeom.title');
      default:
        return post.title;
    }
  };
  
  const getDescription = () => {
    switch (post.slug) {
      case 'hipchapedia':
        return t('proj.hipchapedia.desc');
      case 'taree':
        return t('proj.taree.desc');
      case 'myunsejujeom':
        return t('proj.myunsejujeom.desc');
      default:
        return post.excerpt;
    }
  };
  
  const handleCardClick = () => {
    if (post.url) {
      window.open(post.url, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <ProjectCard 
      ref={elementRef as any}
      $isDarkMode={isDarkMode}
      $isVisible={isVisible}
      $clickable={!!post.url}
      onClick={handleCardClick}
    >
      <ProjectTitle $isDarkMode={isDarkMode}>{getTitle()}</ProjectTitle>
      <ProjectDate $isDarkMode={isDarkMode}>{post.date}</ProjectDate>
      <ProjectDescription $isDarkMode={isDarkMode}>
        {getDescription()}
      </ProjectDescription>
      <TagsContainer>
        {post.tags.map((tag: string, tagIndex: number) => (
          <Tag key={tagIndex} $isDarkMode={isDarkMode}>
            {tag}
          </Tag>
        ))}
      </TagsContainer>
      <ProjectActions $isDarkMode={isDarkMode}>
        <ViewGithubButton 
          href={post.githubUrl || "https://github.com/leegyurak"} 
          target="_blank" 
          rel="noopener noreferrer"
          $isDarkMode={isDarkMode}
          onClick={(e) => e.stopPropagation()}
        >
          <ButtonIcon $isDarkMode={isDarkMode}>
            <img src="/icons/github.svg" alt="GitHub" />
          </ButtonIcon>
          {t('projects.viewGithub')}
        </ViewGithubButton>
      </ProjectActions>
    </ProjectCard>
  );
};

export const ProjectsSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <SectionContainer id="projects">
      <SectionTitle 
        isDarkMode={isDarkMode}
      >
        {t('section.projects')}
      </SectionTitle>

      <ProjectsGrid>
        {blogPosts.map((post, index) => (
          <ProjectCardComponent 
            key={index}
            post={post}
            index={index}
            isDarkMode={isDarkMode}
          />
        ))}
      </ProjectsGrid>
    </SectionContainer>
  );
};
